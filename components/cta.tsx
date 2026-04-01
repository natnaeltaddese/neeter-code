import Image from "next/image"
import { cn } from "@/lib/utils"

const features = [
  "Organized study plans: Blind 75, NeetCode 150, NeetCode 250",
  "Detailed video explanations for every problem",
  "Track your progress and stay motivated",
  "Join our public Discord community",
]

export function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border/40 bg-[#f5f5f6]",
          "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
          "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
        )}
      >
        <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          {/* Content - centered */}
          <div className="flex flex-col items-center text-center">
            <h2
              className={cn(
                "font-heading font-bold",
                "text-[1.75rem] leading-[0.95] tracking-[-0.03em]",
                "sm:text-[2.25rem]",
                "lg:text-[2.75rem] lg:tracking-[-0.04em]"
              )}
            >
              <span
                className={cn(
                  "bg-clip-text text-transparent",
                  "bg-[linear-gradient(175deg,#2a2a2a_0%,#484848_20%,#222_45%,#434343_70%,#2c2c2c_100%)]",
                  "dark:bg-[linear-gradient(175deg,#7a7a7a_0%,#b8b8b8_20%,#686868_45%,#adadad_70%,#757575_100%)]"
                )}
              >
                Start Practicing for Free
              </span>
            </h2>

            <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.6] tracking-[-0.01em] text-muted-foreground sm:text-[1rem]">
              The best resources for coding interviews. Period.
            </p>

            {/* Feature list */}
            <ul className="mt-6 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-left">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 shrink-0 text-primary"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[0.875rem] leading-[1.5] text-foreground/80">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA buttons - side by side */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              {/* Primary button */}
              <a
                href="/practice"
                className={cn(
                  "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-8 text-[0.9375rem] font-semibold",
                  "bg-primary text-primary-foreground",
                  "border border-primary/80",
                  "shadow-[0_2px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]",
                  "transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
                  "dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
                  "dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
                  "sm:w-auto"
                )}
              >
                Start Practicing
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              {/* Secondary button - Discord */}
              <a
                href="https://discord.gg/neetcode"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl px-8 text-[0.9375rem] font-medium",
                  "border border-border/40 bg-background backdrop-blur-sm",
                  "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
                  "dark:bg-white/[0.04] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
                  "transition-all duration-200 hover:border-border/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
                  "dark:hover:bg-white/[0.08] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
                  "sm:w-auto"
                )}
              >
                <Image
                  src="/company/discord-icon.svg"
                  alt="Discord"
                  width={20}
                  height={20}
                  className="size-5"
                />
                Join Discord
              </a>
            </div>

            <p className="mt-4 font-mono text-[11px] text-muted-foreground/60">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
