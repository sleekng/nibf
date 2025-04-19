import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function SpeakersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-navy-500 px-4 py-32 text-white">
        <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
        <div className="container relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">Distinguished Speakers</h1>
            <p className="text-xl text-slate-200">
              Meet the exceptional minds and voices at the Nigeria International Book Fair 2025
            </p>
          </div>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="bg-gradient-to-b from-slate-50 to-white px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-navy-500">Keynote Speakers</h2>
            <div className="mx-auto h-1 w-24 bg-crimson-500"></div>
          </div>
          <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-3">
            {/* Keynote Speaker 1 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="mb-8 flex justify-center">
                  <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-navy-100 shadow-lg">
                    <Image
                      src="/images/alisa-hester.jpg"
                      alt="Prof. Wole Soyinka"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-2 text-2xl font-bold text-navy-500">Prof. Wole Soyinka</h3>
                  <p className="mb-4 text-lg font-medium text-crimson-500">Nobel Laureate in Literature</p>
                  <p className="mb-6 text-slate-600">
                    Professor Wole Soyinka is a Nigerian playwright, novelist, poet, and essayist. He was awarded the
                    Nobel Prize in Literature in 1986, becoming the first African to receive the award.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-navy-500 px-4 py-1 text-base">Keynote Address</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Keynote Speaker 2 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="mb-8 flex justify-center">
                  <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-navy-100 shadow-lg">
                    <Image
                      src="/images/alisa-hester.jpg"
                      alt="Chimamanda Ngozi Adichie"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-2 text-2xl font-bold text-navy-500">Chimamanda Ngozi Adichie</h3>
                  <p className="mb-4 text-lg font-medium text-crimson-500">Award-Winning Author</p>
                  <p className="mb-6 text-slate-600">
                    Chimamanda Ngozi Adichie is a Nigerian writer whose works include novels, short stories, and
                    nonfiction. She has received numerous awards and recognitions for her work.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-navy-500 px-4 py-1 text-base">Special Address</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Keynote Speaker 3 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="mb-8 flex justify-center">
                  <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-navy-100 shadow-lg">
                    <Image 
                      src="/images/alisa-hester.jpg" 
                      alt="Ben Okri" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-2 text-2xl font-bold text-navy-500">Ben Okri</h3>
                  <p className="mb-4 text-lg font-medium text-crimson-500">Booker Prize-Winning Novelist</p>
                  <p className="mb-6 text-slate-600">
                    Ben Okri is a Nigerian poet and novelist who won the Booker Prize for Fiction for his novel "The
                    Famished Road." His work has been translated into many languages.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-navy-500 px-4 py-1 text-base">Closing Address</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="bg-white px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-navy-500">Featured Speakers</h2>
            <div className="mx-auto h-1 w-24 bg-crimson-500"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Featured Speaker 1 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="mb-6 flex justify-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image
                      src="/images/alisa-hester.jpg"
                      alt="Dr. Oluwaseun Adebayo"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold text-navy-500">Dr. Oluwaseun Adebayo</h3>
                  <p className="mb-3 text-crimson-500">NIBF Chairperson</p>
                  <p className="mb-4 text-sm text-slate-600">
                    Dr. Adebayo has over 20 years of experience in the publishing industry and has been instrumental in
                    the growth and development of NIBF.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-blue-500 px-3 py-1">Panel Moderator</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Speaker 2 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="mb-6 flex justify-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image
                      src="/images/alisa-hester.jpg"
                      alt="Mrs. Chioma Nwosu"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold text-navy-500">Mrs. Chioma Nwosu</h3>
                  <p className="mb-3 text-crimson-500">Executive Secretary, NIBF</p>
                  <p className="mb-4 text-sm text-slate-600">
                    Mrs. Nwosu is a seasoned administrator with extensive experience in event management and has been with
                    NIBF for over 15 years.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-purple-500 px-3 py-1">Workshop Facilitator</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Speaker 3 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="mb-6 flex justify-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image
                      src="/images/alisa-hester.jpg"
                      alt="Dr. Emmanuel Okonkwo"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold text-navy-500">Dr. Emmanuel Okonkwo</h3>
                  <p className="mb-3 text-crimson-500">Director, National Education Board</p>
                  <p className="mb-4 text-sm text-slate-600">
                    Dr. Okonkwo brings his wealth of experience in education policy and administration to discussions on
                    the role of books in education.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-blue-500 px-3 py-1">Panel Speaker</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Speaker 4 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="mb-6 flex justify-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image 
                      src="/images/alisa-hester.jpg" 
                      alt="Helon Habila" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold text-navy-500">Helon Habila</h3>
                  <p className="mb-3 text-crimson-500">Award-Winning Author</p>
                  <p className="mb-4 text-sm text-slate-600">
                    Helon Habila is a Nigerian novelist and poet whose work has received international acclaim and
                    multiple awards.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-purple-500 px-3 py-1">Workshop Facilitator</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Speakers */}
      <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-navy-500">International Speakers</h2>
            <div className="mx-auto h-1 w-24 bg-crimson-500"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* International Speaker 1 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="mb-6 flex justify-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image 
                      src="/images/alisa-hester.jpg" 
                      alt="John Smith" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold text-navy-500">John Smith</h3>
                  <p className="mb-3 text-crimson-500">CEO, Global Publishing House</p>
                  <p className="mb-4 text-sm text-slate-600">
                    John Smith brings over 25 years of experience in international publishing and will share insights on
                    global publishing trends.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-blue-500 px-3 py-1">Panel Speaker</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* International Speaker 2 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="mb-6 flex justify-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image
                      src="/images/alisa-hester.jpg"
                      alt="Maria Rodriguez"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold text-navy-500">Maria Rodriguez</h3>
                  <p className="mb-3 text-crimson-500">Digital Publishing Expert</p>
                  <p className="mb-4 text-sm text-slate-600">
                    Maria Rodriguez is a leading expert in digital publishing and e-book technologies from Spain,
                    specializing in digital transformation.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-purple-500 px-3 py-1">Workshop Facilitator</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* International Speaker 3 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="mb-6 flex justify-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image
                      src="/images/alisa-hester.jpg"
                      alt="Dr. James Wong"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold text-navy-500">Dr. James Wong</h3>
                  <p className="mb-3 text-crimson-500">International Publishers Association</p>
                  <p className="mb-4 text-sm text-slate-600">
                    Dr. Wong represents the International Publishers Association and will discuss global publishing
                    standards and practices.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-blue-500 px-3 py-1">Panel Speaker</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* International Speaker 4 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="mb-6 flex justify-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image
                      src="/images/alisa-hester.jpg"
                      alt="Sarah Johnson"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold text-navy-500">Sarah Johnson</h3>
                  <p className="mb-3 text-crimson-500">Literary Agent</p>
                  <p className="mb-4 text-sm text-slate-600">
                    Sarah Johnson is a renowned literary agent who has represented bestselling authors from around the
                    world.
                  </p>
                  <div className="flex justify-center">
                    <Badge className="bg-purple-500 px-3 py-1">Workshop Facilitator</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Facilitators */}
      <section className="bg-white px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-navy-500">Workshop Facilitators</h2>
            <div className="mx-auto h-1 w-24 bg-crimson-500"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Workshop Facilitator 1 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image 
                      src="/images/alisa-hester.jpg" 
                      alt="Jane Smith" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-navy-500">Jane Smith</h3>
                    <p className="mb-2 text-crimson-500">Digital Publishing Expert</p>
                    <p className="text-sm text-slate-600">
                      Leading expert in digital transformation and e-publishing technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workshop Facilitator 2 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image 
                      src="/images/alisa-hester.jpg" 
                      alt="David Johnson" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-navy-500">David Johnson</h3>
                    <p className="mb-2 text-crimson-500">Marketing Specialist</p>
                    <p className="text-sm text-slate-600">
                      Expert in book marketing strategies and audience engagement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workshop Facilitator 3 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image
                      src="/images/alisa-hester.jpg"
                      alt="Chimamanda Ngozi Adichie"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-navy-500">Chimamanda Ngozi Adichie</h3>
                    <p className="mb-2 text-crimson-500">Award-Winning Author</p>
                    <p className="text-sm text-slate-600">
                      International bestselling author and literary icon.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workshop Facilitator 4 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image 
                      src="/images/alisa-hester.jpg" 
                      alt="Michael Brown" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-navy-500">Michael Brown</h3>
                    <p className="mb-2 text-crimson-500">Publishing Consultant</p>
                    <p className="text-sm text-slate-600">
                      Strategic advisor for publishing houses and independent authors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workshop Facilitator 5 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image 
                      src="/images/alisa-hester.jpg" 
                      alt="Sarah Johnson" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-navy-500">Sarah Johnson</h3>
                    <p className="mb-2 text-crimson-500">Literary Agent</p>
                    <p className="text-sm text-slate-600">
                      Represents bestselling authors and emerging literary talent.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workshop Facilitator 6 */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-100 opacity-20 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-4 border-navy-100 shadow-md">
                    <Image
                      src="/images/alisa-hester.jpg"
                      alt="Dr. Emmanuel Okonkwo"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-navy-500">Dr. Emmanuel Okonkwo</h3>
                    <p className="mb-2 text-crimson-500">Director, National Education Board</p>
                    <p className="text-sm text-slate-600">
                      Expert in educational policy and curriculum development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-navy-500 px-4 py-24 text-white">
        <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
        <div className="container relative mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Join Us at NIBF 2025</h2>
          <p className="mb-10 text-xl text-slate-200">
            Don't miss the opportunity to learn from and interact with these distinguished speakers and presenters.
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link href="/register-to-attend">
              <Button size="lg" className="bg-crimson-500 px-8 py-6 text-lg hover:bg-crimson-600">
                Register to Attend
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white px-8 py-6 text-lg text-white hover:bg-navy-400">
              View Full Program
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

