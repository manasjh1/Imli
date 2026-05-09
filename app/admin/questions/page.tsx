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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className={`border-b border-border transition-all duration-700 ease-out shrink-0 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}>
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
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
      <main className="flex-1 overflow-y-auto">
        <div className={`max-w-3xl mx-auto p-4 sm:p-6 space-y-4 transition-all duration-500 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
            {/* Add Section at beginning */}
            <div>
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
                <div key={section.id}>
                  {/* Section Header */}
                  <Card className="mb-2">
                    <CardContent className="p-3">
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
                          <h2 className="text-sm sm:text-base font-semibold text-foreground">
                            {section.title}
                          </h2>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditSection(section)}
                              className="hover:bg-primary/10 hover:text-primary h-8 w-8 p-0"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSection(section.id)}
                              className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Questions in Section */}
                  <div className="space-y-2 pl-3 border-l-2 border-muted ml-3">
                    {/* Add Question Button */}
                    {showTypeSelector?.sectionId === section.id ? (
                      <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                        <CardContent className="p-3 space-y-3">
                          <p className="text-sm font-medium text-foreground mb-2">Select Question Type:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {questionTypes.map((type) => {
                              const Icon = type.icon
                              return (
                                <button
                                  key={type.id}
                                  onClick={() => handleSelectType(type.id as QuestionType)}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                                >
                                  <Icon className="w-4 h-4 text-primary shrink-0" />
                                  <span className="text-xs font-medium truncate">{type.label}</span>
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
                      section.questions.map((question, questionIndex) => {
                        const Icon = getTypeIcon(question.type)
                        return (
                          <Card 
                            key={question.id} 
                            className="border border-border hover:border-primary/50 hover:shadow-sm transition-all duration-200 cursor-pointer group"
                            onClick={() => router.push(`${getEditorRoute(question.type)}?questionId=${question.id}&sectionId=${section.id}`)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex gap-2 flex-1 min-w-0">
                                  <span className="text-xs font-semibold text-muted-foreground shrink-0">
                                    {questionIndex + 1}.
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                                      {question.text}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Icon className="w-3 h-3" />
                                        <span className="hidden sm:inline">{getTypeLabel(question.type)}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      router.push(`${getEditorRoute(question.type)}?questionId=${question.id}&sectionId=${section.id}`)
                                    }}
                                    className="hover:bg-primary/10 hover:text-primary h-7 w-7 p-0"
                                  >
                                    <Pencil className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteQuestion(question.id, section.id)
                                    }}
                                    className="hover:bg-destructive/10 hover:text-destructive h-7 w-7 p-0"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })
                    ) : (
                      <div className="text-center py-3 text-muted-foreground text-xs">
                        No questions yet
                      </div>
                    )}
                  </div>

                  {/* Add Section after */}
                  <div className="mt-3">
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
    </div>
  )
}
