'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function VerifyDonation() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');
      const trxref = searchParams.get('trxref');
      
      if (!reference || !trxref) {
        setStatus('error');
        toast.error('Invalid payment reference');
        return;
      }

      try {
        const response = await fetch(`/api/donations/verify?reference=${reference}&trxref=${trxref}`);
        
        if (response.redirected) {
          window.location.href = response.url;
          return;
        }

        const data = await response.json();

        if (data.error) {
          setStatus('error');
          toast.error(data.error);
          return;
        }

        setStatus('success');
        toast.success('Payment successful! Thank you for your donation.');
        
        // Redirect to success page after a short delay
        setTimeout(() => {
          window.location.href = `/donation/success?reference=${data.reference}`;
        }, 2000);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatus('error');
        toast.error('Failed to verify payment');
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we verify your payment...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Thank you for your donation.</p>
            <p className="text-gray-500 text-sm">Redirecting to success page...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-4">There was an error processing your payment.</p>
            <a
              href="/book-donations"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Try Again
            </a>
          </>
        )}
      </div>
    </div>
  );
}