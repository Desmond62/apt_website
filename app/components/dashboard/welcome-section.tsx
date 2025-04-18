"use client"

import { CalendarIcon } from "lucide-react"
import { Button } from "../ui/button"

export default function WelcomeSection() {
  const today = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(today)

  const lastLogin = "26/1/2024 14:39:58"

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 animate-fadeIn">
      <div className="space-y-1">
        <h1 className="text-[1.2rem] font-semibold text-gray-900">Hi Nazeer, what would you like to do today?</h1>
        <p className="text-[0.8rem] text-gray-500">Last login: {lastLogin}</p>
      </div>

      <div className="flex items-center gap-2 mt-4 md:mt-0">
        <Button variant="outline" size="sm" className="h-9 border-gray-200">
          <CalendarIcon className="mr-1 h-4 w-4" />
          Today
        <span className="text-[0.8rem] text-gray-600 ml-3">{formattedDate}</span>
        </Button>
      </div>
    </div>
  )
}
