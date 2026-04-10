"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { Course } from "@/lib/courses"

type Props = {
  course: Course
  onNavigate?: () => void
  className?: string
}

export function CourseSidebar({ course, onNavigate, className }: Props) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "rounded-xl border border-border/40 bg-[#f5f5f6]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
        className
      )}
    >
      <div className="border-b border-border/40 px-4 py-3">
        <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Course
        </p>
        <h2 className="mt-1 truncate text-[0.8125rem] font-semibold tracking-[-0.01em] text-foreground">
          {course.title}
        </h2>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto p-2">
        {course.sections.map((section) => (
          <div key={section.slug} className="mb-4 last:mb-0">
            <h3 className="px-3 pt-3 pb-2 font-mono text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              {section.title}
            </h3>
            <ul className="flex flex-col">
              {section.chapters.map((chapter) => {
                const href = `/courses/${course.slug}/${chapter.slug}`
                const isActive = pathname === href
                return (
                  <li key={chapter.slug}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[0.8125rem] font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary dark:bg-primary/20"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-primary" />
                      )}
                      <span className="w-6 shrink-0 font-mono text-[10px] text-muted-foreground/80 tabular-nums">
                        {chapter.number}
                      </span>
                      <span className="flex-1 truncate">{chapter.title}</span>
                      {chapter.isFree && (
                        <span className="shrink-0 rounded-sm bg-emerald-500/10 px-1 py-0.5 font-mono text-[9px] font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                          FREE
                        </span>
                      )}
                      <span className="shrink-0 font-mono text-[10px] text-muted-foreground/70 tabular-nums">
                        {chapter.durationMin}m
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}
