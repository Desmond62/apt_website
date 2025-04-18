// components/skeletons/DashboardSkeleton.tsx
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

interface DashboardSkeletonProps {
  section?: 'analytics' | 'cards' | 'all'
  count?: number
}

const DashboardSkeleton: React.FC<DashboardSkeletonProps> = ({ section = 'all', count = 3 }) => {
  const renderAnalyticsCards = () =>
    Array.from({ length: count }, (_, idx) => (
      <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
        <Skeleton height={20} width="40%" className="mb-2" />
        <Skeleton height={30} width="60%" />
      </div>
    ))

  const renderChartSkeleton = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm h-64">
      <Skeleton height="100%" />
    </div>
  )

  return (
    <div className="space-y-6">
      {(section === 'analytics' || section === 'all') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderAnalyticsCards()}
          {renderAnalyticsCards()}
          {/* {renderAnalyticsCards()} */}
        </div>
      )}

      {(section === 'cards' || section === 'all') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderChartSkeleton()}
          {renderChartSkeleton()}
          {renderChartSkeleton()}
          {renderChartSkeleton()}
          {renderChartSkeleton()}
          {renderChartSkeleton()}
        
        </div>
      )}
    </div>
  )
}

export default DashboardSkeleton
