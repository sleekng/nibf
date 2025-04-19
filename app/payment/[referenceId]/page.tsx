'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BookStand } from '@/types/bookStand';
import { Loader2 } from 'lucide-react';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const referenceId = params.referenceId as string;
  const [bookStand, setBookStand] = useState<BookStand | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    if (referenceId) {
      fetchBookStandDetails();
    }
  }, [referenceId]);

  const fetchBookStandDetails = async () => {
    try {
      console.log('Fetching book stand details for reference ID:', referenceId);
      const response = await fetch(`/api/book-stand/${referenceId}`);
      const data = await response.json();
      
      console.log('Raw API response:', data);
      
      if (response.ok && data.bookStand) {
        console.log('Parsed book stand data:', data.bookStand);
        setBookStand(data.bookStand);
        
        // Automatically redirect to the book-stand page with the reference ID
        // This will make it look like a continuous registration process
        router.push(`/book-stand?ref=${referenceId}&fromPayment=true`);
      } else {
        console.error('Error response:', data);
        toast.error(data.error || 'Failed to fetch stand details');
      }
    } catch (error) {
      console.error('Error fetching stand details:', error);
      toast.error('Failed to fetch stand details');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!bookStand) return;
    
    setProcessingPayment(true);
    try {
      // Log the data being sent to the payment API
      const paymentData = { 
        referenceId: bookStand.referenceId,
        amount: getStandPrice(bookStand.standType),
        paymentMethod: bookStand.paymentMethod || 'credit_card' // Provide a default value
      };
      
      console.log('Sending payment data:', paymentData);
      
      // This is a placeholder for the actual payment processing
      // In a real application, you would integrate with a payment gateway here
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      console.log('Payment response:', data);
      
      if (response.ok) {
        toast.success('Payment processed successfully');
        // Redirect to a success page or update the status
        setTimeout(() => {
          window.location.href = '/payment-success';
        }, 1500);
      } else {
        console.error('Payment error:', data);
        toast.error(data.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment failed. Please try again later.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const getStandPrice = (standType: string): number => {
    // This is a placeholder for the actual pricing logic
    const prices: Record<string, number> = {
      'Standard': 1000,
      'Premium': 2000,
      'VIP': 3000,
    };
    
    return prices[standType] || 1000;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-crimson-500" />
          <h2 className="mt-4 text-2xl font-bold">Redirecting to your registration...</h2>
          <p className="mt-2 text-slate-600">Please wait while we load your information.</p>
        </div>
      </div>
    );
  }

  if (!bookStand) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Stand not found</h2>
          <p className="mt-2">The stand you are looking for does not exist or has been removed.</p>
          <Button 
            className="mt-4"
            onClick={() => router.push('/book-stand')}
          >
            Go to Registration Page
          </Button>
        </div>
      </div>
    );
  }

  // This part of the component will rarely be shown since we're redirecting
  // But we'll keep it as a fallback in case the redirect fails
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Payment for Stand Booking</CardTitle>
          <CardDescription>
            Reference ID: {bookStand.referenceId}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Company Name</h3>
                <p>{bookStand.companyName}</p>
              </div>
              <div>
                <h3 className="font-medium">Contact Name</h3>
                <p>{bookStand.contactName}</p>
              </div>
              <div>
                <h3 className="font-medium">Stand Type</h3>
                <p>{bookStand.standType}</p>
              </div>
              <div>
                <h3 className="font-medium">Payment Method</h3>
                <p>{bookStand.paymentMethod || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between">
                <span className="font-medium">Amount Due:</span>
                <span className="font-bold">${getStandPrice(bookStand.standType).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handlePayment} 
            disabled={processingPayment}
            className="w-full"
          >
            {processingPayment ? 'Processing...' : 'Pay Now'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 