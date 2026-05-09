"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, X, Save, Volume2, Loader } from "lucide-react"

function WordReadingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sectionId = searchParams.get("sectionId")
  
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [questionTitle, setQuestionTitle] = useState("Read the Following Words")
  const [instruction, setInstruction] = useState("Read each word aloud clearly. Click on each word after you read it.")
  const [words, setWords] = useState<string[][]>([
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ])

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
    if (!sectionId) {
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
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section_id: sectionId,
          text: questionTitle,
          type: "word_reading",
          data: {
            instruction,
            words: words.filter(row => row.some(w => w.trim())),
          },
        }),
      })

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`border-b border-border transition-all duration-700 ease-out ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
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
            <span className="text-muted-foreground text-sm tracking-[0.2em] uppercase font-semibold">
              imli
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-primary" />
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              Word Reading
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Card className={`transition-all duration-500 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <CardHeader>
            <CardTitle>Create Word Reading Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <Label>Words (4 words per row)</Label>
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

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="p-4 bg-muted/30 rounded-lg border">
                <p className="text-sm text-muted-foreground mb-3">{instruction}</p>
                <div className="space-y-2">
                  {words.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-wrap gap-2">
                      {row.filter(w => w.trim()).map((word, colIndex) => (
                        <span
                          key={colIndex}
                          className="px-3 py-2 bg-background border rounded-lg text-sm font-medium"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => router.push("/admin/questions")} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} className="flex-1 gap-2">
                {saving ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Question
              </Button>
            </div>
          </CardContent>
        </Card>
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
