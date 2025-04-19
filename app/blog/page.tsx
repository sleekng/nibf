"use client"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedSection, AnimatedElement, AnimatedHeading, AnimatedText, AnimatedStagger } from "@/components/animated-section"

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <AnimatedSection className="bg-navy-500 px-4 py-20 text-white" animationType="fade">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedHeading className="mb-6 text-4xl font-bold md:text-5xl" animationType="flip">
              NIBF Blog
            </AnimatedHeading>
            <AnimatedText className="text-lg text-slate-200" animationType="slideUp">
              Insights, updates, and stories from the Nigeria International Book Fair
            </AnimatedText>
          </div>
        </div>
      </AnimatedSection>

      {/* Blog Content */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Post */}
              <AnimatedSection className="mb-12 overflow-hidden rounded-lg bg-white shadow-md" animationType="slideUp">
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="Featured Post"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500">
                      Featured
                    </span>
                    <span className="rounded-full bg-crimson-100 px-3 py-1 text-xs font-medium text-crimson-500">
                      Publishing
                    </span>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-navy-500">
                    The Future of Publishing in Africa: Trends and Opportunities
                  </h2>
                  <p className="mb-4 text-slate-600">
                    Explore the evolving landscape of publishing in Africa, the challenges faced by publishers, and the
                    opportunities for growth and innovation in the industry.
                  </p>
                  <div className="mb-6 flex items-center text-sm text-slate-500">
                    <div className="mr-4 flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>April 15, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      <span>Dr. Oluwaseun Adebayo</span>
                    </div>
                  </div>
                  <Button className="bg-crimson-500 hover:bg-crimson-600">Read More</Button>
                </div>
              </AnimatedSection>

              {/* Recent Posts */}
              <AnimatedSection className="mb-12" animationType="slideUp">
                <h2 className="mb-6 text-2xl font-bold text-navy-500">Recent Posts</h2>
                <AnimatedStagger className="grid gap-8 md:grid-cols-2" animationType="zoom">
                  {[1, 2, 3, 4].map((index) => (
                    <AnimatedElement animationType="zoom" key={index}>
                      <div
                        className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-1"
                      >
                        <div className="relative h-[200px] w-full">
                          <Image
                            src={`/placeholder.svg?height=200&width=400`}
                            alt={`Blog Post ${index}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500">
                              {index % 2 === 0 ? "Education" : "Literature"}
                            </span>
                          </div>
                          <h3 className="mb-3 text-xl font-bold text-navy-500">
                            {index % 2 === 0
                              ? "Promoting Reading Culture Among Nigerian Youth"
                              : "Celebrating African Literature: A Look at Recent Award-Winning Books"}
                          </h3>
                          <p className="mb-4 text-sm text-slate-600">
                            {index % 2 === 0
                              ? "Strategies for encouraging reading habits among young people in Nigeria and the role of schools, parents, and publishers."
                              : "A review of recent award-winning books by African authors and their contribution to the global literary landscape."}
                          </p>
                          <div className="mb-4 flex items-center text-xs text-slate-500">
                            <div className="mr-4 flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>April {10 - index}, 2025</span>
                            </div>
                            <div className="flex items-center">
                              <User className="mr-1 h-3 w-3" />
                              <span>{index % 2 === 0 ? "Chioma Nwosu" : "Emmanuel Okonkwo"}</span>
                            </div>
                          </div>
                          <Link
                            href="#"
                            className="inline-flex items-center text-sm font-medium text-crimson-500 hover:text-crimson-600"
                          >
                            Read More
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </AnimatedElement>
                  ))}
                </AnimatedStagger>
              </AnimatedSection>

              {/* Older Posts */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-navy-500">Older Posts</h2>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div
                      key={index}
                      className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg sm:flex-row"
                    >
                      <div className="relative h-[200px] w-full sm:h-auto sm:w-1/3">
                        <Image
                          src={`/placeholder.svg?height=200&width=300`}
                          alt={`Blog Post ${index}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <div className="mb-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500">
                              {index % 3 === 0 ? "Publishing" : index % 3 === 1 ? "Digital" : "Events"}
                            </span>
                          </div>
                          <h3 className="mb-3 text-xl font-bold text-navy-500">
                            {index % 3 === 0
                              ? "The Impact of Digital Publishing on Traditional Book Markets"
                              : index % 3 === 1
                                ? "Highlights from NIBF 2024: A Recap of Africa's Premier Book Event"
                                : "The Role of Book Fairs in Promoting Cultural Exchange"}
                          </h3>
                          <p className="mb-4 text-slate-600">
                            {index % 3 === 0
                              ? "An analysis of how digital publishing is transforming the book industry in Africa and its implications for traditional publishers."
                              : index % 3 === 1
                                ? "A look back at the highlights, key discussions, and memorable moments from the Nigeria International Book Fair 2024."
                                : "Exploring how book fairs facilitate cultural exchange and promote understanding between different regions and countries."}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-slate-500">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>March {20 - index}, 2025</span>
                          </div>
                          <Link
                            href="#"
                            className="inline-flex items-center text-sm font-medium text-crimson-500 hover:text-crimson-600"
                          >
                            Read More
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="border-crimson-500 text-crimson-500 hover:bg-crimson-50">
                    Load More Posts
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search */}
              <AnimatedSection className="rounded-lg bg-white p-6 shadow-md" animationType="slideUp">
                <h3 className="mb-4 text-xl font-bold text-navy-500">Search</h3>
                <div className="flex">
                  <Input placeholder="Search blog posts..." className="rounded-r-none" />
                  <Button className="rounded-l-none bg-crimson-500 hover:bg-crimson-600">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </AnimatedSection>

              {/* Categories */}
              <AnimatedSection className="rounded-lg bg-white p-6 shadow-md" animationType="slideUp">
                <h3 className="mb-4 text-xl font-bold text-navy-500">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="flex items-center justify-between text-slate-600 hover:text-crimson-500">
                      <span>Publishing</span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">12</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center justify-between text-slate-600 hover:text-crimson-500">
                      <span>Education</span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">8</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center justify-between text-slate-600 hover:text-crimson-500">
                      <span>Literature</span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">15</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center justify-between text-slate-600 hover:text-crimson-500">
                      <span>Digital</span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">6</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center justify-between text-slate-600 hover:text-crimson-500">
                      <span>Events</span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">9</span>
                    </Link>
                  </li>
                </ul>
              </AnimatedSection>

              {/* Popular Posts */}
              <AnimatedSection className="rounded-lg bg-white p-6 shadow-md" animationType="slideUp">
                <h3 className="mb-4 text-xl font-bold text-navy-500">Popular Posts</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="flex items-start">
                      <div className="relative mr-3 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={`/placeholder.svg?height=64&width=64`}
                          alt={`Popular Post ${index}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-navy-500 hover:text-crimson-500">
                          <Link href="#">
                            {index % 2 === 0
                              ? "The Growing Market for Children's Books in Africa"
                              : "How Technology is Transforming the Publishing Industry"}
                          </Link>
                        </h4>
                        <p className="text-xs text-slate-500">March {15 - index}, 2025</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Tags */}
              <AnimatedSection className="rounded-lg bg-white p-6 shadow-md" animationType="slideUp">
                <h3 className="mb-4 text-xl font-bold text-navy-500">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="#"
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-crimson-100 hover:text-crimson-500"
                  >
                    Books
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-crimson-100 hover:text-crimson-500"
                  >
                    Publishing
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-crimson-100 hover:text-crimson-500"
                  >
                    Education
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-crimson-100 hover:text-crimson-500"
                  >
                    Literature
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-crimson-100 hover:text-crimson-500"
                  >
                    Africa
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-crimson-100 hover:text-crimson-500"
                  >
                    Digital
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-crimson-100 hover:text-crimson-500"
                  >
                    Authors
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-crimson-100 hover:text-crimson-500"
                  >
                    Events
                  </Link>
                </div>
              </AnimatedSection>

              {/* Newsletter */}
              <AnimatedSection className="rounded-lg bg-navy-500 p-6 text-white shadow-md" animationType="fade">
                <h3 className="mb-4 text-xl font-bold">Subscribe to Newsletter</h3>
                <p className="mb-4 text-slate-200">
                  Stay updated with the latest news, insights, and stories from NIBF.
                </p>
                <div className="space-y-3">
                  <Input
                    placeholder="Your email address"
                    className="bg-navy-600 text-white placeholder:text-slate-300"
                  />
                  <Button className="w-full bg-crimson-500 hover:bg-crimson-600">Subscribe</Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

