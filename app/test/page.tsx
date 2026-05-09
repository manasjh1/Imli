'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BookOpen, Lock } from 'lucide-react'
import { UserHeader } from '@/components/user-header'
import { useLanguage } from '@/lib/i18n'

// Static class data - only Class 1 is enabled
const STATIC_CLASSES = [
  { id: 'class-1', name: 'Class 1', order: 1, enabled: true },
  { id: 'class-2', name: 'Class 2', order: 2, enabled: false },
  { id: 'class-3', name: 'Class 3', order: 3, enabled: false },
  { id: 'class-4', name: 'Class 4', order: 4, enabled: false },
  { id: 'class-5', name: 'Class 5', order: 5, enabled: false },
]

export default function TestPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { t, dir } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSelectClass = (classId: string, enabled: boolean) => {
    if (enabled) {
      router.push(`/test/guidelines?classId=${classId}`)
    }
  }

  // Get translated class name based on language
  const getClassName = (order: number) => {
    const classKeys = ['class1', 'class2', 'class3', 'class4', 'class5'] as const
    const index = order - 1
    if (index >= 0 && index < classKeys.length) {
      return t.test.classes[classKeys[index]]
    }
    return `Class ${order}`
  }

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Header with User Info */}
      <UserHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`text-center mb-12 transition-all duration-600 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.test.selectClass}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Choose your class to begin the test
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {STATIC_CLASSES.map((cls, index) => (
            <Card
              key={cls.id}
              className={`transition-all border-2 ${
                cls.enabled 
                  ? "hover:shadow-lg cursor-pointer hover:border-primary/50" 
                  : "opacity-60 cursor-not-allowed bg-muted/30"
              }`}
              style={{ transitionDelay: mounted ? `${(index + 1) * 100}ms` : "0ms" }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    cls.enabled ? "bg-primary/10" : "bg-muted"
                  }`}>
                    {cls.enabled ? (
                      <BookOpen className="w-6 h-6 text-primary" />
                    ) : (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className={`text-xl ${cls.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                      {getClassName(cls.order)}
                    </CardTitle>
                    {!cls.enabled && (
                      <span className="text-xs text-muted-foreground mt-1 inline-block px-2 py-0.5 bg-muted rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full gap-2"
                  onClick={() => handleSelectClass(cls.id, cls.enabled)}
                  disabled={!cls.enabled}
                  variant={cls.enabled ? "default" : "secondary"}
                >
                  {cls.enabled ? (
                    <>
                      {t.test.startQuiz}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    "Coming Soon"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
