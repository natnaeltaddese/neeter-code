"use client"

import dynamic from "next/dynamic"

const RoadmapCanvas = dynamic(
  () => import("@/components/roadmap-canvas").then((m) => m.RoadmapCanvas),
  { ssr: false }
)

export default function RoadmapPage() {
  return (
    <main className="flex-1">
      <RoadmapCanvas />
    </main>
  )
}
