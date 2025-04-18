// import { useEffect, useState } from "react"
// import Sidebar from "../sidebar"
// import Dashboard from "../dashboard"

// export default function DashboardLayout() {
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000)
//     return () => clearTimeout(timer)
    
//   }, [])

//   return (
//     <div className="flex">
//       <Sidebar loading={loading} />
//       <Dashboard loading={loading} />
//     </div>
//   )
// }
