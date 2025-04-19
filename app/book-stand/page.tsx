"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, X, Loader2, Building2, Users, Calendar, MapPin, CreditCard, FileText, Mail, ClipboardCheck, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedSection, AnimatedElement, AnimatedHeading, AnimatedText } from "@/components/animated-section"
import { toast } from "sonner"
import Link from "next/link"

export default function BookStandPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    standType: "",
    additionalRequirements: "",
    paymentMethod: "",
  })
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })
  const [referenceId, setReferenceId] = useState("")
  const [adminConfirmed, setAdminConfirmed] = useState(false)

  // Check if we have a reference ID in the URL (from admin confirmation email)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const refId = params.get("ref")
    if (refId) {
      setReferenceId(refId)
      // Fetch the book stand details
      fetchBookStandDetails(refId)
    }
  }, [])

  const fetchBookStandDetails = async (refId: string) => {
    try {
      const response = await fetch(`/api/book-stand/${refId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch book stand details")
      }
      const data = await response.json()
      if (data.bookStand) {
        setFormData({
          companyName: data.bookStand.companyName,
          contactName: data.bookStand.contactName,
          email: data.bookStand.email,
          phone: data.bookStand.phone,
          standType: data.bookStand.standType,
          additionalRequirements: data.bookStand.additionalRequirements || "",
          paymentMethod: data.bookStand.paymentMethod,
        })
        setAdminConfirmed(data.bookStand.adminConfirmed)
        
        // If admin has confirmed, move to step 2 (confirmation step)
        if (data.bookStand.adminConfirmed) {
          setStep(2)
          
          // Check if this is a redirect from the payment page
          // If so, automatically move to the appropriate step based on payment status
          const params = new URLSearchParams(window.location.search)
          const fromPayment = params.get("fromPayment")
          if (fromPayment === "true") {
            // Use setTimeout to ensure state updates happen after the current execution context
            setTimeout(() => {
              // If status is 'paid', go to step 4 (Prepare for the Fair)
              // Otherwise, go to step 3 (Make Payment)
              if (data.bookStand.status === 'paid') {
                setStep(4)
              } else {
                setStep(3)
              }
            }, 0)
          }
        }
      }
    } catch (error) {
      console.error("Error fetching book stand details:", error)
      toast.error("Failed to fetch book stand details")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.companyName || !formData.contactName || !formData.email || 
          !formData.phone || !formData.standType || !formData.paymentMethod) {
        toast.error("Missing required fields", {
          description: "Please fill in all required fields before submitting.",
        })
        setIsSubmitting(false)
        return
      }

      console.log("Submitting form data:", formData)

      const response = await fetch("/api/book-stand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application")
      }

      if (!data.bookStand || !data.bookStand.referenceId) {
        throw new Error("Invalid response format: missing reference ID")
      }

      setReferenceId(data.bookStand.referenceId)
      setStep(2)
      toast.success("Application submitted successfully!", {
        description: "Please wait for admin confirmation. You will receive an email with payment instructions.",
      })
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Failed to submit application", {
        description: error instanceof Error ? error.message : "Please try again later",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePayment = async () => {
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!referenceId) {
        toast.error("Missing reference ID", {
          description: "Please complete the application form first.",
        })
        setIsSubmitting(false)
        return
      }

      // Get the stand price based on stand type
      const getStandPrice = (standType: string): number => {
        const prices: Record<string, number> = {
          '4sqm': 1200,
          '8sqm': 2400,
          '12sqm': 3600,
          '16sqm': 4800,
          '24sqm': 7200
        }
        return prices[standType] || 0
      }

      const amount = getStandPrice(formData.standType)
      if (!amount) {
        toast.error("Invalid stand type", {
          description: "Please select a valid stand type.",
        })
        setIsSubmitting(false)
        return
      }

      if (formData.paymentMethod === "credit_card") {
        // Initialize Paystack payment
        const paymentResponse = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            amount: amount * 100, // Convert to kobo (smallest currency unit)
            currency: "USD",
            metadata: {
              referenceId,
              standType: formData.standType,
              companyName: formData.companyName,
              contactName: formData.contactName,
              registrationId: referenceId, // Add this for proper tracking
              type: 'book_stand' // Add type field
            }
          }),
        })

        const data = await paymentResponse.json()
        
        if (!paymentResponse.ok) {
          console.error("Payment initialization error:", data)
          throw new Error(data.error || "Failed to initialize payment")
        }

        if (!data.authorization_url) {
          throw new Error("No payment URL received from Paystack")
        }

        // Redirect to Paystack payment page
        window.location.href = data.authorization_url
      } else if (formData.paymentMethod === "pay_at_venue") {
        // Handle "Pay Within 2 Days" option
        const response = await fetch("/api/book-stand/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referenceId,
            paymentMethod: "pay_at_venue",
            amount,
            currency: "USD"
          }),
        })

        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to process payment")
        }

        // Move to the next step
        setStep(4)
        toast.success("Stand reserved successfully!", {
          description: "Please complete payment within 2 days to avoid cancellation.",
        })
      }
    } catch (error) {
      console.error("Error processing payment:", error)
      toast.error("Failed to process payment", {
        description: error instanceof Error ? error.message : "Please try again later",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFinalStep = () => {
    // Use a setTimeout to ensure state updates happen after the current execution context
    setTimeout(() => {
      setStep(5) // Move to final step
      toast.success("Registration complete!", {
        description: "You're all set for the Nigerian International Book Fair.",
      })
    }, 0)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6 rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-navy-500">Step 1: Submit Application</h3>
              <p className="text-slate-600">
                Complete the online application form with your company details and stand preferences.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-slate-600">Company/Organization Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-slate-600">Contact Person</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Full name of the contact person"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-600">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 XXX XXX XXXX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="standType" className="text-slate-600">Stand Type</Label>
                <Select
                  value={formData.standType}
                  onValueChange={(value) => handleSelectChange("standType", value)}
                >
                  <SelectTrigger id="standType">
                    <SelectValue placeholder="Select stand type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4sqm">4 Square Metres (1,200 USD)</SelectItem>
                    <SelectItem value="8sqm">8 Square Metres (2,400 USD)</SelectItem>
                    <SelectItem value="12sqm">12 Square Metres (3,600 USD)</SelectItem>
                    <SelectItem value="16sqm">16 Square Metres (4,800 USD)</SelectItem>
                    <SelectItem value="24sqm">24 Square Metres (7,200 USD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod" className="text-slate-600">Preferred Payment Method</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="pay_at_venue">Pay Within 2 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalRequirements" className="text-slate-600">Additional Requirements</Label>
              <Textarea
                id="additionalRequirements"
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleInputChange}
                placeholder="Any specific requirements or questions you have"
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-crimson-500 hover:bg-crimson-600" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        )
      case 2:
        return (
          <div className="space-y-8">
            <div className="mb-6 rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-navy-500">Step 2: Application Status</h3>
              <p className="text-slate-600">
                {adminConfirmed
                  ? "Your application has been confirmed. Please proceed to payment."
                  : "Your application is pending admin confirmation. You will receive an email with payment instructions once confirmed."}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-navy-500">Application Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Company:</span>
                  <span className="font-medium text-navy-500  ">{formData.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Contact:</span>
                  <span className="font-medium text-navy-500">{formData.contactName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Email:</span>
                  <span className="font-medium text-navy-500">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Phone:</span>
                  <span className="font-medium text-navy-500">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Stand Type:</span>
                  <span className="font-medium text-navy-500">
                    {formData.standType === "4sqm"
                      ? "4 Square Metres"
                      : formData.standType === "8sqm"
                      ? "8 Square Metres"
                      : formData.standType === "12sqm"
                      ? "12 Square Metres"
                      : formData.standType === "16sqm"
                      ? "16 Square Metres"
                      : "24 Square Metres"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount:</span>
                  <span className="font-medium text-navy-500">
                    {formData.standType === "4sqm"
                      ? "1,200 USD"
                      : formData.standType === "8sqm"
                      ? "2,400 USD"
                      : formData.standType === "12sqm"
                      ? "3,600 USD"
                      : formData.standType === "16sqm"
                      ? "4,800 USD"
                      : "7,200 USD"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Method:</span>
                  <span className="font-medium text-slate-600">
                    {formData.paymentMethod === "credit_card"
                      ? "Credit Card"
                      : "Pay Within 2 Days"}
                  </span>
                </div>

              </div>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <div className="flex items-start">
                <Mail className="mr-3 h-6 w-6 text-green-600" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-green-700">Application Submitted</h3>
                  <p className="text-slate-600">
                   Your application has been submitted successfully. A confirmation email with payment 
                    instructions will be sent to  <span className="font-bold text-green-700">{formData.
                    email}</span> within the next 24 hours. Thank you for your interest in the Nigerian International 
                    Book Fair
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
        
              <Button
                className="bg-crimson-500 hover:bg-crimson-600"
                onClick={() => setStep(3)}
                disabled={!adminConfirmed}
              >
                {adminConfirmed ? "Proceed to Payment" : "Waiting for Admin Confirmation"}
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-8">
            <div className="mb-6 rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-navy-500">Step 3: Make Payment</h3>
              <p className="text-slate-600">
                Secure your stand by making payment using your preferred payment method.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-navy-500">Payment Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Stand Type:</span>
                  <span className="font-medium text-slate-600">
                    {formData.standType === "4sqm"
                      ? "4 Square Metres"
                      : formData.standType === "8sqm"
                      ? "8 Square Metres"
                      : formData.standType === "12sqm"
                      ? "12 Square Metres"
                      : formData.standType === "16sqm"
                      ? "16 Square Metres"
                      : "24 Square Metres"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount:</span>
                  <span className="font-medium text-slate-600">
                    {formData.standType === "4sqm"
                      ? "1,200 USD"
                      : formData.standType === "8sqm"
                      ? "2,400 USD"
                      : formData.standType === "12sqm"
                      ? "3,600 USD"
                      : formData.standType === "16sqm"
                      ? "4,800 USD"
                      : "7,200 USD"}
                  </span>
                </div>
              
  <div className="flex flex-col space-y-2 bg-green-100/50 border-green-600 border p-4 rounded-md ">
                  <span className="text-slate-600">Payment Method:</span>
                  <div className="flex items-center space-x-2" >
                    <Select  disabled={!adminConfirmed} 
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="pay_at_venue">Pay Within 2 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  
                  </div>
                </div>
              </div>
            </div>

            {formData.paymentMethod === "credit_card" && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-navy-500">Credit Card Payment</h3>
                <p className="text-slate-600">
                  You will be redirected to a secure payment page to complete your transaction.
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-crimson-500" />
                  <span className="text-sm text-slate-600">Secure payment powered by Paystack</span>
                </div>
              </div>
            )}

            {formData.paymentMethod === "pay_at_venue" && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-navy-500">Pay at Venue</h3>
                <p className="text-slate-600">
                  You must complete your payment within 2 days of receiving confirmation. Failure to pay within this period will result in cancellation of your stand reservation.
                </p>
              </div>
            )}

            <div className={`flex ${formData.paymentMethod === "pay_at_venue" ? "justify-between" : "justify-end"}`}>
              {formData.paymentMethod === "pay_at_venue" && (
                <Button
                  variant="outline"
                  className="border-navy-500 bg-white text-navy-500 hover:bg-navy-50 hover:text-navy-500"
                  onClick={() => setStep(3)}
                >
                  Back
                </Button>
              )}
              <Button
                className="bg-crimson-500 hover:bg-crimson-600"
                onClick={handlePayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Details...
                  </>
                ) : (
                  "Proceed to next step"
                )}
              </Button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-8">
            <div className="mb-6 rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-navy-500">Step 4: Prepare for the Fair</h3>
              <p className="text-slate-600">
                {formData.paymentMethod === "pay_at_venue" 
                  ? "Your application has been received. Here's what you need to know to prepare for the fair."
                  : "Your payment has been confirmed. Here's what you need to know to prepare for the fair."}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-navy-500">Exhibitor Manual</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <ClipboardCheck className="mr-3 h-6 w-6 text-crimson-500" />
                  <div>
                    <h4 className="font-medium text-navy-500">Setup Guidelines</h4>
                    <p className="text-slate-600">
                      Detailed instructions for setting up your stand, including dimensions, allowed materials, and
                      setup times.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="mr-3 h-6 w-6 text-crimson-500" />
                  <div>
                    <h4 className="font-medium text-navy-500">Important Dates</h4>
                    <p className="text-slate-600">
                      Key dates for setup, exhibitor registration, and the fair itself.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="mr-3 h-6 w-6 text-crimson-500" />
                  <div>
                    <h4 className="font-medium text-navy-500">Staff Information</h4>
                    <p className="text-slate-600">
                      Details on registering additional staff members and obtaining exhibitor badges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-3 h-6 w-6 text-crimson-500" />
                  <div>
                    <h4 className="font-medium text-navy-500">Venue Information</h4>
                    <p className="text-slate-600">
                      Location details, parking information, and facility amenities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-navy-500 hover:bg-navy-600">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Exhibitor Manual
                </Button>
              </div>
            </div>
            {formData.paymentMethod === "pay_at_venue" ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-start">
                  <Calendar className="mr-3 h-6 w-6 text-amber-600" />
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-amber-700">Payment Pending</h3>
                    <p className="text-slate-600">
                      Your stand is reserved, but payment is pending. Please complete your payment within 2 days to avoid cancellation of your reservation.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <div className="flex items-start">
                  <Check className="mr-3 h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-green-700">Payment Confirmed</h3>
                    <p className="text-slate-600">
                      Your payment has been successfully processed. Your stand is now confirmed for the Nigerian
                      International Book Fair.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className={`flex ${formData.paymentMethod === "pay_at_venue" ? "justify-between" : "justify-end"}`}>
              {formData.paymentMethod === "pay_at_venue" && (
                <Button
                  variant="outline"
                  className="border-navy-500 bg-white text-navy-500 hover:bg-navy-50 hover:text-navy-500"
                  onClick={() => setStep(3)}
                >
                  Back
                </Button>
              )}
              <Button
                className="bg-crimson-500 hover:bg-crimson-600"
                onClick={handleFinalStep}
              >
                Complete Registration
              </Button>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-8">
            <div className="mb-6 rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-navy-500">Step 5: Exhibit at NIBF 2025</h3>
              <p className="text-slate-600">
                Congratulations! You're all set to exhibit at the Nigerian International Book Fair.
              </p>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-green-700">Registration Complete!</h3>
              <p className="mb-6 text-slate-600">
                Thank you for registering as an exhibitor at the Nigerian International Book Fair. We look forward to
                welcoming you to the event.
              </p>
              <div className="mx-auto mb-6 max-w-md rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="mb-2 font-medium text-navy-500">Exhibitor Reference</h4>
                <p className="text-2xl font-bold text-navy-500">{referenceId}</p>
              </div>
              <div className="mx-auto mb-6 max-w-md rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="mb-2 font-medium text-navy-500">Stand Details</h4>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Company:</span>
                    <span className="font-medium text-slate-600">{formData.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Stand Type:</span>
                    <span className="font-medium text-slate-600">
                      {formData.standType === "4sqm"
                        ? "4 Square Metres"
                        : formData.standType === "8sqm"
                        ? "8 Square Metres"
                        : formData.standType === "12sqm"
                        ? "12 Square Metres"
                        : formData.standType === "16sqm"
                        ? "16 Square Metres"
                        : "24 Square Metres"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Contact:</span>
                    <span className="font-medium text-slate-600">{formData.contactName}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  className="bg-crimson-500 hover:bg-crimson-600"
                  onClick={() => router.push("/exhibitors")}
                >
                  Return to Exhibitors Page
                </Button>
                <Button
                  variant="outline"
                  className="border-navy-500 bg-white text-navy-500 hover:bg-navy-50 hover:text-navy-500"
                  onClick={() => router.push("/")}
                >
                  Go to Homepage
                </Button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <AnimatedSection className="bg-navy-500 px-4 py-20 text-white" animationType="fade">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedHeading className="mb-6 text-4xl font-bold md:text-5xl" animationType="flip">
              Book Your Stand
            </AnimatedHeading>
            <AnimatedText className="text-lg text-slate-200" animationType="slideUp">
              Secure your space at Africa's premier book event and connect with thousands of industry professionals
            </AnimatedText>
          </div>
        </div>
      </AnimatedSection>

      {/* Form Section */}
      <AnimatedSection className="bg-white px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="relative">
              <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-slate-200"></div>
              <div
                className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-crimson-500 transition-all duration-500"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              ></div>
              <div className="relative flex justify-between">
                <div className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      step >= 1 ? "bg-crimson-500 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= 1 ? "text-crimson-500" : "text-slate-600"
                    }`}
                  >
                    Submit
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      step >= 2 ? "bg-crimson-500 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <Mail className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= 2 ? "text-crimson-500" : "text-slate-600"
                    }`}
                  >
                    Confirm
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      step >= 3 ? "bg-crimson-500 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <ClipboardCheck className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= 3 ? "text-crimson-500" : "text-slate-600"
                    }`}
                  >
                    Payment
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      step >= 4 ? "bg-crimson-500 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <ClipboardCheck className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= 4 ? "text-crimson-500" : "text-slate-600"
                    }`}
                  >
                    Prepare
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      step >= 5 ? "bg-crimson-500 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= 5 ? "text-crimson-500" : "text-slate-600"
                    }`}
                  >
                    Exhibit
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-md">
            {renderStep()}
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection className="bg-slate-50 px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500" animationType="flip">
              Why Exhibit at NIBF?
            </AnimatedHeading>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <AnimatedElement animationType="zoom" delay={0.1}>
              <div className="flex h-full flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <Users className="mb-4 h-12 w-12 text-crimson-500" />
                <h3 className="mb-3 text-xl font-bold text-navy-500">Connect with Your Audience</h3>
                <p className="text-slate-600">
                  Meet over 15,000 book lovers, educators, librarians, and industry professionals in one location.
                </p>
              </div>
            </AnimatedElement>
            <AnimatedElement animationType="zoom" delay={0.2}>
              <div className="flex h-full flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <MapPin className="mb-4 h-12 w-12 text-crimson-500" />
                <h3 className="mb-3 text-xl font-bold text-navy-500">Expand Your Reach</h3>
                <p className="text-slate-600">
                  Gain exposure to international markets with attendees from over 50 countries across Africa and
                  beyond.
                </p>
              </div>
            </AnimatedElement>
            <AnimatedElement animationType="zoom" delay={0.3}>
              <div className="flex h-full flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <Calendar className="mb-4 h-12 w-12 text-crimson-500" />
                <h3 className="mb-3 text-xl font-bold text-navy-500">Stay Relevant</h3>
                <p className="text-slate-600">
                  Keep up with industry trends and innovations through networking and professional development
                  opportunities.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
} 