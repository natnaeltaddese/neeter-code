"use client"

import { useState } from "react"
import { IconChevronDown, IconList } from "@tabler/icons-react"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { Course } from "@/lib/courses"
import { CourseSidebar } from "./course-sidebar"

export function CourseSidebarDrawer({ course }: { course: Course }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        "mx-auto mb-8 max-w-sm rounded-xl border border-border/40 bg-[#f5f5f6] p-1.5 md:hidden",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:bg-background dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
      )}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <button
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-[0.8125rem] font-medium transition-colors",
                "text-foreground hover:bg-muted/60"
              )}
            />
          }
        >
          <span className="inline-flex items-center gap-2">
            <IconList className="size-3.5" />
            Chapters
          </span>
          <IconChevronDown className="size-3.5" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="h-[100dvh] min-h-0 max-w-[85vw] gap-0 overflow-hidden bg-background p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:max-w-sm"
        >
          <SheetTitle className="sr-only">Course chapters</SheetTitle>
          <CourseSidebar
            course={course}
            onNavigate={() => setOpen(false)}
            className="flex h-full min-h-0 flex-col overflow-hidden border-0 bg-transparent shadow-none dark:bg-transparent dark:shadow-none"
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
