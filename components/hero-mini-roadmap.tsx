"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

type Topic = {
  title: string
  problems: number
  completed: number
}

const topics: Record<string, Topic> = {
  arrays: { title: "Arrays", problems: 9, completed: 5 },
  "two-pointers": { title: "Two Pointers", problems: 5, completed: 3 },
  stack: { title: "Stack", problems: 7, completed: 4 },
  "linked-list": { title: "Linked List", problems: 11, completed: 4 },
  "binary-search": { title: "Binary Search", problems: 7, completed: 3 },
  "sliding-window": { title: "Sliding Window", problems: 6, completed: 2 },
  trees: { title: "Trees", problems: 15, completed: 6 },
  tries: { title: "Tries", problems: 3, completed: 0 },
  heap: { title: "Heap", problems: 7, completed: 1 },
  backtracking: { title: "Backtracking", problems: 9, completed: 2 },
}

const rows: string[][] = [
  ["arrays"],
  ["two-pointers", "stack"],
  ["linked-list", "binary-search", "sliding-window"],
  ["trees"],
  ["tries", "heap", "backtracking"],
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
]

function MiniNodeCard({ topic }: { topic: Topic }) {
  const pct =
    topic.problems > 0
      ? Math.round((topic.completed / topic.problems) * 100)
      : 0

  return (
    <div
      className={cn(
        "w-[112px] rounded-xl border border-border/40 bg-[#f5f5f6] px-3 py-2.5 lg:w-[140px]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
        "transition-[border-color,box-shadow] duration-300 hover:border-border/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        "dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
      )}
    >
      <h3 className="text-[0.9375rem] leading-tight font-semibold tracking-[-0.02em] lg:text-[1rem]">
        {topic.title}
      </h3>

      <div className="mt-2.5 h-1 w-full rounded-full bg-border/60 dark:bg-white/[0.06]">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            pct === 100 ? "bg-emerald-500" : pct > 0 ? "bg-primary" : ""
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function HeroMiniRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [paths, setPaths] = useState<string[]>([])

  const updatePaths = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const newPaths: string[] = []
    const R = 10

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
        newPaths.push(`M ${x1} ${y1} L ${x1} ${y2}`)
      } else {
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
    const frame = requestAnimationFrame(updatePaths)
    const observer = new ResizeObserver(updatePaths)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [updatePaths])

  return (
    <div ref={containerRef} className="relative">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 0 }}
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            className="stroke-primary/60"
            strokeWidth={2}
            strokeDasharray="5 3"
            style={{ animation: "dashflow 0.8s linear infinite" }}
          />
        ))}
      </svg>

      <div className="relative flex flex-col gap-7" style={{ zIndex: 1 }}>
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
                <MiniNodeCard topic={topics[nodeId]} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
