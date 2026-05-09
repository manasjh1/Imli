"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Pencil, 
  X, 
  Check, 
  ArrowLeft, 
  Image as ImageIcon, 
  FileText, 
  LayoutGrid,
  Headphones,
  CheckSquare,
  ListOrdered,
  Columns,
  PenLine,
  ArrowDownUp,
  Settings
} from "lucide-react"

type QuestionType = "mcq" | "audio" | "image" | "true_false" | "fill_blanks" | "match_columns" | "written" | "sequence" | "custom"

interface Question {
  id: number
  text: string
  type: QuestionType
}

interface Section {
  id: number
  title: string
  questions: Question[]
}

const questionTypes = [
  { id: "mcq", label: "MCQ", icon: LayoutGrid },
  { id: "audio", label: "Audio Question", icon: Headphones },
  { id: "image", label: "Image Question", icon: ImageIcon },
  { id: "true_false", label: "True / False", icon: CheckSquare },
  { id: "fill_blanks", label: "Fill in the Blanks", icon: FileText },
  { id: "match_columns", label: "Match These Columns", icon: Columns },
  { id: "written", label: "Written Answer", icon: PenLine },
  { id: "sequence", label: "Arrange in Sequence", icon: ArrowDownUp },
  { id: "custom", label: "Custom Type", icon: Settings },
]

const getTypeIcon = (type: QuestionType) => {
  const found = questionTypes.find(t => t.id === type)
  return found ? found.icon : FileText
}

const getTypeLabel = (type: QuestionType) => {
  const found = questionTypes.find(t => t.id === type)
  return found ? found.label : type
}

