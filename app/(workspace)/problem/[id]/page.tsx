type ProblemPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { id } = await params

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh max-w-7xl items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Problem workspace
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold">
            Problem {id}
          </h1>
        </div>
      </div>
    </main>
  )
}
