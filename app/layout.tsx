import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { AnimatePresenceWrapper } from "@/components/animate-presence-wrapper"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "NIBF",
  description: "National Islamic Banking Forum",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>NIBF 2026</title>
        <meta name="description" content="Nigeria International Book Fair 2026" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Navbar />
            <AnimatePresenceWrapper>
              <PageTransition>
                <main className="min-h-screen pt-20">{children}</main>
              </PageTransition>
            </AnimatePresenceWrapper>
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}

import './globals.css'