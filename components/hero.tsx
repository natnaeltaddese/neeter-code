import Link from "next/link"
import { cn } from "@/lib/utils"
import { HeroMiniRoadmap } from "@/components/hero-mini-roadmap"

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-28 pb-24">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-14">
        {/* Left: Giant heading + minimal body */}
        <div className="flex flex-col gap-8">
          <div className="animate-[fade-up_0.5s_ease_both]">
            <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.06em] text-muted-foreground">
              Trusted by 1M+ Engineers
            </span>
          </div>

          <div className="animate-[fade-up_0.7s_ease_both]">
            <span
              className={cn(
                "block pl-1 font-heading font-bold md:pl-2",
                "text-[1.5rem] leading-[0.95] tracking-[-0.03em]",
                "sm:text-[2rem]",
                "md:text-[2.5rem]",
                "lg:text-[3rem] lg:tracking-[-0.04em]",
                "bg-clip-text text-transparent",
                "bg-[linear-gradient(175deg,#2a2a2a_0%,#484848_20%,#222_45%,#434343_70%,#2c2c2c_100%)]",
                "dark:bg-[linear-gradient(175deg,#7a7a7a_0%,#b8b8b8_20%,#686868_45%,#adadad_70%,#757575_100%)]"
              )}
            >
              A better way to
            </span>
            <h1
              className={cn(
                "font-heading font-bold",
                "text-[3.25rem] leading-[0.88] tracking-[-0.035em]",
                "sm:text-[4.5rem]",
                "md:text-[5.5rem]",
                "lg:text-[7rem] lg:tracking-[-0.045em]"
              )}
            >
              <span
                className={cn(
                  "bg-clip-text text-transparent",
                  "bg-[linear-gradient(175deg,#2a2a2a_0%,#484848_20%,#222_45%,#434343_70%,#2c2c2c_100%)]",
                  "dark:bg-[linear-gradient(175deg,#7a7a7a_0%,#b8b8b8_20%,#686868_45%,#adadad_70%,#757575_100%)]"
                )}
              >
                Prepare
              </span>
              <span className="text-primary">.</span>
            </h1>
          </div>

          <div className="flex max-w-md animate-[fade-up_0.6s_ease_both] flex-col gap-5 [animation-delay:200ms]">
            <p className="text-[0.9375rem] leading-[1.6] tracking-[-0.01em] text-muted-foreground">
              Stop grinding blind. Follow structured roadmaps covering every
              pattern you need to crack FAANG interviews.
            </p>
            <Link
              href="#"
              className="w-fit text-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[6px] transition-all hover:decoration-primary/60"
            >
              Start learning for free
            </Link>
          </div>
        </div>

        {/* Right: Mini roadmap (first 10 nodes) */}
        <div className="hidden animate-[fade-up_0.5s_ease_both] [animation-delay:300ms] md:block">
          <HeroMiniRoadmap />
        </div>
      </div>
    </section>
  )
}
