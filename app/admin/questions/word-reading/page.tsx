"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, X, Save, Volume2, Loader, Eye } from "lucide-react"

function WordReadingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sectionId = searchParams.get("sectionId")
  const questionId = searchParams.get("questionId")
  const isEditMode = !!questionId
  
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEditMode)
  const [questionTitle, setQuestionTitle] = useState("Read the Following Words")
  const [instruction, setInstruction] = useState("Read each word aloud clearly. Click on each word after you read it.")
  const [words, setWords] = useState<string[][]>([
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ])

  // Load existing question data if editing
  useEffect(() => {
    if (questionId) {
      const loadQuestion = async () => {
        try {
          const res = await fetch(`/api/questions?id=${questionId}`)
          if (res.ok) {
            const data = await res.json()
            setQuestionTitle(data.text || "Read the Following Words")
            if (data.data) {
              setInstruction(data.data.instruction || "")
              if (data.data.words && data.data.words.length > 0) {
                const normalizedWords = data.data.words.map((row: string[]) => {
                  const newRow = [...row]
                  while (newRow.length < 4) newRow.push("")
                  return newRow.slice(0, 4)
                })
                setWords(normalizedWords)
              }
            }
          }
        } catch (error) {
          console.error("Error loading question:", error)
        } finally {
          setLoading(false)
        }
      }
      loadQuestion()
    }
  }, [questionId])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleWordChange = (rowIndex: number, colIndex: number, value: string) => {
    const newWords = [...words]
    newWords[rowIndex][colIndex] = value
    setWords(newWords)
  }

  const addRow = () => {
    setWords([...words, ["", "", "", ""]])
  }

  const removeRow = (index: number) => {
    if (words.length > 1) {
      setWords(words.filter((_, i) => i !== index))
    }
  }

  const handleSave = async () => {
    if (!sectionId && !isEditMode) {
      alert("No section selected")
      return
    }

    const filledWords = words.flat().filter(w => w.trim())
    if (filledWords.length === 0) {
      alert("Please add at least one word")
      return
    }

    setSaving(true)
    try {
      const questionData = {
        text: questionTitle,
        type: "word_reading",
        data: {
          instruction,
          words: words.filter(row => row.some(w => w.trim())),
        },
      }

      let res
      if (isEditMode) {
        res = await fetch("/api/questions", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: questionId,
            ...questionData,
          }),
        })
      } else {
        res = await fetch("/api/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            section_id: sectionId,
            ...questionData,
          }),
        })
      }

      if (res.ok) {
        router.push("/admin/questions")
      } else {
        alert("Failed to save question")
      }
    } catch (error) {
      console.error("Error saving question:", error)
      alert("Failed to save question")
    } finally {
      setSaving(false)
    }
  }

  const filledWordCount = words.flat().filter(w => w.trim()).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`border-b border-border bg-background sticky top-0 z-10 transition-all duration-700 ease-out ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/questions" className="p-2 hover:bg-muted rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Image
              src="/images/imili-logo.avif"
              alt="Imili Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="text-muted-foreground text-sm tracking-[0.2em] uppercase font-semibold hidden sm:inline">
              imli
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-primary" />
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              Word Reading
            </h1>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{isEditMode ? "Update" : "Save"}</span>
          </Button>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <main className="max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row min-h-[calc(100vh-73px)] transition-all duration-500 ease-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}>
          
          {/* Left Panel - Edit */}
          <div className="w-full lg:w-1/2 border-r border-border overflow-y-auto">
            <div className="p-4 sm:p-6 space-y-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm font-medium uppercase tracking-wide">Edit</span>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  {/* Question Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Question Title</Label>
                    <Input
                      id="title"
                      value={questionTitle}
                      onChange={(e) => setQuestionTitle(e.target.value)}
                      placeholder="Enter question title"
                    />
                  </div>

                  {/* Instruction */}
                  <div className="space-y-2">
                    <Label htmlFor="instruction">Instruction for Students</Label>
                    <Input
                      id="instruction"
                      value={instruction}
                      onChange={(e) => setInstruction(e.target.value)}
                      placeholder="Enter instruction"
                    />
                  </div>

                  {/* Word Grid */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Words (4 words per row)</Label>
                      <span className="text-xs text-muted-foreground">{filledWordCount} words</span>
                    </div>
                    <div className="space-y-3">
                      {words.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground w-6">{rowIndex + 1}.</span>
                          <div className="flex-1 grid grid-cols-4 gap-2">
                            {row.map((word, colIndex) => (
                              <Input
                                key={colIndex}
                                value={word}
                                onChange={(e) => handleWordChange(rowIndex, colIndex, e.target.value)}
                                placeholder={`Word ${rowIndex * 4 + colIndex + 1}`}
                                className="text-sm"
                              />
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRow(rowIndex)}
                            disabled={words.length === 1}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addRow}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Row
                    </Button>
                  </div>

                  {/* Actions for mobile */}
                  <div className="flex gap-3 pt-4 border-t lg:hidden">
                    <Button variant="outline" onClick={() => router.push("/admin/questions")} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saving} className="flex-1 gap-2">
                      {saving ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {isEditMode ? "Update" : "Save"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-full lg:w-1/2 bg-muted/30 overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wide">Live Preview</span>
              </div>

              {/* Preview Card - Simulates student view */}
              <Card className="shadow-lg">
                <CardHeader className="bg-primary/5 border-b">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">{questionTitle || "Question Title"}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-6">
                    {instruction || "Instructions will appear here..."}
                  </p>
                  
                  {/* Word Grid Preview */}
                  <div className="grid grid-cols-4 gap-3">
                    {words.flat().filter(w => w.trim()).length > 0 ? (
                      words.flat().filter(w => w.trim()).map((word, idx) => (
                        <button
                          key={idx}
                          className="px-3 py-3 bg-background border-2 border-border rounded-lg text-sm font-medium hover:border-primary hover:bg-primary/5 transition-colors text-center"
                        >
                          {word}
                        </button>
                      ))
                    ) : (
                      Array.from({ length: 8 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-3 bg-muted/50 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground text-center"
                        >
                          Word {idx + 1}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Words read: 0 / {filledWordCount || 0}</span>
                      <span className="text-xs bg-muted px-2 py-1 rounded">Student View</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function WordReadingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <WordReadingContent />
    </Suspense>
  )
}
