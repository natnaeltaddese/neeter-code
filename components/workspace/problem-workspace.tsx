"use client"

import { Suspense } from "react"
import { ProblemLayout } from "./problem-layout"
import { WorkspaceNavbar } from "./workspace-navbar"

export type ProblemWorkspaceProps = {
  problemId: string
}

const PLACEHOLDER = {
  number: 1,
  title: "Design Dynamic Array (Resizable Array)",
  difficulty: "Easy" as const,
}

export function ProblemWorkspace({ problemId }: ProblemWorkspaceProps) {
  return (
    <div
      data-problem-id={problemId}
      className="flex min-h-dvh flex-col bg-background text-foreground"
    >
      <WorkspaceNavbar
        problemNumber={PLACEHOLDER.number}
        problemTitle={PLACEHOLDER.title}
        difficulty={PLACEHOLDER.difficulty}
      />
      <main className="min-h-0 flex-1">
        <Suspense fallback={null}>
          <ProblemLayout
            problemNumber={PLACEHOLDER.number}
            title={PLACEHOLDER.title}
            difficulty={PLACEHOLDER.difficulty}
          />
        </Suspense>
      </main>
    </div>
  )
}
