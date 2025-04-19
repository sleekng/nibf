import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initializePayment, verifyPayment } from '@/lib/paystack';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { donor, items, amount } = data;

    // Create donor record
    const donorRecord = await prisma.donor.create({
      data: {
        name: donor.name,
        email: donor.email,
        phone: donor.phone,
        address: donor.address,
      },
    });

    // Generate a unique reference
    const reference = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create donation record
    const donationRecord = await prisma.donationRecord.create({
      data: {
        donor_id: donorRecord.id,
        amount: amount,
        reference: reference,
        items: {
          create: items.map((item: any) => ({
            book_id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // Initialize Paystack payment
    const payment = await initializePayment(
      donor.email,
      amount * 100, // Convert to kobo
      {
        donation_id: donationRecord.id,
        donor_id: donorRecord.id,
        referenceId: reference,
        currency: 'NGN',
        type: 'donation',
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/donation/verify`
      }
    );

    // Update donation record with Paystack reference
    await prisma.donationRecord.update({
      where: { id: donationRecord.id },
      data: {
        paystack_ref: payment.data.reference
      }
    });

    return NextResponse.json({
      authorization_url: payment.data.authorization_url,
      reference: payment.data.reference,
    });
  } catch (error) {
    console.error('Error processing donation:', error);
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const donations = await prisma.donationRecord.findMany({
      include: {
        donor: true,
        items: {
          include: {
            book: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}