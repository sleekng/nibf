import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <Loader2 className="h-10 w-10 animate-spin text-crimson-500" />
      </div>
      <h2 className="mb-4 text-2xl font-bold text-navy-500">Loading Book Stand Page</h2>
      <p className="max-w-md text-slate-600">
        Please wait while we load the Book Stand application form...
      </p>
    </div>
  )
} 