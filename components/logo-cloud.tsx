import { cn } from "@/lib/utils"
import googleIcon from "thesvg/google"
import netflixIcon from "thesvg/netflix"
import openaiIcon from "thesvg/openai"
import anthropicIcon from "thesvg/anthropic"
import nvidiaIcon from "thesvg/nvidia"
import githubIcon from "thesvg/github"
import vercelIcon from "thesvg/vercel"

// NVIDIA wordmark has white text + green eye — swap white for dark in light mode
const nvidiaLightSvg = nvidiaIcon.variants.wordmark.replace(
  /fill:#fff/g,
  "fill:#1a1a1a"
)

type LogoMode = "color" | "white" | "mixed"

const logos: { svg: string; lightSvg?: string; title: string; mode: LogoMode }[] = [
  { svg: googleIcon.variants.wordmark, title: "Google", mode: "color" },
  { svg: netflixIcon.variants.wordmark, title: "Netflix", mode: "color" },
  { svg: openaiIcon.variants.wordmark, title: "OpenAI", mode: "white" },
  { svg: anthropicIcon.variants.wordmark, title: "Anthropic", mode: "white" },
  { svg: nvidiaIcon.variants.wordmark, lightSvg: nvidiaLightSvg, title: "NVIDIA", mode: "mixed" },
  { svg: githubIcon.variants.wordmark, title: "GitHub", mode: "white" },
  { svg: vercelIcon.variants.wordmark, title: "Vercel", mode: "white" },
]

const base = "h-5 shrink-0 [&>svg]:h-full [&>svg]:w-auto transition-opacity"

export default function LogoCloud() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-4">
        <p className="mb-6 text-center font-mono text-[11px] font-medium tracking-[0.1em] text-muted-foreground/50 uppercase">
          Trusted by engineers at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {logos.map((l) => {
            if (l.mode === "white") {
              return (
                <div
                  key={l.title}
                  role="img"
                  aria-label={l.title}
                  className={cn(base, "invert opacity-70 hover:opacity-100 dark:invert-0 dark:opacity-60 dark:hover:opacity-90")}
                  dangerouslySetInnerHTML={{ __html: l.svg }}
                />
              )
            }

            if (l.mode === "mixed") {
              return (
                <div key={l.title} role="img" aria-label={l.title}>
                  <div
                    className={cn(base, "block opacity-70 hover:opacity-100 dark:hidden")}
                    dangerouslySetInnerHTML={{ __html: l.lightSvg! }}
                  />
                  <div
                    className={cn(base, "hidden opacity-60 hover:opacity-90 dark:block")}
                    dangerouslySetInnerHTML={{ __html: l.svg }}
                  />
                </div>
              )
            }

            return (
              <div
                key={l.title}
                role="img"
                aria-label={l.title}
                className={cn(base, "opacity-70 hover:opacity-100")}
                dangerouslySetInnerHTML={{ __html: l.svg }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
