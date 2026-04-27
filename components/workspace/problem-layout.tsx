"use client"

import { Group, Panel, Separator } from "react-resizable-panels"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useCollapsiblePanel } from "@/hooks/use-collapsible-panel"
import { CollapsedRail } from "./collapsed-rail"
import { ConsolePanel } from "./console-panel"
import { DescriptionPanel } from "./description-panel"
import { EditorPanel } from "./editor-panel"
import type { CodeEditorLanguage } from "./code-editor/types"
import type { ProblemWorkspaceContent } from "@/lib/problem-workspace"

const HORIZONTAL_SEPARATOR = cn(
  "group relative w-2.5 shrink-0 cursor-col-resize bg-transparent transition-colors",
  "data-[disabled]:cursor-default"
)

const VERTICAL_SEPARATOR = cn(
  "group relative h-2.5 shrink-0 cursor-row-resize bg-transparent transition-colors",
  "data-[disabled]:cursor-default"
)

export type ProblemLayoutProps = {
  problemNumber: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  workspace: ProblemWorkspaceContent
}

export function ProblemLayout({
  problemNumber,
  title,
  difficulty,
  workspace,
}: ProblemLayoutProps) {
  const [language, setLanguage] = useState<CodeEditorLanguage>("python")
  const [code, setCode] = useState<string>(workspace.starterCode.python)

  const desc = useCollapsiblePanel()
  const editor = useCollapsiblePanel()
  const consolePanel = useCollapsiblePanel()

  const onLanguageChange = (next: CodeEditorLanguage) => {
    setLanguage(next)
    setCode(workspace.starterCode[next])
  }

  const onResetCode = () => setCode(workspace.starterCode[language])

  return (
    <>
      {/* Desktop: resizable 3-pane layout */}
      <div className="hidden h-[calc(100dvh-3rem)] min-h-0 w-full p-2.5 md:block">
        <Group
          id="problem-h-split"
          orientation="horizontal"
          className="h-full w-full"
        >
          <Panel
            id="description"
            panelRef={desc.ref}
            defaultSize={44}
            minSize={22}
            collapsible
            collapsedSize="32px"
            onResize={desc.onResize}
            className="min-h-0"
          >
            {desc.isCollapsed ? (
              <CollapsedRail
                side="left"
                label="Question"
                onExpand={desc.expand}
              />
            ) : (
              <DescriptionPanel
                problemNumber={problemNumber}
                title={title}
                difficulty={difficulty}
                content={workspace}
                onCollapse={desc.collapse}
              />
            )}
          </Panel>

          <Separator className={HORIZONTAL_SEPARATOR}>
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 h-10 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-border/80 opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100 group-active:bg-primary"
            />
          </Separator>

          <Panel id="right-column" defaultSize={56} minSize={30} className="min-h-0">
            <Group
              id="problem-v-split"
              orientation="vertical"
              className="h-full w-full"
            >
              <Panel
                id="editor"
                panelRef={editor.ref}
                defaultSize={65}
                minSize={20}
                collapsible
                collapsedSize="32px"
                onResize={editor.onResize}
                className="min-h-0"
              >
                {editor.isCollapsed ? (
                  <CollapsedRail
                    side="top"
                    label="Editor"
                    onExpand={editor.expand}
                  />
                ) : (
                  <EditorPanel
                    language={language}
                    onLanguageChange={onLanguageChange}
                    value={code}
                    onValueChange={setCode}
                    onCollapse={editor.collapse}
                    onReset={onResetCode}
                  />
                )}
              </Panel>

              <Separator className={VERTICAL_SEPARATOR}>
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-1/2 h-[3px] w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-border/80 opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100 group-active:bg-primary"
                />
              </Separator>

              <Panel
                id="console"
                panelRef={consolePanel.ref}
                defaultSize={35}
                minSize={15}
                collapsible
                collapsedSize="32px"
                onResize={consolePanel.onResize}
                className="min-h-0"
              >
                {consolePanel.isCollapsed ? (
                  <CollapsedRail
                    side="bottom"
                    label="Console"
                    onExpand={consolePanel.expand}
                  />
                ) : (
                  <ConsolePanel
                    testCases={workspace.testCases}
                    onCollapse={consolePanel.collapse}
                  />
                )}
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>

      {/* Mobile: tabbed single-pane */}
      <MobileTabs
        problemNumber={problemNumber}
        title={title}
        difficulty={difficulty}
        language={language}
        onLanguageChange={onLanguageChange}
        code={code}
        onCodeChange={setCode}
        onResetCode={onResetCode}
        workspace={workspace}
      />
    </>
  )
}

function MobileTabs({
  problemNumber,
  title,
  difficulty,
  language,
  onLanguageChange,
  code,
  onCodeChange,
  onResetCode,
  workspace,
}: {
  problemNumber: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  language: CodeEditorLanguage
  onLanguageChange: (language: CodeEditorLanguage) => void
  code: string
  onCodeChange: (code: string) => void
  onResetCode: () => void
  workspace: ProblemWorkspaceContent
}) {
  const tabs = ["Description", "Code", "Console"] as const
  type MobileTab = (typeof tabs)[number]
  const [active, setActive] = useState<MobileTab>("Description")

  return (
    <div className="flex h-[calc(100dvh-3rem)] min-h-0 w-full flex-col md:hidden">
      <nav
        role="tablist"
        aria-label="Workspace sections"
        className="flex shrink-0 items-center gap-0.5 border-b border-border/40 px-3"
      >
        {tabs.map((t) => {
          const isActive = t === active
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t)}
              className={cn(
                "relative h-9 px-3 text-[0.8rem] font-medium transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
              {isActive && (
                <span
                  aria-hidden
                  className="absolute inset-x-2 -bottom-px h-px bg-primary"
                />
              )}
            </button>
          )
        })}
      </nav>
      <div className="min-h-0 flex-1">
        {active === "Description" && (
          <DescriptionPanel
            problemNumber={problemNumber}
            title={title}
            difficulty={difficulty}
            content={workspace}
          />
        )}
        {active === "Code" && (
          <EditorPanel
            language={language}
            onLanguageChange={onLanguageChange}
            value={code}
            onValueChange={onCodeChange}
            onReset={onResetCode}
          />
        )}
        {active === "Console" && <ConsolePanel testCases={workspace.testCases} />}
      </div>
    </div>
  )
}
