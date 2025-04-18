"use client"

import { useState, useEffect } from "react"
import Sidebar from "../dashboard/sidebar"
import Header from "../dashboard/header"
import WelcomeSection from "../dashboard/welcome-section"
import QuickAccess from "../dashboard/quick-access"
import AnalyticsCards from "../dashboard/analytics-cards"
import MonthlyIssuance from "../dashboard/monthly-issuance"
import RecentCardRequests from "../dashboard/recent-card-requests"
import WeeklyIncome from "../dashboard/weekly-income"
import CardStatusDistribution from "../dashboard/card-status-distribution"
import { useToast } from "../ui/use-toast"
import DashboardSkeleton from "../ui/dashboardSkeleton"

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Show welcome toast
    toast({
      title: "Welcome back, Nazeer!",
      description: "You have 38 pending requests that require your attention.",
    })

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [toast])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // ======================================================
  // ======================================================
  //================== For loading state ==================
  // ======================================================
  // ======================================================
const [loading, setLoading] = useState(true)

useEffect(() => {
  // simulate API delay or replace with actual async fetch
  const timer = setTimeout(() => setLoading(false), 2000)
  return () => clearTimeout(timer)
}, [])


  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "lg:ml-0" : "ml-0"}`}>
        <Header toggleSidebar={toggleSidebar} />

        <main className="p-4 md:p-6 overflow-y-auto h-[calc(100vh-4rem)] custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
            {loading ? (
              <DashboardSkeleton section="all" count={3} />
            ) : (
              <div>
                <WelcomeSection />
                <QuickAccess />
                <AnalyticsCards />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MonthlyIssuance />
              <RecentCardRequests />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeeklyIncome />
              <CardStatusDistribution />
            </div>
            </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
