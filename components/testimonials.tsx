import Image from "next/image"
import { Quote } from "lucide-react"
import { AnimatedHeading } from "./animated-section"

export function Testimonials() {
  return (
    <section className=" px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
        <AnimatedHeading
            className=" text-center text-3xl font-bold text-navy-500 md:text-4xl"
            animationType="flip"
          >
            What People Say
          </AnimatedHeading>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Hear from past attendees and exhibitors about their experience at the Nigeria International Book Fair
          </p>
          <div className="elegant-divider mx-auto mt-4"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="rounded-lg bg-slate-50 p-6 shadow-sm">
            <Quote className="mb-4 h-8 w-8 text-crimson-500 opacity-50" />
            <p className="mb-6 text-slate-600">
              "The Nigeria International Book Fair provided an excellent platform for us to showcase our publications
              and connect with potential partners from across Africa and beyond."
            </p>
            <div className="flex items-center">
              <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-navy-100">
                <Image src="/images/testimonial-1.jpg" alt="Publisher" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-navy-500">Oluwaseun Adebayo</h4>
                <p className="text-sm text-slate-500">CEO, Sunshine Publishers</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="rounded-lg bg-slate-50 p-6 shadow-sm">
            <Quote className="mb-4 h-8 w-8 text-crimson-500 opacity-50" />
            <p className="mb-6 text-slate-600">
              "As an author, NIBF gave me the opportunity to meet my readers and engage with other writers. The
              workshops were particularly insightful for my creative process."
            </p>
            <div className="flex items-center">
              <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-navy-100">
                <Image src="/images/testimonial-2.jpg" alt="Author" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-navy-500">Chioma Nwosu</h4>
                <p className="text-sm text-slate-500">Bestselling Author</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="rounded-lg bg-slate-50 p-6 shadow-sm">
            <Quote className="mb-4 h-8 w-8 text-crimson-500 opacity-50" />
            <p className="mb-6 text-slate-600">
              "The fair was well-organized and provided valuable insights into the latest trends in educational
              publishing. We look forward to participating again next year."
            </p>
            <div className="flex items-center">
              <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-navy-100">
                <Image src="/images/testimonial-3.jpg" alt="Educator" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-navy-500">Dr. Emmanuel Okonkwo</h4>
                <p className="text-sm text-slate-500">Director, National Education Board</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

