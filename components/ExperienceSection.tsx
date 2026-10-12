"use client"

import React, { useRef, useState } from "react"
import { ORIGINS, ROASTS, GRINDS, GRINDS_TECH, QUANTITIES, VIDEOS, buildWhatsAppMessage } from "@/lib/content"
import VideoModal from "@/components/VideoModal"
import SuggestedProducts from "@/components/SuggestedProducts"

type StepId = "origin" | "roast" | "grind" | "quantity"
interface Order { origin: number; roast: number; grind: number; quantity: number }
type GrindMode = "method" | "grind"

const STEPS_CONFIG = [
  { id: "origin"   as StepId, label: "Origen",   subtitle: "¿De dónde viene tu café?",     items: ORIGINS   },
  { id: "roast"    as StepId, label: "Tostado",  subtitle: "¿Qué tan intenso lo quieres?", items: ROASTS    },
  { id: "grind"    as StepId, label: "Preparación", subtitle: "¿Cómo preparas tu café?",   items: GRINDS    },
  { id: "quantity" as StepId, label: "Cantidad", subtitle: "¿Cuánto necesitas?",            items: QUANTITIES },
]


// ── Roast beans SVG ─────────────────────────────────────────
function RoastBeans({ color, opacity = 1 }: { color: string; opacity?: number }) {
  const lineColor = color < "#888" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.18)"
  const bean = (x: number, y: number, w: number, h: number) => (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={w/2} cy={h/2} rx={w/2} ry={h/2} fill={color} />
      <line x1={w/2} y1={h*0.2} x2={w/2-1} y2={h*0.8} stroke={lineColor} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  )
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" style={{ opacity, display: "block", marginBottom: 14 }}>
      {bean(2,  3, 16, 22)}
      {bean(24, 1, 18, 26)}
      {bean(46, 3, 16, 22)}
    </svg>
  )
}

