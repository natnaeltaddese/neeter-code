"use client"

import { useCallback, useMemo, useState } from "react"
import {
  IconBrain,
  IconChevronRight,
  IconCpu,
  IconDownload,
  IconFile,
  IconFolder,
  IconFolderOpen,
  IconServer,
} from "@tabler/icons-react"
import pythonIcon from "thesvg/python"
import markdownIcon from "thesvg/markdown"
import githubIcon from "thesvg/github"
import { cn } from "@/lib/utils"
import { CalendarCard } from "./practice-dashboard/right-rail"
import {
  ProblemTable,
  type TopicGroup,
} from "./practice-dashboard/problem-table"
import {
  CardSheen,
  cardClass,
  arcPath,
  polar,
} from "./practice-dashboard/shared"
import type { PracticeProblem } from "@/lib/practice"

// ---- svg icon helper ----

function SvgIcon({ svg, color, size = 14 }: { svg: string; color: string; size?: number }) {
  const html = svg.replace("<svg ", `<svg fill="${color}" width="${size}" height="${size}" `)
  return <span className="inline-flex shrink-0" dangerouslySetInnerHTML={{ __html: html }} />
}

// ---- data ----

const GPT_SECTIONS = [
  { id: "math", label: "Math Foundations", total: 6 },
  { id: "neural-net", label: "Build a Neural Net", total: 5 },
  { id: "pytorch", label: "PyTorch", total: 4 },
  { id: "training", label: "Training", total: 4 },
  { id: "nlp", label: "NLP", total: 4 },
  { id: "transformers", label: "Attention & Transformers", total: 3 },
  { id: "build-gpt", label: "Build GPT", total: 10 },
] as const

type SectionId = (typeof GPT_SECTIONS)[number]["id"]

