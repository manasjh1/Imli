"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type Language, type Translations, LANGUAGES } from "./types"
import { translations } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  dir: "ltr" | "rtl"
  languageConfig: typeof LANGUAGES[Language]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = "imli_language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load language from localStorage on mount
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null
    if (storedLanguage && LANGUAGES[storedLanguage]) {
      setLanguageState(storedLanguage)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Update document direction when language changes
      document.documentElement.lang = language
      document.documentElement.dir = LANGUAGES[language].dir
    }
  }, [language, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir: LANGUAGES[language].dir,
    languageConfig: LANGUAGES[language],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
