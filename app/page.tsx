"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SplashScreen() {
  const router = useRouter()
  const [fadeOut, setFadeOut] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Trigger entrance animation immediately
    requestAnimationFrame(() => {
      setMounted(true)
    })

    // Start fade out - gives time for entrance to complete
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 1200)

    // Redirect seamlessly after fade
    const redirectTimer = setTimeout(() => {
      router.push("/register")
    }, 1800)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <main 
      className={`fixed inset-0 flex flex-col items-center justify-center bg-background transition-all duration-700 ease-in-out ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo container - centered with smooth animation */}
      <div className="flex flex-1 items-center justify-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            mounted 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-6"
          }`}
        >
          <Image
            src="/images/imili-logo.avif"
            alt="imli Logo"
            width={320}
            height={320}
            priority
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
          />
        </div>
      </div>

      {/* Bottom branding with gentle staggered animation */}
      <footer className="pb-8 sm:pb-10 md:pb-12">
        <p 
          className={`text-muted-foreground text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase font-semibold transition-all duration-1000 delay-200 ease-out ${
            mounted 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-3"
          }`}
        >
          imli
        </p>
      </footer>
    </main>
  )
}
