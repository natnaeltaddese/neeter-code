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
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Practice", href: "/practice" },
  { label: "Roadmap", href: "/roadmap" },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="size-8" />

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <IconSun className="size-4" />
      ) : (
        <IconMoon className="size-4" />
      )}
    </Button>
  )
}

function NavLinks({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium outline-none transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
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
      <header className="mx-auto max-w-5xl overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow">
        {/* Main row */}
        <div className="flex h-14 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-lg font-semibold tracking-tight text-foreground"
          >
            {"{N}"}
          </Link>

          {/* Center nav — hidden on mobile */}
          <NavLinks className="hidden md:flex" />

          {/* Right actions — hidden on mobile */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/pro" className="flex items-center gap-1.5">
                <IconBolt className="size-3.5" />
                Pro
              </Link>
            </Button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <IconX className="size-4" />
              ) : (
                <IconMenu2 className="size-4" />
              )}
            </Button>
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
                  className="flex flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-1 flex flex-col gap-2 border-t pt-2.5 pb-1 px-1">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/signin" onClick={() => setMobileOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link
                    href="/pro"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <IconBolt className="size-3.5" />
                    Check out Pro
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
