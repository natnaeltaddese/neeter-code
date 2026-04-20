"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconDatabase,
  IconCode,
  IconBox,
  IconBrain,
  IconCpu,
  IconSearch,
  IconLayoutGrid,
  IconArrowsShuffle,
  IconTrash,
  IconHelpCircle,
  IconFlame,
  IconTrophy,
  IconChartLine,
  IconInfoCircle,
  IconLock,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ---- shared card surface (matches roadmap-dashboard) ----

const cardClass = cn(
  "relative overflow-hidden rounded-xl border border-border/40 bg-[#f5f5f6]",
  "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
  "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
)

function CardSheen() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent"
    />
  )
}

// ---- data ----

type Difficulty = "Easy" | "Medium" | "Hard"

type Problem = {
  id: number
  title: string
  difficulty: Difficulty
  locked?: boolean
}

type TopicGroup = {
  id: string
  title: string
  problems: Problem[]
}

type Category = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: { id: string; label: string }[]
}

const categories: Category[] = [
  {
    id: "coding",
    label: "Coding Interviews",
    icon: IconCode,
    children: [
      { id: "problems", label: "Problems" },
      { id: "company-tagged", label: "Company Tagged" },
      { id: "cheatsheets", label: "Cheatsheets" },
      { id: "quizzes", label: "Quizzes" },
    ],
  },
  { id: "system-design", label: "System Design", icon: IconBox },
  { id: "ml", label: "Machine Learning", icon: IconBrain, badge: "NEW" },
  { id: "lld", label: "Low Level Design", icon: IconCpu },
  { id: "databases", label: "Databases", icon: IconDatabase },
]

const featured = {
  description:
    "Practice coding interview problems across data structures, algorithms, and language fundamentals.",
}

type TopCard = {
  id: string
  title: string
  subtitle: string
  image: string
  href: string
}

const topCards: TopCard[] = [
  {
    id: "algos-beginner",
    title: "Algorithms for Beginners",
    subtitle: "25 hrs · Medium",
    image: "/courses/algorithms-beginner.avif",
    href: "/courses/algorithms-beginner",
  },
  {
    id: "algos-advanced",
    title: "Advanced Algorithms",
    subtitle: "25 hrs · Hard",
    image: "/courses/algorithms-advanced.avif",
    href: "/courses",
  },
  {
    id: "python-interview",
    title: "Python for Coding",
    subtitle: "8 hrs · Easy",
    image: "/courses/python-interview.avif",
    href: "/courses",
  },
]

const COLORS = {
  Easy: "rgb(16 185 129)",
  Medium: "rgb(245 158 11)",
  Hard: "rgb(239 68 68)",
} as const

const DIFF_TEXT: Record<Difficulty, string> = {
  Easy: "text-emerald-500",
  Medium: "text-amber-500",
  Hard: "text-red-500",
}

