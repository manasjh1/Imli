import type { Language, Translations } from "./types"

export const translations: Record<Language, Translations> = {
  en: {
    // Common
    appName: "imli",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    
    // Auth
    auth: {
      login: "Login",
      register: "Register",
      logout: "Logout",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      qualification: "Qualification",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      loginButton: "Login",
      registerButton: "Register",
      loggingIn: "Logging in...",
      registering: "Registering...",
      qualifications: {
        intermediate: "Intermediate",
        graduate: "Graduate",
        postGraduate: "Post Graduate",
        diploma: "Diploma in Education (D.Ed)",
        bed: "Bachelor of Education (B.Ed)",
        med: "Master of Education (M.Ed)",
        other: "Other",
      },
    },
    
    // Verify
    verify: {
      title: "Verify Email",
      subtitle: "Enter the 6-digit code sent to your email",
      enterCode: "Enter verification code",
      verifyButton: "Verify",
      verifying: "Verifying...",
      resend: "Resend Code",
      resending: "Resending...",
      codeSent: "Code sent successfully",
      invalidCode: "Invalid verification code",
    },
    
    // Dashboard
    dashboard: {
      greeting: "Hi",
      startTest: "Start a Test",
      pastTests: "Past Tests",
    },
    
    // Test
    test: {
      selectClass: "Select Your Class",
      selectSubject: "Select Subject",
      startQuiz: "Start Quiz",
      class: "Class",
      subject: "Subject",
      classes: {
        class1: "Class 1",
        class2: "Class 2",
        class3: "Class 3",
        class4: "Class 4",
        class5: "Class 5",
      },
      subjects: {
        telugu: "Telugu",
        english: "English",
        mathematics: "Mathematics",
        urdu: "Urdu",
      },
    },
    
    // Quiz
    quiz: {
      question: "Question",
      of: "of",
      finish: "Finish",
      results: "Results",
      score: "Score",
      correct: "Correct",
      incorrect: "Incorrect",
      retakeQuiz: "Retake Quiz",
      backToDashboard: "Back to Dashboard",
      timeUp: "Time is up!",
      submitting: "Submitting...",
    },
    
    // History
    history: {
      title: "Test History",
      noTests: "No tests taken yet",
      date: "Date",
      score: "Score",
      viewDetails: "View Details",
    },
    
    // Language
    language: {
      select: "Select Language",
      english: "English",
      telugu: "Telugu",
      urdu: "Urdu",
    },
  },
  
  te: {
    // Common
    appName: "ఇమ్లి",
    loading: "లోడ్ అవుతోంది...",
    error: "లోపం",
    success: "విజయం",
    cancel: "రద్దు",
    save: "సేవ్",
    close: "మూసివేయి",
    back: "వెనుకకు",
    next: "తదుపరి",
    previous: "మునుపటి",
    submit: "సమర్పించు",
    
    // Auth
    auth: {
      login: "లాగిన్",
      register: "నమోదు",
      logout: "లాగౌట్",
      email: "ఇమెయిల్",
      password: "పాస్‌వర్డ్",
      confirmPassword: "పాస్‌వర్డ్ నిర్ధారించండి",
      fullName: "పూర్తి పేరు",
      phoneNumber: "ఫోన్ నంబర్",
      qualification: "అర్హత",
      forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
      noAccount: "ఖాతా లేదా?",
      hasAccount: "ఇప్పటికే ఖాతా ఉందా?",
      loginButton: "లాగిన్",
      registerButton: "నమోదు",
      loggingIn: "లాగిన్ అవుతోంది...",
      registering: "నమోదు అవుతోంది...",
      qualifications: {
        intermediate: "ఇంటర్మీడియట్",
        graduate: "గ్రాడ్యుయేట్",
        postGraduate: "పోస్ట్ గ్రాడ్యుయేట్",
        diploma: "డిప్లొమా ఇన్ ఎడ్యుకేషన్ (D.Ed)",
        bed: "బ్యాచిలర్ ఆఫ్ ఎడ్యుకేషన్ (B.Ed)",
        med: "మాస్టర్ ఆఫ్ ఎడ్యుకేషన్ (M.Ed)",
        other: "ఇతర",
      },
    },
    
    // Verify
    verify: {
      title: "ఇమెయిల్ ధృవీకరించండి",
      subtitle: "మీ ఇమెయిల్‌కు పంపిన 6 అంకెల కోడ్‌ను నమోదు చేయండి",
      enterCode: "ధృవీకరణ కోడ్ నమోదు చేయండి",
      verifyButton: "ధృవీకరించు",
      verifying: "ధృవీకరిస్తోంది...",
      resend: "మళ్ళీ పంపు",
      resending: "మళ్ళీ పంపుతోంది...",
      codeSent: "కోడ్ విజయవంతంగా పంపబడింది",
      invalidCode: "చెల్లని ధృవీకరణ కోడ్",
    },
    
    // Dashboard
    dashboard: {
      greeting: "నమస్కారం",
      startTest: "పరీక్ష ప్రారంభించు",
      pastTests: "గత పరీక్షలు",
    },
    
    // Test
    test: {
      selectClass: "మీ తరగతి ఎంచుకోండి",
      selectSubject: "విషయం ఎంచుకోండి",
      startQuiz: "క్విజ్ ప్రారంభించు",
      class: "తరగతి",
      subject: "విషయం",
      classes: {
        class1: "1వ తరగతి",
        class2: "2వ తరగతి",
        class3: "3వ తరగతి",
        class4: "4వ తరగతి",
        class5: "5వ తరగతి",
      },
      subjects: {
        telugu: "తెలుగు",
        english: "ఇంగ్లీష్",
        mathematics: "గణితం",
        urdu: "ఉర్దూ",
      },
    },
    
    // Quiz
    quiz: {
      question: "ప్రశ్న",
      of: "లో",
      finish: "ముగించు",
      results: "ఫలితాలు",
      score: "స్కోర్",
      correct: "సరైనవి",
      incorrect: "తప్పు",
      retakeQuiz: "మళ్ళీ క్విజ్ చేయి",
      backToDashboard: "డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళు",
      timeUp: "సమయం అయిపోయింది!",
      submitting: "సమర్పిస్తోంది...",
    },
    
    // History
    history: {
      title: "పరీక్ష చరిత్ర",
      noTests: "ఇంకా పరీక్షలు చేయలేదు",
      date: "తేదీ",
      score: "స్కోర్",
      viewDetails: "వివరాలు చూడండి",
    },
    
    // Language
    language: {
      select: "భాష ఎంచుకోండి",
      english: "ఇంగ్లీష్",
      telugu: "తెలుగు",
      urdu: "ఉర్దూ",
    },
  },
  
  ur: {
    // Common
    appName: "املی",
    loading: "لوڈ ہو رہا ہے...",
    error: "خرابی",
    success: "کامیابی",
    cancel: "منسوخ",
    save: "محفوظ کریں",
    close: "بند کریں",
    back: "واپس",
    next: "اگلا",
    previous: "پچھلا",
    submit: "جمع کرائیں",
    
    // Auth
    auth: {
      login: "لاگ ان",
      register: "رجسٹر",
      logout: "لاگ آؤٹ",
      email: "ای میل",
      password: "پاس ورڈ",
      confirmPassword: "پاس ورڈ کی تصدیق کریں",
      fullName: "پورا نام",
      phoneNumber: "فون نمبر",
      qualification: "تعلیمی قابلیت",
      forgotPassword: "پاس ورڈ بھول گئے؟",
      noAccount: "اکاؤنٹ نہیں ہے؟",
      hasAccount: "پہلے سے اکاؤنٹ ہے؟",
      loginButton: "لاگ ان",
      registerButton: "رجسٹر",
      loggingIn: "لاگ ان ہو رہا ہے...",
      registering: "رجسٹر ہو رہا ہے...",
      qualifications: {
        intermediate: "انٹرمیڈیٹ",
        graduate: "گریجویٹ",
        postGraduate: "پوسٹ گریجویٹ",
        diploma: "ڈپلومہ ان ایجوکیشن (D.Ed)",
        bed: "بیچلر آف ایجوکیشن (B.Ed)",
        med: "ماسٹر آف ایجوکیشن (M.Ed)",
        other: "دیگر",
      },
    },
    
    // Verify
    verify: {
      title: "ای میل کی تصدیق کریں",
      subtitle: "اپنے ای میل پر بھیجا گیا 6 ہندسوں کا کوڈ درج کریں",
      enterCode: "تصدیقی کوڈ درج کریں",
      verifyButton: "تصدیق کریں",
      verifying: "تصدیق ہو رہی ہے...",
      resend: "دوبارہ بھیجیں",
      resending: "دوبارہ بھیج رہا ہے...",
      codeSent: "کوڈ کامیابی سے بھیج دیا گیا",
      invalidCode: "غلط تصدیقی کوڈ",
    },
    
    // Dashboard
    dashboard: {
      greeting: "السلام علیکم",
      startTest: "امتحان شروع کریں",
      pastTests: "پچھلے امتحانات",
    },
    
    // Test
    test: {
      selectClass: "اپنی جماعت منتخب کریں",
      selectSubject: "مضمون منتخب کریں",
      startQuiz: "کوئز شروع کریں",
      class: "جماعت",
      subject: "مضمون",
      classes: {
        class1: "پہلی جماعت",
        class2: "دوسری جماعت",
        class3: "تیسری جماعت",
        class4: "چوتھی جماعت",
        class5: "پانچویں جماعت",
      },
      subjects: {
        telugu: "تلگو",
        english: "انگریزی",
        mathematics: "ریاضی",
        urdu: "اردو",
      },
    },
    
    // Quiz
    quiz: {
      question: "سوال",
      of: "میں سے",
      finish: "ختم کریں",
      results: "نتائج",
      score: "اسکور",
      correct: "درست",
      incorrect: "غلط",
      retakeQuiz: "دوبارہ کوئز لیں",
      backToDashboard: "ڈیش بورڈ پر واپس جائیں",
      timeUp: "وقت ختم!",
      submitting: "جمع ہو رہا ہے...",
    },
    
    // History
    history: {
      title: "امتحان کی تاریخ",
      noTests: "ابھی تک کوئی امتحان نہیں لیا",
      date: "تاریخ",
      score: "اسکور",
      viewDetails: "تفصیلات دیکھیں",
    },
    
    // Language
    language: {
      select: "زبان منتخب کریں",
      english: "انگریزی",
      telugu: "تلگو",
      urdu: "اردو",
    },
  },
}
