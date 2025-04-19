"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Mail, Phone, Star, Award, Trophy, Medal, ArrowRight, Users, Globe, Heart, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AnimatedSection,
  AnimatedElement,
  AnimatedHeading,
  AnimatedText,
  AnimatedStagger,
} from "@/components/animated-section";
import { SponsorshipForm } from "./form";

export default function SponsorshipPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <AnimatedSection
        className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-32 md:min-h-[70vh] md:py-40"
        animationType="fade"
      >
        <div className="absolute inset-0 z-0 bg-[url('/images/slides/slide43.jpg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-navy-900/90 to-navy-900/90" />
        <div className="container relative z-10 mx-auto max-w-6xl text-center">
          <AnimatedElement animationType="slideUp">
            <div className="mb-6 inline-block rounded-full bg-crimson-500/20 px-4 py-1 text-sm font-medium text-white">
              NIBF 2026
            </div>
          </AnimatedElement>
          <AnimatedHeading
            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            animationType="flip"
          >
            Sponsorship <span className="text-crimson-500">Opportunities</span>
          </AnimatedHeading>
          <AnimatedText
            className="mx-auto max-w-2xl text-lg text-slate-200"
            animationType="slideUp"
          >
            Support education, literacy, and new learning while gaining significant brand exposure
          </AnimatedText>
        </div>
      </AnimatedSection>

      {/* Form Section */}
      <AnimatedSection className="bg-white px-4 py-20" animationType="slideUp">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <AnimatedElement animationType="slideUp">
              <div className="mb-4 inline-block rounded-full bg-crimson-500/10 px-4 py-1 text-sm font-medium text-crimson-500">
                Become a Sponsor
              </div>
            </AnimatedElement>
            <AnimatedHeading
              className="mb-6 text-3xl font-bold text-navy-500 md:text-4xl"
              animationType="flip"
            >
              Join Us as a <span className="text-crimson-500">Sponsor</span>
            </AnimatedHeading>
            <AnimatedText
              className="mx-auto max-w-2xl text-lg text-slate-600"
              animationType="slideUp"
            >
              Fill out the form below to become a sponsor and support the future of education in Nigeria
            </AnimatedText>
          </div>
          
          <div className="rounded-xl bg-white p-8 shadow-lg">
            {selectedPackage ? (
              <SponsorshipForm defaultPackage={selectedPackage} />
            ) : (
              <div className="text-center">
                <p className="mb-6 text-lg text-slate-600">
                  Please select a sponsorship package to proceed with the form.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button
                    onClick={() => setSelectedPackage("platinum")}
                    className="w-full bg-gradient-to-r from-navy-500 to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white shadow-md"
                  >
                    Platinum Package
                  </Button>
                  <Button
                    onClick={() => setSelectedPackage("gold")}
                    className="w-full bg-gradient-to-r from-navy-500 to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white shadow-md"
                  >
                    Gold Package
                  </Button>
                  <Button
                    onClick={() => setSelectedPackage("silver")}
                    className="w-full bg-gradient-to-r from-navy-500 to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white shadow-md"
                  >
                    Silver Package
                  </Button>
                  <Button
                    onClick={() => setSelectedPackage("bronze")}
                    className="w-full bg-gradient-to-r from-navy-500 to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white shadow-md"
                  >
                    Bronze Package
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Intro Section */}
      <AnimatedSection className="bg-white px-4 py-20" animationType="slideUp">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <AnimatedHeading
                className="mb-6 text-3xl font-bold text-navy-500 md:text-4xl"
                animationType="flip"
              >
                Gain Optimum <span className="text-crimson-500">Exposure</span>
              </AnimatedHeading>
              <AnimatedText
                className="text-lg text-slate-600"
                animationType="slideUp"
              >
                When you sponsor NIBF 2026, you get the opportunity to connect with top industry leaders, book enthusiasts, school, students, and position your brand as supportive of education and the future of Nigeria and Africa.
              </AnimatedText>
              <AnimatedElement animationType="slideUp" delay={0.2}>
                <div className="mt-8">
                  <Link href="#contact">
                    <Button size="lg" className="bg-navy-500 hover:bg-navy-600">
                      Contact Us to Sponsor
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </AnimatedElement>
            </div>
            <AnimatedElement animationType="slideLeft">
              <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/images/slides/slide43.jpg"
                  alt="Sponsorship Benefits"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="mb-2 text-xl font-bold">Why Sponsor NIBF 2026?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-crimson-500" />
                      <span>Connect with industry leaders</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-crimson-500" />
                      <span>Position your brand as education-focused</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-crimson-500" />
                      <span>Gain significant media exposure</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-crimson-500" />
                      <span>Support literacy and education</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* Sponsorship Packages */}
      <AnimatedSection
        className="bg-gradient-to-b from-slate-50 to-white px-4 py-24"
        animationType="slideUp"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <AnimatedElement animationType="slideUp">
              <div className="mb-4 inline-block rounded-full bg-crimson-500/10 px-5 py-1.5 text-sm font-medium text-crimson-500">
                Exclusive Packages
              </div>
            </AnimatedElement>
            <AnimatedHeading
              className="mb-6 text-3xl font-bold text-navy-500 md:text-4xl lg:text-5xl"
              animationType="flip"
            >
              Choose Your <span className="text-crimson-500">Sponsorship</span> Level
            </AnimatedHeading>
            <AnimatedText
              className="mx-auto max-w-2xl text-lg text-slate-600"
              animationType="slideUp"
            >
              Select the package that best aligns with your organization's vision and objectives
            </AnimatedText>
          </div>
          
          <AnimatedStagger
            className="grid gap-8 md:grid-cols-2"
            animationType="zoom"
          >
            {/* Platinum Package */}
            <motion.div
              className="group relative rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-navy-500"
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-crimson-500 to-crimson-600 text-white shadow-md">
                  <Star className="h-5 w-5" />
                </div>
              </div>
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-xl font-bold text-navy-500">PLATINUM SPONSOR</h3>
                <div className="mb-4 text-3xl font-bold text-crimson-500">₦15 Million</div>
                <div className="h-1 w-16 bg-gradient-to-r from-crimson-500 to-crimson-600 mx-auto rounded-full"></div>
              </div>
              <ul className="mb-8 space-y-4">
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Center Spread Advertisement in the catalogue of the Book Fair</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Advertisement Space on the Website of NIBF for one year</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Participation at NIBF 2026 Business Networking Dinner for 4 Personnel</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Reflection of the Company's name and logo in the book fair's marketing and promotional materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Distribution of marketing/promotional materials to the book fair's participants</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">15mins products/services marketing/promotion to the participants of the International Conference & Tertiary Education Summit of the book fair</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Presentation of a plaque of recognition</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Branding of the book fair's registration centre</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Branding of the hall for the International Conference & Tertiary Education Summit of the book fair</span>
                </li>
              </ul>
              <div className="text-center">
                <Link href="#contact">
                  <Button className="w-full bg-gradient-to-r from-navy-500 to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white shadow-md">
                    Select Package
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Gold Package */}
            <motion.div
              className="group relative rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-navy-500"
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-md">
                  <Award className="h-5 w-5" />
                </div>
              </div>
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-xl font-bold text-navy-500">GOLD SPONSOR</h3>
                <div className="mb-4 text-3xl font-bold text-amber-500">₦10 Million</div>
                <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full"></div>
              </div>
              <ul className="mb-8 space-y-4">
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Inside Front Cover Advertisement in the Catalogue of the Book Fair</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Advertisement Space on the Website of NIBF for one year</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Participation at NIBF 2026 Business Networking Dinner for 3 Personnel</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Reflection of Company's name and logo in the book fair's marketing and promotional materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Distribution of marketing/promotional materials to the book fair's participants</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">10mins products/services marketing/promotion to the participants of the International Conference & Tertiary Education Summit of the book fair</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Presentation of a plaque of recognition</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Placement of 5 roll up banners within the exhibition ground</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Advertisement in the backdrop of the International Conference and Tertiary Education Summit of the book fair</span>
                </li>
              </ul>
              <div className="text-center">
                <Link href="#contact">
                  <Button className="w-full bg-gradient-to-r from-navy-500 to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white shadow-md">
                    Select Package
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Silver Package */}
            <motion.div
              className="group relative rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-navy-500"
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-md">
                  <Trophy className="h-5 w-5" />
                </div>
              </div>
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-xl font-bold text-navy-500">SILVER SPONSOR</h3>
                <div className="mb-4 text-3xl font-bold text-slate-500">₦7 Million</div>
                <div className="h-1 w-16 bg-gradient-to-r from-slate-400 to-slate-500 mx-auto rounded-full"></div>
              </div>
              <ul className="mb-8 space-y-4">
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Run Off Page Advertisement in the Catalogue of the Book Fair</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Advertisement Space on the Website of NIBF for one year</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Participation at NIBF 2026 Business Networking Dinner for 2 Personnel</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Reflection of Company's name and logo in the book fair's marketing and promotional materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Distribution of marketing/promotional materials to the book fair's participants</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">10mins products/services marketing/promotion to the participants of the International Conference of the book fair</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Presentation of a plaque of recognition</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Advertisement in the backdrop of the International Conference of the book fair</span>
                </li>
              </ul>
              <div className="text-center">
                <Link href="#contact">
                  <Button className="w-full bg-gradient-to-r from-navy-500 to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white shadow-md">
                    Select Package
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Bronze Package */}
            <motion.div
              className="group relative rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-navy-500"
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-md">
                  <Medal className="h-5 w-5" />
                </div>
              </div>
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-xl font-bold text-navy-500">BRONZE SPONSOR</h3>
                <div className="mb-4 text-3xl font-bold text-amber-700">₦5.5 Million</div>
                <div className="h-1 w-16 bg-gradient-to-r from-amber-700 to-amber-800 mx-auto rounded-full"></div>
              </div>
              <ul className="mb-8 space-y-4">
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Run Off Page Advertisement in the Catalogue of the Book Fair</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Advertisement Space on the Website of NIBF for one year</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Participation at NIBF 2026 Business Networking Dinner for 1 Personnel</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Reflection of Company's name and logo in the book fair's marketing and promotional materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Distribution of marketing/promotional materials to the book fair's participants</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">5mins products/services marketing/promotion to the participants of the Tertiary Education Summit of the book fair</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Presentation of a plaque of recognition</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">Advertisement in the backdrop of the International Conference of the book fair</span>
                </li>
              </ul>
              <div className="text-center">
                <Link href="#contact">
                  <Button className="w-full bg-gradient-to-r from-navy-500 to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white shadow-md">
                    Select Package
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection className="bg-white px-4 py-20" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <AnimatedElement animationType="slideUp">
              <div className="mb-4 inline-block rounded-full bg-crimson-500/10 px-4 py-1 text-sm font-medium text-crimson-500">
                Sponsor Benefits
              </div>
            </AnimatedElement>
            <AnimatedHeading
              className="mb-6 text-3xl font-bold text-navy-500 md:text-4xl"
              animationType="flip"
            >
              Why Become a <span className="text-crimson-500">Sponsor</span>
            </AnimatedHeading>
          </div>
          
          <AnimatedStagger
            className="grid gap-8 md:grid-cols-3"
            animationType="zoom"
          >
            <div className="rounded-xl bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-crimson-500/10 text-crimson-500">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy-500">Connect with Leaders</h3>
              <p className="text-slate-600">
                Network with industry leaders, publishers, authors, and educational institutions from across Nigeria and Africa.
              </p>
            </div>
            
            <div className="rounded-xl bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-crimson-500/10 text-crimson-500">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy-500">Global Exposure</h3>
              <p className="text-slate-600">
                Position your brand on an <br /> international stage with visibility to attendees from across Africa and beyond.
              </p>
            </div>
            
            <div className="rounded-xl bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-crimson-500/10 text-crimson-500">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy-500">Social Impact</h3>
              <p className="text-slate-600">
                Demonstrate your commitment to education and literacy, enhancing your brand's reputation and social responsibility.
              </p>
            </div>
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection
        className="bg-white px-4 py-24"
        animationType="fade"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <AnimatedElement animationType="slideUp">
              <div className="mb-4 inline-block rounded-full bg-navy-500/10 px-5 py-1.5 text-sm font-medium text-navy-500">
                Contact Information
              </div>
            </AnimatedElement>
            <AnimatedHeading
              className="mb-6 text-3xl font-bold text-navy-500 md:text-4xl lg:text-5xl"
              animationType="flip"
            >
              Ready to become a <span className="text-crimson-500">sponsor</span>?
            </AnimatedHeading>
            <AnimatedText
              className="mx-auto max-w-2xl text-lg text-slate-600"
              animationType="slideUp"
            >
              Contact the NIBF Secretariat for further discussions and to secure your sponsorship package
            </AnimatedText>
          </div>
          
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Card 1 */}
            <AnimatedElement animationType="zoom" delay={0.1}>
              <div className="group h-full rounded-xl border-2 border-navy-500 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy-500 text-white shadow-md">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-navy-500">Email Us</h3>
                <p className="mb-6 text-slate-600">
                  For general inquiries and sponsorship information, please email us at:
                </p>
                <a 
                  href="mailto:info@nibfng.org" 
                  className="inline-flex items-center text-lg font-medium text-crimson-500 hover:text-crimson-600"
                >
                  info@nibfng.org
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </AnimatedElement>
            
            {/* Contact Card 2 */}
            <AnimatedElement animationType="zoom" delay={0.2}>
              <div className="group h-full rounded-xl border-2 border-navy-500 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy-500 text-white shadow-md">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-navy-500">Call Us</h3>
                <p className="mb-6 text-slate-600">
                  For immediate assistance, please contact us at:
                </p>
                <div className="space-y-3">
                  <a 
                    href="tel:+2348034026971" 
                    className="block text-lg font-medium text-crimson-500 hover:text-crimson-600"
                  >
                    +234-803-402-6971
                  </a>
                  <a 
                    href="tel:+2347084099363" 
                    className="block text-lg font-medium text-crimson-500 hover:text-crimson-600"
                  >
                    +234-708-409-9363
                  </a>
                </div>
              </div>
            </AnimatedElement>
            
            {/* Contact Card 3 */}
            <AnimatedElement animationType="zoom" delay={0.3}>
              <div className="group h-full rounded-xl border-2 border-navy-500 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy-500 text-white shadow-md">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-navy-500">Visit Us</h3>
                <p className="mb-6 text-slate-600">
                  Our office is located in Lagos, Nigeria. Business hours:
                </p>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
          
          {/* CTA Section */}
          <AnimatedElement
            className="mt-16"
            animationType="slideUp"
          >
            <div className="relative overflow-hidden rounded-xl bg-navy-500 p-12 shadow-xl">
              <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-10"></div>
              <div className="relative z-10 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-white">Join Us in Shaping Education</h3>
                  <p className="text-lg text-slate-200">
                    With your resources and our expertise, together we will drive the future of education in Nigeria and Africa, in the right direction.
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <Button className="bg-crimson-500 hover:bg-crimson-600 text-white shadow-lg px-8 py-6 text-lg">
                    Contact Us Now
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedSection>
    </div>
  );
} 