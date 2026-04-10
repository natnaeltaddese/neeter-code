import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "./mdx-components"

export function ChapterBody({ mdx }: { mdx: string }) {
  return (
    <div className="space-y-5">
      <MDXRemote source={mdx} components={mdxComponents} />
    </div>
  )
}
