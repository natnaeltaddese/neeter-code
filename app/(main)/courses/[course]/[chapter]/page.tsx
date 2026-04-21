import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ChapterBody } from "@/components/courses/chapter-body"
import { ChapterNavigation } from "@/components/courses/chapter-navigation"
import { ChapterTableOfContents } from "@/components/courses/chapter-table-of-contents"
import { VideoPlayerSkeleton } from "@/components/courses/video-player-skeleton"
import { cn } from "@/lib/utils"
import {
  getAdjacentChapters,
  getAllChapterParams,
  getChapter,
  getChapterToc,
} from "@/lib/courses"

type Params = { course: string; chapter: string }

export async function generateStaticParams() {
  return getAllChapterParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { course: courseSlug, chapter: chapterSlug } = await params
  const result = getChapter(courseSlug, chapterSlug)
  if (!result) return {}
  return {
    title: `${result.chapter.title} · ${result.course.title}`,
    description: result.course.description,
  }
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { course: courseSlug, chapter: chapterSlug } = await params
  const result = getChapter(courseSlug, chapterSlug)
  if (!result) notFound()

  const { section, chapter } = result
  const { prev, next } = getAdjacentChapters(courseSlug, chapterSlug)
  const toc = getChapterToc(chapter.mdx)

  return (
    <div
      data-chapter-layout
      className={cn(
        "mx-auto max-w-[74ch] md:mx-0",
        toc.length > 0 &&
          "xl:grid xl:max-w-none xl:grid-cols-[minmax(0,74ch)_15rem] xl:gap-x-12"
      )}
    >
      {chapter.hasVideo && (
        <div className={cn(toc.length > 0 && "xl:col-span-2")}>
          <VideoPlayerSkeleton />
        </div>
      )}

      <article className="min-w-0">
        <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          {section.title} · Chapter {chapter.number} · {chapter.durationMin} min
        </p>

        <h1
          className={cn(
            "mt-3 font-heading font-bold text-foreground",
            "text-[2rem] leading-[0.92] tracking-[-0.03em]",
            "sm:text-[2.25rem]",
            "lg:text-[2.5rem] lg:tracking-[-0.04em]"
          )}
        >
          {chapter.title}
        </h1>

        <div className="mt-10" data-chapter-body>
          <ChapterBody mdx={chapter.mdx} />
        </div>

        <ChapterNavigation courseSlug={courseSlug} prev={prev} next={next} />
      </article>

      {toc.length > 0 && <ChapterTableOfContents items={toc} />}
    </div>
  )
}
