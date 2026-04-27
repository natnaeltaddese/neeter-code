"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

// --- Data ---

type TreeNode = {
  id: string
  children?: TreeNode[]
}

type Topic = {
  title: string
  description: string
  problems: number
  completed: number
}

const topics: Record<string, Topic> = {
  arrays: {
    title: "Arrays & Hashing",
    description: "Hash maps, frequency counting, and array manipulation",
    problems: 9,
    completed: 5,
  },
  "two-pointers": {
    title: "Two Pointers",
    description: "Left/right and fast/slow pointer techniques",
    problems: 5,
    completed: 3,
  },
  stack: {
    title: "Stack",
    description: "Monotonic stacks and parsing algorithms",
    problems: 7,
    completed: 4,
  },
  "sliding-window": {
    title: "Sliding Window",
    description: "Variable and fixed-size window optimization",
    problems: 6,
    completed: 2,
  },
  "linked-list": {
    title: "Linked List",
    description: "Pointer manipulation, reversal, cycle detection",
    problems: 11,
    completed: 4,
  },
  "binary-search": {
    title: "Binary Search",
    description: "Search space reduction and boundary finding",
    problems: 7,
    completed: 3,
  },
  trees: {
    title: "Trees",
    description: "Binary trees, BSTs, and recursive patterns",
    problems: 15,
    completed: 6,
  },
  tries: {
    title: "Tries",
    description: "Prefix trees and string searching",
    problems: 3,
    completed: 0,
  },
  heap: {
    title: "Heap / Priority Queue",
    description: "Top-K patterns and priority-based processing",
    problems: 7,
    completed: 1,
  },
  backtracking: {
    title: "Backtracking",
    description: "Recursive exploration and constraint solving",
    problems: 9,
    completed: 2,
  },
  graphs: {
    title: "Graphs",
    description: "BFS, DFS, topological sort, connectivity",
    problems: 13,
    completed: 3,
  },
  "1d-dp": {
    title: "1-D Dynamic Programming",
    description: "Single-dimension state transitions",
    problems: 12,
    completed: 2,
  },
  "adv-graphs": {
    title: "Advanced Graphs",
    description: "Dijkstra, union-find, spanning trees",
    problems: 6,
    completed: 0,
  },
  "2d-dp": {
    title: "2-D Dynamic Programming",
    description: "Grid-based and two-parameter state problems",
    problems: 11,
    completed: 0,
  },
  greedy: {
    title: "Greedy",
    description: "Optimal substructure and local strategies",
    problems: 8,
    completed: 0,
  },
  intervals: {
    title: "Intervals",
    description: "Merging, scheduling, overlap detection",
    problems: 6,
    completed: 0,
  },
  "math-geo": {
    title: "Math & Geometry",
    description: "Mathematical properties and coordinates",
    problems: 8,
    completed: 0,
  },
  "bit-manipulation": {
    title: "Bit Manipulation",
    description: "Bitwise operations and binary tricks",
    problems: 7,
    completed: 0,
  },
}

const rows: string[][] = [
  ["arrays"],
  ["two-pointers", "stack"],
  ["linked-list", "binary-search", "sliding-window"],
  ["trees"],
  ["tries", "heap", "backtracking"],
  ["graphs"],
  ["adv-graphs", "1d-dp"],
]

const edges: [string, string][] = [
  ["arrays", "two-pointers"],
  ["arrays", "stack"],
  ["two-pointers", "linked-list"],
  ["two-pointers", "sliding-window"],
  ["two-pointers", "binary-search"],
  ["linked-list", "trees"],
  ["binary-search", "trees"],
  ["trees", "tries"],
  ["trees", "heap"],
  ["trees", "backtracking"],
  ["backtracking", "graphs"],
  ["graphs", "adv-graphs"],
  ["graphs", "1d-dp"],
]

// Mobile tree hierarchy (folder-style nesting)
const mobileTree: TreeNode[] = [
  {
    id: "arrays",
    children: [
      {
        id: "two-pointers",
        children: [{ id: "linked-list" }, { id: "sliding-window" }],
      },
      {
        id: "stack",
        children: [{ id: "binary-search" }],
      },
    ],
  },
  {
    id: "trees",
    children: [{ id: "tries" }, { id: "heap" }, { id: "backtracking" }],
  },
  {
    id: "graphs",
    children: [{ id: "adv-graphs" }, { id: "1d-dp" }],
  },
]

// --- Components ---

