import { BookOpen, Users, Mic, Award, BookMarked, GraduationCap } from "lucide-react"

export function EventHighlights() {
  return (
    <section className="bg-slate-50 px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Event Highlights</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Discover what makes the Nigeria International Book Fair a must-attend event for everyone in the publishing
            industry
          </p>
          <div className="mx-auto mt-4 h-1 w-20 bg-emerald-600"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Exhibition */}
          <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
            <div className="mb-4 inline-flex rounded-full bg-emerald-100 p-3">
              <BookOpen className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-900">Exhibition</h3>
            <p className="text-slate-600">
              Explore hundreds of booths featuring the latest publications, educational materials, and publishing
              technologies from local and international exhibitors.
            </p>
          </div>

          {/* Conferences */}
          <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
            <div className="mb-4 inline-flex rounded-full bg-emerald-100 p-3">
              <Mic className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-900">Conferences</h3>
            <p className="text-slate-600">
              Attend insightful sessions led by industry experts discussing current trends, challenges, and innovations
              in the publishing world.
            </p>
          </div>

          {/* Networking */}
          <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
            <div className="mb-4 inline-flex rounded-full bg-emerald-100 p-3">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-900">Networking</h3>
            <p className="text-slate-600">
              Connect with publishers, authors, distributors, and other stakeholders to forge valuable partnerships and
              collaborations.
            </p>
          </div>

          {/* Book Launches */}
          <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
            <div className="mb-4 inline-flex rounded-full bg-emerald-100 p-3">
              <BookMarked className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-900">Book Launches</h3>
            <p className="text-slate-600">
              Witness the unveiling of new titles and meet renowned authors as they present their latest works to the
              public.
            </p>
          </div>

          {/* Awards */}
          <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
            <div className="mb-4 inline-flex rounded-full bg-emerald-100 p-3">
              <Award className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-900">Awards</h3>
            <p className="text-slate-600">
              Celebrate excellence in publishing with recognition of outstanding contributions to the industry and
              literary achievements.
            </p>
          </div>

          {/* Workshops */}
          <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
            <div className="mb-4 inline-flex rounded-full bg-emerald-100 p-3">
              <GraduationCap className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-900">Workshops</h3>
            <p className="text-slate-600">
              Participate in hands-on sessions designed to enhance skills in writing, publishing, marketing, and digital
              content creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

