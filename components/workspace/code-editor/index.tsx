"use client"

import dynamic from "next/dynamic"
import { EditorSkeleton } from "./editor-skeleton"
import type { CodeEditorProps } from "./types"

const MonacoAdapter = dynamic(() => import("./monaco-adapter"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
})

export function CodeEditor(props: CodeEditorProps) {
  return <MonacoAdapter {...props} />
}

export type { CodeEditorLanguage, CodeEditorProps } from "./types"
