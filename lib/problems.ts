export type Difficulty = "Easy" | "Medium" | "Hard"

export type Problem = {
  id: string
  number: number
  title: string
  difficulty: Difficulty
}

const PLACEHOLDER: Omit<Problem, "id"> = {
  number: 1,
  title: "Design Dynamic Array (Resizable Array)",
  difficulty: "Easy",
}

export function getProblem(id: string): Problem {
  return { id, ...PLACEHOLDER }
}
