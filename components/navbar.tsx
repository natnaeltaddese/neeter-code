"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  IconSun,
  IconMoon,
  IconMenu2,
  IconBolt,
  IconX,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const navLinks = [
  { label: "Courses", href: "#" },
  { label: "Practice", href: "#" },
  { label: "Roadmap", href: "#" },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="size-8" />

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-expanded:bg-muted aria-expanded:text-foreground"
    >
      {resolvedTheme === "dark" ? (
        <IconSun className="size-4" />
      ) : (
        <IconMoon className="size-4" />
      )}
    </button>
  )
}

function NavLinks({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-accent-foreground focus:bg-white/10 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="sticky top-0 z-40 w-full px-4 pt-4">
      <header className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-border/40 bg-[#f5f5f6]/90 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-sm will-change-transform dark:bg-background/90 dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent" />

        <div className="relative flex h-14 items-center justify-between gap-4 px-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-lg font-bold tracking-[-0.03em]"
          >
            <span className="bg-[linear-gradient(175deg,#262626_0%,#383838_30%,#222_60%,#333_100%)] bg-clip-text text-transparent dark:bg-[linear-gradient(175deg,#8a8a8a_0%,#a0a0a0_30%,#808080_60%,#999_100%)]">
              NeetCode
            </span>
          </Link>

          {/* Center nav — hidden on mobile */}
          <NavLinks className="hidden md:flex" />

          {/* Right actions — hidden on mobile */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-lg"
              )}
            >
              Sign In
            </Link>
            <Link
              href="#"
              className={cn(buttonVariants({ size: "sm" }), "rounded-lg")}
            >
              <IconBolt className="size-3.5" />
              Pro
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-expanded:bg-muted aria-expanded:text-foreground"
            >
              {mobileOpen ? (
                <IconX className="size-4" />
              ) : (
                <IconMenu2 className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile expanded panel */}
        <div
          className={cn(
            "grid transition-all duration-200 ease-in-out md:hidden",
            mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 border-t px-2 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-1 flex flex-col gap-2 border-t px-1 pt-2.5 pb-1">
                <Link
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className={cn(buttonVariants({ size: "sm" }), "rounded-lg")}
                >
                  <IconBolt className="size-3.5" />
                  Check out Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