// ── Brew method icon SVG ─────────────────────────────────────
function GrindIcon({ type, active }: { type: string; active: boolean }) {
  const c  = active ? "#3b51a0" : "rgba(26,18,8,0.28)"
  const sw = "1.8"
  const style = { display: "block" as const, marginBottom: 14 }

  const icons: Record<string, React.ReactElement> = {
    drip: (
      <svg width="44" height="48" viewBox="0 0 44 48" fill="none" style={style}>
        <rect x="6" y="10" width="32" height="28" rx="3" stroke={c} strokeWidth={sw}/>
        <path d="M14 38 L14 44 L30 44 L30 38" stroke={c} strokeWidth={sw} strokeLinejoin="round"/>
        <line x1="6" y1="18" x2="38" y2="18" stroke={c} strokeWidth="1.4"/>
        <line x1="22" y1="4" x2="22" y2="10" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <circle cx="22" cy="24" r="3" stroke={c} strokeWidth="1.4"/>
        <line x1="22" y1="27" x2="22" y2="38" stroke={c} strokeWidth="1.4" strokeDasharray="2 2"/>
      </svg>
    ),
    pot: (
      <svg width="44" height="48" viewBox="0 0 44 48" fill="none" style={style}>
        <path d="M10 16 L8 40 L36 40 L34 16 Z" stroke={c} strokeWidth={sw} strokeLinejoin="round"/>
        <ellipse cx="22" cy="16" rx="12" ry="4" stroke={c} strokeWidth={sw}/>
        <ellipse cx="22" cy="12" rx="8" ry="3" stroke={c} strokeWidth="1.4"/>
        <line x1="6" y1="28" x2="38" y2="28" stroke={c} strokeWidth="1.2" strokeDasharray="3 2"/>
        <path d="M34 22 Q40 20 40 26 Q40 30 34 28" stroke={c} strokeWidth="1.4" fill="none"/>
      </svg>
    ),
    espresso: (
      <svg width="44" height="48" viewBox="0 0 44 48" fill="none" style={style}>
        <rect x="4" y="14" width="36" height="22" rx="4" stroke={c} strokeWidth={sw}/>
        <line x1="4" y1="10" x2="40" y2="10" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <rect x="10" y="20" width="14" height="10" rx="2" stroke={c} strokeWidth="1.5"/>
        <circle cx="32" cy="22" r="3.5" stroke={c} strokeWidth="1.5"/>
        <line x1="17" y1="36" x2="17" y2="42" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="12" y1="42" x2="22" y2="42" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),
    v60: (
      <svg width="44" height="48" viewBox="0 0 44 48" fill="none" style={style}>
        <path d="M8 8 L22 38 L36 8 Z" stroke={c} strokeWidth={sw} strokeLinejoin="round"/>
        <line x1="10" y1="15" x2="34" y2="15" stroke={c} strokeWidth="1.2" strokeDasharray="3 2"/>
        <line x1="22" y1="38" x2="22" y2="44" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <ellipse cx="22" cy="46" rx="7" ry="2" stroke={c} strokeWidth="1.4"/>
        <line x1="14" y1="21" x2="30" y2="21" stroke={c} strokeWidth="1.1" strokeDasharray="2 2"/>
      </svg>
    ),
    frenchpress: (
      <svg width="44" height="48" viewBox="0 0 44 48" fill="none" style={style}>
        <rect x="8" y="10" width="28" height="30" rx="3" stroke={c} strokeWidth={sw}/>
        <line x1="8" y1="18" x2="36" y2="18" stroke={c} strokeWidth="1.5"/>
        <line x1="22" y1="4" x2="22" y2="10" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="14" y1="26" x2="30" y2="26" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="18" x2="22" y2="26" stroke={c} strokeWidth="1.5" strokeDasharray="2 2"/>
        <line x1="4" y1="40" x2="40" y2="40" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),
    chemex: (
      <svg width="44" height="48" viewBox="0 0 44 48" fill="none" style={style}>
        <path d="M10 6 L22 26 L34 6 Z" stroke={c} strokeWidth={sw} strokeLinejoin="round"/>
        <rect x="16" y="24" width="12" height="2" rx="1" fill={c} opacity="0.5"/>
        <path d="M16 26 L12 44 L32 44 L28 26 Z" stroke={c} strokeWidth={sw} strokeLinejoin="round"/>
        <line x1="8" y1="26" x2="36" y2="26" stroke={c} strokeWidth="1.5"/>
      </svg>
    ),
    aeropress: (
      <svg width="44" height="48" viewBox="0 0 44 48" fill="none" style={style}>
        <rect x="14" y="8" width="16" height="28" rx="2" stroke={c} strokeWidth={sw}/>
        <rect x="10" y="30" width="24" height="8" rx="2" stroke={c} strokeWidth={sw}/>
        <line x1="22" y1="38" x2="22" y2="44" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="14" y1="20" x2="30" y2="20" stroke={c} strokeWidth="1.5"/>
        <line x1="22" y1="2" x2="22" y2="8" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    moka: (
      <svg width="44" height="48" viewBox="0 0 44 48" fill="none" style={style}>
        <path d="M14 28 L12 42 L32 42 L30 28 Z" stroke={c} strokeWidth={sw} strokeLinejoin="round"/>
        <ellipse cx="22" cy="28" rx="10" ry="3.5" stroke={c} strokeWidth={sw}/>
        <path d="M14 28 L13 16 Q13 8 22 8 Q31 8 31 16 L30 28" stroke={c} strokeWidth={sw} fill="none"/>
        <path d="M30 20 Q38 18 38 24 Q38 30 30 28" stroke={c} strokeWidth="1.5" fill="none"/>
        <ellipse cx="22" cy="8" rx="5" ry="2" stroke={c} strokeWidth="1.4"/>
      </svg>
    ),
    coldbrew: (
      <svg width="44" height="48" viewBox="0 0 44 48" fill="none" style={style}>
        <rect x="10" y="10" width="24" height="32" rx="5" stroke={c} strokeWidth={sw}/>
        <rect x="15" y="6" width="14" height="6" rx="2" stroke={c} strokeWidth="1.5"/>
        <line x1="10" y1="24" x2="34" y2="24" stroke={c} strokeWidth="1.2" strokeDasharray="3 2"/>
        <line x1="14" y1="30" x2="30" y2="30" stroke={c} strokeWidth="1.1" strokeDasharray="2 2"/>
        <line x1="14" y1="35" x2="26" y2="35" stroke={c} strokeWidth="1.1" strokeDasharray="2 2"/>
      </svg>
    ),
    whole: (
      <svg width="44" height="48" viewBox="0 0 44 48" fill="none" style={style}>
        <circle cx="22" cy="22" r="14" stroke={c} strokeWidth={sw}/>
        <path d="M17 18 Q17 13 22 13 Q27 13 27 18 Q27 21 22 23 L22 26" stroke={c} strokeWidth={sw} strokeLinecap="round" fill="none"/>
        <circle cx="22" cy="30" r="1.8" fill={c}/>
      </svg>
    ),
  }
  return icons[type] ?? null
}

// ── Card ─────────────────────────────────────────────────────
function ItemCard({ item, index, isSelected, stepId, onSelect }: {
  item: Record<string, string | number | string[] | undefined>
  index: number; isSelected: boolean; stepId: StepId
  onSelect: (i: number) => void
}) {
  const isGrind  = stepId === "grind"
  const isRoast  = stepId === "roast"
  const name     = String(item.name ?? item.label ?? "")
  const texture  = isGrind ? String(item.texture ?? "") : ""
  const methods  = isGrind && Array.isArray(item.methods) ? item.methods as string[] : []
  const particle = isGrind ? String(item.particle ?? "") : ""
  const grindIcon = isGrind ? String(item.grindIcon ?? "") : ""
  const roastColor = isRoast ? String(item.accentColor ?? "#8B5E3C") : ""
  const meta     = !isGrind ? [item.region, item.process && `Proceso ${item.process}`, item.variety, item.altitude, item.temp, item.servings].filter(Boolean).map(String).join(" · ") : ""
  const producer = item.producer ? String(item.producer) : ""
  const notes    = !isGrind && Array.isArray(item.notes) ? item.notes as string[] : []
  const price    = item.price ? `$${item.price} MXN` : null

  return (
    <div
      onClick={() => onSelect(index)}
      style={{
        flexShrink: 0, width: 200,
        borderRadius: 20, padding: "24px 20px",
        border: isSelected ? "1.5px solid var(--chambray)" : "1px solid rgba(26,18,8,0.1)",
        background: isSelected ? "rgba(59,81,160,0.06)" : "rgba(255,255,255,0.6)",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: isSelected ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isSelected ? "0 12px 32px rgba(59,81,160,0.12)" : "0 2px 8px rgba(26,18,8,0.04)",
      }}
    >
      {/* Roast beans */}
      {isRoast && <RoastBeans color={roastColor} opacity={isSelected ? 1 : 0.45} />}

      {/* Grind icon */}
      {isGrind && <GrindIcon type={grindIcon} active={isSelected} />}

      <div style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 400, color: isSelected ? "rgba(59,81,160,0.15)" : "rgba(26,18,8,0.06)", lineHeight: 1, marginBottom: 8, transition: "color 0.3s" }}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: isSelected ? "var(--chambray)" : "rgba(26,18,8,0.25)", marginBottom: 10, fontWeight: 500, transition: "color 0.3s" }}>
        {isSelected ? "✓ seleccionado" : "toca para elegir"}
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "#1a1208", marginBottom: 8, lineHeight: 1.1 }}>
        {name}
      </div>

      {isGrind && (
        <>
          {texture && <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(26,18,8,0.4)", fontWeight: 300, marginBottom: 10, fontStyle: "italic" }}>{texture}</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
            {methods.map(m => (
              <div key={m} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: 11, color: isSelected ? "rgba(26,18,8,0.7)" : "rgba(26,18,8,0.45)", fontWeight: 300 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--chambray)", opacity: isSelected ? 1 : 0.35, flexShrink: 0 }} />
                {m}
              </div>
            ))}
          </div>
          {particle && <div style={{ fontFamily: "monospace", fontSize: 11, color: isSelected ? "var(--chambray)" : "rgba(26,18,8,0.18)", letterSpacing: "0.1em" }}>{particle}</div>}
        </>
      )}

      {!isGrind && (
        <>
          {producer && <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(26,18,8,0.55)", fontWeight: 300, marginBottom: 6 }}>Productor: {producer}</div>}
          {meta && <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,18,8,0.35)", fontWeight: 300, marginBottom: notes.length ? 10 : 0 }}>{meta}</div>}
          {notes.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {notes.map(note => (
                <span key={note} style={{ fontFamily: "var(--font-sans)", fontSize: 10, padding: "3px 9px", borderRadius: 20, border: "1px solid rgba(59,81,160,0.18)", color: "var(--chambray)", background: "rgba(59,81,160,0.04)", fontWeight: 300 }}>{note}</span>
              ))}
            </div>
          )}
          {price && <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "var(--chambray)", marginTop: 14 }}>{price}</div>}
        </>
      )}
    </div>
  )
}

