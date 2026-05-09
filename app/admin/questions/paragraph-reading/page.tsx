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
import { ArrowLeft, Save, BookOpen, Loader } from "lucide-react"

function ParagraphReadingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sectionId = searchParams.get("sectionId")
  
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [questionTitle, setQuestionTitle] = useState("Read the Paragraph")
  const [subtitle, setSubtitle] = useState("Oral Reading Fluency (ORF)")
  const [instruction, setInstruction] = useState("Read the following paragraph aloud clearly and fluently.")
  const [paragraph, setParagraph] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = async () => {
    if (!sectionId) {
      alert("No section selected")
      return
    }

    if (!paragraph.trim()) {
      alert("Please enter a paragraph")
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
          type: "paragraph_reading",
          data: {
            subtitle,
            instruction,
            paragraph: paragraph.trim(),
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

  const wordCount = paragraph.trim().split(/\s+/).filter(w => w).length

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
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              Paragraph Reading
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
            <CardTitle>Create Paragraph Reading Question</CardTitle>
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
                <span className="text-xs text-muted-foreground">{wordCount} words</span>
              </div>
              <Textarea
                id="paragraph"
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                placeholder="Enter the paragraph for students to read..."
                rows={6}
                className="resize-none"
              />
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <p className="text-sm text-primary font-medium mb-1">{subtitle}</p>
                <h3 className="text-lg font-semibold mb-2">{questionTitle}</h3>
                <p className="text-sm text-muted-foreground mb-4">{instruction}</p>
                <div className="p-4 bg-background rounded-lg border-2 border-dashed">
                  <p className="text-lg leading-relaxed text-foreground text-center font-medium">
                    {paragraph || "Your paragraph will appear here..."}
                  </p>
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
