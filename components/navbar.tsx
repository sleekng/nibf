"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Add the event listener
    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 border-b border-crimson-500 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "  bg-navy-500"
      }`}
    >
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/nibf-logo.png"
            alt="NIBF Logo"
            width={120}
            height={40}
            priority
            className={`h-auto w-40 ${
              isScrolled ? "hidden" : "block"
            }`}
          />
          <Image
            src="/images/nibf-logo-color.png"
            alt="Nigeria International Book Fair"
            width={100}
            height={100}
           

            className={`h-auto w-40 ${
              isScrolled ? "block" : "hidden"
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            className={`text-sm font-medium  transition-colors hover:text-crimson-500 ${
              isScrolled ? " text-navy-500" : "  text-white "
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`text-sm font-medium  transition-colors hover:text-crimson-500 ${
              isScrolled ? " text-navy-500" : "  text-white "
            }`}
            href="/about"
          >
            About
          </Link>
          <Link
            href="/exhibitors"
            className={`text-sm font-medium  transition-colors hover:text-crimson-500 ${
              isScrolled ? " text-navy-500" : "  text-white "
            }`}
          >
            For Exhibitors
          </Link>
          <Link 
            href="/register-to-attend"           
            className={`text-sm font-medium  transition-colors hover:text-crimson-500 ${
              isScrolled ? " text-navy-500" : "  text-white "
            }`}
          >
            Register to Attend
          </Link>
          <Link 
            href="/partners"           
            className={`text-sm font-medium  transition-colors hover:text-crimson-500 ${
              isScrolled ? " text-navy-500" : "  text-white "
            }`}
          >
            Our Partners
          </Link>
          <Link 
            href="/blog"           
            className={`text-sm font-medium  transition-colors hover:text-crimson-500 ${
              isScrolled ? " text-navy-500" : "  text-white "
            }`}
          >
            Blog
          </Link>
          <Link 
            href="/contact"           
            className={`text-sm font-medium  transition-colors hover:text-crimson-500 ${
              isScrolled ? " text-navy-500" : "  text-white "
            }`}
          >
            Contact
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-crimson-500 ${
              isScrolled ? " text-navy-500" : "  text-white "
            }`}>
              Event
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/speakers">Speakers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/schedule">Event Schedule</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/exhibitors">
            <Button className="ml-4 bg-crimson-500 hover:bg-crimson-600">Book a Stand</Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`lg:hidden ${
                isScrolled ? "text-navy-500" : "text-white"
              }`}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/nibf-logo.png"
                    alt="Nigeria International Book Fair"
                    width={10}
                    height={10}
                    className="h-auto w-auto"
                  />
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="mt-8 flex flex-col gap-6">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="text-lg font-medium text-navy-500 transition-colors hover:text-crimson-500"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="text-lg font-medium text-navy-500 transition-colors hover:text-crimson-500"
                  >
                    About
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/exhibitors"
                    className="text-lg font-medium text-navy-500 transition-colors hover:text-crimson-500"
                  >
                    For Exhibitors
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/register-to-attend"
                    className="text-lg font-medium text-navy-500 transition-colors hover:text-crimson-500"
                  >
                    Register to Attend
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/partners"
                    className="text-lg font-medium text-navy-500 transition-colors hover:text-crimson-500"
                  >
                    Our Partners
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/blog"
                    className="text-lg font-medium text-navy-500 transition-colors hover:text-crimson-500"
                  >
                    Blog
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-navy-500 transition-colors hover:text-crimson-500"
                  >
                    Contact
                  </Link>
                </SheetClose>
                <div className="space-y-2">
                  <div className="text-lg font-medium text-navy-500">Event</div>
                  <div className="ml-4 space-y-2">
                    <SheetClose asChild>
                      <Link
                        href="/speakers"
                        className="text-lg font-medium text-navy-500 transition-colors hover:text-crimson-500"
                      >
                        Speakers
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/schedule"
                        className="text-lg font-medium text-navy-500 transition-colors hover:text-crimson-500"
                      >
                        Event Schedule
                      </Link>
                    </SheetClose>
                  </div>
                </div>
                <SheetClose asChild>
                  <Link href="/exhibitors">
                    <Button className="mt-4 w-full bg-crimson-500 hover:bg-crimson-600">Book a Stand</Button>
                  </Link>
                </SheetClose>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

