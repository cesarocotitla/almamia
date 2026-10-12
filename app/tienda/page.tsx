"use client"

import dynamic from "next/dynamic"

const TiendaClient = dynamic(() => import("@/components/TiendaClient"), { ssr: false })

export default function TiendaPage() {
  return <TiendaClient />
}
