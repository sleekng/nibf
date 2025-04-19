import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference, registrationId, amount, status } = body;

    if (!reference || !registrationId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      ); 
    }

    // Create payment reference record
    const paymentReference = await prisma.paymentreference.create({
      data: {
        reference,
        registration_id: registrationId,
        amount: amount,
        status: status || 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      paymentReference,
    });
  } catch (error) {
    console.error('Error storing payment reference:', error);
    return NextResponse.json(
      { error: 'Failed to store payment reference' },
      { status: 500 }
    );
  }
} 