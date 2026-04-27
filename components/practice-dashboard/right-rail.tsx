"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, type ReactNode } from "react"
import {
  IconChartLine,
  IconChevronLeft,
  IconChevronRight,
  IconFlame,
  IconInfoCircle,
  IconRefresh,
  IconTarget,
  IconTrophy,
} from "@tabler/icons-react"
import {
  practiceTopicById,
  type PracticeList,
  type PracticeProblem,
} from "@/lib/practice"
import { cn } from "@/lib/utils"
import {
  ACCENT,
  CardSheen,
  DIFF_TEXT,
  cardClass,
  listProblems,
} from "./shared"

function pickNextUp(
  problems: PracticeProblem[],
  solvedIds: Set<string>,
  seed: number
): PracticeProblem | null {
  const candidates = problems.filter((p) => !p.locked && !solvedIds.has(p.id))
  const pool =
    candidates.length > 0 ? candidates : problems.filter((p) => !p.locked)
  if (pool.length === 0) return null
  return pool[seed % pool.length]
}

export function NextUpCard({
  list,
  solvedIds,
}: {
  list: PracticeList
  solvedIds: Set<string>
}) {
  const accent = ACCENT[list.accent]
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1000))
  const problems = useMemo(() => listProblems(list.id), [list.id])
  const next = useMemo(
    () => pickNextUp(problems, solvedIds, seed),
    [problems, solvedIds, seed]
  )
  const topic = next ? practiceTopicById[next.topicId] : undefined

  return (
    <div className={cn(cardClass, "p-5")}>
      <CardSheen />
      <div className="relative flex h-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconTarget className={cn("size-4", accent.text)} />
            <h3 className="text-sm font-semibold tracking-[-0.01em]">
              Next up
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            aria-label="Pick another problem"
            className="inline-flex size-7 items-center justify-center rounded-md border border-border/60 bg-background/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconRefresh className="size-3.5" />
          </button>
        </div>

        {next ? (
          <Link
            href={`/problem/${next.id}`}
            className="group flex flex-1 items-start justify-between gap-3 rounded-lg border border-border/60 bg-background/40 p-3 transition-colors hover:bg-muted/50 dark:bg-white/[0.01]"
          >
            <div className="min-w-0">
              <h4 className="truncate text-sm font-semibold tracking-[-0.01em] group-hover:underline">
                {next.title}
              </h4>
              <p className="mt-1 truncate text-[11px] text-muted-foreground">
                {topic?.title ?? next.pattern}
                {topic ? ` / ${next.pattern}` : ""}
              </p>
            </div>
            <span
              className={cn(
                "shrink-0 font-mono text-[11px] font-semibold",
                DIFF_TEXT[next.difficulty]
              )}
            >
              {next.difficulty}
            </span>
          </Link>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 bg-background/40 p-4 text-center text-[12px] text-muted-foreground">
            All caught up on this list.
          </div>
        )}
      </div>
    </div>
  )
}

function useCountdownToMidnight() {
  const [text, setText] = useState("--:--:--")
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setHours(24, 0, 0, 0)
      const diff = Math.max(0, tomorrow.getTime() - now.getTime())
      const h = Math.floor(diff / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      const s = Math.floor((diff % 60_000) / 1000)
      setText([h, m, s].map((n) => String(n).padStart(2, "0")).join(":"))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return text
}

type CalendarCell = { day: number; isToday: boolean; isPast: boolean } | null

function buildCalendar(
  viewYear: number,
  viewMonth: number,
  today: Date
): CalendarCell[] {
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const isCurrentMonth =
    today.getFullYear() === viewYear && today.getMonth() === viewMonth
  const todayDate = today.getDate()

  const cells: CalendarCell[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = isCurrentMonth && d === todayDate
    const isPast = isCurrentMonth && d < todayDate
    cells.push({ day: d, isToday, isPast: isPast && !isToday })
  }
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function StreakBox({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-2.5">
      <div className="text-[10px] tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        {icon}
        <span className="text-sm font-semibold">{value}</span>
      </div>
    </div>
  )
}

export function CalendarCard() {
  const today = new Date()
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  )
  const countdown = useCountdownToMidnight()

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const monthName = viewDate.toLocaleString("default", { month: "long" })
  const cells = buildCalendar(year, month, today)
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month

  return (
    <div className={cn(cardClass, "p-3.5")}>
      <CardSheen />
      <div className="relative">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            aria-label="Previous month"
            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconChevronLeft className="size-4" />
          </button>
          <h3 className="text-sm font-semibold tracking-[-0.02em]">
            {monthName} {year}
          </h3>
          <button
            type="button"
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            aria-label="Next month"
            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconChevronRight className="size-4" />
          </button>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-sm font-semibold">Day {today.getDate()}</span>
          <span className="font-mono text-[11px] text-muted-foreground">
            {countdown} left
          </span>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-muted-foreground">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>

        <div className="mt-1.5 grid grid-cols-7 gap-1">
          {cells.map((cell, i) => (
            <div
              key={i}
              className="relative flex aspect-square items-center justify-center"
            >
              {cell && (
                <>
                  {cell.isPast && (
                    <span
                      aria-hidden
                      className="absolute inset-[3px] rounded-full border border-dashed border-border/80 dark:border-white/15"
                    />
                  )}
                  {cell.isToday && (
                    <span
                      aria-hidden
                      className="absolute inset-[3px] rounded-full bg-primary/20 ring-2 ring-primary"
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-[1] font-mono text-[11px]",
                      cell.isToday
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {cell.day}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <StreakBox
            icon={<IconFlame className="size-4 text-orange-500" />}
            label="Current Streak"
            value="0 days"
          />
          <StreakBox
            icon={<IconTrophy className="size-4 text-yellow-500" />}
            label="Best Streak"
            value="0 days"
          />
        </div>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
          <IconInfoCircle className="size-3.5 shrink-0" />
          <span>
            {isCurrentMonth
              ? "Solve one problem a day to keep your streak"
              : "Viewing past or future month"}
          </span>
        </p>
      </div>
    </div>
  )
}

export function RankingCard() {
  return (
    <div className={cn(cardClass, "p-6")}>
      <CardSheen />
      <div className="relative flex flex-col items-center justify-center gap-2 py-4 text-center">
        <IconChartLine className="size-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Sign in to see your ranking
        </p>
      </div>
    </div>
  )
}
