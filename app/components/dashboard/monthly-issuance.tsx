"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Maximize2 } from "lucide-react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function MonthlyIssuance() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Destroy existing chart
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
            datasets: [
              {
                label: "Personalized",
                data: [30, 45, 25, 35, 40, 50, 45],
                backgroundColor: "#1e40af",
                barPercentage: 0.6,
                categoryPercentage: 0.7,
                borderRadius: 4,
              },
              {
                label: "Instant",
                data: [20, 35, 15, 25, 30, 40, 35],
                backgroundColor: "#93c5fd",
                barPercentage: 0.6,
                categoryPercentage: 0.7,
                borderRadius: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  boxWidth: 6,
                  boxHeight: 6,
                  padding: 20,
                  font: {
                    size: 12,
                  },
                },
              },
              tooltip: {
                backgroundColor: "#fff",
                titleColor: "#1e293b",
                bodyColor: "#1e293b",
                borderColor: "#e2e8f0",
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                  labelPointStyle: () => ({
                    pointStyle: "circle",
                    rotation: 0,
                  }),
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                },
              },
              y: {
                border: {
                  dash: [5, 5],
                },
                grid: {
                  color: "#e2e8f0",
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                  stepSize: 20,
                },
                max: 100,
              },
            },
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Monthly Issuance</CardTitle>
        <Maximize2 className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  )
}
