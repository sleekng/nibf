"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

interface DonationDetails {
  reference: string;
  amount: number;
  donorName: string;
  items: Array<{
    title: string;
    quantity: number;
    price: number;
  }>;
}

export default function DonationSuccess() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [donation, setDonation] = useState<DonationDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reference) {
      fetchDonationDetails();
    }
  }, [reference]);

  const fetchDonationDetails = async () => {
    try {
      const response = await fetch(`/api/donations/${reference}`);
      if (response.ok) {
        const data = await response.json();
        setDonation(data);
      }
    } catch (error) {
      console.error('Error fetching donation details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading donation details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Donation Successful</h1>
              <Link
                href="/book-donations"
                className="text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </div>
            <p className="text-indigo-100 mt-2">
              Thank you for your generous donation!
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>

            {donation ? (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Donation Details
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference Number</span>
                      <span className="font-medium">{donation.reference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Donor Name</span>
                      <span className="font-medium">{donation.donorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-medium">₦{donation.amount}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Donated Items
                  </h2>
                  <div className="space-y-3">
                    {donation.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">
                          {item.title} (x{item.quantity})
                        </span>
                        <span className="font-medium">
                          ₦{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center text-gray-600">
                  <p>
                    A confirmation email has been sent to your registered email
                    address.
                  </p>
                  <p className="mt-2">
                    If you have any questions, please contact our support team.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-600">
                <p>Unable to load donation details.</p>
                <p className="mt-2">
                  Please contact our support team with your reference number: {reference}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 