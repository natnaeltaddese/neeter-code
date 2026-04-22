import { Skeleton } from "@/components/ui/skeleton"

export function EditorSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-2 bg-[#fafafa] p-5 dark:bg-[#0a0a0b]">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3 rounded-sm bg-foreground/5 dark:bg-white/5"
          style={{ width: `${30 + ((i * 17) % 55)}%` }}
        />
      ))}
    </div>
  )
}
