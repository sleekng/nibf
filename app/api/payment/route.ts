import { NextRequest, NextResponse } from 'next/server';
import { initializePayment, verifyPayment } from '@/lib/paystack';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Payment request body:', body);
    
    const { email, amount, metadata } = body;

    // Validate required fields
    if (!email || !amount || !metadata) {
      console.error('Missing required fields:', { email, amount, metadata });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert amount to kobo (smallest currency unit for Naira)
    const amountInKobo = Math.round(amount * 100);
    console.log('Amount in kobo:', amountInKobo);

    try {
      // Initialize payment with Paystack - always use NGN
      const paymentResponse = await initializePayment(email, amountInKobo, {
        ...metadata,
        currency: 'NGN' // Force NGN currency
      });

      console.log('Paystack response:', paymentResponse);

      if (!paymentResponse.status) {
        console.error('Paystack initialization failed:', paymentResponse);
        return NextResponse.json(
          { error: paymentResponse.message || "Failed to initialize payment" },
          { status: 400 }
        );
      }

      // Store payment reference in database
      try {
        await prisma.paymentreference.create({
          data: {
            reference: paymentResponse.data.reference,
            registration_id: metadata.referenceId || metadata.registrationId,
            amount: amount,
            currency: 'NGN', // Store as NGN
            status: "pending"
          }
        });
      } catch (error) {
        console.error("Error storing payment reference:", error);
        // Continue even if database operation fails
      }

      return NextResponse.json({
        authorization_url: paymentResponse.data.authorization_url,
        reference: paymentResponse.data.reference,
        access_code: paymentResponse.data.access_code
      });
    } catch (paystackError) {
      console.error('Paystack API error:', paystackError);
      return NextResponse.json(
        { error: paystackError instanceof Error ? paystackError.message : "Failed to initialize payment" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to initialize payment" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { error: 'Reference is required' },
        { status: 400 }
      );
    }

    const verificationResponse = await verifyPayment(reference);

    if (!verificationResponse.status) {
      return NextResponse.json(
        { error: verificationResponse.message || 'Payment verification failed' },
        { status: 400 }
      );
    }

    const paymentData = verificationResponse.data;

    // Update payment reference status
    await prisma.paymentreference.update({
      where: { reference },
      data: {
        status: paymentData.status,
      },
    });

    // If payment is successful, update registration status
    if (paymentData.status === 'success') {
      const paymentReference = await prisma.paymentreference.findUnique({
        where: { reference },
        select: { registration_id: true }
      });

      if (paymentReference) {
        await prisma.registration.update({
          where: { registration_id: paymentReference.registration_id },
          data: { payment_status: 'completed' }
        });
      }
    }

    return NextResponse.json({
      status: paymentData.status,
      amount: paymentData.amount / 100, // Convert from kobo to naira
      currency: paymentData.currency,
      paid_at: paymentData.paid_at,
      channel: paymentData.channel,
      metadata: paymentData.metadata,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const headersList = await headers();
    const signature = headersList.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    const body = await request.text();
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    if (event.event === 'charge.success') {
      const { reference } = event.data;
      
      // Update payment reference status
      await prisma.paymentreference.update({
        where: { reference },
        data: {
          status: 'success',
        },
      });

      // Get the registration ID from the payment reference
      const paymentReference = await prisma.paymentreference.findUnique({
        where: { reference },
        select: { registration_id: true }
      });

      if (paymentReference) {
        // Update registration payment status
        await prisma.registration.update({
          where: { registration_id: paymentReference.registration_id },
          data: { payment_status: 'completed' }
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}