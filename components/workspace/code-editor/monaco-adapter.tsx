"use client"

import { Editor, type Monaco } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { useCallback } from "react"
import { cn } from "@/lib/utils"
import { EditorSkeleton } from "./editor-skeleton"
import type { CodeEditorLanguage, CodeEditorProps } from "./types"

const LANGUAGE_MAP: Record<CodeEditorLanguage, string> = {
  python: "python",
  javascript: "javascript",
  java: "java",
  cpp: "cpp",
}

export default function MonacoAdapter({
  value,
  onChange,
  language,
  readOnly,
  className,
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const beforeMount = useCallback((monaco: Monaco) => {
    monaco.editor.defineTheme("neetcode-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "5c5c66", fontStyle: "italic" },
        { token: "keyword", foreground: "a78bfa" },
        { token: "string", foreground: "fbbf24" },
        { token: "number", foreground: "fbbf24" },
        { token: "type", foreground: "34d399" },
        { token: "function", foreground: "34d399" },
        { token: "variable", foreground: "e5e5e5" },
      ],
      colors: {
        "editor.background": "#0a0a0b",
        "editor.foreground": "#e5e5e5",
        "editorLineNumber.foreground": "#2a2a2f",
        "editorLineNumber.activeForeground": "#6b6b75",
        "editor.lineHighlightBackground": "#ffffff08",
        "editor.selectionBackground": "#a78bfa33",
        "editorCursor.foreground": "#a78bfa",
        "editorIndentGuide.background1": "#1a1a1f",
        "editorGutter.background": "#0a0a0b",
        "scrollbarSlider.background": "#ffffff10",
        "scrollbarSlider.hoverBackground": "#ffffff20",
        "scrollbarSlider.activeBackground": "#ffffff30",
      },
    })

    monaco.editor.defineTheme("neetcode-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "8e8e96", fontStyle: "italic" },
        { token: "keyword", foreground: "7c3aed" },
        { token: "string", foreground: "b45309" },
        { token: "number", foreground: "b45309" },
        { token: "type", foreground: "059669" },
        { token: "function", foreground: "059669" },
      ],
      colors: {
        "editor.background": "#fafafa",
        "editor.foreground": "#1a1a1f",
        "editorLineNumber.foreground": "#d4d4d8",
        "editorLineNumber.activeForeground": "#71717a",
        "editor.lineHighlightBackground": "#00000006",
        "editor.selectionBackground": "#7c3aed22",
        "editorCursor.foreground": "#7c3aed",
        "editorIndentGuide.background1": "#ececef",
        "editorGutter.background": "#fafafa",
      },
    })
  }, [])

  return (
    <div className={cn("h-full w-full", className)}>
      <Editor
        height="100%"
        width="100%"
        language={LANGUAGE_MAP[language]}
        value={value}
        onChange={(v) => onChange(v ?? "")}
        theme={isDark ? "neetcode-dark" : "neetcode-light"}
        beforeMount={beforeMount}
        loading={<EditorSkeleton />}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          lineHeight: 22,
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontLigatures: true,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          tabSize: 4,
          automaticLayout: true,
          renderLineHighlight: "line",
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          wordWrap: "on",
        }}
      />
    </div>
  )
}
