export type Language = "en" | "ta" | "ur"

export interface LanguageConfig {
  code: Language
  name: string
  nativeName: string
  dir: "ltr" | "rtl"
}

export const LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
  },
  ta: {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    dir: "ltr",
  },
  ur: {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    dir: "rtl",
  },
}

export interface Translations {
  // Common
  appName: string
  loading: string
  error: string
  success: string
  cancel: string
  save: string
  close: string
  back: string
  next: string
  previous: string
  submit: string
  
  // Auth
  auth: {
    login: string
    register: string
    logout: string
    email: string
    password: string
    confirmPassword: string
    fullName: string
    phoneNumber: string
    qualification: string
    forgotPassword: string
    noAccount: string
    hasAccount: string
    loginButton: string
    registerButton: string
    loggingIn: string
    registering: string
    qualifications: {
      intermediate: string
      graduate: string
      postGraduate: string
      diploma: string
      bed: string
      med: string
      other: string
    }
  }
  
  // Verify
  verify: {
    title: string
    subtitle: string
    enterCode: string
    verifyButton: string
    verifying: string
    resend: string
    resending: string
    codeSent: string
    invalidCode: string
  }
  
  // Dashboard
  dashboard: {
    greeting: string
    startTest: string
    pastTests: string
  }
  
  // Test
  test: {
    selectClass: string
    selectSubject: string
    startQuiz: string
    class: string
    subject: string
    classes: {
      class1: string
      class2: string
      class3: string
      class4: string
      class5: string
    }
    subjects: {
      telugu: string
      english: string
      mathematics: string
      urdu: string
    }
  }
  
  // Quiz
  quiz: {
    question: string
    of: string
    finish: string
    results: string
    score: string
    correct: string
    incorrect: string
    retakeQuiz: string
    backToDashboard: string
    timeUp: string
    submitting: string
  }
  
  // History
  history: {
    title: string
    noTests: string
    date: string
    score: string
    viewDetails: string
  }
  
  // Language
  language: {
    select: string
    english: string
    tamil: string
    urdu: string
    continue: string
    welcomeBack: string
  }
}
