"use client"

import { useState } from "react"
import { PRODUCTS, Product } from "@/lib/content"

interface SuggestedProductsProps {
  extras: { id: string; name: string; price: number }[]
  onExtrasChange: (extras: { id: string; name: string; price: number }[]) => void
}

export default function SuggestedProducts({ extras, onExtrasChange }: SuggestedProductsProps) {
  const featured = PRODUCTS.filter(p => p.featured)

  const isAdded = (id: string) => extras.some(e => e.id === id)

  const toggle = (product: Product) => {
    if (isAdded(product.id)) {
      onExtrasChange(extras.filter(e => e.id !== product.id))
    } else {
      onExtrasChange([...extras, { id: product.id, name: product.name, price: product.price }])
    }
  }

  return (
    <div style={{ width: "100%", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
        <span style={{ width: 28, height: 1, background: "var(--chambray)", display: "inline-block" }} />
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chambray)", fontWeight: 300 }}>
          Completa tu experiencia
        </span>
        <span style={{ width: 28, height: 1, background: "var(--chambray)", display: "inline-block" }} />
      </div>

      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "#1a1208", textAlign: "center", marginBottom: 6, lineHeight: 1.1 }}>
        ¿Le agregamos algo más?
      </h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(26,18,8,0.45)", textAlign: "center", fontWeight: 300, marginBottom: 28 }}>
        Productos seleccionados para acompañar tu café
      </p>

      {/* Cards */}
      <div style={{ overflow: "hidden", padding: "16px 0" }}>
        <div style={{
          display: "flex", gap: 14,
          overflowX: "auto", paddingBottom: 8,
          scrollbarWidth: "none",
          justifyContent: "safe center",
        } as React.CSSProperties}>
          {featured.map(product => {
            const added = isAdded(product.id)
            return (
              <div
                key={product.id}
                style={{
                  flexShrink: 0, width: 180,
                  borderRadius: 20, padding: "18px 16px",
                  border: added ? "1.5px solid var(--chambray)" : "1px solid rgba(26,18,8,0.1)",
                  background: added ? "rgba(59,81,160,0.06)" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: added ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: added ? "0 8px 24px rgba(59,81,160,0.1)" : "0 2px 8px rgba(26,18,8,0.04)",
                }}
              >
                {/* Image */}
                <div style={{
                  width: "100%", height: 150, borderRadius: 12,
                  overflow: "hidden", marginBottom: 12,
                  background: "#e8e4de",
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    draggable={false}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: added ? 1 : 0.7, transition: "opacity 0.3s" }}
                  />
                </div>

                {/* Category */}
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,18,8,0.35)", marginBottom: 4 }}>
                  {product.categoryLabel}
                </div>

                {/* Name */}
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "#1a1208", marginBottom: 4, lineHeight: 1.2 }}>
                  {product.name}
                </div>

                {/* Description */}
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(26,18,8,0.45)", fontWeight: 300, marginBottom: 12, lineHeight: 1.5 }}>
                  {product.description}
                </div>

                {/* Price + button */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: 18, color: "#1a1208" }}>
                    ${product.price}
                  </span>
                  <button
                    onClick={() => toggle(product)}
                    style={{
                      padding: "6px 14px", borderRadius: 50,
                      fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 500,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      cursor: "pointer", transition: "all 0.25s",
                      border: added ? "1px solid var(--chambray)" : "1px solid rgba(26,18,8,0.15)",
                      background: added ? "var(--chambray)" : "transparent",
                      color: added ? "#fff" : "rgba(26,18,8,0.6)",
                    }}
                  >
                    {added ? "✓ Agregado" : "+ Agregar"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
