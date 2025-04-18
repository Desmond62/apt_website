"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { CreditCard, FileText, ClipboardList } from "lucide-react"

export default function QuickAccess() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const quickLinks = [
    {
      title: "Manage a Card",
      icon: <CreditCard className="h-6 w-6 text-gray-100 bg-blue-500 p-1 rounded-full" />,
      href: "#",
      color: "bg-blue-50",
    },
    {
      title: "Issue Instant Card",
      icon: <FileText className="h-6 w-6 text-gray-100 bg-blue-500 p-1 rounded-full" />,
      href: "#",
      color: "bg-blue-50",
    },
    {
      title: "Issue Personalized Card",
      icon: <ClipboardList className="h-6 w-6 text-gray-100 bg-blue-500 p-1 rounded-full" />,
      href: "#",
      color: "bg-blue-50",
    },
    {
      title: "Review Card Requests",
      icon: <ClipboardList className="h-6 w-6 text-gray-100 bg-blue-500 p-1 rounded-full" />,
      href: "#",
      color: "bg-blue-50",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Your Quick Access</h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        animate={isVisible ? "show" : "hidden"}
      >
        {quickLinks.map((link, index) => (
          <motion.div key={index} variants={item}>
            <Link
              to={link.href}
              className={`${link.color} flex items-center gap-3 p-4 rounded-lg hover:shadow-md transition-all duration-300 group h-full`}
            >
              <div className="flex-shrink-0">{link.icon}</div>
              <div className="font-medium text-[0.72rem] text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                {link.title}
              </div>
              <div className="ml-auto text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                &rarr;
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
