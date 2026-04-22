"use client"

import { useCallback, useRef, useState } from "react"
import type { PanelImperativeHandle } from "react-resizable-panels"

export function useCollapsiblePanel() {
  const ref = useRef<PanelImperativeHandle>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const collapse = useCallback(() => ref.current?.collapse(), [])
  const expand = useCallback(() => ref.current?.expand(), [])
  const toggle = useCallback(() => {
    if (ref.current?.isCollapsed()) ref.current.expand()
    else ref.current?.collapse()
  }, [])

  const onResize = useCallback(() => {
    const next = ref.current?.isCollapsed() ?? false
    setIsCollapsed((prev) => (prev === next ? prev : next))
  }, [])

  return { ref, isCollapsed, collapse, expand, toggle, onResize }
}
