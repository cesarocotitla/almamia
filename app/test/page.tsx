export default function TestPage() {
  const items = ["Chiapas","Oaxaca","Veracruz","Guerrero","Michoacán","Jalisco","Puebla","Hidalgo"]
  
  return (
    <div style={{ padding: 40, background: "#ffffff", minHeight: "100vh" }}>

      <h3 style={{ fontFamily: "sans-serif", marginBottom: 16 }}>
        Test grid + min-width:0 + overflow scroll
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 45%", border: "2px solid green" }}>
        
        {/* LEFT column — min-width:0 is the key */}
        <div style={{ minWidth: 0, padding: 24 }}>
          <p style={{ fontFamily: "sans-serif", marginBottom: 12 }}>Columna izquierda</p>
          <div style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: 10,
            overflowX: "auto",
            paddingBottom: 8,
          }}>
            {items.map(n => (
              <div key={n} style={{
                flexShrink: 0,
                padding: "10px 20px",
                borderRadius: 50,
                background: "#3b51a0",
                color: "#fff",
                fontFamily: "sans-serif",
                whiteSpace: "nowrap",
              }}>{n}</div>
            ))}
          </div>
        </div>

        <div style={{ background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
          columna derecha
        </div>
      </div>
    </div>
  )
}
