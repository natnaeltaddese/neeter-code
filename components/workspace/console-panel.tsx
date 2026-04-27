"use client"

import { IconCloudUpload, IconPlayerPlayFilled } from "@tabler/icons-react"
import { useState } from "react"
import type { ProblemTestCase } from "@/lib/problem-workspace"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { PanelHeaderCollapseButton, PanelShell } from "./panel-shell"

const TABS = ["Test Cases", "Console"] as const
type Tab = (typeof TABS)[number]

export type ConsolePanelProps = {
  testCases: ProblemTestCase[]
  onCollapse?: () => void
}

export function ConsolePanel({ testCases, onCollapse }: ConsolePanelProps) {
  const [active, setActive] = useState<Tab>("Test Cases")
  const [activeCase, setActiveCase] = useState(0)
  const selectedCase = testCases[activeCase] ?? testCases[0]

  return (
    <PanelShell
      header={
        <>
          <nav
            role="tablist"
            aria-label="Console sections"
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

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline", size: "xs" }),
                "rounded-md"
              )}
            >
              <IconPlayerPlayFilled className="size-2.5" />
              Run
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ size: "xs" }), "rounded-md")}
            >
              <IconCloudUpload className="size-3" />
              Submit
            </button>
            {onCollapse && (
              <PanelHeaderCollapseButton
                onClick={onCollapse}
                label="Console"
              />
            )}
          </div>
        </>
      }
    >
      {active === "Test Cases" ? (
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="flex flex-wrap gap-1.5">
            {testCases.map((c, i) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setActiveCase(i)}
                className={cn(
                  "rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.02em] transition-colors",
                  i === activeCase
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/40 bg-background/60 text-muted-foreground hover:text-foreground"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex-1 rounded-lg border border-border/40 bg-background/60 p-3">
            <p className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Input
            </p>
            {selectedCase ? (
              <pre className="font-mono text-[0.8rem] leading-[1.7] text-foreground/85">
                {selectedCase.input}
              </pre>
            ) : (
              <p className="text-sm text-muted-foreground">
                No test cases configured.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Run your code to see output
          </p>
        </div>
      )}
    </PanelShell>
  )
}