function MobileTreeBranch({
  nodes,
  depth = 0,
}: {
  nodes: TreeNode[]
  depth?: number
}) {
  const isOnly = nodes.length === 1

  return (
    <div className={cn(depth > 0 && "relative ml-4 pt-3 pl-4")}>
      {/* Vertical line from parent down to first child's connector */}
      {depth > 0 && (
        <div className="absolute top-0 left-0 h-[calc(0.75rem+18px)] w-px bg-border/40" />
      )}

      {nodes.map((node, i) => {
        const topic = topics[node.id]
        const isFirst = i === 0
        const isLast = i === nodes.length - 1

        return (
          <div key={node.id} className={cn("relative", !isLast && "pb-4")}>
            {depth > 0 && (
              <>
                {/* Horizontal stub */}
                <div className="absolute top-[18px] -left-4 h-px w-4 bg-border/40" />

                {/* Status dot at junction */}
                <div
                  className={cn(
                    "absolute top-[15px] -left-[calc(1rem+3px)] z-10 size-[7px] rounded-full ring-2 ring-background",
                    topic.completed > 0
                      ? "bg-primary shadow-[0_0_6px_rgba(99,102,241,0.5)]"
                      : "bg-border/60"
                  )}
                />

                {/* Vertical line connecting siblings */}
                {!isOnly && (
                  <div
                    className={cn(
                      "absolute -left-4 w-px bg-border/40",
                      isFirst && "top-[18px] bottom-0",
                      !isFirst && !isLast && "top-0 bottom-0",
                      isLast && "top-0 h-[18px]"
                    )}
                  />
                )}
              </>
            )}
            {depth === 0 && (
              <div
                className={cn(
                  "absolute top-[15px] -left-4 z-10 size-[7px] rounded-full",
                  topic.completed > 0
                    ? "bg-primary shadow-[0_0_6px_rgba(99,102,241,0.5)]"
                    : "bg-border/60"
                )}
              />
            )}
            <NodeCard topic={topic} className="w-full max-w-none" />
            {node.children && (
              <MobileTreeBranch nodes={node.children} depth={depth + 1} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function NodeCard({ topic, className }: { topic: Topic; className?: string }) {
  const pct =
    topic.problems > 0
      ? Math.round((topic.completed / topic.problems) * 100)
      : 0

  return (
    <div
      className={cn(
        "w-[180px] rounded-xl border border-border/40 bg-[#f5f5f6] p-3 lg:w-[220px]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
        "transition-[border-color,box-shadow] duration-300 hover:border-border/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        "dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      <h3 className="text-[0.8125rem] leading-none font-semibold tracking-[-0.02em]">
        {topic.title}
      </h3>
      <p className="mt-1.5 text-[0.6875rem] leading-[1.4] text-muted-foreground">
        {topic.description}
      </p>

      <div className="mt-2.5">
        <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>
            {topic.completed}/{topic.problems}
          </span>
          <span>{pct}%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-border/60 dark:bg-white/[0.06]">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              pct === 100 ? "bg-emerald-500" : pct > 0 ? "bg-primary" : ""
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

const COLLAPSED_HEIGHT = 520

function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  let scheduled = false
  let lastArgs: Parameters<T> | null = null

  return (...args: Parameters<T>) => {
    const now = Date.now()
    const timeSinceLastCall = now - lastCall

    if (timeSinceLastCall >= delay) {
      lastCall = now
      fn(...args)
    } else if (!scheduled) {
      scheduled = true
      const remaining = delay - timeSinceLastCall
      setTimeout(() => {
        scheduled = false
        lastCall = Date.now()
        if (lastArgs) fn(...lastArgs)
      }, remaining)
    }
    lastArgs = args
  }
}

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [paths, setPaths] = useState<string[]>([])
  const [expanded, setExpanded] = useState(false)

  const updatePaths = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const newPaths: string[] = []
    const R = 12 // corner radius

    for (const [fromId, toId] of edges) {
      const fromEl = nodeRefs.current.get(fromId)
      const toEl = nodeRefs.current.get(toId)
      if (!fromEl || !toEl) continue

      const fr = fromEl.getBoundingClientRect()
      const tr = toEl.getBoundingClientRect()

      const x1 = fr.left + fr.width / 2 - rect.left
      const y1 = fr.bottom - rect.top + 2
      const x2 = tr.left + tr.width / 2 - rect.left
      const y2 = tr.top - rect.top - 2

      const midY = (y1 + y2) / 2
      const dx = x2 - x1

      if (Math.abs(dx) < 1) {
        // Straight vertical
        newPaths.push(`M ${x1} ${y1} L ${x1} ${y2}`)
      } else {
        // Orthogonal elbow with rounded corners
        const sign = dx > 0 ? 1 : -1
        const r = Math.min(R, Math.abs(dx) / 2, midY - y1, y2 - midY)

        newPaths.push(
          `M ${x1} ${y1}` +
            ` L ${x1} ${midY - r}` +
            ` Q ${x1} ${midY}, ${x1 + sign * r} ${midY}` +
            ` L ${x2 - sign * r} ${midY}` +
            ` Q ${x2} ${midY}, ${x2} ${midY + r}` +
            ` L ${x2} ${y2}`
        )
      }
    }

    setPaths(newPaths)
  }, [])

  useEffect(() => {
    const throttledUpdatePaths = throttle(updatePaths, 16)
    const frame = requestAnimationFrame(throttledUpdatePaths)
    const observer = new ResizeObserver(throttledUpdatePaths)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [updatePaths])

  // Recalculate SVG paths after expand/collapse transition
  useEffect(() => {
    const timeout = setTimeout(updatePaths, 500)
    return () => clearTimeout(timeout)
  }, [expanded, updatePaths])

  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      {/* Header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.06em] text-muted-foreground">
          Learning Path
        </span>
        <h2
          className={cn(
            "font-heading font-bold",
            "text-[2rem] leading-[0.95] tracking-[-0.03em]",
            "sm:text-[2.5rem]",
            "lg:text-[3rem] lg:tracking-[-0.04em]"
          )}
        >
          <span
            className={cn(
              "bg-clip-text text-transparent",
              "bg-[linear-gradient(175deg,#2a2a2a_0%,#484848_20%,#222_45%,#434343_70%,#2c2c2c_100%)]",
              "dark:bg-[linear-gradient(175deg,#7a7a7a_0%,#b8b8b8_20%,#686868_45%,#adadad_70%,#757575_100%)]"
            )}
          >
            The roadmap
          </span>
          <span className="text-primary">.</span>
        </h2>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.6] tracking-[-0.01em] text-balance text-muted-foreground">
          Master data structures and algorithms in the optimal order. Each topic
          builds on the previous ones.
        </p>
      </div>

      {/* Collapsible tree container */}
      <div className="relative">
        <div
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
          style={{ maxHeight: expanded ? "5000px" : `${COLLAPSED_HEIGHT}px` }}
        >
          {/* Desktop tree */}
          <div ref={containerRef} className="relative hidden md:block">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full will-change-transform"
              style={{ zIndex: 0 }}
            >
              {paths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  className="stroke-[#e4e4e7] dark:stroke-[#333]"
                  strokeWidth={2.5}
                  strokeDasharray="6 4"
                />
              ))}
            </svg>

            <div
              className="relative flex flex-col gap-12"
              style={{ zIndex: 1 }}
            >
              {rows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex items-start justify-evenly">
                  {row.map((nodeId) => (
                    <div
                      key={nodeId}
                      ref={(el) => {
                        if (el) nodeRefs.current.set(nodeId, el)
                      }}
                      className="flex justify-center"
                    >
                      <NodeCard topic={topics[nodeId]} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile folder tree */}
          <div className="space-y-5 pl-5 md:hidden">
            <MobileTreeBranch nodes={mobileTree} />
          </div>
        </div>

        {/* Fade overlay */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background from-20% via-background/80 to-transparent",
            expanded && "hidden"
          )}
        />

        {/* Full roadmap button */}
        {!expanded && (
          <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
            <button
              onClick={() => setExpanded(true)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-xl px-5 text-sm font-medium",
                "border border-border/40 bg-[#f5f5f6]/80 backdrop-blur-sm",
                "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
                "dark:bg-white/[0.04] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
                "transition-all duration-200 hover:border-border/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
                "dark:hover:bg-white/[0.08] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              )}
            >
              Expand roadmap
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* Additional content when expanded */}
        {expanded && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="px-6 text-center text-xs text-muted-foreground">
              Explore the complete data structures and algorithms roadmap after
              signing up.
            </p>
            <button
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-xl px-5 text-sm font-medium",
                "border border-transparent bg-primary text-primary-foreground",
                "shadow-[0_2px_12px_rgba(99,102,241,0.3)]",
                "transition-all duration-200 hover:shadow-[0_4px_20px_rgba(99,102,241,0.4)]"
              )}
            >
              Full roadmap
            </button>
          </div>
        )}

        {/* Collapse button */}
        {expanded && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setExpanded(false)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-xl px-5 text-sm font-medium",
                "border border-border/40 bg-[#f5f5f6]",
                "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
                "dark:bg-white/[0.04] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
                "transition-all duration-200 hover:border-border/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
                "dark:hover:bg-white/[0.08] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              )}
            >
              Collapse roadmap
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 15 6-6 6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
