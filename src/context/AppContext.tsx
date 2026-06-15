import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { LessonId } from '../components/Lessons';
import { getUiStrings } from '../i18n/translations';
import {
  addHistoryEntry,
  clearQuizProgress,
  loadSettings,
  mergeReviewQueue,
  saveSettings,
  updateReviewQueueAfterReview,
  type AppSettings,
  type ExplainLang,
  type QuizProgress,
} from '../utils/storage';

type AppContextValue = {
  settings: AppSettings;
  ui: ReturnType<typeof getUiStrings>;
  setExplainLang: (lang: ExplainLang) => void;
  setQuestionCount: (n: number) => void;
  setLastLessonTab: (id: LessonId) => void;
  saveProgress: (progress: QuizProgress | null) => void;
  recordResult: (correct: number, wrong: number, total: number) => void;
  addToReviewQueue: (wrongKeys: string[]) => void;
  updateReviewQueue: (sessionCorrect: string[]) => void;
  resetCache: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());

  const persist = useCallback((partial: Partial<AppSettings>) => {
    saveSettings(partial);
    setSettings(loadSettings());
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      settings,
      ui: getUiStrings(settings.explainLang),
      setExplainLang: (lang) => persist({ explainLang: lang }),
      setQuestionCount: (n) => persist({ questionCount: n }),
      setLastLessonTab: (id) => persist({ lastLessonTab: id }),
      saveProgress: (progress) => persist({ quizProgress: progress }),
      recordResult: (correct, wrong, total) => {
        const pct = Math.round((correct / total) * 100);
        addHistoryEntry({ correct, wrong, total, pct });
        persist({ quizProgress: null });
      },
      addToReviewQueue: (wrongKeys) => {
        if (wrongKeys.length === 0) return;
        persist({ reviewQueue: mergeReviewQueue(settings.reviewQueue, wrongKeys) });
      },
      updateReviewQueue: (sessionCorrect) => {
        persist({
          reviewQueue: updateReviewQueueAfterReview(settings.reviewQueue, sessionCorrect),
          quizProgress: null,
        });
      },
      resetCache: () => {
        localStorage.removeItem('hardware-quiz-v2');
        setSettings({ ...loadSettings() });
      },
    }),
    [settings, persist],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export { clearQuizProgress };
