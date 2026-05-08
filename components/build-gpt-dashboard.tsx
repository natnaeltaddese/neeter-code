"use client"

import { useCallback, useMemo, useState } from "react"
import { IconBrain } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { CalendarCard } from "./practice-dashboard/right-rail"
import { ProblemTable, type TopicGroup } from "./practice-dashboard/problem-table"
import { CardSheen, cardClass, arcPath, polar } from "./practice-dashboard/shared"
import type { PracticeProblem } from "@/lib/practice"

// ---- data ----

const GPT_SECTIONS = [
  { id: "math",         label: "Math Foundations",        total: 6 },
  { id: "neural-net",   label: "Build a Neural Net",       total: 5 },
  { id: "pytorch",      label: "PyTorch",                  total: 4 },
  { id: "training",     label: "Training",                 total: 4 },
  { id: "nlp",          label: "NLP",                      total: 4 },
  { id: "transformers", label: "Attention & Transformers",  total: 3 },
  { id: "build-gpt",    label: "Build GPT",                total: 10 },
] as const

type SectionId = (typeof GPT_SECTIONS)[number]["id"]

const GPT_PROBLEMS: PracticeProblem[] = [
  // Math Foundations
  { id: "gpt-m1", number: 1,  title: "Matrix Multiplication",      difficulty: "Easy",   topicId: "math",         pattern: "Linear Algebra",  tags: [], companies: [], listIds: [] },
  { id: "gpt-m2", number: 2,  title: "Dot Product & Cosine Sim",   difficulty: "Easy",   topicId: "math",         pattern: "Linear Algebra",  tags: [], companies: [], listIds: [] },
  { id: "gpt-m3", number: 3,  title: "Gradient & Partial Deriv",   difficulty: "Medium", topicId: "math",         pattern: "Calculus",        tags: [], companies: [], listIds: [] },
  { id: "gpt-m4", number: 4,  title: "Chain Rule",                 difficulty: "Medium", topicId: "math",         pattern: "Calculus",        tags: [], companies: [], listIds: [] },
  { id: "gpt-m5", number: 5,  title: "Probability & Distributions", difficulty: "Medium", topicId: "math",        pattern: "Probability",     tags: [], companies: [], listIds: [] },
  { id: "gpt-m6", number: 6,  title: "Softmax & Cross-Entropy",    difficulty: "Medium", topicId: "math",         pattern: "Probability",     tags: [], companies: [], listIds: [] },
  // Build a Neural Net
  { id: "gpt-n1", number: 7,  title: "Linear Layer",               difficulty: "Easy",   topicId: "neural-net",   pattern: "Forward Pass",    tags: [], companies: [], listIds: [] },
  { id: "gpt-n2", number: 8,  title: "Activation Functions",       difficulty: "Easy",   topicId: "neural-net",   pattern: "Forward Pass",    tags: [], companies: [], listIds: [] },
  { id: "gpt-n3", number: 9,  title: "Forward Pass",               difficulty: "Medium", topicId: "neural-net",   pattern: "Forward Pass",    tags: [], companies: [], listIds: [] },
  { id: "gpt-n4", number: 10, title: "Backpropagation",            difficulty: "Hard",   topicId: "neural-net",   pattern: "Backprop",        tags: [], companies: [], listIds: [] },
  { id: "gpt-n5", number: 11, title: "MLP from Scratch",           difficulty: "Hard",   topicId: "neural-net",   pattern: "Backprop",        tags: [], companies: [], listIds: [] },
  // PyTorch
  { id: "gpt-p1", number: 12, title: "Tensors & Operations",       difficulty: "Easy",   topicId: "pytorch",      pattern: "Tensors",         tags: [], companies: [], listIds: [] },
  { id: "gpt-p2", number: 13, title: "Autograd",                   difficulty: "Medium", topicId: "pytorch",      pattern: "Autograd",        tags: [], companies: [], listIds: [] },
  { id: "gpt-p3", number: 14, title: "Custom Dataset & DataLoader", difficulty: "Medium", topicId: "pytorch",     pattern: "Data Pipeline",   tags: [], companies: [], listIds: [] },
  { id: "gpt-p4", number: 15, title: "Training Loop",              difficulty: "Medium", topicId: "pytorch",      pattern: "Training",        tags: [], companies: [], listIds: [] },
  // Training
  { id: "gpt-t1", number: 16, title: "Stochastic Gradient Descent", difficulty: "Medium", topicId: "training",    pattern: "Optimizers",      tags: [], companies: [], listIds: [] },
  { id: "gpt-t2", number: 17, title: "Adam Optimizer",             difficulty: "Medium", topicId: "training",     pattern: "Optimizers",      tags: [], companies: [], listIds: [] },
  { id: "gpt-t3", number: 18, title: "Learning Rate Scheduling",   difficulty: "Medium", topicId: "training",     pattern: "Regularization",  tags: [], companies: [], listIds: [] },
  { id: "gpt-t4", number: 19, title: "Batch Norm & Dropout",       difficulty: "Hard",   topicId: "training",     pattern: "Regularization",  tags: [], companies: [], listIds: [] },
  // NLP
  { id: "gpt-l1", number: 20, title: "Tokenization",               difficulty: "Easy",   topicId: "nlp",          pattern: "Text Processing", tags: [], companies: [], listIds: [] },
  { id: "gpt-l2", number: 21, title: "Word Embeddings",            difficulty: "Medium", topicId: "nlp",          pattern: "Embeddings",      tags: [], companies: [], listIds: [] },
  { id: "gpt-l3", number: 22, title: "Positional Encoding",        difficulty: "Medium", topicId: "nlp",          pattern: "Embeddings",      tags: [], companies: [], listIds: [] },
  { id: "gpt-l4", number: 23, title: "Language Model Loss",        difficulty: "Medium", topicId: "nlp",          pattern: "Text Processing", tags: [], companies: [], listIds: [] },
  // Attention & Transformers
  { id: "gpt-a1", number: 24, title: "Scaled Dot-Product Attention", difficulty: "Hard", topicId: "transformers", pattern: "Attention",       tags: [], companies: [], listIds: [] },
  { id: "gpt-a2", number: 25, title: "Multi-Head Attention",       difficulty: "Hard",   topicId: "transformers", pattern: "Attention",       tags: [], companies: [], listIds: [] },
  { id: "gpt-a3", number: 26, title: "Transformer Block",          difficulty: "Hard",   topicId: "transformers", pattern: "Transformer",     tags: [], companies: [], listIds: [] },
  // Build GPT
  { id: "gpt-g1",  number: 27, title: "GPT Tokenizer",             difficulty: "Medium", topicId: "build-gpt",    pattern: "Architecture",    tags: [], companies: [], listIds: [] },
  { id: "gpt-g2",  number: 28, title: "Token & Position Embeddings", difficulty: "Medium", topicId: "build-gpt",  pattern: "Architecture",    tags: [], companies: [], listIds: [] },
  { id: "gpt-g3",  number: 29, title: "Causal Self-Attention",     difficulty: "Hard",   topicId: "build-gpt",    pattern: "Architecture",    tags: [], companies: [], listIds: [] },
  { id: "gpt-g4",  number: 30, title: "Feed-Forward Block",        difficulty: "Medium", topicId: "build-gpt",    pattern: "Architecture",    tags: [], companies: [], listIds: [] },
  { id: "gpt-g5",  number: 31, title: "Layer Norm",                difficulty: "Medium", topicId: "build-gpt",    pattern: "Architecture",    tags: [], companies: [], listIds: [] },
  { id: "gpt-g6",  number: 32, title: "GPT Block Stack",           difficulty: "Hard",   topicId: "build-gpt",    pattern: "Architecture",    tags: [], companies: [], listIds: [] },
  { id: "gpt-g7",  number: 33, title: "Language Model Head",       difficulty: "Medium", topicId: "build-gpt",    pattern: "Training",        tags: [], companies: [], listIds: [] },
  { id: "gpt-g8",  number: 34, title: "Pre-training Loop",         difficulty: "Hard",   topicId: "build-gpt",    pattern: "Training",        tags: [], companies: [], listIds: [] },
  { id: "gpt-g9",  number: 35, title: "Text Generation / Sampling", difficulty: "Hard",  topicId: "build-gpt",    pattern: "Inference",       tags: [], companies: [], listIds: [] },
  { id: "gpt-g10", number: 36, title: "Export to GitHub",          difficulty: "Medium", topicId: "build-gpt",    pattern: "Inference",       tags: [], companies: [], listIds: [] },
]

