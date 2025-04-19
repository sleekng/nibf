import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPayment } from '@/lib/paystack';
import { generateDonationConfirmationEmail } from '@/lib/email-templates/donation-confirmation';
import { sendEmail } from '@/lib/email';
import { Decimal } from '@prisma/client/runtime/library';

interface PaystackVerificationResponse {
  status: boolean;
  reference: string;
  amount: number;
  metadata: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
    donation_id: string;
    donor_id: string;
  };
}

interface DonationWithRelations {
  id: number;
  reference: string;
  amount: Decimal;
  status: string;
  donor: {
    name: string;
    email: string;
  };
  items: Array<{
    quantity: number;
    price: Decimal;
    book: {
      title: string;
    };
  }>;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');
    const trxref = searchParams.get('trxref');

    console.log('Verification request received:', { reference, trxref });

    if (!reference || !trxref) {
      console.log('Missing parameters:', { reference, trxref });
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
    console.log('Verifying payment with Paystack...');
    const verification = await verifyPayment(reference) as unknown as PaystackVerificationResponse;
    console.log('Paystack verification response:', verification);
    
    if (!verification || !verification.status) {
      console.log('Paystack verification failed:', verification);
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Find donation record by either reference or paystack_ref
    const donationRecord = await prisma.donationRecord.findFirst({
      where: {
        OR: [
          { reference: reference },
          { paystack_ref: reference }
        ]
      },
      include: {
        donor: true,
        items: {
          include: {
            book: true
          }
        }
      }
    });

    if (!donationRecord) {
      console.log('Donation record not found for reference:', reference);
      return NextResponse.json(
        { error: 'Donation record not found' },
        { status: 404 }
      );
    }

    // Update donation record
    console.log('Updating donation record...');
    const updatedDonation = await prisma.donationRecord.update({
      where: { id: donationRecord.id },
      data: {
        status: 'successful',
        paystack_ref: verification.reference
      },
      include: {
        donor: true,
        items: {
          include: {
            book: true
          }
        }
      }
    }) as unknown as DonationWithRelations;
    console.log('Donation record updated successfully:', updatedDonation);

    // Send confirmation email
    console.log('Preparing to send confirmation email...');
    const emailContent = generateDonationConfirmationEmail({
      donorName: updatedDonation.donor.name,
      reference: updatedDonation.reference,
      amount: Number(updatedDonation.amount),
      items: updatedDonation.items.map((item) => ({
        title: item.book.title,
        quantity: item.quantity,
        price: Number(item.price),
      })),
    });

    await sendEmail({
      to: updatedDonation.donor.email,
      subject: 'Thank You for Your Donation - Nigerian International Book Fair',
      html: emailContent,
    });
    console.log('Confirmation email sent successfully');

    // Return success response with donation reference
    return NextResponse.json({
      success: true,
      reference: updatedDonation.reference
    });
  } catch (error) {
    console.error('Donation verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify donation' },
      { status: 500 }
    );
  }
} 