// ── Quantity stepper ─────────────────────────────────────────
function QuantityStepper({ count, onChange }: { count: number; onChange: (n: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,18,8,0.4)", fontWeight: 300 }}>Bolsas</span>
      <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(26,18,8,0.15)", borderRadius: 50 }}>
        <button onClick={() => onChange(Math.max(1, count - 1))} style={{ width: 40, height: 40, background: "transparent", border: "none", cursor: "pointer", color: count === 1 ? "rgba(26,18,8,0.2)" : "#1a1208", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
        <span style={{ minWidth: 40, textAlign: "center", fontFamily: "var(--font-serif)", fontSize: 22, color: "#1a1208" }}>{count}</span>
        <button onClick={() => onChange(Math.min(20, count + 1))} style={{ width: 40, height: 40, background: "transparent", border: "none", cursor: "pointer", color: "#1a1208", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
      </div>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--chambray)", fontWeight: 500 }}>{count > 1 ? `${count} bolsas` : "1 bolsa"}</span>
    </div>
  )
}

// ── Step section ─────────────────────────────────────────────
function StepSection({ stepId, label, subtitle, items, selectedIndex, onSelect, stepNumber, isLast, quantityCount, onQuantityChange, onContinue, videoUrl, grindMode, onGrindModeChange }: {
  stepId: StepId; label: string; subtitle: string
  items: Record<string, string | number | string[] | undefined>[]
  selectedIndex: number; onSelect: (i: number) => void
  stepNumber: number; isLast: boolean
  quantityCount: number; onQuantityChange: (n: number) => void
  onContinue: () => void
  videoUrl: string
  grindMode: GrindMode; onGrindModeChange: (m: GrindMode) => void
}) {
  const isGrindStep = stepId === "grind"
  const [showVideo,   setShowVideo]   = useState(false)
  const activeItems: Record<string, string | number | string[] | undefined>[] = isGrindStep
    ? (grindMode === "method" ? GRINDS : GRINDS_TECH) as unknown as Record<string, string | number | string[] | undefined>[]
    : items
  const safeIndex = Math.min(selectedIndex, activeItems.length - 1)
  const current = (activeItems[safeIndex] ?? activeItems[0]) as Record<string, string | number | string[] | undefined>

  return (
    <section data-step={stepId} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 64px 48px", background: "#ffffff", position: "relative" }}>

      {/* Watermark number */}
      <div style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-serif)", fontSize: 180, fontWeight: 400, color: "rgba(59,81,160,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap" }}>
        {String(stepNumber).padStart(2, "0")}
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 6 }}>
          <span style={{ width: 40, height: 2, background: "var(--chambray)", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 18, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--chambray)", fontWeight: 600 }}>{label}</span>
          <span style={{ width: 40, height: 2, background: "var(--chambray)", display: "inline-block" }} />
        </div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,18,8,0.4)", fontWeight: 400, marginBottom: 16 }}>
          Paso {stepNumber} de {STEPS_CONFIG.length}
        </div>

        {/* Video button */}
        {videoUrl && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <button
              onClick={() => setShowVideo(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 400,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(26,18,8,0.45)", background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(26,18,8,0.12)", borderRadius: 50,
                padding: "6px 16px", cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--chambray)"; e.currentTarget.style.color = "var(--chambray)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(26,18,8,0.12)"; e.currentTarget.style.color = "rgba(26,18,8,0.45)" }}
            >
              <span>▶</span> ¿Qué es esto?
            </button>
          </div>
        )}

        {/* Video modal */}
        {showVideo && (
          <VideoModal url={videoUrl} title={label} onClose={() => setShowVideo(false)} />
        )}

        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(40px, 5vw, 64px)", color: "#1a1208", lineHeight: 1.05, marginBottom: 12 }}>
          {String(current.name ?? current.label ?? "")}
        </h2>

        {current.producer && (
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--chambray)", fontWeight: 400, marginBottom: 12 }}>
            {[current.region, current.farm && `Finca ${current.farm}`, `Productor: ${current.producer}`].filter(Boolean).join(" · ")}
          </div>
        )}

        {current.description && (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.7, color: "rgba(26,18,8,0.5)", fontWeight: 300, maxWidth: 480, margin: "0 auto" }}>
            {String(current.description)}
          </p>
        )}

        {current.price && (
          <div style={{ marginTop: 20 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 48, color: "#1a1208" }}>${Number(current.price) * quantityCount}</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(26,18,8,0.4)", marginLeft: 8 }}>MXN</span>
            {quantityCount > 1 && <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--chambray)", marginLeft: 10 }}>({quantityCount} × ${Number(current.price)})</span>}
          </div>
        )}

        {stepId === "quantity" && <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}><QuantityStepper count={quantityCount} onChange={onQuantityChange} /></div>}
      </div>

      {/* Cards carousel */}
      <div style={{ width: "100%", position: "relative", zIndex: 1 }}>

        {isGrindStep && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", background: "rgba(26,18,8,0.06)", borderRadius: 50, padding: 4, gap: 4 }}>
              {(["method", "grind"] as const).map((mode, idx) => (
                <button key={mode} onClick={() => onGrindModeChange(mode)} style={{
                  padding: "8px 20px", borderRadius: 50, border: "none", cursor: "pointer",
                  fontFamily: "var(--font-sans)", fontSize: 11,
                  fontWeight: grindMode === mode ? 500 : 300,
                  letterSpacing: "0.08em",
                  background: grindMode === mode ? "#fff" : "transparent",
                  color: grindMode === mode ? "var(--chambray)" : "rgba(26,18,8,0.45)",
                  boxShadow: grindMode === mode ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.25s",
                }}>
                  {idx === 0 ? "Método de preparación" : "Tipo de molienda"}
                </button>
              ))}
            </div>
          </div>
        )}

        <p style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(26,18,8,0.3)", marginBottom: 12, textAlign: "center" }}>
          ← desliza para explorar →
        </p>

        <div style={{ overflow: "hidden", padding: "12px 0" }}>
          <div style={{
            display: "flex", gap: 14,
            overflowX: "auto", overflowY: "visible",
            paddingBottom: 12, paddingTop: 8,
            paddingLeft: 8, paddingRight: 8,
            scrollbarWidth: "auto",
            scrollbarColor: "rgba(59,81,160,0.3) transparent",
            justifyContent: "safe center",
          } as React.CSSProperties}
          className="card-track">
            {activeItems.map((item, i) => (
              <ItemCard key={i} item={item as Record<string, string | number | string[] | undefined>} index={i} isSelected={i === selectedIndex} stepId={stepId} onSelect={onSelect} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8 }}>
          {activeItems.map((_, i) => (
            <div key={i} onClick={() => onSelect(i)} style={{ width: i === selectedIndex ? 20 : 6, height: 4, borderRadius: 2, background: i === selectedIndex ? "var(--chambray)" : "rgba(26,18,8,0.12)", transition: "all 0.3s", cursor: "pointer" }} />
          ))}
        </div>
      </div>

      {/* Continue button */}
      {!isLast && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 24, paddingBottom: 24 }}>
          <button
            onClick={onContinue}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#fff", background: "var(--chambray)",
              border: "none", borderRadius: 50,
              padding: "14px 32px", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(59,81,160,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(59,81,160,0.3)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(59,81,160,0.2)" }}
          >
            Continuar
            <span style={{ fontSize: 16 }}>↓</span>
          </button>
        </div>
      )}
    </section>
  )
}

