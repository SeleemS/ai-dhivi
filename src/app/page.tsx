'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-white/10 text-lg font-medium tracking-tight">
        <h1 className="text-2xl font-bold">AI Dhivi</h1>
        <nav className="flex gap-4 sm:gap-6">
          <Button variant="ghost" className="text-white hover:text-gray-300 hidden sm:inline px-3">Home</Button>
          <Button variant="ghost" className="text-white hover:text-gray-300 hidden sm:inline px-3">About</Button>
          <Button variant="ghost" className="text-white hover:text-gray-300 px-3">Contact</Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 sm:py-36 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-neutral-900 to-black">
        <div className="max-w-4xl space-y-6">
          <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight">
            Build the Future of Learning
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Empower teachers. Engage students. Automate everything else.
          </p>
          <Button
            onClick={() => router.push("/dashboard")}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-white px-10 py-5 sm:px-12 sm:py-6 text-xl sm:text-2xl font-semibold text-black shadow-xl transition-all duration-300 hover:bg-gray-100 active:scale-[0.97]"
          >
            <span className="absolute inset-0 h-full w-full scale-0 transform bg-white opacity-10 transition-all duration-300 group-hover:scale-100" />
            <span className="relative z-10">Load Dashboard</span>
          </Button>
        </div>
      </section>
    </div>
  )
}
