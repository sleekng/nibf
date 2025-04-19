"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Clock, Check, Info, Users, FileText, HelpCircle, LucideMessageCircleWarning } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedSection, AnimatedElement, AnimatedHeading, AnimatedText, AnimatedStagger } from "@/components/animated-section"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/sonner"
import { toast as sonnerToast } from "sonner"
import { useRouter } from "next/navigation"
import { countries } from "countries-list"
import ReactCountryFlag from "react-country-flag"

// Add type for country data
type CountryData = {
  name: string;
  [key: string]: any;
}

interface FormData {
  firstName: string;
  lastName: string;
  organization: string;
  jobTitle: string;
  email: string;
  phone: string;
  country: string;
  interests: string[];
  specialRequirements: string;
  termsAccepted: boolean;
  newsletterSubscribed: boolean;
}

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [ticketType, setTicketType] = useState("free")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState<'pending' | 'completed'>('pending')
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed' | 'failed'>('pending')
  const { toast } = useToast()
  const router = useRouter()
  
  // Generate a unique ID for registration
  const generateUniqueId = () => {
    return 'NIBF-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    organization: "",
    jobTitle: "",
    email: "",
    phone: "",
    country: "nigeria",
    interests: [],
    specialRequirements: "",
    termsAccepted: false,
    newsletterSubscribed: false
  });

  // Load saved form data from localStorage after component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('nibf_registration_data');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData(parsedData);
        } catch (e) {
          console.error('Failed to parse saved form data:', e);
        }
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nibf_registration_data', JSON.stringify(formData));
  }, [formData]);

  // Clear saved form data when registration is successful
  const clearSavedFormData = () => {
    localStorage.removeItem('nibf_registration_data');
  };

  // Calculate total steps based on country and ticket type
  const getTotalSteps = () => {
    if (formData.country !== "nigeria" && ticketType === "foreign_trade") {
      return 4; // Includes payment step
    }
    return 3; // Standard steps
  }

  // Handle payment verification
  const verifyPayment = async (reference: string) => {
    try {
      console.log('Starting payment verification with reference:', reference);
      
      // Redirect to verification page
      window.location.href = `/register-to-attend/verify-payment?reference=${reference}`;
      return true;
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast({
        title: "Payment Verification Failed",
        description: error instanceof Error ? error.message : "Failed to verify payment. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Check for payment reference in URL
  useEffect(() => {
    const checkPayment = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get('reference') || urlParams.get('trxref');
      
      if (reference) {
        console.log('Payment Reference from URL:', reference);
        console.log('Stored Reference in localStorage:', localStorage.getItem('payment_reference'));
        
        try {
          // Redirect to verification page
          window.location.href = `/register-to-attend/verify-payment?reference=${reference}`;
        } catch (error) {
          console.error('Error during payment verification:', error);
          window.location.href = '/register-to-attend';
        }
      }
    };

    checkPayment();
  }, []);

  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);

      // Get registration ID from URL or localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const urlRegistrationId = urlParams.get('registrationId');
      const storedData = localStorage.getItem('registrationData');
      const storedRegistrationId = storedData ? JSON.parse(storedData).registrationId : null;
      const registrationId = urlRegistrationId || storedRegistrationId;
      
      // First create the registration
      const registrationResponse = await fetch('/api/register-to-attend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ticketType,
          paymentStatus: 'pending',
          registrationId: registrationId
        }),
      });

      const registrationData = await registrationResponse.json();
      
      if (registrationData.error) { 
        throw new Error(registrationData.error);
      }

      const newRegistrationId = registrationData.registrationId;
      console.log('Created registration with ID:', newRegistrationId);
      
      // Generate a unique reference for payment
      const reference = generateUniqueId();
      console.log('Generated payment reference:', reference);
      
      // Store the reference in localStorage
      localStorage.setItem('payment_reference', reference);
      console.log('Stored payment reference in localStorage');

      // Initialize payment with the form data and registration ID
      const paymentResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          amount: 10000, // Amount in Naira
          currency: 'NGN',
          reference: reference,
          metadata: {
            registrationId: newRegistrationId,
            ticketType,
            ...formData,
            type: 'registration'
          }
        }),
      });

      const data = await paymentResponse.json();
      console.log('Payment initialization response:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      // Store registration data in localStorage
      localStorage.setItem('registrationData', JSON.stringify({
        registrationId: newRegistrationId,
        ...formData,
        ticketType,
        paymentStatus: 'pending'
      }));

      // Redirect to payment URL
      window.location.href = data.authorization_url;
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: "Payment Initialization Failed",
        description: error instanceof Error ? error.message : "Failed to initialize payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Add validation function
  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return !!ticketType;
      case 2:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.country &&
          formData.termsAccepted
        );
      case 3:
        return true; // Payment step validation is handled separately
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (step < getTotalSteps()) {
      if (!validateStep(step)) {
        toast({
          title: "Incomplete Information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive"
        });
        return;
      }

      // For foreign attendees with foreign trade ticket, handle payment
      if (step === 3 && formData.country !== "nigeria" && ticketType === "foreign_trade") {
        handlePayment();
        return;
      }
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev: FormData) => ({
      ...prev,
      [id]: value
    }))
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (id === "termsAndConditions") {
      setFormData((prev: FormData) => ({
        ...prev,
        termsAccepted: checked
      }))
    } else if (id === "newsletter") {
      setFormData((prev: FormData) => ({
        ...prev,
        newsletterSubscribed: checked
      }))
    } else {
      // Handle interests checkboxes
      setFormData((prev: FormData) => {
        const interests = [...prev.interests]
        if (checked) {
          if (!interests.includes(id)) {
            interests.push(id)
          }
        } else {
          const index = interests.indexOf(id)
          if (index !== -1) {
            interests.splice(index, 1)
          }
        }
        return {
          ...prev,
          interests
        }
      })
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      country: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields before making the API call
      if (!validateStep(step)) {
        throw new Error("Please fill in all required fields");
      }

      // Additional validation for email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Additional validation for phone number
      if (formData.phone.length < 10) {
        throw new Error("Please enter a valid phone number");
      }

      console.log('Submitting registration form...');

      // Get registration ID from URL or localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const urlRegistrationId = urlParams.get('registrationId');
      const storedData = localStorage.getItem('registrationData');
      const storedRegistrationId = storedData ? JSON.parse(storedData).registrationId : null;
      const registrationId = urlRegistrationId || storedRegistrationId;

      // For foreign trade visitors, handle payment first
      if (formData.country !== "nigeria" && ticketType === "foreign_trade") {
        handlePayment();
        return;
      }

      // For free registrations, store registration in database
      const response = await fetch('/api/register-to-attend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ticketType,
          paymentStatus: 'completed',
          registrationId: registrationId // Include the registration ID in the request
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || response.statusText;
        throw new Error(`Registration failed: ${errorMessage}`);
      }

      const responseData = await response.json();
      if (!responseData.success || !responseData.registrationId) {
        throw new Error('Invalid response from registration endpoint');
      }

      console.log('Registration successful, ID:', responseData.registrationId);

      // Store registration data in localStorage
      const registrationData = {
        registrationId: responseData.registrationId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        ticketType: ticketType,
        organization: formData.organization || '',
        paymentStatus: 'completed'
      };

      // Store the data immediately after successful registration
      localStorage.setItem('registrationData', JSON.stringify(registrationData));

      // Clear the saved form data since registration was successful
      clearSavedFormData();

      // Use setTimeout to ensure toast is shown after render
      setTimeout(() => {
        sonnerToast.success("Registration Successful!", {
          description: `Your registration ID is ${responseData.registrationId}. Please save this for your records.`,
        });
      }, 0);

      // Redirect to success page with registrationId
      router.push(`/register-to-attend/success?registrationId=${responseData.registrationId}&emailSent=${responseData.emailSent}`);
    } catch (error: any) {
      console.error('Registration error:', error);
      // Use setTimeout to ensure toast is shown after render
      setTimeout(() => {
        toast({
          title: "Registration Failed",
          description: error.message || "Failed to complete registration. Please try again.",
          variant: "destructive",
        });
      }, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup localStorage if user leaves the page without completing registration
      if (registrationStatus === 'pending') {
        localStorage.removeItem('nibf_registration_data');
        localStorage.removeItem('registrationData');
        localStorage.removeItem('payment_reference');
      }
    };
  }, [registrationStatus]);

  // Function to handle printing the registration tag
  const handlePrintTag = () => {
    if (localStorage.getItem('registrationData')) {
      window.location.href = '/registration-tag';
    } else {
      sonnerToast.error("Error", {
        description: "There was an error preparing your registration tag. Please try again.",
      })
    }
  }

  // Load registration data from API
  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        // Get registration ID from URL parameter or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const urlRegistrationId = urlParams.get('registrationId');
        const urlStep = urlParams.get('step');
        
        // If we have a registration ID in the URL, fetch that registration
        if (urlRegistrationId) {
          // First try to get the registration data
          const response = await fetch(`/api/register-to-attend?registrationId=${urlRegistrationId}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch registration data');
          }

          // Set the form data from the registration
          setFormData({
            firstName: data.first_name,
            lastName: data.last_name,
            organization: data.organization || '',
            jobTitle: data.job_title || '',
            email: data.email,
            phone: data.phone || '',
            country: data.country || 'nigeria',
            interests: data.interests ? JSON.parse(data.interests) : [],
            specialRequirements: data.special_requirements || '',
            termsAccepted: true,
            newsletterSubscribed: false
          });

          // Set the ticket type
          setTicketType(data.ticket_type);

          // If step is provided in URL, set that step
          if (urlStep) {
            setStep(parseInt(urlStep));
          }

          // Store the registration data in localStorage
          localStorage.setItem('registrationData', JSON.stringify({
            registrationId: urlRegistrationId,
            ...data
          }));
        } else {
          // Try to get registration ID from localStorage
          const storedData = localStorage.getItem('registrationData');
          if (storedData) {
            const data = JSON.parse(storedData);
            setFormData({
              firstName: data.firstName,
              lastName: data.lastName,
              organization: data.organization || '',
              jobTitle: data.jobTitle || '',
              email: data.email,
              phone: data.phone || '',
              country: data.country || 'nigeria',
              interests: data.interests || [],
              specialRequirements: data.specialRequirements || '',
              termsAccepted: true,
              newsletterSubscribed: false
            });
            setTicketType(data.ticketType);
          }
        }
      } catch (error: any) {
        console.error('Error fetching registration data:', error);
        toast({
          title: "Error Loading Registration",
          description: error.message || "Failed to load registration data. Please try again.",
          variant: "destructive"
        });
      }
    };

    fetchRegistrationData();
  }, []);

  const countryOptions = Object.entries(countries as Record<string, CountryData>).map(([code, country]) => ({
    code,
    name: country.name
  })).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <AnimatedSection className="bg-navy-500 px-4 py-20 text-white" animationType="fade">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedHeading className="mb-6 text-4xl font-bold md:text-5xl" animationType="flip">
              Register to Attend
            </AnimatedHeading>
            <AnimatedText className="text-lg text-slate-200" animationType="slideUp">
              Join Africa's premier book event and connect with industry professionals, authors, and book lovers
            </AnimatedText>
          </div>
        </div>
      </AnimatedSection>

      {/* Registration Form */}
      <section className="bg-slate-50 px-4 py-16 sticky">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                <div className={`flex flex-col items-center ${step >= 1 ? "text-crimson-500" : "text-slate-400"}`}>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 1 ? "border-crimson-500 bg-crimson-50" : "border-slate-300"}`}
                  >
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <span className="mt-2 text-sm font-medium">Ticket Selection</span>
                </div>
                <div className={`h-1 w-full max-w-[100px] ${step >= 2 ? "bg-crimson-500" : "bg-slate-300"}`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? "text-crimson-500" : "text-slate-400"}`}>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 2 ? "border-crimson-500 bg-crimson-50" : "border-slate-300"}`}
                  >
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <span className="mt-2 text-sm font-medium">Personal Details</span>
                </div>
                {formData.country !== "nigeria" && ticketType === "foreign_trade" && (
                  <>
                    <div className={`h-1 w-full max-w-[100px] ${step >= 3 ? "bg-crimson-500" : "bg-slate-300"}`}></div>
                    <div className={`flex flex-col items-center ${step >= 3 ? "text-crimson-500" : "text-slate-400"}`}>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 3 ? "border-crimson-500 bg-crimson-50" : "border-slate-300"}`}
                      >
                        <span className="text-lg font-bold">3</span>
                      </div>
                      <span className="mt-2 text-sm font-medium">Payment</span>
                    </div>
                  </>
                )}
                <div className={`h-1 w-full max-w-[100px] ${step >= getTotalSteps() ? "bg-crimson-500" : "bg-slate-300"}`}></div>
                <div className={`flex flex-col items-center ${step >= getTotalSteps() ? "text-crimson-500" : "text-slate-400"}`}>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= getTotalSteps() ? "border-crimson-500 bg-crimson-50" : "border-slate-300"}`}
                  >
                    <span className="text-lg font-bold">{getTotalSteps()}</span>
                  </div>
                  <span className="mt-2 text-sm font-medium">Confirmation</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Ticket Selection */}
              {step === 1 && (
                <div className="rounded-lg bg-white p-8 shadow-md">
                  <h2 className="mb-6 text-2xl font-bold text-navy-500">Select Your Ticket</h2>
                  <RadioGroup value={ticketType} onValueChange={setTicketType} className="space-y-6">
                    {/* Free Ticket */}
                    <div
                      className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${ticketType === "free" ? "border-crimson-500 bg-crimson-50" : "border-slate-200 hover:border-slate-300"}`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem value="free" id="free" className="mt-1" />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="free" className="text-xl font-bold text-navy-500">
                              Free Ticket
                            </Label>
                            <span className="text-xl font-bold text-crimson-500">FREE</span>
                          </div>
                          <p className="mt-2 text-slate-600">
                            Access to all exhibition areas, general sessions, and networking events.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-crimson-500" />
                              <span className="text-sm text-slate-600">3-day exhibition access</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-crimson-500" />
                              <span className="text-sm text-slate-600">General sessions</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-crimson-500" />
                              <span className="text-sm text-slate-600">Networking opportunities</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Foreign Trade Visitors Ticket */}
                    <div
                      className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${ticketType === "foreign_trade" ? "border-crimson-500 bg-crimson-50" : "border-slate-200 hover:border-slate-300"}`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem value="foreign_trade" id="foreign_trade" className="mt-1" />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="foreign_trade" className="text-xl font-bold text-navy-500">
                              Foreign Trade Visitors
                            </Label>
                            <span className="text-xl font-bold text-crimson-500">250 USD</span>
                          </div>
                          <p className="mt-2 text-slate-600">
                            Enhanced experience with access to VIP areas, workshops, and special events.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-crimson-500" />
                              <span className="text-sm text-slate-600">Visa Application Support Services</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-crimson-500" />
                              <span className="text-sm text-slate-600">Free NIBF 2025 Catalogue</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-crimson-500" />
                              <span className="text-sm text-slate-600">Participation in the Networking Dinner at the Sheraton Hotel for 1 person</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="mt-8 flex justify-end">
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className="bg-crimson-500 hover:bg-crimson-600"
                      disabled={!ticketType}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <div className="rounded-lg bg-white p-8 shadow-md">
                  <h2 className="mb-6 text-2xl font-bold text-navy-500">Personal Details</h2>
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-slate-700">
                          First Name *
                        </Label>
                        <Input 
                          id="firstName" 
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-slate-700">
                          Last Name *
                        </Label>
                        <Input 
                          id="lastName" 
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700">
                          Email Address *
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700">
                          Phone Number *
                        </Label>
                        <Input 
                          id="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization" className="text-slate-700">
                        Organization/Company
                      </Label>
                      <Input 
                        id="organization" 
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="Enter your organization or company name" 
                      />
                    </div>
<div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-slate-700">
                        Job Title
                      </Label>
                      <Input 
                        id="jobTitle" 
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="Enter your job title" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-slate-700">
                        Country *
                      </Label>
                      <Select 
                        value={formData.country} 
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger className="flex w-full gap-2">
                          {formData.country ? (
                            <>
                              <ReactCountryFlag
                                countryCode={formData.country}
                                svg
                                style={{
                                  width: '2em',
                                  height: '1.5em',
                                }}
                              />
                              <span>{(countries as Record<string, CountryData>)[formData.country]?.name}</span>
                            </>
                          ) : (
                            <span className="text-slate-500">Select your country</span>
                          )}
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map((country) => (
                            <SelectItem key={country.code} value={country.code} className="flex items-center gap-2">
                              <ReactCountryFlag
                                countryCode={country.code}
                                svg
                                style={{
                                  width: '1.5em',
                                  height: '1.5em',
                                }}
                              />
                              <span>{country.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
</div>
                    <div className="space-y-2">
                      <Label htmlFor="interests" className="text-slate-700">
                        Areas of Interest (Select all that apply)
                      </Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="fiction" 
                            checked={formData.interests.includes("fiction")}
                            onCheckedChange={(checked) => handleCheckboxChange("fiction", checked as boolean)}
                          />
                          <label htmlFor="fiction" className="text-sm text-slate-600">
                            Fiction
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="nonFiction" 
                            checked={formData.interests.includes("nonFiction")}
                            onCheckedChange={(checked) => handleCheckboxChange("nonFiction", checked as boolean)}
                          />
                          <label htmlFor="nonFiction" className="text-sm text-slate-600">
                            Non-Fiction
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="academic" 
                            checked={formData.interests.includes("academic")}
                            onCheckedChange={(checked) => handleCheckboxChange("academic", checked as boolean)}
                          />
                          <label htmlFor="academic" className="text-sm text-slate-600">
                            Academic/Educational
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="children" 
                            checked={formData.interests.includes("children")}
                            onCheckedChange={(checked) => handleCheckboxChange("children", checked as boolean)}
                          />
                          <label htmlFor="children" className="text-sm text-slate-600">
                            Children's Books
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="digital" 
                            checked={formData.interests.includes("digital")}
                            onCheckedChange={(checked) => handleCheckboxChange("digital", checked as boolean)}
                          />
                          <label htmlFor="digital" className="text-sm text-slate-600">
                            Digital Publishing
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="printing" 
                            checked={formData.interests.includes("printing")}
                            onCheckedChange={(checked) => handleCheckboxChange("printing", checked as boolean)}
                          />
                          <label htmlFor="printing" className="text-sm text-slate-600">
                            Printing & Production
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequirements" className="text-slate-700">
                        Special Requirements or Accessibility Needs
                      </Label>
                      <Textarea
                        id="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={handleInputChange}
                        placeholder="Please let us know if you have any special requirements or accessibility needs"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="termsAndConditions" 
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleCheckboxChange("termsAndConditions", checked as boolean)}
                        required 
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="termsAndConditions"
                          className="text-sm font-medium leading-none text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions *
                        </label>
                        <p className="text-sm text-slate-500">
                          By registering, you agree to the{" "}
                          <a href="#" className="text-crimson-500 hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-crimson-500 hover:underline">
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="newsletter" 
                        checked={formData.newsletterSubscribed}
                        onCheckedChange={(checked) => handleCheckboxChange("newsletter", checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="newsletter"
                          className="text-sm font-medium leading-none text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Subscribe to newsletter
                        </label>
                        <p className="text-sm text-slate-500">
                          Receive updates about NIBF events, news, and special offers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-crimson-500 bg-white hover:text-navy-500 text-crimson-500 hover:bg-crimson-50"
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className="bg-crimson-500 hover:bg-crimson-600"
                      disabled={!validateStep(step)}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment (for foreign attendees with foreign trade ticket) */}
              {step === 3 && formData.country !== "nigeria" && ticketType === "foreign_trade" && (
                <div className="rounded-lg bg-white p-8 shadow-md">
                  <h2 className="mb-6 text-2xl font-bold text-navy-500">Payment Details</h2>
                  <div className="space-y-6">
                    <div className="rounded-lg bg-slate-50 p-6">
                      <h3 className="mb-4 text-lg font-bold text-navy-500">Payment Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="font-medium text-slate-600">Ticket Type:</span>
                          <span className="font-bold text-navy-500">Foreign Trade Visitors</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="font-medium text-slate-600">Amount:</span>
                          <span className="font-bold text-crimson-500">250 USD</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-navy-500">Payment Information</h3>
                      <p className="text-slate-600">
                        You will be redirected to a secure payment page to complete your registration.
                        Please ensure you have your payment details ready.
                      </p>
                      <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">Note:</span> After successful payment, you will be automatically redirected back to complete your registration.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-crimson-500 bg-white hover:text-navy-500 text-crimson-500 hover:bg-crimson-50"
                      >
                        Back
                      </Button>
                      <Button 
                        type="button" 
                        onClick={nextStep} 
                        className="bg-crimson-500 hover:bg-crimson-600"
                        disabled={isProcessingPayment}
                      >
                        {isProcessingPayment ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          "Proceed to Payment"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3/4: Confirmation */}
              {step === getTotalSteps() && (
                <div className="rounded-lg bg-white p-8 shadow-md">
                  <div className="mb-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                      <LucideMessageCircleWarning className="h-8 w-8 text-orange-600" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-navy-500">Review Your Registration</h2>
                    <p className="text-slate-600">
                      Please review your registration details before submitting.
                    </p>
                  </div>

                  <div className="mb-8 rounded-lg bg-slate-50 p-6">
                    <h3 className="mb-4 text-lg font-bold text-navy-500">Registration Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="font-medium text-slate-600">Ticket Type:</span>
                        <span className="font-bold text-navy-500">
                          {ticketType === "free" ? "Free Ticket" : "Foreign Trade Visitors"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="font-medium text-slate-600">Price:</span>
                        <span className="font-bold text-crimson-500">
                          {ticketType === "free" ? "Free" : "250 USD"}
                        </span>
                      </div>
                      {formData.country !== "nigeria" && ticketType === "foreign_trade" && (
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="font-medium text-slate-600">Payment Method:</span>
                          <span className="font-bold text-navy-500">
                            {isProcessingPayment ? "Processing..." : "Paystack"}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="font-medium text-slate-600">Name:</span>
                        <span className="text-navy-500">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="font-medium text-slate-600">Email:</span>
                        <span className="text-navy-500">{formData.email}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="font-medium text-slate-600">Phone:</span>
                        <span className="text-navy-500">{formData.phone}</span>
                      </div>
                      {formData.organization && (
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="font-medium text-slate-600">Organization:</span>
                          <span className="text-navy-500">{formData.organization}</span>
                        </div>
                      )}
                      {formData.jobTitle && (
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="font-medium text-slate-600">Job Title:</span>
                          <span className="text-navy-500">{formData.jobTitle}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="font-medium text-slate-600">Country:</span>
                        <span className="text-navy-500">
                          {formData.country ? (countries as Record<string, CountryData>)[formData.country]?.name : 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="font-medium text-slate-600">Event Date:</span>
                        <span className="text-navy-500">May 7-9, 2025</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="font-medium text-slate-600">Venue:</span>
                        <span className="text-navy-500">Balmoral Convention Centre, Lagos</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 rounded-lg bg-navy-50 p-6">
                    <div className="flex items-start">
                      <Info className="mr-3 h-6 w-6 flex-shrink-0 text-navy-500" />
                      <div>
                        <h3 className="mb-2 font-bold text-navy-500">What's Next?</h3>
                        <p className="text-slate-600">
                          After submitting your registration, you'll receive a confirmation email with your registration details and QR
                          code. Please bring this with you to the event for quick check-in.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-crimson-500 bg-white hover:text-navy-500 text-crimson-500 hover:bg-crimson-50"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-crimson-500 hover:bg-crimson-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Complete Registration"
                      )}
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-slate-500">
                    If you have any questions, please contact us at{" "}
                    <a href="mailto:support@nibfng.org" className="text-crimson-500 hover:underline">
                      support@nibfng.org
                    </a>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="bg-white px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl rounded-lg bg-slate-50 p-6 shadow-md md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-navy-500">Event Details</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-start">
                <Calendar className="mr-3 h-6 w-6 flex-shrink-0 text-crimson-500" />
                <div>
                  <h3 className="font-bold text-navy-500">Date</h3>
                  <p className="text-slate-600">May 7-9, 2025</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 h-6 w-6 flex-shrink-0 text-crimson-500" />
                <div>
                  <h3 className="font-bold text-navy-500">Venue</h3>
                  <p className="text-slate-600">Balmoral Convention Centre, Sheraton Hotel, Ikeja, Lagos</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="mr-3 h-6 w-6 flex-shrink-0 text-crimson-500" />
                <div>
                  <h3 className="font-bold text-navy-500">Time</h3>
                  <p className="text-slate-600">9:00 AM - 6:00 PM daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">Frequently Asked Questions</h2>
            <div className="elegant-divider mx-auto w-24 h-1 bg-crimson-500"></div>
          </div>
          <div className="mx-auto max-w-3xl space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border border-slate-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                  <h3 className="text-lg font-bold text-navy-500">What does my registration include?</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-slate-50">
                  <p className="text-slate-600">
                    Your registration includes access to the exhibition area, general sessions, and networking events.
                    Premium tickets also include access to workshops, VIP networking reception, and a fair goodie bag.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-slate-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                  <h3 className="text-lg font-bold text-navy-500">Can I register on-site?</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-slate-50">
                  <p className="text-slate-600">
                    Yes, on-site registration will be available, but we recommend registering in advance to avoid queues and
                    to secure your spot, especially for workshops and special events which have limited capacity.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-slate-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                  <h3 className="text-lg font-bold text-navy-500">Is my registration transferable?</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-slate-50">
                  <p className="text-slate-600">
                    Yes, you can transfer your registration to another person by contacting our support team at least 7 days
                    before the event. Please provide the details of the new attendee.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border border-slate-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                  <h3 className="text-lg font-bold text-navy-500">What is the refund policy?</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-slate-50">
                  <p className="text-slate-600">
                    Refunds are available up to 30 days before the event with a 20% administrative fee. No refunds will be
                    issued within 30 days of the event, but you can transfer your registration to another person.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">What Past Attendees Say</h2>
            <div className="elegant-divider mx-auto w-24 h-1 bg-crimson-500"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-lg shadow-md border border-slate-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-crimson-100 flex items-center justify-center mr-4">
                  <span className="text-crimson-500 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-bold text-navy-500">John Doe</h4>
                  <p className="text-slate-500 text-sm">Publisher, Lagos</p>
                </div>
              </div>
              <p className="text-slate-600 italic">"The NIBF is the highlight of my professional year. The networking opportunities and insights gained are invaluable for anyone in the publishing industry."</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-slate-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-crimson-100 flex items-center justify-center mr-4">
                  <span className="text-crimson-500 font-bold">SA</span>
                </div>
                <div>
                  <h4 className="font-bold text-navy-500">Sarah Ahmed</h4>
                  <p className="text-slate-500 text-sm">Author, Abuja</p>
                </div>
              </div>
              <p className="text-slate-600 italic">"As an author, the NIBF has been instrumental in connecting me with publishers and readers. The workshops and panel discussions are always enlightening."</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-slate-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-crimson-100 flex items-center justify-center mr-4">
                  <span className="text-crimson-500 font-bold">MK</span>
                </div>
                <div>
                  <h4 className="font-bold text-navy-500">Michael Kolawole</h4>
                  <p className="text-slate-500 text-sm">Bookstore Owner, Ibadan</p>
                </div>
              </div>
              <p className="text-slate-600 italic">"The NIBF is a must-attend event for anyone in the book industry. The quality of exhibitors and the organization of the event is consistently excellent."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Past Highlights Section */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">Past Highlights</h2>
            <div className="elegant-divider mx-auto w-24 h-1 bg-crimson-500"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img 
                src="/images/past-highlight/2.jpeg" 
                alt="NIBF Past Event" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-white font-bold text-xl">NIBF 2023</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img 
                src="/images/past-highlight/3.jpeg" 
                alt="NIBF Past Event" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-white font-bold text-xl">NIBF 2022</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img 
                src="/images/past-highlight/5.jpeg" 
                alt="NIBF Past Event" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-white font-bold text-xl">NIBF 2021</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-navy-500 px-4 py-16 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Join Us?</h2>
          <p className="mb-8 text-lg text-slate-200 max-w-2xl mx-auto">
            Don't miss out on Africa's premier book event. Register now to secure your spot and connect with industry leaders.
          </p>
          <Button className="bg-crimson-500 hover:bg-crimson-600 text-white px-8 py-6 text-lg">
            Register Now
          </Button>
        </div>
      </section>
    </div>
  )
}

