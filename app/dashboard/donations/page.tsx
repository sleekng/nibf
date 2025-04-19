'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { DonationRecord, Donor, DonationItem, Book } from '@prisma/client';
import { Button } from "@/components/ui/button";
import { Eye, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DonationWithDetails extends DonationRecord {
  donor: Donor;
  items: (DonationItem & {
    book: Book;
  })[];
}

export default function DonationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [donations, setDonations] = useState<DonationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState<DonationWithDetails | null>(null);
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [showDonorModal, setShowDonorModal] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('/api/donations');
        if (response.ok) {
          const data = await response.json();
          setDonations(data);
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Donations Management</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left">Date</th>
              <th className="py-3 px-4 border-b text-left">Donor</th>
              <th className="py-3 px-4 border-b text-left">Amount</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
              <th className="py-3 px-4 border-b text-left">Reference</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">
                  {format(new Date(donation.created_at), 'MMM dd, yyyy HH:mm')}
                </td>
                <td className="py-3 px-4 border-b">
                  <div>
                    <p className="font-medium">{donation.donor.name}</p>
                    <p className="text-sm text-gray-600">{donation.donor.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4 border-b">
                  ₦{donation.amount.toLocaleString()}
                </td>
                <td className="py-3 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    donation.status === 'successful'
                      ? 'bg-green-100 text-green-800'
                      : donation.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {donation.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">
                  <code className="text-sm">{donation.reference}</code>
                </td>
                <td className="py-3 px-4 border-b">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedDonation(donation);
                        setShowItemsModal(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Items
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedDonation(donation);
                        setShowDonorModal(true);
                      }}
                    >
                      <User className="w-4 h-4 mr-1" />
                      View Donor
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Items Modal */}
      <Dialog open={showItemsModal} onOpenChange={setShowItemsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Donated Items</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedDonation?.items.map((item) => (
              <div key={item.id} className="border-b py-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item.book.title}</h3>
                    <p className="text-sm text-gray-600">Author: {item.book.author}</p>
                    <p className="text-sm text-gray-600">Category: {item.book.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">
                      Price: ₦{item.book.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total: ₦{(Number(item.book.price) * Number(item.quantity)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Donor Modal */}
      <Dialog open={showDonorModal} onOpenChange={setShowDonorModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Donor Information</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {selectedDonation && (
              <>
                <div>
                  <h3 className="font-medium text-gray-900">Personal Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedDonation.donor.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedDonation.donor.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedDonation.donor.phone}</p>
                    <p><span className="font-medium">Address:</span> {selectedDonation.donor.address || 'Not provided'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Donation Details</h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Date:</span> {format(new Date(selectedDonation.created_at), 'MMM dd, yyyy HH:mm')}</p>
                    <p><span className="font-medium">Amount:</span> ₦{selectedDonation.amount.toLocaleString()}</p>
                    <p><span className="font-medium">Status:</span> {selectedDonation.status}</p>
                    <p><span className="font-medium">Reference:</span> {selectedDonation.reference}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 