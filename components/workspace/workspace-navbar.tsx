"use client"

import Link from "next/link"
import {
  IconBolt,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

type Difficulty = "Easy" | "Medium" | "Hard"

const difficultyClass: Record<Difficulty, string> = {
  Easy: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
  Medium: "text-amber-600 bg-amber-500/10 dark:text-amber-400",
  Hard: "text-red-600 bg-red-500/10 dark:text-red-400",
}

export type WorkspaceNavbarProps = {
  problemNumber: number
  problemTitle: string
  difficulty: Difficulty
  prevHref?: string
  nextHref?: string
  timer?: string
}

export function WorkspaceNavbar({
  problemNumber,
  problemTitle,
  difficulty,
  prevHref,
  nextHref,
  timer = "00:00",
}: WorkspaceNavbarProps) {
  return (
    <header className="relative z-40 flex h-12 shrink-0 items-center border-b border-border/40 bg-background/80 px-3 backdrop-blur-sm">
      {/* Left cluster */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Link
          href="/"
          className="font-heading text-base font-bold tracking-[-0.03em] text-foreground"
        >
          NeetCode
        </Link>

        <div
          aria-hidden
          className="mx-1 h-5 w-px bg-border/60 hidden sm:block"
        />

        <div className="flex min-w-0 items-center gap-1">
          <Link
            href={prevHref ?? "#"}
            aria-label="Previous problem"
            aria-disabled={!prevHref}
            tabIndex={prevHref ? 0 : -1}
            className={cn(
              "inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              !prevHref && "pointer-events-none opacity-40"
            )}
          >
            <IconChevronLeft className="size-4" />
          </Link>

          <div className="flex min-w-0 items-center gap-2 rounded-md px-1.5 py-1">
            <span className="font-mono text-[11px] text-muted-foreground tracking-[0.04em] hidden sm:inline">
              {String(problemNumber).padStart(2, "0")}
            </span>
            <span className="truncate font-heading text-[0.8125rem] font-semibold tracking-[-0.01em] text-foreground">
              {problemTitle}
            </span>
            <span
              className={cn(
                "hidden shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.04em] md:inline",
                difficultyClass[difficulty]
              )}
            >
              {difficulty}
            </span>
          </div>

          <Link
            href={nextHref ?? "#"}
            aria-label="Next problem"
            aria-disabled={!nextHref}
            tabIndex={nextHref ? 0 : -1}
            className={cn(
              "inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              !nextHref && "pointer-events-none opacity-40"
            )}
          >
            <IconChevronRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Right cluster */}
      <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5">
        <div className="hidden items-center gap-1 rounded-md border border-border/40 bg-muted/40 px-2 py-1 font-mono text-[11px] tracking-[0.04em] text-muted-foreground sm:flex">
          <IconClock className="size-3" />
          {timer}
        </div>

        <ThemeToggle />

        <div aria-hidden className="mx-1 h-5 w-px bg-border/60 hidden sm:block" />

        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-lg hidden sm:inline-flex"
          )}
        >
          Sign In
        </Link>
        <Link
          href="#"
          className={cn(buttonVariants({ size: "sm" }), "rounded-lg")}
        >
          <IconBolt className="size-3.5" />
          Pro
        </Link>
      </div>
    </header>
  )
}
