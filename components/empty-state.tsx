"use client"

import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 p-16 text-center">
      <div className="rounded-2xl bg-muted/50 p-6 mb-6">
        <Icon className="h-12 w-12 text-muted-foreground/60" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground mb-8 max-w-md leading-relaxed">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="rounded-2xl bg-primary hover:bg-primary/90">
          {action.label}
        </Button>
      )}
    </div>
  )
}
