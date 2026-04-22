"use client"

import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type Side = "left" | "right" | "top" | "bottom"

export function CollapsedRail({
  side,
  label,
  onExpand,
}: {
  side: Side
  label: string
  onExpand: () => void
}) {
  const isVertical = side === "left" || side === "right"
  const Icon =
    side === "left"
      ? IconChevronRight
      : side === "right"
        ? IconChevronLeft
        : side === "top"
          ? IconChevronDown
          : IconChevronUp

  return (
    <button
      type="button"
      onClick={onExpand}
      aria-label={`Expand ${label}`}
      className={cn(
        "group/rail relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-border/40",
        "bg-[#ececef] text-foreground/70 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:bg-white/[0.05] dark:text-foreground/80 dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
        "transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/15",
        isVertical ? "flex-col gap-2" : "flex-row gap-1.5"
      )}
    >
      <Icon className="size-3" />
      <span
        className={cn(
          "font-mono text-[9px] font-medium uppercase tracking-[0.16em]",
          isVertical && "[writing-mode:vertical-rl] rotate-180"
        )}
      >
        {label}
      </span>
    </button>
  )
}
