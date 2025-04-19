"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail("")

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 border-navy-400 bg-white/10 text-white placeholder:text-slate-300"
        />
        <Button type="submit" disabled={isSubmitting} className="h-12 bg-crimson-500 text-white hover:bg-crimson-600">
          {isSubmitting ? (
            "Subscribing..."
          ) : (
            <>
              Subscribe <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {isSuccess && (
        <p className="mt-4 text-slate-200">Thank you for subscribing! You will receive updates about NIBF 2025.</p>
      )}
    </div>
  )
}

