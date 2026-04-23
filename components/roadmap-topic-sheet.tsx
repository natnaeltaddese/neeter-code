"use client"

import Link from "next/link"
import { useMemo } from "react"
import {
  IconCircleCheck,
  IconExternalLink,
  IconLock,
  IconNotes,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { Difficulty, PracticeProblem } from "@/lib/practice"
import {
  getRoadmapProblems,
  roadmapPrereqs,
  type RoadmapPrereq,
} from "@/lib/roadmap"

const MOCK_PROBLEM_HREF = "/problem/two-sum"

const DIFF_TEXT: Record<Difficulty, string> = {
  Easy: "text-emerald-500",
  Medium: "text-amber-500",
  Hard: "text-red-500",
}

const cardClass = cn(
  "relative overflow-hidden rounded-xl border border-border/40 bg-[#f5f5f6]",
  "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
  "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
)

export type RoadmapTopicMeta = {
  id: string
  title: string
  description: string
}

export function RoadmapTopicSheet({
  topic,
  open,
  onOpenChange,
  solvedIds,
  onToggleSolved,
  starredIds,
  onToggleStarred,
  completedPrereqs,
  onTogglePrereq,
}: {
  topic: RoadmapTopicMeta | null
  open: boolean
  onOpenChange: (open: boolean) => void
  solvedIds: Set<string>
  onToggleSolved: (id: string) => void
  starredIds: Set<string>
  onToggleStarred: (id: string) => void
  completedPrereqs: Set<string>
  onTogglePrereq: (href: string) => void
}) {
  const problems = useMemo(
    () => (topic ? getRoadmapProblems(topic.id) : []),
    [topic]
  )
  const prereqs = useMemo<RoadmapPrereq[]>(
    () => (topic ? (roadmapPrereqs[topic.id] ?? []) : []),
    [topic]
  )
  const total = problems.length
  const solved = problems.reduce(
    (n, p) => n + (solvedIds.has(p.id) ? 1 : 0),
    0
  )
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={cn(
          "w-full max-w-none gap-0 overflow-y-auto bg-background p-0",
          "sm:!max-w-xl md:!max-w-2xl lg:!max-w-3xl"
        )}
      >
        {topic && (
          <div className="flex flex-col gap-6 px-4 pt-12 pb-10 sm:px-6">
            {/* Header */}
            <div className="flex flex-col items-center gap-2.5">
              <SheetTitle className="text-center text-xl leading-tight tracking-[-0.02em] sm:text-2xl">
                {topic.title}
              </SheetTitle>
              <SheetDescription className="text-center font-mono text-[11px] text-muted-foreground">
                ({solved} / {total})
              </SheetDescription>
              <div className="h-1 w-full max-w-md rounded-full bg-border/70 dark:bg-white/[0.08]">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    pct === 100
                      ? "bg-emerald-500"
                      : pct > 0
                        ? "bg-primary"
                        : "bg-foreground/60"
                  )}
                  style={{ width: total === 0 ? "100%" : `${pct}%` }}
                />
              </div>
            </div>

            {/* Prerequisites */}
            {prereqs.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-center text-sm text-muted-foreground">
                  Prerequisites
                </h3>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                  {prereqs.map((p) => (
                    <PrereqCard
                      key={p.href}
                      prereq={p}
                      checked={completedPrereqs.has(p.href)}
                      onToggle={() => onTogglePrereq(p.href)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Problems */}
            {total > 0 ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-end gap-1 pr-1 text-[12px] text-muted-foreground">
                  Displaying 1 - {total}
                </div>
                <ProblemTable
                  problems={problems}
                  solvedIds={solvedIds}
                  starredIds={starredIds}
                  onToggleSolved={onToggleSolved}
                  onToggleStarred={onToggleStarred}
                />
              </div>
            ) : (
              <div
                className={cn(
                  cardClass,
                  "p-8 text-center text-sm text-muted-foreground"
                )}
              >
                No practice problems curated for this topic yet.
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

function PrereqCard({
  prereq,
  checked,
  onToggle,
}: {
  prereq: RoadmapPrereq
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={cn(
        cardClass,
        "flex flex-col gap-2 p-3 transition-[border-color,box-shadow] duration-200 hover:border-border/60"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Link
          href={prereq.href}
          className="min-w-0 flex-1 text-sm leading-snug font-semibold tracking-[-0.01em] transition-colors hover:text-primary"
        >
          {prereq.title}
        </Link>
        <Checkbox
          checked={checked}
          onCheckedChange={onToggle}
          aria-label={`Mark ${prereq.title} as complete`}
          className="mt-0.5 shrink-0"
        />
      </div>
      <Link
        href={prereq.href}
        className="text-[11px] leading-snug text-primary transition-opacity hover:opacity-80"
      >
        {prereq.courseTitle}
      </Link>
    </div>
  )
}

function ProblemTable({
  problems,
  solvedIds,
  starredIds,
  onToggleSolved,
  onToggleStarred,
}: {
  problems: PracticeProblem[]
  solvedIds: Set<string>
  starredIds: Set<string>
  onToggleSolved: (id: string) => void
  onToggleStarred: (id: string) => void
}) {
  return (
    <section className={cn(cardClass, "p-0")}>
      <Table>
        <TableHeader>
          <TableRow className="border-border/40 hover:bg-transparent">
            <TableHead className="w-[72px] pl-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Status
            </TableHead>
            <TableHead className="w-[56px] text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Star
            </TableHead>
            <TableHead className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Problem
            </TableHead>
            <TableHead className="w-[110px] text-right text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Difficulty
            </TableHead>
            <TableHead className="w-[88px] pr-4 text-right text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Solution
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((p) => {
            const isSolved = solvedIds.has(p.id)
            const isStarred = starredIds.has(p.id)
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
                <TableCell className="w-[72px] p-0 pl-4 align-middle">
                  <button
                    type="button"
                    onClick={() => onToggleSolved(p.id)}
                    aria-label={`Toggle ${p.title} solved status`}
                    aria-pressed={isSolved}
                    disabled={isLocked}
                    className={cn(
                      "flex h-12 w-full items-center justify-start text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                      isLocked ? "cursor-not-allowed" : "cursor-pointer"
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
                <TableCell className="w-[56px] p-0 align-middle">
                  <button
                    type="button"
                    onClick={() => onToggleStarred(p.id)}
                    aria-label={`Toggle ${p.title} star`}
                    aria-pressed={isStarred}
                    disabled={isLocked}
                    className={cn(
                      "flex h-12 w-full items-center justify-start transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                      isLocked
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:opacity-80"
                    )}
                  >
                    {isStarred ? (
                      <IconStarFilled className="size-4 text-amber-400" />
                    ) : (
                      <IconStar className="size-4 text-muted-foreground" />
                    )}
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
                    className="flex h-12 min-w-0 items-center gap-1.5 pr-2 transition-colors hover:text-primary"
                    aria-label={`Open ${p.title}`}
                  >
                    {isLocked && (
                      <IconLock
                        aria-label="Pro"
                        className="size-3.5 shrink-0 text-amber-500/80"
                      />
                    )}
                    <span className="truncate">{p.title}</span>
                    <IconExternalLink className="size-3.5 shrink-0 text-muted-foreground/60" />
                  </Link>
                </TableCell>
                <TableCell
                  className={cn(
                    "w-[110px] p-0 text-right font-mono text-[11px] font-semibold",
                    DIFF_TEXT[p.difficulty]
                  )}
                >
                  <Link
                    href={MOCK_PROBLEM_HREF}
                    className="flex h-12 items-center justify-end pr-2 transition-opacity hover:opacity-80"
                    aria-label={`Open ${p.title}`}
                  >
                    {p.difficulty}
                  </Link>
                </TableCell>
                <TableCell className="w-[88px] p-0 pr-4 align-middle">
                  <Link
                    href={MOCK_PROBLEM_HREF}
                    aria-label={`View solution for ${p.title}`}
                    className="flex h-12 w-full items-center justify-end text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="inline-flex size-7 items-center justify-center rounded-md border border-border/60 bg-background/40">
                      <IconNotes className="size-3.5" />
                    </span>
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}
