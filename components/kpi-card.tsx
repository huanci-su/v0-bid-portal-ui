import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: string
    trend: "up" | "down" | "neutral"
  }
  icon?: LucideIcon
  className?: string
}

export function KPICard({ title, value, change, icon: Icon, className }: KPICardProps) {
  return (
    <Card className={cn("rounded-2xl shadow-md hover:shadow-lg transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {change && (
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    "text-sm font-medium",
                    change.trend === "up" && "text-green-600 dark:text-green-400",
                    change.trend === "down" && "text-red-600 dark:text-red-400",
                    change.trend === "neutral" && "text-muted-foreground",
                  )}
                >
                  {change.value}
                </span>
                <span className="text-xs text-muted-foreground">vs 上月</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="rounded-2xl bg-primary/10 p-3">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
