"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CardRequest {
  id: number
  branch: string
  type: "Instant" | "Personalized"
  quantity: number
  status: "Ready" | "In Progress" | "Acknowledged" | "Pending"
}

export default function RecentCardRequests() {
  const [requests] = useState<CardRequest[]>([
    { id: 1, branch: "Corporate", type: "Instant", quantity: 10, status: "Ready" },
    { id: 2, branch: "Corporate", type: "Personalized", quantity: 10, status: "In Progress" },
    { id: 3, branch: "Corporate", type: "Personalized", quantity: 10, status: "Acknowledged" },
    { id: 4, branch: "Corporate", type: "Instant", quantity: 10, status: "Pending" },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Acknowledged":
        return "bg-gray-100 text-gray-800"
      case "Pending":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Card Requests</CardTitle>
        <Maximize2 className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 bg-[#F1F7FF] border border-gray-200">
                <th className="pb-2 font-medium text-center p-2">Branch</th>
                <th className="pb-2 font-medium text-center p-2">Card Type</th>
                <th className="pb-2 font-medium text-center p-2">Quantity</th>
                <th className="pb-2 font-medium text-center p-2">Status</th>
                <th className="pb-2 font-medium text-center p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {requests.map((request) => (
                  <motion.tr
                    key={request.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="border-b last:border-b-0 hover:bg-gray-50 border-gray-200 text-center"
                  >
                    <td className="py-3 text-[0.68rem]">{request.branch}</td>
                    <td className="py-3 text-[0.68rem]">{request.type}</td>
                    <td className="py-3 text-sm">{request.quantity}</td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-[0.68rem] font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm">
                      <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-800">
                        View
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
