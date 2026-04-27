"use client"

import { useCallback, useMemo, useState } from "react"
import {
  IconArrowsShuffle,
  IconBolt,
  IconBookmark,
  IconBox,
  IconBrain,
  IconChartBar,
  IconChevronDown,
  IconCircleCheck,
  IconCode,
  IconCpu,
  IconDatabase,
  IconHelpCircle,
  IconLayoutGrid,
  IconPercentage,
  IconSearch,
  IconTarget,
  IconTrash,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  practiceLists,
  type PracticeList,
} from "@/lib/practice"
import { ProblemTable, buildGroups } from "./practice-dashboard/problem-table"
import {
  CalendarCard,
  NextUpCard,
  RankingCard,
} from "./practice-dashboard/right-rail"
import {
  ACCENT,
  COLORS,
  CardSheen,
  arcPath,
  cardClass,
  listProblems,
  polar,
  sumStats,
  tallyDifficulty,
  tallySolved,
  type Stats,
} from "./practice-dashboard/shared"

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

// ---- gauge ----

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
