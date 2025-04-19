'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { ExhibitorDetailsModal } from '@/components/ExhibitorDetailsModal';
import { Download, Users, Building, Heart, TrendingUp, AlertCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from '@/components/SearchInput';
import { Badge } from "@/components/ui/badge";

interface BookStand {
  id: string;
  referenceId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  standType: string;
  paymentMethod: string;
  additionalRequirements: string;
  status: string;
  adminConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AnalyticsData {
  totalAttendees: number;
  totalExhibitors: number;
  donations: {
    total: number;
    successful: number;
    pending: number;
    failed: number;
    totalAmount: number;
    recent: Array<{
      id: number;
      amount: number;
      status: string;
      created_at: string;
      donor: {
        name: string;
        email: string;
      };
    }>;
  };
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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookStands, setBookStands] = useState<BookStand[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExhibitor, setSelectedExhibitor] = useState<BookStand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalAttendees: 0,
    totalExhibitors: 0,
    donations: {
      total: 0,
      successful: 0,
      pending: 0,
      failed: 0,
      totalAmount: 0,
      recent: []
    }
  });
  const [searchQuery, setSearchQuery] = useState('');

  // This is a fallback in case the middleware doesn't catch the request
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchBookStands();
      fetchAnalyticsData();
    }
  }, [status]);

  const fetchBookStands = async () => {
    try {
      const response = await fetch('/api/book-stand/admin/list');
      const data = await response.json();
      if (data.bookStands) {
        setBookStands(data.bookStands);
      }
    } catch (error) {
      console.error('Error fetching book stands:', error);
      toast.error('Failed to fetch book stands');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to fetch analytics data');
    }
  };

  const handleExportData = async (format: 'csv' | 'excel') => {
    try {
      const response = await fetch(`/api/export?format=${format}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(`Data exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
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
        fetchBookStands();
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
        fetchBookStands();
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

  // Filter book stands based on search query
  const filteredBookStands = useMemo(() => {
    if (!searchQuery.trim()) return bookStands;
    
    const query = searchQuery.toLowerCase();
    return bookStands.filter(stand => 
      stand.referenceId.toLowerCase().includes(query) ||
      stand.companyName.toLowerCase().includes(query) ||
      stand.contactName.toLowerCase().includes(query) ||
      stand.email.toLowerCase().includes(query) ||
      stand.phone.toLowerCase().includes(query) ||
      stand.standType.toLowerCase().includes(query) ||
      stand.status.toLowerCase().includes(query)
    );
  }, [bookStands, searchQuery]);

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
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalAttendees}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exhibitors</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalExhibitors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.donations.total}</div>
            <p className="text-xs text-muted-foreground">
              ₦{analyticsData.donations.totalAmount.toLocaleString()} raised
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donation Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600">Successful</span>
                <span className="font-medium">{analyticsData.donations.successful}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-600">Pending</span>
                <span className="font-medium">{analyticsData.donations.pending}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-600">Failed</span>
                <span className="font-medium">{analyticsData.donations.failed}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analyticsData.donations.recent.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    {new Date(donation.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{donation.donor.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {donation.donor.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>₦{donation.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        donation.status === 'successful'
                          ? 'default'
                          : donation.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className={
                        donation.status === 'successful'
                          ? 'bg-green-100 text-green-800'
                          : donation.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {donation.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Welcome, {session?.user?.name}!</h2>
        
        {/* Export Controls */}
        <div className="mb-8 flex justify-end space-x-4">
          <Button
            onClick={() => handleExportData('csv')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            onClick={() => handleExportData('excel')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
        </div>

        {/* Stand Applications Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Stand Applications</CardTitle>
                <div className="w-64">
                  <SearchInput 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                    placeholder="Search applications..." 
                  />
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookStands.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookStands.map((stand) => (
                    <TableRow 
                      key={stand.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setSelectedExhibitor(stand);
                        setIsModalOpen(true);
                      }}
                    >
                      <TableCell>{stand.referenceId}</TableCell>
                      <TableCell>{stand.companyName}</TableCell>
                      <TableCell>{stand.contactName}</TableCell>
                      <TableCell>{stand.standType}</TableCell>
                      <TableCell>
                        <StatusBadge status={stand.status} />
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2">
                          {!stand.adminConfirmed && (
                            <Button
                              onClick={() => handleConfirm(stand.referenceId)}
                              variant="outline"
                              size="sm"
                            >
                              Confirm
                            </Button>
                          )}
                          {stand.adminConfirmed && stand.status === 'confirmed' && (
                            <Button
                              onClick={() => handleSendPaymentLink(stand.referenceId)}
                              variant="outline"
                              size="sm"
                            >
                              Send Payment Link
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <ExhibitorDetailsModal
        exhibitor={selectedExhibitor}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExhibitor(null);
        }}
        onConfirm={handleConfirm}
        onSendPaymentLink={handleSendPaymentLink}
      />
    </div>
  );
}
