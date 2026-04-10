import { COURSES } from "./data"
import type { Chapter, Course, Section } from "./types"

export type { Chapter, Course, Difficulty, Instructor, Section } from "./types"

export type ChapterTocItem = {
  id: string
  title: string
  level: 2 | 3
}

function stripInlineMdx(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .trim()
}

export function slugifyHeading(value: string): string {
  return stripInlineMdx(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getChapterToc(mdx: string): ChapterTocItem[] {
  const items: ChapterTocItem[] = []
  const seen = new Map<string, number>()
  let inCodeBlock = false

  for (const rawLine of mdx.split("\n")) {
    const line = rawLine.trim()
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/)
    if (!match) continue

    const title = stripInlineMdx(match[2])
    const baseId = slugifyHeading(title)
    if (!baseId) continue

    const count = seen.get(baseId) ?? 0
    seen.set(baseId, count + 1)

    items.push({
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
      title,
      level: match[1].length as 2 | 3,
    })
  }

  return items
}

export function getAllCourses(): Course[] {
  return COURSES
}

export function getCourse(courseSlug: string): Course | undefined {
  return COURSES.find((c) => c.slug === courseSlug)
}

export function getChapter(
  courseSlug: string,
  chapterSlug: string
): { course: Course; section: Section; chapter: Chapter } | undefined {
  const course = getCourse(courseSlug)
  if (!course) return undefined
  for (const section of course.sections) {
    const chapter = section.chapters.find((ch) => ch.slug === chapterSlug)
    if (chapter) return { course, section, chapter }
  }
  return undefined
}

/**
 * Returns a flat array of chapters in order across all sections of a course.
 */
function flattenChapters(course: Course): Chapter[] {
  return course.sections.flatMap((s) => s.chapters)
}

export function getFirstChapter(courseSlug: string): Chapter | undefined {
  const course = getCourse(courseSlug)
  if (!course) return undefined
  return flattenChapters(course)[0]
}

export function getAdjacentChapters(
  courseSlug: string,
  chapterSlug: string
): {
  prev?: { slug: string; title: string; number: number }
  next?: { slug: string; title: string; number: number }
} {
  const course = getCourse(courseSlug)
  if (!course) return {}
  const flat = flattenChapters(course)
  const idx = flat.findIndex((ch) => ch.slug === chapterSlug)
  if (idx === -1) return {}

  const prev = idx > 0 ? flat[idx - 1] : undefined
  const next = idx < flat.length - 1 ? flat[idx + 1] : undefined

  return {
    prev: prev
      ? { slug: prev.slug, title: prev.title, number: prev.number }
      : undefined,
    next: next
      ? { slug: next.slug, title: next.title, number: next.number }
      : undefined,
  }
}

export function getAllCourseParams(): { course: string }[] {
  return COURSES.map((c) => ({ course: c.slug }))
}

export function getAllChapterParams(): { course: string; chapter: string }[] {
  const params: { course: string; chapter: string }[] = []
  for (const course of COURSES) {
    // Dev-only check: chapter slugs must be unique within a course
    if (process.env.NODE_ENV !== "production") {
      const seen = new Set<string>()
      for (const section of course.sections) {
        for (const chapter of section.chapters) {
          if (seen.has(chapter.slug)) {
            console.warn(
              `[lib/courses] Duplicate chapter slug "${chapter.slug}" in course "${course.slug}"`
            )
          }
          seen.add(chapter.slug)
        }
      }
    }
    for (const section of course.sections) {
      for (const chapter of section.chapters) {
        params.push({ course: course.slug, chapter: chapter.slug })
      }
    }
  }
  return params
}
