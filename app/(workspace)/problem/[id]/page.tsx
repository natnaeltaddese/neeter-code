import type { Metadata } from "next"
import { ProblemWorkspace } from "@/components/workspace/problem-workspace"
import { getProblem } from "@/lib/problems"

type ProblemPageProps = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: ProblemPageProps): Promise<Metadata> {
  const { id } = await params
  const problem = getProblem(id)
  return {
    title: `${problem.number}. ${problem.title} · NeetCode`,
    description: `Solve "${problem.title}" — a ${problem.difficulty} problem on NeetCode.`,
  }
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { id } = await params
  const problem = getProblem(id)
  return <ProblemWorkspace problem={problem} />
}
