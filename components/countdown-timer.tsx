"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center justify-center gap-3 text-center">
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-crimson-500">{timeLeft.days}</span>
        <span className="text-xs text-slate-500">Days</span>
      </div>
      <span className="text-xl font-bold text-slate-400">:</span>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-crimson-500">{timeLeft.hours}</span>
        <span className="text-xs text-slate-500">Hours</span>
      </div>
      <span className="text-xl font-bold text-slate-400">:</span>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-crimson-500">{timeLeft.minutes}</span>
        <span className="text-xs text-slate-500">Minutes</span>
      </div>
      <span className="text-xl font-bold text-slate-400">:</span>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-crimson-500">{timeLeft.seconds}</span>
        <span className="text-xs text-slate-500">Seconds</span>
      </div>
    </div>
  )
}

