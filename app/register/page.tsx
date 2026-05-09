"use client"

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState("")
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      sessionStorage.setItem("userName", name.trim())
    }
    router.push("/verify")
  }

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

      {/* Form container */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 sm:px-8">
        <div className="w-full max-w-sm sm:max-w-md space-y-6">
          <div 
            className={`text-center transition-all duration-600 delay-100 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Create Account
            </h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div 
              className={`space-y-2 transition-all duration-500 delay-150 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="transition-shadow duration-200 focus:shadow-md"
              />
            </div>

            {/* Email */}
            <div 
              className={`space-y-2 transition-all duration-500 delay-200 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="transition-shadow duration-200 focus:shadow-md"
              />
            </div>

            {/* Phone */}
            <div 
              className={`space-y-2 transition-all duration-500 delay-250 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                required
                className="transition-shadow duration-200 focus:shadow-md"
              />
            </div>

            {/* Qualification */}
            <div 
              className={`space-y-2 transition-all duration-500 delay-300 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Label htmlFor="qualification">Qualification</Label>
              <Select>
                <SelectTrigger className="w-full transition-shadow duration-200 focus:shadow-md">
                  <SelectValue placeholder="Select your qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="bachelors">Bachelor&apos;s Degree</SelectItem>
                  <SelectItem value="masters">Master&apos;s Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <div 
              className={`transition-all duration-500 delay-350 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Button 
                type="submit" 
                className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]" 
                size="lg"
              >
                Register
              </Button>
            </div>
          </form>
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
