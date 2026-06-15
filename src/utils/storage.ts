import type { LessonId } from '../components/Lessons';

export type ExplainLang = 'ar' | 'en';

export type QuizProgress = {
  questions: string[];
  index: number;
  correct: number;
  wrong: number;
  startedAt: number;
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
  history: QuizHistoryEntry[];
};

const STORAGE_KEY = 'hardware-quiz-v2';

const DEFAULTS: AppSettings = {
  explainLang: 'ar',
  questionCount: 200,
  lastLessonTab: 'basics',
  quizProgress: null,
  history: [],
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
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
