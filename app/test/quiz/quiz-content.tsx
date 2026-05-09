'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Check, RotateCcw, Loader } from 'lucide-react'

interface QuestionOption {
  id: string
  text: string
  is_correct: boolean
}

interface Question {
  id: string
  text: string
  type: string
  subject_id: string
  data: any
  question_options?: QuestionOption[]
}

interface Answer {
  questionId: string
  selectedOptionId: string
}

export function QuizContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const classId = searchParams.get('classId')

  const [mounted, setMounted] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [started, setStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [className, setClassName] = useState('')

  // Load questions from database
  useEffect(() => {
    const loadQuestions = async () => {
      if (!classId) return

      try {
        const res = await fetch(`/api/questions?classId=${classId}`)
        if (res.ok) {
          const data = await res.json()
          setQuestions(data)

          // Get class name
          const classRes = await fetch('/api/classes')
          const classData = await classRes.json()
          const selectedClass = classData.find((c: any) => c.id === classId)
          if (selectedClass) {
            setClassName(selectedClass.name)
          }
        }
      } catch (error) {
        console.error('Error loading questions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [classId])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1

  const handleSelectOption = (optionId: string) => {
    // Remove previous answer for this question if exists
    const newAnswers = answers.filter(a => a.questionId !== currentQuestion.id)
    newAnswers.push({
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
    })
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate score
      let correctCount = 0
      answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId)
        const selectedOption = question?.question_options?.find(o => o.id === answer.selectedOptionId)
        if (selectedOption?.is_correct) {
          correctCount++
        }
      })
      setScore(correctCount)
      setShowResults(true)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleStartQuiz = () => {
    setStarted(true)
  }

  const handleRetake = () => {
    setStarted(false)
    setCurrentQuestionIndex(0)
    setAnswers([])
    setShowResults(false)
    setScore(0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (totalQuestions === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">No quiz questions available for {className} yet.</p>
            <p className="text-sm text-muted-foreground mb-6">Please ask the administrator to add questions.</p>
            <Button onClick={() => router.push('/test')} variant="outline">
              Back to Classes
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz Start Screen
  if (!started) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className={`max-w-2xl w-full transition-all duration-700 ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/imili-logo.avif"
                alt="Imili Logo"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
            <CardTitle className="text-3xl">Start {className} Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Welcome to the {className} Quiz! Test your knowledge across all subjects.
              </p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <p className="text-2xl font-bold text-foreground">{totalQuestions}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <p className="text-xs text-muted-foreground text-center">
                You will need to answer all questions. Your score will be calculated at the end.
              </p>
              <Button onClick={handleStartQuiz} size="lg" className="w-full">
                <Check className="w-4 h-4 mr-2" />
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Results Screen
  if (showResults) {
    const percentage = Math.round((score / totalQuestions) * 100)
    const isPassed = percentage >= 50

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className={`max-w-2xl w-full transition-all duration-700 ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <CardHeader className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-4 ${
              isPassed ? 'bg-green-100' : 'bg-orange-100'
            }`}>
              <span className={`text-4xl font-bold ${isPassed ? 'text-green-600' : 'text-orange-600'}`}>
                {percentage}%
              </span>
            </div>
            <CardTitle className="text-3xl">
              {isPassed ? 'Great Job!' : 'Good Effort!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-foreground">
                You scored {score} out of {totalQuestions} questions correctly.
              </p>
              <p className="text-muted-foreground">
                {isPassed 
                  ? 'You passed the quiz! ' 
                  : 'Keep practicing to improve your score. '}
                Try again to see if you can do better!
              </p>
            </div>

            {/* Question Review */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">Answer Review</h3>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {questions.map((question, idx) => {
                  const userAnswer = answers.find(a => a.questionId === question.id)
                  const selectedOption = question.question_options?.find(o => o.id === userAnswer?.selectedOptionId)
                  const isCorrect = selectedOption?.is_correct

                  return (
                    <div key={question.id} className="p-3 bg-muted/30 rounded-lg text-sm">
                      <div className="flex gap-2 items-start mb-1">
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {isCorrect ? '✓' : '✗'}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Q{idx + 1}</p>
                          <p className="text-xs text-muted-foreground">{question.text}</p>
                        </div>
                      </div>
                      {userAnswer && (
                        <p className="text-xs text-muted-foreground ml-7">
                          Your answer: {selectedOption?.text || 'Not answered'}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleRetake} size="lg" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
              <Button onClick={() => router.push('/test')} variant="outline" size="lg" className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Classes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz Question Screen
  if (!currentQuestion) {
    return null
  }

  const userAnswer = answers.find(a => a.questionId === currentQuestion.id)
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/test')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <Image
                src="/images/imili-logo.avif"
                alt="Imili Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                {className} Quiz
              </h1>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
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
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{currentQuestion.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Options */}
              {currentQuestion.question_options && currentQuestion.question_options.length > 0 ? (
                <div className="space-y-3">
                  {currentQuestion.question_options.map((option, idx) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        userAnswer?.selectedOptionId === option.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          userAnswer?.selectedOptionId === option.id
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="font-medium text-foreground">
                          {option.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No options available for this question
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!userAnswer}
                  className="flex-1"
                >
                  {isLastQuestion ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Finish
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
