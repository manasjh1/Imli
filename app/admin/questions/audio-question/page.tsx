"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, Upload, Music, Plus, Trash2, Circle, Square, CheckSquare, Play, Pause } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface Option {
  id: number
  text: string
  isCorrect: boolean
}

export default function AudioQuestionEditorPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [questionText, setQuestionText] = useState("")
  const [audioUrl, setAudioUrl] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [options, setOptions] = useState<Option[]>([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
  ])
  const [allowMultiple, setAllowMultiple] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = () => {
    router.push("/admin/questions")
  }

  const handleOptionChange = (id: number, text: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text } : opt))
  }

  const handleToggleCorrect = (id: number) => {
    if (allowMultiple) {
      setOptions(options.map(opt => opt.id === id ? { ...opt, isCorrect: !opt.isCorrect } : opt))
    } else {
      setOptions(options.map(opt => opt.id === id ? { ...opt, isCorrect: true } : { ...opt, isCorrect: false }))
    }
  }

  const handleAddOption = () => setOptions([...options, { id: Date.now(), text: "", isCorrect: false }])
  const handleRemoveOption = (id: number) => {
    if (options.length > 2) setOptions(options.filter(opt => opt.id !== id))
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
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">Audio Question Editor</h1>
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
                  <Input
                    id="question"
                    placeholder="Enter your question..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Audio File</Label>
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center hover:border-primary/50 transition-all">
                    {audioUrl ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                          >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                          </button>
                          <div className="flex-1 max-w-[200px] h-2 bg-muted rounded-full">
                            <div className="w-1/3 h-full bg-primary rounded-full"></div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setAudioUrl("")}>Remove</Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload audio file</p>
                        <Input
                          placeholder="Or paste audio URL"
                          value={audioUrl}
                          onChange={(e) => setAudioUrl(e.target.value)}
                          className="max-w-xs mx-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Allow Multiple Answers</Label>
                    <p className="text-xs text-muted-foreground">Enable if more than one option can be correct</p>
                  </div>
                  <Switch checked={allowMultiple} onCheckedChange={setAllowMultiple} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Answer Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {options.map((option, index) => (
                  <div key={option.id} className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    option.isCorrect ? "border-green-500 bg-green-50" : "border-border"
                  }`}>
                    <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <Input
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      value={option.text}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      className="flex-1 border-0 bg-transparent focus-visible:ring-0 px-0"
                    />
                    <button
                      onClick={() => handleToggleCorrect(option.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        option.isCorrect ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {allowMultiple ? (option.isCorrect ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />) : (option.isCorrect ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />)}
                    </button>
                    <button
                      onClick={() => handleRemoveOption(option.id)}
                      disabled={options.length <= 2}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={handleAddOption} className="w-full py-3 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Option</span>
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
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Question</span>
                  <p className="text-lg font-medium">{questionText || "Your question will appear here..."}</p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  {audioUrl ? (
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <Play className="w-4 h-4 ml-0.5" />
                      </button>
                      <div className="flex-1 h-2 bg-muted rounded-full">
                        <div className="w-0 h-full bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">0:00</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-4">
                      <Music className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {options.filter(o => o.text.trim()).map((option, index) => (
                    <div key={option.id} className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
                      option.isCorrect ? "border-green-500 bg-green-50" : "border-border"
                    }`}>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        option.isCorrect ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                      }`}>{String.fromCharCode(65 + index)}</span>
                      <span>{option.text}</span>
                      {option.isCorrect && <Check className="w-4 h-4 text-green-500 ml-auto" />}
                    </div>
                  ))}
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
