import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Alma Mía | Tostadora de Café",
  description: "Diseña tu café ideal. Origen, tostado y molido artesanal mexicano.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
