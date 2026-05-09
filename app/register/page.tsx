"use client"

import Image from "next/image"
import Link from "next/link"
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
import { Globe, ChevronDown } from "lucide-react"
import { useLanguage, LANGUAGES, type Language } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState("")
  const router = useRouter()
  const { language, setLanguage, t, dir } = useLanguage()

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

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
  }

  return (
    <main className="min-h-svh flex flex-col bg-background overflow-hidden" dir={dir}>
      {/* Language Selector - Top Right */}
      <div 
        className={`absolute top-4 ${dir === "rtl" ? "left-4" : "right-4"} transition-all duration-600 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 text-xs sm:text-sm"
            >
              <Globe className="w-4 h-4" />
              <span>{LANGUAGES[language].nativeName}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={dir === "rtl" ? "start" : "end"} className="min-w-[140px]">
            {(Object.keys(LANGUAGES) as Language[]).map((lang) => (
              <DropdownMenuItem
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`cursor-pointer ${language === lang ? "bg-accent" : ""}`}
              >
                <span className="flex-1">{LANGUAGES[lang].nativeName}</span>
                {language === lang && (
                  <span className="text-primary text-xs">&#10003;</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
              {t.auth.register}
            </h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div 
              className={`space-y-2 transition-all duration-500 delay-150 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Label htmlFor="name">{t.auth.fullName}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t.auth.fullName}
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
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.auth.email}
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
              <Label htmlFor="phone">{t.auth.phoneNumber}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t.auth.phoneNumber}
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
              <Label htmlFor="qualification">{t.auth.qualification}</Label>
              <Select>
                <SelectTrigger className="w-full transition-shadow duration-200 focus:shadow-md">
                  <SelectValue placeholder={t.auth.qualification} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intermediate">{t.auth.qualifications.intermediate}</SelectItem>
                  <SelectItem value="graduate">{t.auth.qualifications.graduate}</SelectItem>
                  <SelectItem value="post-graduate">{t.auth.qualifications.postGraduate}</SelectItem>
                  <SelectItem value="diploma">{t.auth.qualifications.diploma}</SelectItem>
                  <SelectItem value="bed">{t.auth.qualifications.bed}</SelectItem>
                  <SelectItem value="med">{t.auth.qualifications.med}</SelectItem>
                  <SelectItem value="other">{t.auth.qualifications.other}</SelectItem>
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
                {t.auth.registerButton}
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <div 
            className={`text-center transition-all duration-500 delay-400 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-muted-foreground text-sm">
              {t.auth.hasAccount}{" "}
              <Link 
                href="/login" 
                className="text-foreground font-medium hover:underline underline-offset-4 transition-colors"
              >
                {t.auth.login}
              </Link>
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
          {t.appName}
        </p>
      </footer>
    </main>
  )
}