const GPT_PROBLEMS: PracticeProblem[] = [
  // Math Foundations
  {
    id: "gpt-m1",
    number: 1,
    title: "Gradient Descent",
    difficulty: "Easy",
    topicId: "math",
    pattern: "Optimization",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-m2",
    number: 2,
    title: "Sigmoid And Relu",
    difficulty: "Easy",
    topicId: "math",
    pattern: "Activations",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-m3",
    number: 3,
    title: "Softmax",
    difficulty: "Easy",
    topicId: "math",
    pattern: "Activations",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-m4",
    number: 4,
    title: "Cross Entropy Loss",
    difficulty: "Medium",
    topicId: "math",
    pattern: "Loss Functions",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-m5",
    number: 5,
    title: "Linear Regression Forward",
    difficulty: "Medium",
    topicId: "math",
    pattern: "Regression",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-m6",
    number: 6,
    title: "Linear Regression Training",
    difficulty: "Medium",
    topicId: "math",
    pattern: "Regression",
    tags: [],
    companies: [],
    listIds: [],
  },
  // Build a Neural Net
  {
    id: "gpt-n1",
    number: 7,
    title: "Single Neuron",
    difficulty: "Easy",
    topicId: "neural-net",
    pattern: "Forward Pass",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-n2",
    number: 8,
    title: "Backpropagation",
    difficulty: "Hard",
    topicId: "neural-net",
    pattern: "Backprop",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-n3",
    number: 9,
    title: "Multi Layer Backpropagation",
    difficulty: "Hard",
    topicId: "neural-net",
    pattern: "Backprop",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-n4",
    number: 10,
    title: "Mlp From Scratch",
    difficulty: "Hard",
    topicId: "neural-net",
    pattern: "Backprop",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-n5",
    number: 11,
    title: "Weight Initialization",
    difficulty: "Medium",
    topicId: "neural-net",
    pattern: "Initialization",
    tags: [],
    companies: [],
    listIds: [],
  },
  // PyTorch
  {
    id: "gpt-p1",
    number: 12,
    title: "Basics Of Pytorch",
    difficulty: "Easy",
    topicId: "pytorch",
    pattern: "Tensors",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-p2",
    number: 13,
    title: "Layer Normalization",
    difficulty: "Medium",
    topicId: "pytorch",
    pattern: "Normalization",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-p3",
    number: 14,
    title: "Batch Normalization",
    difficulty: "Medium",
    topicId: "pytorch",
    pattern: "Normalization",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-p4",
    number: 15,
    title: "Rms Normalization",
    difficulty: "Medium",
    topicId: "pytorch",
    pattern: "Normalization",
    tags: [],
    companies: [],
    listIds: [],
  },
  // Training
  {
    id: "gpt-t1",
    number: 16,
    title: "Training Loop",
    difficulty: "Medium",
    topicId: "training",
    pattern: "Training",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-t2",
    number: 17,
    title: "Training Diagnostics",
    difficulty: "Medium",
    topicId: "training",
    pattern: "Training",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-t3",
    number: 18,
    title: "Dead Relu Detector",
    difficulty: "Medium",
    topicId: "training",
    pattern: "Debugging",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-t4",
    number: 19,
    title: "Handwritten Digit Classifier",
    difficulty: "Hard",
    topicId: "training",
    pattern: "Debugging",
    tags: [],
    companies: [],
    listIds: [],
  },
  // NLP
  {
    id: "gpt-l1",
    number: 20,
    title: "Word Embeddings",
    difficulty: "Easy",
    topicId: "nlp",
    pattern: "Embeddings",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-l2",
    number: 21,
    title: "Nlp Intro",
    difficulty: "Easy",
    topicId: "nlp",
    pattern: "Text Processing",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-l3",
    number: 22,
    title: "Sentiment Analysis",
    difficulty: "Medium",
    topicId: "nlp",
    pattern: "Text Processing",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-l4",
    number: 23,
    title: "Positional Encoding",
    difficulty: "Medium",
    topicId: "nlp",
    pattern: "Embeddings",
    tags: [],
    companies: [],
    listIds: [],
  },
  // Attention & Transformers
  {
    id: "gpt-a1",
    number: 24,
    title: "Self Attention",
    difficulty: "Hard",
    topicId: "transformers",
    pattern: "Attention",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-a2",
    number: 25,
    title: "Multi Headed Self Attention",
    difficulty: "Hard",
    topicId: "transformers",
    pattern: "Attention",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-a3",
    number: 26,
    title: "Transformer Block",
    difficulty: "Hard",
    topicId: "transformers",
    pattern: "Transformer",
    tags: [],
    companies: [],
    listIds: [],
  },
  // Build GPT
  {
    id: "gpt-g1",
    number: 27,
    title: "Tokenizer Bpe",
    difficulty: "Medium",
    topicId: "build-gpt",
    pattern: "Tokenization",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-g2",
    number: 28,
    title: "Build Vocabulary",
    difficulty: "Medium",
    topicId: "build-gpt",
    pattern: "Tokenization",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-g3",
    number: 29,
    title: "Tokenization Edge Cases",
    difficulty: "Medium",
    topicId: "build-gpt",
    pattern: "Tokenization",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-g4",
    number: 30,
    title: "Gpt Data Loader",
    difficulty: "Medium",
    topicId: "build-gpt",
    pattern: "Data Pipeline",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-g5",
    number: 31,
    title: "Gpt Dataset",
    difficulty: "Medium",
    topicId: "build-gpt",
    pattern: "Data Pipeline",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-g6",
    number: 32,
    title: "Code Gpt",
    difficulty: "Hard",
    topicId: "build-gpt",
    pattern: "Architecture",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-g7",
    number: 33,
    title: "Train Your Gpt",
    difficulty: "Hard",
    topicId: "build-gpt",
    pattern: "Training",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-g8",
    number: 34,
    title: "Make Gpt Talk Back",
    difficulty: "Hard",
    topicId: "build-gpt",
    pattern: "Inference",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-g9",
    number: 35,
    title: "Kv Cache",
    difficulty: "Hard",
    topicId: "build-gpt",
    pattern: "Inference",
    tags: [],
    companies: [],
    listIds: [],
  },
  {
    id: "gpt-g10",
    number: 36,
    title: "Grouped Query Attention",
    difficulty: "Hard",
    topicId: "build-gpt",
    pattern: "Inference",
    tags: [],
    companies: [],
    listIds: [],
  },
]

