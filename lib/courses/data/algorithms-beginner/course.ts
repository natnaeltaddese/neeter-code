import type { Course } from "../../types"

import { mdx as ch00 } from "./chapters/00-introduction"
import { mdx as ch01 } from "./chapters/01-ram"
import { mdx as ch02 } from "./chapters/02-static-arrays"
import { mdx as ch03 } from "./chapters/03-dynamic-arrays"
import { mdx as ch04 } from "./chapters/04-stacks"
import { mdx as ch05 } from "./chapters/05-singly-linked-lists"
import { mdx as ch06 } from "./chapters/06-doubly-linked-lists"
import { mdx as ch07 } from "./chapters/07-queues"
import { mdx as ch08 } from "./chapters/08-factorial"
import { mdx as ch09 } from "./chapters/09-fibonacci-sequence"
import { mdx as ch10 } from "./chapters/10-insertion-sort"
import { mdx as ch11 } from "./chapters/11-merge-sort"
import { mdx as ch12 } from "./chapters/12-quick-sort"
import { mdx as ch13 } from "./chapters/13-bucket-sort"
import { mdx as ch14 } from "./chapters/14-search-array"
import { mdx as ch15 } from "./chapters/15-search-range"
import { mdx as ch16 } from "./chapters/16-binary-tree"
import { mdx as ch17 } from "./chapters/17-binary-search-tree"
import { mdx as ch18 } from "./chapters/18-bst-insert-and-remove"
import { mdx as ch19 } from "./chapters/19-depth-first-search"
import { mdx as ch20 } from "./chapters/20-breadth-first-search"
import { mdx as ch21 } from "./chapters/21-bst-sets-and-maps"
import { mdx as ch22 } from "./chapters/22-tree-maze"
import { mdx as ch23 } from "./chapters/23-heap-properties"
import { mdx as ch24 } from "./chapters/24-push-and-pop"
import { mdx as ch25 } from "./chapters/25-heapify"
import { mdx as ch26 } from "./chapters/26-hash-usage"
import { mdx as ch27 } from "./chapters/27-hash-implementation"
import { mdx as ch28 } from "./chapters/28-intro-to-graphs"
import { mdx as ch29 } from "./chapters/29-matrix-dfs"
import { mdx as ch30 } from "./chapters/30-matrix-bfs"
import { mdx as ch31 } from "./chapters/31-adjacency-list"
import { mdx as ch32 } from "./chapters/32-1-dimension-dp"
import { mdx as ch33 } from "./chapters/33-2-dimension-dp"
import { mdx as ch34 } from "./chapters/34-bit-operations"

