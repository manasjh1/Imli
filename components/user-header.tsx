"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Globe, LogOut, ChevronDown } from "lucide-react"
import { useLanguage, LANGUAGES, type Language } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface UserHeaderProps {
  className?: string
  showLogo?: boolean
}

function getInitials(name: string): string {
  if (!name) return "U"
  const parts = name.trim().split(" ")
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-purple-500",
    "bg-cyan-500",
    "bg-indigo-500",
    "bg-teal-500",
  ]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}

export function UserHeader({ className = "", showLogo = true }: UserHeaderProps) {
  const { language, setLanguage, t, dir } = useLanguage()
  const [userName, setUserName] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    sessionStorage.removeItem("userName")
    localStorage.removeItem("imli_language")
    router.push("/login")
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
  }

  if (!mounted) {
    return (
      <header className={`flex items-center justify-between px-6 sm:px-8 md:px-12 py-4 sm:py-6 ${className}`}>
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
        <div className="flex items-center gap-4" />
      </header>
    )
  }

  const initials = getInitials(userName)
  const avatarColor = getAvatarColor(userName)

  return (
    <header 
      className={`flex items-center justify-between px-6 sm:px-8 md:px-12 py-4 sm:py-6 transition-all duration-500 ease-out ${className}`}
      dir={dir}
    >
      {/* Logo */}
      {showLogo && (
        <Image
          src="/images/imili-logo.avif"
          alt="imli Logo"
          width={80}
          height={80}
          priority
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
        />
      )}

      {/* User Section */}
      <div className={`flex items-center gap-3 sm:gap-4 ${!showLogo ? 'ms-auto' : ''}`}>
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 text-xs sm:text-sm"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{LANGUAGES[language].nativeName}</span>
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

        {/* User Avatar & Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 h-auto py-2"
            >
              {/* Avatar */}
              <div 
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold text-sm sm:text-base`}
              >
                {initials}
              </div>
              {/* Name */}
              <span className="hidden sm:inline text-sm font-medium text-foreground max-w-[120px] truncate">
                {userName || "User"}
              </span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={dir === "rtl" ? "start" : "end"} className="min-w-[160px]">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-sm font-medium text-foreground truncate">{userName || "User"}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="w-4 h-4 me-2" />
              {t.auth.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
