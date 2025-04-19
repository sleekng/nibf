import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-navy-500 px-4 pt-16 text-slate-300">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-6">
              <Image
                src="/images/nibf-logo-white.png"
                alt="Nigeria International Book Fair"
                width={100}
                height={30}
                className="h-auto w-auto"
              />
            </div>
            <p className="mb-4">
              The Nigeria International Book Fair is Africa's premier book event, bringing together publishers, authors,
              booksellers, and book lovers from around the world.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-300 hover:text-crimson-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-crimson-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-crimson-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-crimson-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-crimson-400">
                  About NIBF
                </Link>
              </li>
              <li>
                <Link href="/exhibitors" className="hover:text-crimson-400">
                  For Exhibitors
                </Link>
              </li>
              <li>
                <Link href="/register-to-attend" className="hover:text-crimson-400">
                  Register to Attend
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-crimson-400">
                  Our Partners
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-crimson-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-crimson-400" />
                <span>Nigerian Book Fair Trust, 7 Dideolu Court, Ikoyi, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-crimson-400" />
                <span>+234 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-crimson-400" />
                <span>info@nibfng.org</span>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Subscribe</h3>
            <p className="mb-4">Subscribe to our newsletter to receive updates about the event</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="rounded-md border border-navy-400 bg-navy-600 px-4 py-2 text-white placeholder:text-slate-400 focus:border-crimson-400 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="rounded-md bg-crimson-500 px-4 py-2 font-medium text-white transition-colors hover:bg-crimson-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-400 py-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Nigeria International Book Fair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

