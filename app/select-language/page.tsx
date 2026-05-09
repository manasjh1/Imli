"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Check } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { LANGUAGES, type Language } from "@/lib/i18n/types"

const LANGUAGE_ORDER: Language[] = ["ur", "en", "ta"]

export default function SelectLanguagePage() {
  const [mounted, setMounted] = useState(false)
  const [userName, setUserName] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en")
  const router = useRouter()
  const { language, setLanguage, t, dir } = useLanguage()

  useEffect(() => {
    // Get user name from session storage
    const storedName = sessionStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
    
    // Set initial selected language to current language
    setSelectedLanguage(language)
    
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [language])

  const handleLanguageSelect = (lang: Language) => {
    // Only allow English selection
    if (lang === "en") {
      setSelectedLanguage(lang)
      setLanguage(lang)
    }
  }

  const handleContinue = () => {
    router.push("/dashboard")
  }

  return (
    <main className="min-h-svh flex flex-col bg-background overflow-hidden" dir={dir}>
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
        <div className="w-full max-w-sm sm:max-w-md space-y-8">
          {/* User Info */}
          <div 
            className={`flex flex-col items-center gap-3 transition-all duration-600 delay-100 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-xl font-semibold text-foreground">
                {t.language.welcomeBack}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground">
                {userName || "User"}
              </p>
            </div>
          </div>

          {/* Language Selection */}
          <div 
            className={`space-y-4 transition-all duration-600 delay-200 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-center text-base sm:text-lg font-medium text-foreground">
              {t.language.select}
            </h2>
            
            <div className="flex flex-col gap-3">
              {LANGUAGE_ORDER.map((langCode, index) => {
                const langConfig = LANGUAGES[langCode]
                const isSelected = selectedLanguage === langCode
                const isDisabled = langCode !== "en"
                
                return (
                  <button
                    key={langCode}
                    onClick={() => handleLanguageSelect(langCode)}
                    disabled={isDisabled}
                    className={`
                      relative w-full px-5 py-4 rounded-xl border-2 transition-all duration-200
                      flex items-center justify-between
                      ${isDisabled 
                        ? "border-border bg-muted/50 cursor-not-allowed opacity-60" 
                        : isSelected 
                          ? "border-primary bg-primary/5" 
                          : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
                      }
                    `}
                    style={{ 
                      transitionDelay: mounted ? `${250 + index * 50}ms` : "0ms",
                      direction: langConfig.dir
                    }}
                  >
                    <div className="flex flex-col items-start gap-0.5">
                      <span className={`text-base sm:text-lg font-semibold ${isDisabled ? "text-muted-foreground" : "text-foreground"}`}>
                        {langConfig.nativeName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {langConfig.name}
                      </span>
                    </div>
                    
                    {isSelected && !isDisabled && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    {isDisabled && (
                      <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Continue Button */}
          <div 
            className={`transition-all duration-500 delay-400 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Button 
              onClick={handleContinue}
              className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]" 
              size="lg"
            >
              {t.language.continue}
            </Button>
          </div>
        </div>
      </div>

      {/* Footer branding */}
      <footer 
        className={`pb-6 sm:pb-8 text-center transition-all duration-600 delay-500 ease-out ${
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
