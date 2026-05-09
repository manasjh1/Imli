"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check, Settings } from "lucide-react"

export default function CustomTypeEditorPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [typeName, setTypeName] = useState("")
  const [questionText, setQuestionText] = useState("")
  const [instructions, setInstructions] = useState("")
  const [answerFormat, setAnswerFormat] = useState("")
  const [marks, setMarks] = useState("")

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
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">Custom Question Editor</h1>
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
                <CardTitle className="text-lg">Custom Question Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="typeName">Question Type Name</Label>
                  <Input
                    id="typeName"
                    placeholder="e.g., Diagram Labeling, Code Writing..."
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Enter your question..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any specific instructions for students..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="answerFormat">Answer Format</Label>
                    <Input
                      id="answerFormat"
                      placeholder="e.g., Text, File Upload..."
                      value={answerFormat}
                      onChange={(e) => setAnswerFormat(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marks">Marks</Label>
                    <Input
                      id="marks"
                      type="number"
                      placeholder="e.g., 10"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                    />
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
              <CardContent className="p-6 space-y-6">
                {typeName && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    <Settings className="w-3 h-3" />
                    {typeName}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Question</span>
                    {marks && (
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {marks} marks
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-medium">{questionText || "Your question will appear here..."}</p>
                </div>

                {instructions && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="text-xs font-medium text-amber-700 uppercase tracking-wider">Instructions</span>
                    <p className="text-sm text-amber-800 mt-1">{instructions}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Answer Format: {answerFormat || "Not specified"}
                  </span>
                  <div className="min-h-[80px] border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Custom answer area</p>
                  </div>
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
