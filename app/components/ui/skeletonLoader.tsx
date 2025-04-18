// components/SkeletonLoader.tsx
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

interface SkeletonLoaderProps {
  height?: number | string
  width?: number | string
  count?: number
  className?: string
  circle?: boolean
}

export default function SkeletonLoader({
  height = 20,
  width = "100%",
  count = 1,
  className = "",
  circle = false,
}: SkeletonLoaderProps) {
  return (
    <Skeleton
      height={height}
      width={width}
      count={count}
      className={className}
      circle={circle}
      enableAnimation
      baseColor="#f0f0f0"
      highlightColor="#e0e0e0"
    />
  )
}
