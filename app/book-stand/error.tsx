"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Book Stand page error:", error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
        <AlertCircle className="h-10 w-10 text-red-600" />
      </div>
      <h2 className="mb-4 text-2xl font-bold text-navy-500">Something went wrong!</h2>
      <p className="mb-6 max-w-md text-slate-600">
        We encountered an error while loading the Book Stand page. Please try again or contact support if the problem persists.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={reset} className="bg-crimson-500 hover:bg-crimson-600">
          Try again
        </Button>
        <Button
          variant="outline"
          className="border-navy-500 bg-white text-navy-500 hover:bg-navy-50 hover:text-navy-500"
          onClick={() => window.location.href = "/"}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  )
} 