import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/paystack";
import { sendRegistrationConfirmationEmail } from "@/lib/email";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

interface PaymentMetadata {
  [key: string]: any;
  status?: boolean;
  message?: string;
  data?: {
    status?: string;
    reference?: string;
    amount?: number;
    currency?: string;
    paid_at?: string;
    channel?: string;
    metadata?: any;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { error: "Reference is required" },
        { status: 400 }
      );
    }

    // First verify with Paystack
    let verificationResponse;
    let retryCount = 0;
    
    while (retryCount < MAX_RETRIES) {
      try {
        verificationResponse = await verifyPayment(reference);
        if (verificationResponse.status) {
          break;
        }
      } catch (error) {
        console.error(`Verification attempt ${retryCount + 1} failed:`, error);
        if (retryCount === MAX_RETRIES - 1) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        retryCount++;
      }
    }
    
    if (!verificationResponse?.status) {
      return NextResponse.json(
        { error: verificationResponse?.message || "Payment verification failed" },
        { status: 400 }
      );
    }

    const paymentData = verificationResponse.data;
    console.log('Payment verification data:', paymentData);

    // Check if payment reference exists in our database
    let paymentReference = await prisma.paymentreference.findUnique({
      where: { reference },
      include: {
        registration: true
      }
    });

    if (!paymentReference) {
      // Create payment reference if it doesn't exist
      try {
        console.log('Attempting to create payment reference for:', reference);
        console.log('Payment metadata:', JSON.stringify(paymentData.metadata, null, 2));
        
        // Get reference ID from metadata - handle both book stand and registration cases
        const referenceId = paymentData.metadata?.referenceId || 
          paymentData.metadata?.registrationId ||
          paymentData.metadata?.custom_fields?.find((field: any) => 
            field.variable_name === 'reference_id' || 
            field.variable_name === 'registration_id'
          )?.value;

        console.log('Extracted reference ID:', referenceId);

        if (!referenceId) {
          console.error('Reference ID not found in metadata:', paymentData.metadata);
          return NextResponse.json(
            { error: "Reference ID not found in payment metadata" },
            { status: 400 }
          );
        }

        // Check if this is a book stand payment
        const isBookStandPayment = paymentData.metadata?.referenceId !== undefined;
        
        if (isBookStandPayment) {
          // For book stand payments, we need to create a temporary registration
          const tempRegistration = await prisma.registration.create({
            data: {
              registration_id: `bookstand-${Date.now()}`,
              email: paymentData.metadata?.email || 'bookstand@nibf.com',
              first_name: 'Book Stand',
              last_name: 'Payment',
              ticket_type: 'book_stand',
              payment_status: 'completed',
              terms_accepted: true
            }
          });

          const paymentReferenceData = {
            reference,
            amount: paymentData.amount / 100, // Convert from kobo to naira
            currency: paymentData.currency,
            status: paymentData.status,
            registration_id: tempRegistration.registration_id
          };

          console.log('Creating book stand payment reference with data:', JSON.stringify(paymentReferenceData, null, 2));

          const createdReference = await prisma.paymentreference.create({
            data: paymentReferenceData as any // Use type assertion for book stand payments
          });

          // Fetch the created reference with registration relation
          paymentReference = await prisma.paymentreference.findUnique({
            where: { reference },
            include: {
              registration: true
            }
          });
        } else {
          // For registration payments, verify the registration exists first
          const registration = await prisma.registration.findUnique({
            where: { registration_id: referenceId }
          });

          if (!registration) {
            console.error('Registration not found for ID:', referenceId);
            return NextResponse.json(
              { error: "Registration not found" },
              { status: 404 }
            );
          }

          const paymentReferenceData = {
            reference,
            amount: paymentData.amount / 100, // Convert from kobo to naira
            currency: paymentData.currency,
            status: paymentData.status,
            registration_id: referenceId
          };

          console.log('Creating registration payment reference with data:', JSON.stringify(paymentReferenceData, null, 2));

          const createdReference = await prisma.paymentreference.create({
            data: paymentReferenceData as any // Use type assertion for registration payments
          });

          // Fetch the created reference with registration relation
          paymentReference = await prisma.paymentreference.findUnique({
            where: { reference },
            include: {
              registration: true
            }
          });
        }

        if (!paymentReference) {
          throw new Error('Failed to fetch created payment reference');
        }

        console.log('Successfully created payment reference:', paymentReference);
      } catch (error) {
        console.error("Detailed error creating payment reference:", {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          paymentData: {
            reference,
            amount: paymentData.amount,
            currency: paymentData.currency,
            status: paymentData.status,
            metadata: paymentData.metadata
          }
        });
        return NextResponse.json(
          { error: "Failed to create payment reference", details: error instanceof Error ? error.message : 'Unknown error' },
          { status: 500 }
        );
      }
    } else {
      // Update existing payment reference
      try {
        paymentReference = await prisma.paymentreference.update({
          where: { reference },
          data: {
            status: paymentData.status,
            amount: paymentData.amount / 100,
            currency: paymentData.currency
          },
          include: {
            registration: true
          }
        });
        console.log('Updated payment reference:', paymentReference);
      } catch (error) {
        console.error("Error updating payment reference:", error);
        return NextResponse.json(
          { error: "Failed to update payment reference" },
          { status: 500 }
        );
      }
    }

    // If payment is successful, update the appropriate status
    if (paymentData.status === 'success') {
      try {
        // Check if this is a book stand payment
        if (paymentData.metadata?.referenceId) {
          // Update book stand status
          await prisma.bookStand.update({
            where: { reference_id: paymentData.metadata.referenceId },
            data: { status: 'paid' }
          });
          console.log('Updated book stand status to paid');
        } else if (paymentReference?.registration) {
          // Update registration status
          await prisma.registration.update({
            where: { registration_id: paymentReference.registration.registration_id },
            data: { payment_status: 'completed' }
          });

          // Send registration confirmation email
          try {
            await sendRegistrationConfirmationEmail({
              registrationId: paymentReference.registration.registration_id,
              firstName: paymentReference.registration.first_name,
              lastName: paymentReference.registration.last_name,
              email: paymentReference.registration.email,
              organization: paymentReference.registration.organization || undefined,
              ticketType: paymentReference.registration.ticket_type
            });
            console.log('Registration confirmation email sent successfully');
          } catch (emailError) {
            console.error('Failed to send registration confirmation email:', emailError);
            // Continue even if email fails
          }

          console.log('Updated registration status to completed');
        }
      } catch (error) {
        console.error("Error updating status:", error);
        // Don't fail the verification if status update fails
      }
    }

    return NextResponse.json({
      status: paymentData.status,
      amount: paymentData.amount / 100,
      currency: paymentData.currency,
      paid_at: paymentData.paid_at,
      channel: paymentData.channel,
      metadata: paymentData.metadata,
      registrationId: paymentReference?.registration?.registration_id,
      success: paymentData.status === 'success'
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
} 