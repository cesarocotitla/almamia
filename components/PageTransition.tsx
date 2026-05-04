"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const curtain = curtainRef.current
    if (!curtain) return

    // Entry curtain wipe
    gsap.fromTo(curtain,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: 1.2, ease: "power4.inOut", delay: 0.1,
        onComplete: () => { curtain.style.display = "none" }
      }
    )

    // Reveal sections on scroll
    const sections = document.querySelectorAll("[data-reveal]")
    sections.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          }
        }
      )
    })

    // Parallax on data-parallax elements
    document.querySelectorAll("[data-parallax]").forEach(el => {
      gsap.to(el, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      })
    })

  }, [])

  return (
    <div
      ref={curtainRef}
      style={{
        position: "fixed", inset: 0, zIndex: 9990,
        background: "#ffffff",
        transformOrigin: "top",
        pointerEvents: "none",
      }}
    />
  )
}
