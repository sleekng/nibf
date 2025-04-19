'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { ArrowLeft, Download, Printer } from 'lucide-react';
import Link from 'next/link';
import { UserDetailsModal } from '@/components/UserDetailsModal';
import { SearchInput } from '@/components/SearchInput';
import { exportToCSV } from '@/lib/exportUtils';
import { Badge } from "@/components/ui/badge";

interface Attendee {
  id: number;
  registration_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  ticket_type: string;
  created_at: string;
  job_title: string | null;
  country: string | null;
  interests: string | null;
  special_requirements: string | null;
  terms_accepted: boolean;
  newsletter_subscribed: boolean;
  payment_status: string;
}

// Add TicketTypeBadge component
const TicketTypeBadge = ({ type }: { type: string }) => {
  const getTicketTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'regular':
        return 'bg-blue-100 text-blue-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      case 'early bird':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Badge className={`${getTicketTypeColor(type)} font-medium`}>
      {type.toUpperCase()}
    </Badge>
  );
};

// Add PaymentStatusBadge component
const PaymentStatusBadge = ({ status }: { status: string | null | undefined }) => {
  const getPaymentStatusColor = (status: string | null | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status.toLowerCase()) {

      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Badge className={`${getPaymentStatusColor(status)} font-medium`}>
      {status ? status.toUpperCase() : 'N/A'}
    </Badge>
  );
};

export default function AttendeesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // This is a fallback in case the middleware doesn't catch the request
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAttendees();
    }
  }, [status]);

  const fetchAttendees = async () => {
    try {
      const response = await fetch('/api/attendees');
      const data = await response.json();
      if (data.attendees) {
        setAttendees(data.attendees);
      }
    } catch (error) {
      console.error('Error fetching attendees:', error);
      toast.error('Failed to fetch attendees');
    } finally {
      setLoading(false);
    }
  };

  // Filter attendees based on search query
  const filteredAttendees = useMemo(() => {
    if (!searchQuery.trim()) return attendees.filter(attendee => attendee.ticket_type !== 'book_stand');
    
    const query = searchQuery.toLowerCase();
    return attendees.filter(attendee => 
      attendee.ticket_type !== 'book_stand' && (
        attendee.registration_id.toLowerCase().includes(query) ||
        attendee.first_name.toLowerCase().includes(query) ||
        attendee.last_name.toLowerCase().includes(query) ||
        attendee.email.toLowerCase().includes(query) ||
        (attendee.organization && attendee.organization.toLowerCase().includes(query)) ||
        attendee.ticket_type.toLowerCase().includes(query)
      )
    );
  }, [attendees, searchQuery]);

  const handleExportCSV = () => {
    try {
      // Prepare data for export by selecting and formatting specific fields
      const exportData = filteredAttendees.map(attendee => ({
        'Registration ID': attendee.registration_id,
        'First Name': attendee.first_name,
        'Last Name': attendee.last_name,
        'Email': attendee.email,
        'Phone': attendee.phone || '',
        'Organization': attendee.organization || '',
        'Job Title': attendee.job_title || '',
        'Country': attendee.country || '',
        'Ticket Type': attendee.ticket_type,
        'Registration Date': new Date(attendee.created_at).toLocaleDateString(),
        'Newsletter Subscribed': attendee.newsletter_subscribed ? 'Yes' : 'No',
        'Special Requirements': attendee.special_requirements || '',
        'Interests': attendee.interests || ''
      }));

      exportToCSV(exportData, `attendees-${new Date().toISOString().split('T')[0]}`);
      toast.success('Export completed successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Attendees</h1>
        <Link href="/dashboard">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <CardTitle>Attendee List</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleExportCSV}
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
            <div className="w-64">
              <SearchInput 
                value={searchQuery} 
                onChange={setSearchQuery} 
                placeholder="Search by ID, name, email..." 
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No attendees found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAttendees.map((attendee) => (
                  <TableRow 
                    key={attendee.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      setSelectedAttendee(attendee);
                      setIsModalOpen(true);
                    }}
                  >
                    <TableCell>{attendee.first_name}</TableCell>
                    <TableCell>{attendee.last_name}</TableCell>
                    <TableCell>{attendee.email}</TableCell>
                    <TableCell>{attendee.phone}</TableCell>
                    <TableCell>{attendee.organization || 'N/A'}</TableCell>
                    <TableCell>
                      <TicketTypeBadge type={attendee.ticket_type} />
                    </TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={attendee.payment_status} />
                    </TableCell>
                    <TableCell>{new Date(attendee.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/registration-tag?registrationId=${encodeURIComponent(attendee.registration_id)}`} target="_blank">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Printer className="h-4 w-4" />
                          Print Tag
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <UserDetailsModal
        user={selectedAttendee}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAttendee(null);
        }}
        type="attendee"
      />
    </div>
  );
} 