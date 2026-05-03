"use client"

import { useRef } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ExperienceSection from "@/components/ExperienceSection"
import CustomCursor from "@/components/CustomCursor"
import PageTransition from "@/components/PageTransition"

export default function App() {
  const experienceRef = useRef<HTMLDivElement>(null)

  const handleStart = () => {
    experienceRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <CustomCursor />
      <PageTransition />
      <main>
        <Navbar />
        <Hero onStart={handleStart} />
        <div ref={experienceRef}>
          <ExperienceSection />
        </div>
      </main>
    </>
  )
}