function problemsBySection(id: SectionId): PracticeProblem[] {
  return GPT_PROBLEMS.filter((p) => p.topicId === id)
}

// ---- gauge ----

function GptGauge({ solved, total, size = 128 }: { solved: number; total: number; size?: number }) {
  const cx = 60, cy = 60, r = 46
  const startAngle = 135, sweep = 270
  const arcEnd = startAngle + sweep
  const fillEnd = startAngle + (total > 0 ? Math.min(solved / total, 1) : 0) * sweep
  const trackStart = polar(cx, cy, r, startAngle)
  const fillEndPt = polar(cx, cy, r, fillEnd)

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-label={`${solved} of ${total} problems solved`}
    >
      <svg viewBox="0 0 120 120" className="size-full">
        <path d={arcPath(cx, cy, r, startAngle, arcEnd)} fill="none" stroke="rgb(137 100 255)" strokeWidth="6" strokeLinecap="round" opacity="0.18" />
        {solved > 0 && (
          <path d={arcPath(cx, cy, r, startAngle, fillEnd)} fill="none" stroke="rgb(137 100 255)" strokeWidth="6" strokeLinecap="round" />
        )}
        <circle cx={trackStart.x} cy={trackStart.y} r="3.5" fill="rgb(137 100 255)" opacity="0.4" />
        <circle cx={fillEndPt.x} cy={fillEndPt.y} r="3.5" fill="rgb(137 100 255)" />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-3xl leading-none font-bold tracking-[-0.03em] tabular-nums">{solved}</span>
        <span className="mt-1 font-mono text-[10px] leading-tight text-muted-foreground">/{total}</span>
        <span className="mt-0.5 text-[10px] leading-tight text-muted-foreground">Solved</span>
      </div>
    </div>
  )
}

