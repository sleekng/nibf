"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Printer, Download, Check, User, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { QRCodeSVG } from "qrcode.react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface RegistrationData {
  id: number;
  registrationId: string;
  firstName: string;
  lastName: string;
  organization?: string;
  jobTitle?: string;
  email: string;
  phone?: string;
  country?: string;
  interests?: string[];
  specialRequirements?: string;
  ticketType: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export default function RegistrationTagPage() {
  const [userData, setUserData] = useState<RegistrationData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isPrintSuccess, setIsPrintSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Load registration data from API
  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        // Get registration ID from URL parameter or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const urlRegistrationId = urlParams.get('registrationId');
        
        let registrationId;
        
        if (urlRegistrationId) {
          // Use registration ID from URL parameter
          registrationId = urlRegistrationId;
          
          // Store in localStorage for future use
          const storedData = localStorage.getItem('registrationData');
          const data = storedData ? JSON.parse(storedData) : {};
          data.registrationId = registrationId;
          localStorage.setItem('registrationData', JSON.stringify(data));
        } else {
          // Try to get registration ID from localStorage
          const storedData = localStorage.getItem('registrationData');
          if (!storedData) {
            setError('No registration data found');
            setIsLoading(false);
            return;
          }
          registrationId = JSON.parse(storedData).registrationId;
        }
        
        // Fetch fresh data from the API
        const response = await fetch(`/api/registration-tag?registrationId=${registrationId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch registration data');
        }

        // Check if this is a foreign trade visitor with pending payment
        if (data.registration.ticketType === 'foreign_trade' && 
            data.registration.paymentStatus === 'pending') {
          // Store registration data in localStorage for form population
          localStorage.setItem('registrationData', JSON.stringify(data.registration));
          
          // Redirect to registration page's payment step
          window.location.href = `/register-to-attend?step=3&registrationId=${data.registration.registrationId}`;
          return;
        }

        setUserData(data.registration);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching registration data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrationData();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-navy-200 border-t-navy-500"></div>
          <p className="text-lg font-medium text-navy-500">Loading registration data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 rounded-full bg-red-100 p-3">
            <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-navy-500">Error Loading Registration</h2>
          <p className="text-slate-600">{error}</p>
          <Button
            onClick={() => window.location.href = '/register-to-attend'}
            className="mt-6 bg-crimson-500 hover:bg-crimson-600"
          >
            Return to Registration
          </Button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const handlePrint = () => {
    setIsPrinting(true)

    // Add a small delay to show the "Printing..." state
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
      setIsPrintSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsPrintSuccess(false)
      }, 3000)
    }, 500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    if (!userData) return;
    
    setUserData({
      ...userData,
      [id]: value,
    })
  }

  const handleSelectChange = (value: string) => {
    if (!userData) return;
    
    setUserData({
      ...userData,
      ticketType: value,
    })
  }

  // Function to save changes to localStorage and database
  const saveChanges = async () => {
    if (!userData) return;
    
    try {

      // Save to database through API
      const response = await fetch(`/api/registration-tag?registrationId=${userData.registrationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      setIsEditing(false);
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Failed to save changes');
    }
  }

  const getTicketTypeColor = () => {
    switch (userData.ticketType) {
      case "staff":
        return "bg-crimson-500"
        case "attendee":
        return "bg-blue-500"
      case "vip":
        return "bg-purple-500"
      case "exhibitor":
        return "bg-green-500"
      case "speaker":
        return "bg-amber-500"
      case "press":
        return "bg-teal-500"
      default:
        return "bg-navy-500"
    }
  }

  const getTicketTypeName = () => {
    switch (userData.ticketType) {
      case "staff":
        return "Staff"
      case "attendee":
        return "Attendee"
      case "vip":
        return "VIP"
      case "exhibitor":
        return "Exhibitor"
      case "speaker":
        return "Speaker"
      case "press":
        return "Press"
      default:
        return "Attendee"
    }
  }

  // Create QR code data with registration details
  const getQrCodeData = () => {
    if (!userData) return "";
    
    return `${process.env.NEXT_PUBLIC_APP_URL}/registration-tag?registrationId=${userData.registrationId}`;
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="bg-navy-500 px-4 py-20 text-white no-print">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="mb-6 text-4xl font-bold md:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Registration Tag
            </motion.h1>
            <motion.p
              className="text-lg text-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Print your official NIBF 2025 registration tag to wear at the event
            </motion.p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 no-print">
        <div className="container mx-auto max-w-6xl">
          {session ? (
            // Two-column layout for logged-in users
            <div className="grid gap-8 md:grid-cols-2">
              {/* Tag Preview */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="mb-6 rounded-lg bg-white p-6 shadow-md w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="mb-4 text-2xl font-bold text-navy-500 text-center">Tag Preview</h2>
                  <p className="mb-6 text-slate-600 text-center">
                    This is how your tag will look when printed. Please ensure all information is correct.
                  </p>

                  {/* The actual tag that will be printed */}
                  <div className="flex justify-center">
                    <motion.div
                      ref={tagRef}
                      className="relative w-[3.5in] h-[5.5in] bg-white border-2 border-navy-200 rounded-lg overflow-hidden shadow-lg print:shadow-none"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Header with logo and event name */}
                      <div className="bg-navy-500 px-4 py-4 text-white relative overflow-hidden">
                        {/* Background image with overlay */}
                        <div className="absolute inset-0 z-0">
                          <Image
                            src="/images/past-highlight/710-Nigeria-International-Book-Fair-ftw-710x472.jpg"
                            alt="NIBF Background"
                            fill
                            className="object-cover opacity-30"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-navy-600 to-navy-800 opacity-80"></div>
                        </div>
                        <div className="flex items-center justify-between relative z-10">
                          <div className="text-2xl font-bold">NIBF 2025</div>
                          <div className="relative h-10 w-28">
                            <Image
                              src="/images/nibf-logo.png"
                              alt="NIBF Logo"
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
                        </div>
                      </div>

                      {/* Ticket type banner */}
                      <div className={`${getTicketTypeColor()} px-4 py-3 text-center text-white font-bold text-5xl`}>
                        {getTicketTypeName()}
                      </div>

                      {/* Main content */}
                      <div className="p-2">
                        {/* Attendee information */}
                        <div className="mb-4 text-center">
                          <h3 className="text-2xl font-bold text-navy-800">{`${userData.firstName} ${userData.lastName}`}</h3>
                          <p className="text-lg text-navy-600">{userData.organization}</p>
                          <p className="text-md text-slate-600">{userData.jobTitle}</p>
                        </div>

                        

                        {/* QR Code placeholder - reduced size */}
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-md border border-slate-200">
                          <QRCodeSVG 
                            value={getQrCodeData()} 
                            size={90} 
                            level="H"
                            includeMargin={true}
                          />
                        </div>

                          {/* Registration ID */}
                        <div className="mb-4 rounded-md bg-slate-50 p-2 text-center">
                          <p className="text-xs text-slate-500">Registration ID</p>
                          <p className="font-mono text-sm font-bold text-navy-600">{userData.registrationId}</p>
                        </div>

                        {/* Event details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-crimson-500" />
                            <span className="text-slate-600">May 7-9, 2025</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-crimson-500" />
                            <span className="text-slate-600">Balmoral Convention Centre, Lagos</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="absolute bottom-0 left-0 right-0 bg-navy-50 p-1 text-center text-xs text-slate-600">
                        <p>Please wear this tag at all times during the event</p>
                        <p>www.nibfng.org</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button onClick={handlePrint} className="bg-crimson-500 hover:bg-crimson-600" disabled={isPrinting}>
                    {isPrinting ? (
                      "Printing..."
                    ) : (
                      <>
                        <Printer className="mr-2 h-4 w-4" /> Print Tag
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-navy-500 bg-white hover:text-navy-500 text-navy-500 hover:bg-navy-50"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel Editing" : "Edit Information"}
                  </Button>
                </motion.div>

                {isPrintSuccess && (
                  <motion.div
                    className="mt-4 flex items-center rounded-md bg-green-50 px-4 py-2 text-green-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Check className="mr-2 h-5 w-5 text-green-600" />
                    <span>Print job sent successfully!</span>
                  </motion.div>
                )}
              </div>

              {/* Edit Information Form - Only visible when logged in */}
              <motion.div
                className="rounded-lg bg-white p-6 shadow-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="mb-4 text-2xl font-bold text-navy-500">
                  {isEditing ? "Edit Your Information" : "Your Registration Information"}
                </h2>
                <p className="mb-6 text-slate-600">
                  {isEditing
                    ? "Update your information below. Changes will be reflected on your tag."
                    : "This information will be displayed on your registration tag. Click 'Edit Information' to make changes."}
                </p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                      />
                    ) : (
                      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">{userData.firstName}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                      />
                    ) : (
                      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                        {userData.lastName}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="organization" className="text-sm font-medium text-slate-700">
                      Organization/Company
                    </label>
                    {isEditing ? (
                      <Input
                        id="organization"
                        value={userData.organization}
                        onChange={handleInputChange}
                        placeholder="Enter your organization"
                      />
                    ) : (
                      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                        {userData.organization}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="jobTitle" className="text-sm font-medium text-slate-700">
                      Job Title
                    </label>
                    {isEditing ? (
                      <Input
                        id="jobTitle"
                        value={userData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="Enter your job title"
                      />
                    ) : (
                      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                        {userData.jobTitle}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-700">
                        Email Address
                      </label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                        />
                      ) : (
                        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">{userData.email}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">{userData.phone}</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="ticketType" className="text-sm font-medium text-slate-700">
                      Ticket Type
                    </label>
                    {isEditing ? (
                      <Select value={userData.ticketType} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ticket type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="attendee">Attendee</SelectItem>
                          <SelectItem value="vip">VIP</SelectItem>
                          <SelectItem value="exhibitor">Exhibitor</SelectItem>
                          <SelectItem value="speaker">Speaker</SelectItem>
                          <SelectItem value="press">Press</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                        {getTicketTypeName()}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Registration ID</label>
                    <div className="rounded-md border text-navy-600 border-slate-200 bg-slate-50 px-3 py-2 font-mono">
                      {userData.registrationId}
                    </div>
                    <p className="text-xs text-slate-500">Your unique registration ID. This cannot be changed.</p>
                  </div>

                  {isEditing && (
                    <Button className="w-full bg-navy-500 hover:bg-navy-600" onClick={saveChanges}>
                      Save Changes
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            // Centered layout for non-logged-in users
            <div className="flex justify-center">
              {/* Tag Preview */}
              <div className="flex flex-col items-center max-w-2xl w-full">
                <motion.div
                  className="mb-6 rounded-lg bg-white p-6 shadow-md w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="mb-4 text-2xl font-bold text-navy-500 text-center">Tag Preview</h2>
                  <p className="mb-6 text-slate-600 text-center">
                    This is how your tag will look when printed. Please ensure all information is correct.
                  </p>

                  {/* The actual tag that will be printed */}
                  <div className="flex justify-center">
                    <motion.div
                      ref={tagRef}
                      className="relative w-[3.5in] h-[5.5in] bg-white border-2 border-navy-200 rounded-lg overflow-hidden shadow-lg print:shadow-none"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Header with logo and event name */}
                      <div className="bg-navy-500 px-4 py-4 text-white relative overflow-hidden">
                        {/* Background image with overlay */}
                        <div className="absolute inset-0 z-0">
                          <Image
                            src="/images/past-highlight/710-Nigeria-International-Book-Fair-ftw-710x472.jpg"
                            alt="NIBF Background"
                            fill
                            className="object-cover opacity-30"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-navy-600 to-navy-800 opacity-80"></div>
                        </div>
                        <div className="flex items-center justify-between relative z-10">
                          <div className="text-2xl font-bold">NIBF 2025</div>
                          <div className="relative h-10 w-28">
                            <Image
                              src="/images/nibf-logo.png"
                              alt="NIBF Logo"
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
                        </div>
                      </div>

                      {/* Ticket type banner */}
                      <div className={`${getTicketTypeColor()} px-4 py-3 text-center text-white font-bold text-5xl`}>
                        {getTicketTypeName()}
                      </div>

                      {/* Main content */}
                      <div className="p-2">
                        {/* Attendee information */}
                        <div className="mb-4 text-center">
                          <h3 className="text-2xl font-bold text-navy-800">{`${userData.firstName} ${userData.lastName}`}</h3>
                          <p className="text-lg text-navy-600">{userData.organization}</p>
                          <p className="text-md text-slate-600">{userData.jobTitle}</p>
                        </div>

                        

                        {/* QR Code placeholder - reduced size */}
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-md border border-slate-200">
                          <QRCodeSVG 
                            value={getQrCodeData()} 
                            size={90} 
                            level="H"
                            includeMargin={true}
                          />
                        </div>

                          {/* Registration ID */}
                        <div className="mb-4 rounded-md bg-slate-50 p-2 text-center">
                          <p className="text-xs text-slate-500">Registration ID</p>
                          <p className="font-mono text-sm font-bold text-navy-600">{userData.registrationId}</p>
                        </div>

                        {/* Event details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-crimson-500" />
                            <span className="text-slate-600">May 7-9, 2025</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-crimson-500" />
                            <span className="text-slate-600">Balmoral Convention Centre, Lagos</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="absolute bottom-0 left-0 right-0 bg-navy-50 p-1 text-center text-xs text-slate-600">
                        <p>Please wear this tag at all times during the event</p>
                        <p>www.nibfng.org</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button onClick={handlePrint} className="bg-crimson-500 hover:bg-crimson-600" disabled={isPrinting}>
                    {isPrinting ? (
                      "Printing..."
                    ) : (
                      <>
                        <Printer className="mr-2 h-4 w-4" /> Print Tag
                      </>
                    )}
                  </Button>
                </motion.div>

                {isPrintSuccess && (
                  <motion.div
                    className="mt-4 flex items-center rounded-md bg-green-50 px-4 py-2 text-green-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Check className="mr-2 h-5 w-5 text-green-600" />
                    <span>Print job sent successfully!</span>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Instructions */}
          <motion.div
            className="mt-12 rounded-lg bg-white p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-navy-500">Printing Instructions</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-100">
                  <Printer className="h-6 w-6 text-navy-500" />
                </div>
                <h3 className="text-lg font-bold text-navy-500">Print Your Tag</h3>
                <p className="text-slate-600">
                  Click the "Print Tag" button above to print your registration tag. Make sure your printer is connected
                  and has paper.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-100">
                  <Download className="h-6 w-6 text-navy-500" />
                </div>
                <h3 className="text-lg font-bold text-navy-500">Save as PDF</h3>
                <p className="text-slate-600">
                  You can also save your tag as a PDF by selecting "Save as PDF" in the print dialog. This allows you to
                  print it later.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-100">
                  <User className="h-6 w-6 text-navy-500" />
                </div>
                <h3 className="text-lg font-bold text-navy-500">Wear Your Tag</h3>
                <p className="text-slate-600">
                  Bring your printed tag to the event. We recommend using a lanyard or badge holder, which will be
                  available at the registration desk.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-navy-50 p-4">
              <h3 className="mb-2 text-lg font-bold text-navy-500">Important Notes</h3>
              <ul className="list-inside list-disc space-y-1 text-slate-600">
                <li>Print your tag on standard letter-size paper (8.5" x 11") or A4 paper.</li>
                <li>The tag is designed to be folded and inserted into a standard badge holder (4" x 3").</li>
                <li>Your tag contains a QR code that will be scanned for entry and session access.</li>
                <li>Please wear your tag visibly at all times during the event.</li>
                <li>If you lose your tag, visit the registration desk for a replacement.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Printable version - only visible when printing */}
      <div className="print-section hidden">
        <div className="relative w-[3.5in] h-[5.5in] bg-white border-2 border-navy-200 rounded-lg overflow-hidden">
          {/* Header with logo and event name */}
          <div className="bg-navy-500 px-4 py-4 text-white relative overflow-hidden">
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/past-highlight/710-Nigeria-International-Book-Fair-ftw-710x472.jpg"
                alt="NIBF Background"
                fill
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-600 to-navy-800 opacity-80"></div>
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className="text-2xl font-bold">NIBF 2025</div>
              <div className="relative h-10 w-28">
                <Image src="/images/nibf-logo.png" alt="NIBF Logo" fill className="object-contain" priority />
              </div>
            </div>
          </div>

          {/* Ticket type banner */}
          <div className={`${getTicketTypeColor()} px-4 py-3 text-center text-white font-bold text-5xl`}>
            {getTicketTypeName()}
          </div>

          {/* Main content */}
          <div className="p-2">
            {/* Attendee information */}
            <div className="mb-4 text-center">
              <h3 className="text-2xl font-bold text-navy-800">{`${userData.firstName} ${userData.lastName}`}</h3>
              <p className="text-lg text-navy-600">{userData.organization}</p>
              <p className="text-md text-slate-600">{userData.jobTitle}</p>
            </div>

     

            {/* QR Code placeholder - reduced size */}
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-md border border-slate-200">
              <QRCodeSVG 
                value={getQrCodeData()} 
                size={90} 
                level="H"
                includeMargin={true}
              />
            </div>

                   {/* Registration ID */}
                   <div className="mb-4 rounded-md bg-slate-50 p-2 text-center">
              <p className="text-xs text-slate-500">Registration ID</p>
              <p className="font-mono text-sm font-bold text-navy-600">{userData.registrationId}</p>
            </div>

            {/* Event details */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-crimson-500" />
                <span className="text-slate-600">May 7-9, 2025</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-crimson-500" />
                <span className="text-slate-600">Balmoral Convention Centre, Lagos</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-navy-50 p-1 text-center text-xs text-slate-600">
            <p>Please wear this tag at all times during the event</p>
            <p>www.nibfng.org</p>
          </div>
        </div>
      </div>
    </div>
  )
}

