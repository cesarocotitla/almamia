"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { HERO, BRAND } from "@/lib/content"

interface HeroProps { onStart: () => void }

export default function Hero({ onStart }: HeroProps) {
  const sectionRef  = useRef<HTMLElement>(null)
  const bgRef       = useRef<HTMLDivElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLButtonElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax on mouse move
    const section = sectionRef.current
    const bg      = bgRef.current
    if (!section || !bg) return

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window
      const x = (e.clientX / w - 0.5) * 24
      const y = (e.clientY / h - 0.5) * 16
      gsap.to(bg, { x, y, duration: 1.8, ease: "power2.out" })
    }
    section.addEventListener("mousemove", onMouseMove)

    // Entrance animation
    gsap.set([eyebrowRef.current, subtitleRef.current, ctaRef.current, statsRef.current], { opacity: 0, y: 30 })
    gsap.set(overlayRef.current, { opacity: 0 })

    // Animate title word by word manually (no SplitText needed)
    const titleEl = titleRef.current
    if (titleEl) {
      gsap.set(titleEl, { opacity: 0, y: 60 })
    }

    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power4.out" } })
    tl.to(overlayRef.current,  { opacity: 1, duration: 2.0 })
      .to(titleEl,             { opacity: 1, y: 0, duration: 1.4 }, "-=1.6")
      .to(eyebrowRef.current,  { opacity: 1, y: 0, duration: 1.0 }, "-=1.0")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1.0 }, "-=0.8")
      .to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
      .to(statsRef.current,    { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")

    return () => section.removeEventListener("mousemove", onMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "none",
      }}
    >
      {/* Full-screen bg — moves with parallax */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-5%",
          backgroundImage: `url('${HERO.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />

      {/* Subtle light overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute", inset: 0,
          background: [
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.7) 100%)",
            "linear-gradient(to right,  rgba(255,255,255,1) 0%, rgba(255,255,255,0.60) 90%)",
          ].join(", "),
        }}
      />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column",
        height: "100%", padding: "0 64px",
      }}>
        <div style={{ height: 80 }} />

        <div style={{
          flex: 1, display: "flex",
          flexDirection: "column", justifyContent: "center",
        }}>
          {/* Eyebrow */}
          <div ref={eyebrowRef} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <span style={{ width: 32, height: 1, background: BRAND.primaryColor, display: "inline-block" }} />
            <span style={{
              fontFamily: "var(--font-sans)", fontSize: 12,
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: BRAND.primaryColor, fontWeight: 400,
            }}>
              Artesanal · Mexicano · Único
            </span>
          </div>

          {/* EDITORIAL TITLE — massive */}
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(64px, 7vw, 130px)",
              lineHeight: 0.95,
              color: "#1a1208",
              letterSpacing: "-0.03em",
              marginBottom: 32,
              maxWidth: "70vw",
            }}
          >
            {HERO.headline}<br />
            <em style={{ color: BRAND.primaryColor, fontStyle: "italic" }}>
              {HERO.headlineItalic}
            </em>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              fontFamily: "var(--font-sans)", fontSize: 13,
              lineHeight: 1.6, fontWeight: 300,
              color: "rgba(26,18,8,0.58)", maxWidth: 480,
              marginBottom: 36, whiteSpace: "nowrap",
            }}
          >
            {HERO.subtitle}
          </p>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={onStart}
            data-cursor="explorar"
            style={{
              display: "inline-flex", alignItems: "center", gap: 16,
              fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#fff", background: BRAND.primaryColor,
              border: "none", borderRadius: 50,
              padding: "18px 40px", cursor: "none",
              width: "fit-content",
            }}
            onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 })}
            onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1.00, duration: 0.3 })}
          >
            {HERO.cta}
            <span style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}>→</span>
          </button>
        </div>

        {/* Footer */}
        <div ref={statsRef} style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", paddingBottom: 36,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 1, height: 40,
              background: `linear-gradient(to bottom, ${BRAND.primaryColor}, transparent)`,
            }} />
            <span style={{
              fontFamily: "var(--font-sans)", fontSize: 9,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(26,18,8,0.32)",
            }}>Scroll</span>
          </div>

          <div style={{ display: "flex", gap: 40 }}>
            {HERO.stats.map(stat => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{
                  fontFamily: "var(--font-serif)", fontSize: 26,
                  color: "#1a1208", lineHeight: 1,
                }}>{stat.value}</span>
                <span style={{
                  fontFamily: "var(--font-sans)", fontSize: 9,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(26,18,8,0.5)", marginTop: 4, fontWeight: 400,
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </section>
  )
}
