// Mock data based on FLN English Class I Endline Test

export interface QuestionOption {
  id: string
  text: string
  is_correct: boolean
}

export interface Question {
  id: string
  text: string
  type: "mcq" | "audio" | "image" | "true_false" | "fill_blanks" | "match_columns" | "written" | "sequence" | "custom" | "word_reading" | "paragraph_reading" | "picture_writing"
  data: any
  question_options?: QuestionOption[]
}

export interface Section {
  id: string
  title: string
  order: number
  questions?: Question[]
}

export const mockSections: Section[] = [
  {
    id: "section-1",
    title: "I. Word Reading (Reading)",
    order: 0,
    questions: [
      {
        id: "q1",
        text: "Read the following words",
        type: "word_reading",
        data: {
          words: [
            ["Ammu", "banana", "elephant", "kite"],
            ["zoo", "jug", "doll", "lion"],
            ["green", "car", "house", "nest"],
            ["fish", "parrot", "rat", "tap"],
            ["nest", "monkey", "van", "kite"]
          ],
          instructions: "Read each word aloud clearly"
        }
      }
    ]
  },
  {
    id: "section-2",
    title: "II. Paragraph Reading (ORF)",
    order: 1,
    questions: [
      {
        id: "q2",
        text: "Read the paragraph",
        type: "paragraph_reading",
        data: {
          paragraph: "This is a zoo. There are many animals in the zoo. The giraffe is very tall. The elephant is big.",
          instructions: "Read the paragraph fluently and clearly",
          wordCount: 22
        }
      }
    ]
  },
  {
    id: "section-3",
    title: "III. Picture Writing (Writing)",
    order: 2,
    questions: [
      {
        id: "q3",
        text: "Write five words related to the picture",
        type: "picture_writing",
        data: {
          imageUrl: "/images/classroom-scene.jpg",
          numberOfWords: 5,
          instructions: "Look at the picture and write five words that describe what you see"
        }
      }
    ]
  }
]
