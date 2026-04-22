"use client"

import { useState } from "react"
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
  onCollapse?: () => void
}

export function DescriptionPanel({
  problemNumber,
  title,
  difficulty,
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
            <p>
              Design a{" "}
              <span className="rounded-md bg-muted/70 px-1.5 py-0.5 font-mono text-[0.85em]">
                dynamic array
              </span>{" "}
              (also called a resizable array) class, such as an{" "}
              <span className="rounded-md bg-muted/70 px-1.5 py-0.5 font-mono text-[0.85em]">
                ArrayList
              </span>{" "}
              in Java or a{" "}
              <span className="rounded-md bg-muted/70 px-1.5 py-0.5 font-mono text-[0.85em]">
                vector
              </span>{" "}
              in C++.
            </p>

            <p>
              Your{" "}
              <span className="rounded-md bg-muted/70 px-1.5 py-0.5 font-mono text-[0.85em]">
                DynamicArray
              </span>{" "}
              class should support the following operations:
            </p>

            <ul className="ml-1 space-y-2 [&>li]:flex [&>li]:gap-2 [&>li]:before:mt-[0.55em] [&>li]:before:size-1 [&>li]:before:shrink-0 [&>li]:before:rounded-full [&>li]:before:bg-muted-foreground/50">
              <li>
                <span>
                  <code className="font-mono text-[0.85em] text-primary">
                    DynamicArray(int capacity)
                  </code>
                  : Initialize an empty array with a capacity of{" "}
                  <code className="font-mono text-[0.85em]">capacity</code>.
                </span>
              </li>
              <li>
                <span>
                  <code className="font-mono text-[0.85em] text-primary">
                    int get(int i)
                  </code>
                  : Return the element at index{" "}
                  <code className="font-mono text-[0.85em]">i</code>. Assume 0
                  ≤ i &lt; length.
                </span>
              </li>
              <li>
                <span>
                  <code className="font-mono text-[0.85em] text-primary">
                    void set(int i, int n)
                  </code>
                  : Set the element at index{" "}
                  <code className="font-mono text-[0.85em]">i</code> to{" "}
                  <code className="font-mono text-[0.85em]">n</code>.
                </span>
              </li>
              <li>
                <span>
                  <code className="font-mono text-[0.85em] text-primary">
                    void pushback(int n)
                  </code>
                  : Add element{" "}
                  <code className="font-mono text-[0.85em]">n</code> to the
                  end of the array.
                </span>
              </li>
              <li>
                <span>
                  <code className="font-mono text-[0.85em] text-primary">
                    int popback()
                  </code>
                  : Remove and return the element at the end of the array.
                </span>
              </li>
              <li>
                <span>
                  <code className="font-mono text-[0.85em] text-primary">
                    int getCapacity()
                  </code>
                  : Return the current capacity of the array.
                </span>
              </li>
            </ul>

            <p>
              If we call{" "}
              <code className="font-mono text-[0.85em]">pushback()</code> but
              the array is full, we should{" "}
              <span className="text-foreground">double</span> the array first.
            </p>

            <div className="mt-6 space-y-2">
              <h2 className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground">
                Example 1:
              </h2>
              <pre className="overflow-x-auto rounded-lg border border-border/40 bg-background/60 p-4 font-mono text-[0.8rem] leading-[1.7] text-foreground/85">
                {`Input:
["push", 1, "getCap", "push", 2]

Output:
[null, null, 1, null]`}
              </pre>
            </div>

            <div className="mt-6 space-y-2">
              <h2 className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground">
                Constraints:
              </h2>
              <ul className="ml-1 space-y-1.5 [&>li]:flex [&>li]:gap-2 [&>li]:before:mt-[0.55em] [&>li]:before:size-1 [&>li]:before:shrink-0 [&>li]:before:rounded-full [&>li]:before:bg-muted-foreground/50">
                <li>
                  <span>
                    <code className="font-mono text-[0.85em]">
                      1 ≤ capacity ≤ 1000
                    </code>
                  </span>
                </li>
                <li>
                  <span>
                    <code className="font-mono text-[0.85em]">
                      0 ≤ n ≤ 1000
                    </code>
                  </span>
                </li>
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
