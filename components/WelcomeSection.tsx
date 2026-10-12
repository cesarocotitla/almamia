"use client"

import { WELCOME } from "@/lib/content"

export default function WelcomeSection() {
  return (
    <section style={{
      background: "#ffffff",
      padding: "120px 64px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%, rgba(59,81,160,0.06) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, width: "100%" }}>
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
          <span style={{ width: 28, height: 1, background: "var(--chambray)", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chambray)", fontWeight: 300 }}>
            {WELCOME.eyebrow}
          </span>
          <span style={{ width: 28, height: 1, background: "var(--chambray)", display: "inline-block" }} />
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(40px, 5vw, 64px)",
          color: "#1a1208",
          lineHeight: 1.05,
          marginBottom: 16,
          letterSpacing: "-0.01em",
        }}>
          {WELCOME.headline}
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: 16,
          lineHeight: 1.7, fontWeight: 300,
          color: "rgba(26,18,8,0.55)", maxWidth: 480,
          margin: "0 auto 72px",
        }}>
          {WELCOME.subtitle}
        </p>

        {/* Steps */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 32,
        }}>
          {WELCOME.steps.map((step, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "36px 28px",
              borderRadius: 24,
              border: "1px solid rgba(26,18,8,0.08)",
              background: "rgba(255,255,255,0.5)",
              position: "relative",
            }}>
              {/* Connector line between steps */}
              {i < WELCOME.steps.length - 1 && (
                <div style={{
                  position: "absolute", right: -16, top: "50%",
                  transform: "translateY(-50%)",
                  width: 32, height: 1,
                  background: "rgba(59,81,160,0.2)",
                  zIndex: 2,
                }} />
              )}

              {/* Icon */}
              <div style={{
                fontSize: 36, marginBottom: 16,
                width: 64, height: 64,
                borderRadius: "50%",
                background: "rgba(59,81,160,0.07)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {step.icon}
              </div>

              {/* Number */}
              <div style={{
                fontFamily: "var(--font-sans)", fontSize: 9,
                letterSpacing: "0.25em", textTransform: "uppercase",
                color: "var(--chambray)", fontWeight: 500, marginBottom: 10,
              }}>
                Paso {step.number}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "var(--font-serif)", fontSize: 22,
                color: "#1a1208", marginBottom: 10, lineHeight: 1.2,
              }}>
                {step.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: 13,
                lineHeight: 1.65, fontWeight: 300,
                color: "rgba(26,18,8,0.5)", textAlign: "center",
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => {
              const next = document.querySelector("section[data-step]") as HTMLElement
              if (next) next.scrollIntoView({ behavior: "smooth" })
              else window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#fff", background: "var(--chambray)",
              border: "none", borderRadius: 50,
              padding: "16px 40px", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(59,81,160,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(59,81,160,0.3)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(59,81,160,0.2)" }}
          >
            Comenzar experiencia
            <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>→</span>
          </button>
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(59,81,160,0.3), transparent)" }} />
        </div>
      </div>
    </section>
  )
}
