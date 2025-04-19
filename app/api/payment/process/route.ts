import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Raw payment request body:', body);
    
    const { referenceId, amount, paymentMethod } = body;
    console.log('Extracted payment data:', { referenceId, amount, paymentMethod });

    // Validate required fields with detailed logging
    const validationErrors = [];
    
    if (!referenceId) {
      validationErrors.push('Reference ID is required');
    }
    if (!amount) {
      validationErrors.push('Amount is required');
    }
    if (!paymentMethod) {
      validationErrors.push('Payment method is required');
    }

    if (validationErrors.length > 0) {
      console.error('Validation errors:', validationErrors);
      return NextResponse.json(
        { error: validationErrors.join(', ') },
        { status: 400 }
      );
    }

    // Find the book stand first to check if it exists
    console.log('Looking up book stand with reference_id:', referenceId);
    const bookStand = await prisma.bookStand.findUnique({
      where: { reference_id: referenceId },
    });

    if (!bookStand) {
      console.error('Book stand not found for reference ID:', referenceId);
      return NextResponse.json(
        { error: 'Book stand not found' },
        { status: 404 }
      );
    }

    console.log('Found book stand:', bookStand);

    // In a real application, you would integrate with a payment gateway here
    // For now, we'll just update the status in the database
    console.log('Updating book stand status to paid');
    const updatedBookStand = await prisma.bookStand.update({
      where: { reference_id: referenceId },
      data: { 
        status: 'paid',
        updated_at: new Date()
      },
    });

    console.log('Updated book stand:', updatedBookStand);

    // Create a payment record if the Payment model exists
    try {
      // Check if the Payment model exists in the Prisma schema
      if ('payment' in prisma) {
        console.log('Creating payment record');
        const paymentData = {
          book_stand_id: updatedBookStand.id,
          amount,
          payment_method: paymentMethod,
          status: 'completed',
          reference_id: `PAY-${Date.now()}`,
        };
        console.log('Payment data:', paymentData);
        
        const payment = await (prisma as any).payment.create({
          data: paymentData,
        });
        console.log('Created payment record:', payment);
      } else {
        console.log('Payment model not found in Prisma schema, skipping payment record creation');
      }
    } catch (paymentError) {
      console.error('Error creating payment record:', paymentError);
      // Continue with the response even if payment record creation fails
    }

    const response = { 
      success: true,
      message: 'Payment processed successfully',
      bookStand: updatedBookStand
    };
    console.log('Sending success response:', response);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
} 