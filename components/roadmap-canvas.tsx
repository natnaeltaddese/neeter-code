"use client"

import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { cn } from "@/lib/utils"

const defaultEdgeOptions = {
  type: "smoothstep",
  style: { stroke: "var(--border)", strokeWidth: 1.5 },
}

export function RoadmapCanvas() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <ReactFlow
        nodes={[]}
        edges={[]}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={4}
        proOptions={{ hideAttribution: true }}
        className={cn("bg-background", "[&_.react-flow\_\_attribution]:hidden")}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="var(--border)"
        />
        <Controls
          showInteractive={false}
          className={cn(
            "!bottom-4 !left-4 !rounded-xl !border !border-border/40 !bg-card/90 !shadow-[0_2px_12px_rgba(0,0,0,0.04)] !backdrop-blur-sm",
            "dark:!bg-background/90 dark:!shadow-[0_2px_12px_rgba(0,0,0,0.2)]",
            "[&>button]:!border-0 [&>button]:!bg-transparent [&>button]:!text-foreground [&>button]:hover:!bg-muted"
          )}
        />
      </ReactFlow>
    </div>
  )
}
