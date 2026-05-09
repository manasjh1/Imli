"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check, Plus, Trash2 } from "lucide-react"

export default function FillBlanksEditorPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [questionText, setQuestionText] = useState("")
  const [blanks, setBlanks] = useState<string[]>([""])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = () => {
    router.push("/admin/questions")
  }

  const addBlank = () => setBlanks([...blanks, ""])
  
  const removeBlank = (index: number) => {
    if (blanks.length > 1) {
      setBlanks(blanks.filter((_, i) => i !== index))
    }
  }

  const updateBlank = (index: number, value: string) => {
    setBlanks(blanks.map((b, i) => i === index ? value : b))
  }

  const renderPreviewText = () => {
    if (!questionText) return "Your question will appear here..."
    let result = questionText
    blanks.forEach((blank, index) => {
      const placeholder = `[blank${index + 1}]`
      const display = blank ? `___${blank}___` : "_______"
      result = result.replace(placeholder, display)
    })
    return result
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
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">Fill in the Blanks Editor</h1>
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
                  <Label htmlFor="question">Question Text</Label>
                  <Textarea
                    id="question"
                    placeholder="Enter question with [blank1], [blank2], etc. for blanks..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use [blank1], [blank2], etc. to indicate blank positions
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Correct Answers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blanks.map((blank, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-20 text-sm text-muted-foreground shrink-0">[blank{index + 1}]</span>
                    <Input
                      placeholder={`Answer for blank ${index + 1}`}
                      value={blank}
                      onChange={(e) => updateBlank(index, e.target.value)}
                      className="flex-1"
                    />
                    <button
                      onClick={() => removeBlank(index)}
                      disabled={blanks.length <= 1}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addBlank}
                  className="w-full py-3 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Blank</span>
                </button>
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
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Question</span>
                    <p className="text-lg font-medium text-foreground whitespace-pre-wrap">
                      {renderPreviewText()}
                    </p>
                  </div>

                  {blanks.some(b => b.trim()) && (
                    <div className="pt-4 border-t">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Answers</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {blanks.map((blank, index) => blank.trim() && (
                          <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            <Check className="w-3 h-3" />
                            {blank}
                          </span>
                        ))}
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
