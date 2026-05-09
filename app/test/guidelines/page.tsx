'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ArrowLeft, BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { UserHeader } from '@/components/user-header'
import { useLanguage } from '@/lib/i18n'
import { Suspense } from 'react'

function GuidelinesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const classId = searchParams.get('classId')
  const [mounted, setMounted] = useState(false)
  const { t, dir } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleStartTest = () => {
    router.push(`/test/english?classId=${classId}`)
  }

  const handleBack = () => {
    router.push('/test')
  }

  const guidelines = [
    {
      icon: BookOpen,
      title: "Test Structure",
      description: "This test has 3 sections: Word Reading, Paragraph Reading, and Picture-based Writing."
    },
    {
      icon: Clock,
      title: "Take Your Time",
      description: "There is no time limit. Read each question carefully before answering."
    },
    {
      icon: CheckCircle,
      title: "Answer All Questions",
      description: "Make sure to complete all sections. Your progress will be shown at the top."
    },
    {
      icon: AlertCircle,
      title: "Be Prepared",
      description: "Find a quiet place. Have a pen and paper ready for the writing section."
    }
  ]

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <UserHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className={`mb-6 gap-2 transition-all duration-500 ${
            mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </Button>

        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-600 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Test Guidelines
          </h1>
          <p className="text-muted-foreground">
            {t.test.classes.class1} - English Test
          </p>
        </div>

        {/* Guidelines Card */}
        <Card className={`mb-8 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: mounted ? "100ms" : "0ms" }}
        >
          <CardHeader>
            <CardTitle className="text-xl">Before You Begin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {guidelines.map((guideline, index) => (
              <div 
                key={index}
                className={`flex gap-4 items-start transition-all duration-500`}
                style={{ transitionDelay: mounted ? `${200 + index * 100}ms` : "0ms" }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <guideline.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{guideline.title}</h3>
                  <p className="text-sm text-muted-foreground">{guideline.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Test Info */}
        <Card className={`mb-8 bg-muted/30 border-dashed transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: mounted ? "600ms" : "0ms" }}
        >
          <CardContent className="py-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Sections</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">English</p>
                <p className="text-sm text-muted-foreground">Subject</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">FLN</p>
                <p className="text-sm text-muted-foreground">Test Type</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className={`transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: mounted ? "700ms" : "0ms" }}
        >
          <Button 
            onClick={handleStartTest} 
            size="lg" 
            className="w-full gap-2 py-6 text-lg"
          >
            Start English Test
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </main>
    </div>
  )
}

export default function GuidelinesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <GuidelinesContent />
    </Suspense>
  )
}
