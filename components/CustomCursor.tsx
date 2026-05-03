"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const labelRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0

    // Hide default cursor
    document.body.style.cursor = "none"

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: "power2.out" })
    }

    // Smooth ring follows with lag
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring,  { x: ringX,  y: ringY  })
      gsap.set(label, { x: ringX,  y: ringY  })
      requestAnimationFrame(tick)
    }
    tick()

    // Hover effects
    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest("a, button, [data-cursor]")
      if (!isClickable) return

      const cursorLabel = (isClickable as HTMLElement).dataset.cursor ?? ""
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.4, ease: "power3.out" })
      gsap.to(dot,  { scale: 0,   duration: 0.3 })
      if (cursorLabel) {
        label.textContent = cursorLabel
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 })
      }
    }

    const onLeave = () => {
      gsap.to(ring,  { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" })
      gsap.to(dot,   { scale: 1, duration: 0.3 })
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 })
      label.textContent = ""
    }

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 })
    const onUp   = () => gsap.to(ring, { scale: 1,   duration: 0.3, ease: "elastic.out(1,0.5)" })

    window.addEventListener("mousemove",  onMove)
    window.addEventListener("mouseover",  onEnter)
    window.addEventListener("mouseout",   onLeave)
    window.addEventListener("mousedown",  onDown)
    window.addEventListener("mouseup",    onUp)

    return () => {
      document.body.style.cursor = ""
      window.removeEventListener("mousemove",  onMove)
      window.removeEventListener("mouseover",  onEnter)
      window.removeEventListener("mouseout",   onLeave)
      window.removeEventListener("mousedown",  onDown)
      window.removeEventListener("mouseup",    onUp)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: "fixed", zIndex: 9999,
        width: 6, height: 6, borderRadius: "50%",
        background: "#3b51a0",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "multiply",
      }} />

      {/* Ring */}
      <div ref={ringRef} style={{
        position: "fixed", zIndex: 9998,
        width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(59,81,160,0.5)",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "multiply",
      }} />

      {/* Label */}
      <div ref={labelRef} style={{
        position: "fixed", zIndex: 9997,
        fontFamily: "var(--font-sans)", fontSize: 9,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "#3b51a0", fontWeight: 500,
        pointerEvents: "none",
        transform: "translate(-50%, 28px)",
        opacity: 0,
        whiteSpace: "nowrap",
      }} />
    </>
  )
}
