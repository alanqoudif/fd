import type { LessonId } from '../components/Lessons';

export type ExplainLang = 'ar' | 'en';

export type QuizMode = 'quiz' | 'review';

export type QuizProgress = {
  mode: QuizMode;
  questions: string[];
  index: number;
  correct: number;
  wrong: number;
  startedAt: number;
  sessionCorrect: string[];
  sessionWrong: string[];
};

export type QuizHistoryEntry = {
  date: string;
  correct: number;
  wrong: number;
  total: number;
  pct: number;
};

export type AppSettings = {
  explainLang: ExplainLang;
  questionCount: number;
  lastLessonTab: LessonId;
  quizProgress: QuizProgress | null;
  reviewQueue: string[];
  expectedReviewQueue: string[];
  history: QuizHistoryEntry[];
};

const STORAGE_KEY = 'hardware-quiz-v2';

const DEFAULTS: AppSettings = {
  explainLang: 'ar',
  questionCount: 200,
  lastLessonTab: 'basics',
  quizProgress: null,
  reviewQueue: [],
  expectedReviewQueue: [],
  history: [],
};

function normalizeProgress(raw: QuizProgress | null | undefined): QuizProgress | null {
  if (!raw) return null;
  return {
    ...raw,
    mode: raw.mode ?? 'quiz',
    sessionCorrect: raw.sessionCorrect ?? [],
    sessionWrong: raw.sessionWrong ?? [],
  };
}

function normalizeSettings(parsed: Partial<AppSettings>): AppSettings {
  return {
    ...DEFAULTS,
    ...parsed,
    quizProgress: normalizeProgress(parsed.quizProgress),
    reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue : [],
    expectedReviewQueue: Array.isArray(parsed.expectedReviewQueue) ? parsed.expectedReviewQueue : [],
  };
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    return normalizeSettings(JSON.parse(raw));
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveSettings(partial: Partial<AppSettings>) {
  const current = loadSettings();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...partial }));
}

export function clearQuizProgress() {
  saveSettings({ quizProgress: null });
}

export function addHistoryEntry(entry: Omit<QuizHistoryEntry, 'date'>) {
  const settings = loadSettings();
  const history = [
    { ...entry, date: new Date().toISOString() },
    ...settings.history,
  ].slice(0, 20);
  saveSettings({ history });
}

export function mergeReviewQueue(existing: string[], wrongKeys: string[]): string[] {
  const set = new Set(existing);
  for (const key of wrongKeys) set.add(key);
  return [...set];
}

export function updateReviewQueueAfterReview(
  queue: string[],
  sessionCorrect: string[],
): string[] {
  const correctSet = new Set(sessionCorrect);
  return queue.filter((key) => !correctSet.has(key));
}