// ── Main ─────────────────────────────────────────────────────
export default function ExperienceSection() {
  const [order,         setOrder]         = useState<Order>({ origin: 0, roast: Math.max(0, ROASTS.findIndex(r => r.id === "full-city")), grind: 0, quantity: Math.max(0, QUANTITIES.findIndex(q => q.id === "500")) })
  const [grindMode,     setGrindMode]     = useState<GrindMode>("grind")
  const [quantityCount, setQuantityCount] = useState(1)
  const [extras,        setExtras]        = useState<{ id: string; name: string; price: number }[]>([])
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const scrollToNext = (currentIndex: number) => {
    const next = sectionRefs.current[currentIndex + 1]
    if (next) next.scrollIntoView({ behavior: "smooth" })
  }

  const originPrices: Record<string, number> = ORIGINS[order.origin]?.prices ?? {}
  const quantityItems = QUANTITIES.map(q => ({ ...q, price: originPrices[q.id] ?? q.price }))
  const basePrice  = quantityItems[order.quantity]?.price ?? 0
  const summary = {
    origin:   ORIGINS[order.origin]?.name       ?? "",
    roast:    ROASTS[order.roast]?.name         ?? "",
    grind:    (grindMode === "method" ? GRINDS : GRINDS_TECH)[order.grind]?.recommendedGrind ?? "",
    quantity: QUANTITIES[order.quantity]?.label ? `${quantityCount} × ${QUANTITIES[order.quantity].label}` : "",
    price:    basePrice * quantityCount,
    extras:   extras,
  }
  const extrasTotal = extras.reduce((a, e) => a + e.price, 0)
  const waUrl      = buildWhatsAppMessage(summary)
  const allSelected = summary.origin && summary.roast && summary.grind && summary.quantity

  return (
    <>
      {STEPS_CONFIG.map((step, i) => (
        <div key={step.id} ref={el => { sectionRefs.current[i] = el }}>
          <StepSection
            stepId={step.id}
            label={step.label}
            subtitle={step.subtitle}
            items={(step.id === "quantity" ? quantityItems : step.items) as Record<string, string | number | string[] | undefined>[]}
            selectedIndex={order[step.id]}
            onSelect={idx => setOrder(prev => ({ ...prev, [step.id]: idx }))}
            stepNumber={i + 1}
            isLast={i === STEPS_CONFIG.length - 1}
            quantityCount={quantityCount}
            onQuantityChange={setQuantityCount}
            onContinue={() => scrollToNext(i)}
            videoUrl={VIDEOS[step.id as keyof typeof VIDEOS] ?? ""}
            grindMode={grindMode}
            onGrindModeChange={m => { setGrindMode(m); setOrder(prev => ({ ...prev, grind: 0 })) }}
          />
        </div>
      ))}

      {/* CTA */}
      <section style={{ minHeight: "100vh", background: "#eeeae4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,81,160,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, justifyContent: "center" }}>
            <span style={{ width: 28, height: 1, background: "var(--chambray)", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chambray)", fontWeight: 300 }}>Tu pedido</span>
            <span style={{ width: 28, height: 1, background: "var(--chambray)", display: "inline-block" }} />
          </div>

          {/* Suggested products */}
          <div style={{ marginBottom: 56 }}>
            <SuggestedProducts extras={extras} onExtrasChange={setExtras} />
          </div>

          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 52, color: "#1a1208", marginBottom: 48, lineHeight: 1.1 }}>
            Tu café <em style={{ color: "var(--chambray)" }}>ideal</em>
          </h2>

          <div style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { label: "Origen",   value: summary.origin,   icon: "🌱" },
              { label: "Tostado",  value: summary.roast,    icon: "🔥" },
              { label: "Molido",   value: summary.grind,    icon: "⚙️" },
              { label: "Cantidad", value: summary.quantity,  icon: "📦" },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{ padding: "20px 28px", borderRadius: 16, minWidth: 130, border: value ? "1px solid rgba(59,81,160,0.25)" : "1px solid rgba(26,18,8,0.1)", background: value ? "rgba(59,81,160,0.07)" : "rgba(26,18,8,0.02)", transition: "all 0.4s" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(26,18,8,0.35)", marginBottom: 6 }}>{label}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, color: value ? "#1a1208" : "rgba(26,18,8,0.2)" }}>{value || "—"}</div>
              </div>
            ))}
          </div>

          {summary.price > 0 && (
            <div style={{ marginBottom: 40 }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 60, color: "#1a1208" }}>${summary.price + extrasTotal}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(26,18,8,0.4)", marginLeft: 10 }}>MXN</span>
              {extrasTotal > 0 && (
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(26,18,8,0.4)", marginTop: 4, fontWeight: 300 }}>
                  Café ${summary.price} + accesorios ${extrasTotal}
                </div>
              )}
            </div>
          )}

          <a href={allSelected ? waUrl : undefined} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", borderRadius: 50, padding: "18px 40px", textDecoration: "none", background: allSelected ? "#25D366" : "var(--chambray)", opacity: allSelected ? 1 : 0.35, pointerEvents: allSelected ? "auto" : "none", transition: "all 0.4s", boxShadow: allSelected ? "0 8px 32px rgba(37,211,102,0.2)" : "none" }}>
            <span style={{ fontSize: 18 }}>💬</span>
            Realizar pedido por WhatsApp →
          </a>

          {!allSelected && <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(26,18,8,0.32)", marginTop: 14, fontWeight: 300 }}>Completa todas las selecciones para continuar</p>}
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .card-track::-webkit-scrollbar { height: 4px; }
        .card-track::-webkit-scrollbar-track { background: transparent; }
        .card-track::-webkit-scrollbar-thumb { background: rgba(59,81,160,0.25); border-radius: 2px; }
        .card-track::-webkit-scrollbar-thumb:hover { background: rgba(59,81,160,0.45); }
      `}</style>
    </>
  )
}
