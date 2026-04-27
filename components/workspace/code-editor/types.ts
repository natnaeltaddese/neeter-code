import type { WorkspaceLanguage } from "@/lib/problem-workspace"

export type CodeEditorLanguage = WorkspaceLanguage

export type CodeEditorProps = {
  value: string
  onChange: (value: string) => void
  language: CodeEditorLanguage
  readOnly?: boolean
  className?: string
}
