import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Update registration payment status
    const registration = await prisma.registration.update({
      where: {
        registration_id: data.registrationId
      },
      data: {
        payment_status: data.paymentStatus
      }
    });

    // If payment reference is provided, create payment reference record
    if (data.paymentReference) {
      await prisma.paymentreference.create({
        data: {
          reference: data.paymentReference,
          registration_id: data.registrationId,
          amount: data.amount || 0,
          currency: data.currency || 'NGN',
          status: data.paymentStatus
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      registrationId: registration.registration_id 
    });
  } catch (error) {
    console.error('Payment update error:', error);
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
} 