'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ArrowLeft, Check, RotateCcw, Volume2, Mic, MicOff, BookOpen, PenLine, FileText } from 'lucide-react'
import { UserHeader } from '@/components/user-header'
import { useLanguage } from '@/lib/i18n'
import { Suspense } from 'react'
import Image from 'next/image'

// Questions from the FLN English End Line Test - Class 1
const QUESTIONS = [
  {
    id: 1,
    type: 'word-reading',
    title: 'Read the Following Words',
    subtitle: 'Reading Assessment',
    icon: Volume2,
    instruction: 'Read each word aloud clearly. Click on each word after you read it.',
    words: [
      ['Ammu', 'banana', 'elephant', 'kite'],
      ['zoo', 'jug', 'doll', 'lion'],
      ['green', 'car', 'house', 'nest'],
      ['fish', 'parrot', 'rat', 'tap'],
      ['nest', 'monkey', 'van', 'kite'],
    ]
  },
  {
    id: 2,
    type: 'paragraph-reading',
    title: 'Read the Paragraph',
    subtitle: 'Oral Reading Fluency (ORF)',
    icon: FileText,
    instruction: 'Read the following paragraph aloud clearly and fluently.',
    paragraph: 'This is a zoo. There are many animals in the zoo. The giraffe is very tall. The elephant is big.'
  },
  {
    id: 3,
    type: 'picture-writing',
    title: 'Write Five Words',
    subtitle: 'Writing Assessment',
    icon: PenLine,
    instruction: 'Look at the picture and write five words related to it.',
    imageDescription: 'A colorful zoo scene with various animals',
  }
]

function EnglishTestContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const classId = searchParams.get('classId')
  const [mounted, setMounted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({
    1: { readWords: [] as string[] },
    2: { completed: false },
    3: { words: ['', '', '', '', ''] }
  })
  const [showResults, setShowResults] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const { t, dir } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const question = QUESTIONS[currentQuestion]
  const totalQuestions = QUESTIONS.length
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100

  const handleWordClick = (word: string) => {
    const readWords = answers[1].readWords as string[]
    if (readWords.includes(word)) {
      setAnswers({
        ...answers,
        1: { readWords: readWords.filter(w => w !== word) }
      })
    } else {
      setAnswers({
        ...answers,
        1: { readWords: [...readWords, word] }
      })
    }
  }

  const handleParagraphComplete = () => {
    setAnswers({
      ...answers,
      2: { completed: true }
    })
  }

  const handleWritingChange = (index: number, value: string) => {
    const newWords = [...answers[3].words]
    newWords[index] = value
    setAnswers({
      ...answers,
      3: { words: newWords }
    })
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRetake = () => {
    setCurrentQuestion(0)
    setAnswers({
      1: { readWords: [] },
      2: { completed: false },
      3: { words: ['', '', '', '', ''] }
    })
    setShowResults(false)
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const canProceed = () => {
    if (question.type === 'word-reading') {
      return (answers[1].readWords as string[]).length >= 10
    }
    if (question.type === 'paragraph-reading') {
      return answers[2].completed
    }
    if (question.type === 'picture-writing') {
      return answers[3].words.filter((w: string) => w.trim().length > 0).length >= 3
    }
    return true
  }

  // Results Screen
  if (showResults) {
    const wordsRead = (answers[1].readWords as string[]).length
    const paragraphDone = answers[2].completed
    const wordsWritten = answers[3].words.filter((w: string) => w.trim().length > 0).length

    return (
      <div className="min-h-screen bg-background" dir={dir}>
        <UserHeader />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Card className={`transition-all duration-700 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <CardHeader className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl">Test Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                Great job completing the English test! Here is your summary:
              </p>

              {/* Summary */}
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">Words Read</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">{wordsRead}/20</span>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="font-medium">Paragraph Reading</span>
                  </div>
                  <span className={`text-lg font-bold ${paragraphDone ? 'text-green-600' : 'text-orange-500'}`}>
                    {paragraphDone ? 'Completed' : 'Incomplete'}
                  </span>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PenLine className="w-5 h-5 text-primary" />
                    <span className="font-medium">Words Written</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">{wordsWritten}/5</span>
                </div>
              </div>

              {/* Written Words */}
              {wordsWritten > 0 && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Your written words:</p>
                  <div className="flex flex-wrap gap-2">
                    {answers[3].words.filter((w: string) => w.trim()).map((word: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleRetake} variant="outline" className="flex-1 gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Retake Test
                </Button>
                <Button onClick={handleBackToDashboard} className="flex-1 gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Header with Progress */}
      <header className={`sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/test/guidelines?classId=' + classId)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t.back}</span>
              </Button>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                  English Test
                </h1>
              </div>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Card>
            <CardHeader className="text-center border-b">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <question.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm text-primary font-medium mb-1">{question.subtitle}</p>
              <CardTitle className="text-xl sm:text-2xl">{question.title}</CardTitle>
              <p className="text-muted-foreground text-sm mt-2">{question.instruction}</p>
            </CardHeader>
            <CardContent className="py-6">
              {/* Question 1: Word Reading */}
              {question.type === 'word-reading' && (
                <div className="space-y-4">
                  {question.words?.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-wrap gap-3 justify-center">
                      {row.map((word, wordIndex) => {
                        const isRead = (answers[1].readWords as string[]).includes(word)
                        return (
                          <button
                            key={`${rowIndex}-${wordIndex}`}
                            onClick={() => handleWordClick(word)}
                            className={`px-4 py-3 rounded-lg border-2 text-lg font-medium transition-all ${
                              isRead 
                                ? 'border-green-500 bg-green-50 text-green-700' 
                                : 'border-border hover:border-primary/50 text-foreground hover:bg-accent/50'
                            }`}
                          >
                            {word}
                            {isRead && <Check className="w-4 h-4 inline-block ml-2" />}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Words read: {(answers[1].readWords as string[]).length}/20
                  </p>
                </div>
              )}

              {/* Question 2: Paragraph Reading */}
              {question.type === 'paragraph-reading' && (
                <div className="space-y-6">
                  <div className="p-6 bg-muted/30 rounded-xl border-2 border-dashed">
                    <p className="text-xl leading-relaxed text-foreground text-center font-medium">
                      {question.paragraph}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4">
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="lg"
                      onClick={toggleRecording}
                      className="gap-2"
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="w-5 h-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-5 h-5" />
                          Start Reading Aloud
                        </>
                      )}
                    </Button>
                    
                    {isRecording && (
                      <div className="flex items-center gap-2 text-red-500">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">Recording...</span>
                      </div>
                    )}

                    <Button
                      variant={answers[2].completed ? "default" : "secondary"}
                      onClick={handleParagraphComplete}
                      className="gap-2"
                      disabled={answers[2].completed}
                    >
                      {answers[2].completed ? (
                        <>
                          <Check className="w-4 h-4" />
                          Marked as Complete
                        </>
                      ) : (
                        "Mark as Complete"
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Question 3: Picture Writing */}
              {question.type === 'picture-writing' && (
                <div className="space-y-6">
                  {/* Zoo Image - Responsive container */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[300px] sm:max-h-[350px] md:max-h-[400px] mx-auto rounded-xl overflow-hidden border bg-muted">
                    <Image
                      src="/images/zoo-scene.jpg"
                      alt="A colorful zoo scene with animals - giraffe, elephant, lion, monkeys and parrot"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 700px"
                      className="object-contain"
                      priority
                    />
                  </div>
                  
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((num, index) => (
                      <div key={num} className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {num}
                        </span>
                        <input
                          type="text"
                          placeholder={`Word ${num}`}
                          value={answers[3].words[index]}
                          onChange={(e) => handleWritingChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Words written: {answers[3].words.filter((w: string) => w.trim()).length}/5
                  </p>
                </div>
              )}
            </CardContent>

            {/* Navigation */}
            <div className="px-6 pb-6 pt-2 border-t">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex-1 gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 gap-2"
                >
                  {currentQuestion === totalQuestions - 1 ? (
                    <>
                      <Check className="w-4 h-4" />
                      Finish
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function EnglishTestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-2 text-muted-foreground">Loading test...</p>
        </div>
      </div>
    }>
      <EnglishTestContent />
    </Suspense>
  )
}
