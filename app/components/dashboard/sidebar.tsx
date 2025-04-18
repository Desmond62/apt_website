"use client"

import { useState, useEffect } from "react"
import {Link} from "react-router"
import {
  LayoutDashboard,
  Building2,
  Users,
  User,
  CreditCard,
  FileText,
  ClipboardList,
  Package,
  ListChecks,
  History,
  LogOut,
  ChevronLeft,
} from "lucide-react"
import Skeleton from "react-loading-skeleton"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Branches", icon: <Building2 className="w-5 h-5" /> },
    { name: "Roles", icon: <Users className="w-5 h-5" /> },
    { name: "Users", icon: <User className="w-5 h-5" /> },
    { name: "Card Scheme", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Card Profile", icon: <FileText className="w-5 h-5" /> },
    { name: "Card Request", icon: <ClipboardList className="w-5 h-5" /> },
    { name: "Stock", icon: <Package className="w-5 h-5" /> },
    { name: "Cards", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Authorization List", icon: <ListChecks className="w-5 h-5" /> },
    { name: "Authorization Queue", icon: <ListChecks className="w-5 h-5" /> },
    { name: "Trail", icon: <History className="w-5 h-5" /> },
    { name: "Account", icon: <User className="w-5 h-5" /> },
  ]

  // ==========================================================
  // ==========================================================
  // ===================== For loading state ==================
  // ==========================================================
  // ==========================================================
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])




  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-blue-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-0 flex flex-col`}
      >
        <div className="p-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            {isLoading ? (
              <Skeleton width={150} height={50} borderRadius={8} />
            ) : (
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lapo-FAz0AYzO9EmHkjaE96ZFNHQSwx0idL.png"
                alt="LAPO Microfinance Bank"
                width={150}
                height={50}
                className="object-contain"
              />
            )}
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" role="button" />
          </button>
        </div>

        <div className="px-3 py-2">
          {isLoading ? (
            <Skeleton width={90} height={10} />
          ) : (
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">MAIN MENU</h2>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1 px-2">
            { isLoading ? (  
              Array.from({ length: 10 }).map((_, i) => (
                <li key={i}>
                  <Skeleton height={36} borderRadius={10} />
                </li>
              ))
            ) : (
              menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to="/"
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 group hover:bg-blue-100 ${
                    activeItem === item.name ? "bg-blue-100 text-blue-900 font-medium" : "text-gray-700"
                  }`}
                  onClick={() => setActiveItem(item.name)}
                >
                  <span className="mr-3 text-gray-600">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            )))}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          {isLoading ? (  
            <Skeleton height={42} borderRadius={10} />
          ) : (
            <Link
              to="/"
              className="flex items-center px-2 py-3 text-sm rounded-lg transition-all duration-200 text-gray-700 hover:bg-blue-100"
              role="button"
            >
            <LogOut className="w-5 h-5 mr-1 text-gray-600" />
            <span>Logout</span>
          </Link>
          )}
        </div>

        <div className="p-4  px-6  text-xs text-gray-600 border-t border-gray-200">
          {isLoading ? (
            <Skeleton height={32} borderRadius={10} width={130}/>
          ) : (
            <div className="flex items-center ">
              <span>POWERED BY</span>
            </div> 
           )}

           {isLoading ? (
            <Skeleton height={30} borderRadius={10} width={100}/>
          ) : (
            <div className="flex mt-2">
              <span className="font-bold text-blue-900">Cardinfra.</span>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
