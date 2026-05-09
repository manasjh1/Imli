"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, Suspense, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, ImagePlus, Loader, Upload, X } from "lucide-react"

function PictureWritingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sectionId = searchParams.get("sectionId")
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [questionTitle, setQuestionTitle] = useState("Write Five Words")
  const [subtitle, setSubtitle] = useState("Writing Assessment")
  const [instruction, setInstruction] = useState("Look at the picture and write five words related to it.")
  const [imageUrl, setImageUrl] = useState("")
  const [imageDescription, setImageDescription] = useState("")
  const [wordCount, setWordCount] = useState(5)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // For now, use a local URL - in production, you would upload to Vercel Blob
      const localUrl = URL.createObjectURL(file)
      setImageUrl(localUrl)
      
      // In a real app, upload to Vercel Blob:
      // const formData = new FormData()
      // formData.append("file", file)
      // const res = await fetch("/api/upload", { method: "POST", body: formData })
      // const { url } = await res.json()
      // setImageUrl(url)
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
    if (!sectionId) {
      alert("No section selected")
      return
    }

    if (!imageUrl && !imageDescription) {
      alert("Please upload an image or provide a description")
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
          type: "picture_writing",
          data: {
            subtitle,
            instruction,
            imageUrl,
            imageDescription,
            wordCount,
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
            <ImagePlus className="w-5 h-5 text-primary" />
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              Picture Writing
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
            <CardTitle>Create Picture Writing Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
                <div className="relative w-full aspect-video max-h-[300px] rounded-lg overflow-hidden border bg-muted">
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
                  className="w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {uploading ? (
                    <Loader className="w-8 h-8 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8" />
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

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <p className="text-sm text-primary font-medium mb-1">{subtitle}</p>
                <h3 className="text-lg font-semibold mb-2">{questionTitle}</h3>
                <p className="text-sm text-muted-foreground mb-4">{instruction}</p>
                
                {imageUrl && (
                  <div className="relative w-full aspect-video max-h-[200px] rounded-lg overflow-hidden border mb-4 bg-muted">
                    <Image
                      src={imageUrl}
                      alt={imageDescription || "Preview"}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  {Array.from({ length: wordCount }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <div className="flex-1 h-10 bg-background border rounded-lg" />
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
