import { IconPlayerPlayFilled } from "@tabler/icons-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function VideoPlayerSkeleton() {
  return (
    <div
      className={cn(
        "relative mb-8 overflow-hidden rounded-[1.25rem] border border-border/40 bg-[#f5f5f6] p-2",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_42%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_42%)]" />

      <div className="relative aspect-video overflow-hidden rounded-[1rem] border border-black/5 bg-[#111214] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/10 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-white/[0.14]" />
            <span className="size-2 rounded-full bg-white/10" />
            <span className="size-2 rounded-full bg-white/[0.08]" />
            <Skeleton className="ml-2 h-2.5 w-24 rounded-full bg-white/10" />
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.18em] text-white/50 uppercase">
            Lesson video
          </div>
        </div>

        <div className="absolute inset-x-0 top-14 px-5">
          <div className="max-w-[18rem] space-y-2.5">
            <Skeleton className="h-2.5 w-16 rounded-full bg-white/10" />
            <Skeleton className="h-7 w-full max-w-[15rem] rounded-full bg-white/[0.12]" />
            <Skeleton className="h-2.5 w-32 rounded-full bg-white/[0.08]" />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute size-28 rounded-full bg-primary/[0.18] blur-3xl" />
          <div className="flex size-[4.5rem] items-center justify-center rounded-full border border-white/10 bg-background/[0.88] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <IconPlayerPlayFilled className="size-7 translate-x-0.5 text-primary" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/[0.22] to-transparent px-4 pt-10 pb-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.08] backdrop-blur-sm">
                <IconPlayerPlayFilled className="size-3 text-white/70" />
              </div>
              <span className="font-mono text-[10px] text-white/[0.55] tabular-nums">
                0:00
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.18em] text-white/[0.45] uppercase">
              Chapter intro
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[34%] rounded-full bg-primary/80" />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2.5 w-14 rounded-full bg-white/10" />
              <Skeleton className="h-2.5 w-10 rounded-full bg-white/[0.08]" />
            </div>
            <Skeleton className="h-2.5 w-16 rounded-full bg-white/[0.08]" />
          </div>
        </div>
      </div>
    </div>
  )
}
