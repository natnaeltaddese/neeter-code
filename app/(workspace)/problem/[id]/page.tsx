import { ProblemWorkspace } from "@/components/workspace/problem-workspace"

type ProblemPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { id } = await params
  return <ProblemWorkspace problemId={id} />
}
