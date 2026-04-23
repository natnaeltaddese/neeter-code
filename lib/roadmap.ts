import { practiceProblems, type PracticeProblem } from "@/lib/practice"

export type RoadmapPrereq = {
  title: string
  courseTitle: string
  href: string
}

const COURSE_BEGINNER = "Data Structures & Algorithms for Beginners"

const chapter = (
  chapterSlug: string,
  title: string,
  courseSlug = "algorithms-beginner",
  courseTitle = COURSE_BEGINNER
): RoadmapPrereq => ({
  title,
  courseTitle,
  href: `/courses/${courseSlug}/${chapterSlug}`,
})

// Maps a roadmap topic id to the practice topic ids whose problems should
// surface in that topic's sheet. Several roadmap topics currently have no
// dedicated practice data yet — those resolve to an empty list.
const PRACTICE_TOPIC_MAP: Record<string, string[]> = {
  arrays: ["arrays"],
  "two-pointers": ["two-pointers"],
  stack: ["stack"],
  "sliding-window": [],
  "linked-list": ["linked-list"],
  "binary-search": ["binary-search"],
  trees: ["trees"],
  tries: [],
  heap: ["heap"],
  backtracking: [],
  graphs: ["graphs"],
  "1d-dp": ["dynamic-programming"],
  "adv-graphs": [],
  "2d-dp": [],
  greedy: [],
  intervals: ["intervals"],
  "math-geo": [],
  "bit-manipulation": [],
}

export function getRoadmapProblems(topicId: string): PracticeProblem[] {
  const mapped = PRACTICE_TOPIC_MAP[topicId] ?? []
  if (mapped.length === 0) return []
  return practiceProblems.filter((p) => mapped.includes(p.topicId))
}

export const roadmapPrereqs: Record<string, RoadmapPrereq[]> = {
  arrays: [
    chapter("dynamic-arrays", "Dynamic Arrays"),
    chapter("hash-usage", "Hash Usage"),
    chapter("hash-implementation", "Hash Implementation"),
  ],
  "two-pointers": [
    chapter("static-arrays", "Static Arrays"),
    chapter("dynamic-arrays", "Dynamic Arrays"),
  ],
  stack: [chapter("stacks", "Stacks")],
  "sliding-window": [
    chapter("static-arrays", "Static Arrays"),
    chapter("dynamic-arrays", "Dynamic Arrays"),
  ],
  "linked-list": [
    chapter("singly-linked-lists", "Singly Linked Lists"),
    chapter("doubly-linked-lists", "Doubly Linked Lists"),
    chapter("queues", "Queues"),
  ],
  "binary-search": [
    chapter("search-array", "Search Array"),
    chapter("search-range", "Search Range"),
  ],
  trees: [
    chapter("binary-tree", "Binary Tree"),
    chapter("binary-search-tree", "Binary Search Tree"),
    chapter("bst-insert-and-remove", "BST Insert and Remove"),
    chapter("depth-first-search", "Depth-First Search"),
    chapter("breadth-first-search", "Breadth-First Search"),
    chapter("bst-sets-and-maps", "BST Sets and Maps"),
  ],
  tries: [chapter("hash-implementation", "Hash Implementation")],
  heap: [
    chapter("heap-properties", "Heap Properties"),
    chapter("push-and-pop", "Push and Pop"),
    chapter("heapify", "Heapify"),
  ],
  backtracking: [
    chapter("factorial", "Factorial"),
    chapter("fibonacci-sequence", "Fibonacci Sequence"),
    chapter("tree-maze", "Tree Maze"),
  ],
  graphs: [
    chapter("intro-to-graphs", "Intro to Graphs"),
    chapter("matrix-dfs", "Matrix DFS"),
    chapter("matrix-bfs", "Matrix BFS"),
    chapter("adjacency-list", "Adjacency List"),
  ],
  "1d-dp": [
    chapter("fibonacci-sequence", "Fibonacci Sequence"),
    chapter("1-dimension-dp", "1-Dimension DP"),
  ],
  "adv-graphs": [chapter("adjacency-list", "Adjacency List")],
  "2d-dp": [chapter("2-dimension-dp", "2-Dimension DP")],
  greedy: [chapter("1-dimension-dp", "1-Dimension DP")],
  intervals: [
    chapter("insertion-sort", "Insertion Sort"),
    chapter("merge-sort", "Merge Sort"),
  ],
  "math-geo": [chapter("bit-operations", "Bit Operations")],
  "bit-manipulation": [chapter("bit-operations", "Bit Operations")],
}
