"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  IconArrowsShuffle,
  IconBolt,
  IconBookmark,
  IconBox,
  IconBrain,
  IconChartBar,
  IconChartLine,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconCode,
  IconCpu,
  IconDatabase,
  IconFlame,
  IconHelpCircle,
  IconInfoCircle,
  IconLayoutGrid,
  IconLock,
  IconPercentage,
  IconRefresh,
  IconSearch,
  IconTarget,
  IconTrash,
  IconTrophy,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  practiceLists,
  practiceProblems,
  practiceTopicById,
  practiceTopics,
  type Difficulty,
  type PracticeList,
  type PracticeProblem,
} from "@/lib/practice"

// ---- left-rail categories ----

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

// ---- shared card surface ----

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

// ---- accent palette per list ----

type Accent = PracticeList["accent"]

const ACCENT: Record<
  Accent,
  {
    text: string
    softText: string
    bar: string
    dot: string
    ring: string
    tint: string
    glow: string
  }
> = {
  primary: {
    text: "text-primary",
    softText: "text-primary/80",
    bar: "bg-primary",
    dot: "bg-primary",
    ring: "ring-primary/60",
    tint: "bg-primary/10",
    glow: "shadow-[0_0_0_1px_rgba(137,100,255,0.35),0_8px_28px_-8px_rgba(137,100,255,0.45)]",
  },
  emerald: {
    text: "text-emerald-500",
    softText: "text-emerald-500/80",
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/60",
    tint: "bg-emerald-500/10",
    glow: "shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_8px_28px_-8px_rgba(16,185,129,0.4)]",
  },
  amber: {
    text: "text-amber-500",
    softText: "text-amber-500/80",
    bar: "bg-amber-500",
    dot: "bg-amber-500",
    ring: "ring-amber-500/60",
    tint: "bg-amber-500/10",
    glow: "shadow-[0_0_0_1px_rgba(245,158,11,0.35),0_8px_28px_-8px_rgba(245,158,11,0.4)]",
  },
  rose: {
    text: "text-rose-500",
    softText: "text-rose-500/80",
    bar: "bg-rose-500",
    dot: "bg-rose-500",
    ring: "ring-rose-500/60",
    tint: "bg-rose-500/10",
    glow: "shadow-[0_0_0_1px_rgba(244,63,94,0.35),0_8px_28px_-8px_rgba(244,63,94,0.4)]",
  },
  cyan: {
    text: "text-cyan-500",
    softText: "text-cyan-500/80",
    bar: "bg-cyan-500",
    dot: "bg-cyan-500",
    ring: "ring-cyan-500/60",
    tint: "bg-cyan-500/10",
    glow: "shadow-[0_0_0_1px_rgba(6,182,212,0.35),0_8px_28px_-8px_rgba(6,182,212,0.4)]",
  },
}

// ---- difficulty styles ----

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

// ---- aggregation helpers ----

type Stats = { Easy: number; Medium: number; Hard: number }

function emptyStats(): Stats {
  return { Easy: 0, Medium: 0, Hard: 0 }
}

function tallyDifficulty(problems: PracticeProblem[]): Stats {
  const s = emptyStats()
  for (const p of problems) s[p.difficulty]++
  return s
}

function tallySolved(problems: PracticeProblem[], solved: Set<string>): Stats {
  const s = emptyStats()
  for (const p of problems) {
    if (solved.has(p.id)) s[p.difficulty]++
  }
  return s
}

function sumStats(s: Stats) {
  return s.Easy + s.Medium + s.Hard
}

