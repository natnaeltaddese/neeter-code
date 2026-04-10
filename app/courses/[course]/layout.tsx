import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { IconChevronRight } from "@tabler/icons-react"
import { CourseSidebar } from "@/components/courses/course-sidebar"
import { CourseSidebarDrawer } from "@/components/courses/course-sidebar-drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAllCourseParams, getCourse } from "@/lib/courses"

type Params = { course: string }

export async function generateStaticParams() {
  return getAllCourseParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { course: courseSlug } = await params
  const course = getCourse(courseSlug)
  if (!course) return {}
  return {
    title: `${course.title} · NeetCode`,
    description: course.description,
  }
}

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<Params>
}) {
  const { course: courseSlug } = await params
  const course = getCourse(courseSlug)
  if (!course) notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-20 md:flex md:h-[calc(100dvh-74px)] md:flex-col md:overflow-hidden md:pb-4">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1.5 text-[0.8125rem]"
      >
        <Link
          href="/courses"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Courses
        </Link>
        <IconChevronRight className="size-3 text-muted-foreground/60" />
        <span className="truncate font-medium text-foreground">
          {course.title}
        </span>
      </nav>

      {/* Mobile drawer */}
      <CourseSidebarDrawer course={course} />

      <div className="flex gap-0 md:min-h-0 md:flex-1 md:gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 md:flex md:min-h-0">
          <CourseSidebar
            course={course}
            className="w-full md:flex md:h-full md:flex-col"
          />
        </aside>

        {/* Vertical separator */}
        <div className="hidden w-px bg-border/40 md:block" />

        {/* Main content */}
        <main className="min-w-0 flex-1 md:min-h-0">
          <ScrollArea className="md:h-full" maskHeight={36}>
            <div className="pb-1 md:pr-6 md:pb-20">{children}</div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}
