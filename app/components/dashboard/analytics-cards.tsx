"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight , CreditCard, Wallet, AlertCircle } from "lucide-react"

export default function AnalyticsCards() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const analyticsData = [
    {
      title: "Total Active Cards",
      value: "26,478",
      change: "+9%",
      period: "this month",
      icon: <CreditCard className="h-4 w-4 text-green-600" />,
      color: "bg-green-50 text-green-600",
      iconBg: "bg-green-100",
    },
    {
      title: "Total Personalized Cards",
      value: "15,703",
      change: "+8.5%",
      period: "this month",
      icon: <CreditCard className="h-4 w-4 text-purple-600" />,
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      title: "Today's Revenue",
      value: "₦9.3M",
      change: "+6%",
      period: "vs yesterday",
      icon: <Wallet className="h-4 w-4 text-blue-600" />,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      title: "Pending Requests",
      value: "38",
      change: null,
      period: "Requires attention",
      icon: <AlertCircle className="h-4 w-4 text-orange-600" />,
      color: "bg-orange-50 text-orange-600",
      iconBg: "bg-orange-100",
      alert: true,
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
    <div className="mb-6">
      <h2 className="text-xl font-medium text-gray-900 mb-4">Analytics</h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate={isVisible ? "show" : "hidden"}
      >
        {analyticsData.map((card, index) => (
          <motion.div
            key={index}
            variants={item}
            className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div className="">
              <div className={`${card.iconBg} p-1 rounded-lg w-fit`}>{card.icon}</div>
            </div>

            <div className="mt-1">
              <p className="text-[0.7rem] text-gray-500">{card.title}</p>
              
              <div className="flex items-center justify-between">
              <h3 className="text-[0.8rem] font-bold mt-1">{card.value}</h3>
              <p className="text-[0.68rem] text-gray-500 mt-1 flex items-center gap-2">
                {card.change && (
                  <span className={`${card.color} text-[0.68rem] font-medium p-1 rounded-md flex items-center w-fit`}>
                  <ArrowUpRight className="h-3 w-3 mr-[0.2rem]" />
                  {card.change}
                </span>
              )} 
                
                {card.alert ? <span className="text-orange-500 font-medium">{card.period}</span> : card.period}
              </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
