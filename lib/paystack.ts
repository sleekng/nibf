import { NextResponse } from 'next/server';

const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error('PAYSTACK_SECRET_KEY is not defined in environment variables');
}

interface InitializePaymentParams {
  email: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
}

interface InitializePaymentResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface VerifyPaymentResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: string;
    reference: string;
    amount: number;
    currency: string;
    paid_at: string;
    channel: string;
    metadata: Record<string, any>;
  };
}

export async function initializePayment(
  email: string,
  amount: number,
  metadata: Record<string, any>
): Promise<InitializePaymentResponse> {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      throw new Error('PAYSTACK_SECRET_KEY is not defined in environment variables');
    }

    // Use the correct callback URL based on the metadata type
    let callback_url: string;
    
    if (metadata.type === 'book_stand') {
      callback_url = `${process.env.NEXT_PUBLIC_APP_URL}/book-stand/verify-payment`;
    } else if (metadata.type === 'donation') {
      callback_url = `${process.env.NEXT_PUBLIC_APP_URL}/donation/verify`;
    } else if (metadata.type === 'registration') {
      callback_url = `${process.env.NEXT_PUBLIC_APP_URL}/register-to-attend/verify-payment`;
    } else {
      // Default case - should not happen in normal operation
      throw new Error('Invalid payment type in metadata');
    }

    console.log('Initializing payment with Paystack:', {
      email,
      amount,
      currency: metadata.currency || 'NGN',
      callback_url,
      metadata
    });
    
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        email,
        amount,
        currency: metadata.currency || 'NGN',
        callback_url,
        metadata: {
          ...metadata,
          custom_fields: [
            {
              display_name: "Reference ID",
              variable_name: "reference_id",
              value: metadata.referenceId || metadata.registrationId
            }
          ]
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Paystack API Error:', error);
      throw new Error(error.message || 'Failed to initialize payment');
    }

    const data = await response.json();
    console.log('Paystack Response:', data);

    if (!data.status || !data.data || !data.data.authorization_url) {
      console.error('Invalid Paystack response:', data);
      throw new Error('Invalid response from Paystack');
    }

    return data;
  } catch (error) {
    console.error('Paystack initialization error:', error);
    throw error;
  }
}

export async function verifyPayment(reference: string): Promise<VerifyPaymentResponse> {
  try {
    console.log('Verifying payment with reference:', reference);
    console.log('Using Paystack secret key:', PAYSTACK_SECRET_KEY ? 'Present' : 'Missing');
    
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });

    console.log('Paystack API Response Status:', response.status);
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Paystack verification error:', error);
      throw new Error(error.message || 'Failed to verify payment');
    }

    const data = await response.json();
    console.log('Paystack verification response:', JSON.stringify(data, null, 2));
    
    if (!data.status) {
      console.error('Paystack verification failed:', data);
      throw new Error(data.message || 'Payment verification failed');
    }

    return data;
  } catch (error) {
    console.error('Paystack verification error:', error);
    throw error;
  }
}