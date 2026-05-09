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
      tamil: "Tamil",
      urdu: "Urdu",
      continue: "Continue",
      welcomeBack: "Welcome",
    },
  },
  
  ta: {
    // Common
    appName: "இம்லி",
    loading: "ஏற்றுகிறது...",
    error: "பிழை",
    success: "வெற்றி",
    cancel: "ரத்து",
    save: "சேமி",
    close: "மூடு",
    back: "பின்",
    next: "அடுத்து",
    previous: "முந்தைய",
    submit: "சமர்ப்பி",
    
    // Auth
    auth: {
      login: "உள்நுழை",
      register: "பதிவு",
      logout: "வெளியேறு",
      email: "மின்னஞ்சல்",
      password: "கடவுச்சொல்",
      confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்து",
      fullName: "முழு பெயர்",
      phoneNumber: "தொலைபேசி எண்",
      qualification: "தகுதி",
      forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
      noAccount: "கணக்கு இல்லையா?",
      hasAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
      loginButton: "உள்நுழை",
      registerButton: "பதிவு செய்",
      loggingIn: "உள்நுழைகிறது...",
      registering: "பதிவு செய்கிறது...",
      qualifications: {
        intermediate: "இடைநிலை",
        graduate: "பட்டதாரி",
        postGraduate: "முதுநிலை பட்டதாரி",
        diploma: "கல்வியில் டிப்ளமோ (D.Ed)",
        bed: "கல்வியில் இளங்கலை (B.Ed)",
        med: "கல்வியில் முதுகலை (M.Ed)",
        other: "மற்றவை",
      },
    },
    
    // Verify
    verify: {
      title: "மின்னஞ்சலை சரிபார்க்கவும்",
      subtitle: "உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்ட 6 இலக்க குறியீட்டை உள்ளிடவும்",
      enterCode: "சரிபார்ப்பு குறியீட்டை உள்ளிடவும்",
      verifyButton: "சரிபார்",
      verifying: "சரிபார்க்கிறது...",
      resend: "மீண்டும் அனுப்பு",
      resending: "மீண்டும் அனுப்புகிறது...",
      codeSent: "குறியீடு வெற்றிகரமாக அனுப்பப்பட்டது",
      invalidCode: "தவறான சரிபார்ப்பு குறியீடு",
    },
    
    // Dashboard
    dashboard: {
      greeting: "வணக்கம்",
      startTest: "தேர்வு தொடங்கு",
      pastTests: "கடந்த தேர்வுகள்",
    },
    
    // Test
    test: {
      selectClass: "உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்",
      selectSubject: "பாடத்தைத் தேர்ந்தெடுக்கவும்",
      startQuiz: "வினாடி வினா தொடங்கு",
      class: "வகுப்பு",
      subject: "பாடம்",
      classes: {
        class1: "1ஆம் வகுப்பு",
        class2: "2ஆம் வகுப்பு",
        class3: "3ஆம் வகுப்பு",
        class4: "4ஆம் வகுப்பு",
        class5: "5ஆம் வகுப்பு",
      },
      subjects: {
        telugu: "தெலுங்கு",
        english: "ஆங்கிலம்",
        mathematics: "கணிதம்",
        urdu: "உருது",
      },
    },
    
    // Quiz
    quiz: {
      question: "கேள்வி",
      of: "இல்",
      finish: "முடி",
      results: "முடிவுகள்",
      score: "மதிப்பெண்",
      correct: "சரி",
      incorrect: "தவறு",
      retakeQuiz: "மீண்டும் வினாடி வினா",
      backToDashboard: "டாஷ்போர்டுக்குத் திரும்பு",
      timeUp: "நேரம் முடிந்தது!",
      submitting: "சமர்ப்பிக்கிறது...",
    },
    
    // History
    history: {
      title: "தேர்வு வரலாறு",
      noTests: "இதுவரை தேர்வுகள் எடுக்கப்படவில்லை",
      date: "தேதி",
      score: "மதிப்பெண்",
      viewDetails: "விவரங்களைக் காண்க",
    },
    
    // Language
    language: {
      select: "மொழியைத் தேர்ந்தெடுக்கவும்",
      english: "ஆங்கிலம்",
      tamil: "தமிழ்",
      urdu: "உருது",
      continue: "தொடரவும்",
      welcomeBack: "வணக்கம்",
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
      tamil: "تامل",
      urdu: "اردو",
      continue: "جاری رکھیں",
      welcomeBack: "خوش آمدید",
    },
  },
}
