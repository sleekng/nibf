import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookStand } from '@/types/bookStand';

interface ExhibitorDetailsModalProps {
  exhibitor: BookStand | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (referenceId: string) => void;
  onSendPaymentLink?: (referenceId: string) => void;
}

export function ExhibitorDetailsModal({
  exhibitor,
  isOpen,
  onClose,
  onConfirm,
  onSendPaymentLink,
}: ExhibitorDetailsModalProps) {
  if (!exhibitor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Exhibitor Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Reference ID</h3>
              <p>{exhibitor.referenceId}</p>
            </div>
            <div>
              <h3 className="font-medium">Company Name</h3>
              <p>{exhibitor.companyName}</p>
            </div>
            <div>
              <h3 className="font-medium">Contact Name</h3>
              <p>{exhibitor.contactName}</p>
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <p>{exhibitor.email}</p>
            </div>
            <div>
              <h3 className="font-medium">Phone</h3>
              <p>{exhibitor.phone}</p>
            </div>
            <div>
              <h3 className="font-medium">Stand Type</h3>
              <p>{exhibitor.standType}</p>
            </div>
            <div>
              <h3 className="font-medium">Payment Method</h3>
              <p>{exhibitor.paymentMethod}</p>
            </div>
            <div>
              <h3 className="font-medium">Status</h3>
              <p>{exhibitor.status}</p>
            </div>
            <div className="col-span-2">
              <h3 className="font-medium">Additional Requirements</h3>
              <p>{exhibitor.additionalRequirements || 'None'}</p>
            </div>
            <div>
              <h3 className="font-medium">Created At</h3>
              <p>{new Date(exhibitor.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-medium">Updated At</h3>
              <p>{new Date(exhibitor.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          {!exhibitor.adminConfirmed && onConfirm && (
            <Button 
              onClick={() => onConfirm(exhibitor.referenceId)}
              variant="outline"
            >
              Confirm Application
            </Button>
          )}

          
          {exhibitor.adminConfirmed && (exhibitor.status === 'payment_pending' || exhibitor.status === 'confirmed')  && onSendPaymentLink && (
            <Button 
              onClick={() => onSendPaymentLink(exhibitor.referenceId)}
              variant="outline"
            >
              Send Payment Link
            </Button>
          )}
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 