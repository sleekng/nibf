"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  BookOpen,
  Users,
  ChevronRight,
  Mic,
  Award,
  BookMarked,
  GraduationCap,
  Globe,
  Heart,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";
import { Testimonials } from "@/components/testimonials";
import { Partners } from "@/components/partners";
import { Newsletter } from "@/components/newsletter";
import {
  AnimatedSection,
  AnimatedElement,
  AnimatedHeading,
  AnimatedImage,
  AnimatedText,
  AnimatedStagger,
} from "@/components/animated-section";
import { ImageSlider } from "@/components/image-slider";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <AnimatedSection
        className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 px-4  md:min-h-[70vh] "
        animationType="fade"
      >
        <div className="absolute inset-0 z-0 bg-[url('/images/backgrounds/pattern-bg.jpg')] bg-cover bg-center opacity-50" />
        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <AnimatedElement animationType="slideLeft">
                <div className="inline-flex items-center rounded-full bg-navy-100 px-3 py-1 text-sm font-medium text-navy-800">
                  <Calendar className="mr-2 h-4 w-4" />
                  May 07-09, 2026
                </div>
              </AnimatedElement>
              <AnimatedHeading
                className="text-4xl font-bold tracking-tight text-navy-500 sm:text-5xl md:text-6xl"
                animationType="flip"
                delay={0.5}
              >
                Nigeria International{" "}
                <span className="text-crimson-500">Book Fair</span> 2026
              </AnimatedHeading>
              <AnimatedText
                className="max-w-xl text-lg text-slate-600"
                animationType="slideUp"
              >
                Join Africa's premier book event connecting publishers, authors,
                and readers from around the world.
              </AnimatedText>
              <AnimatedElement animationType="slideUp" delay={0.5}>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/register-to-attend">
                      <Button size="lg" className="bg-navy-500 hover:bg-navy-600">
                        Register to Attend
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/exhibitors">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-crimson-500 hover:text-navy-600 bg-white text-crimson-500 hover:bg-crimson-50"
                      >
                        Book a Stand
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/sponsorship">
                      <Button
                        size="lg"
                        className="bg-crimson-500 hover:bg-crimson-600 text-white"
                      >
                        Become a Sponsor
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </AnimatedElement>
            </div>
            <AnimatedElement animationType="zoom" delay={0.3}>
              <div className="flex items-center justify-center">
                <ImageSlider />
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* Event Details Card */}
        <AnimatedElement
          className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full rounded-t-xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-4"
          animationType="slideUp"
          delay={0.4}
        >
          <div className="container mx-auto px-12">
            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                className="flex flex-col items-center justify-center border-b border-slate-200 pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-8"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="mb-4 text-2xl font-bold text-navy-900">Theme</h3>
                <p className="text-center text-lg text-slate-700">
                  Local Paper Production: Panacea to Affordable Book Production
                  and Qualitative Education
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center justify-center border-b border-slate-200 pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-8"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="mb-4 text-2xl font-bold text-navy-900">Venue</h3>
                <div className="flex items-center text-lg text-slate-700">
                  <MapPin className="mr-2 h-6 w-6 text-crimson-500" />
                  Balmoral Convention Centre, Sheraton Hotel, Ikeja, Lagos
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col items-center justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="mb-4 text-2xl font-bold text-navy-900">
                  Countdown
                </h3>
                <CountdownTimer targetDate="2026-05-07T09:00:00" />
              </motion.div>
            </div>
          </div>
        </AnimatedElement>
      </AnimatedSection>

      {/* Sponsorship Section */}
      <AnimatedSection
        className="bg-white px-4 py-20"
        animationType="fade"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <AnimatedHeading
                className="mb-6 text-3xl font-bold text-navy-900 md:text-4xl"
                animationType="flip"
              >
                Partner with <span className="text-crimson-500">NIBF 2026</span>
              </AnimatedHeading>
              <AnimatedText
                className="mb-8 text-lg text-slate-600"
                animationType="slideUp"
              >
                Join us in our mission to transform education in Nigeria and Africa. As a sponsor, you'll be part of a movement that's shaping the future of learning and development.
              </AnimatedText>
              <AnimatedStagger
                className="space-y-4"
                animationType="slideUp"
              >
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5 text-crimson-500" />
                  <span className="text-slate-700">Connect with industry leaders and decision-makers</span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-3 h-5 w-5 text-crimson-500" />
                  <span className="text-slate-700">Expand your reach across Africa</span>
                </div>
                <div className="flex items-center">
                  <Heart className="mr-3 h-5 w-5 text-crimson-500" />
                  <span className="text-slate-700">Make a lasting impact on education</span>
                </div>
              </AnimatedStagger>
              <AnimatedElement
                className="mt-8"
                animationType="slideUp"
              >
                <Link href="/sponsorship">
                  <Button className="bg-crimson-500 text-white hover:bg-crimson-600">
                    Explore Sponsorship Packages
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </AnimatedElement>
            </div>
            <AnimatedElement animationType="slideLeft">
              <div className="relative h-[500px] overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/images/slides/GNDIRIUXgAAyz43.jpg"
                  alt="Sponsorship Opportunities"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/100 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="mb-2 text-xl font-bold">Why Sponsor NIBF 2026?</h3>
                  <p className="mb-4">
                    From networking opportunities to brand visibility, discover how your sponsorship can make a difference while achieving your business objectives.
                  </p>
                  <Link href="/sponsorship">
                    <Button variant="outline" className="border-white text-white bg-transparent hover:text-crimson-500 hover:bg-white/10">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection className="bg-white px-4 py-20" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <AnimatedHeading
            className="mb-12 text-center text-3xl font-bold text-navy-500 md:text-4xl"
            animationType="flip"
          >
            About The Event
          </AnimatedHeading>
          <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
            <div className="order-2 flex flex-col justify-center space-y-6 md:order-1">
              <AnimatedText
                className="text-lg text-slate-600"
                animationType="slideRight"
              >
              The Nigeria International Book Fair (NIBF) 2026 edition, is a beacon of literary excellence and cultural celebration on the African continent. Organized by the esteemed Nigeria Book Fair Trust, NIBF stands as the largest and most consistent gathering of literary enthusiasts, publishers, authors, and stakeholders in Nigeria and beyond.
              </AnimatedText>
              <AnimatedText
                className="text-lg text-slate-600"
                animationType="slideRight"
                delay={0.1}
              >
             With a rich history spanning over 22 editions, NIBF continues to champion the cause of literacy, knowledge dissemination, and the vibrant exchange of ideas.
              </AnimatedText>
              <AnimatedStagger
                className="grid grid-cols-2 gap-6"
                animationType="zoom"
              >
                <div className="rounded-lg bg-slate-50 p-4">
                  <BookOpen className="mb-2 h-8 w-8 text-crimson-500" />
                  <h3 className="mb-1 text-xl font-semibold text-navy-500">
                    300+
                  </h3>
                  <p className="text-sm text-slate-600">Exhibitors</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <Users className="mb-2 h-8 w-8 text-crimson-500" />
                  <h3 className="mb-1 text-xl font-semibold text-navy-500">
                    15,000+
                  </h3>
                  <p className="text-sm text-slate-600">Attendees</p>
                </div>
              </AnimatedStagger>
              <AnimatedElement animationType="slideRight" delay={0.2}>
                <div className="pt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center text-crimson-500 hover:text-crimson-600"
                  >
                    Learn more about NIBF
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </AnimatedElement>
            </div>
            <AnimatedElement
              className="order-1 md:order-2"
              animationType="slideLeft"
            >
              <div className="relative h-[300px] overflow-hidden rounded-lg border-8 border-white shadow-lg md:h-[400px] lg:h-[500px]">
                <Image
                  src="/images/slides/slide43.jpg"
                  alt="About Nigeria International Book Fair"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* 25th Anniversary Celebration */}
      <AnimatedSection className="relative overflow-hidden bg-navy-900 px-4 py-20 text-white" animationType="slideUp">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/event/1.jpg"
            alt="NIBF Event"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-crimson-900/90" />
        </div>

        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-8">
              <AnimatedElement animationType="slideRight">
                <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                 Upcoming
                </div>
              </AnimatedElement>
              
              <AnimatedHeading
                className="text-4xl font-bold leading-tight md:text-5xl"
                animationType="flip"
              >
                 Celebrating 25 Years{" "}
                <span className="text-crimson-400">of Excellence</span>
              </AnimatedHeading>

              <AnimatedText
                className="text-lg text-slate-200"
                animationType="slideUp"
              >
                Join us in commemorating 25 years of transforming education and literacy in Nigeria. As we celebrate this milestone, we invite organizations to be part of our legacy by supporting our special initiative for Lagos State schools.
              </AnimatedText>

              <AnimatedStagger
                className="grid grid-cols-2 gap-6"
                animationType="zoom"
              >
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="rounded-full bg-crimson-500/20 p-3">
                      <BookOpen className="h-6 w-6 text-crimson-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold">25+</h3>
                      <p className="text-sm text-slate-300">Years of Impact</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="rounded-full bg-crimson-500/20 p-3">
                      <GraduationCap className="h-6 w-6 text-crimson-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold">1000+</h3>
                      <p className="text-sm text-slate-300">Schools Supported</p>
                    </div>
                  </div>
                </div>
              </AnimatedStagger>

              <AnimatedElement animationType="slideUp" delay={0.2}>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/book-donations">
                    <Button className="bg-crimson-500 text-white hover:bg-crimson-600">
                      Support Our Initiative
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/sponsorship">
                    <Button variant="outline" className=" bg-transperent hover:text-crimson-600 border-white text-white hover:bg-white/10">
                      Become a sponsor
                    </Button>
                  </Link>
                </div>
              </AnimatedElement>
            </div>

            <AnimatedElement animationType="slideLeft">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative h-48 overflow-hidden rounded-lg">
                      <Image
                        src="/images/event/2.jpg"
                        alt="NIBF Event"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-64 overflow-hidden rounded-lg">
                      <Image
                        src="/images/event/3.jpg"
                        alt="NIBF Event"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="relative h-64 overflow-hidden rounded-lg">
                      <Image
                        src="/images/event/4.jpg"
                        alt="NIBF Event"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-48 overflow-hidden rounded-lg">
                      <Image
                        src="/images/event/5.jpg"
                        alt="NIBF Event"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-lg bg-black/50 p-4 backdrop-blur-sm">
                  <p className="text-sm text-slate-200">
                    Join us in making a lasting impact on education in Nigeria
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* Event Highlights */}
      <AnimatedSection
        className="relative px-4 py-20"
        animationType="slideUp"
      >
                <div className="absolute inset-0 z-0 bg-[url('/images/slides/slide43.jpg')] bg-cover bg-center opacity-40" />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/50 to-white/90" />
        <div className="container mx-auto max-w-6xl">
          <div className="relative z-10">

          <AnimatedHeading
            className="mb-12 text-center text-3xl font-bold text-navy-500 md:text-4xl"
            animationType="flip"
          >
            Event Highlights
          </AnimatedHeading>
          <AnimatedStagger
            className="grid gap-8 md:grid-cols-3"
            animationType="zoom"
          >
            <div className="rounded-lg bg-white p-6 shadow-md">
              <Mic className="mb-4 h-10 w-10 text-crimson-500" />
              <h3 className="mb-2 text-xl font-semibold text-navy-500">
                Author Meet & Greet
              </h3>
              <p className="text-slate-600">
                Connect with your favorite authors, get books signed, and
                participate in Q&A sessions.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <Award className="mb-4 h-10 w-10 text-crimson-500" />
              <h3 className="mb-2 text-xl font-semibold text-navy-500">
                Book Awards
              </h3>
              <p className="text-slate-600">
                Celebrate excellence in African literature with the prestigious
                NIBF Book Awards.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <BookMarked className="mb-4 h-10 w-10 text-crimson-500" />
              <h3 className="mb-2 text-xl font-semibold text-navy-500">
                Workshops
              </h3>
              <p className="text-slate-600">
                Enhance your skills with <br /> workshops on writing, publishing, and
                digital literacy.
              </p>
            </div>
          </AnimatedStagger>
          </div>
        </div>
      </AnimatedSection>

      {/* Past Highlights / Video Gallery */}
      <AnimatedSection
        className="relative px-4 py-20"
        animationType="slideUp"
      >
        <div className="absolute inset-0 z-0 bg-[url('/images/past-highlight/slide43.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-navy-600 to-navy-500/60" />
        <div className="container mx-auto max-w-6xl">
          <div className="relative z-10">
            <AnimatedHeading
              className="mb-12 text-center text-3xl font-bold text-white md:text-4xl"
              animationType="flip"
            >
              Past Highlights
            </AnimatedHeading>
            <AnimatedText
              className="mb-12 text-center text-lg text-slate-300"
              animationType="slideUp"
            >
              Relive the magic of previous Nigeria International Book Fair events through these highlights
            </AnimatedText>
            
            <div className="grid gap-8 md:grid-cols-2">
              <AnimatedElement animationType="zoom" delay={0.2}>
                <div className="overflow-hidden rounded-lg shadow-xl">
                  <div className="relative pb-[56.25%]">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/0vbvGyzNG7g?si=nmumzFZpFdSAGJJw" 
                      title="NIBF 2023 Highlights" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="bg-white p-4">
                    <h3 className="text-xl font-semibold text-navy-500">NIBF 2023 Highlights</h3>
                    <p className="mt-2 text-slate-600">Experience the vibrant atmosphere and key moments from our 2023 event</p>
                  </div>
                </div>
              </AnimatedElement>
              
              <AnimatedElement animationType="zoom" delay={0.4}>
                <div className="overflow-hidden rounded-lg shadow-xl">
                  <div className="relative pb-[56.25%]">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/i4NYooB0GUE?si=9yFF6XdCx5GgK410" 
                      title="NIBF 2022 Highlights" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="bg-white p-4">
                    <h3 className="text-xl font-semibold text-navy-500">NIBF 2022 Highlights</h3>
                    <p className="mt-2 text-slate-600">A look back at the successful 2022 edition of the Nigeria International Book Fair</p>
                  </div>
                </div>
              </AnimatedElement>
            </div>
            
            <AnimatedElement animationType="slideUp" delay={0.6} className="mt-12 text-center">
              <Link href="/gallery">
                <Button className="bg-crimson-500 text-white hover:bg-crimson-600">
                  View More Highlights
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="bg-white px-4 py-20" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          
          <Testimonials />
        </div>
      </AnimatedSection>

      {/* Partners */}
      <AnimatedSection
        className="bg-slate-50 px-4 py-20"
        animationType="slideUp"
      >
        <div className="container mx-auto max-w-6xl">
        
          <Partners />
        </div>
      </AnimatedSection>

      {/* Newsletter */}
      <AnimatedSection
        className="bg-navy-900 px-4 py-20 text-white"
        animationType="fade"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedHeading
              className="mb-4 text-3xl font-bold md:text-4xl"
              animationType="flip"
            >
              Stay Updated
            </AnimatedHeading>
            <AnimatedText
              className="mb-8 text-lg text-slate-300"
              animationType="slideUp"
            >
              Subscribe to our newsletter for the latest updates, exclusive
              content, and early bird registration offers.
            </AnimatedText>
            <AnimatedElement animationType="slideUp" delay={0.2}>
              <Newsletter />
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
