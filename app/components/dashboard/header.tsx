"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, Bell, Search, User } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface HeaderProps {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps) {
  // const [currentDate] = useState(new Date())
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Format date as "11 Nov 2024"
  // const formattedDate = new Intl.DateTimeFormat("en-GB", {
  //   day: "numeric",
  //   month: "short",
  //   year: "numeric",
  // }).format(currentDate)

  // // Format last login time
  // const lastLoginDate = new Date("2024-01-26T14:39:58")
  // const formattedLastLogin = `${lastLoginDate.getDate()}/${lastLoginDate.getMonth() + 1}/${lastLoginDate.getFullYear()} ${lastLoginDate.getHours()}:${String(lastLoginDate.getMinutes()).padStart(2, "0")}:${String(lastLoginDate.getSeconds()).padStart(2, "0")}`

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus input when expanded
  useEffect(() => {
    if (searchExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchExpanded])

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded)
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-10">
      <div className="flex items-center gap-4 w-full">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
          <Menu className="h-5 w-5 text-gray-600 hover:text-gray-900" role="button" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="hidden md:flex items-center gap-2">
          <span className="text-gray-500 font-bold">Dashboard</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div ref={searchRef} className="relative">
            {isMobile || searchExpanded ? (
              searchExpanded ? (
                <>
                  <div className="fixed inset-0 bg-black/20 z-10" onClick={() => setSearchExpanded(false)}></div>
                  <div className="relative z-20">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      ref={inputRef}
                      type="search"
                      placeholder="Search..."
                      className="w-64 pl-9 rounded-full outline-none bg-gray-50 border-gray-200 focus:ring-0 focus:ring-gray-200"
                    />
                  </div>
                </>
              ) : (
                <Button variant="ghost" size="icon" onClick={toggleSearch}>
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              )
            ) : (
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64 pl-9 rounded-full outline-none bg-gray-50 border-gray-200 focus:ring-0 focus:ring-gray-200"
                />
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" role="button" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-blue-800">
              <User className="h-4 w-4" role="button" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