function listProblems(listId: string): PracticeProblem[] {
  return practiceProblems.filter((p) => p.listIds.includes(listId))
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

function ProgressGauge({
  solved,
  totals,
  size = 128,
}: {
  solved: Stats
  totals: Stats
  size?: number
}) {
  const total = sumStats(totals)
  const totalSolved = sumStats(solved)
  const cx = 60
  const cy = 60
  const r = 46
  const startAngle = 135
  const sweep = 270

  const safeTotal = total || 1
  const easySpan = (totals.Easy / safeTotal) * sweep
  const medSpan = (totals.Medium / safeTotal) * sweep
  const hardSpan = (totals.Hard / safeTotal) * sweep

  const easyStart = startAngle
  const medStart = startAngle + easySpan
  const hardStart = startAngle + easySpan + medSpan
  const arcEnd = startAngle + sweep

  const easyFill =
    easyStart +
    (totals.Easy ? Math.min(solved.Easy / totals.Easy, 1) : 0) * easySpan
  const medFill =
    medStart +
    (totals.Medium ? Math.min(solved.Medium / totals.Medium, 1) : 0) * medSpan
  const hardFill =
    hardStart +
    (totals.Hard ? Math.min(solved.Hard / totals.Hard, 1) : 0) * hardSpan

  const easyDot = polar(cx, cy, r, easyStart)
  const medDot = polar(cx, cy, r, medStart)
  const hardDot = polar(cx, cy, r, arcEnd)

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-label={`${totalSolved} of ${total} problems solved`}
    >
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
        {solved.Easy > 0 && (
          <path
            d={arcPath(cx, cy, r, easyStart, easyFill)}
            fill="none"
            stroke={COLORS.Easy}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
        {solved.Medium > 0 && (
          <path
            d={arcPath(cx, cy, r, medStart, medFill)}
            fill="none"
            stroke={COLORS.Medium}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
        {solved.Hard > 0 && (
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
        <span className="font-heading text-3xl leading-none font-bold tracking-[-0.03em] tabular-nums">
          {totalSolved}
        </span>
        <span className="mt-1 font-mono text-[10px] leading-tight text-muted-foreground">
          /{total}
        </span>
        <span className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
          Solved
        </span>
      </div>
    </div>
  )
}

// ---- hero card ----

function MetricTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  accent?: string
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-background/50 px-3 py-2.5 dark:bg-white/[0.015]">
      <div className="flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
        <span className={cn("shrink-0", accent ?? "text-muted-foreground")}>
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <div className="mt-1 font-heading text-lg leading-none font-bold tracking-[-0.02em] tabular-nums">
        {value}
      </div>
    </div>
  )
}

function HeroCard({
  list,
  stats,
  solved,
  freeCount,
  savedCount,
}: {
  list: PracticeList
  stats: Stats
  solved: Stats
  freeCount: number
  savedCount: number
}) {
  const accent = ACCENT[list.accent]
  const total = sumStats(stats)
  const totalSolved = sumStats(solved)
  const percent = total > 0 ? Math.round((totalSolved / total) * 100) : 0

  return (
    <div className={cn(cardClass, "@container p-6 sm:p-7")}>
      <CardSheen />
      <div className="relative flex flex-col gap-6 @2xl:flex-row @2xl:items-start @2xl:justify-between">
        <div className="flex max-w-md flex-col gap-4">
          <span
            className={cn(
              "inline-flex w-fit items-center gap-1.5 rounded-md border border-border/60 px-2 py-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase",
              accent.tint
            )}
          >
            <IconTarget className={cn("size-3.5", accent.text)} />
            <span>Practice hub</span>
          </span>
          <div>
            <h1 className="font-heading text-4xl leading-[0.9] font-bold tracking-[-0.04em] sm:text-5xl">
              {list.title}
              <span className={accent.text}>.</span>
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {list.description} Filter, resume, bookmark, and jump into the
              exact problem you need next.
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-2.5 @2xl:max-w-xs">
          <MetricTile
            icon={<IconPercentage className="size-3.5" />}
            label="Complete"
            value={`${percent}%`}
            accent={accent.text}
          />
          <MetricTile
            icon={<IconCircleCheck className="size-3.5" />}
            label="Solved"
            value={`${totalSolved}/${total}`}
            accent="text-emerald-500"
          />
          <MetricTile
            icon={<IconBolt className="size-3.5" />}
            label="Free"
            value={freeCount}
            accent="text-amber-500"
          />
          <MetricTile
            icon={<IconBookmark className="size-3.5" />}
            label="Saved"
            value={savedCount}
            accent="text-cyan-500"
          />
        </div>
      </div>
    </div>
  )
}

// ---- gauge card ----

function DifficultyRow({
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
    <div className="flex items-center justify-between gap-4 font-mono text-[11px]">
      <span className={cn("font-semibold", tone)}>{label}</span>
      <span className="text-muted-foreground tabular-nums">
        {solved}/{total}
      </span>
    </div>
  )
}

function GaugeCard({
  list,
  stats,
  solved,
}: {
  list: PracticeList
  stats: Stats
  solved: Stats
}) {
  const accent = ACCENT[list.accent]
  return (
    <div className={cn(cardClass, "p-5")}>
      <CardSheen />
      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <IconChartBar className={cn("size-4", accent.text)} />
          <h3 className="text-sm font-semibold tracking-[-0.01em]">
            {list.title}
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-between gap-4">
          <div className="flex min-w-[110px] flex-col gap-2.5">
            <DifficultyRow
              label="Easy"
              tone="text-emerald-500"
              solved={solved.Easy}
              total={stats.Easy}
            />
            <DifficultyRow
              label="Medium"
              tone="text-amber-500"
              solved={solved.Medium}
              total={stats.Medium}
            />
            <DifficultyRow
              label="Hard"
              tone="text-red-500"
              solved={solved.Hard}
              total={stats.Hard}
            />
          </div>
          <ProgressGauge solved={solved} totals={stats} size={128} />
        </div>
      </div>
    </div>
  )
}

// ---- problem-set selector ----

function ListCard({
  list,
  total,
  solvedCount,
  active,
  onSelect,
}: {
  list: PracticeList
  total: number
  solvedCount: number
  active: boolean
  onSelect: () => void
}) {
  const accent = ACCENT[list.accent]
  const percent = total > 0 ? (solvedCount / total) * 100 : 0

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        cardClass,
        "group flex min-h-[104px] flex-col p-3 text-left transition-[border-color,box-shadow] duration-300 hover:border-border/70 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.32)]",
        active && "border-primary/50"
      )}
    >
      <CardSheen />
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-19 bg-gradient-to-b opacity-90",
          accent.tint,
          "to-transparent"
        )}
      />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold tracking-[-0.02em]">
              {list.title}
            </h4>
            <p className="mt-1 h-8 overflow-hidden text-[12px] leading-4 text-muted-foreground">
              {list.description}
            </p>
          </div>
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
            {solvedCount}/{total}
          </span>
        </div>
        <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", accent.bar)}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </button>
  )
}

