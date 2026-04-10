import type { MDXComponents } from "mdx/types"
import { cn } from "@/lib/utils"

export const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-12 mb-4 scroll-mt-8 font-heading text-[1.5rem] leading-[0.95] font-bold tracking-[-0.03em] text-foreground lg:text-[1.75rem] lg:tracking-[-0.04em]",
        className as string | undefined
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 mb-3 scroll-mt-8 text-[1.125rem] leading-none font-semibold tracking-[-0.02em] text-foreground",
        className as string | undefined
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "text-[0.9375rem] leading-[1.65] tracking-[-0.01em] text-balance text-foreground/90",
        className as string | undefined
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "text-primary underline-offset-4 hover:underline",
        className as string | undefined
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong
      className={cn(
        "font-semibold text-foreground",
        className as string | undefined
      )}
      {...props}
    />
  ),
  em: ({ className, ...props }) => (
    <em className={cn("italic", className as string | undefined)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-[1.6] text-foreground/90 marker:text-muted-foreground",
        className as string | undefined
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "list-inside list-decimal space-y-1.5 text-[0.9375rem] leading-[1.6] text-foreground/90 marker:text-muted-foreground",
        className as string | undefined
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("pl-1", className as string | undefined)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "rounded-xl border border-primary/20 bg-primary/[0.045] px-4 py-3 text-[0.9375rem] leading-[1.65] text-foreground/85",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
        "[&>p>strong]:text-foreground",
        className as string | undefined
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground",
        className as string | undefined
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }) => (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl border border-border/40 bg-[#f5f5f6] p-4 font-mono text-[0.8125rem] leading-[1.6]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]",
        "dark:bg-white/[0.02] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]",
        "[&>code]:bg-transparent [&>code]:p-0",
        className as string | undefined
      )}
      {...props}
    >
      {children}
    </pre>
  ),
  hr: ({ className, ...props }) => (
    <hr
      className={cn("border-border/40", className as string | undefined)}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="overflow-x-auto">
      <table
        className={cn(
          "w-full border-collapse text-[0.8125rem]",
          className as string | undefined
        )}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-b border-border/40 px-3 py-2 text-left font-semibold",
        className as string | undefined
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border-b border-border/20 px-3 py-2 text-foreground/90",
        className as string | undefined
      )}
      {...props}
    />
  ),
}
