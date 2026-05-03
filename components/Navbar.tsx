"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.set(navRef.current, { opacity: 0, y: -20 })
    gsap.to(navRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" })
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px 0",
        background: "transparent",
        backdropFilter: "none",
      }}
    >
      <img
        src="/logo.png"
        alt="Alma Mía"
        style={{ height: 56, width: "auto", objectFit: "contain" }}
      />
    </nav>
  )
}
