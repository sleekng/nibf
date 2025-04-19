import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UserDetailsModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  type: 'attendee' | 'exhibitor';
  onConfirm?: (referenceId: string) => void;
  onSendPaymentLink?: (referenceId: string) => void;
}

export function UserDetailsModal({
  user,
  isOpen,
  onClose,
  type,
  onConfirm,
  onSendPaymentLink
}: UserDetailsModalProps) {
  if (!user) return null;

  const handleConfirm = async () => {
    if (onConfirm && user.referenceId) {
      try {
        await onConfirm(user.referenceId);
        onClose();
      } catch (error) {
        console.error('Error confirming:', error);
      }
    }
  };

  const handleSendPaymentLink = async () => {
    if (onSendPaymentLink && user.referenceId) {
      try {
        await onSendPaymentLink(user.referenceId);
        onClose();
      } catch (error) {
        console.error('Error sending payment link:', error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {type === 'attendee' ? 'Attendee Details' : 'Exhibitor Details'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {type === 'attendee' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Registration ID</h3>
                  <p>{user.registration_id}</p>
                </div>
                <div>
                  <h3 className="font-medium">Name</h3>
                  <p>{user.first_name} {user.last_name}</p>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>{user.phone || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-medium">Organization</h3>
                  <p>{user.organization || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-medium">Job Title</h3>
                  <p>{user.job_title || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-medium">Country</h3>
                  <p>{user.country || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-medium">Ticket Type</h3>
                  <p>{user.ticket_type}</p>
                </div>
                <div>
                  <h3 className="font-medium">Registration Date</h3>
                  <p>{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-medium">Terms Accepted</h3>
                  <p>{user.terms_accepted ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <h3 className="font-medium">Newsletter Subscribed</h3>
                  <p>{user.newsletter_subscribed ? 'Yes' : 'No'}</p>
                </div>
                {user.interests && (
                  <div className="col-span-2">
                    <h3 className="font-medium">Interests</h3>
                    <div className="mt-1">
                      {formatInterests(user.interests)}
                    </div>
                  </div>
                )}
                {user.special_requirements && (
                  <div className="col-span-2">
                    <h3 className="font-medium">Special Requirements</h3>
                    <p>{user.special_requirements}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Reference ID</h3>
                  <p>{user.referenceId}</p>
                </div>
                <div>
                  <h3 className="font-medium">Company Name</h3>
                  <p>{user.companyName}</p>
                </div>
                <div>
                  <h3 className="font-medium">Contact Name</h3>
                  <p>{user.contactName}</p>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>{user.phone}</p>
                </div>
                <div>
                  <h3 className="font-medium">Stand Type</h3>
                  <p>{user.standType}</p>
                </div>
                <div>
                  <h3 className="font-medium">Status</h3>
                  <p>{user.status}</p>
                </div>
                <div>
                  <h3 className="font-medium">Admin Confirmed</h3>
                  <p>{user.adminConfirmed ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <h3 className="font-medium">Application Date</h3>
                  <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                {user.additionalRequirements && (
                  <div className="col-span-2">
                    <h3 className="font-medium">Additional Requirements</h3>
                    <p>{user.additionalRequirements}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                {!user.adminConfirmed && onConfirm && (
                  <Button onClick={handleConfirm}>
                    Confirm Application
                  </Button>
                )}
                {user.adminConfirmed && user.status === 'confirmed' && onSendPaymentLink && (
                  <Button onClick={handleSendPaymentLink}>
                    Send Payment Link
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function formatInterests(interests: string): React.ReactNode {
  try {
    // Try to parse as JSON first
    const parsedInterests = JSON.parse(interests);
    if (Array.isArray(parsedInterests)) {
      return (
        <ul className="list-disc pl-5 space-y-1">
          {parsedInterests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      );
    }
  } catch (e) {
    // If not JSON, try comma-separated values
    if (interests.includes(',')) {
      const interestList = interests.split(',').map(item => item.trim());
      return (
        <ul className="list-disc pl-5 space-y-1">
          {interestList.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      );
    }
  }
  
  // If neither JSON nor comma-separated, just return as is
  return <p>{interests}</p>;
} 