export const algorithmsBeginner: Course = {
  slug: "algorithms-beginner",
  title: "Algorithms & Data Structures for Beginners",
  description:
    "Master the fundamentals of arrays, linked lists, trees, graphs, and essential algorithms.",
  longDescription:
    "A complete introduction to the core data structures and algorithms every software engineer should know. From arrays and hash maps to trees, graphs, and dynamic programming — this course starts from zero and builds everything up step by step.",
  duration: "25 hrs",
  difficulty: "medium",
  image: "/courses/algorithms-beginner.avif",
  instructor: {
    name: "Navi",
    title: "Software Engineer",
  },
  sections: [
    {
      slug: "about",
      title: "About",
      chapters: [
        {
          slug: "introduction",
          number: 0,
          title: "Introduction",
          durationMin: 1,
          isFree: true,
          hasVideo: true,
          mdx: ch00,
        },
      ],
    },
    {
      slug: "arrays",
      title: "Arrays",
      chapters: [
        {
          slug: "ram",
          number: 1,
          title: "RAM",
          durationMin: 6,
          isFree: true,
          hasVideo: true,
          mdx: ch01,
        },
        {
          slug: "static-arrays",
          number: 2,
          title: "Static Arrays",
          durationMin: 15,
          hasVideo: true,
          mdx: ch02,
        },
        {
          slug: "dynamic-arrays",
          number: 3,
          title: "Dynamic Arrays",
          durationMin: 16,
          hasVideo: true,
          mdx: ch03,
        },
        {
          slug: "stacks",
          number: 4,
          title: "Stacks",
          durationMin: 4,
          hasVideo: true,
          mdx: ch04,
        },
      ],
    },
    {
      slug: "linked-lists",
      title: "Linked Lists",
      chapters: [
        {
          slug: "singly-linked-lists",
          number: 5,
          title: "Singly Linked Lists",
          durationMin: 12,
          isFree: true,
          hasVideo: true,
          mdx: ch05,
        },
        {
          slug: "doubly-linked-lists",
          number: 6,
          title: "Doubly Linked Lists",
          durationMin: 10,
          hasVideo: true,
          mdx: ch06,
        },
        {
          slug: "queues",
          number: 7,
          title: "Queues",
          durationMin: 4,
          hasVideo: true,
          mdx: ch07,
        },
      ],
    },
    {
      slug: "recursion",
      title: "Recursion",
      chapters: [
        {
          slug: "factorial",
          number: 8,
          title: "Factorial",
          durationMin: 11,
          hasVideo: true,
          mdx: ch08,
        },
        {
          slug: "fibonacci-sequence",
          number: 9,
          title: "Fibonacci Sequence",
          durationMin: 13,
          hasVideo: true,
          mdx: ch09,
        },
      ],
    },
    {
      slug: "sorting",
      title: "Sorting",
      chapters: [
        {
          slug: "insertion-sort",
          number: 10,
          title: "Insertion Sort",
          durationMin: 19,
          hasVideo: true,
          mdx: ch10,
        },
        {
          slug: "merge-sort",
          number: 11,
          title: "Merge Sort",
          durationMin: 22,
          hasVideo: true,
          mdx: ch11,
        },
        {
          slug: "quick-sort",
          number: 12,
          title: "Quick Sort",
          durationMin: 17,
          hasVideo: true,
          mdx: ch12,
        },
        {
          slug: "bucket-sort",
          number: 13,
          title: "Bucket Sort",
          durationMin: 14,
          hasVideo: true,
          mdx: ch13,
        },
      ],
    },
    {
      slug: "binary-search",
      title: "Binary Search",
      chapters: [
        {
          slug: "search-array",
          number: 14,
          title: "Search Array",
          durationMin: 16,
          hasVideo: true,
          mdx: ch14,
        },
        {
          slug: "search-range",
          number: 15,
          title: "Search Range",
          durationMin: 8,
          hasVideo: true,
          mdx: ch15,
        },
      ],
    },
    {
      slug: "trees",
      title: "Trees",
      chapters: [
        {
          slug: "binary-tree",
          number: 16,
          title: "Binary Tree",
          durationMin: 11,
          hasVideo: true,
          mdx: ch16,
        },
        {
          slug: "binary-search-tree",
          number: 17,
          title: "Binary Search Tree",
          durationMin: 15,
          hasVideo: true,
          mdx: ch17,
        },
        {
          slug: "bst-insert-and-remove",
          number: 18,
          title: "BST Insert and Remove",
          durationMin: 22,
          hasVideo: true,
          mdx: ch18,
        },
        {
          slug: "depth-first-search",
          number: 19,
          title: "Depth-First Search",
          durationMin: 15,
          hasVideo: true,
          mdx: ch19,
        },
        {
          slug: "breadth-first-search",
          number: 20,
          title: "Breadth-First Search",
          durationMin: 11,
          hasVideo: true,
          mdx: ch20,
        },
        {
          slug: "bst-sets-and-maps",
          number: 21,
          title: "BST Sets and Maps",
          durationMin: 6,
          hasVideo: true,
          mdx: ch21,
        },
      ],
    },
    {
      slug: "backtracking",
      title: "Backtracking",
      chapters: [
        {
          slug: "tree-maze",
          number: 22,
          title: "Tree Maze",
          durationMin: 14,
          hasVideo: true,
          mdx: ch22,
        },
      ],
    },
    {
      slug: "heap-priority-queue",
      title: "Heap / Priority Queue",
      chapters: [
        {
          slug: "heap-properties",
          number: 23,
          title: "Heap Properties",
          durationMin: 14,
          hasVideo: true,
          mdx: ch23,
        },
        {
          slug: "push-and-pop",
          number: 24,
          title: "Push and Pop",
          durationMin: 18,
          hasVideo: true,
          mdx: ch24,
        },
        {
          slug: "heapify",
          number: 25,
          title: "Heapify",
          durationMin: 15,
          hasVideo: true,
          mdx: ch25,
        },
      ],
    },
    {
      slug: "hashing",
      title: "Hashing",
      chapters: [
        {
          slug: "hash-usage",
          number: 26,
          title: "Hash Usage",
          durationMin: 10,
          hasVideo: true,
          mdx: ch26,
        },
        {
          slug: "hash-implementation",
          number: 27,
          title: "Hash Implementation",
          durationMin: 29,
          hasVideo: true,
          mdx: ch27,
        },
      ],
    },
    {
      slug: "graphs",
      title: "Graphs",
      chapters: [
        {
          slug: "intro-to-graphs",
          number: 28,
          title: "Intro to Graphs",
          durationMin: 22,
          hasVideo: true,
          mdx: ch28,
        },
        {
          slug: "matrix-dfs",
          number: 29,
          title: "Matrix DFS",
          durationMin: 22,
          hasVideo: true,
          mdx: ch29,
        },
        {
          slug: "matrix-bfs",
          number: 30,
          title: "Matrix BFS",
          durationMin: 14,
          hasVideo: true,
          mdx: ch30,
        },
        {
          slug: "adjacency-list",
          number: 31,
          title: "Adjacency List",
          durationMin: 20,
          hasVideo: true,
          mdx: ch31,
        },
      ],
    },
    {
      slug: "dynamic-programming",
      title: "Dynamic Programming",
      chapters: [
        {
          slug: "1-dimension-dp",
          number: 32,
          title: "1-Dimension DP",
          durationMin: 20,
          hasVideo: true,
          mdx: ch32,
        },
        {
          slug: "2-dimension-dp",
          number: 33,
          title: "2-Dimension DP",
          durationMin: 22,
          hasVideo: true,
          mdx: ch33,
        },
      ],
    },
    {
      slug: "bit-manipulation",
      title: "Bit Manipulation",
      chapters: [
        {
          slug: "bit-operations",
          number: 34,
          title: "Bit Operations",
          durationMin: 17,
          hasVideo: true,
          mdx: ch34,
        },
      ],
    },
  ],
}
