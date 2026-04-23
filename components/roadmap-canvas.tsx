"use client"

import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  Handle,
  Position,
  type Node,
  type Edge,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { useCallback, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import {
  RoadmapTopicSheet,
  type RoadmapTopicMeta,
} from "@/components/roadmap-topic-sheet"

// --- Data ---

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

const edgeDefs: [string, string][] = [
  ["arrays", "two-pointers"],
  ["arrays", "stack"],
  ["two-pointers", "binary-search"],
  ["two-pointers", "sliding-window"],
  ["two-pointers", "linked-list"],
  ["binary-search", "trees"],
  ["sliding-window", "trees"],
  ["linked-list", "trees"],
  ["trees", "tries"],
  ["trees", "heap"],
  ["trees", "backtracking"],
  ["backtracking", "graphs"],
  ["backtracking", "1d-dp"],
  ["heap", "intervals"],
  ["heap", "greedy"],
  ["heap", "adv-graphs"],
  ["graphs", "adv-graphs"],
  ["graphs", "2d-dp"],
  ["1d-dp", "2d-dp"],
  ["1d-dp", "bit-manipulation"],
  ["2d-dp", "math-geo"],
  ["bit-manipulation", "math-geo"],
]

// --- Layout ---

const positions: Record<string, { x: number; y: number }> = {
  arrays: { x: 0, y: -560 },
  "two-pointers": { x: -151, y: -358 },
  stack: { x: 92, y: -383 },
  "binary-search": { x: -375, y: -153 },
  "sliding-window": { x: -118, y: -152 },
  "linked-list": { x: 155, y: -144 },
  trees: { x: -128, y: 47 },
  tries: { x: -355, y: 243 },
  backtracking: { x: 96, y: 235 },
  heap: { x: -203, y: 393 },
  graphs: { x: 85, y: 455 },
  "1d-dp": { x: 372, y: 435 },
  intervals: { x: -626, y: 612 },
  greedy: { x: -346, y: 691 },
  "adv-graphs": { x: -101, y: 650 },
  "2d-dp": { x: 194, y: 691 },
  "bit-manipulation": { x: 490, y: 683 },
  "math-geo": { x: 388, y: 901 },
}

function buildNodes(): Node[] {
  return Object.entries(topics).map(([id, topic]) => ({
    id,
    type: "topic",
    position: positions[id],
    data: { topic },
    draggable: false,
  }))
}

// Precompute parent map for ancestor traversal
const parentMap: Record<string, string[]> = {}
for (const [source, target] of edgeDefs) {
  if (!parentMap[target]) parentMap[target] = []
  parentMap[target].push(source)
}

function getAncestors(nodeId: string): Set<string> {
  const ancestors = new Set<string>()
  const queue = [nodeId]
  while (queue.length > 0) {
    const current = queue.pop()!
    if (ancestors.has(current)) continue
    ancestors.add(current)
    for (const parent of parentMap[current] ?? []) {
      queue.push(parent)
    }
  }
  return ancestors
}

function buildEdges(activeAncestors: Set<string> | null): Edge[] {
  return edgeDefs.map(([source, target]) => {
    const highlighted =
      activeAncestors !== null &&
      activeAncestors.has(source) &&
      activeAncestors.has(target)

    return {
      id: `${source}-${target}`,
      source,
      target,
      type: "default",
      animated: highlighted,
      style: {
        stroke: highlighted ? "var(--primary)" : "var(--border)",
        strokeWidth: highlighted ? 2 : 1.5,
        opacity: activeAncestors === null || highlighted ? 1 : 0.2,
        transition: "stroke 0.2s, stroke-width 0.2s, opacity 0.2s",
      },
    }
  })
}

// --- Custom Node ---

function TopicNode({ data }: { data: { topic: Topic } }) {
  const { topic } = data
  const pct =
    topic.problems > 0
      ? Math.round((topic.completed / topic.problems) * 100)
      : 0

  return (
    <div
      className={cn(
        "w-[220px] cursor-pointer rounded-xl border border-border/40 bg-[#f5f5f6] p-3.5",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
        "transition-[border-color,box-shadow] duration-300 hover:border-border/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        "dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!left-1/2 !h-1 !w-1 !-translate-x-1/2 !border-0 !bg-transparent"
      />

      <h3 className="text-[0.9375rem] leading-none font-semibold tracking-[-0.02em]">
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

      <Handle
        type="source"
        position={Position.Bottom}
        className="!left-1/2 !h-1 !w-1 !-translate-x-1/2 !border-0 !bg-transparent"
      />
    </div>
  )
}

const nodeTypes = { topic: TopicNode }

// --- Canvas ---

export function RoadmapCanvas() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null)
  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => new Set())
  const [starredIds, setStarredIds] = useState<Set<string>>(() => new Set())
  const [prereqsDone, setPrereqsDone] = useState<Set<string>>(() => new Set())

  const ancestors = useMemo(
    () => (hoveredNode ? getAncestors(hoveredNode) : null),
    [hoveredNode]
  )

  const nodes = useMemo(() => buildNodes(), [])
  const edges = useMemo(() => buildEdges(ancestors), [ancestors])

  const onNodeMouseEnter = useCallback(
    (_: React.MouseEvent, node: Node) => setHoveredNode(node.id),
    []
  )
  const onNodeMouseLeave = useCallback(() => setHoveredNode(null), [])
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => setActiveTopicId(node.id),
    []
  )

  const toggle = useCallback(
    (setter: React.Dispatch<React.SetStateAction<Set<string>>>) =>
      (id: string) =>
        setter((prev) => {
          const next = new Set(prev)
          if (next.has(id)) next.delete(id)
          else next.add(id)
          return next
        }),
    []
  )

  const toggleSolved = useMemo(() => toggle(setSolvedIds), [toggle])
  const toggleStarred = useMemo(() => toggle(setStarredIds), [toggle])
  const togglePrereq = useMemo(() => toggle(setPrereqsDone), [toggle])

  const activeTopic: RoadmapTopicMeta | null = useMemo(() => {
    if (!activeTopicId) return null
    const t = topics[activeTopicId]
    if (!t) return null
    return { id: activeTopicId, title: t.title, description: t.description }
  }, [activeTopicId])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={4}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        className={cn("bg-background", "[&_.react-flow\_\_attribution]:hidden")}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="var(--border)"
        />
        <Controls
          showInteractive={false}
          className={cn(
            "!bottom-4 !left-4 !rounded-xl !border !border-border/40 !bg-card/90 !shadow-[0_2px_12px_rgba(0,0,0,0.04)] !backdrop-blur-sm",
            "dark:!bg-background/90 dark:!shadow-[0_2px_12px_rgba(0,0,0,0.2)]",
            "[&>button]:!border-0 [&>button]:!bg-transparent [&>button]:!text-foreground [&>button]:hover:!bg-muted"
          )}
        />
      </ReactFlow>
      <RoadmapTopicSheet
        topic={activeTopic}
        open={activeTopic !== null}
        onOpenChange={(open) => {
          if (!open) setActiveTopicId(null)
        }}
        solvedIds={solvedIds}
        onToggleSolved={toggleSolved}
        starredIds={starredIds}
        onToggleStarred={toggleStarred}
        completedPrereqs={prereqsDone}
        onTogglePrereq={togglePrereq}
      />
    </div>
  )
}
