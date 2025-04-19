'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import { UserDetailsModal } from '@/components/UserDetailsModal';
import { SearchInput } from '@/components/SearchInput';
import { exportToCSV } from '@/lib/exportUtils';
import { Badge } from "@/components/ui/badge";

interface Exhibitor {
  id: number;
  referenceId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  standType: string;
  status: string;
  adminConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  additionalRequirements?: string;
}

// Add StatusBadge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'payment_pending':
        return 'bg-orange-100 text-orange-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'payment_pending':
        return 'PAYMENT PENDING';
      default:
        return status.toUpperCase();
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} font-medium`}>
      {formatStatus(status)}
    </Badge>
  );
};

// Add StatusLegend component
const StatusLegend = () => {
  const statuses = [
    { status: 'pending', label: 'Pending' },
    { status: 'confirmed', label: 'Confirmed' },
    { status: 'payment_pending', label: 'Payment Pending' },
    { status: 'paid', label: 'Paid' }
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <span className="text-sm text-gray-500">Status:</span>
      {statuses.map(({ status, label }) => (
        <div key={status} className="flex items-center gap-2">
          <StatusBadge status={status} />
          <span className="text-sm text-gray-600">- {label}</span>
        </div>
      ))}
    </div>
  );
};

export default function ExhibitorsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor | null>(null);
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
      fetchExhibitors();
    }
  }, [status]);

  const fetchExhibitors = async () => {
    try {
      const response = await fetch('/api/book-stand/admin/list');
      const data = await response.json();
      if (data.bookStands) {
        setExhibitors(data.bookStands);
      }
    } catch (error) {
      console.error('Error fetching exhibitors:', error);
      toast.error('Failed to fetch exhibitors');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (referenceId: string) => {
    try {
      const response = await fetch('/api/book-stand/admin/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referenceId }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Application confirmed successfully');
        fetchExhibitors();
      } else {
        toast.error(data.error || 'Failed to confirm application');
      }
    } catch (error) {
      console.error('Error confirming application:', error);
      toast.error('Failed to confirm application');
    }
  };

  const handleSendPaymentLink = async (referenceId: string) => {
    try {
      toast.info('Sending payment link...');
      
      const response = await fetch('/api/book-stand/admin/send-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referenceId }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Payment link sent successfully');
        fetchExhibitors();
      } else {
        console.error('Error response:', data);
        toast.error(data.error || 'Failed to send payment link');
        if (data.details) {
          console.error('Error details:', data.details);
        }
      }
    } catch (error) {
      console.error('Error sending payment link:', error);
      toast.error('Failed to send payment link. Please try again later.');
    }
  };

  // Filter exhibitors based on search query
  const filteredExhibitors = useMemo(() => {
    if (!searchQuery.trim()) return exhibitors;
    
    const query = searchQuery.toLowerCase();
    return exhibitors.filter(exhibitor => 
      exhibitor.referenceId.toLowerCase().includes(query) ||
      exhibitor.companyName.toLowerCase().includes(query) ||
      exhibitor.contactName.toLowerCase().includes(query) ||
      exhibitor.email.toLowerCase().includes(query) ||
      exhibitor.phone.toLowerCase().includes(query) ||
      exhibitor.standType.toLowerCase().includes(query) ||
      exhibitor.status.toLowerCase().includes(query)
    );
  }, [exhibitors, searchQuery]);

  const handleExportCSV = () => {
    try {
      // Prepare data for export by selecting and formatting specific fields
      const exportData = filteredExhibitors.map(exhibitor => ({
        'Reference ID': exhibitor.referenceId,
        'Company Name': exhibitor.companyName,
        'Contact Name': exhibitor.contactName,
        'Email': exhibitor.email,
        'Phone': exhibitor.phone,
        'Stand Type': exhibitor.standType,
        'Status': exhibitor.status,
        'Admin Confirmed': exhibitor.adminConfirmed ? 'Yes' : 'No',
        'Application Date': new Date(exhibitor.createdAt).toLocaleDateString(),
        'Additional Requirements': exhibitor.additionalRequirements || ''
      }));

      exportToCSV(exportData, `exhibitors-${new Date().toISOString().split('T')[0]}`);
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
        <h1 className="text-3xl font-bold">Exhibitors</h1>
        <Link href="/dashboard">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Exhibitors</CardTitle>
              <div className="flex items-center gap-4">
                <div className="w-64">
                  <SearchInput 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                    placeholder="Search exhibitors..." 
                  />
                </div>
                <Button
                  onClick={handleExportCSV}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>
            <StatusLegend />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Stand Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Application Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExhibitors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No exhibitors found
                  </TableCell>
                </TableRow>
              ) : (
                filteredExhibitors.map((exhibitor) => (
                  <TableRow 
                    key={exhibitor.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      setSelectedExhibitor(exhibitor);
                      setIsModalOpen(true);
                    }}
                  >
                    <TableCell>{exhibitor.referenceId}</TableCell>
                    <TableCell>{exhibitor.companyName}</TableCell>
                    <TableCell>{exhibitor.contactName}</TableCell>
                    <TableCell>{exhibitor.standType}</TableCell>
                    <TableCell>
                      <StatusBadge status={exhibitor.status} />
                    </TableCell>
                    <TableCell>{new Date(exhibitor.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <UserDetailsModal
        user={selectedExhibitor}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExhibitor(null);
        }}
        type="exhibitor"
        onConfirm={handleConfirm}
        onSendPaymentLink={handleSendPaymentLink}
      />
    </div>
  );
} 