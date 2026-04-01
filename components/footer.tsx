import Link from "next/link"
import { cn } from "@/lib/utils"

const footerLinks = {
  links: {
    title: "Links",
    items: [
      { label: "Blind 75", href: "#", external: false },
      { label: "NeetCode 150", href: "#", external: false },
      { label: "NeetCode 250", href: "#", external: false },
      {
        label: "How to use NeetCode Effectively",
        href: "#",
        external: false,
      },
    ],
  },
  socials: {
    title: "Socials",
    items: [
      {
        label: "YouTube",
        href: "https://youtube.com/@NeetCode",
        external: true,
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/company/neetcode",
        external: true,
      },
      { label: "Twitter (X)", href: "https://x.com/naboris", external: true },
    ],
  },
  contact: {
    title: "Contact",
    items: [
      {
        label: "support@neetcode.io",
        href: "mailto:support@neetcode.io",
        external: true,
      },
    ],
  },
  legal: {
    title: "Legal",
    items: [
      { label: "Privacy Policy", href: "#", external: false },
      { label: "Terms of Service", href: "#", external: false },
    ],
  },
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <div
        className={cn(
          "rounded-2xl border border-border/40 bg-[#f5f5f6] px-6 py-10 sm:px-10 sm:py-12 lg:px-14",
          "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
          "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
        )}
      >
        {/* Footer grid */}
        <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4 sm:text-left">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-[0.8125rem] font-semibold tracking-[-0.01em] text-foreground">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      {...(item.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="text-[0.8125rem] leading-[1.5] text-muted-foreground underline decoration-transparent decoration-2 underline-offset-[4px] transition-all hover:text-foreground hover:decoration-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border/40 pt-8 sm:flex-row sm:justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-lg font-bold tracking-[-0.03em]"
          >
            <span
              className={cn(
                "bg-clip-text text-transparent",
                "bg-[linear-gradient(175deg,#262626_0%,#383838_30%,#222_60%,#333_100%)]",
                "dark:bg-[linear-gradient(175deg,#8a8a8a_0%,#a0a0a0_30%,#808080_60%,#999_100%)]"
              )}
            >
              NeetCode
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-center font-mono text-[11px] text-muted-foreground/60 sm:text-right">
            Copyright © {currentYear} neetcode.io
            <br />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
