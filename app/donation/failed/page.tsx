"use client";

import { useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DonationFailed() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Donation Failed</h1>
              <Link
                href="/book-donations"
                className="text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </div>
            <p className="text-red-100 mt-2">
              We encountered an issue processing your donation.
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-red-100 rounded-full p-3">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                {error === 'verification_failed' ? (
                  <p className="text-gray-600">
                    We were unable to verify your payment. Please contact our
                    support team for assistance.
                  </p>
                ) : (
                  <p className="text-gray-600">
                    Your payment was not successful. Please try again or contact
                    your bank for more information.
                  </p>
                )}
              </div>

              {reference && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">
                    Reference Number: <span className="font-medium">{reference}</span>
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Link
                  href="/book-donations"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Try Again
                </Link>
                <p className="text-sm text-gray-500">
                  If you continue to experience issues, please contact our support
                  team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 