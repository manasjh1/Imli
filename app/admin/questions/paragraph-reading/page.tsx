"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, BookOpen, Loader, Eye, Clock, BarChart3 } from "lucide-react"

function ParagraphReadingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sectionId = searchParams.get("sectionId")
  const questionId = searchParams.get("questionId")
  const isEditMode = !!questionId
  
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEditMode)
  const [questionTitle, setQuestionTitle] = useState("Read the Paragraph")
  const [subtitle, setSubtitle] = useState("Oral Reading Fluency (ORF)")
  const [instruction, setInstruction] = useState("Read the following paragraph aloud clearly and fluently.")
  const [paragraph, setParagraph] = useState("")

  // Load existing question data if editing
  useEffect(() => {
    if (questionId) {
      const loadQuestion = async () => {
        try {
          const res = await fetch(`/api/questions?id=${questionId}`)
          if (res.ok) {
            const data = await res.json()
            setQuestionTitle(data.text || "Read the Paragraph")
            if (data.data) {
              setSubtitle(data.data.subtitle || "")
              setInstruction(data.data.instruction || "")
              setParagraph(data.data.paragraph || "")
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

  const handleSave = async () => {
    if (!sectionId && !isEditMode) {
      alert("No section selected")
      return
    }

    if (!paragraph.trim()) {
      alert("Please enter a paragraph")
      return
    }

    setSaving(true)
    try {
      const questionData = {
        text: questionTitle,
        type: "paragraph_reading",
        data: {
          subtitle,
          instruction,
          paragraph: paragraph.trim(),
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

  const wordCount = paragraph.trim().split(/\s+/).filter(w => w).length
  const estimatedTime = Math.ceil(wordCount / 100) // Assuming ~100 words per minute

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
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              Paragraph Reading
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

                  {/* Subtitle */}
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g., Oral Reading Fluency (ORF)"
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

                  {/* Paragraph */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="paragraph">Paragraph</Label>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          {wordCount} words
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          ~{estimatedTime} min
                        </span>
                      </div>
                    </div>
                    <Textarea
                      id="paragraph"
                      value={paragraph}
                      onChange={(e) => setParagraph(e.target.value)}
                      placeholder="Enter the paragraph for students to read..."
                      rows={10}
                      className="resize-none"
                    />
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
                  <div className="space-y-1">
                    {subtitle && (
                      <p className="text-xs text-primary font-medium uppercase tracking-wide">{subtitle}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">{questionTitle || "Question Title"}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-6">
                    {instruction || "Instructions will appear here..."}
                  </p>
                  
                  {/* Paragraph Preview */}
                  <div className="p-6 bg-background rounded-xl border-2 border-dashed border-border">
                    <p className="text-lg leading-loose text-foreground text-center font-medium">
                      {paragraph || "Your paragraph will appear here. Start typing to see the preview..."}
                    </p>
                  </div>

                  {/* Reading stats */}
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">{wordCount}</p>
                          <p className="text-xs text-muted-foreground">Words</p>
                        </div>
                        <div className="w-px h-8 bg-border" />
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">~{estimatedTime}</p>
                          <p className="text-xs text-muted-foreground">Minutes</p>
                        </div>
                      </div>
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

export default function ParagraphReadingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <ParagraphReadingContent />
    </Suspense>
  )
}
