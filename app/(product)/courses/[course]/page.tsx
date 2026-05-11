import { notFound } from "next/navigation"
import { CoursePageRedirect } from "@/components/courses/course-page-redirect"
import { getCourse, getFirstChapter } from "@/lib/courses"

type Params = { course: string }

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { course: courseSlug } = await params
  const course = getCourse(courseSlug)
  if (!course) notFound()

  const firstChapter = getFirstChapter(courseSlug)
  if (!firstChapter) notFound()

  return (
    // in the future we can redirect to the last viewed chapter
    <CoursePageRedirect href={`/courses/${courseSlug}/${firstChapter.slug}`} />
  )
}
