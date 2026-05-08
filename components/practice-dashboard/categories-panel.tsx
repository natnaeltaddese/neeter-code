"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  IconBox,
  IconBrain,
  IconChevronDown,
  IconCode,
  IconCpu,
  IconDatabase,
  IconSparkles,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { cardClass, CardSheen } from "./shared"

type Category = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  badge?: string
  children?: { id: string; label: string; href: string }[]
}

const categories: Category[] = [
  {
    id: "coding",
    label: "Coding Interviews",
    icon: IconCode,
    children: [
      { id: "problems", label: "Problems", href: "/practice" },
      { id: "company-tagged", label: "Company Tagged", href: "/practice/company-tagged" },
      { id: "cheatsheets", label: "Cheatsheets", href: "/practice/cheatsheets" },
      { id: "quizzes", label: "Quizzes", href: "/practice/quizzes" },
    ],
  },
  { id: "ai-coding", label: "AI Coding", icon: IconSparkles, href: "/practice/ai-coding", badge: "BETA" },
  { id: "system-design", label: "System Design", icon: IconBox, href: "/practice/system-design" },
  {
    id: "ml",
    label: "Machine Learning",
    icon: IconBrain,
    badge: "NEW",
    children: [
      { id: "ml-problems", label: "Problems", href: "/practice/machine-learning" },
      { id: "ml-build-gpt", label: "Build Your GPT", href: "/practice/machine-learning/build-gpt" },
    ],
  },
  { id: "lld", label: "Low Level Design", icon: IconCpu, href: "/practice/lld" },
  { id: "databases", label: "Databases", icon: IconDatabase, href: "/practice/databases" },
]

const BADGE_STYLES: Record<string, string> = {
  NEW: "bg-emerald-500/15 text-emerald-500",
  BETA: "bg-amber-500/15 text-amber-500",
}

function badgeClass(badge: string) {
  return BADGE_STYLES[badge] ?? "bg-muted text-muted-foreground"
}

function getParentId(pathname: string): string | null {
  return (
    categories.find((cat) =>
      cat.children?.some((child) => child.href === pathname)
    )?.id ?? null
  )
}

export function CategoriesPanel() {
  const pathname = usePathname()

  const [openId, setOpenId] = useState<string | null>(
    () => getParentId(pathname) ?? "coding"
  )

  useEffect(() => {
    const parent = getParentId(pathname)
    if (parent) setOpenId(parent)
  }, [pathname])

  return (
    <aside aria-label="Practice categories" className={cn(cardClass, "p-2")}>
      <CardSheen />
      <div className="relative">
        <nav className="flex flex-col gap-0.5">
          {categories.map((cat) => {
            const Icon = cat.icon
            const hasChildren = !!cat.children?.length
            const isOpen = openId === cat.id
            const isActive = hasChildren
              ? cat.children!.some((child) => child.href === pathname)
              : pathname === cat.href

            return (
              <div key={cat.id}>
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : cat.id)}
                    aria-expanded={isOpen}
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="flex-1 text-left">{cat.label}</span>
                    {cat.badge && (
                      <span className={cn("rounded-md px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wide uppercase", badgeClass(cat.badge))}>
                        {cat.badge}
                      </span>
                    )}
                    <IconChevronDown
                      className={cn(
                        "size-3.5 shrink-0 transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={cat.href!}
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="flex-1 text-left">{cat.label}</span>
                    {cat.badge && (
                      <span className={cn("rounded-md px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wide uppercase", badgeClass(cat.badge))}>
                        {cat.badge}
                      </span>
                    )}
                  </Link>
                )}

                {hasChildren && (
                  <div
                    className={cn(
                      "grid transition-all duration-200 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-0.5 ml-4 flex flex-col gap-0.5 border-l border-border/60 pl-2">
                        {cat.children!.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className={cn(
                              "rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors",
                              pathname === child.href
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
