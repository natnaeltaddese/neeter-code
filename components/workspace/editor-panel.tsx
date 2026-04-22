"use client"

import {
  IconChevronDown,
  IconRefresh,
  IconSettings,
  IconWand,
} from "@tabler/icons-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { CodeEditor } from "./code-editor"
import type { CodeEditorLanguage } from "./code-editor/types"
import { PanelHeaderCollapseButton, PanelShell } from "./panel-shell"

const LANGUAGES: { value: CodeEditorLanguage; label: string }[] = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
]

export type EditorPanelProps = {
  language: CodeEditorLanguage
  onLanguageChange: (language: CodeEditorLanguage) => void
  value: string
  onValueChange: (value: string) => void
  onCollapse?: () => void
  onReset?: () => void
}

function LanguageSelect({
  language,
  onChange,
}: {
  language: CodeEditorLanguage
  onChange: (value: CodeEditorLanguage) => void
}) {
  const [open, setOpen] = useState(false)
  const current = LANGUAGES.find((l) => l.value === language) ?? LANGUAGES[0]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border/40 bg-background/60 px-2 font-mono text-[11px] font-medium tracking-[0.02em] text-foreground transition-colors hover:bg-background"
      >
        {current.label}
        <IconChevronDown
          className={cn(
            "size-3 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+4px)] left-0 z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border/40 bg-[#f5f5f6] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:bg-[#121214] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        >
          {LANGUAGES.map((l) => (
            <li key={l.value}>
              <button
                type="button"
                role="option"
                aria-selected={l.value === language}
                onMouseDown={(e) => {
                  e.preventDefault()
                  onChange(l.value)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2 py-1.5 font-mono text-[11px] font-medium tracking-[0.02em] transition-colors hover:bg-muted",
                  l.value === language
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {l.label}
                {l.value === language && (
                  <span className="size-1.5 rounded-full bg-primary" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function IconButton({
  onClick,
  label,
  children,
}: {
  onClick?: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  )
}

export function EditorPanel({
  language,
  onLanguageChange,
  value,
  onValueChange,
  onCollapse,
  onReset,
}: EditorPanelProps) {
  return (
    <PanelShell
      bodyClassName="overflow-hidden"
      header={
        <>
          <LanguageSelect language={language} onChange={onLanguageChange} />
          <div className="ml-auto flex items-center gap-0.5">
            <IconButton label="Format code">
              <IconWand className="size-3.5" />
            </IconButton>
            <IconButton label="Reset code" onClick={onReset}>
              <IconRefresh className="size-3.5" />
            </IconButton>
            <IconButton label="Editor settings">
              <IconSettings className="size-3.5" />
            </IconButton>
            {onCollapse && (
              <PanelHeaderCollapseButton onClick={onCollapse} label="Editor" />
            )}
          </div>
        </>
      }
    >
      <CodeEditor
        language={language}
        value={value}
        onChange={onValueChange}
      />
    </PanelShell>
  )
}
