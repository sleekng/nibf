import { Calendar, Clock, MapPin, User, Filter, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function SchedulePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-navy-500 px-4 py-20 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Event Schedule</h1>
            <p className="text-lg text-slate-200">
              Explore the full program of the Nigeria International Book Fair 2026
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Overview */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">Schedule Overview</h2>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Day 1 */}
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <Calendar className="mr-2 h-6 w-6 text-crimson-500" />
                <h3 className="text-xl font-bold text-navy-500">Day 1: May 7, 2026</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li>9:00 AM - Opening Ceremony</li>
                <li>10:30 AM - Keynote Address</li>
                <li>12:00 PM - Exhibition Opens</li>
                <li>2:00 PM - Panel Discussions</li>
                <li>4:00 PM - Workshops</li>
                <li>6:00 PM - Networking Reception</li>
              </ul>
            </div>

            {/* Day 2 */}
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <Calendar className="mr-2 h-6 w-6 text-crimson-500" />
                <h3 className="text-xl font-bold text-navy-500">Day 2: May 8, 2026</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li>9:00 AM - Exhibition Opens</li>
                <li>10:00 AM - Industry Forum</li>
                <li>12:30 PM - Book Launches</li>
                <li>2:00 PM - Author Signings</li>
                <li>4:00 PM - Workshops</li>
                <li>6:00 PM - Cultural Evening</li>
              </ul>
            </div>

            {/* Day 3 */}
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <Calendar className="mr-2 h-6 w-6 text-crimson-500" />
                <h3 className="text-xl font-bold text-navy-500">Day 3: May 9, 2026</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li>9:00 AM - Exhibition Opens</li>
                <li>10:00 AM - Educational Programs</li>
                <li>12:00 PM - Awards Ceremony</li>
                <li>2:00 PM - Panel Discussions</li>
                <li>4:00 PM - Closing Ceremony</li>
                <li>5:30 PM - Farewell Reception</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Schedule */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">Detailed Schedule</h2>
            <div className="elegant-divider mx-auto"></div>
          </div>

          {/* Schedule Tabs */}
          <Tabs defaultValue="day1" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3">
              <TabsTrigger value="day1">Day 1 (May 7)</TabsTrigger>
              <TabsTrigger value="day2">Day 2 (May 8)</TabsTrigger>
              <TabsTrigger value="day3">Day 3 (May 9)</TabsTrigger>
            </TabsList>

            {/* Day 1 Schedule */}
            <TabsContent value="day1">
              <div className="space-y-6">
                {/* Opening Ceremony */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-navy-500">Opening Ceremony</Badge>
                      <h3 className="text-xl font-bold text-navy-500">Official Opening of NIBF 2026</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>9:00 AM - 10:30 AM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Main Hall</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    The official opening ceremony of the Nigeria International Book Fair 2026, featuring welcome
                    addresses from the organizers and special guests.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Speakers:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Dr. Oluwaseun Adebayo, NIBF Chairperson
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Hon. Minister of Education
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Lagos State Governor
                    </Badge>
                  </div>
                </div>

                {/* Keynote Address */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-crimson-500">Keynote</Badge>
                      <h3 className="text-xl font-bold text-navy-500">
                        Local Paper Production: Panacea to Affordable Book Production
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>10:30 AM - 12:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Main Hall</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    A keynote address on the importance of local paper production in making books more affordable and
                    accessible, thereby contributing to quality education.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Speaker:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Prof. Wole Soyinka, Nobel Laureate
                    </Badge>
                  </div>
                </div>

                {/* Exhibition Opens */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-green-500">Exhibition</Badge>
                      <h3 className="text-xl font-bold text-navy-500">Exhibition Area Opens</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>12:00 PM - 6:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Exhibition Halls A, B, C</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    The exhibition area opens to visitors, featuring over 300 exhibitors showcasing the latest
                    publications, educational materials, and publishing technologies.
                  </p>
                </div>

                {/* Panel Discussion */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-blue-500">Panel Discussion</Badge>
                      <h3 className="text-xl font-bold text-navy-500">The Future of Publishing in Africa</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>2:00 PM - 3:30 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Conference Room 1</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    A panel discussion on the future of publishing in Africa, exploring trends, challenges, and
                    opportunities in the industry.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Panelists:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Chioma Nwosu, CEO, Sunshine Publishers
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Dr. Emmanuel Okonkwo, National Education Board
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      John Doe, International Publishers Association
                    </Badge>
                  </div>
                </div>

                {/* Workshop */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-purple-500">Workshop</Badge>
                      <h3 className="text-xl font-bold text-navy-500">Digital Publishing: Tools and Techniques</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>4:00 PM - 5:30 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Workshop Room A</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    A hands-on workshop on digital publishing tools and techniques, covering e-books, digital
                    distribution, and online marketing.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Facilitator:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Jane Smith, Digital Publishing Expert
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <Badge variant="outline" className="border-red-300 text-red-500">
                      Limited Capacity - Registration Required
                    </Badge>
                  </div>
                </div>

                {/* Networking Reception */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-amber-500">Networking</Badge>
                      <h3 className="text-xl font-bold text-navy-500">Welcome Reception</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>6:00 PM - 8:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Sheraton Hotel Ballroom</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    A welcome reception for all attendees, providing an opportunity to network with industry
                    professionals in a relaxed setting.
                  </p>
                  <div className="mt-4">
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      By Invitation Only - Premium Ticket Holders
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Day 2 Schedule */}
            <TabsContent value="day2">
              <div className="space-y-6">
                {/* Exhibition Opens */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-green-500">Exhibition</Badge>
                      <h3 className="text-xl font-bold text-navy-500">Exhibition Area Opens</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Exhibition Halls A, B, C</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    The exhibition area is open to visitors, featuring over 300 exhibitors showcasing the latest
                    publications, educational materials, and publishing technologies.
                  </p>
                </div>

                {/* Industry Forum */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-blue-500">Forum</Badge>
                      <h3 className="text-xl font-bold text-navy-500">
                        Industry Forum: Challenges and Opportunities in African Publishing
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>10:00 AM - 12:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Conference Room 1</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    A forum discussing the challenges and opportunities in the African publishing industry, with a focus
                    on strategies for growth and development.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Speakers:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Representatives from major publishing houses
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Industry experts
                    </Badge>
                  </div>
                </div>

                {/* Book Launches */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-crimson-500">Book Launch</Badge>
                      <h3 className="text-xl font-bold text-navy-500">New Title Launches</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>12:30 PM - 2:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Author's Corner</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    Launch of new titles by renowned authors, featuring readings, discussions, and book signings.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Featured Authors:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Chimamanda Ngozi Adichie
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Ben Okri
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Helon Habila
                    </Badge>
                  </div>
                </div>

                {/* Author Signings */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-amber-500">Author Signing</Badge>
                      <h3 className="text-xl font-bold text-navy-500">Meet the Authors</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>2:00 PM - 4:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Exhibition Hall B</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    Meet your favorite authors and get your books signed. Various authors will be available at different
                    times throughout the session.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Participating Authors:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Multiple authors
                    </Badge>
                  </div>
                </div>

                {/* Workshops */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-purple-500">Workshop</Badge>
                      <h3 className="text-xl font-bold text-navy-500">Creative Writing Workshop</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>4:00 PM - 5:30 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Workshop Room A</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    A workshop on creative writing techniques, led by experienced authors and writing coaches.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Facilitators:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Chimamanda Ngozi Adichie
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Helon Habila
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <Badge variant="outline" className="border-red-300 text-red-500">
                      Limited Capacity - Registration Required
                    </Badge>
                  </div>
                </div>

                {/* Cultural Evening */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-green-500">Cultural Event</Badge>
                      <h3 className="text-xl font-bold text-navy-500">
                        Cultural Evening: Celebrating African Literature
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>6:00 PM - 8:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Sheraton Hotel Ballroom</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    An evening of cultural performances, readings, and celebrations of African literature and
                    storytelling traditions.
                  </p>
                  <div className="mt-4">
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Open to All Attendees
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Day 3 Schedule */}
            <TabsContent value="day3">
              <div className="space-y-6">
                {/* Exhibition Opens */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-green-500">Exhibition</Badge>
                      <h3 className="text-xl font-bold text-navy-500">Exhibition Area Opens</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Exhibition Halls A, B, C</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    The final day of the exhibition, featuring over 300 exhibitors showcasing the latest publications,
                    educational materials, and publishing technologies.
                  </p>
                </div>

                {/* Educational Programs */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-blue-500">Educational</Badge>
                      <h3 className="text-xl font-bold text-navy-500">School Programs: Promoting Reading Culture</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>10:00 AM - 12:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Conference Room 2</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    Special programs for schools and educators, focusing on strategies for promoting reading culture
                    among young people.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Facilitators:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Education specialists
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Children's book authors
                    </Badge>
                  </div>
                </div>

                {/* Awards Ceremony */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-crimson-500">Awards</Badge>
                      <h3 className="text-xl font-bold text-navy-500">NIBF Awards Ceremony</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>12:00 PM - 2:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Main Hall</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    The NIBF Awards Ceremony, recognizing excellence in publishing, writing, and contributions to
                    literacy and education.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Host:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Dr. Oluwaseun Adebayo, NIBF Chairperson
                    </Badge>
                  </div>
                </div>

                {/* Panel Discussion */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-blue-500">Panel Discussion</Badge>
                      <h3 className="text-xl font-bold text-navy-500">The Role of Technology in Publishing</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>2:00 PM - 3:30 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Conference Room 1</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    A panel discussion on the role of technology in publishing, exploring digital publishing, e-books,
                    audiobooks, and other technological innovations.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Panelists:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Technology experts
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Digital publishers
                    </Badge>
                  </div>
                </div>

                {/* Closing Ceremony */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-navy-500">Closing Ceremony</Badge>
                      <h3 className="text-xl font-bold text-navy-500">Official Closing of NIBF 2026</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>4:00 PM - 5:30 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Main Hall</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    The official closing ceremony of NIBF 2026, featuring closing remarks, summary of the fair, and
                    announcement of NIBF 2027.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-slate-500">
                      <User className="mr-1 h-4 w-4" />
                      <span>Speakers:</span>
                    </div>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Dr. Oluwaseun Adebayo, NIBF Chairperson
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Mrs. Chioma Nwosu, Executive Secretary
                    </Badge>
                  </div>
                </div>

                {/* Farewell Reception */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-amber-500">Networking</Badge>
                      <h3 className="text-xl font-bold text-navy-500">Farewell Reception</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>5:30 PM - 7:00 PM</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>Sheraton Hotel Terrace</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600">
                    A farewell reception for all attendees, providing a final opportunity to network and say goodbye.
                  </p>
                  <div className="mt-4">
                    <Badge variant="outline" className="border-navy-300 text-navy-500">
                      Open to All Attendees
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-500 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Join Us at NIBF 2026</h2>
          <p className="mb-8 text-lg text-slate-200">
            Don't miss out on Africa's premier book event. Register now to secure your spot!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
           <Link href="/register-to-attend">
           <Button size="lg" className="bg-crimson-500 hover:bg-crimson-600">
              Register to Attend
            </Button>
           </Link>
            <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-navy-400">
              Download Full Program
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

