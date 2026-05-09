"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList, History } from "lucide-react"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
    
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-svh flex flex-col bg-background">
      {/* Header */}
      <header 
        className={`flex items-center justify-between px-6 sm:px-8 md:px-12 py-4 sm:py-6 transition-all duration-600 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <Image
          src="/images/imili-logo.avif"
          alt="imli Logo"
          width={80}
          height={80}
          priority
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
        />
        <p className="text-muted-foreground text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
          imli
        </p>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 sm:px-8 md:px-12 py-8 sm:py-12">
        {/* Greeting */}
        <div 
          className={`mb-8 sm:mb-12 transition-all duration-600 delay-100 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Hi {userName || "User"}
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl">
          {/* Start a Test Card */}
          <Link href="/test">
            <Card 
              className={`cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: mounted ? "200ms" : "0ms" }}
            >
              <CardContent className="flex flex-col items-center justify-center py-5 sm:py-6 gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-foreground">
                  Start a Test
                </h2>
              </CardContent>
            </Card>
          </Link>

          {/* Past Tests Card */}
          <Link href="/history">
            <Card 
              className={`cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: mounted ? "300ms" : "0ms" }}
            >
              <CardContent className="flex flex-col items-center justify-center py-5 sm:py-6 gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <History className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-foreground">
                  Past Tests
                </h2>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer 
        className={`pb-6 sm:pb-8 text-center transition-all duration-600 delay-400 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-muted-foreground text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
          imli
        </p>
      </footer>
    </main>
  )
}
