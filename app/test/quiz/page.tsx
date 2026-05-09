import { Suspense } from 'react'
import { Loader } from 'lucide-react'
import { QuizContent } from './quiz-content'

function QuizLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Loader className="w-8 h-8 animate-spin mx-auto text-primary" />
        <p className="mt-2 text-muted-foreground">Loading quiz...</p>
      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizContent />
    </Suspense>
  )
}
