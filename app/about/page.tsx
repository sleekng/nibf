"use client";

import Image from "next/image"
import { Users, BookOpen, Award, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection, AnimatedElement, AnimatedHeading, AnimatedText, AnimatedImage, AnimatedStagger } from "@/components/animated-section"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion";
import Link from "next/link";


export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<{src: string, title: string, description: string} | null>(null);
  const [displayedImages, setDisplayedImages] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const allGalleryImages = [
    { src: "/images/past-highlight/1.jpeg", title: "NIBF 2024", description: "Opening Ceremony" },
    { src: "/images/past-highlight/2.jpeg", title: "NIBF 2024", description: "Author Signing Session" },
    { src: "/images/past-highlight/3.jpeg", title: "NIBF 2024", description: "International Publishers" },
    { src: "/images/past-highlight/5.jpeg", title: "NIBF 2024", description: "Educational Workshop" },
    { src: "/images/past-highlight/GNDIRIUXgAAyz43.jpg", title: "NIBF 2023", description: "Award Ceremony" },
    { src: "/images/past-highlight/GNDIRX3X0AAmV4z.jpg", title: "NIBF 2023", description: "International Conference" },
    { src: "/images/past-highlight/slide43-1.jpg", title: "NIBF 2023", description: "Book Launch" },
    { src: "/images/past-highlight/slide43.jpg", title: "NIBF 2023", description: "International Conference" },
    { src: "/images/past-highlight/thumbnail-2-13.jpg", title: "NIBF 2023", description: "International Conference" },
    { src: "/images/past-highlight/710-Nigeria-International-Book-Fair-ftw-710x472.jpg", title: "NIBF 2023", description: "International Conference" },
    { src: "/images/past-highlight/NIBF-2021-pic.webp", title: "NIBF 2023", description: "International Conference" },
  ];

  const galleryImages = allGalleryImages.slice(0, displayedImages);

  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      if (displayedImages >= allGalleryImages.length) {
        toast.info("No more photos available", {
          description: "You've reached the end of our gallery",
          duration: 3000,
        });
      } else {
        setDisplayedImages(prev => Math.min(prev + 3, allGalleryImages.length));
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <AnimatedSection className="bg-navy-500 px-4 py-20 text-white" animationType="fade">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedHeading className="mb-6 text-4xl font-bold md:text-5xl" animationType="flip">
              About NIBF
            </AnimatedHeading>
            <AnimatedText className="text-lg text-slate-200" animationType="slideUp">
              The Nigeria International Book Fair (NIBF) is Africa's premier book event, bringing together publishers,
              authors, booksellers, and book lovers from around the world.
            </AnimatedText>
          </div>
        </div>
      </AnimatedSection>

      {/* History Section */}
      <AnimatedSection className="bg-white px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <AnimatedElement className="flex flex-col justify-center" animationType="slideRight">
              <AnimatedHeading className="mb-6 text-3xl font-bold text-navy-500" animationType="flip">
                Our History
              </AnimatedHeading>
              <div className="mb-6 h-1 w-20 bg-crimson-500"></div>
              <AnimatedText className="mb-4 text-slate-600" animationType="slideRight" delay={0.1}>
                The Nigeria International Book Fair was established in 1991 with the aim of promoting literacy,
                education, and the publishing industry in Nigeria and Africa at large.
              </AnimatedText>
              <AnimatedText className="mb-4 text-slate-600" animationType="slideRight" delay={0.2}>
                Over the years, NIBF has grown to become the largest book fair in Africa, attracting exhibitors and
                visitors from across the globe. The fair has played a significant role in the development of the book
                industry in Nigeria and has provided a platform for authors, publishers, and other stakeholders to
                showcase their works and exchange ideas.
              </AnimatedText>
              <AnimatedText className="text-slate-600" animationType="slideRight" delay={0.3}>
                Today, NIBF continues to be at the forefront of promoting literacy and education in Africa, with a focus
                on addressing the challenges facing the book industry and exploring opportunities for growth and
                development.
              </AnimatedText>
            </AnimatedElement>
            <AnimatedElement animationType="slideLeft">
              <div className="relative h-[400px] overflow-hidden rounded-lg border-8 border-white shadow-lg">
                <Image src="/images/pattern-bg.png" alt="NIBF History" fill className="object-cover" priority />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* Mission & Vision */}
      <AnimatedSection className="bg-slate-50 px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500" animationType="flip">
              Our Mission & Vision
            </AnimatedHeading>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <AnimatedStagger className="grid gap-8 md:grid-cols-2" animationType="zoom">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h3 className="mb-4 text-2xl font-bold text-navy-500">Mission</h3>
              <p className="text-slate-600">
                To promote literacy, education, and the publishing industry in Nigeria and Africa through the
                organization of a world-class book fair that brings together stakeholders from across the globe.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h3 className="mb-4 text-2xl font-bold text-navy-500">Vision</h3>
              <p className="text-slate-600">
                To be the leading book fair in Africa, providing a platform for the promotion of literacy, education,
                and the publishing industry, and contributing to the development of a reading culture in Nigeria and
                Africa.
              </p>
            </div>
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      {/* Key Statistics */}
      <AnimatedSection className="bg-white px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500" animationType="flip">
              NIBF in Numbers
            </AnimatedHeading>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <AnimatedStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" animationType="zoom">
            <div className="rounded-lg bg-slate-50 p-6 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-crimson-500" />
              <h3 className="mb-2 text-3xl font-bold text-navy-500">300+</h3>
              <p className="text-slate-600">Exhibitors</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-crimson-500" />
              <h3 className="mb-2 text-3xl font-bold text-navy-500">15,000+</h3>
              <p className="text-slate-600">Annual Visitors</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 text-center">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-crimson-500" />
              <h3 className="mb-2 text-3xl font-bold text-navy-500">30+</h3>
              <p className="text-slate-600">Years of Excellence</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 text-center">
              <Award className="mx-auto mb-4 h-12 w-12 text-crimson-500" />
              <h3 className="mb-2 text-3xl font-bold text-navy-500">50+</h3>
              <p className="text-slate-600">Countries Represented</p>
            </div>
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      {/* Organizing Committee */}
      <AnimatedSection className="bg-slate-50 px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500" animationType="flip">
            Fair Management and Award Committee
            </AnimatedHeading>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <AnimatedStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" animationType="zoom">
            {/* Committee Member 1 */}
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-navy-100">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Dr. Oluwaseun Adebayo"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold text-navy-500">Dr. Oluwaseun Adebayo</h3>
              <p className="mb-4 text-crimson-500">Chairperson</p>
              <p className="text-slate-600">
                Dr. Adebayo has over 20 years of experience in the publishing industry and has been instrumental in the
                growth and development of NIBF.
              </p>
            </div>

            {/* Committee Member 2 */}
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-navy-100">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Mrs. Chioma Nwosu"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold text-navy-500">Mrs. Chioma Nwosu</h3>
              <p className="mb-4 text-crimson-500">Executive Secretary</p>
              <p className="text-slate-600">
                Mrs. Nwosu is a seasoned administrator with extensive experience in event management and has been with
                NIBF for over 15 years.
              </p>
            </div>

            {/* Committee Member 3 */}
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-navy-100">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Mr. Emmanuel Okonkwo"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold text-navy-500">Mr. Emmanuel Okonkwo</h3>
              <p className="mb-4 text-crimson-500">Director of Operations</p>
              <p className="text-slate-600">
                Mr. Okonkwo brings his wealth of experience in logistics and operations management to ensure the smooth
                running of NIBF.
              </p>
            </div>
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      {/* Past Events Gallery */}
      <AnimatedSection className="bg-white px-4 py-16" animationType="slideUp">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <AnimatedHeading className="mb-4 text-3xl font-bold text-navy-500" animationType="flip">
              Past Events Gallery
            </AnimatedHeading>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <AnimatedStagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" animationType="zoom">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-md">
                <div className="relative h-64 w-full">
                  <Image
                    src={image.src}
                    alt={`${image.title} - ${image.description}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="text-lg font-bold">{image.title}</h3>
                    <p>{image.description}</p>
                  </div>
                </div>
                <button 
                  className="absolute inset-0 flex items-center justify-center bg-navy-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  onClick={() => setSelectedImage(image)}
                >
                  <span className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            ))}
          </AnimatedStagger>
          <div className="mt-8 text-center">
            <Button 
              className="bg-crimson-500 hover:bg-crimson-600"
              onClick={handleLoadMore}
              disabled={isLoading || displayedImages >= allGalleryImages.length}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : displayedImages >= allGalleryImages.length ? (
                "No More Photos"
              ) : (
                "View More Photos"
              )}
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg bg-navy-500"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30"
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative h-[80vh] w-[80vw]">
              <Image
                src={selectedImage.src}
                alt={`${selectedImage.title} - ${selectedImage.description}`}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              <p className="text-lg">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <AnimatedSection className="bg-navy-500 px-4 py-16 text-white" animationType="fade">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimatedHeading className="mb-6 text-3xl font-bold md:text-4xl" animationType="flip">
            Join Us at NIBF 2025
          </AnimatedHeading>
          <AnimatedText className="mb-8 text-lg text-slate-200" animationType="slideUp">
            Be a part of Africa's premier book event and connect with publishers, authors, and book lovers from around
            the world.
          </AnimatedText>
          <AnimatedElement animationType="slideUp" delay={0.2}>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                     <Link href="/register-to-attend">
                     
                        <Button size="lg" className="bg-navy-500 border-white border hover:bg-crimson-600">
                          Register to Attend
                        </Button>
                     </Link>
              </motion.div>
              <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                     <Link href="/exhibitors">
                     
                    <Button size="lg" variant="outline" className="border-crimson-500 border hover:border-crimson-500  text-navy-500 bg-white hover:bg-navy-400">
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
                        className="bg-crimson-500  hover:bg-crimson-600 text-white"
                      >
                        Become a Sponsor
                      </Button>
                    </Link>
                  </motion.div>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedSection>
    </div>
  )
}

