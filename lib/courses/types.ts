export type Difficulty = "easy" | "medium" | "hard"

export type Chapter = {
  slug: string
  number: number
  title: string
  durationMin: number
  isFree?: boolean
  hasVideo?: boolean
  videoUrl?: string
  mdx: string
}

export type Section = {
  slug: string
  title: string
  chapters: Chapter[]
}

export type Instructor = {
  name: string
  title: string
}

export type Course = {
  slug: string
  title: string
  description: string
  longDescription: string
  duration: string
  difficulty: Difficulty
  image: string
  instructor: Instructor
  sections: Section[]
}
