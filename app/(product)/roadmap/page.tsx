"use client"

import dynamic from "next/dynamic"

const RoadmapCanvas = dynamic(
  () => import("@/components/roadmap-canvas").then((m) => m.RoadmapCanvas),
  { ssr: false }
)

const RoadmapDashboard = dynamic(
  () =>
    import("@/components/roadmap-dashboard").then((m) => m.RoadmapDashboard),
  { ssr: false }
)

export default function RoadmapPage() {
  return (
    <main className="flex-1">
      <RoadmapCanvas />
      <RoadmapDashboard />
    </main>
  )
}
