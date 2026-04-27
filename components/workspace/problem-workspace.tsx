"use client"

import { Suspense } from "react"
import type { Problem } from "@/lib/problems"
import { ProblemLayout } from "./problem-layout"
import { WorkspaceNavbar } from "./workspace-navbar"

export type ProblemWorkspaceProps = {
  problem: Problem
}

export function ProblemWorkspace({ problem }: ProblemWorkspaceProps) {
  return (
    <div
      data-problem-id={problem.id}
      className="flex min-h-dvh flex-col bg-background text-foreground"
    >
      <WorkspaceNavbar
        problemNumber={problem.number}
        problemTitle={problem.title}
        difficulty={problem.difficulty}
      />
      <main className="min-h-0 flex-1">
        <Suspense fallback={null}>
          <ProblemLayout
            problemNumber={problem.number}
            title={problem.title}
            difficulty={problem.difficulty}
            workspace={problem.workspace}
          />
        </Suspense>
      </main>
    </div>
  )
}
