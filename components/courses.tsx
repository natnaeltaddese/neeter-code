"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

type Difficulty = "easy" | "medium" | "hard"

type Course = {
  title: string
  description: string
  duration: string
  difficulty: Difficulty
  image: string
}

type Category = {
  name: string
  courses: Course[]
}

const categories: Category[] = [
  {
    name: "Data Structures & Algorithms",
    courses: [
      {
        title: "Algorithms & Data Structures for Beginners",
        description:
          "Master the fundamentals of arrays, linked lists, trees, graphs, and essential algorithms.",
        duration: "25 hrs",
        difficulty: "medium",
        image: "/courses/algorithms-beginner.avif",
      },
      {
        title: "Advanced Algorithms",
        description:
          "Deep dive into dynamic programming, advanced graph algorithms, and complex problem-solving.",
        duration: "25 hrs",
        difficulty: "hard",
        image: "/courses/algorithms-advanced.avif",
      },
    ],
  },
  {
    name: "System Design",
    courses: [
      {
        title: "System Design for Beginners",
        description:
          "Learn scalability fundamentals, load balancing, caching, and database design basics.",
        duration: "10 hrs",
        difficulty: "medium",
        image: "/courses/system-design-beginner.avif",
      },
      {
        title: "System Design Interview",
        description:
          "Practice real interview questions: design Twitter, Uber, and other large-scale systems.",
        duration: "10 hrs",
        difficulty: "medium",
        image: "/courses/system-design-interview.avif",
      },
    ],
  },
  {
    name: "Python",
    courses: [
      {
        title: "Python for Beginners",
        description:
          "Start from zero with variables, loops, functions, and core Python concepts.",
        duration: "12 hrs",
        difficulty: "easy",
        image: "/courses/python-beginner.avif",
      },
      {
        title: "Python for Coding Interviews",
        description:
          "Python-specific tricks, built-in functions, and syntax patterns for interviews.",
        duration: "8 hrs",
        difficulty: "easy",
        image: "/courses/python-interview.avif",
      },
      {
        title: "Python OOP",
        description:
          "Classes, inheritance, polymorphism, and object-oriented principles in Python.",
        duration: "8 hrs",
        difficulty: "easy",
        image: "/courses/python-OOP.avif",
      },
    ],
  },
  {
    name: "Full Stack Development",
    courses: [
      {
        title: "SQL for Beginners",
        description:
          "Query databases with SELECT, JOIN, aggregations, and understand relational models.",
        duration: "10 hrs",
        difficulty: "easy",
        image: "/courses/sql-beginner.avif",
      },
      {
        title: "Full Stack Development",
        description:
          "Build complete web apps with React, Node.js, databases, and deployment.",
        duration: "20 hrs",
        difficulty: "medium",
        image: "/courses/fullstack-development.avif",
      },
    ],
  },
  {
    name: "Object Oriented Design",
    courses: [
      {
        title: "Object Oriented Design Interview",
        description:
          "Design parking lots, chess games, and other OOD interview classics.",
        duration: "8 hrs",
        difficulty: "easy",
        image: "/courses/object-oriented-design-interview.avif",
      },
      {
        title: "Design Patterns",
        description:
          "Factory, singleton, observer, strategy, and other essential design patterns.",
        duration: "8 hrs",
        difficulty: "easy",
        image: "/courses/object-oriented-design-pattern.avif",
      },
    ],
  },
]

const difficultyConfig: Record<
  Difficulty,
  { label: string; className: string }
> = {
  easy: {
    label: "Easy",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
  medium: {
    label: "Medium",
    className:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  },
  hard: {
    label: "Hard",
    className:
      "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
  },
}

export function Courses() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map((c) => c.name))
  )

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      {/* Header */}
      <div className="mb-14 flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.06em] text-muted-foreground">
          Video Courses
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
            Learn by watching
          </span>
          <span className="text-primary">.</span>
        </h2>
        <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.6] tracking-[-0.01em] text-balance text-muted-foreground">
          Comprehensive video courses covering everything from fundamentals to
          advanced interview preparation.
        </p>
      </div>

      {/* Course categories */}
      <div className="space-y-6">
        {categories.map((category, categoryIdx) => {
          const isExpanded = expandedCategories.has(category.name)

          return (
            <div
              key={category.name}
              className={cn(
                "animate-[fade-up_0.5s_ease_both]",
                categoryIdx === 1 && "[animation-delay:100ms]",
                categoryIdx === 2 && "[animation-delay:200ms]",
                categoryIdx === 3 && "[animation-delay:300ms]",
                categoryIdx === 4 && "[animation-delay:400ms]"
              )}
            >
              {/* Category header - clickable */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="group/header mb-5 flex w-full items-center gap-3"
              >
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                      "text-muted-foreground transition-transform duration-200",
                      isExpanded ? "rotate-90" : "rotate-0"
                    )}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <h3 className="text-[1.125rem] leading-none font-semibold tracking-[-0.02em] transition-colors group-hover/header:text-primary sm:text-[1.25rem]">
                    {category.name}
                  </h3>
                </div>
                <div className="h-px flex-1 bg-border/40" />
                <span className="font-mono text-[11px] text-muted-foreground">
                  {category.courses.length}{" "}
                  {category.courses.length === 1 ? "course" : "courses"}
                </span>
              </button>

              {/* Course grid - collapsible */}
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isExpanded
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.courses.map((course) => (
                      <CourseCard key={course.title} course={course} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function CourseCard({ course }: { course: Course }) {
  const difficulty = difficultyConfig[course.difficulty]

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-xl border border-border/40 bg-[#f5f5f6]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
        "transition-[border-color,box-shadow] duration-300 hover:border-border/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        "dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
        "cursor-pointer"
      )}
    >
      {/* Course image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted/30">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Course info */}
      <div className="p-4">
        <h4 className="text-[0.9375rem] leading-[1.3] font-semibold tracking-[-0.02em] text-foreground">
          {course.title}
        </h4>

        <p className="mt-1.5 text-[0.8125rem] leading-[1.5] text-muted-foreground">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="mt-3 flex items-center gap-2">
          {/* Duration */}
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {course.duration}
          </span>

          <span className="text-border">•</span>

          {/* Difficulty badge */}
          <span
            className={cn(
              "inline-flex items-center rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium",
              difficulty.className
            )}
          >
            {difficulty.label}
          </span>
        </div>
      </div>
    </article>
  )
}
