"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { getFirstChapter } from "@/lib/courses"
import {
  IconPlayerPlay,
  IconBookmark,
  IconHistory,
  IconSchool,
} from "@tabler/icons-react"

// --- Data ---

type Difficulty = "easy" | "medium" | "hard"

type Course = {
  title: string
  description: string
  duration: string
  difficulty: Difficulty
  image: string
  slug?: string
}

type Category = {
  name: string
  courses: Course[]
}

type Lesson = {
  title: string
  image: string
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
        slug: "algorithms-beginner",
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

const lessons: Lesson[] = [
  {
    title: "How to Use Neetcode Effectively (Coding Interviews)",
    image: "/lessons/how-to-use-neetcode.avif",
  },
  {
    title: "Python Cheat Sheet",
    image: "/lessons/python-cheat-sheet.avif",
  },
  {
    title: "Big-O Notation",
    image: "/lessons/big-o-notation.avif",
  },
  {
    title: "8 Data Structures for Coding Interviews",
    image: "/lessons/8-data-sructures-for-coding.avif",
  },
  {
    title: "Sorting Algorithms Cheat Sheet",
    image: "/lessons/sorting-algorithms.avif",
  },
  {
    title: "5 Graph Algorithms for Coding Interviews",
    image: "/lessons/5-graph-algorithms.avif",
  },
  {
    title: "8 Design Patterns Every Programmer Should Know",
    image: "/lessons/8-design-patterns.avif",
  },
  {
    title: "20 Must-Know System Design Concepts",
    image: "/lessons/20-system-design-concepts.avif",
  },
  {
    title: "30-Day Javascript Coding Challenge",
    image: "/lessons/30-day-javascript-challenge.avif",
  },
  {
    title: "Design a YouTube Clone",
    image: "/lessons/design-youtube-clone.avif",
  },
  {
    title: "MongoDB Crash Course",
    image: "/lessons/mongodb-crash-course.avif",
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

type Section = "continue" | "courses" | "lessons" | "bookmarked"

const sidebarItems: { id: Section; label: string; icon: typeof IconSchool }[] =
  [
    { id: "continue", label: "Continue", icon: IconHistory },
    { id: "courses", label: "Courses", icon: IconSchool },
    { id: "lessons", label: "Lessons", icon: IconPlayerPlay },
    { id: "bookmarked", label: "Bookmarked", icon: IconBookmark },
  ]

// --- Components ---

function CourseCard({ course }: { course: Course }) {
  const difficulty = difficultyConfig[course.difficulty]
  const firstChapter = course.slug ? getFirstChapter(course.slug) : undefined
  const href = course.slug
    ? firstChapter
      ? `/courses/${course.slug}/${firstChapter.slug}`
      : `/courses/${course.slug}`
    : undefined
  const card = (
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
      <div className="relative aspect-[16/9] overflow-hidden bg-muted/30">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-4">
        <h4 className="text-[0.9375rem] leading-[1.3] font-semibold tracking-[-0.02em] text-foreground">
          {course.title}
        </h4>

        <p className="mt-1.5 text-[0.8125rem] leading-[1.5] text-muted-foreground">
          {course.description}
        </p>

        <div className="mt-3 flex items-center gap-2">
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

          <span className="text-border">&#183;</span>

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

  return href ? (
    <Link href={href} className="block" aria-label={course.title}>
      {card}
    </Link>
  ) : (
    card
  )
}

function LessonCard({ lesson }: { lesson: Lesson }) {
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
      <div className="relative aspect-[16/9] overflow-hidden bg-muted/30">
        <Image
          src={lesson.image}
          alt={lesson.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-4">
        <h4 className="text-[0.9375rem] leading-[1.3] font-semibold tracking-[-0.02em] text-foreground">
          {lesson.title}
        </h4>
      </div>
    </article>
  )
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof IconHistory
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-border/40 bg-muted/40">
        <Icon className="size-5 text-muted-foreground" />
      </div>
      <h3 className="text-[0.9375rem] font-semibold tracking-[-0.02em]">
        {title}
      </h3>
      <p className="mt-1.5 max-w-[28ch] text-[0.8125rem] leading-[1.5] text-balance text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

// --- Page ---

export default function CoursesPage() {
  const sectionRefs = useRef<Map<Section, HTMLElement>>(new Map())
  const [activeSection, setActiveSection] = useState<Section>("continue")
  const isClickScrolling = useRef(false)

  const scrollToSection = useCallback((id: Section) => {
    const el = sectionRefs.current.get(id)
    if (!el) return
    isClickScrolling.current = true
    setActiveSection(id)
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    // Allow scroll spy to resume after smooth scroll finishes
    setTimeout(() => {
      isClickScrolling.current = false
    }, 800)
  }, [])

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    const elements = Array.from(sectionRefs.current.entries())
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = elements.find(([, el]) => el === entry.target)?.[0]
            if (id) setActiveSection(id)
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    )

    for (const [, el] of elements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-20">
      {/* Mobile nav */}
      <div
        className={cn(
          "sticky top-[106px] z-30 mx-auto mb-8 max-w-sm rounded-xl border border-border/40 bg-[#f5f5f6]/90 p-1.5 backdrop-blur-sm md:hidden",
          "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
          "dark:bg-background/90 dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
        )}
      >
        <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sidebarItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[0.8125rem] font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <item.icon className="size-3.5" />
                {item.label}
              </button>
            )
          })}
        </div>
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 rounded-l-xl bg-gradient-to-r from-[rgba(245,245,246,0.9)] to-transparent dark:from-[rgba(28,28,30,0.9)]" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 rounded-r-xl bg-gradient-to-l from-[rgba(245,245,246,0.9)] to-transparent dark:from-[rgba(28,28,30,0.9)]" />
      </div>

      <div className="flex gap-0 md:gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-52 shrink-0 md:block">
          <nav
            aria-label="Courses sections"
            className={cn(
              "sticky top-[106px] rounded-xl border border-border/40 bg-[#f5f5f6] p-2",
              "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
              "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
            )}
          >
            <div className="flex flex-col gap-0.5">
              {sidebarItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>
        </aside>

        {/* Vertical separator */}
        <div className="hidden w-px bg-border/40 md:block" />

        {/* Main content — all sections continuous */}
        <main className="min-w-0 flex-1 space-y-16">
          {/* Continue */}
          <section
            ref={(el) => {
              if (el) sectionRefs.current.set("continue", el)
            }}
            className="scroll-mt-24"
          >
            <h2
              className={cn(
                "mb-6 font-heading font-bold",
                "text-[1.5rem] leading-[0.95] tracking-[-0.03em]",
                "sm:text-[1.75rem]",
                "lg:text-[2rem] lg:tracking-[-0.04em]"
              )}
            >
              <span
                className={cn(
                  "bg-clip-text text-transparent",
                  "bg-[linear-gradient(175deg,#2a2a2a_0%,#484848_20%,#222_45%,#434343_70%,#2c2c2c_100%)]",
                  "dark:bg-[linear-gradient(175deg,#7a7a7a_0%,#b8b8b8_20%,#686868_45%,#adadad_70%,#757575_100%)]"
                )}
              >
                Continue
              </span>
              <span className="text-primary">.</span>
            </h2>
            <EmptyState
              icon={IconHistory}
              title="No courses in progress"
              description="Start a course and pick up right where you left off."
            />
          </section>

          {/* Courses */}
          <section
            ref={(el) => {
              if (el) sectionRefs.current.set("courses", el)
            }}
            className="scroll-mt-24"
          >
            <h2
              className={cn(
                "mb-8 font-heading font-bold",
                "text-[1.5rem] leading-[0.95] tracking-[-0.03em]",
                "sm:text-[1.75rem]",
                "lg:text-[2rem] lg:tracking-[-0.04em]"
              )}
            >
              <span
                className={cn(
                  "bg-clip-text text-transparent",
                  "bg-[linear-gradient(175deg,#2a2a2a_0%,#484848_20%,#222_45%,#434343_70%,#2c2c2c_100%)]",
                  "dark:bg-[linear-gradient(175deg,#7a7a7a_0%,#b8b8b8_20%,#686868_45%,#adadad_70%,#757575_100%)]"
                )}
              >
                Courses
              </span>
              <span className="text-primary">.</span>
            </h2>

            <div className="space-y-10">
              {categories.map((category) => (
                <div key={category.name}>
                  <div className="mb-5 flex items-center gap-3">
                    <h3 className="text-[1.125rem] leading-none font-semibold tracking-[-0.02em] sm:text-[1.25rem]">
                      {category.name}
                    </h3>
                    <div className="h-px flex-1 bg-border/40" />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {category.courses.length}{" "}
                      {category.courses.length === 1 ? "course" : "courses"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.courses.map((course) => (
                      <CourseCard key={course.title} course={course} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lessons */}
          <section
            ref={(el) => {
              if (el) sectionRefs.current.set("lessons", el)
            }}
            className="scroll-mt-24"
          >
            <h2
              className={cn(
                "mb-8 font-heading font-bold",
                "text-[1.5rem] leading-[0.95] tracking-[-0.03em]",
                "sm:text-[1.75rem]",
                "lg:text-[2rem] lg:tracking-[-0.04em]"
              )}
            >
              <span
                className={cn(
                  "bg-clip-text text-transparent",
                  "bg-[linear-gradient(175deg,#2a2a2a_0%,#484848_20%,#222_45%,#434343_70%,#2c2c2c_100%)]",
                  "dark:bg-[linear-gradient(175deg,#7a7a7a_0%,#b8b8b8_20%,#686868_45%,#adadad_70%,#757575_100%)]"
                )}
              >
                Lessons
              </span>
              <span className="text-primary">.</span>
            </h2>

            <div className="mb-5 flex items-center gap-3">
              <h3 className="text-[1.125rem] leading-none font-semibold tracking-[-0.02em] sm:text-[1.25rem]">
                All Lessons
              </h3>
              <div className="h-px flex-1 bg-border/40" />
              <span className="font-mono text-[11px] text-muted-foreground">
                {lessons.length} lessons
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson) => (
                <LessonCard key={lesson.title} lesson={lesson} />
              ))}
            </div>
          </section>

          {/* Bookmarked */}
          <section
            ref={(el) => {
              if (el) sectionRefs.current.set("bookmarked", el)
            }}
            className="scroll-mt-24"
          >
            <h2
              className={cn(
                "mb-6 font-heading font-bold",
                "text-[1.5rem] leading-[0.95] tracking-[-0.03em]",
                "sm:text-[1.75rem]",
                "lg:text-[2rem] lg:tracking-[-0.04em]"
              )}
            >
              <span
                className={cn(
                  "bg-clip-text text-transparent",
                  "bg-[linear-gradient(175deg,#2a2a2a_0%,#484848_20%,#222_45%,#434343_70%,#2c2c2c_100%)]",
                  "dark:bg-[linear-gradient(175deg,#7a7a7a_0%,#b8b8b8_20%,#686868_45%,#adadad_70%,#757575_100%)]"
                )}
              >
                Bookmarked
              </span>
              <span className="text-primary">.</span>
            </h2>
            <EmptyState
              icon={IconBookmark}
              title="No bookmarks yet"
              description="Bookmark courses or lessons to find them quickly later."
            />
          </section>
        </main>
      </div>
    </div>
  )
}
