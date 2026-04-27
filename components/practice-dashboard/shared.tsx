import type { PracticeList, PracticeProblem, Difficulty } from "@/lib/practice"
import { practiceProblems } from "@/lib/practice"
import { cn } from "@/lib/utils"

export const cardClass = cn(
  "relative overflow-hidden rounded-xl border border-border/40 bg-[#f5f5f6]",
  "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
  "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
)

export function CardSheen() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent"
    />
  )
}

type Accent = PracticeList["accent"]

export const ACCENT: Record<
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
    glow:
      "shadow-[0_0_0_1px_rgba(137,100,255,0.35),0_8px_28px_-8px_rgba(137,100,255,0.45)]",
  },
  emerald: {
    text: "text-emerald-500",
    softText: "text-emerald-500/80",
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/60",
    tint: "bg-emerald-500/10",
    glow:
      "shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_8px_28px_-8px_rgba(16,185,129,0.4)]",
  },
  amber: {
    text: "text-amber-500",
    softText: "text-amber-500/80",
    bar: "bg-amber-500",
    dot: "bg-amber-500",
    ring: "ring-amber-500/60",
    tint: "bg-amber-500/10",
    glow:
      "shadow-[0_0_0_1px_rgba(245,158,11,0.35),0_8px_28px_-8px_rgba(245,158,11,0.4)]",
  },
  rose: {
    text: "text-rose-500",
    softText: "text-rose-500/80",
    bar: "bg-rose-500",
    dot: "bg-rose-500",
    ring: "ring-rose-500/60",
    tint: "bg-rose-500/10",
    glow:
      "shadow-[0_0_0_1px_rgba(244,63,94,0.35),0_8px_28px_-8px_rgba(244,63,94,0.4)]",
  },
  cyan: {
    text: "text-cyan-500",
    softText: "text-cyan-500/80",
    bar: "bg-cyan-500",
    dot: "bg-cyan-500",
    ring: "ring-cyan-500/60",
    tint: "bg-cyan-500/10",
    glow:
      "shadow-[0_0_0_1px_rgba(6,182,212,0.35),0_8px_28px_-8px_rgba(6,182,212,0.4)]",
  },
}

export const COLORS = {
  Easy: "rgb(16 185 129)",
  Medium: "rgb(245 158 11)",
  Hard: "rgb(239 68 68)",
} as const

export const DIFF_TEXT: Record<Difficulty, string> = {
  Easy: "text-emerald-500",
  Medium: "text-amber-500",
  Hard: "text-red-500",
}

export type Stats = { Easy: number; Medium: number; Hard: number }

export function emptyStats(): Stats {
  return { Easy: 0, Medium: 0, Hard: 0 }
}

export function tallyDifficulty(problems: PracticeProblem[]): Stats {
  const s = emptyStats()
  for (const p of problems) s[p.difficulty]++
  return s
}

export function tallySolved(
  problems: PracticeProblem[],
  solved: Set<string>
): Stats {
  const s = emptyStats()
  for (const p of problems) {
    if (solved.has(p.id)) s[p.difficulty]++
  }
  return s
}

export function sumStats(s: Stats) {
  return s.Easy + s.Medium + s.Hard
}

export function listProblems(listId: string): PracticeProblem[] {
  return practiceProblems.filter((p) => p.listIds.includes(listId))
}

export function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export function arcPath(
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
