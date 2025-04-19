"use client"
import Image from "next/image"
import Link from "next/link"
import { Handshake, Award, Globe, Users, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection, AnimatedElement, AnimatedHeading, AnimatedText, AnimatedStagger } from "@/components/animated-section"

export default function PartnersPage() {
  // Partner data with image paths and names
  const partners = [
    { id: 1, name: "UBE", image: "/images/partners/ube.jpg", url: "#" },
    { id: 2, name: "Sponsor 1", image: "/images/partners/sponsors1.jpeg", url: "#" },
    { id: 3, name: "Sponsor 2", image: "/images/partners/sponsors2.jpeg", url: "#" },
    { id: 4, name: "Sponsor 3", image: "/images/partners/sponsors3.jpeg", url: "#" },
    { id: 5, name: "Sponsor 4", image: "/images/partners/sponsors4.jpeg", url: "#" },
    { id: 6, name: "Sponsor 5", image: "/images/partners/sponsors5.jpeg", url: "#" },
    { id: 7, name: "Sponsor 6", image: "/images/partners/sponsors6.jpeg", url: "#" },
    { id: 8, name: "Sponsor 7", image: "/images/partners/sponsors7.jpeg", url: "#" },
    { id: 9, name: "Sponsor 8", image: "/images/partners/sponsors8.jpeg", url: "#" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <AnimatedSection className="relative bg-navy-500 px-4 py-24 text-white overflow-hidden" animationType="fade">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-10"></div>
        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedHeading className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl" animationType="flip">
              Our Partners
            </AnimatedHeading>
            <AnimatedText className="text-lg text-slate-200 md:text-xl" animationType="slideUp">
              NIBF is proud to collaborate with leading organizations in the publishing industry
            </AnimatedText>
          </div>
        </div>
      </AnimatedSection>

      {/* Partners Grid */}
      <AnimatedSection className="bg-white px-4 py-20" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500 md:text-4xl" animationType="flip">
              Our Valued Partners
            </AnimatedHeading>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <AnimatedStagger className="grid gap-6 md:grid-cols-3 lg:grid-cols-4" animationType="zoom">
            {partners.map((partner) => (
              <Link 
                key={partner.id} 
                href={partner.url}
                className="group block"
              >
                <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:scale-105">
                  <div className="h-24 w-full relative">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </Link>
            ))}
            
            {/* Become Our Next Partner Card */}
            <Link href="/contact" className="group block">
              <div className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-navy-500 to-navy-600 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                <div className="h-20 w-full relative flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-crimson-500/10">
                    <Plus className="h-5 w-5 text-crimson-500" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white text-center">Become a Volunteer</h3>
              </div>
            </Link>
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      {/* Partnership Benefits */}
      <section className="bg-slate-50 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500 md:text-4xl">Volunteer Benefits</h2>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-100">
                <Globe className="h-6 w-6 text-navy-500" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-navy-500">Global Visibility</h3>
              <p className="text-sm text-slate-600">
                Showcase your brand to a diverse audience of industry professionals and book lovers from around the
                world.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-100">
                <Users className="h-6 w-6 text-navy-500" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-navy-500">Networking Opportunities</h3>
              <p className="text-sm text-slate-600">
                Connect with key stakeholders in the publishing industry and forge valuable partnerships and
                collaborations.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-100">
                <Award className="h-6 w-6 text-navy-500" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-navy-500">Brand Association</h3>
              <p className="text-sm text-slate-600">
                Associate your brand with Africa's premier book event and demonstrate your commitment to literacy and
                education.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-100">
                <Handshake className="h-6 w-6 text-navy-500" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-navy-500">Corporate Social Responsibility</h3>
              <p className="text-sm text-slate-600">
                Contribute to the development of literacy and education in Nigeria and Africa at large.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection className="relative bg-navy-500 px-4 py-20 text-white overflow-hidden" animationType="fade">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-10"></div>
        <div className="container relative z-10 mx-auto max-w-4xl text-center">
          <AnimatedHeading className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl" animationType="flip">
          Become a Volunteer
          </AnimatedHeading>
          <AnimatedText className="mb-10 text-lg text-slate-200 md:text-xl" animationType="slideUp">
            Join our network of partners and be a part of Africa's premier book event. We offer various partnership
            opportunities to suit your organization's goals and budget.
          </AnimatedText>
          <AnimatedElement animationType="slideUp" delay={0.2}>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-crimson-500 hover:bg-crimson-600 px-8 py-6 text-lg">
                Partner With Us
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-navy-400 px-8 py-6 text-lg">
                Download Partnership Brochure
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedSection>
    </div>
  )
}

