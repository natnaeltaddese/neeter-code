"use client"
import { cn } from "@/lib/utils"
import { useRef, useEffect, useCallback } from "react"

export type InfiniteSliderProps = {
  children: React.ReactNode
  gap?: number
  speed?: number
  speedOnHover?: number
  direction?: "horizontal" | "vertical"
  reverse?: boolean
  className?: string
}

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)

  const startAnimation = useCallback(() => {
    const container = containerRef.current
    const copy = copyRef.current
    if (!container || !copy) return

    animationRef.current?.cancel()

    const isHorizontal = direction === "horizontal"
    const size = isHorizontal ? copy.offsetWidth : copy.offsetHeight
    const offset = size + gap
    const duration = (offset / speed) * 1000

    const prop = isHorizontal ? "translateX" : "translateY"
    const from = reverse ? -offset : 0
    const to = reverse ? 0 : -offset

    animationRef.current = container.animate(
      [
        { transform: `${prop}(${from}px)` },
        { transform: `${prop}(${to}px)` },
      ],
      {
        duration,
        iterations: Infinity,
        easing: "linear",
      }
    )
  }, [direction, gap, speed, reverse])

  useEffect(() => {
    startAnimation()

    const el = copyRef.current
    if (!el) return
    const observer = new ResizeObserver(startAnimation)
    observer.observe(el)

    return () => {
      observer.disconnect()
      animationRef.current?.cancel()
    }
  }, [startAnimation])

  const isHorizontal = direction === "horizontal"

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={
        speedOnHover
          ? () => {
              if (animationRef.current) {
                animationRef.current.playbackRate = speedOnHover / speed
              }
            }
          : undefined
      }
      onMouseLeave={
        speedOnHover
          ? () => {
              if (animationRef.current) {
                animationRef.current.playbackRate = 1
              }
            }
          : undefined
      }
    >
      <div
        ref={containerRef}
        className={cn(
          "flex w-max will-change-transform",
          isHorizontal ? "flex-row" : "flex-col"
        )}
        style={{ gap: `${gap}px` }}
      >
        <div
          ref={copyRef}
          className={cn(
            "flex shrink-0",
            isHorizontal ? "flex-row" : "flex-col"
          )}
          style={{ gap: `${gap}px` }}
        >
          {children}
        </div>
        <div
          aria-hidden
          className={cn(
            "flex shrink-0",
            isHorizontal ? "flex-row" : "flex-col"
          )}
          style={{ gap: `${gap}px` }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
