import { SkeletonLoader } from "@/components/skeleton-loader"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <SkeletonLoader />
    </div>
  )
}
