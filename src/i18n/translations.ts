import type { ExplainLang } from '../utils/storage';

type Strings = {
  appTitle: string;
  subtitle: string;
  setupTitle: string;
  explainLangLabel: string;
  arabic: string;
  english: string;
  all: string;
  startQuiz: string;
  learnConversions: string;
  resumeQuiz: string;
  resumeHint: string;
  statsTitle: string;
  bestScore: string;
  attempts: string;
  clearCache: string;
  clearCacheConfirm: string;
  progressLabel: string;
  back: string;
  learnTab: string;
  practiceTab: string;
  startPractice: string;
  backToLearn: string;
  questionOf: (n: number, total: number) => string;
  round: (n: number) => string;
  correct: string;
  wrong: string;
  total: string;
  nextQuestion: string;
  showResults: string;
  restartPractice: string;
  feedbackCorrect: string;
  feedbackWrong: (answer: string) => string;
  solutionTitle: string;
  visualExplainTitle: string;
  resultsTitle: string;
  scoreOf: (correct: number, total: number) => string;
  newQuiz: string;
  conversion: string;
  trueFalse: string;
  mcq: string;
  solutionFallback: (answer: string) => string;
  reviewLesson: string;
};

const UI: Record<'ar' | 'en', Strings> = {
  ar: {
    appTitle: 'اختبار مادة الحاسوب',
    subtitle: 'تحضير الاختبار النهائي — ربيع 2026',
    setupTitle: 'كم سؤال تبي تحل؟',
    explainLangLabel: 'لغة الشرح والحلول',
    arabic: 'عربي',
    english: 'English',
    all: 'الكل',
    startQuiz: 'ابدأ الاختبار',
    learnConversions: 'تعلّم التحويلات (بدون حاسبة)',
    resumeQuiz: 'متابعة الاختبار السابق',
    resumeHint: 'في تقدم محفوظ — تقدر تكمل من حيث توقفت',
    statsTitle: 'إحصائياتك',
    bestScore: 'أفضل نتيجة',
    attempts: 'محاولات',
    clearCache: 'مسح البيانات المحفوظة',
    clearCacheConfirm: 'مسح كل التقدم والإحصائيات المحفوظة؟ ما تقدر ترجعها.',
    progressLabel: 'تقدم الاختبار',
    back: 'رجوع',
    learnTab: 'الشرح',
    practiceTab: 'تدريب',
    startPractice: 'ابدأ تدريب التحويلات',
    backToLearn: 'رجوع للشرح',
    questionOf: (n, total) => `سؤال ${n} من ${total}`,
    round: (n) => `(جولة ${n})`,
    correct: 'صح',
    wrong: 'غلط',
    total: 'إجمالي',
    nextQuestion: 'السؤال التالي',
    showResults: 'عرض النتيجة',
    restartPractice: 'إعادة التدريب',
    feedbackCorrect: 'صح! إجابة صحيحة',
    feedbackWrong: (a) => `غلط! الإجابة الصحيحة: ${a}`,
    solutionTitle: 'طريقة الحل (بدون حاسبة):',
    visualExplainTitle: 'شرح بصري — شوف الخطوات:',
    resultsTitle: 'النتيجة',
    scoreOf: (c, t) => `${c} من ${t} إجابة صحيحة`,
    newQuiz: 'اختبار جديد',
    conversion: 'تحويل',
    trueFalse: 'صح / خطأ',
    mcq: 'اختيار من متعدد',
    solutionFallback: (a) => `الإجابة الصحيحة: ${a}`,
    reviewLesson: 'راجع قسم الشرح للطريقة المناسبة.',
  },
  en: {
    appTitle: 'Computer Hardware Quiz',
    subtitle: 'Final Exam Preparation — Spring 2026',
    setupTitle: 'How many questions?',
    explainLangLabel: 'Explanation language',
    arabic: 'عربي',
    english: 'English',
    all: 'All',
    startQuiz: 'Start Quiz',
    learnConversions: 'Learn Conversions (no calculator)',
    resumeQuiz: 'Resume Previous Quiz',
    resumeHint: 'Saved progress — continue where you left off',
    statsTitle: 'Your Stats',
    bestScore: 'Best score',
    attempts: 'Attempts',
    clearCache: 'Clear saved data',
    clearCacheConfirm: 'Clear all saved progress and stats? This cannot be undone.',
    progressLabel: 'Quiz progress',
    back: 'Back',
    learnTab: 'Learn',
    practiceTab: 'Practice',
    startPractice: 'Start conversion practice',
    backToLearn: 'Back to lessons',
    questionOf: (n, total) => `Question ${n} of ${total}`,
    round: (n) => `(Round ${n})`,
    correct: 'Correct',
    wrong: 'Wrong',
    total: 'Total',
    nextQuestion: 'Next question',
    showResults: 'Show results',
    restartPractice: 'Restart practice',
    feedbackCorrect: 'Correct!',
    feedbackWrong: (a) => `Wrong! Correct answer: ${a}`,
    solutionTitle: 'Solution (no calculator):',
    visualExplainTitle: 'Visual walkthrough:',
    resultsTitle: 'Results',
    scoreOf: (c, t) => `${c} of ${t} correct`,
    newQuiz: 'New quiz',
    conversion: 'Conversion',
    trueFalse: 'True / False',
    mcq: 'MCQ',
    solutionFallback: (a) => `Correct answer: ${a}`,
    reviewLesson: 'Review the lesson section for the appropriate method.',
  },
};

export function getUiStrings(lang: ExplainLang): Strings {
  return UI[lang];
}

export function getGradeMessage(pct: number, lang: ExplainLang): string {
  if (lang === 'en') {
    if (pct >= 90) return 'Excellent! You are fully ready for the exam!';
    if (pct >= 80) return 'Very good! Review your mistakes and you are set.';
    if (pct >= 70) return 'Good! You need more review before the exam.';
    if (pct >= 60) return 'Passable, but study harder before tomorrow!';
    return 'You need stronger review. Keep practicing now!';
  }
  if (pct >= 90) return 'ممتاز! أنت جاهز للاختبار بشكل مثالي!';
  if (pct >= 80) return 'جيد جداً! راجع الأسئلة اللي غلطت فيها وأنت بخير';
  if (pct >= 70) return 'جيد! لازم تراجع أكثر قبل الاختبار';
  if (pct >= 60) return 'مقبول، بس الاختبار بكرا! راجع كل شي';
  return 'تحتاج مراجعة أقوى. ارجع وحل أسئلة أكثر الحين!';
}

export const LESSON_TAB_LABELS: Record<ExplainLang, Record<string, string>> = {
  ar: {
    basics: 'أساسيات',
    dec2bin: 'عشري → ثنائي',
    bin2dec: 'ثنائي → عشري',
    hex: 'سداسي عشري',
  },
  en: {
    basics: 'Basics',
    dec2bin: 'Decimal → Binary',
    bin2dec: 'Binary → Decimal',
    hex: 'Hexadecimal',
  },
};
