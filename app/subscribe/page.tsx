"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Mail, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SubscribePage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [subscriptionType, setSubscriptionType] = useState("all")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      if (email && name) {
        setIsSuccess(true)
        setEmail("")
        setName("")
        setSubscriptionType("all")
      } else {
        setError("Please fill in all required fields.")
      }
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-navy-500 px-4 py-20 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Subscribe to Our Newsletter</h1>
            <p className="text-lg text-slate-200">
              Stay updated with the latest news, insights, and stories from the Nigeria International Book Fair
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg bg-white p-8 shadow-md">
              {isSuccess ? (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-navy-500">Thank You for Subscribing!</h2>
                  <p className="mb-6 text-slate-600">
                    You have successfully subscribed to our newsletter. You will now receive updates about NIBF events,
                    news, and special offers.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} className="bg-crimson-500 hover:bg-crimson-600">
                    Subscribe Another Email
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-8 flex items-center justify-center">
                    <div className="mr-4 rounded-full bg-navy-100 p-3">
                      <Mail className="h-6 w-6 text-navy-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy-500">Subscribe to Our Newsletter</h2>
                  </div>

                  {error && (
                    <div className="mb-6 flex items-center rounded-lg bg-red-50 p-4 text-red-800">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700">
                        Full Name <span className="text-crimson-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">
                        Email Address <span className="text-crimson-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-slate-700">Subscription Preferences</Label>
                      <RadioGroup value={subscriptionType} onValueChange={setSubscriptionType} className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="all" className="font-medium text-navy-500">
                              All Updates
                            </Label>
                            <p className="text-sm text-slate-500">
                              Receive all updates including event announcements, blog posts, and special offers
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="events" id="events" />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="events" className="font-medium text-navy-500">
                              Event Updates Only
                            </Label>
                            <p className="text-sm text-slate-500">
                              Receive updates about upcoming events and exhibitions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="blog" id="blog" />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="blog" className="font-medium text-navy-500">
                              Blog Posts Only
                            </Label>
                            <p className="text-sm text-slate-500">
                              Receive notifications when new blog posts are published
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-slate-700">Areas of Interest (Optional)</Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="publishing" />
                          <label htmlFor="publishing" className="text-sm text-slate-600">
                            Publishing
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="education" />
                          <label htmlFor="education" className="text-sm text-slate-600">
                            Education
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="literature" />
                          <label htmlFor="literature" className="text-sm text-slate-600">
                            Literature
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="digital" />
                          <label htmlFor="digital" className="text-sm text-slate-600">
                            Digital Publishing
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="authors" />
                          <label htmlFor="authors" className="text-sm text-slate-600">
                            Authors & Writing
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="industry" />
                          <label htmlFor="industry" className="text-sm text-slate-600">
                            Industry News
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="privacy" required />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="privacy"
                          className="text-sm font-medium text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the privacy policy <span className="text-crimson-500">*</span>
                        </label>
                        <p className="text-sm text-slate-500">
                          By subscribing, you agree to our{" "}
                          <a href="#" className="text-crimson-500 hover:underline">
                            Privacy Policy
                          </a>{" "}
                          and consent to receive updates from NIBF.
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-crimson-500 hover:bg-crimson-600"
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">Benefits of Subscribing</h2>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-100">
                <Mail className="h-8 w-8 text-navy-500" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy-500">Stay Informed</h3>
              <p className="text-slate-600">
                Receive the latest news, insights, and updates about the Nigeria International Book Fair and the
                publishing industry.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-100">
                <Mail className="h-8 w-8 text-navy-500" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy-500">Early Access</h3>
              <p className="text-slate-600">
                Get early access to event registrations, special offers, and exclusive content before they are publicly
                announced.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-100">
                <Mail className="h-8 w-8 text-navy-500" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy-500">Community Connection</h3>
              <p className="text-slate-600">
                Connect with a community of book lovers, publishers, authors, and industry professionals from around the
                world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Past Newsletters */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">Past Newsletters</h2>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500">April {index}, 2025</span>
                  <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500">
                    {index % 3 === 0 ? "Event Update" : index % 3 === 1 ? "Industry News" : "Blog Digest"}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-navy-500">
                  {index % 3 === 0
                    ? "NIBF 2025 Registration Now Open"
                    : index % 3 === 1
                      ? "Publishing Industry Trends for 2025"
                      : "Top Blog Posts from March 2025"}
                </h3>
                <p className="mb-4 text-slate-600">
                  {index % 3 === 0
                    ? "Registration for NIBF 2025 is now open! Secure your spot at Africa's premier book event."
                    : index % 3 === 1
                      ? "Explore the latest trends and innovations in the publishing industry for 2025."
                      : "A roundup of our most popular blog posts from March 2025."}
                </p>
                <Button variant="outline" className="w-full border-crimson-500 text-crimson-500 hover:bg-crimson-50">
                  Read Newsletter
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-crimson-500 text-crimson-500 hover:bg-crimson-50">
              View All Newsletters
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">What Our Subscribers Say</h2>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <p className="mb-6 italic text-slate-600">
                "The NIBF newsletter keeps me informed about the latest developments in the publishing industry. It's a
                valuable resource for staying updated on industry trends and events."
              </p>
              <div className="flex items-center">
                <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-navy-100">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Subscriber" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-500">John Doe</h4>
                  <p className="text-sm text-slate-500">Publisher, ABC Books</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <p className="mb-6 italic text-slate-600">
                "I appreciate the early access to event registrations and special offers. The newsletter has helped me
                stay ahead of the curve and make the most of NIBF events."
              </p>
              <div className="flex items-center">
                <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-navy-100">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Subscriber" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-500">Jane Smith</h4>
                  <p className="text-sm text-slate-500">Author</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <p className="mb-6 italic text-slate-600">
                "The content is always relevant and insightful. I look forward to receiving the newsletter and learning
                about the latest developments in the Nigerian publishing scene."
              </p>
              <div className="flex items-center">
                <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-navy-100">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Subscriber" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-500">David Johnson</h4>
                  <p className="text-sm text-slate-500">Educator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

