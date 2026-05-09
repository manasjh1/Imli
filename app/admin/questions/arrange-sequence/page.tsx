"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, Plus, Trash2, GripVertical, ArrowDown } from "lucide-react"

interface SequenceItem {
  id: number
  text: string
  order: number
}

export default function ArrangeSequenceEditorPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [questionText, setQuestionText] = useState("")
  const [items, setItems] = useState<SequenceItem[]>([
    { id: 1, text: "", order: 1 },
    { id: 2, text: "", order: 2 },
    { id: 3, text: "", order: 3 },
  ])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = () => {
    router.push("/admin/questions")
  }

  const updateItem = (id: number, text: string) => {
    setItems(items.map(item => item.id === id ? { ...item, text } : item))
  }

  const addItem = () => {
    setItems([...items, { id: Date.now(), text: "", order: items.length + 1 }])
  }

  const removeItem = (id: number) => {
    if (items.length > 2) {
      const newItems = items.filter(item => item.id !== id)
      setItems(newItems.map((item, index) => ({ ...item, order: index + 1 })))
    }
  }

  const moveItem = (id: number, direction: "up" | "down") => {
    const index = items.findIndex(item => item.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === items.length - 1)) return
    
    const newItems = [...items]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]]
    setItems(newItems.map((item, i) => ({ ...item, order: i + 1 })))
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
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">Arrange in Sequence Editor</h1>
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
                    placeholder="Arrange the following in correct order..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sequence Items (in correct order)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Enter items in the correct order. They will be shuffled for students.</p>
                {items.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                      {index + 1}
                    </span>
                    <Input
                      placeholder={`Item ${index + 1}`}
                      value={item.text}
                      onChange={(e) => updateItem(item.id, e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveItem(item.id, "up")}
                        disabled={index === 0}
                        className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 rotate-180"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveItem(item.id, "down")}
                        disabled={index === items.length - 1}
                        className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={items.length <= 2}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Item</span>
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
                  <p className="text-lg font-medium">{questionText || "Arrange the following in correct order..."}</p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Items (shuffled for students)</span>
                  {items.filter(item => item.text.trim()).sort(() => Math.random() - 0.5).map((item) => (
                    <div key={item.id} className="p-3 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20 cursor-move flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                {items.some(item => item.text.trim()) && (
                  <div className="pt-4 border-t">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Correct Order</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {items.filter(item => item.text.trim()).map((item, index) => (
                        <span key={item.id} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {index + 1}. {item.text.substring(0, 15)}{item.text.length > 15 ? "..." : ""}
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
