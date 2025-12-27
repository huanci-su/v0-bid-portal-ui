import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusType = "draft" | "active" | "review" | "approved" | "rejected" | "completed" | "archived"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  draft: { label: "草稿", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
  active: { label: "進行中", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  review: { label: "審核中", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" },
  approved: { label: "已核准", className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  rejected: { label: "已拒絕", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
  completed: {
    label: "已完成",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  },
  archived: { label: "已封存", className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", config.className, className)}>
      {config.label}
    </Badge>
  )
}
