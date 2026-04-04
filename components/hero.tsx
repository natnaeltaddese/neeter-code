import Link from "next/link"
import { cn } from "@/lib/utils"

const codeLines = [
  {
    indent: 0,
    tokens: [
      { text: "def ", color: "text-violet-400" },
      { text: "twoSum", color: "text-emerald-400" },
      { text: "(nums, target):", color: "text-white/70" },
    ],
  },
  { indent: 1, tokens: [{ text: "seen = {}", color: "text-white/70" }] },
  {
    indent: 1,
    tokens: [
      { text: "for ", color: "text-violet-400" },
      { text: "i, n ", color: "text-white/70" },
      { text: "in ", color: "text-violet-400" },
      { text: "enumerate(nums):", color: "text-white/70" },
    ],
  },
  {
    indent: 2,
    tokens: [{ text: "diff = target - n", color: "text-white/70" }],
  },
  {
    indent: 2,
    tokens: [
      { text: "if ", color: "text-violet-400" },
      { text: "diff ", color: "text-white/70" },
      { text: "in ", color: "text-violet-400" },
      { text: "seen:", color: "text-white/70" },
    ],
  },
  {
    indent: 3,
    tokens: [
      { text: "return ", color: "text-violet-400" },
      { text: "[seen[diff], i]", color: "text-amber-400" },
    ],
  },
  { indent: 2, tokens: [{ text: "seen[n] = i", color: "text-white/70" }] },
]

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
                "block font-heading font-bold",
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

        {/* Right: Code editor */}
        <div className="hidden animate-[fade-up_0.5s_ease_both] [animation-delay:300ms] md:block">
          <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a0b] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-white/[0.04] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-white/[0.08] transition-colors hover:bg-[#ff5f57]" />
                <div className="size-2.5 rounded-full bg-white/[0.08] transition-colors hover:bg-[#febc2e]" />
                <div className="size-2.5 rounded-full bg-white/[0.08] transition-colors hover:bg-[#28c840]" />
              </div>
              <span className="ml-2 font-mono text-[11px] tracking-[0.02em] text-white/25">
                two_sum.py
              </span>
            </div>

            {/* Code body */}
            <div className="p-5">
              <pre className="font-mono text-[0.8125rem] leading-[1.75]">
                {codeLines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="mr-5 w-3 shrink-0 text-right text-white/[0.12] select-none">
                      {i + 1}
                    </span>
                    <span>
                      {"  ".repeat(line.indent)}
                      {line.tokens.map((token, j) => (
                        <span key={j} className={token.color}>
                          {token.text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
                {/* Blinking cursor line */}
                <div className="flex">
                  <span className="mr-5 w-3 shrink-0 text-right text-white/[0.12] select-none">
                    8
                  </span>
                  <span className="inline-block h-[1.15em] w-[0.55em] animate-pulse bg-white/40" />
                </div>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
