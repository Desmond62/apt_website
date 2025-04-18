"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Chart, registerables, type ChartData } from "chart.js"

Chart.register(...registerables)

// Define the center text plugin
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart: any) => {
    const { ctx, data } = chart;
    const centerX = chart.getDatasetMeta(0).data[0].x;
    const centerY = chart.getDatasetMeta(0).data[0].y;

    // Set font properties
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw title
    ctx.font = "14px Arial";
    ctx.fillStyle = "#64748b";
    ctx.fillText("Total Cards", centerX, centerY - 15);

    // Draw value
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#1e293b";
    ctx.fillText("2,450", centerX, centerY + 15);

    ctx.restore();
  }
};

export default function CardStatusDistribution() {
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

        const data: ChartData = {
          labels: ["Active", "Expired", "Inactive", "Blocked", "Lost"],
          datasets: [
            {
              data: [65, 15, 10, 5, 5],
              backgroundColor: [
                "#06b6d4", // Active - Cyan
                "#f59e0b", // Expired - Amber
                "#3b82f6", // Inactive - Blue
                "#8b5cf6", // Blocked - Purple
                "#ef4444", // Lost - Red
              ],
              borderWidth: 0,
              borderRadius: 4,
          },
          ],
        }

        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: data,
          options: {
            cutout: '75%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  boxWidth: 8,
                  boxHeight: 8,
                  padding: 15,
                  font: {
                    size: 12,
                  },
                },
              },
            },
          }as any,
          plugins: [centerTextPlugin],
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
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Card Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  )
}