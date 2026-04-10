import { IconPlayerPlayFilled } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export function VideoPlayerSkeleton() {
  return (
    <div
      className={cn(
        "relative mb-8 aspect-video w-full overflow-hidden rounded-xl border border-border/40 bg-muted/50 dark:bg-muted/30",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
      )}
    >
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            "flex size-14 items-center justify-center rounded-full border border-border/40 bg-background/90 backdrop-blur-sm",
            "shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
          )}
        >
          <IconPlayerPlayFilled className="size-5 translate-x-0.5 text-primary" />
        </div>
      </div>
    </div>
  )
}
