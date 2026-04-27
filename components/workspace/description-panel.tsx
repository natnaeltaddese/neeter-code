"use client"

import { useState } from "react"
import type { ProblemWorkspaceContent } from "@/lib/problem-workspace"
import { cn } from "@/lib/utils"
import { PanelHeaderCollapseButton, PanelShell } from "./panel-shell"

const TABS = ["Question", "Solution", "Submissions", "Discuss"] as const
type Tab = (typeof TABS)[number]

type Difficulty = "Easy" | "Medium" | "Hard"

const difficultyClass: Record<Difficulty, string> = {
  Easy: "text-emerald-600 dark:text-emerald-400",
  Medium: "text-amber-600 dark:text-amber-400",
  Hard: "text-red-600 dark:text-red-400",
}

export type DescriptionPanelProps = {
  problemNumber: number
  title: string
  difficulty: Difficulty
  content: ProblemWorkspaceContent
  onCollapse?: () => void
}

export function DescriptionPanel({
  problemNumber,
  title,
  difficulty,
  content,
  onCollapse,
}: DescriptionPanelProps) {
  const [active, setActive] = useState<Tab>("Question")

  return (
    <PanelShell
      header={
        <>
          <nav
            role="tablist"
            aria-label="Problem sections"
            className="flex items-center gap-0.5"
          >
            {TABS.map((tab) => {
              const isActive = tab === active
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab)}
                  className={cn(
                    "relative h-9 px-2.5 text-[0.8rem] font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2 -bottom-px h-px bg-primary"
                    />
                  )}
                </button>
              )
            })}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            {onCollapse && (
              <PanelHeaderCollapseButton
                onClick={onCollapse}
                label="Question"
              />
            )}
          </div>
        </>
      }
    >
      {active === "Question" ? (
        <article className="mx-auto max-w-3xl px-6 py-6">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
              {problemNumber}. {title}
            </h1>
            <span
              className={cn(
                "font-mono text-[11px] font-medium uppercase tracking-[0.12em]",
                difficultyClass[difficulty]
              )}
            >
              {difficulty}
            </span>
          </div>

          <div className="mt-5 space-y-4 font-sans text-[0.9rem] leading-[1.65] text-foreground/85">
            <p>{content.overview}</p>

            <div className="flex flex-wrap gap-1.5">
              {[content.concept, ...content.aliases].map((label) => (
                <span
                  key={label}
                  className="rounded-md bg-muted/70 px-1.5 py-0.5 font-mono text-[0.85em]"
                >
                  {label}
                </span>
              ))}
            </div>

            <p>
              Your{" "}
              <span className="rounded-md bg-muted/70 px-1.5 py-0.5 font-mono text-[0.85em]">
                {content.className}
              </span>{" "}
              class should support the following operations:
            </p>

            <ul className="ml-1 space-y-2 [&>li]:flex [&>li]:gap-2 [&>li]:before:mt-[0.55em] [&>li]:before:size-1 [&>li]:before:shrink-0 [&>li]:before:rounded-full [&>li]:before:bg-muted-foreground/50">
              {content.operations.map((operation) => (
                <li key={operation.signature}>
                  <span>
                    <code className="font-mono text-[0.85em] text-primary">
                      {operation.signature}
                    </code>
                    : {operation.description}
                  </span>
                </li>
              ))}
            </ul>

            {content.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}

            {content.examples.map((example) => (
              <div key={example.title} className="mt-6 space-y-2">
                <h2 className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground">
                  {example.title}
                </h2>
                <pre className="overflow-x-auto rounded-lg border border-border/40 bg-background/60 p-4 font-mono text-[0.8rem] leading-[1.7] text-foreground/85">
                  {`Input:
${example.input}

Output:
${example.output}`}
                </pre>
              </div>
            ))}

            <div className="mt-6 space-y-2">
              <h2 className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground">
                Constraints:
              </h2>
              <ul className="ml-1 space-y-1.5 [&>li]:flex [&>li]:gap-2 [&>li]:before:mt-[0.55em] [&>li]:before:size-1 [&>li]:before:shrink-0 [&>li]:before:rounded-full [&>li]:before:bg-muted-foreground/50">
                {content.constraints.map((constraint) => (
                  <li key={constraint}>
                    <span>
                      <code className="font-mono text-[0.85em]">
                        {constraint}
                      </code>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ) : (
        <div className="flex h-full items-center justify-center px-6 py-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {active} — coming soon
          </p>
        </div>
      )}
    </PanelShell>
  )
}
