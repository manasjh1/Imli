"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  Settings,
  Trash2,
  Loader,
  Volume2,
  BookOpen,
  ImagePlus
} from "lucide-react"
import { mockSections } from "@/lib/mock-data"

type QuestionType = "mcq" | "audio" | "image" | "true_false" | "fill_blanks" | "match_columns" | "written" | "sequence" | "custom" | "word_reading" | "paragraph_reading" | "picture_writing"

interface QuestionOption {
  id: string
  text: string
  is_correct: boolean
}

interface Question {
  id: string
  text: string
  type: QuestionType
  data: any
  question_options?: QuestionOption[]
}

interface Section {
  id: string
  title: string
  order: number
  questions?: Question[]
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
  { id: "word_reading", label: "Word Reading", icon: Volume2 },
  { id: "paragraph_reading", label: "Paragraph Reading", icon: BookOpen },
  { id: "picture_writing", label: "Picture Writing", icon: ImagePlus },
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

const getEditorRoute = (type: QuestionType): string => {
  const editorRoutes: Record<QuestionType, string> = {
    mcq: "/admin/questions/mcq",
    audio: "/admin/questions/audio-question",
    image: "/admin/questions/image-question",
    true_false: "/admin/questions/true-false",
    fill_blanks: "/admin/questions/fill-blanks",
    match_columns: "/admin/questions/match-columns",
    written: "/admin/questions/written-answer",
    sequence: "/admin/questions/arrange-sequence",
    word_reading: "/admin/questions/word-reading",
    paragraph_reading: "/admin/questions/paragraph-reading",
    picture_writing: "/admin/questions/picture-writing",
    custom: "/admin/questions/custom-type",
  }
  return editorRoutes[type] || "/admin/questions"
}

export default function QuestionsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [showTypeSelector, setShowTypeSelector] = useState<{ sectionId: string; questionIndex: number } | null>(null)
  const [addingSectionAt, setAddingSectionAt] = useState<number | null>(null)
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)
  const [editSectionTitle, setEditSectionTitle] = useState("")

  // Load sections - using mock data for demo
  useEffect(() => {
    // Use mock data instead of fetching from API
    setSections(mockSections)
    setLoading(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const handleShowTypeSelector = (sectionId: string) => {
    setShowTypeSelector({ sectionId, questionIndex: 0 })
    setEditingId(null)
    setAddingSectionAt(null)
  }

  const handleSelectType = (type: QuestionType) => {
    if (showTypeSelector) {
      const editorRoutes: Record<QuestionType, string> = {
        mcq: "/admin/questions/mcq",
        audio: "/admin/questions/audio-question",
        image: "/admin/questions/image-question",
        true_false: "/admin/questions/true-false",
        fill_blanks: "/admin/questions/fill-blanks",
        match_columns: "/admin/questions/match-columns",
        written: "/admin/questions/written-answer",
        sequence: "/admin/questions/arrange-sequence",
        word_reading: "/admin/questions/word-reading",
        paragraph_reading: "/admin/questions/paragraph-reading",
        picture_writing: "/admin/questions/picture-writing",
        custom: "/admin/questions/custom-type",
      }
      
      const route = editorRoutes[type]
      router.push(`${route}?sectionId=${showTypeSelector.sectionId}`)
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

  const handleSaveSection = async (index: number) => {
    if (newSectionTitle.trim()) {
      try {
        const res = await fetch("/api/sections", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newSectionTitle.trim(),
            order: index,
          }),
        })

        if (res.ok) {
          const newSection = await res.json()
          const newSections = [...sections]
          newSections.splice(index, 0, newSection)
          setSections(newSections)
        }
      } catch (error) {
        console.error("Error saving section:", error)
        alert("Failed to save section")
      }
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

  const handleSaveSectionEdit = async (sectionId: string) => {
    if (editSectionTitle.trim()) {
      try {
        const res = await fetch("/api/sections", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: sectionId,
            title: editSectionTitle.trim(),
          }),
        })

        if (res.ok) {
          setSections(sections.map(s => 
            s.id === sectionId ? { ...s, title: editSectionTitle.trim() } : s
          ))
        }
      } catch (error) {
        console.error("Error updating section:", error)
        alert("Failed to update section")
      }
    }
    setEditingSectionId(null)
    setEditSectionTitle("")
  }

  const handleCancelSectionEdit = () => {
    setEditingSectionId(null)
    setEditSectionTitle("")
  }

  const handleDeleteQuestion = async (questionId: string, sectionId: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      try {
        const res = await fetch(`/api/questions?id=${questionId}`, {
          method: "DELETE",
        })

        if (res.ok) {
          setSections(sections.map(s =>
            s.id === sectionId
              ? { ...s, questions: s.questions?.filter(q => q.id !== questionId) }
              : s
          ))
        }
      } catch (error) {
        console.error("Error deleting question:", error)
        alert("Failed to delete question")
      }
    }
  }

  const handleDeleteSection = async (sectionId: string) => {
    if (confirm("Are you sure you want to delete this section and all its questions?")) {
      try {
        const res = await fetch(`/api/sections?id=${sectionId}`, {
          method: "DELETE",
        })

        if (res.ok) {
          setSections(sections.filter(s => s.id !== sectionId))
        }
      } catch (error) {
        console.error("Error deleting section:", error)
        alert("Failed to delete section")
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-muted-foreground">Loading sections...</p>
        </div>
      </div>
    )
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
          {sections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No sections yet. Create one to get started!</p>
            </div>
          ) : (
            sections.map((section, sectionIndex) => (
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
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditSection(section)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Pencil className="w-4 h-4" />
                            <span className="ml-1 hidden sm:inline">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSection(section.id)}
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="ml-1 hidden sm:inline">Delete</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Questions in Section */}
                <div className="space-y-2 pl-4 border-l-2 border-muted ml-4">
                  
                  {/* Add Question Button */}
                  {showTypeSelector?.sectionId === section.id ? (
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
                      onClick={() => handleShowTypeSelector(section.id)}
                      className="w-full py-2 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">Add Question</span>
                    </button>
                  )}

                  {/* Questions */}
                  {section.questions && section.questions.length > 0 ? (
                    section.questions.map((question, questionIndex) => (
                      <Card 
                        key={question.id} 
                        className="border border-border hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer group"
                        onClick={() => router.push(`${getEditorRoute(question.type)}?questionId=${question.id}&sectionId=${section.id}`)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-3 flex-1">
                              <span className="text-sm font-semibold text-muted-foreground min-w-[24px]">
                                {questionIndex + 1}.
                              </span>
                              <div className="flex-1">
                                <p className="text-foreground text-sm sm:text-base group-hover:text-primary transition-colors font-medium">
                                  {question.text}
                                </p>
                                
                                {/* Question Preview */}
                                <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-border/50">
                                  {/* Word Reading Preview */}
                                  {question.type === "word_reading" && question.data?.words && (
                                    <div className="space-y-2">
                                      <p className="text-xs text-muted-foreground mb-2">{question.data.instructions}</p>
                                      <div className="grid grid-cols-4 gap-2">
                                        {question.data.words.flat().slice(0, 8).map((word: string, idx: number) => (
                                          <span key={idx} className="text-sm bg-background px-2 py-1 rounded text-center border border-border">
                                            {word}
                                          </span>
                                        ))}
                                        {question.data.words.flat().length > 8 && (
                                          <span className="text-xs text-muted-foreground col-span-4 text-center">
                                            +{question.data.words.flat().length - 8} more words
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Paragraph Reading Preview */}
                                  {question.type === "paragraph_reading" && question.data?.paragraph && (
                                    <div className="space-y-2">
                                      <p className="text-xs text-muted-foreground">{question.data.instructions}</p>
                                      <p className="text-sm bg-background p-2 rounded border border-border leading-relaxed">
                                        {question.data.paragraph.length > 150 
                                          ? question.data.paragraph.slice(0, 150) + "..." 
                                          : question.data.paragraph}
                                      </p>
                                      <p className="text-xs text-muted-foreground">Word count: {question.data.wordCount}</p>
                                    </div>
                                  )}
                                  
                                  {/* Picture Writing Preview */}
                                  {question.type === "picture_writing" && (
                                    <div className="flex gap-4 items-start">
                                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-lg border border-border flex items-center justify-center overflow-hidden shrink-0">
                                        {question.data?.imageUrl ? (
                                          <Image
                                            src={question.data.imageUrl}
                                            alt="Question image"
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                        )}
                                      </div>
                                      <div className="flex-1 space-y-2">
                                        <p className="text-xs text-muted-foreground">{question.data?.instructions}</p>
                                        <p className="text-sm text-foreground">
                                          Write {question.data?.numberOfWords || 5} words
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                          {Array.from({ length: question.data?.numberOfWords || 5 }).map((_, idx) => (
                                            <span key={idx} className="text-xs bg-background px-3 py-1 rounded border border-dashed border-border text-muted-foreground">
                                              Word {idx + 1}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* MCQ Preview */}
                                  {question.type === "mcq" && question.question_options && (
                                    <div className="space-y-1">
                                      {question.question_options.slice(0, 4).map((opt, idx) => (
                                        <div key={opt.id} className={`text-sm px-2 py-1 rounded flex items-center gap-2 ${opt.is_correct ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-background'}`}>
                                          <span className="text-xs text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>
                                          <span>{opt.text}</span>
                                          {opt.is_correct && <Check className="w-3 h-3 ml-auto" />}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Image Question Preview */}
                                  {question.type === "image" && question.data?.imageUrl && (
                                    <div className="flex gap-4 items-center">
                                      <div className="w-20 h-20 bg-muted rounded-lg border border-border flex items-center justify-center overflow-hidden">
                                        <Image
                                          src={question.data.imageUrl}
                                          alt="Question image"
                                          width={80}
                                          height={80}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        {question.question_options && question.question_options.slice(0, 2).map((opt, idx) => (
                                          <div key={opt.id} className="text-sm text-muted-foreground">
                                            {String.fromCharCode(65 + idx)}. {opt.text}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Generic fallback for other types */}
                                  {!["word_reading", "paragraph_reading", "picture_writing", "mcq", "image"].includes(question.type) && (
                                    <p className="text-xs text-muted-foreground italic">
                                      {getTypeLabel(question.type)} question - click to view details
                                    </p>
                                  )}
                                </div>
                                
                                <p className="text-xs text-muted-foreground mt-2">
                                  Click to edit
                                </p>
                              </div>
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
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteQuestion(question.id, section.id)
                                }}
                                className="hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No questions yet
                    </div>
                  )}
                </div>

                {/* Add Section after */}
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
                      className="w-full py-2 border-2 border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">Add Section</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center mt-12">
        <p className="text-muted-foreground text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
          imli
        </p>
      </footer>
    </div>
  )
}