const groups: TopicGroup[] = [
  {
    id: "implement-ds",
    title: "Implement Data Structures",
    problems: [
      { id: 1, title: "Design Dynamic Array (Resizable Array)", difficulty: "Easy" },
      { id: 2, title: "Design Singly Linked List", difficulty: "Easy" },
      { id: 3, title: "Design Double-ended Queue", difficulty: "Easy", locked: true },
      { id: 4, title: "Design Binary Search Tree", difficulty: "Medium", locked: true },
      { id: 5, title: "Design Hash Table", difficulty: "Medium", locked: true },
      { id: 6, title: "Design Heap", difficulty: "Medium", locked: true },
      { id: 7, title: "Design Graph", difficulty: "Medium", locked: true },
      { id: 8, title: "Design Disjoint Set (Union-Find)", difficulty: "Medium", locked: true },
      { id: 9, title: "Design Segment Tree", difficulty: "Hard", locked: true },
    ],
  },
  {
    id: "sorting",
    title: "Sorting",
    problems: [
      { id: 10, title: "Insertion Sort", difficulty: "Easy" },
      { id: 11, title: "Merge Sort", difficulty: "Medium", locked: true },
      { id: 12, title: "Quick Sort", difficulty: "Medium", locked: true },
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    problems: [
      { id: 13, title: "Matrix Depth-First Search", difficulty: "Medium", locked: true },
      { id: 14, title: "Matrix Breadth-First Search", difficulty: "Medium", locked: true },
      { id: 15, title: "Dijkstra's Algorithm", difficulty: "Medium" },
      { id: 16, title: "Prim's Algorithm", difficulty: "Hard", locked: true },
      { id: 17, title: "Kruskal's Algorithm", difficulty: "Hard", locked: true },
      { id: 18, title: "Topological Sort", difficulty: "Medium", locked: true },
    ],
  },
]

const allProblems = groups.flatMap((g) => g.problems)

const TOTALS = {
  Easy: allProblems.filter((p) => p.difficulty === "Easy").length,
  Medium: allProblems.filter((p) => p.difficulty === "Medium").length,
  Hard: allProblems.filter((p) => p.difficulty === "Hard").length,
}
const TOTAL = TOTALS.Easy + TOTALS.Medium + TOTALS.Hard

// ---- gauge (small variant of roadmap gauge) ----

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

type Stats = { Easy: number; Medium: number; Hard: number }

function ProgressGauge({ solved }: { solved: Stats }) {
  const easy = { solved: solved.Easy, total: TOTALS.Easy }
  const medium = { solved: solved.Medium, total: TOTALS.Medium }
  const hard = { solved: solved.Hard, total: TOTALS.Hard }
  const totalSolved = easy.solved + medium.solved + hard.solved
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
    easyStart + (easy.total ? Math.min(easy.solved / easy.total, 1) : 0) * easySpan
  const medFill =
    medStart + (medium.total ? Math.min(medium.solved / medium.total, 1) : 0) * medSpan
  const hardFill =
    hardStart + (hard.total ? Math.min(hard.solved / hard.total, 1) : 0) * hardSpan

  const easyDot = polar(cx, cy, r, easyStart)
  const medDot = polar(cx, cy, r, medStart)
  const hardDot = polar(cx, cy, r, hardStart)

  return (
    <div className="relative size-[120px] shrink-0">
      <svg viewBox="0 0 120 120" className="size-full">
        <g opacity="0.22">
          <path
            d={arcPath(cx, cy, r, easyStart, medStart)}
            fill="none"
            stroke={COLORS.Easy}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d={arcPath(cx, cy, r, medStart, hardStart)}
            fill="none"
            stroke={COLORS.Medium}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d={arcPath(cx, cy, r, hardStart, arcEnd)}
            fill="none"
            stroke={COLORS.Hard}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
        {easy.solved > 0 && (
          <path
            d={arcPath(cx, cy, r, easyStart, easyFill)}
            fill="none"
            stroke={COLORS.Easy}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
        {medium.solved > 0 && (
          <path
            d={arcPath(cx, cy, r, medStart, medFill)}
            fill="none"
            stroke={COLORS.Medium}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
        {hard.solved > 0 && (
          <path
            d={arcPath(cx, cy, r, hardStart, hardFill)}
            fill="none"
            stroke={COLORS.Hard}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
        <circle cx={easyDot.x} cy={easyDot.y} r="3.5" fill={COLORS.Easy} />
        <circle cx={medDot.x} cy={medDot.y} r="3.5" fill={COLORS.Medium} />
        <circle cx={hardDot.x} cy={hardDot.y} r="3.5" fill={COLORS.Hard} />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-2xl leading-none font-bold tracking-[-0.03em] tabular-nums">
          {totalSolved}
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

// ---- left categories panel ----

function CategoriesPanel() {
  const [activeId, setActiveId] = useState("problems")
  const [openId, setOpenId] = useState<string | null>("coding")

  return (
    <aside aria-label="Practice categories" className={cn(cardClass, "p-2")}>
      <CardSheen />
      <div className="relative">
        <nav className="flex flex-col gap-0.5">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeId === cat.id
            const isOpen = openId === cat.id
            const hasChildren = !!cat.children?.length

            return (
              <div key={cat.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(cat.id)
                    if (hasChildren) setOpenId(isOpen ? null : cat.id)
                  }}
                  aria-expanded={hasChildren ? isOpen : undefined}
                  className={cn(
                    "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="flex-1 text-left">{cat.label}</span>
                  {cat.badge && (
                    <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wide text-amber-500 uppercase">
                      {cat.badge}
                    </span>
                  )}
                  {hasChildren && (
                    <IconChevronDown
                      className={cn(
                        "size-3.5 shrink-0 transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  )}
                </button>

                {hasChildren && (
                  <div
                    className={cn(
                      "grid transition-all duration-200 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-border/60 pl-2">
                        {cat.children!.map((child) => {
                          const childActive = activeId === child.id
                          return (
                            <button
                              key={child.id}
                              type="button"
                              onClick={() => setActiveId(child.id)}
                              className={cn(
                                "rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors",
                                childActive
                                  ? "bg-muted text-foreground"
                                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                              )}
                            >
                              {child.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

// ---- featured topic banner ----

function TopCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      {topCards.map((c) => (
        <a
          key={c.id}
          href={c.href}
          className={cn(
            cardClass,
            "group p-3 transition-[border-color,box-shadow] duration-300 hover:border-border/60",
            "hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          )}
        >
          <CardSheen />
          <div className="relative flex items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted/30 ring-1 ring-border/40">
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[0.9375rem] leading-tight font-semibold tracking-[-0.02em]">
                {c.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                {c.subtitle}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

// ---- summary card with description + scores + gauge ----

function SummaryCard({ solved }: { solved: Stats }) {
  return (
    <div className={cn(cardClass, "p-5")}>
      <CardSheen />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5 sm:max-w-[320px]">
          <IconHelpCircle className="size-5 shrink-0 text-muted-foreground" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {featured.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <div className="space-y-1.5">
            <ScoreRow label="Easy" tone="text-emerald-500" solved={solved.Easy} total={TOTALS.Easy} />
            <ScoreRow label="Med" tone="text-amber-500" solved={solved.Medium} total={TOTALS.Medium} />
            <ScoreRow label="Hard" tone="text-red-500" solved={solved.Hard} total={TOTALS.Hard} />
          </div>
          <ProgressGauge solved={solved} />
        </div>
      </div>
    </div>
  )
}

function ScoreRow({
  label,
  tone,
  solved,
  total,
}: {
  label: string
  tone: string
  solved: number
  total: number
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px]">
      <span className={cn("font-semibold", tone)}>{label}</span>
      <span className="text-muted-foreground">
        {solved}/{total}
      </span>
    </div>
  )
}

// ---- toolbar ----

function FilterToolbar({
  query,
  setQuery,
  onClear,
}: {
  query: string
  setQuery: (s: string) => void
  onClear: () => void
}) {
  const shuffle = () => {
    const unlocked = allProblems.filter((p) => !p.locked)
    const i = Math.floor(Math.random() * unlocked.length)
    setQuery(unlocked[i].title)
  }
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:w-56">
        <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="h-9 w-full pl-8"
        />
      </div>
      <div className="flex items-center justify-between gap-1.5 sm:justify-end">
        <div className="flex items-center gap-1.5">
          <ToolbarButton label="Toggle layout">
            <IconLayoutGrid className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton label="Shuffle" onClick={shuffle}>
            <IconArrowsShuffle className="size-3.5" />
          </ToolbarButton>
        </div>
        <div className="flex items-center gap-1.5">
          <ToolbarButton label="Clear progress" onClick={onClear}>
            <IconTrash className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton label="Help">
            <IconHelpCircle className="size-3.5" />
          </ToolbarButton>
        </div>
      </div>
    </div>
  )
}

function ToolbarButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  )
}

// ---- problem table ----

function ProblemTable({
  group,
  solved,
  onToggle,
}: {
  group: TopicGroup
  solved: Set<number>
  onToggle: (id: number) => void
}) {
  if (group.problems.length === 0) return null
  return (
    <section aria-label={group.title} className="flex flex-col gap-2">
      <h3 className="text-center text-sm font-semibold tracking-[-0.01em] text-foreground">
        {group.title}
      </h3>
      <div className={cn(cardClass, "overflow-hidden p-0")}>
        <CardSheen />
        <div className="relative">
        <Table>
          <TableHeader>
            <TableRow className="border-border/40 hover:bg-transparent">
              <TableHead className="w-[88px] pl-5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Status
              </TableHead>
              <TableHead className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Problem
              </TableHead>
              <TableHead className="w-[140px] pr-5 text-right text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Difficulty
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {group.problems.map((p) => {
              const isSolved = solved.has(p.id)
              const isLocked = !!p.locked
              return (
                <TableRow
                  key={p.id}
                  onClick={() => !isLocked && onToggle(p.id)}
                  data-state={isSolved ? "selected" : undefined}
                  aria-disabled={isLocked || undefined}
                  className={cn(
                    "border-border/40 transition-colors",
                    isLocked
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-muted/50",
                    "data-[state=selected]:bg-emerald-500/[0.04]"
                  )}
                >
                  <TableCell
                    className="pl-5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isSolved}
                      disabled={isLocked}
                      onCheckedChange={() => onToggle(p.id)}
                      aria-label={`Mark ${p.title} as solved`}
                      className={cn(
                        "size-[18px] rounded-md transition-colors",
                        "data-checked:!border-emerald-500 data-checked:!bg-emerald-500 data-checked:!text-white"
                      )}
                    />
                  </TableCell>
                  <TableCell
                    className={cn(
                      "py-3 text-sm font-medium transition-colors",
                      isSolved &&
                        "text-muted-foreground line-through decoration-emerald-500/40"
                    )}
                  >
                    <span className="inline-flex items-center gap-2">
                      {isLocked && (
                        <IconLock
                          aria-label="Pro"
                          className="size-3.5 text-amber-500/80"
                        />
                      )}
                      {p.title}
                    </span>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "pr-5 text-right font-mono text-[11px] font-semibold",
                      DIFF_TEXT[p.difficulty]
                    )}
                  >
                    {p.difficulty}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      </div>
    </section>
  )
}

// ---- right rail: calendar / streak / ranking ----

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
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-2.5">
      <div className="text-[10px] tracking-wide text-muted-foreground">{label}</div>
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
            <div key={i} className="relative flex aspect-square items-center justify-center">
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

function RankingCard() {
  return (
    <div className={cn(cardClass, "p-6")}>
      <CardSheen />
      <div className="relative flex flex-col items-center justify-center gap-2 py-4 text-center">
        <IconChartLine className="size-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Sign in to see your ranking</p>
      </div>
    </div>
  )
}

// ---- main panel ----

export function PracticeDashboard() {
  const [query, setQuery] = useState("")
  const [solvedIds, setSolvedIds] = useState<Set<number>>(() => new Set())

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groups
    return groups
      .map((g) => ({
        ...g,
        problems: g.problems.filter((p) => p.title.toLowerCase().includes(q)),
      }))
      .filter((g) => g.problems.length > 0)
  }, [query])

  const solvedStats = useMemo<Stats>(() => {
    const s: Stats = { Easy: 0, Medium: 0, Hard: 0 }
    for (const p of allProblems) {
      if (solvedIds.has(p.id)) s[p.difficulty]++
    }
    return s
  }, [solvedIds])

  const toggleSolved = (id: number) => {
    setSolvedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const clearProgress = () => setSolvedIds(new Set())

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pt-8 pb-20 lg:px-6">
      <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
        {/* Left rail */}
        <div className="lg:sticky lg:top-[106px] lg:self-start">
          <CategoriesPanel />
        </div>

        {/* Center column */}
        <div className="flex min-w-0 flex-col gap-4">
          <TopCards />
          <SummaryCard solved={solvedStats} />
          <FilterToolbar
            query={query}
            setQuery={setQuery}
            onClear={clearProgress}
          />
          {filteredGroups.length === 0 ? (
            <div
              className={cn(
                cardClass,
                "p-10 text-center text-sm text-muted-foreground"
              )}
            >
              No problems match your search.
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {filteredGroups.map((g) => (
                <ProblemTable
                  key={g.id}
                  group={g}
                  solved={solvedIds}
                  onToggle={toggleSolved}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right rail */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-[106px] lg:self-start">
          <CalendarCard />
          <RankingCard />
        </div>
      </div>
    </div>
  )
}
