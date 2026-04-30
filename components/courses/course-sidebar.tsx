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

  const allChapters = course.sections.flatMap((section) => section.chapters)
  const totalChapters = allChapters.length
  const activeIndex = allChapters.findIndex(
    (chapter) => pathname === `/courses/${course.slug}/${chapter.slug}`
  )
  const currentChapter = activeIndex >= 0 ? activeIndex + 1 : 0
  const percent =
    totalChapters > 0
      ? Math.round((currentChapter / totalChapters) * 100)
      : 0

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
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Progress
          </p>
          <p className="font-mono text-[10px] font-medium tabular-nums text-muted-foreground">
            <span className="text-foreground">{currentChapter}</span>
            <span className="mx-0.5 text-muted-foreground/60">/</span>
            {totalChapters}
          </p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Chapter ${currentChapter} of ${totalChapters}`}
          className={cn(
            "mt-2 h-1 w-full overflow-hidden rounded-full",
            "bg-foreground/[0.06] dark:bg-white/[0.06]"
          )}
        >
          <div
            className={cn(
              "h-full rounded-full bg-foreground/80 transition-[width] duration-300 ease-out",
              "dark:bg-foreground"
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
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
                        "group relative flex items-center gap-2.5 rounded-md border px-3 py-1.5 text-[0.8125rem] font-medium transition-[background-color,border-color,box-shadow,color]",
                        isActive
                          ? cn(
                              "border-border/40 bg-background text-foreground",
                              "shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
                              "dark:bg-white/[0.06] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
                            )
                          : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "w-6 shrink-0 font-mono text-[10px] tabular-nums transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground/80"
                        )}
                      >
                        {chapter.number}
                      </span>
                      <span className="flex-1 truncate">{chapter.title}</span>
                      {chapter.isFree && (
                        <span className="shrink-0 rounded-sm bg-emerald-500/10 px-1 py-0.5 font-mono text-[9px] font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                          FREE
                        </span>
                      )}
                      <span
                        className={cn(
                          "shrink-0 font-mono text-[10px] tabular-nums transition-colors",
                          isActive
                            ? "text-foreground/70"
                            : "text-muted-foreground/70"
                        )}
                      >
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
