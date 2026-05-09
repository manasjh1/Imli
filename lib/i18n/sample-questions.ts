// Sample questions from the FLN Endline Test PDFs
// Each question has text in English, Tamil, and Urdu

export interface MultilingualQuestion {
  id: string
  classId: string
  subject: "english" | "telugu" | "mathematics" | "urdu"
  text: string
  text_ta: string
  text_ur: string
  options: {
    id: string
    text: string
    text_ta: string
    text_ur: string
    is_correct: boolean
  }[]
}

export const sampleQuestions: MultilingualQuestion[] = [
  // Class 1 - Mathematics
  {
    id: "c1-math-1",
    classId: "class-1",
    subject: "mathematics",
    text: "What number comes between 65 and 67?",
    text_ta: "65 మరియు 67 మధ్య ఏ సంఖ్య వస్తుంది?",
    text_ur: "65 اور 67 کے درمیان کون سا نمبر آتا ہے؟",
    options: [
      { id: "c1-m1-a", text: "64", text_ta: "64", text_ur: "64", is_correct: false },
      { id: "c1-m1-b", text: "66", text_ta: "66", text_ur: "66", is_correct: true },
      { id: "c1-m1-c", text: "68", text_ta: "68", text_ur: "68", is_correct: false },
      { id: "c1-m1-d", text: "63", text_ta: "63", text_ur: "63", is_correct: false },
    ],
  },
  {
    id: "c1-math-2",
    classId: "class-1",
    subject: "mathematics",
    text: "Identify the largest number: 48, 84",
    text_ta: "పెద్ద సంఖ్యను గుర్తించండి: 48, 84",
    text_ur: "سب سے بڑا نمبر پہچانیں: 48، 84",
    options: [
      { id: "c1-m2-a", text: "48", text_ta: "48", text_ur: "48", is_correct: false },
      { id: "c1-m2-b", text: "84", text_ta: "84", text_ur: "84", is_correct: true },
    ],
  },
  {
    id: "c1-math-3",
    classId: "class-1",
    subject: "mathematics",
    text: "How much is 30 greater than 10?",
    text_ta: "10 కంటే 30 ఎంత ఎక్కువ?",
    text_ur: "30، 10 سے کتنا زیادہ ہے؟",
    options: [
      { id: "c1-m3-a", text: "10", text_ta: "10", text_ur: "10", is_correct: false },
      { id: "c1-m3-b", text: "20", text_ta: "20", text_ur: "20", is_correct: true },
      { id: "c1-m3-c", text: "30", text_ta: "30", text_ur: "30", is_correct: false },
      { id: "c1-m3-d", text: "40", text_ta: "40", text_ur: "40", is_correct: false },
    ],
  },
  {
    id: "c1-math-4",
    classId: "class-1",
    subject: "mathematics",
    text: "10 + 7 = ?",
    text_ta: "10 + 7 = ?",
    text_ur: "10 + 7 = ?",
    options: [
      { id: "c1-m4-a", text: "15", text_ta: "15", text_ur: "15", is_correct: false },
      { id: "c1-m4-b", text: "16", text_ta: "16", text_ur: "16", is_correct: false },
      { id: "c1-m4-c", text: "17", text_ta: "17", text_ur: "17", is_correct: true },
      { id: "c1-m4-d", text: "18", text_ta: "18", text_ur: "18", is_correct: false },
    ],
  },
  {
    id: "c1-math-5",
    classId: "class-1",
    subject: "mathematics",
    text: "15 - 3 = ?",
    text_ta: "15 - 3 = ?",
    text_ur: "15 - 3 = ?",
    options: [
      { id: "c1-m5-a", text: "10", text_ta: "10", text_ur: "10", is_correct: false },
      { id: "c1-m5-b", text: "11", text_ta: "11", text_ur: "11", is_correct: false },
      { id: "c1-m5-c", text: "12", text_ta: "12", text_ur: "12", is_correct: true },
      { id: "c1-m5-d", text: "13", text_ta: "13", text_ur: "13", is_correct: false },
    ],
  },

  // Class 2 - Mathematics
  {
    id: "c2-math-1",
    classId: "class-2",
    subject: "mathematics",
    text: "Identify the largest number: 87, 97",
    text_ta: "పెద్ద సంఖ్యను గుర్తించండి: 87, 97",
    text_ur: "سب سے بڑا نمبر پہچانیں: 87، 97",
    options: [
      { id: "c2-m1-a", text: "87", text_ta: "87", text_ur: "87", is_correct: false },
      { id: "c2-m1-b", text: "97", text_ta: "97", text_ur: "97", is_correct: true },
    ],
  },
  {
    id: "c2-math-2",
    classId: "class-2",
    subject: "mathematics",
    text: "How much is 25 greater than 5?",
    text_ta: "5 కంటే 25 ఎంత ఎక్కువ?",
    text_ur: "25، 5 سے کتنا زیادہ ہے؟",
    options: [
      { id: "c2-m2-a", text: "15", text_ta: "15", text_ur: "15", is_correct: false },
      { id: "c2-m2-b", text: "20", text_ta: "20", text_ur: "20", is_correct: true },
      { id: "c2-m2-c", text: "25", text_ta: "25", text_ur: "25", is_correct: false },
      { id: "c2-m2-d", text: "30", text_ta: "30", text_ur: "30", is_correct: false },
    ],
  },
  {
    id: "c2-math-3",
    classId: "class-2",
    subject: "mathematics",
    text: "47 + 12 = ?",
    text_ta: "47 + 12 = ?",
    text_ur: "47 + 12 = ?",
    options: [
      { id: "c2-m3-a", text: "57", text_ta: "57", text_ur: "57", is_correct: false },
      { id: "c2-m3-b", text: "58", text_ta: "58", text_ur: "58", is_correct: false },
      { id: "c2-m3-c", text: "59", text_ta: "59", text_ur: "59", is_correct: true },
      { id: "c2-m3-d", text: "60", text_ta: "60", text_ur: "60", is_correct: false },
    ],
  },
  {
    id: "c2-math-4",
    classId: "class-2",
    subject: "mathematics",
    text: "87 - 74 = ?",
    text_ta: "87 - 74 = ?",
    text_ur: "87 - 74 = ?",
    options: [
      { id: "c2-m4-a", text: "11", text_ta: "11", text_ur: "11", is_correct: false },
      { id: "c2-m4-b", text: "12", text_ta: "12", text_ur: "12", is_correct: false },
      { id: "c2-m4-c", text: "13", text_ta: "13", text_ur: "13", is_correct: true },
      { id: "c2-m4-d", text: "14", text_ta: "14", text_ur: "14", is_correct: false },
    ],
  },

  // Class 3 - Mathematics
  {
    id: "c3-math-1",
    classId: "class-3",
    subject: "mathematics",
    text: "87 + 56 = ?",
    text_ta: "87 + 56 = ?",
    text_ur: "87 + 56 = ?",
    options: [
      { id: "c3-m1-a", text: "141", text_ta: "141", text_ur: "141", is_correct: false },
      { id: "c3-m1-b", text: "142", text_ta: "142", text_ur: "142", is_correct: false },
      { id: "c3-m1-c", text: "143", text_ta: "143", text_ur: "143", is_correct: true },
      { id: "c3-m1-d", text: "144", text_ta: "144", text_ur: "144", is_correct: false },
    ],
  },
  {
    id: "c3-math-2",
    classId: "class-3",
    subject: "mathematics",
    text: "9 x 8 = ?",
    text_ta: "9 x 8 = ?",
    text_ur: "9 x 8 = ?",
    options: [
      { id: "c3-m2-a", text: "70", text_ta: "70", text_ur: "70", is_correct: false },
      { id: "c3-m2-b", text: "71", text_ta: "71", text_ur: "71", is_correct: false },
      { id: "c3-m2-c", text: "72", text_ta: "72", text_ur: "72", is_correct: true },
      { id: "c3-m2-d", text: "73", text_ta: "73", text_ur: "73", is_correct: false },
    ],
  },
  {
    id: "c3-math-3",
    classId: "class-3",
    subject: "mathematics",
    text: "72 ÷ 9 = ?",
    text_ta: "72 ÷ 9 = ?",
    text_ur: "72 ÷ 9 = ?",
    options: [
      { id: "c3-m3-a", text: "7", text_ta: "7", text_ur: "7", is_correct: false },
      { id: "c3-m3-b", text: "8", text_ta: "8", text_ur: "8", is_correct: true },
      { id: "c3-m3-c", text: "9", text_ta: "9", text_ur: "9", is_correct: false },
      { id: "c3-m3-d", text: "10", text_ta: "10", text_ur: "10", is_correct: false },
    ],
  },
  {
    id: "c3-math-4",
    classId: "class-3",
    subject: "mathematics",
    text: "There are 353 pencils and 259 pens in a stationery shop. What is the total?",
    text_ta: "స్టేషనరీ షాప్‌లో 353 పెన్సిల్స్ మరియు 259 పెన్నులు ఉన్నాయి. మొత్తం ఎంత?",
    text_ur: "اسٹیشنری کی دکان میں 353 پنسلیں اور 259 قلم ہیں۔ کل کتنے ہیں؟",
    options: [
      { id: "c3-m4-a", text: "610", text_ta: "610", text_ur: "610", is_correct: false },
      { id: "c3-m4-b", text: "611", text_ta: "611", text_ur: "611", is_correct: false },
      { id: "c3-m4-c", text: "612", text_ta: "612", text_ur: "612", is_correct: true },
      { id: "c3-m4-d", text: "613", text_ta: "613", text_ur: "613", is_correct: false },
    ],
  },

  // Class 3 - English Reading Comprehension
  {
    id: "c3-eng-1",
    classId: "class-3",
    subject: "english",
    text: "In the story, who found a grain of wheat?",
    text_ta: "కథలో, గోధుమ గింజను ఎవరు కనుగొన్నారు?",
    text_ur: "کہانی میں، گیہوں کا دانہ کس نے پایا؟",
    options: [
      { id: "c3-e1-a", text: "The duck", text_ta: "బాతు", text_ur: "بطخ", is_correct: false },
      { id: "c3-e1-b", text: "The little red hen", text_ta: "చిన్న ఎర్ర కోడి", text_ur: "چھوٹی لال مرغی", is_correct: true },
      { id: "c3-e1-c", text: "The pig", text_ta: "పంది", text_ur: "سور", is_correct: false },
      { id: "c3-e1-d", text: "The cat", text_ta: "పిల్లి", text_ur: "بلی", is_correct: false },
    ],
  },
  {
    id: "c3-eng-2",
    classId: "class-3",
    subject: "english",
    text: "What did the pig grunt?",
    text_ta: "పంది ఏమి అంది?",
    text_ur: "سور نے کیا کہا؟",
    options: [
      { id: "c3-e2-a", text: "Yes I will", text_ta: "అవును నేను చేస్తాను", text_ur: "ہاں میں کروں گا", is_correct: false },
      { id: "c3-e2-b", text: "Not I", text_ta: "నేను కాదు", text_ur: "میں نہیں", is_correct: true },
      { id: "c3-e2-c", text: "Maybe", text_ta: "బహుశా", text_ur: "شاید", is_correct: false },
      { id: "c3-e2-d", text: "Let me think", text_ta: "నన్ను ఆలోచించనివ్వు", text_ur: "مجھے سوچنے دو", is_correct: false },
    ],
  },

  // Class 4 - Mathematics
  {
    id: "c4-math-1",
    classId: "class-4",
    subject: "mathematics",
    text: "97 + 84 = ?",
    text_ta: "97 + 84 = ?",
    text_ur: "97 + 84 = ?",
    options: [
      { id: "c4-m1-a", text: "179", text_ta: "179", text_ur: "179", is_correct: false },
      { id: "c4-m1-b", text: "180", text_ta: "180", text_ur: "180", is_correct: false },
      { id: "c4-m1-c", text: "181", text_ta: "181", text_ur: "181", is_correct: true },
      { id: "c4-m1-d", text: "182", text_ta: "182", text_ur: "182", is_correct: false },
    ],
  },
  {
    id: "c4-math-2",
    classId: "class-4",
    subject: "mathematics",
    text: "In a cricket match, a team scored 176 runs in the first innings and 138 runs in the second innings. What is the total score?",
    text_ta: "క్రికెట్ మ్యాచ్‌లో, ఒక జట్టు మొదటి ఇన్నింగ్స్‌లో 176 పరుగులు మరియు రెండవ ఇన్నింగ్స్‌లో 138 పరుగులు చేసింది. మొత్తం స్కోర్ ఎంత?",
    text_ur: "ایک کرکٹ میچ میں، ایک ٹیم نے پہلی اننگز میں 176 رنز اور دوسری اننگز میں 138 رنز بنائے۔ کل سکور کیا ہے؟",
    options: [
      { id: "c4-m2-a", text: "312", text_ta: "312", text_ur: "312", is_correct: false },
      { id: "c4-m2-b", text: "313", text_ta: "313", text_ur: "313", is_correct: false },
      { id: "c4-m2-c", text: "314", text_ta: "314", text_ur: "314", is_correct: true },
      { id: "c4-m2-d", text: "315", text_ta: "315", text_ur: "315", is_correct: false },
    ],
  },
  {
    id: "c4-math-3",
    classId: "class-4",
    subject: "mathematics",
    text: "86 x 7 = ?",
    text_ta: "86 x 7 = ?",
    text_ur: "86 x 7 = ?",
    options: [
      { id: "c4-m3-a", text: "600", text_ta: "600", text_ur: "600", is_correct: false },
      { id: "c4-m3-b", text: "601", text_ta: "601", text_ur: "601", is_correct: false },
      { id: "c4-m3-c", text: "602", text_ta: "602", text_ur: "602", is_correct: true },
      { id: "c4-m3-d", text: "603", text_ta: "603", text_ur: "603", is_correct: false },
    ],
  },
  {
    id: "c4-math-4",
    classId: "class-4",
    subject: "mathematics",
    text: "858 ÷ 6 = ?",
    text_ta: "858 ÷ 6 = ?",
    text_ur: "858 ÷ 6 = ?",
    options: [
      { id: "c4-m4-a", text: "141", text_ta: "141", text_ur: "141", is_correct: false },
      { id: "c4-m4-b", text: "142", text_ta: "142", text_ur: "142", is_correct: false },
      { id: "c4-m4-c", text: "143", text_ta: "143", text_ur: "143", is_correct: true },
      { id: "c4-m4-d", text: "144", text_ta: "144", text_ur: "144", is_correct: false },
    ],
  },

  // Class 4 - English Reading Comprehension
  {
    id: "c4-eng-1",
    classId: "class-4",
    subject: "english",
    text: "Where was Akbar going?",
    text_ta: "అక్బర్ ఎక్కడికి వెళ్తున్నాడు?",
    text_ur: "اکبر کہاں جا رہا تھا؟",
    options: [
      { id: "c4-e1-a", text: "To the garden", text_ta: "తోటకు", text_ur: "باغ میں", is_correct: false },
      { id: "c4-e1-b", text: "To the dining room", text_ta: "భోజన గదికి", text_ur: "کھانے کے کمرے میں", is_correct: true },
      { id: "c4-e1-c", text: "To the market", text_ta: "మార్కెట్‌కు", text_ur: "بازار میں", is_correct: false },
      { id: "c4-e1-d", text: "To the palace", text_ta: "రాజభవనానికి", text_ur: "محل میں", is_correct: false },
    ],
  },
  {
    id: "c4-eng-2",
    classId: "class-4",
    subject: "english",
    text: "How was the queen?",
    text_ta: "రాణి ఎలా ఉంది?",
    text_ur: "ملکہ کیسی تھی؟",
    options: [
      { id: "c4-e2-a", text: "Happy", text_ta: "సంతోషంగా", text_ur: "خوش", is_correct: false },
      { id: "c4-e2-b", text: "Ill", text_ta: "అనారోగ్యంగా", text_ur: "بیمار", is_correct: true },
      { id: "c4-e2-c", text: "Angry", text_ta: "కోపంగా", text_ur: "ناراض", is_correct: false },
      { id: "c4-e2-d", text: "Busy", text_ta: "బిజీగా", text_ur: "مصروف", is_correct: false },
    ],
  },

  // Class 5 - Mathematics
  {
    id: "c5-math-1",
    classId: "class-5",
    subject: "mathematics",
    text: "823 + 76 = ?",
    text_ta: "823 + 76 = ?",
    text_ur: "823 + 76 = ?",
    options: [
      { id: "c5-m1-a", text: "897", text_ta: "897", text_ur: "897", is_correct: false },
      { id: "c5-m1-b", text: "898", text_ta: "898", text_ur: "898", is_correct: false },
      { id: "c5-m1-c", text: "899", text_ta: "899", text_ur: "899", is_correct: true },
      { id: "c5-m1-d", text: "900", text_ta: "900", text_ur: "900", is_correct: false },
    ],
  },
  {
    id: "c5-math-2",
    classId: "class-5",
    subject: "mathematics",
    text: "328 x 6 = ?",
    text_ta: "328 x 6 = ?",
    text_ur: "328 x 6 = ?",
    options: [
      { id: "c5-m2-a", text: "1966", text_ta: "1966", text_ur: "1966", is_correct: false },
      { id: "c5-m2-b", text: "1967", text_ta: "1967", text_ur: "1967", is_correct: false },
      { id: "c5-m2-c", text: "1968", text_ta: "1968", text_ur: "1968", is_correct: true },
      { id: "c5-m2-d", text: "1969", text_ta: "1969", text_ur: "1969", is_correct: false },
    ],
  },
  {
    id: "c5-math-3",
    classId: "class-5",
    subject: "mathematics",
    text: "987 ÷ 14 = ? (nearest whole number)",
    text_ta: "987 ÷ 14 = ? (సమీప పూర్ణాంకం)",
    text_ur: "987 ÷ 14 = ؟ (قریب ترین مکمل عدد)",
    options: [
      { id: "c5-m3-a", text: "70", text_ta: "70", text_ur: "70", is_correct: true },
      { id: "c5-m3-b", text: "71", text_ta: "71", text_ur: "71", is_correct: false },
      { id: "c5-m3-c", text: "72", text_ta: "72", text_ur: "72", is_correct: false },
      { id: "c5-m3-d", text: "73", text_ta: "73", text_ur: "73", is_correct: false },
    ],
  },

  // Class 5 - English Reading Comprehension
  {
    id: "c5-eng-1",
    classId: "class-5",
    subject: "english",
    text: "Where was the poor traveller walking?",
    text_ta: "పేద యాత్రికుడు ఎక్కడ నడుస్తున్నాడు?",
    text_ur: "غریب مسافر کہاں چل رہا تھا؟",
    options: [
      { id: "c5-e1-a", text: "Through the forest", text_ta: "అడవిలో", text_ur: "جنگل میں", is_correct: false },
      { id: "c5-e1-b", text: "Through the streets of Ak-Shehir", text_ta: "అక్-షెహిర్ వీధుల్లో", text_ur: "اک شہیر کی گلیوں میں", is_correct: true },
      { id: "c5-e1-c", text: "By the river", text_ta: "నది పక్కన", text_ur: "دریا کے کنارے", is_correct: false },
      { id: "c5-e1-d", text: "On the mountain", text_ta: "కొండపై", text_ur: "پہاڑ پر", is_correct: false },
    ],
  },
  {
    id: "c5-eng-2",
    classId: "class-5",
    subject: "english",
    text: "What was the only food the traveller had in his pocket?",
    text_ta: "యాత్రికుడి జేబులో ఉన్న ఏకైక ఆహారం ఏమిటి?",
    text_ur: "مسافر کی جیب میں واحد کھانا کیا تھا؟",
    options: [
      { id: "c5-e2-a", text: "A piece of dry bread", text_ta: "ఒక ఎండిన రొట్టె ముక్క", text_ur: "خشک روٹی کا ایک ٹکڑا", is_correct: true },
      { id: "c5-e2-b", text: "Some fruits", text_ta: "కొన్ని పండ్లు", text_ur: "کچھ پھل", is_correct: false },
      { id: "c5-e2-c", text: "A sandwich", text_ta: "ఒక శాండ్‌విచ్", text_ur: "ایک سینڈوچ", is_correct: false },
      { id: "c5-e2-d", text: "Nothing", text_ta: "ఏమీ లేదు", text_ur: "کچھ نہیں", is_correct: false },
    ],
  },
]
