"use client"
import { Check, HelpCircle, FileText, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedSection, AnimatedElement, AnimatedHeading, AnimatedText, AnimatedStagger } from "@/components/animated-section"
import Link from "next/link"

export default function ExhibitorsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <AnimatedSection className="bg-navy-500 px-4 py-20 text-white" animationType="fade">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedHeading className="mb-6 text-4xl font-bold md:text-5xl" animationType="flip">
              For Exhibitors
            </AnimatedHeading>
            <AnimatedText className="text-lg text-slate-200" animationType="slideUp">
              Showcase your publications and connect with industry professionals at Africa's premier book event
            </AnimatedText>
          </div>
        </div>
      </AnimatedSection>

      {/* Floor Plan Section */}
      <AnimatedSection className="bg-white px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500" animationType="flip">
              Exhibition Floor Plan
            </AnimatedHeading>
            <AnimatedText className="text-lg text-slate-600" animationType="slideUp">
              View the layout of our exhibition space and plan your ideal stand location
            </AnimatedText>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
            <div className="aspect-[16/9] overflow-hidden rounded-lg">
              <img
                src="/images/img/stand.png"
                alt="NIBF Exhibition Floor Plan"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Contact our team to discuss specific stand locations and requirements.
              </p>
              <Button className="mt-4 bg-crimson-500 hover:bg-crimson-600" asChild>
                <a href="/book-stand">Book Your Stand</a>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stand Options */}
      <AnimatedSection className="bg-slate-50 px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500" animationType="flip">
              Value Added Exhibition Rates
            </AnimatedHeading>
            <AnimatedText className="text-lg text-slate-600" animationType="slideUp">
              As part of our repackaging for the 2026 exhibition, we have added value to make your participation more seamless and convenient.
            </AnimatedText>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <AnimatedStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" animationType="zoom">
            {/* 4 Square Metres */}
            <div className="flex h-full flex-col rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-navy-500 p-6 text-center text-white">
                <h3 className="text-2xl font-bold">4 Square Metres</h3>
                <p className="mt-2 text-3xl font-bold">1,200 USD</p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <ul className="mb-6 flex-1 space-y-4">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Internet Access during the Book Fair</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Visa application support service</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">3 Days Lunch at Sheraton Hotel</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Participation in the Networking Dinner at Sheraton Hotel for 1 Person</span>
                  </li>
                </ul>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600" asChild>
                  <a href="/book-stand">Book Now</a>
                </Button>
              </div>
            </div>

            {/* 8 Square Metres */}
            <div className="flex h-full flex-col rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-navy-500 p-6 text-center text-white">
                <h3 className="text-2xl font-bold">8 Square Metres</h3>
                <p className="mt-2 text-3xl font-bold">2,400 USD</p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <ul className="mb-6 flex-1 space-y-4">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Internet Access during the Book Fair</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Visa application support service</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Airport Pick Up</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">3 Days Lunch at Sheraton Hotel</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Participation in the Networking Dinner at Sheraton Hotel for 1 Person</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">3 Nights Hotel Accommodation with Breakfast at BON Hotel, Ikeja, Lagos for 1 person</span>
                  </li>
                </ul>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600" asChild>
                  <a href="/book-stand">Book Now</a>
                </Button>
              </div>
            </div>

            {/* 12 Square Metres */}
            <div className="flex h-full flex-col rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-navy-500 p-6 text-center text-white">
                <h3 className="text-2xl font-bold">12 Square Metres</h3>
                <p className="mt-2 text-3xl font-bold">3,600 USD</p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <ul className="mb-6 flex-1 space-y-4">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Internet Access during the Book Fair</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Visa application support service</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Airport Pick Up</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">3 Days Lunch at Sheraton Hotel</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Participation in the Networking Dinner at Sheraton Hotel for 2 Persons</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">4 Nights Hotel Accommodation with Breakfast at BON Hotel, Ikeja, Lagos for 1 person</span>
                  </li>
                </ul>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600" asChild>
                  <a href="/book-stand">Book Now</a>
                </Button>
              </div>
            </div>

            {/* 16 Square Metres */}
            <div className="flex h-full flex-col rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-navy-500 p-6 text-center text-white">
                <h3 className="text-2xl font-bold">16 Square Metres</h3>
                <p className="mt-2 text-3xl font-bold">4,800 USD</p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <ul className="mb-6 flex-1 space-y-4">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Internet Access during the Book Fair</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Visa application support service</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Airport Pick Up</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">3 Days Lunch at Sheraton Hotel</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Participation in the Networking Dinner at Sheraton Hotel for 2 Persons</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">3 Nights Hotel Accommodation with Breakfast at Sheraton Hotel, Ikeja, Lagos for 1 person</span>
                  </li>
                </ul>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600" asChild>
                  <a href="/book-stand">Book Now</a>
                </Button>
              </div>
            </div>

            {/* 24 Square Metres */}
            <div className="flex h-full flex-col rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-navy-500 p-6 text-center text-white">
                <h3 className="text-2xl font-bold">24 Square Metres</h3>
                <p className="mt-2 text-3xl font-bold">7,200 USD</p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <ul className="mb-6 flex-1 space-y-4">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Internet Access during the Book Fair</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Visa application support service</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Airport Pick Up</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">3 Days Lunch at Sheraton Hotel</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">Participation in the Networking Dinner at Sheraton Hotel for 4 Persons</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-crimson-500" />
                    <span className="text-slate-600">4 Nights Hotel Accommodation with Breakfast at Sheraton Hotel, Ikeja, Lagos for 1 person</span>
                  </li>
                </ul>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600" asChild>
                  <a href="/book-stand">Book Now</a>
                </Button>
              </div>
            </div>
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection className="bg-white px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500" animationType="flip">
              Why Exhibit at NIBF?
            </AnimatedHeading>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <AnimatedStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" animationType="zoom">
            <div className="flex h-full flex-col rounded-lg bg-slate-50 p-6 shadow-md">
              <Users className="mb-4 h-10 w-10 text-crimson-500" />
              <h3 className="mb-3 text-xl font-bold text-navy-500">Connect with Your Audience</h3>
              <p className="text-slate-600">
                Meet over 15,000 book lovers, educators, librarians, and industry professionals in one location.
              </p>
            </div>
            <div className="flex h-full flex-col rounded-lg bg-slate-50 p-6 shadow-md">
              <MapPin className="mb-4 h-10 w-10 text-crimson-500" />
              <h3 className="mb-3 text-xl font-bold text-navy-500">Expand Your Reach</h3>
              <p className="text-slate-600">
                Gain exposure to international markets with attendees from over 50 countries across Africa and beyond.
              </p>
            </div>
            <div className="flex h-full flex-col rounded-lg bg-slate-50 p-6 shadow-md">
              <Calendar className="mb-4 h-10 w-10 text-crimson-500" />
              <h3 className="mb-3 text-xl font-bold text-navy-500">Stay Relevant</h3>
              <p className="text-slate-600">
                Keep up with industry trends and innovations through networking and professional development
                opportunities.
              </p>
            </div>
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      {/* Application Process */}
      <AnimatedSection className="bg-white px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500" animationType="flip">
              Application Process
            </AnimatedHeading>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-1 bg-navy-100 md:left-[7.5rem]"></div>
              <AnimatedStagger className="space-y-12" animationType="slideRight">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-navy-500 text-xl font-bold text-white md:left-24">
                    1
                  </div>
                  <div className="ml-24 md:ml-48">
                    <h3 className="mb-2 text-xl font-bold text-navy-500">Submit Application</h3>
                    <p className="text-slate-600">
                      Complete the online application form with your company details and stand preferences.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-navy-500 text-xl font-bold text-white md:left-24">
                    2
                  </div>
                  <div className="ml-24 md:ml-48">
                    <h3 className="mb-2 text-xl font-bold text-navy-500">Receive Confirmation</h3>
                    <p className="text-slate-600">
                      Once your application is approved, you will receive a confirmation email with payment
                      instructions.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-navy-500 text-xl font-bold text-white md:left-24">
                    3
                  </div>
                  <div className="ml-24 md:ml-48">
                    <h3 className="mb-2 text-xl font-bold text-navy-500">Make Payment</h3>
                    <p className="text-slate-600">
                      Secure your stand by making payment within 3 days of receiving confirmation.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-navy-500 text-xl font-bold text-white md:left-24">
                    4
                  </div>
                  <div className="ml-24 md:ml-48">
                    <h3 className="mb-2 text-xl font-bold text-navy-500">Prepare for the Fair</h3>
                    <p className="text-slate-600">
                      Receive the exhibitor manual with all the information you need to prepare for the fair.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-crimson-500 text-xl font-bold text-white md:left-24">
                    5
                  </div>
                  <div className="ml-24 md:ml-48">
                    <h3 className="mb-2 text-xl font-bold text-navy-500">Exhibit at NIBF 2026</h3>
                    <p className="text-slate-600">
                      Set up your stand and showcase your publications at Africa's premier book event!
                    </p>
                  </div>
                </div>
              </AnimatedStagger>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQs */}
      <AnimatedSection className="bg-slate-50 px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500" animationType="flip">
              Frequently Asked Questions
            </AnimatedHeading>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="mx-auto max-w-3xl">
            <AnimatedElement animationType="slideUp">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold text-navy-500">
                    When is the deadline for exhibitor registration?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    The early bird registration deadline is March 15, 2026. Regular registration closes on April 15, 2026.
                    However, we recommend registering early to secure your preferred stand location.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold text-navy-500">
                    Can I change my stand location after booking?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Stand location changes are subject to availability and may incur additional charges. Please contact
                    our exhibitor services team for assistance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold text-navy-500">
                    What is included in the stand package?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    The stand package includes the stand space, basic furniture (table and chairs), fascia board with
                    company name, and exhibitor badges. Additional furniture and equipment can be rented at an extra
                    cost.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-semibold text-navy-500">
                    Is there a limit to the number of exhibitor badges?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    The number of exhibitor badges depends on the stand package you choose. Additional badges can be
                    purchased at a cost of $50 per badge.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-semibold text-navy-500">
                    Can I share a stand with another company?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Stand sharing is not permitted unless both companies are officially registered as co-exhibitors.
                    Please contact our team for more information on co-exhibitor registration.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="bg-navy-500 px-4 py-16 text-white" animationType="fade">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimatedHeading className="mb-6 text-3xl font-bold md:text-4xl" animationType="flip">
            Ready to Exhibit at NIBF 2026?
          </AnimatedHeading>
          <AnimatedText className="mb-8 text-lg text-slate-200" animationType="slideUp">
            Secure your stand today and be a part of Africa's premier book event. Limited spaces available!
          </AnimatedText>
          <AnimatedElement animationType="slideUp" delay={0.2}>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/exhibitors">
                <Button size="lg" className="bg-crimson-500 hover:bg-crimson-600">
                  Book a Stand Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white bg-navy-500 text-white hover:bg-navy-400">
                Contact Us
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedSection>
    </div>
  )
}

