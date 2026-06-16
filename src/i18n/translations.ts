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
  reviewWrong: string;
  reviewWrongHint: (n: number) => string;
  resumeReview: string;
  resumeReviewHint: string;
  reviewProgressLabel: string;
  reviewRound: string;
  reviewResultsTitle: string;
  reviewMastered: (n: number) => string;
  reviewRemaining: (n: number) => string;
  reviewAllDone: string;
  pendingReview: (n: number) => string;
  reviewLesson: string;
  openSource: string;
  openSourceAria: string;
  expectedQuestions: string;
  expectedQuestionsTitle: string;
  expectedQuestionsIntro: string;
  expectedQuestionsTip: string;
  expectedQuestionsFooter: string;
  memorizeTitle: string;
  startExpectedQuiz: string;
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
    reviewWrong: 'راجع الأسئلة اللي غلطت فيها',
    reviewWrongHint: (n) => `${n} سؤال يحتاج مراجعة`,
    resumeReview: 'متابعة مراجعة الأخطاء',
    resumeReviewHint: 'في مراجعة محفوظة — تقدر تكمل من حيث توقفت',
    reviewProgressLabel: 'تقدم المراجعة',
    reviewRound: '(مراجعة)',
    reviewResultsTitle: 'نتيجة المراجعة',
    reviewMastered: (n) => `أتقنت ${n} سؤال من هذه الجولة`,
    reviewRemaining: (n) => `${n} سؤال باقي للمراجعة`,
    reviewAllDone: 'ممتاز! ما في أسئلة باقية للمراجعة',
    pendingReview: (n) => `${n} سؤال محفوظ للمراجعة`,
    openSource: 'مفتوح المصدر',
    openSourceAria: 'عرض المشروع على GitHub',
    expectedQuestions: 'الأسئلة المتوقعة',
    expectedQuestionsTitle: '50 سؤال متوقع للتدريب',
    expectedQuestionsIntro: 'اختبار تدريبي من الأسئلة المتوقعة — اختيار من متعدد مثل الاختبار الحقيقي.',
    expectedQuestionsTip:
      'أسلوب المعلم واضح: يكرر نفس الفكرة لكن يغير الرقم أو المصطلح. ركّز على التحويلات + الاختصارات + وظيفة كل قطعة.',
    expectedQuestionsFooter:
      'التحويلات والاختصارات والمكونات تكررت كثير — راح تغطي نسبة كبيرة من الاختبار.',
    memorizeTitle: 'أهم 10 تحفظهم حرفيًا',
    startExpectedQuiz: 'ابدأ الاختبار المتوقع',
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
    reviewWrong: 'Review wrong answers',
    reviewWrongHint: (n) => `${n} question${n === 1 ? '' : 's'} to review`,
    resumeReview: 'Resume error review',
    resumeReviewHint: 'Saved review — continue where you left off',
    reviewProgressLabel: 'Review progress',
    reviewRound: '(Review)',
    reviewResultsTitle: 'Review results',
    reviewMastered: (n) => `Mastered ${n} question${n === 1 ? '' : 's'} this round`,
    reviewRemaining: (n) => `${n} question${n === 1 ? '' : 's'} left to review`,
    reviewAllDone: 'Great! No questions left to review',
    pendingReview: (n) => `${n} saved for review`,
    openSource: 'Open Source',
    openSourceAria: 'View project on GitHub',
    expectedQuestions: 'Expected Questions',
    expectedQuestionsTitle: '50 Expected Practice Questions',
    expectedQuestionsIntro: 'Practice quiz from expected questions — multiple choice, just like the real exam.',
    expectedQuestionsTip:
      'The teacher repeats the same idea but changes the number or term. Focus on conversions, abbreviations, and what each component does.',
    expectedQuestionsFooter:
      'Conversions, abbreviations, and components appear often — they cover a large part of the exam.',
    memorizeTitle: 'Top 10 to memorize exactly',
    startExpectedQuiz: 'Start expected quiz',
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
