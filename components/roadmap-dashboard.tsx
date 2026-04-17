"use client"

import { useEffect, useState } from "react"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconRefresh,
  IconHelpCircle,
  IconSettings,
  IconRocket,
  IconFlame,
  IconTrophy,
  IconHeart,
  IconInfoCircle,
  IconChartBar,
  IconX,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type Difficulty = { solved: number; total: number }
const STATS: { easy: Difficulty; medium: Difficulty; hard: Difficulty } = {
  easy: { solved: 12, total: 28 },
  medium: { solved: 10, total: 101 },
  hard: { solved: 2, total: 21 },
}
const TOTAL = STATS.easy.total + STATS.medium.total + STATS.hard.total

const COLORS = {
  easy: "rgb(16 185 129)",
  medium: "rgb(245 158 11)",
  hard: "rgb(239 68 68)",
} as const

// ---- shared card surface ----

const cardClass = cn(
  "relative overflow-hidden rounded-xl border border-border/40 bg-[#f5f5f6]/90 p-3.5 backdrop-blur-sm will-change-transform",
  "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
  "dark:bg-background/90 dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
)

function CardSheen() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent"
    />
  )
}

// ---- gauge ----

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
) {
  const start = polar(cx, cy, r, startDeg)
  const end = polar(cx, cy, r, endDeg)
  const sweep = endDeg - startDeg
  if (sweep <= 0) return ""
  const largeArc = sweep > 180 ? 1 : 0
  return `M ${start.x.toFixed(3)} ${start.y.toFixed(3)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)}`
}

function ProgressGauge() {
  const { easy, medium, hard } = STATS
  const solved = easy.solved + medium.solved + hard.solved

  const cx = 60
  const cy = 60
  const r = 46
  const startAngle = 135
  const sweep = 270

  const easySpan = (easy.total / TOTAL) * sweep
  const medSpan = (medium.total / TOTAL) * sweep
  const hardSpan = (hard.total / TOTAL) * sweep

  const easyStart = startAngle
  const medStart = startAngle + easySpan
  const hardStart = startAngle + easySpan + medSpan
  const arcEnd = startAngle + sweep

  const easyFill =
    easyStart + Math.min(easy.solved / easy.total, 1) * easySpan
  const medFill =
    medStart + Math.min(medium.solved / medium.total, 1) * medSpan
  const hardFill =
    hardStart + Math.min(hard.solved / hard.total, 1) * hardSpan

  const easyDot = polar(cx, cy, r, easyStart)
  const medDot = polar(cx, cy, r, medStart)
  const hardDot = polar(cx, cy, r, hardStart)

  return (
    <div className="relative size-[112px] shrink-0">
      <svg viewBox="0 0 120 120" className="size-full">
        {/* Faint per-segment track in each difficulty color */}
        <g opacity="0.22">
          <path
            d={arcPath(cx, cy, r, easyStart, medStart)}
            fill="none"
            stroke={COLORS.easy}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d={arcPath(cx, cy, r, medStart, hardStart)}
            fill="none"
            stroke={COLORS.medium}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d={arcPath(cx, cy, r, hardStart, arcEnd)}
            fill="none"
            stroke={COLORS.hard}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
        {easy.solved > 0 && (
          <path
            d={arcPath(cx, cy, r, easyStart, easyFill)}
            fill="none"
            stroke={COLORS.easy}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
        {medium.solved > 0 && (
          <path
            d={arcPath(cx, cy, r, medStart, medFill)}
            fill="none"
            stroke={COLORS.medium}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
        {hard.solved > 0 && (
          <path
            d={arcPath(cx, cy, r, hardStart, hardFill)}
            fill="none"
            stroke={COLORS.hard}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
        <circle cx={easyDot.x} cy={easyDot.y} r="3.5" fill={COLORS.easy} />
        <circle cx={medDot.x} cy={medDot.y} r="3.5" fill={COLORS.medium} />
        <circle cx={hardDot.x} cy={hardDot.y} r="3.5" fill={COLORS.hard} />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-[1.6rem] leading-none font-bold tracking-[-0.03em]">
          {solved}
        </span>
        <span className="mt-0.5 font-mono text-[10px] leading-tight text-muted-foreground">
          /{TOTAL}
        </span>
        <span className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
          Solved
        </span>
      </div>
    </div>
  )
}

// ---- stats card ----

function ScoreRow({
  label,
  className,
  difficulty,
}: {
  label: string
  className: string
  difficulty: Difficulty
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px]">
      <span className={cn("font-semibold", className)}>{label}</span>
      <span className="text-muted-foreground">
        {difficulty.solved}/{difficulty.total}
      </span>
    </div>
  )
}

function IconButton({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex size-8 items-center justify-center rounded-lg border border-border/60 bg-background/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  )
}

function StatsCard() {
  return (
    <div className={cardClass}>
      <CardSheen />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1.5">
            <ScoreRow
              label="Easy"
              className="text-emerald-500"
              difficulty={STATS.easy}
            />
            <ScoreRow
              label="Med"
              className="text-amber-500"
              difficulty={STATS.medium}
            />
            <ScoreRow
              label="Hard"
              className="text-red-500"
              difficulty={STATS.hard}
            />
          </div>
          <ProgressGauge />
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border/60 bg-background/40 px-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <IconRocket className="size-3.5 text-primary" />
            NeetCode 150
            <IconChevronDown className="size-3.5 text-muted-foreground" />
          </button>
          <IconButton label="Refresh">
            <IconRefresh className="size-3.5" />
          </IconButton>
          <IconButton label="Help">
            <IconHelpCircle className="size-3.5" />
          </IconButton>
          <IconButton label="Settings">
            <IconSettings className="size-3.5" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

// ---- calendar card ----

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

function buildCalendar(viewYear: number, viewMonth: number, today: Date): CalendarCell[] {
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const isCurrentMonth =
    today.getFullYear() === viewYear && today.getMonth() === viewMonth
  const todayDate = today.getDate()

  const cells: CalendarCell[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(viewYear, viewMonth, d)
    const isToday = isCurrentMonth && d === todayDate
    const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), todayDate) || (isCurrentMonth && d < todayDate)
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
  icon: React.ReactNode
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

function CalendarCard() {
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
    <div className={cardClass}>
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

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <IconHeart className="size-4 fill-red-500 text-red-500" />
          <span className="text-sm font-semibold">1</span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          0/5 to next
        </span>
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

// ---- main exported panel ----

export function RoadmapDashboard() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle (hidden on md+) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close stats panel" : "Open stats panel"}
        aria-expanded={open}
        className={cn(
          "fixed top-20 right-4 z-30 inline-flex size-10 items-center justify-center rounded-xl border border-border/40 bg-[#f5f5f6]/90 text-foreground backdrop-blur-sm will-change-transform transition-colors duration-300 md:hidden",
          "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
          "dark:bg-background/90 dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
          "hover:border-border/60"
        )}
      >
        {open ? (
          <IconX className="size-4" />
        ) : (
          <IconChartBar className="size-4" />
        )}
      </button>

      <aside
        aria-label="Progress dashboard"
        className={cn(
          "fixed top-20 right-4 z-20 flex max-h-[calc(100vh-6rem)] w-[min(320px,calc(100vw-2rem))] flex-col gap-3 overflow-y-auto overscroll-contain pr-0.5",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "translate-x-[120%] md:translate-x-0",
          "md:top-24"
        )}
      >
        <StatsCard />
        <CalendarCard />
      </aside>
    </>
  )
}
