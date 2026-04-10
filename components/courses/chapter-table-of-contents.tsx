"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ChapterTocItem } from "@/lib/courses"
import { slugifyHeading } from "@/lib/courses"
import { cn } from "@/lib/utils"

function assignHeadingIds(
  headings: HTMLElement[],
  items: ChapterTocItem[]
): HTMLElement[] {
  const seen = new Map<string, number>()

  return headings.map((heading, index) => {
    const item = items[index]
    if (item) {
      heading.id = item.id
      return heading
    }

    const baseId = slugifyHeading(heading.textContent ?? "")
    if (!baseId) return heading

    const count = seen.get(baseId) ?? 0
    seen.set(baseId, count + 1)
    heading.id = count === 0 ? baseId : `${baseId}-${count + 1}`
    return heading
  })
}

export function ChapterTableOfContents({ items }: { items: ChapterTocItem[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState(items[0]?.id)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const layout = root.closest("[data-chapter-layout]")
    const body = layout?.querySelector("[data-chapter-body]")
    const scrollViewport = root.closest(
      '[data-slot="scroll-area-viewport"]'
    ) as HTMLElement | null

    if (!body || !scrollViewport) return

    const headings = assignHeadingIds(
      Array.from(body.querySelectorAll<HTMLElement>("h2, h3")),
      items
    ).filter((heading) => heading.id)

    if (headings.length === 0) return

    const updateActiveHeading = () => {
      const viewportTop = scrollViewport.getBoundingClientRect().top
      const threshold = viewportTop + 96
      let nextActiveId = headings[0]?.id

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= threshold) {
          nextActiveId = heading.id
          continue
        }
        break
      }

      const lastHeading = headings[headings.length - 1]
      if (
        lastHeading &&
        scrollViewport.scrollTop + scrollViewport.clientHeight >=
          scrollViewport.scrollHeight - 4
      ) {
        nextActiveId = lastHeading.id
      }

      setActiveId((current) =>
        current === nextActiveId ? current : nextActiveId
      )
    }

    let frame = 0
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveHeading)
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(body)

    scrollViewport.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    scheduleUpdate()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      scrollViewport.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [items])

  const scrollToHeading = (id: string) => {
    const root = rootRef.current
    if (!root) return

    const layout = root.closest("[data-chapter-layout]")
    const heading = layout?.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
    if (!heading) return

    heading.scrollIntoView({ behavior: "smooth", block: "start" })
    setActiveId(id)

    const url = new URL(window.location.href)
    url.hash = id
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`
    )
  }

  if (items.length === 0) return null

  return (
    <aside className="relative z-20 hidden xl:block">
      <div ref={rootRef} className="sticky top-0 z-20 pt-1">
        <div
          className={cn(
            "rounded-xl border border-border/40 bg-[#f5f5f6] p-3",
            "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
            "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
          )}
        >
          <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            On this page
          </p>

          <ScrollArea
            className="mt-3 max-h-[calc(100dvh-11rem)]"
            maskHeight={20}
          >
            <nav aria-label="Table of contents">
              <div className="space-y-1 pr-3 pb-1">
                {items.map((item) => {
                  const isActive = activeId === item.id

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToHeading(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "block w-full border-l py-1.5 pl-3 text-left text-[0.8125rem] leading-[1.35] transition-colors",
                        item.level === 3 && "ml-3 pl-3 text-[0.75rem]",
                        isActive
                          ? "border-primary text-foreground"
                          : "border-border/40 text-muted-foreground hover:border-border/70 hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </button>
                  )
                })}
              </div>
            </nav>
          </ScrollArea>
        </div>
      </div>
    </aside>
  )
}
