"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  IconBolt,
  IconCode,
  IconMap,
  IconMenu2,
  IconPlayerPlay,
  IconX,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const productLinks = [
  { label: "Practice", href: "/practice", icon: IconCode },
  { label: "Courses", href: "/courses", icon: IconPlayerPlay },
  { label: "Roadmap", href: "/roadmap", icon: IconMap },
]

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function ProductNavLinks({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {productLinks.map((link) => {
        const active = isActivePath(pathname, link.href)
        const Icon = link.icon

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-md border border-transparent px-3 text-sm font-medium transition-colors",
              "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              active &&
                "border-border/60 bg-muted text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            )}
          >
            <Icon className="size-3.5" />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function ProductNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-border/50 bg-background">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/practice"
            className="shrink-0 font-heading text-base font-bold tracking-[-0.03em] text-foreground"
          >
            NeetCode
          </Link>
          <div
            aria-hidden
            className="hidden h-5 w-px bg-border/70 sm:block"
          />
          <ProductNavLinks className="hidden md:flex" />
        </div>

        <div className="hidden items-center gap-1.5 md:flex">
          <ThemeToggle />
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "rounded-md"
            )}
          >
            Sign In
          </Link>
          <Link
            href="#"
            className={cn(buttonVariants({ size: "sm" }), "rounded-md")}
          >
            <IconBolt className="size-3.5" />
            Pro
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {mobileOpen ? (
              <IconX className="size-4" />
            ) : (
              <IconMenu2 className="size-4" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 top-full grid border-b border-border/50 bg-background shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-[grid-template-rows] duration-200 md:hidden dark:shadow-[0_12px_24px_rgba(0,0,0,0.35)]",
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 px-3 py-3">
            <ProductNavLinks
              className="flex-col items-stretch"
              onClick={() => setMobileOpen(false)}
            />
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border/50 pt-3">
              <Link
                href="#"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-md"
                )}
              >
                Sign In
              </Link>
              <Link
                href="#"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants({ size: "sm" }), "rounded-md")}
              >
                <IconBolt className="size-3.5" />
                Pro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
