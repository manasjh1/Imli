'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BookOpen, Loader } from 'lucide-react'
import { UserHeader } from '@/components/user-header'
import { useLanguage } from '@/lib/i18n'

interface Class {
  id: string
  name: string
  order: number
}

export default function TestPage() {
  const router = useRouter()
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { t, dir, language } = useLanguage()

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/classes')
        const data = await res.json()
        setClasses(data)
      } catch (error) {
        console.error('Error fetching classes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSelectClass = (classId: string) => {
    router.push(`/test/quiz?classId=${classId}`)
  }

  // Get translated class name based on language
  const getClassName = (cls: Class) => {
    const classKeys = ['class1', 'class2', 'class3', 'class4', 'class5'] as const
    const index = cls.order - 1
    if (index >= 0 && index < classKeys.length) {
      return t.test.classes[classKeys[index]]
    }
    return cls.name
  }

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Header with User Info and Language Selector */}
      <UserHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`text-center mb-12 transition-all duration-600 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.test.selectClass}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {language === 'en' && 'Choose your class to begin the quiz and test your knowledge'}
            {language === 'ta' && 'வினாடி வினா தொடங்க உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்'}
            {language === 'ur' && 'کوئز شروع کرنے کے لیے اپنی جماعت منتخب کریں'}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="mt-2 text-muted-foreground">{t.loading}</p>
            </div>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {classes.map((cls, index) => (
              <Card
                key={cls.id}
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
                style={{ transitionDelay: mounted ? `${(index + 1) * 100}ms` : "0ms" }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground">
                        {getClassName(cls)}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full gap-2"
                    onClick={() => handleSelectClass(cls.id)}
                  >
                    {t.test.startQuiz}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}