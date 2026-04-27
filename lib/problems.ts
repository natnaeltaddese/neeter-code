import {
  practiceProblemById,
  practiceProblems,
  type Difficulty,
} from "./practice"
import {
  getProblemWorkspaceContent,
  type ProblemWorkspaceContent,
} from "./problem-workspace"

export type { Difficulty }

export type Problem = {
  id: string
  number: number
  title: string
  difficulty: Difficulty
  workspace: ProblemWorkspaceContent
}

export function getProblem(id: string): Problem {
  const problem = practiceProblemById[id]
  if (!problem) {
    const fallback = practiceProblems[0]
    return {
      id,
      number: fallback.number,
      title: fallback.title,
      difficulty: fallback.difficulty,
      workspace: getProblemWorkspaceContent(fallback.id),
    }
  }

  return {
    id: problem.id,
    number: problem.number,
    title: problem.title,
    difficulty: problem.difficulty,
    workspace: getProblemWorkspaceContent(problem.id),
  }
}
