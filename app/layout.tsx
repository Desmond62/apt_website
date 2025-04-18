import React from "react"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>LAPO Microfinance Bank - Dashboard</title>
        <meta name="description" content="LAPO Microfinance Bank Dashboard" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