function problemsBySection(id: SectionId): PracticeProblem[] {
  return GPT_PROBLEMS.filter((p) => p.topicId === id)
}

// ---- gauge ----

function GptGauge({
  solved,
  total,
  size = 128,
}: {
  solved: number
  total: number
  size?: number
}) {
  const cx = 60,
    cy = 60,
    r = 46
  const startAngle = 135,
    sweep = 270
  const arcEnd = startAngle + sweep
  const fillEnd =
    startAngle + (total > 0 ? Math.min(solved / total, 1) : 0) * sweep
  const trackStart = polar(cx, cy, r, startAngle)
  const fillEndPt = polar(cx, cy, r, fillEnd)

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-label={`${solved} of ${total} problems solved`}
    >
      <svg viewBox="0 0 120 120" className="size-full">
        <path
          d={arcPath(cx, cy, r, startAngle, arcEnd)}
          fill="none"
          stroke="rgb(137 100 255)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.18"
        />
        {solved > 0 && (
          <path
            d={arcPath(cx, cy, r, startAngle, fillEnd)}
            fill="none"
            stroke="rgb(137 100 255)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
        <circle
          cx={trackStart.x}
          cy={trackStart.y}
          r="3.5"
          fill="rgb(137 100 255)"
          opacity="0.4"
        />
        <circle
          cx={fillEndPt.x}
          cy={fillEndPt.y}
          r="3.5"
          fill="rgb(137 100 255)"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-3xl leading-none font-bold tracking-[-0.03em] tabular-nums">
          {solved}
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

// ---- gauge card ----

function GaugeCard({
  solved,
  total,
  sections,
  solvedMap,
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
          <h3 className="text-sm font-semibold tracking-[-0.01em]">
            Build Your GPT
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-between gap-4">
          <div className="flex min-w-[130px] flex-col gap-2">
            {sections.map((s) => {
              const done = solvedMap[s.id] ?? 0
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-2 font-mono text-[11px]"
                >
                  <span className="truncate text-muted-foreground">
                    {s.label}
                  </span>
                  <span className="shrink-0 text-muted-foreground tabular-nums">
                    {done}/{s.total}
                  </span>
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
  label,
  solved,
  total,
  active,
  onClick,
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
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/10 to-transparent opacity-90"
      />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h4 className="truncate text-sm font-semibold tracking-[-0.02em]">
            {label}
          </h4>
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
            {solved}/{total}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border/60 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </button>
  )
}

// ---- tracker panel ----

function TrackerPanel({
  solvedIds,
  onToggle,
}: {
  solvedIds: Set<string>
  onToggle: (id: string) => void
}) {
  const [activeId, setActiveId] = useState<SectionId>("math")

  const solvedMap = useMemo(() => {
    const map = {} as Record<SectionId, number>
    for (const s of GPT_SECTIONS) {
      map[s.id] = problemsBySection(s.id).filter((p) =>
        solvedIds.has(p.id)
      ).length
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
          <h2 className="font-heading text-2xl leading-tight font-bold tracking-[-0.03em] sm:text-3xl">
            Build Your GPT
            <span className="text-primary"> Project Tracker</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Complete all ML problems and your submissions assemble into a
            working GPT that generates text. Your code. Your project. Your
            GitHub.
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
        <ProblemTable
          group={activeGroup}
          solved={solvedIds}
          onToggle={onToggle}
        />
      </div>
    </div>
  )
}

// ---- file tree ----

type FileEntry = {
  kind: "file"
  name: string
  problemId?: string
  auto?: boolean
  label?: string
}

type FolderEntry = {
  kind: "folder"
  name: string
  defaultOpen?: boolean
  children: TreeEntry[]
}

type TreeEntry = FileEntry | FolderEntry

const FILE_TREE: FolderEntry = {
  kind: "folder",
  name: "neetcode-gpt/",
  defaultOpen: true,
  children: [
    { kind: "file", name: "README.md",        auto: true },
    { kind: "file", name: "requirements.txt", auto: true },
    {
      kind: "folder", name: "foundations/", defaultOpen: false,
      children: [
        { kind: "file", name: "gradient_descent.py",       problemId: "gpt-m1", label: "Gradient descent" },
        { kind: "file", name: "sigmoid_relu.py",            problemId: "gpt-m2", label: "Sigmoid and ReLU" },
        { kind: "file", name: "softmax.py",                 problemId: "gpt-m3", label: "Softmax" },
        { kind: "file", name: "cross_entropy.py",           problemId: "gpt-m4", label: "Cross entropy loss" },
        { kind: "file", name: "linear_regression.py",       problemId: "gpt-m5", label: "Linear regression forward" },
        { kind: "file", name: "linear_regression_train.py", problemId: "gpt-m6", label: "Linear regression training" },
        { kind: "file", name: "single_neuron.py",           problemId: "gpt-n1", label: "Single neuron" },
        { kind: "file", name: "backprop.py",                problemId: "gpt-n2", label: "Backpropagation" },
        { kind: "file", name: "multi_layer_backprop.py",    problemId: "gpt-n3", label: "Multi layer backpropagation" },
        { kind: "file", name: "mlp.py",                     problemId: "gpt-n4", label: "MLP from scratch" },
        { kind: "file", name: "weight_init.py",             problemId: "gpt-n5", label: "Weight initialization" },
        { kind: "file", name: "pytorch_basics.py",          problemId: "gpt-p1", label: "Basics of PyTorch" },
        { kind: "file", name: "training_loop.py",           problemId: "gpt-t1", label: "Training loop" },
        { kind: "file", name: "diagnostics.py",             problemId: "gpt-t2", label: "Training diagnostics" },
        { kind: "file", name: "dead_relu.py",               problemId: "gpt-t3", label: "Dead ReLU detector" },
        { kind: "file", name: "mnist.py",                   problemId: "gpt-t4", label: "Handwritten digit classifier" },
        { kind: "file", name: "nlp_intro.py",               problemId: "gpt-l2", label: "NLP intro" },
        { kind: "file", name: "sentiment_analysis.py",      problemId: "gpt-l3", label: "Sentiment analysis" },
        { kind: "file", name: "train.py",                   problemId: "gpt-g7", label: "GPT training loop" },
        { kind: "file", name: "generate.py",                problemId: "gpt-g8", label: "Text generation" },
      ],
    },
    {
      kind: "folder", name: "model/", defaultOpen: true,
      children: [
        { kind: "file", name: "normalization.py",           problemId: "gpt-p2", label: "Layer normalization" },
        { kind: "file", name: "batch_normalization.py",     problemId: "gpt-p3", label: "Batch normalization" },
        { kind: "file", name: "rms_normalization.py",       problemId: "gpt-p4", label: "RMS normalization" },
        { kind: "file", name: "embeddings.py",              problemId: "gpt-l1", label: "Word embeddings" },
        { kind: "file", name: "positional_encoding.py",     problemId: "gpt-l4", label: "Positional encoding" },
        { kind: "file", name: "attention.py",               problemId: "gpt-a1", label: "Self-attention head" },
        { kind: "file", name: "multi_head_attention.py",    problemId: "gpt-a2", label: "Multi-headed self-attention" },
        { kind: "file", name: "transformer.py",             problemId: "gpt-a3", label: "Transformer block" },
        { kind: "file", name: "gpt.py",                     problemId: "gpt-g6", label: "GPT model" },
        { kind: "file", name: "kv_cache.py",                problemId: "gpt-g9", label: "KV-Cache for fast inference" },
        { kind: "file", name: "grouped_query_attention.py", problemId: "gpt-g10", label: "Grouped query attention" },
      ],
    },
    {
      kind: "folder", name: "data/", defaultOpen: false,
      children: [
        { kind: "file", name: "tokenizer.py",  problemId: "gpt-g1", label: "Tokenizer BPE" },
        { kind: "file", name: "vocabulary.py", problemId: "gpt-g2", label: "Build vocabulary" },
        { kind: "file", name: "edge_cases.py", problemId: "gpt-g3", label: "Tokenization edge cases" },
        { kind: "file", name: "dataloader.py", problemId: "gpt-g4", label: "GPT data loader" },
        { kind: "file", name: "dataset.py",    problemId: "gpt-g5", label: "GPT dataset" },
      ],
    },
  ],
}

function FileRow({
  entry,
  depth,
  solvedIds,
}: {
  entry: FileEntry
  depth: number
  solvedIds: Set<string>
}) {
  const solved = !!entry.problemId && solvedIds.has(entry.problemId)
  const solvedColor = "#10b981"
  const mutedColor = "#6b7280"
  const FileIcon = entry.name.endsWith(".py")
    ? <SvgIcon svg={pythonIcon.variants.mono} color={solved ? solvedColor : "#3776AB"} />
    : entry.name.endsWith(".md")
    ? <SvgIcon svg={markdownIcon.variants.mono} color={solved ? solvedColor : mutedColor} />
    : <IconFile className="size-3.5 shrink-0" style={{ color: solved ? solvedColor : mutedColor }} />

  return (
    <div
      className="flex items-center gap-2 py-1.5 pr-4 transition-colors hover:bg-zinc-200/60 dark:hover:bg-white/[0.04]"
      style={{ paddingLeft: `${depth * 1.25 + 1}rem` }}
    >
      <span className="shrink-0">{FileIcon}</span>
      <span
        className={cn(
          "flex-1 font-mono text-[13px]",
          solved ? "text-emerald-500" : "text-foreground/80"
        )}
      >
        {entry.name}
      </span>
      {entry.auto ? (
        <span className="rounded border border-border/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          auto-generated
        </span>
      ) : entry.label ? (
        <span className="font-mono text-[12px] text-muted-foreground">
          {entry.label}
        </span>
      ) : null}
    </div>
  )
}

function FolderRow({
  entry,
  depth,
  solvedIds,
}: {
  entry: FolderEntry
  depth: number
  solvedIds: Set<string>
}) {
  const [open, setOpen] = useState(entry.defaultOpen ?? false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-1.5 py-1.5 pr-4 transition-colors hover:bg-zinc-200/60 dark:hover:bg-white/[0.04]"
        style={{ paddingLeft: `${depth * 1.25 + 0.25}rem` }}
      >
        <IconChevronRight
          className={cn(
            "size-3.5 shrink-0 text-muted-foreground/50 transition-transform duration-150",
            open && "rotate-90"
          )}
        />
        {open ? (
          <IconFolderOpen className="size-3.5 shrink-0 text-blue-400" />
        ) : (
          <IconFolder className="size-3.5 shrink-0 text-blue-400" />
        )}
        <span className="font-mono text-[13px] font-medium">{entry.name}</span>
      </button>
      {open &&
        entry.children.map((child, i) =>
          child.kind === "file" ? (
            <FileRow key={i} entry={child} depth={depth + 1} solvedIds={solvedIds} />
          ) : (
            <FolderRow key={i} entry={child} depth={depth + 1} solvedIds={solvedIds} />
          )
        )}
    </div>
  )
}

function ProjectTreeCard({ solvedIds }: { solvedIds: Set<string> }) {
  const root = FILE_TREE
  const [rootOpen, setRootOpen] = useState(true)

  return (
    <div className={cn(cardClass, "overflow-hidden")}>
      {/* card header */}
      <div className="relative flex items-start justify-between gap-4 px-5 py-4">
        <div>
          <h2 className="font-heading text-xl font-bold tracking-[-0.03em]">
            Your Project
          </h2>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            Each file maps to a problem you solved. Green means your code is
            ready.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <SvgIcon svg={githubIcon.variants.mono} color="currentColor" size={16} />
          Connect GitHub
        </button>
      </div>

      {/* ruler */}
      <hr className="border-border/60" />

      {/* dark tree area */}
      <div className="bg-zinc-100 dark:bg-zinc-950">
        {/* root folder header */}
        <button
          type="button"
          onClick={() => setRootOpen((o) => !o)}
          className="flex w-full items-center gap-1.5 border-b border-zinc-200 px-4 py-2 transition-colors hover:bg-zinc-200/60 dark:border-white/[0.06] dark:hover:bg-white/[0.04]"
        >
          <IconChevronRight
            className={cn(
              "size-3.5 shrink-0 text-zinc-400 transition-transform duration-150 dark:text-white/30",
              rootOpen && "rotate-90"
            )}
          />
          <IconFolderOpen className="size-3.5 shrink-0 text-blue-400" />
          <span className="font-mono text-[13px] font-semibold text-zinc-700 dark:text-white/80">{root.name}</span>
        </button>

        {/* tree body */}
        {rootOpen && (
          <div className="divide-y divide-zinc-200 dark:divide-white/[0.05]">
            {root.children.map((child, i) =>
              child.kind === "file" ? (
                <FileRow key={i} entry={child} depth={1} solvedIds={solvedIds} />
              ) : (
                <FolderRow key={i} entry={child} depth={1} solvedIds={solvedIds} />
              )
            )}
          </div>
        )}

        {/* download footer */}
        <div className="flex items-center justify-between gap-4 border-t border-zinc-200 px-4 py-3 dark:border-white/[0.06]">
          <div>
            <p className="text-[13px] font-medium text-zinc-700 dark:text-white/70">
              Download project
            </p>
            <p className="text-[11px] text-zinc-400 dark:text-white/30">
              Only includes files you've solved
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-zinc-200 px-3 py-1.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-300 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/70 dark:hover:bg-white/10"
          >
            <IconDownload className="size-3.5" />
            .zip
          </button>
        </div>
      </div>
    </div>
  )
}

// ---- continue your journey ----

const NEXT_TRACKS = [
  {
    title: "Training at Scale",
    description:
      "Scale your GPT to multiple GPUs with DDP, ZeRO, mixed precision, RLHF, and more",
    problems: 12,
    dot: "bg-violet-500",
    iconColor: "text-violet-400",
    Icon: IconServer,
  },
  {
    title: "GPU Programming",
    description:
      "Write CUDA kernels from scratch — vector ops, shared memory, Flash Attention",
    problems: 15,
    dot: "bg-cyan-500",
    iconColor: "text-cyan-400",
    Icon: IconCpu,
  },
] as const

function ContinueJourney() {
  return (
    <div className={cn(cardClass, "p-5 sm:p-6")}>
      <CardSheen />
      <div className="relative flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold tracking-[-0.03em]">
            Continue Your Journey
          </h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            After building your GPT, go deeper with advanced tracks
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {NEXT_TRACKS.map((track) => (
            <div
              key={track.title}
              className={cn(
                cardClass,
                "relative flex items-start gap-4 p-4 opacity-60 cursor-not-allowed select-none"
              )}
            >
              <div className={cn("relative mt-0.5 shrink-0 rounded-lg border border-border/50 p-2", track.iconColor)}>
                <track.Icon className="size-4" />
              </div>
              <div className="relative flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold tracking-[-0.02em]">
                    {track.title}
                  </h3>
                  <span className="shrink-0 rounded border border-border/60 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                    Coming Soon
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {track.description}
                </p>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <span className={cn("size-1.5 rounded-full", track.dot)} />
                  {track.problems} problems
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---- root ----

export function BuildGptDashboard() {
  const [solvedIds, setSolvedIds] = useState<Set<string>>(
    () =>
      new Set([
        "gpt-m1",
        "gpt-m2",
        "gpt-m3",
        "gpt-n1",
        "gpt-n2",
        "gpt-p1",
        "gpt-t1",
        "gpt-l1",
        "gpt-g1",
        "gpt-g2",
      ])
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
      map[s.id] = problemsBySection(s.id).filter((p) =>
        solvedIds.has(p.id)
      ).length
    }
    return map
  }, [solvedIds])

  const totalProblems = GPT_SECTIONS.reduce((n, s) => n + s.total, 0)
  const totalSolved = Object.values(solvedMap).reduce((a, b) => a + b, 0)

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex min-w-0 flex-col gap-4">
        <TrackerPanel solvedIds={solvedIds} onToggle={toggle} />
        <ProjectTreeCard solvedIds={solvedIds} />
        <ContinueJourney />
      </div>
      <div className="flex flex-col gap-4">
        <GaugeCard
          solved={totalSolved}
          total={totalProblems}
          sections={GPT_SECTIONS}
          solvedMap={solvedMap}
        />
        <CalendarCard />
      </div>
    </div>
  )
}
