'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, User, BookOpen, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

interface Class {
  id: string
  name: string
  order: number
}

export default function TestPage() {
  const router = useRouter()
  
  const [classes, setClasses] = useState<Class[]>([])
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [userName, setUserName] = useState("")

  const { t, dir } = useLanguage()

  useEffect(() => {
    // Get user name from login/register
    const storedName = sessionStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }

    const fetchClasses = async () => {
      try {
        // Fetch classes from your updated, non-cached API
        const classRes = await fetch('/api/classes')
        const classData = await classRes.json()
        
        if (Array.isArray(classData)) {
            setClasses(classData)
        } else {
            console.error("Received non-array data:", classData)
        }
      } catch (error) {
        console.error('Error fetching classes:', error)
      } finally {
        setLoading(false)
        setMounted(true)
      }
    }

    fetchClasses()
  }, [])

  const handleStartQuiz = () => {
    if (!selectedClass) return
    // Route to quiz page, passing ONLY the classId
    router.push(`/test/quiz?classId=${selectedClass}`)
  }

  // Uses your translations (Class 1 -> 1ஆம் வகுப்பு, etc.)
  const getClassName = (cls: Class) => {
    const classKeys = ['class1', 'class2', 'class3', 'class4', 'class5'] as const
    const index = cls.order - 1
    if (index >= 0 && index < classKeys.length) {
      return t.test.classes[classKeys[index]]
    }
    return cls.name
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={dir}>
      {/* Top Header */}
      <header className="px-6 py-6 flex justify-between items-center pt-12">
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">Hi, {userName || "User"}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <User className="w-6 h-6 text-primary" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 space-y-6 max-w-md mx-auto w-full mt-2">
        
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">{t.test.selectClass}</h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-12 px-4 border-2 border-dashed rounded-xl">
            <p className="text-muted-foreground font-medium">No classes found.</p>
            <p className="text-sm text-muted-foreground mt-1">Make sure you ran the population script!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 pb-8">
            {classes.map((cls) => {
              const isSelected = selectedClass === cls.id
              return (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`
                    relative p-4 rounded-2xl border-2 font-semibold text-lg transition-all flex items-center justify-between
                    ${isSelected
                      ? "border-primary bg-primary/5 text-primary shadow-sm scale-[1.02]"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent/50"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span>{getClassName(cls)}</span>
                  </div>
                  
                  {isSelected && <Check className="w-6 h-6 text-primary" />}
                </button>
              )
            })}
          </div>
        )}
      </main>

      {/* Footer Start Quiz Button */}
      <div className="p-6 bg-background mt-auto sticky bottom-0 max-w-md mx-auto w-full pb-8">
        <Button
          className={`w-full h-14 text-lg font-bold rounded-2xl transition-all duration-300 ${
            selectedClass ? 'hover:scale-[1.02] shadow-xl' : 'opacity-50'
          }`}
          size="lg"
          disabled={!selectedClass}
          onClick={handleStartQuiz}
        >
          {t.test.startQuiz}
        </Button>
      </div>
    </div>
  )
}