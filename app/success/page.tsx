"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Mail } from "lucide-react"

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)

    // Redirect to dashboard after showing the message
    const redirectTimer = setTimeout(() => {
      router.push("/dashboard")
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <main className="min-h-svh flex flex-col bg-background overflow-hidden">
      {/* Header with logo */}
      <header 
        className={`flex justify-center pt-8 sm:pt-12 md:pt-16 transition-all duration-600 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        <Image
          src="/images/imili-logo.avif"
          alt="imli Logo"
          width={120}
          height={120}
          priority
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
        />
      </header>

      {/* Content container */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 sm:px-8">
        <div className="w-full max-w-sm sm:max-w-md space-y-8 text-center">
          {/* Success Icon */}
          <div 
            className={`flex justify-center transition-all duration-700 ease-out ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
          </div>

          {/* Message */}
          <div 
            className={`space-y-4 transition-all duration-600 delay-150 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Check Your Email
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Your email and password have been sent to your registered email address. Please check your inbox to login.
            </p>
          </div>

          {/* Subtle note */}
          <div 
            className={`transition-all duration-500 delay-300 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-muted-foreground/70 text-xs sm:text-sm">
              {"Didn't receive the email? Check your spam folder."}
            </p>
          </div>
        </div>
      </div>

      {/* Footer branding */}
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
