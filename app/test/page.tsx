'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BookOpen, Loader } from 'lucide-react'
import Image from 'next/image'

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <Image
            src="/images/imili-logo.avif"
            alt="Imili Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-2xl font-bold text-gray-900">Quiz Portal</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Select Your Class</h2>
          <p className="text-xl text-gray-600">
            Choose your class to begin the quiz and test your knowledge
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <p className="mt-2 text-gray-500">Loading classes...</p>
            </div>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {classes.map((cls) => (
              <Card
                key={cls.id}
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-400"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900">
                        {cls.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSelectClass(cls.id)}
                  >
                    Start Quiz
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
