'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Download, Home, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  ticketType: string;
  organization?: string;
  registrationId: string;
  paymentStatus?: string;
}

interface VerifyResponse {
  success: boolean;
  registration: {
    id: number;
    registrationId: string;
    firstName: string;
    lastName: string;
    email: string;
    organization?: string;
    ticketType: string;
    paymentStatus: string;
    latestPayment: {
      reference: string;
      amount: number;
      currency: string;
      status: string;
    } | null;
  };
}

export default function RegistrationSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationId = searchParams.get('registrationId');
  const emailSent = searchParams.get('emailSent') === 'true';
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        // Get registrationId from URL query parameters
        if (!registrationId) {
          toast.error('Registration ID not found');
          router.push('/register-to-attend');
          return;
        }

        // Verify registration exists in database
        const verifyResponse = await fetch(`/api/register-to-attend/verify?registrationId=${registrationId}`);
        if (!verifyResponse.ok) {
          throw new Error('Registration verification failed');
        }

        const verifyData: VerifyResponse = await verifyResponse.json();
        if (!verifyData.success) {
          throw new Error('Registration not found in database');
        }

        // Create registration data from database response
        const registrationData: RegistrationData = {
          firstName: verifyData.registration.firstName,
          lastName: verifyData.registration.lastName,
          email: verifyData.registration.email,
          organization: verifyData.registration.organization,
          ticketType: verifyData.registration.ticketType,
          registrationId: verifyData.registration.registrationId,
          paymentStatus: verifyData.registration.paymentStatus
        };

        // For foreign trade visitors, verify payment status
        if (registrationData.ticketType === 'foreign_trade' && registrationData.paymentStatus !== 'completed') {
          toast.error('Payment verification pending');
          router.push('/register-to-attend');
          return;
        }

        setRegistrationData(registrationData);
      } catch (error) {
        console.error('Error loading registration data:', error);
        toast.error('Failed to load registration data');
        router.push('/register-to-attend');
      } finally {
        setIsLoading(false);
      }
    };

    checkRegistration();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!registrationData) {
    return null;
  }

  // Create QR code data with registration details
  const qrCodeData = `${process.env.NEXT_PUBLIC_APP_URL}/registration-tag?registrationId=${registrationData.registrationId}`;

  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/past-highlight/710-Nigeria-International-Book-Fair-ftw-710x472.jpg"
          alt="NIBF Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="mx-auto md:max-w-2xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-10">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-3 ring-4 ring-green-200">
                <Check className="h-10 w-10 text-green-600" />
              </div>
            </div>
            
            <h1 className="mb-3 text-2xl font-bold text-center text-gray-800">Registration Successful!</h1>
            <p className="mb-6 text-gray-600 text-center text-base">
              Thank you for registering for NIBF 2026. Your registration has been confirmed.
            </p>

            <Card className="mb-6 p-5 border border-gray-200 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-800 border-b pb-2">Registration Details</h2>
              <div className="space-y-2 text-left">
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-medium text-gray-700 text-sm">Registration ID:</span>
                  <span className="font-semibold text-sm">{registrationData.registrationId}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-medium text-gray-700 text-sm">Name:</span>
                  <span className="font-semibold text-sm">{registrationData.firstName} {registrationData.lastName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-medium text-gray-700 text-sm">Email:</span>
                  <span className="font-semibold text-sm">{registrationData.email}</span>
                </div>
                {registrationData.organization && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="font-medium text-gray-700 text-sm">Organization:</span>
                    <span className="font-semibold text-sm">{registrationData.organization}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5">
                  <span className="font-medium text-gray-700 text-sm">Ticket Type:</span>
                  <span className="font-semibold text-sm">{registrationData.ticketType}</span>
                </div>
              </div>
            </Card>

            {/* QR Code Section */}
            <Card className="mb-6 p-5 border border-gray-200 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-800 border-b pb-2">Your QR Code</h2>
              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-3">
                  <QRCodeSVG 
                    value={qrCodeData} 
                    size={180} 
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-xs text-gray-600 text-center">
                  This QR code contains your registration details. You can scan it at the event for quick check-in.
                </p>
              </div>
            </Card>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Button
                onClick={() => router.push(`/registration-tag?registrationId=${registrationData.registrationId}`)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 text-sm"
                disabled={registrationData.ticketType === 'foreign_trade' && registrationData.paymentStatus !== 'completed'}
                title={registrationData.ticketType === 'foreign_trade' && registrationData.paymentStatus !== 'completed' ? 'Payment verification required to print tag' : ''}
              >
                <Download className="mr-2 h-4 w-4" />
                Print Registration Tag
              </Button>
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="flex-1 border-2 py-4 text-sm"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Home page
              </Button>
            </div>

            <div className="mt-8 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-800">
                <span className="font-semibold">Important:</span> A confirmation email has been sent to your registered email address.
                Please save your registration ID for future reference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 