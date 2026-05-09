"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus, Trash2, Check, Circle, Square, CheckSquare } from "lucide-react"

interface Option {
  id: number
  text: string
  isCorrect: boolean
}

export default function MCQEditorPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  // Question settings
  const [questionText, setQuestionText] = useState("")
  const [options, setOptions] = useState<Option[]>([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
    { id: 3, text: "", isCorrect: false },
    { id: 4, text: "", isCorrect: false },
  ])
  const [allowMultiple, setAllowMultiple] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleOptionChange = (id: number, text: string) => {
    setOptions(options.map(opt => 
      opt.id === id ? { ...opt, text } : opt
    ))
  }

  const handleToggleCorrect = (id: number) => {
    if (allowMultiple) {
      setOptions(options.map(opt => 
        opt.id === id ? { ...opt, isCorrect: !opt.isCorrect } : opt
      ))
    } else {
      setOptions(options.map(opt => 
        opt.id === id ? { ...opt, isCorrect: true } : { ...opt, isCorrect: false }
      ))
    }
  }

  const handleAddOption = () => {
    setOptions([...options, { id: Date.now(), text: "", isCorrect: false }])
  }

  const handleRemoveOption = (id: number) => {
    if (options.length > 2) {
      setOptions(options.filter(opt => opt.id !== id))
    }
  }

  const handleSave = () => {
    // Save logic here
    router.push("/admin/questions")
  }

  const filledOptions = options.filter(opt => opt.text.trim())

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-500 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/admin/questions")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/imili-logo.avif"
                  alt="Imili Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                  MCQ Editor
                </h1>
              </div>
            </div>
            <Button onClick={handleSave} className="gap-2">
              <Check className="w-4 h-4" />
              Save Question
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Split View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          
          {/* Left Side - Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question Text */}
                <div className="space-y-2">
                  <Label htmlFor="question">Question Text</Label>
                  <Input
                    id="question"
                    placeholder="Enter your question here..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="text-base"
                  />
                </div>

                {/* Multiple Answers Toggle */}
                <div className="flex items-center justify-between py-3 px-4 bg-muted/50 rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="multiple" className="text-sm font-medium">Allow Multiple Answers</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable if more than one option can be correct
                    </p>
                  </div>
                  <Switch
                    id="multiple"
                    checked={allowMultiple}
                    onCheckedChange={setAllowMultiple}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Answer Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {options.map((option, index) => (
                  <div 
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      option.isCorrect 
                        ? "border-green-500 bg-green-50" 
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    {/* Option Letter */}
                    <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>

                    {/* Option Input */}
                    <Input
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      value={option.text}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                    />

                    {/* Mark Correct Button */}
                    <button
                      onClick={() => handleToggleCorrect(option.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        option.isCorrect
                          ? "bg-green-500 text-white"
                          : "bg-muted hover:bg-muted-foreground/20 text-muted-foreground"
                      }`}
                      title={option.isCorrect ? "Correct answer" : "Mark as correct"}
                    >
                      {allowMultiple ? (
                        option.isCorrect ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />
                      ) : (
                        option.isCorrect ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />
                      )}
                    </button>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveOption(option.id)}
                      disabled={options.length <= 2}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Remove option"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Add Option Button */}
                <button
                  onClick={handleAddOption}
                  className="w-full py-3 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Option</span>
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Preview Question */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Question
                    </span>
                    <p className="text-lg font-medium text-foreground">
                      {questionText || "Your question will appear here..."}
                    </p>
                  </div>

                  {/* Preview Options */}
                  <div className="space-y-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Options {allowMultiple && "(Multiple Choice)"}
                    </span>
                    {filledOptions.length > 0 ? (
                      filledOptions.map((option, index) => (
                        <div
                          key={option.id}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                            option.isCorrect
                              ? "border-green-500 bg-green-50"
                              : "border-border"
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                            option.isCorrect
                              ? "bg-green-500 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-foreground">{option.text}</span>
                          {option.isCorrect && (
                            <Check className="w-4 h-4 text-green-500 ml-auto" />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-muted-foreground text-sm">
                        Add options to see preview
                      </div>
                    )}
                  </div>

                  {/* Answer Indicator */}
                  {options.some(opt => opt.isCorrect) && (
                    <div className="pt-4 border-t">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Correct Answer{options.filter(opt => opt.isCorrect).length > 1 ? "s" : ""}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {options.filter(opt => opt.isCorrect).map((opt, idx) => (
                          <span
                            key={opt.id}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                          >
                            <Check className="w-3 h-3" />
                            {String.fromCharCode(65 + options.findIndex(o => o.id === opt.id))}
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

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-muted-foreground text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
          imli
        </p>
      </footer>
    </div>
  )
}
