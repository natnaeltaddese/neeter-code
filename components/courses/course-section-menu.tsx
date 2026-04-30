"use client"

import Link from "next/link"
import { useEffect, useState, type MouseEvent } from "react"
import {
  IconBookmark,
  IconHistory,
  IconPlayerPlay,
  IconSchool,
} from "@tabler/icons-react"
import { CardSheen, cardClass } from "@/components/practice-dashboard/shared"
import { cn } from "@/lib/utils"

const sectionItems = [
  { id: "continue", label: "Continue", icon: IconHistory },
  { id: "courses", label: "Courses", icon: IconSchool },
  { id: "lessons", label: "Lessons", icon: IconPlayerPlay },
  { id: "bookmarked", label: "Bookmarked", icon: IconBookmark },
]

const sectionIds = sectionItems.map((item) => item.id)
const sectionActivationOffset = 112

export function CourseSectionMenu() {
  const [activeId, setActiveId] = useState(sectionItems[0]?.id)

  useEffect(() => {
    const getSections = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null)

    const updateActiveSection = () => {
      const sections = getSections()
      if (sections.length === 0) return

      let nextActiveId = sections[0].id

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= sectionActivationOffset) {
          nextActiveId = section.id
          continue
        }
        break
      }

      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4
      ) {
        nextActiveId = sections[sections.length - 1].id
      }

      setActiveId((current) =>
        current === nextActiveId ? current : nextActiveId
      )
    }

    let frame = 0
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveSection)
    }

    scheduleUpdate()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [])

  const navigateToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    const section = document.getElementById(id)
    if (!section) return

    event.preventDefault()
    setActiveId(id)
    section.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${id}`
    )
  }

  return (
    <aside aria-label="Courses sections" className={cn(cardClass, "p-2")}>
      <CardSheen />
      <div className="relative">
        <nav className="flex flex-col gap-0.5">
          {sectionItems.map((item) => {
            const Icon = item.icon
            const active = activeId === item.id

            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => navigateToSection(event, item.id)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
