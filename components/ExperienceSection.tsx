"use client"

import React, { useRef, useState } from "react"
import { ORIGINS, ROASTS, GRINDS, QUANTITIES, buildWhatsAppMessage } from "@/lib/content"

type StepId = "origin" | "roast" | "grind" | "quantity"
interface Order { origin: number; roast: number; grind: number; quantity: number }

const STEPS_CONFIG = [
  { id: "origin"   as StepId, label: "Origen",   subtitle: "¿De dónde viene tu café?",     items: ORIGINS   },
  { id: "roast"    as StepId, label: "Tostado",  subtitle: "¿Qué tan intenso lo quieres?", items: ROASTS    },
  { id: "grind"    as StepId, label: "Molido",   subtitle: "¿Cómo lo preparas?",           items: GRINDS    },
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

// ── Grind icon SVG ───────────────────────────────────────────
function GrindIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? "#3b51a0" : "rgba(26,18,8,0.25)"
  const icons: Record<string, React.ReactElement> = {
    whole: (
      <svg width="48" height="48" viewBox="0 0 48 48" style={{ display: "block", marginBottom: 14 }}>
        <ellipse cx="24" cy="24" rx="13" ry="17" fill={color} opacity="0.9" />
        <line x1="24" y1="9" x2="23" y2="39" stroke={active ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.4)"} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    coarse: (
      <svg width="48" height="40" viewBox="0 0 48 40" style={{ display: "block", marginBottom: 14 }}>
        {[[8,8],[22,4],[36,8],[6,22],[20,18],[34,22],[12,32],[28,30]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill={color} opacity="0.85" />
        ))}
      </svg>
    ),
    medium: (
      <svg width="48" height="40" viewBox="0 0 48 40" style={{ display: "block", marginBottom: 14 }}>
        {[[6,6],[14,3],[22,6],[30,3],[38,6],[4,16],[12,13],[20,16],[28,13],[36,16],[44,13],[8,26],[16,23],[24,26],[32,23],[40,26],[10,34],[20,31],[30,34]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill={color} opacity="0.75" />
        ))}
      </svg>
    ),
    fine: (
      <svg width="48" height="40" viewBox="0 0 48 40" style={{ display: "block", marginBottom: 14 }}>
        {[[4,4],[9,2],[14,5],[19,2],[24,5],[29,2],[34,5],[39,2],[44,5],[2,11],[7,9],[12,12],[17,9],[22,12],[27,9],[32,12],[37,9],[42,12],[5,18],[10,16],[15,19],[20,16],[25,19],[30,16],[35,19],[40,16],[3,25],[8,23],[13,26],[18,23],[23,26],[28,23],[33,26],[38,23],[43,26],[6,32],[11,30],[16,33],[21,30],[26,33],[31,30],[36,33]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill={color} opacity="0.65" />
        ))}
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
  const meta     = !isGrind ? [item.region, item.altitude, item.temp, item.servings].filter(Boolean).map(String).join(" · ") : ""
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
function StepSection({ stepId, label, subtitle, items, selectedIndex, onSelect, stepNumber, isLast, quantityCount, onQuantityChange }: {
  stepId: StepId; label: string; subtitle: string
  items: Record<string, string | number | string[] | undefined>[]
  selectedIndex: number; onSelect: (i: number) => void
  stepNumber: number; isLast: boolean
  quantityCount: number; onQuantityChange: (n: number) => void
}) {
  const current = items[selectedIndex] as Record<string, string | number | string[] | undefined>

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 64px 80px", background: "#f5f2ed", position: "relative" }}>

      {/* Watermark number */}
      <div style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-serif)", fontSize: 180, fontWeight: 400, color: "rgba(59,81,160,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap" }}>
        {String(stepNumber).padStart(2, "0")}
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ width: 28, height: 1, background: "var(--chambray)", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chambray)", fontWeight: 300 }}>{label} · {stepNumber} de {STEPS_CONFIG.length}</span>
          <span style={{ width: 28, height: 1, background: "var(--chambray)", display: "inline-block" }} />
        </div>

        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(40px, 5vw, 64px)", color: "#1a1208", lineHeight: 1.05, marginBottom: 12 }}>
          {String(current.name ?? current.label ?? "")}
        </h2>

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
      <div style={{ width: "100%", maxWidth: 900, position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(26,18,8,0.3)", marginBottom: 16, textAlign: "center" }}>
          ← desliza para explorar →
        </p>

        {/* Outer wrapper — overflow hidden to contain scroll */}
        <div style={{ overflow: "hidden", padding: "16px 0" }}>
          <div style={{
            display: "flex", gap: 14,
            overflowX: "auto", overflowY: "visible",
            paddingBottom: 8, paddingTop: 8,
            scrollbarWidth: "none",
            justifyContent: "safe center",
          } as React.CSSProperties}>
            {items.map((item, i) => (
              <ItemCard key={i} item={item as Record<string, string | number | string[] | undefined>} index={i} isSelected={i === selectedIndex} stepId={stepId} onSelect={onSelect} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8 }}>
          {items.map((_, i) => (
            <div key={i} onClick={() => onSelect(i)} style={{ width: i === selectedIndex ? 20 : 6, height: 4, borderRadius: 2, background: i === selectedIndex ? "var(--chambray)" : "rgba(26,18,8,0.12)", transition: "all 0.3s", cursor: "pointer" }} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      {!isLast && (
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--chambray), transparent)" }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(26,18,8,0.28)" }}>Scroll</span>
        </div>
      )}
    </section>
  )
}

// ── Main ─────────────────────────────────────────────────────
export default function ExperienceSection() {
  const [order,         setOrder]         = useState<Order>({ origin: 0, roast: 0, grind: 0, quantity: 0 })
  const [quantityCount, setQuantityCount] = useState(1)

  const basePrice  = QUANTITIES[order.quantity]?.price ?? 0
  const summary = {
    origin:   ORIGINS[order.origin]?.name       ?? "",
    roast:    ROASTS[order.roast]?.name         ?? "",
    grind:    GRINDS[order.grind]?.name         ?? "",
    quantity: QUANTITIES[order.quantity]?.label ? `${quantityCount} × ${QUANTITIES[order.quantity].label}` : "",
    price:    basePrice * quantityCount,
  }
  const waUrl      = buildWhatsAppMessage(summary)
  const allSelected = summary.origin && summary.roast && summary.grind && summary.quantity

  return (
    <>
      {STEPS_CONFIG.map((step, i) => (
        <StepSection
          key={step.id}
          stepId={step.id}
          label={step.label}
          subtitle={step.subtitle}
          items={step.items as Record<string, string | number | string[] | undefined>[]}
          selectedIndex={order[step.id]}
          onSelect={idx => setOrder(prev => ({ ...prev, [step.id]: idx }))}
          stepNumber={i + 1}
          isLast={i === STEPS_CONFIG.length - 1}
          quantityCount={quantityCount}
          onQuantityChange={setQuantityCount}
        />
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
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 60, color: "#1a1208" }}>${summary.price}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(26,18,8,0.4)", marginLeft: 10 }}>MXN</span>
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
        section div[style*="overflow-x"]::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  )
}
