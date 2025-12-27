import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <AppShell breadcrumbs={[{ label: "首頁", href: "/" }, { label: "團隊履歷" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-9 w-32 rounded-2xl" />
            <Skeleton className="h-5 w-64 rounded-2xl" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-11 w-36 rounded-2xl" />
            <Skeleton className="h-11 w-32 rounded-2xl" />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-11 flex-1 rounded-2xl" />
          <div className="flex gap-2">
            <Skeleton className="h-11 w-24 rounded-2xl" />
            <Skeleton className="h-11 w-24 rounded-2xl" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="rounded-2xl shadow-md">
              <CardContent className="p-6 space-y-2">
                <Skeleton className="h-8 w-16 rounded-xl" />
                <Skeleton className="h-4 w-24 rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* People Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="rounded-2xl shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex gap-1">
                    <Skeleton className="h-8 w-8 rounded-2xl" />
                    <Skeleton className="h-8 w-8 rounded-2xl" />
                  </div>
                </div>
                <Skeleton className="h-6 w-24 rounded-xl mb-2" />
                <Skeleton className="h-4 w-32 rounded-xl" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Skeleton key={j} className="h-6 w-16 rounded-full" />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="text-center space-y-1">
                      <Skeleton className="h-6 w-8 mx-auto rounded-xl" />
                      <Skeleton className="h-3 w-12 mx-auto rounded-xl" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded-xl" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