function ListSelector({
  activeId,
  onSelect,
  solvedIds,
}: {
  activeId: string
  onSelect: (id: string) => void
  solvedIds: Set<string>
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2">
      {practiceLists.map((list) => {
        const problems = listProblems(list.id)
        const solved = problems.reduce(
          (n, p) => n + (solvedIds.has(p.id) ? 1 : 0),
          0
        )
        return (
          <ListCard
            key={list.id}
            list={list}
            total={problems.length}
            solvedCount={solved}
            active={activeId === list.id}
            onSelect={() => onSelect(list.id)}
          />
        )
      })}
    </div>
  )
}

// ---- next up ----

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

function NextUpCard({
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
          <a
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
          </a>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 bg-background/40 p-4 text-center text-[12px] text-muted-foreground">
            All caught up on this list.
          </div>
        )}
      </div>
    </div>
  )
}

// ---- toolbar ----

function FilterToolbar({
  query,
  setQuery,
  onClear,
  onShuffle,
}: {
  query: string
  setQuery: (s: string) => void
  onClear: () => void
  onShuffle: () => void
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:w-64">
        <IconSearch className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search problems"
          className="h-9 w-full pl-8"
        />
      </div>
      <div className="flex items-center justify-between gap-1.5 sm:justify-end">
        <div className="flex items-center gap-1.5">
          <ToolbarButton label="Toggle layout">
            <IconLayoutGrid className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton label="Shuffle" onClick={onShuffle}>
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

type TopicGroup = {
  id: string
  title: string
  problems: PracticeProblem[]
}

const MOCK_PROBLEM_HREF = "/problem/two-sum"

function buildGroups(problems: PracticeProblem[]): TopicGroup[] {
  const byTopic = new Map<string, PracticeProblem[]>()
  for (const p of problems) {
    const arr = byTopic.get(p.topicId) ?? []
    arr.push(p)
    byTopic.set(p.topicId, arr)
  }
  return practiceTopics
    .filter((t) => byTopic.has(t.id))
    .map((t) => ({
      id: t.id,
      title: t.title,
      problems: byTopic.get(t.id)!,
    }))
}

function ProblemTable({
  group,
  solved,
  onToggle,
}: {
  group: TopicGroup
  solved: Set<string>
  onToggle: (id: string) => void
}) {
  if (group.problems.length === 0) return null
  const solvedCount = group.problems.reduce(
    (n, p) => n + (solved.has(p.id) ? 1 : 0),
    0
  )
  return (
    <section aria-label={group.title} className={cn(cardClass, "p-0")}>
      <div className="relative flex h-9 shrink-0 items-center justify-between gap-2 border-b border-border/40 bg-background/30 pr-3 pl-3">
        <h3 className="text-sm font-semibold tracking-[-0.01em] text-foreground">
          {group.title}
        </h3>
        <span className="font-mono text-[11px] tracking-[0.02em] text-muted-foreground">
          {solvedCount}/{group.problems.length}
        </span>
      </div>
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
                  data-state={isSolved ? "selected" : undefined}
                  aria-disabled={isLocked || undefined}
                  className={cn(
                    "border-border/40 transition-colors hover:bg-muted/30",
                    isLocked && "opacity-50",
                    "data-[state=selected]:bg-emerald-500/[0.04]"
                  )}
                >
                  <TableCell className="w-[88px] p-0 align-middle">
                    <button
                      type="button"
                      onClick={() => onToggle(p.id)}
                      aria-label={`Toggle ${p.title} solved status`}
                      aria-pressed={isSolved}
                      disabled={isLocked}
                      className={cn(
                        "flex h-12 w-full items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                        isLocked
                          ? "cursor-not-allowed"
                          : "cursor-pointer hover:bg-muted/35"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-[18px] items-center justify-center rounded-full border border-input transition-colors",
                          isSolved &&
                            "border-emerald-500 bg-emerald-500 text-white"
                        )}
                      >
                        {isSolved && <IconCircleCheck className="size-3.5" />}
                      </span>
                    </button>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "p-0 text-sm font-medium transition-colors",
                      isSolved &&
                        "text-muted-foreground line-through decoration-emerald-500/40"
                    )}
                  >
                    <Link
                      href={MOCK_PROBLEM_HREF}
                      className="flex h-12 min-w-0 items-center gap-2 px-2 transition-colors hover:text-primary"
                      aria-label={`Open ${p.title}`}
                    >
                      {isLocked && (
                        <IconLock
                          aria-label="Pro"
                          className="size-3.5 text-amber-500/80"
                        />
                      )}
                      <span className="truncate">{p.title}</span>
                    </Link>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "p-0 text-right font-mono text-[11px] font-semibold",
                      DIFF_TEXT[p.difficulty]
                    )}
                  >
                    <Link
                      href={MOCK_PROBLEM_HREF}
                      className="flex h-12 items-center justify-end pr-5 transition-opacity hover:opacity-80"
                      aria-label={`Open ${p.title}`}
                    >
                      {p.difficulty}
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </section>
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
                      <div className="mt-0.5 ml-4 flex flex-col gap-0.5 border-l border-border/60 pl-2">
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

