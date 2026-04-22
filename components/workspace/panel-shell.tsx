import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function PanelShell({
  header,
  children,
  className,
  bodyClassName,
}: {
  header: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-border/40 bg-[#f5f5f6] shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
        className
      )}
    >
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/40 bg-background/30 pr-1 pl-3">
        {header}
      </div>
      <div className={cn("min-h-0 flex-1 overflow-auto", bodyClassName)}>
        {children}
      </div>
    </div>
  )
}

export function PanelHeaderCollapseButton({
  onClick,
  label,
}: {
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Collapse ${label}`}
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 4 4 20" />
        <path d="M15 4h5v5" />
        <path d="M9 20H4v-5" />
      </svg>
    </button>
  )
}
