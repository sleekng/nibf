"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock, Send, Check, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from "next/dynamic"

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-slate-100">
      <p className="text-navy-500">Loading map...</p>
    </div>
  ),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [showMap, setShowMap] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState({ title: "", message: "" })

  // Simulate showing a notification
  const showToast = (title: string, message = "") => {
    setNotification({ title, message })
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      showToast("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      showToast("Message sent successfully!", "Thank you for contacting us. We will get back to you soon.")

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 1500)
  }

  const handleSocialMediaClick = (platform: string) => {
    showToast(`Opening ${platform}`, `Redirecting to NIBF's ${platform} page.`)
  }

  const toggleMap = () => {
    setShowMap((prev) => !prev)
    if (!showMap) {
      showToast("Loading interactive map", "Please wait while we load the map...")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed right-4 top-4 z-50 flex max-w-md animate-in fade-in slide-in-from-top-2 items-center rounded-lg bg-white p-4 shadow-lg">
          <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{notification.title}</p>
            {notification.message && <p className="text-sm text-gray-600">{notification.message}</p>}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-navy-500 px-4 py-20 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="text-lg text-slate-200">Get in touch with the Nigeria International Book Fair team</p>
          </div>
        </div>
      </section>

          {/* Contact Form & Map */}
          <section className="bg-slate-50 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-navy-500">Send Us a Message</h2>
              {isSuccess ? (
                <div className="rounded-lg bg-green-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-green-800">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for contacting us. We will get back to you as soon as possible.
                  </p>
                  <Button className="mt-6 bg-navy-500 hover:bg-navy-600" onClick={() => setIsSuccess(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-slate-700">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-slate-700">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-slate-700">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-slate-700">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-slate-700">
                      Subject *
                    </label>
                    <Select value={formData.subject} onValueChange={handleSelectChange} required>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="exhibitor">Exhibitor Information</SelectItem>
                        <SelectItem value="registration">Registration Support</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                        <SelectItem value="media">Media & Press</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-slate-700">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      className="min-h-[150px]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-crimson-500 hover:bg-crimson-600">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Map */}
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-navy-500">Our Location</h2>
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                {showMap ? (
                  <Map
                    center={[6.4500, 3.4333] as [number, number]} // Coordinates for Ikoyi, Lagos
                    zoom={15}
                    address="7 Dideolu Court, Ikoyi, Lagos, Nigeria"
                  />
                ) : (
                  <>
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Map Location"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button className="bg-navy-500/90 hover:bg-navy-500" onClick={toggleMap}>
                        Load Interactive Map
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-6">
                <h3 className="mb-2 text-lg font-bold text-navy-500">Nigerian Book Fair Trust</h3>
                <p className="mb-4 text-slate-600">7 Dideolu Court, Ikoyi, Lagos, Nigeria</p>
                <p className="text-slate-600">
                  Our office is located in the heart of Ikoyi, Lagos. Landmarks include the Ikoyi Club and the Nigerian
                  Institute of International Affairs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-slate-50 p-6 text-center shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-100">
                <Phone className="h-8 w-8 text-navy-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-navy-500">Phone</h3>
              <p className="text-slate-600">+234 123 456 7890</p>
              <p className="text-slate-600">+234 987 654 3210</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-crimson-500 hover:text-crimson-600"
                onClick={() => showToast("Calling NIBF", "Initiating call to +234 123 456 7890")}
              >
                Call Now
              </Button>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 text-center shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-100">
                <Mail className="h-8 w-8 text-navy-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-navy-500">Email</h3>
              <p className="text-slate-600">info@nibfng.org</p>
              <p className="text-slate-600">support@nibfng.org</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-crimson-500 hover:text-crimson-600"
                onClick={() => showToast("Composing email", "Opening email client to contact info@nibfng.org")}
              >
                Email Us
              </Button>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 text-center shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-100">
                <MapPin className="h-8 w-8 text-navy-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-navy-500">Address</h3>
              <p className="text-slate-600">Nigerian Book Fair Trust</p>
              <p className="text-slate-600">7 Dideolu Court, Ikoyi, Lagos, Nigeria</p>
         
            </div>
            <div className="rounded-lg bg-slate-50 p-6 text-center shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-100">
                <Clock className="h-8 w-8 text-navy-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-navy-500">Office Hours</h3>
              <p className="text-slate-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-slate-600">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="mt-2 text-xs text-slate-500">All times are in West African Time (WAT)</p>
            </div>
          </div>
        </div>
      </section>

  

      {/* Social Media */}
      <section className="bg-navy-500 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Connect With Us</h2>
          <p className="mb-8 text-lg text-slate-200">
            Follow us on social media for the latest updates, news, and announcements
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              variant="outline"
              className="border-white text-white bg-transparent hover:text-crimson-600 hover:bg-navy-400"
              onClick={() => handleSocialMediaClick("Facebook")}
            >
              <Facebook className="mr-2 h-4 w-4" /> Facebook
            </Button>
            <Button
              variant="outline"
              className="border-white text-white bg-transparent hover:text-crimson-600  hover:bg-navy-400"
              onClick={() => handleSocialMediaClick("Twitter")}
            >
              <Twitter className="mr-2 h-4 w-4" /> Twitter
            </Button>
            <Button
              variant="outline"
              className="border-white text-white bg-transparent hover:text-crimson-600  hover:bg-navy-400"
              onClick={() => handleSocialMediaClick("Instagram")}
            >
              <Instagram className="mr-2 h-4 w-4" /> Instagram
            </Button>
            <Button
              variant="outline"
              className="border-white text-white bg-transparent hover:text-crimson-600  hover:bg-navy-400"
              onClick={() => handleSocialMediaClick("LinkedIn")}
            >
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

