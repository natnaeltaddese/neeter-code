import { CategoriesPanel } from "@/components/practice-dashboard/categories-panel"

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-8 pb-20 lg:px-6">
        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-[5.5rem] lg:self-start">
            <CategoriesPanel />
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}
