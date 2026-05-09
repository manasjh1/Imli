"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, Suspense, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, ImagePlus, Loader, Upload, X, Eye, PenLine } from "lucide-react"

function PictureWritingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sectionId = searchParams.get("sectionId")
  const questionId = searchParams.get("questionId")
  const isEditMode = !!questionId
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEditMode)
  const [uploading, setUploading] = useState(false)
  const [questionTitle, setQuestionTitle] = useState("Write Five Words")
  const [subtitle, setSubtitle] = useState("Writing Assessment")
  const [instruction, setInstruction] = useState("Look at the picture and write five words related to it.")
  const [imageUrl, setImageUrl] = useState("")
  const [imageDescription, setImageDescription] = useState("")
  const [wordCount, setWordCount] = useState(5)

  // Load existing question data if editing
  useEffect(() => {
    if (questionId) {
      const loadQuestion = async () => {
        try {
          const res = await fetch(`/api/questions?id=${questionId}`)
          if (res.ok) {
            const data = await res.json()
            setQuestionTitle(data.text || "Write Five Words")
            if (data.data) {
              setSubtitle(data.data.subtitle || "")
              setInstruction(data.data.instruction || "")
              setImageUrl(data.data.imageUrl || "")
              setImageDescription(data.data.imageDescription || "")
              setWordCount(data.data.wordCount || 5)
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const localUrl = URL.createObjectURL(file)
      setImageUrl(localUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setImageUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSave = async () => {
    if (!sectionId && !isEditMode) {
      alert("No section selected")
      return
    }

    if (!imageUrl && !imageDescription) {
      alert("Please upload an image or provide a description")
      return
    }

    setSaving(true)
    try {
      const questionData = {
        text: questionTitle,
        type: "picture_writing",
        data: {
          subtitle,
          instruction,
          imageUrl,
          imageDescription,
          wordCount,
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
            <ImagePlus className="w-5 h-5 text-primary" />
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              Picture Writing
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
                      placeholder="e.g., Write Five Words"
                    />
                  </div>

                  {/* Subtitle */}
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g., Writing Assessment"
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

                  {/* Word Count */}
                  <div className="space-y-2">
                    <Label htmlFor="wordCount">Number of Words to Write</Label>
                    <Input
                      id="wordCount"
                      type="number"
                      min={1}
                      max={10}
                      value={wordCount}
                      onChange={(e) => setWordCount(parseInt(e.target.value) || 5)}
                      className="w-32"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Picture</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    {imageUrl ? (
                      <div className="relative w-full aspect-video max-h-[200px] rounded-lg overflow-hidden border bg-muted">
                        <Image
                          src={imageUrl}
                          alt="Uploaded picture"
                          fill
                          className="object-contain"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        {uploading ? (
                          <Loader className="w-8 h-8 animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-6 h-6" />
                            <span className="text-sm font-medium">Click to upload image</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Image Description */}
                  <div className="space-y-2">
                    <Label htmlFor="imageDescription">Image Description (for accessibility)</Label>
                    <Input
                      id="imageDescription"
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                      placeholder="e.g., A colorful zoo scene with animals"
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
                      <PenLine className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">{questionTitle || "Question Title"}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-6">
                    {instruction || "Instructions will appear here..."}
                  </p>
                  
                  {/* Image Preview */}
                  <div className="mb-6">
                    {imageUrl ? (
                      <div className="relative w-full aspect-video max-h-[250px] rounded-xl overflow-hidden border-2 border-border bg-muted">
                        <Image
                          src={imageUrl}
                          alt={imageDescription || "Preview"}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-video max-h-[250px] rounded-xl border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                        <ImagePlus className="w-12 h-12" />
                        <span className="text-sm">Upload an image to see preview</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Word Input Fields */}
                  <div className="space-y-3">
                    {Array.from({ length: wordCount }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex-1 h-12 bg-background border-2 border-border rounded-lg flex items-center px-4 text-muted-foreground">
                          Type word here...
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Write {wordCount} word{wordCount !== 1 ? "s" : ""}</span>
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

export default function PictureWritingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <PictureWritingContent />
    </Suspense>
  )
}
