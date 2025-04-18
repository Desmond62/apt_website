"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Maximize2 } from "lucide-react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function WeeklyIncome() {
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
          type: "line",
          data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
              {
                label: "Income",
                data: [50, 45, 20, 45, 40, 60, 75],
                borderColor: "#22c55e",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#22c55e",
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">This Week's Income</CardTitle>
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