export default function QuestionsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      title: "Section 1: General Knowledge",
      questions: [
        { id: 1, text: "What is the capital of France?", type: "mcq" },
        { id: 2, text: "Explain the concept of photosynthesis.", type: "written" },
      ]
    },
    {
      id: 2,
      title: "Section 2: Mathematics",
      questions: [
        { id: 3, text: "What is 25 x 4?", type: "fill_blanks" },
      ]
    }
  ])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")
  const [showTypeSelector, setShowTypeSelector] = useState<{ sectionId: number; questionIndex: number } | null>(null)
  const [addingSectionAt, setAddingSectionAt] = useState<number | null>(null)
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null)
  const [editSectionTitle, setEditSectionTitle] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const handleEdit = (question: Question) => {
    setEditingId(question.id)
    setEditText(question.text)
    setShowTypeSelector(null)
    setAddingSectionAt(null)
  }

  const handleSaveEdit = (sectionId: number, questionId: number) => {
    if (editText.trim()) {
      setSections(sections.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              questions: section.questions.map(q => 
                q.id === questionId ? { ...q, text: editText.trim() } : q
              )
            }
          : section
      ))
    }
    setEditingId(null)
    setEditText("")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  const handleShowTypeSelector = (sectionId: number, questionIndex: number) => {
    setShowTypeSelector({ sectionId, questionIndex })
    setEditingId(null)
    setAddingSectionAt(null)
  }

  const handleSelectType = (type: QuestionType) => {
    if (showTypeSelector) {
      // Navigate to dedicated editor pages
      const editorRoutes: Record<QuestionType, string> = {
        mcq: "/admin/questions/mcq",
        audio: "/admin/questions/audio-question",
        image: "/admin/questions/image-question",
        true_false: "/admin/questions/true-false",
        fill_blanks: "/admin/questions/fill-blanks",
        match_columns: "/admin/questions/match-columns",
        written: "/admin/questions/written-answer",
        sequence: "/admin/questions/arrange-sequence",
        custom: "/admin/questions/custom-type",
      }
      
      router.push(editorRoutes[type])
    }
  }

  const handleCancelTypeSelector = () => {
    setShowTypeSelector(null)
  }

  const handleAddSectionAt = (index: number) => {
    setAddingSectionAt(index)
    setNewSectionTitle("")
    setShowTypeSelector(null)
    setEditingId(null)
  }

  const handleSaveSection = (index: number) => {
    if (newSectionTitle.trim()) {
      const newSection: Section = {
        id: Date.now(),
        title: newSectionTitle.trim(),
        questions: []
      }
      const newSections = [...sections]
      newSections.splice(index, 0, newSection)
      setSections(newSections)
    }
    setAddingSectionAt(null)
    setNewSectionTitle("")
  }

  const handleCancelAddSection = () => {
    setAddingSectionAt(null)
    setNewSectionTitle("")
  }

  const handleEditSection = (section: Section) => {
    setEditingSectionId(section.id)
    setEditSectionTitle(section.title)
  }

  const handleSaveSectionEdit = (sectionId: number) => {
    if (editSectionTitle.trim()) {
      setSections(sections.map(s => 
        s.id === sectionId ? { ...s, title: editSectionTitle.trim() } : s
      ))
    }
    setEditingSectionId(null)
    setEditSectionTitle("")
  }

  const handleCancelSectionEdit = () => {
    setEditingSectionId(null)
    setEditSectionTitle("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`border-b border-border transition-all duration-700 ease-out ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="p-2 hover:bg-muted rounded-full transition-colors">
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
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">
            Manage Questions
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-4">
          
          {/* Add Section at beginning */}
          <div className={`transition-all duration-500 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`} style={{ transitionDelay: "100ms" }}>
            {addingSectionAt === 0 ? (
              <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                <CardContent className="p-4 space-y-3">
                  <Input
                    placeholder="Enter section title..."
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    autoFocus
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={handleCancelAddSection}>
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleSaveSection(0)}>
                      <Check className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <button
                onClick={() => handleAddSectionAt(0)}
                className="w-full py-3 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm font-medium">Add New Section</span>
              </button>
            )}
          </div>

          {/* Sections */}
          {sections.map((section, sectionIndex) => (
            <div key={section.id} className={`transition-all duration-500 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`} style={{ transitionDelay: `${150 + sectionIndex * 100}ms` }}>
              
              {/* Section Header */}
              <Card className="mb-2">
                <CardContent className="p-4">
                  {editingSectionId === section.id ? (
                    <div className="flex gap-2 items-center">
                      <Input
                        value={editSectionTitle}
                        onChange={(e) => setEditSectionTitle(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button variant="ghost" size="sm" onClick={handleCancelSectionEdit}>
                        <X className="w-4 h-4" />
                      </Button>
                      <Button size="sm" onClick={() => handleSaveSectionEdit(section.id)}>
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <h2 className="text-base sm:text-lg font-semibold text-foreground">
                        {section.title}
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditSection(section)}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Pencil className="w-4 h-4" />
                        <span className="ml-1 hidden sm:inline">Edit</span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Questions in Section */}
              <div className="space-y-2 pl-4 border-l-2 border-muted ml-4">
                
                {/* Add Question at beginning of section */}
                {showTypeSelector?.sectionId === section.id && showTypeSelector?.questionIndex === 0 ? (
                  <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                    <CardContent className="p-4 space-y-3">
                      <p className="text-sm font-medium text-foreground mb-2">Select Question Type:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {questionTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <button
                              key={type.id}
                              onClick={() => handleSelectType(type.id as QuestionType)}
                              className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                            >
                              <Icon className="w-4 h-4 text-primary" />
                              <span className="text-xs sm:text-sm font-medium">{type.label}</span>
                            </button>
                          )
                        })}
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button variant="ghost" size="sm" onClick={handleCancelTypeSelector}>
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <button
                    onClick={() => handleShowTypeSelector(section.id, 0)}
                    className="w-full py-2 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Add Question</span>
                  </button>
                )}

                {section.questions.map((question, questionIndex) => (
                  <div key={question.id}>
                    {/* Question Card */}
                    <Card className="border border-border hover:shadow-md transition-shadow duration-200">
                      <CardContent className="p-4">
                        {editingId === question.id ? (
                          <div className="space-y-3">
                            <Textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="min-h-[80px] resize-none"
                              autoFocus
                            />
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                              <Button size="sm" onClick={() => handleSaveEdit(section.id, question.id)}>
                                <Check className="w-4 h-4 mr-1" />
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-3 flex-1">
                              <span className="text-sm font-semibold text-muted-foreground min-w-[24px]">
                                {questionIndex + 1}.
                              </span>
                              <p className="text-foreground text-sm sm:text-base">
                                {question.text}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {(() => {
                                const Icon = getTypeIcon(question.type)
                                return (
                                  <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                    <Icon className="w-3 h-3" />
                                    <span className="hidden sm:inline">{getTypeLabel(question.type)}</span>
                                  </span>
                                )
                              })()}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(question)}
                                className="hover:bg-primary/10 hover:text-primary"
                              >
                                <Pencil className="w-4 h-4" />
                                <span className="ml-1 hidden sm:inline">Edit</span>
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Add Question after this question */}
                    <div className="mt-2">
                      {showTypeSelector?.sectionId === section.id && showTypeSelector?.questionIndex === questionIndex + 1 ? (
                        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                          <CardContent className="p-4 space-y-3">
                            <p className="text-sm font-medium text-foreground mb-2">Select Question Type:</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {questionTypes.map((type) => {
                                const Icon = type.icon
                                return (
                                  <button
                                    key={type.id}
                                    onClick={() => handleSelectType(type.id as QuestionType)}
                                    className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                                  >
                                    <Icon className="w-4 h-4 text-primary" />
                                    <span className="text-xs sm:text-sm font-medium">{type.label}</span>
                                  </button>
                                )
                              })}
                            </div>
                            <div className="flex justify-end pt-2">
                              <Button variant="ghost" size="sm" onClick={handleCancelTypeSelector}>
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <button
                          onClick={() => handleShowTypeSelector(section.id, questionIndex + 1)}
                          className="w-full py-2 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="text-sm font-medium">Add Question</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Section after this section */}
              <div className="mt-4">
                {addingSectionAt === sectionIndex + 1 ? (
                  <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                    <CardContent className="p-4 space-y-3">
                      <Input
                        placeholder="Enter section title..."
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={handleCancelAddSection}>
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleSaveSection(sectionIndex + 1)}>
                          <Check className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <button
                    onClick={() => handleAddSectionAt(sectionIndex + 1)}
                    className="w-full py-3 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="text-sm font-medium">Add New Section</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-6 text-center transition-all duration-700 ease-out ${
        mounted ? "opacity-100" : "opacity-0"
      }`} style={{ transitionDelay: "400ms" }}>
        <p className="text-muted-foreground text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
          imli
        </p>
      </footer>
    </div>
  )
}
