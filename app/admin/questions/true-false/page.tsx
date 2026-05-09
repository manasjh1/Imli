"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, X } from "lucide-react"

export default function TrueFalseEditorPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [questionText, setQuestionText] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState<"true" | "false" | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = () => {
    router.push("/admin/questions")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className={`sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-500 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/admin/questions")} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="flex items-center gap-3">
                <Image src="/images/imili-logo.avif" alt="Imili Logo" width={32} height={32} className="w-8 h-8 object-contain" />
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">True/False Editor</h1>
              </div>
            </div>
            <Button onClick={handleSave} className="gap-2">
              <Check className="w-4 h-4" />
              Save Question
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="question">Statement</Label>
                  <Input
                    id="question"
                    placeholder="Enter a statement that can be true or false..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Correct Answer</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setCorrectAnswer("true")}
                      className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                        correctAnswer === "true"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-border hover:border-green-300"
                      }`}
                    >
                      <Check className="w-5 h-5" />
                      <span className="font-semibold">True</span>
                    </button>
                    <button
                      onClick={() => setCorrectAnswer("false")}
                      className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                        correctAnswer === "false"
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-border hover:border-red-300"
                      }`}
                    >
                      <X className="w-5 h-5" />
                      <span className="font-semibold">False</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Statement</span>
                    <p className="text-lg font-medium text-foreground">
                      {questionText || "Your statement will appear here..."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
                      correctAnswer === "true" ? "border-green-500 bg-green-50" : "border-border"
                    }`}>
                      <Check className={`w-5 h-5 ${correctAnswer === "true" ? "text-green-600" : "text-muted-foreground"}`} />
                      <span className={correctAnswer === "true" ? "text-green-700 font-semibold" : "text-foreground"}>True</span>
                    </div>
                    <div className={`p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
                      correctAnswer === "false" ? "border-red-500 bg-red-50" : "border-border"
                    }`}>
                      <X className={`w-5 h-5 ${correctAnswer === "false" ? "text-red-600" : "text-muted-foreground"}`} />
                      <span className={correctAnswer === "false" ? "text-red-700 font-semibold" : "text-foreground"}>False</span>
                    </div>
                  </div>

                  {correctAnswer && (
                    <div className="pt-4 border-t">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Correct Answer</span>
                      <div className="mt-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          correctAnswer === "true" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {correctAnswer === "true" ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          {correctAnswer === "true" ? "True" : "False"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className="text-muted-foreground text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">imli</p>
      </footer>
    </div>
  )
}
