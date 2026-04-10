import Link from "next/link"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { getFirstChapter } from "@/lib/courses"
import { cn } from "@/lib/utils"

type AdjacentChapter = {
  slug: string
  title: string
  number: number
}

type Props = {
  courseSlug: string
  prev?: AdjacentChapter
  next?: AdjacentChapter
}

const cardStyles = cn(
  "group flex flex-1 items-center gap-3 rounded-xl border border-border/40 bg-[#f5f5f6] p-4 transition-[border-color,box-shadow] duration-300",
  "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
  "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
  "hover:border-border/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
  "dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
)

export function ChapterNavigation({ courseSlug, prev, next }: Props) {
  const firstChapter = getFirstChapter(courseSlug)

  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-16 flex flex-col gap-3 sm:flex-row"
    >
      {prev ? (
        <Link
          href={`/courses/${courseSlug}/${prev.slug}`}
          className={cardStyles}
        >
          <IconArrowLeft className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-x-0.5" />
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Previous
            </p>
            <p className="mt-0.5 truncate text-[0.875rem] font-semibold tracking-[-0.01em] text-foreground">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/courses/${courseSlug}/${next.slug}`}
          className={cn(cardStyles, "text-right")}
        >
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Next
            </p>
            <p className="mt-0.5 truncate text-[0.875rem] font-semibold tracking-[-0.01em] text-foreground">
              {next.title}
            </p>
          </div>
          <IconArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      ) : firstChapter ? (
        <Link
          href={`/courses/${courseSlug}/${firstChapter.slug}`}
          className={cn(cardStyles, "text-right")}
        >
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Restart
            </p>
            <p className="mt-0.5 truncate text-[0.875rem] font-semibold tracking-[-0.01em] text-foreground">
              Back to first chapter
            </p>
          </div>
          <IconArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
