"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import gsap from "gsap"

interface VideoModalProps {
  url: string
  title: string
  onClose: () => void
}

export default function VideoModal({ url, title, onClose }: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.set(overlayRef.current, { opacity: 0 })
    gsap.set(modalRef.current,   { opacity: 0, y: 30, scale: 0.96 })
    gsap.to(overlayRef.current,  { opacity: 1, duration: 0.3 })
    gsap.to(modalRef.current,    { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.1 })

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose() }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 })
    gsap.to(modalRef.current,   { opacity: 0, y: 20, scale: 0.96, duration: 0.25, onComplete: onClose })
  }

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(26,18,8,0.75)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        ref={modalRef}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#ffffff", borderRadius: 24,
          overflow: "hidden", width: "100%", maxWidth: 800,
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 24px",
          borderBottom: "1px solid rgba(26,18,8,0.08)",
        }}>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--chambray)", fontWeight: 500,
          }}>
            {title}
          </span>
          <button
            onClick={handleClose}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              border: "1px solid rgba(26,18,8,0.15)",
              background: "transparent", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(26,18,8,0.5)", fontSize: 16,
              transition: "all 0.2s",
            }}
          >
            ✕
          </button>
        </div>

        {/* Video 16:9 */}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={`${url}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}
