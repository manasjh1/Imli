"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, Plus, Trash2, ArrowRight } from "lucide-react"

interface MatchPair {
  id: number
  left: string
  right: string
}

export default function MatchColumnsEditorPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [questionText, setQuestionText] = useState("")
  const [pairs, setPairs] = useState<MatchPair[]>([
    { id: 1, left: "", right: "" },
    { id: 2, left: "", right: "" },
    { id: 3, left: "", right: "" },
  ])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = () => {
    router.push("/admin/questions")
  }

  const updatePair = (id: number, side: "left" | "right", value: string) => {
    setPairs(pairs.map(p => p.id === id ? { ...p, [side]: value } : p))
  }

  const addPair = () => setPairs([...pairs, { id: Date.now(), left: "", right: "" }])
  
  const removePair = (id: number) => {
    if (pairs.length > 2) setPairs(pairs.filter(p => p.id !== id))
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
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">Match Columns Editor</h1>
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
                  <Label htmlFor="question">Instructions</Label>
                  <Input
                    id="question"
                    placeholder="Match the following..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Match Pairs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <Label className="text-center text-muted-foreground">Column A</Label>
                  <Label className="text-center text-muted-foreground">Column B</Label>
                </div>
                {pairs.map((pair, index) => (
                  <div key={pair.id} className="flex items-center gap-2">
                    <span className="w-6 text-sm font-semibold text-muted-foreground">{index + 1}.</span>
                    <Input
                      placeholder="Left item"
                      value={pair.left}
                      onChange={(e) => updatePair(pair.id, "left", e.target.value)}
                      className="flex-1"
                    />
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    <Input
                      placeholder="Right item"
                      value={pair.right}
                      onChange={(e) => updatePair(pair.id, "right", e.target.value)}
                      className="flex-1"
                    />
                    <button
                      onClick={() => removePair(pair.id)}
                      disabled={pairs.length <= 2}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={addPair} className="w-full py-3 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Pair</span>
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
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Instructions</span>
                  <p className="text-lg font-medium">{questionText || "Match the following..."}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Column A</span>
                    {pairs.filter(p => p.left.trim()).map((pair, index) => (
                      <div key={pair.id} className="p-3 bg-muted/50 rounded-lg">
                        <span className="font-semibold text-primary mr-2">{index + 1}.</span>
                        {pair.left}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Column B</span>
                    {pairs.filter(p => p.right.trim()).map((pair, index) => (
                      <div key={pair.id} className="p-3 bg-muted/50 rounded-lg">
                        <span className="font-semibold text-primary mr-2">{String.fromCharCode(65 + index)}.</span>
                        {pair.right}
                      </div>
                    ))}
                  </div>
                </div>

                {pairs.some(p => p.left.trim() && p.right.trim()) && (
                  <div className="pt-4 border-t">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Correct Matches</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {pairs.filter(p => p.left.trim() && p.right.trim()).map((pair, index) => (
                        <span key={pair.id} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {index + 1} <ArrowRight className="w-3 h-3" /> {String.fromCharCode(65 + index)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
