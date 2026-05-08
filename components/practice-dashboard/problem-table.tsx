"use client"

import Link from "next/link"
import { useState } from "react"
import { IconChevronDown, IconCircleCheck, IconLock } from "@tabler/icons-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { practiceTopics, type PracticeProblem } from "@/lib/practice"
import { cn } from "@/lib/utils"
import { cardClass, DIFF_TEXT } from "./shared"

export type TopicGroup = {
  id: string
  title: string
  problems: PracticeProblem[]
}

const MOCK_PROBLEM_HREF = "/problem/two-sum"

export function buildGroups(problems: PracticeProblem[]): TopicGroup[] {
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

export function ProblemTable({
  group,
  solved,
  onToggle,
}: {
  group: TopicGroup
  solved: Set<string>
  onToggle: (id: string) => void
}) {
  const [open, setOpen] = useState(true)

  if (group.problems.length === 0) return null
  const solvedCount = group.problems.reduce(
    (n, p) => n + (solved.has(p.id) ? 1 : 0),
    0
  )

  return (
    <section aria-label={group.title} className={cn(cardClass, "p-0")}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="relative flex h-9 w-full shrink-0 items-center justify-between gap-2 border-b border-border/40 bg-background/30 pr-3 pl-3 transition-colors hover:bg-muted/30"
      >
        <div className="flex items-center gap-2">
          <IconChevronDown
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
              !open && "-rotate-90"
            )}
          />
          <h3 className="text-sm font-semibold tracking-[-0.01em] text-foreground">
            {group.title}
          </h3>
        </div>
        <span className="font-mono text-[11px] tracking-[0.02em] text-muted-foreground">
          {solvedCount}/{group.problems.length}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
      <div className="overflow-hidden">
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
      </div>
      </div>
    </section>
  )
}
