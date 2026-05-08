import { cn } from "@/lib/utils"
import { cardClass, CardSheen } from "./shared"

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className={cn(cardClass, "flex min-h-[400px] flex-col items-center justify-center p-12 text-center")}>
      <CardSheen />
      <div className="relative flex flex-col items-center gap-3">
        <span className="rounded-md border border-border/60 px-2.5 py-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          Coming Soon
        </span>
        <h1 className="font-heading text-3xl font-bold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          This section is under construction. Check back soon.
        </p>
      </div>
    </div>
  )
}
