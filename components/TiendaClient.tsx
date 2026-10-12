"use client"

import { useState } from "react"
import { PRODUCTS, Product, ProductCategory, WHATSAPP_NUMBER } from "@/lib/content"

const CATEGORIES: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all",        label: "Todo" },
  { id: "cafetera",   label: "Cafeteras" },
  { id: "accesorio",  label: "Accesorios" },
  { id: "consumible", label: "Consumibles" },
]

export default function TiendaClient() {
  const [category,    setCategory]    = useState<ProductCategory | "all">("all")
  const [cart,        setCart]        = useState<{ id: string; name: string; price: number }[]>([])
  const [showCart,    setShowCart]    = useState(false)

  const filtered = category === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === category)
  const isInCart = (id: string) => cart.some(c => c.id === id)

  const toggleCart = (product: Product) => {
    if (isInCart(product.id)) {
      setCart(cart.filter(c => c.id !== product.id))
    } else {
      setCart([...cart, { id: product.id, name: product.name, price: product.price }])
      setShowCart(true)
    }
  }

  const total = cart.reduce((a, c) => a + c.price, 0)

  const waMessage = () => {
    const lines = cart.map(c => `  - ${c.name}: $${c.price} MXN`).join("\n")
    const msg = `¡Hola! Quiero comprar los siguientes productos de Alma Mía:\n\n${lines}\n\n*Total:* $${total} MXN\n\n¿Cómo procedo?`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        borderBottom: "0.5px solid rgba(26,18,8,0.08)",
        padding: "24px 64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(245,242,237,0.95)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 40,
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img src="/logo.png" alt="Alma Mía" style={{ height: 46, objectFit: "contain" }} />
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chambray)" }}>
            Tienda
          </span>
          {cart.length > 0 && (
            <button
              onClick={() => setShowCart(!showCart)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#fff", background: "var(--chambray)",
                border: "none", borderRadius: 50, padding: "8px 18px", cursor: "pointer",
              }}
            >
              Carrito ({cart.length}) · ${total.toLocaleString()}
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 64px 80px" }}>

        {/* Page title */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ width: 28, height: 1, background: "var(--chambray)", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chambray)", fontWeight: 300 }}>Tienda</span>
            <span style={{ width: 28, height: 1, background: "var(--chambray)", display: "inline-block" }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px,5vw,56px)", color: "#1a1208", lineHeight: 1.05, marginBottom: 12 }}>
            Todo para tu <em style={{ color: "var(--chambray)" }}>ritual</em>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(26,18,8,0.5)", fontWeight: 300, maxWidth: 480, margin: "0 auto" }}>
            Cafeteras, tazas y accesorios seleccionados por Alma Mía para completar tu experiencia.
          </p>
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: "8px 20px", borderRadius: 50,
                fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: category === cat.id ? 500 : 300,
                letterSpacing: "0.08em", cursor: "pointer", transition: "all 0.25s",
                border: category === cat.id ? "1.5px solid var(--chambray)" : "1px solid rgba(26,18,8,0.15)",
                background: category === cat.id ? "var(--chambray)" : "transparent",
                color: category === cat.id ? "#fff" : "rgba(26,18,8,0.6)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 20 }}>
          {filtered.map(product => {
            const added = isInCart(product.id)
            return (
              <div key={product.id} style={{
                borderRadius: 24, overflow: "hidden",
                border: added ? "1.5px solid var(--chambray)" : "1px solid rgba(26,18,8,0.1)",
                background: added ? "rgba(59,81,160,0.04)" : "rgba(255,255,255,0.6)",
                transition: "all 0.3s",
              }}>
                {/* Image */}
                <div style={{ width: "100%", height: 260, overflow: "hidden", background: "#e8e4de" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: added ? 1 : 0.85, transition: "opacity 0.3s" }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "20px 20px 20px" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,18,8,0.35)", marginBottom: 6 }}>
                    {product.categoryLabel}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "#1a1208", marginBottom: 8, lineHeight: 1.15 }}>
                    {product.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(26,18,8,0.5)", fontWeight: 300, lineHeight: 1.6, marginBottom: 16 }}>
                    {product.longDescription}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "#1a1208" }}>
                      ${product.price.toLocaleString()}
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(26,18,8,0.4)", marginLeft: 4, fontWeight: 300 }}>MXN</span>
                    </span>
                    <button
                      onClick={() => toggleCart(product)}
                      style={{
                        padding: "9px 20px", borderRadius: 50,
                        fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500,
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
              </div>
            )
          })}
        </div>

        {/* Cart summary */}
        {showCart && cart.length > 0 && (
          <div style={{
            position: "fixed", bottom: 32, right: 32, zIndex: 50,
            background: "#ffffff", borderRadius: 24, padding: "24px 28px",
            border: "1px solid rgba(59,81,160,0.2)",
            boxShadow: "0 16px 48px rgba(26,18,8,0.12)",
            width: 320,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--chambray)", fontWeight: 500 }}>
                Tu carrito
              </span>
              <button onClick={() => setShowCart(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(26,18,8,0.4)", fontSize: 16 }}>✕</button>
            </div>

            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "0.5px solid rgba(26,18,8,0.08)", fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(26,18,8,0.7)", fontWeight: 300 }}>
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(59,81,160,0.15)" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,18,8,0.45)" }}>Total</span>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "#1a1208" }}>${total.toLocaleString()} MXN</span>
            </div>

            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                marginTop: 16, padding: "14px",
                background: "#25D366", color: "#fff", borderRadius: 50,
                fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
                letterSpacing: "0.15em", textTransform: "uppercase",
                textDecoration: "none", transition: "all 0.2s",
                boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
              }}
            >
              <span style={{ fontSize: 16 }}>💬</span>
              Pedir por WhatsApp
            </a>
          </div>
        )}
      </div>
    </main>
  )

  function waUrl() {
    const lines = cart.map(c => `  - ${c.name}: $${c.price} MXN`).join("\n")
    const msg = `¡Hola! Quiero comprar los siguientes productos de Alma Mía:\n\n${lines}\n\n*Total:* $${total} MXN\n\n¿Cómo procedo?`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }
}