// ---- calendar + ranking (right rail) ----

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

function RankingCard() {
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

// ---- main panel ----

export function PracticeDashboard() {
  const [activeListId, setActiveListId] = useState<string>("neetcode-150")
  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => new Set())
  const [query, setQuery] = useState("")

  const activeList = useMemo(
    () => practiceLists.find((l) => l.id === activeListId) ?? practiceLists[0],
    [activeListId]
  )

  const listProblemsMemo = useMemo(
    () => listProblems(activeList.id),
    [activeList.id]
  )

  const stats = useMemo(
    () => tallyDifficulty(listProblemsMemo),
    [listProblemsMemo]
  )
  const solvedStats = useMemo(
    () => tallySolved(listProblemsMemo, solvedIds),
    [listProblemsMemo, solvedIds]
  )
  const freeCount = useMemo(
    () => listProblemsMemo.filter((p) => !p.locked).length,
    [listProblemsMemo]
  )

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = q
      ? listProblemsMemo.filter((p) => p.title.toLowerCase().includes(q))
      : listProblemsMemo
    return buildGroups(base)
  }, [listProblemsMemo, query])

  const toggleSolved = useCallback((id: string) => {
    setSolvedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const clearProgress = () => setSolvedIds(new Set())

  const shuffle = () => {
    const unlocked = listProblemsMemo.filter((p) => !p.locked)
    if (unlocked.length === 0) return
    const pick = unlocked[Math.floor(Math.random() * unlocked.length)]
    setQuery(pick.title)
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pt-8 pb-20 lg:px-6">
      <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
        {/* Left rail */}
        <div className="lg:sticky lg:top-[106px] lg:self-start">
          <CategoriesPanel />
        </div>

        {/* Center column */}
        <div className="flex min-w-0 flex-col gap-4">
          <HeroCard
            list={activeList}
            stats={stats}
            solved={solvedStats}
            freeCount={freeCount}
            savedCount={0}
          />
          <ListSelector
            activeId={activeList.id}
            onSelect={setActiveListId}
            solvedIds={solvedIds}
          />
          <div className="mt-4 flex flex-col gap-4">
            <FilterToolbar
              query={query}
              setQuery={setQuery}
              onClear={clearProgress}
              onShuffle={shuffle}
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
              <div className="flex flex-col gap-6">
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
        </div>

        {/* Right rail */}
        <div className="flex flex-col gap-4">
          <GaugeCard list={activeList} stats={stats} solved={solvedStats} />
          <NextUpCard list={activeList} solvedIds={solvedIds} />
          <CalendarCard />
          <RankingCard />
        </div>
      </div>
    </div>
  )
}
