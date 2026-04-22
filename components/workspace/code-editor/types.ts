export type CodeEditorLanguage = "python" | "javascript" | "java" | "cpp"

export type CodeEditorProps = {
  value: string
  onChange: (value: string) => void
  language: CodeEditorLanguage
  readOnly?: boolean
  className?: string
}
