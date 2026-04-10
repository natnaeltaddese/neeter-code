import { notFound, redirect } from "next/navigation"
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

  redirect(`/courses/${courseSlug}/${firstChapter.slug}`)
}