// ---- gauge card ----

function GaugeCard({
  solved, total, sections, solvedMap,
}: {
  solved: number
  total: number
  sections: typeof GPT_SECTIONS
  solvedMap: Record<SectionId, number>
}) {
  return (
    <div className={cn(cardClass, "p-5")}>
      <CardSheen />
      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <IconBrain className="size-4 text-primary" />
          <h3 className="text-sm font-semibold tracking-[-0.01em]">Build Your GPT</h3>
        </div>
        <div className="flex flex-1 items-center justify-between gap-4">
          <div className="flex min-w-[130px] flex-col gap-2">
            {sections.map((s) => {
              const done = solvedMap[s.id] ?? 0
              return (
                <div key={s.id} className="flex items-center justify-between gap-2 font-mono text-[11px]">
                  <span className="truncate text-muted-foreground">{s.label}</span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">{done}/{s.total}</span>
                </div>
              )
            })}
          </div>
          <GptGauge solved={solved} total={total} size={128} />
        </div>
      </div>
    </div>
  )
}

// ---- section selector card ----

function SectionCard({
  label, solved, total, active, onClick,
}: {
  label: string
  solved: number
  total: number
  active: boolean
  onClick: () => void
}) {
  const percent = total > 0 ? (solved / total) * 100 : 0

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        cardClass,
        "group flex flex-col p-3 text-left",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-border/70 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.32)]",
        active && "border-primary/50"
      )}
    >
      <CardSheen />
      <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/10 to-transparent opacity-90" />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h4 className="truncate text-sm font-semibold tracking-[-0.02em]">{label}</h4>
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">{solved}/{total}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border/60 dark:bg-white/10">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </button>
  )
}

// ---- tracker panel ----

function TrackerPanel({
  solvedIds, onToggle,
}: {
  solvedIds: Set<string>
  onToggle: (id: string) => void
}) {
  const [activeId, setActiveId] = useState<SectionId>("math")

  const solvedMap = useMemo(() => {
    const map = {} as Record<SectionId, number>
    for (const s of GPT_SECTIONS) {
      map[s.id] = problemsBySection(s.id).filter((p) => solvedIds.has(p.id)).length
    }
    return map
  }, [solvedIds])

  const activeGroup = useMemo<TopicGroup>(() => {
    const s = GPT_SECTIONS.find((s) => s.id === activeId)!
    return { id: s.id, title: s.label, problems: problemsBySection(s.id) }
  }, [activeId])

  return (
    <div className={cn(cardClass, "p-5 sm:p-6")}>
      <CardSheen />
      <div className="relative flex flex-col gap-5">
        {/* header */}
        <div>
          <h2 className="font-heading text-2xl font-bold leading-tight tracking-[-0.03em] sm:text-3xl">
            Build Your GPT
            <span className="text-primary"> — Project Tracker</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Complete all ML problems and your submissions assemble into a working
            GPT that generates text. Your code. Your project. Your GitHub.
          </p>
        </div>

        {/* section selector */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {GPT_SECTIONS.map((s) => (
            <SectionCard
              key={s.id}
              label={s.label}
              solved={solvedMap[s.id]}
              total={s.total}
              active={activeId === s.id}
              onClick={() => setActiveId(s.id)}
            />
          ))}
        </div>

        {/* problem list */}
        <ProblemTable group={activeGroup} solved={solvedIds} onToggle={onToggle} />
      </div>
    </div>
  )
}

// ---- root ----

export function BuildGptDashboard() {
  const [solvedIds, setSolvedIds] = useState<Set<string>>(
    () => new Set(["gpt-m1","gpt-m2","gpt-m3","gpt-n1","gpt-n2","gpt-p1","gpt-t1","gpt-l1","gpt-g1","gpt-g2"])
  )

  const toggle = useCallback((id: string) => {
    setSolvedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const solvedMap = useMemo(() => {
    const map = {} as Record<SectionId, number>
    for (const s of GPT_SECTIONS) {
      map[s.id] = problemsBySection(s.id).filter((p) => solvedIds.has(p.id)).length
    }
    return map
  }, [solvedIds])

  const totalProblems = GPT_SECTIONS.reduce((n, s) => n + s.total, 0)
  const totalSolved = Object.values(solvedMap).reduce((a, b) => a + b, 0)

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex min-w-0 flex-col gap-4">
        <TrackerPanel solvedIds={solvedIds} onToggle={toggle} />
      </div>
      <div className="flex flex-col gap-4">
        <GaugeCard solved={totalSolved} total={totalProblems} sections={GPT_SECTIONS} solvedMap={solvedMap} />
        <CalendarCard />
      </div>
    </div>
  )
}
