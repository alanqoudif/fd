import { useCallback, useState } from 'react';
import { ALL_QUESTIONS } from '@/data/questions';
import type { McqQuestion } from '@/data/questions';
import { shuffle } from '@/utils/shuffle';
import { Header } from '@/components/Header';
import { SetupScreen } from '@/components/SetupScreen';
import { QuizScreen } from '@/components/QuizScreen';
import { ResultsScreen } from '@/components/ResultsScreen';
import { ConvertSection } from '@/components/ConvertSection';
import { AppProvider, useApp } from '@/context/AppContext';
import type { QuizMode, QuizProgress } from '@/utils/storage';
import { mergeReviewQueue, updateReviewQueueAfterReview } from '@/utils/storage';

type Screen = 'setup' | 'quiz' | 'results' | 'convert';

function questionKey(q: McqQuestion) {
  return q.q;
}

function resolveQuestions(keys: string[]): McqQuestion[] {
  const map = new Map(ALL_QUESTIONS.map((q) => [q.q, q]));
  return keys.map((k) => map.get(k)).filter((q): q is McqQuestion => !!q);
}

function AppInner() {
  const { settings, saveProgress, recordResult, addToReviewQueue, updateReviewQueue } = useApp();
  const [screen, setScreen] = useState<Screen>('setup');
  const [selectedCount, setSelectedCount] = useState(settings.questionCount);
  const [quizKey, setQuizKey] = useState(0);
  const [quizMode, setQuizMode] = useState<QuizMode>('quiz');
  const [resumeState, setResumeState] = useState<{
    index: number;
    correct: number;
    wrong: number;
    sessionCorrect: string[];
    sessionWrong: string[];
  } | null>(null);
  const [results, setResults] = useState({
    correct: 0,
    wrong: 0,
    total: 0,
    isReview: false,
    reviewRemaining: 0,
  });
  const [activeQuestions, setActiveQuestions] = useState<McqQuestion[]>([]);
  const [pendingReviewKeys, setPendingReviewKeys] = useState<string[]>([]);

  function startQuiz() {
    setResumeState(null);
    setQuizMode('quiz');
    const questions = shuffle([...ALL_QUESTIONS]).slice(0, selectedCount);
    setActiveQuestions(questions);
    setQuizKey((k) => k + 1);
    setScreen('quiz');
  }

  function startReview(keys: string[]) {
    const questions = resolveQuestions(keys);
    if (questions.length === 0) return;
    setResumeState(null);
    setQuizMode('review');
    setActiveQuestions(questions);
    setQuizKey((k) => k + 1);
    setScreen('quiz');
  }

  function resumeQuiz() {
    const p = settings.quizProgress;
    if (!p) return;
    const questions = resolveQuestions(p.questions);
    if (questions.length === 0) return;
    setQuizMode(p.mode);
    setActiveQuestions(questions);
    setResumeState({
      index: p.index,
      correct: p.correct,
      wrong: p.wrong,
      sessionCorrect: p.sessionCorrect,
      sessionWrong: p.sessionWrong,
    });
    setScreen('quiz');
  }

  const handleProgress = useCallback(
    (
      index: number,
      correct: number,
      wrong: number,
      sessionCorrect: string[],
      sessionWrong: string[],
    ) => {
      if (screen !== 'quiz') return;
      const progress: QuizProgress = {
        mode: quizMode,
        questions: activeQuestions.map(questionKey),
        index,
        correct,
        wrong,
        startedAt: settings.quizProgress?.startedAt ?? Date.now(),
        sessionCorrect,
        sessionWrong,
      };
      saveProgress(progress);
    },
    [screen, quizMode, activeQuestions, settings.quizProgress?.startedAt, saveProgress],
  );

  function handleFinish(
    correct: number,
    wrong: number,
    sessionWrong: string[],
    sessionCorrect: string[],
  ) {
    const total = activeQuestions.length;
    setResumeState(null);

    if (quizMode === 'quiz') {
      const mergedQueue = mergeReviewQueue(settings.reviewQueue, sessionWrong);
      addToReviewQueue(sessionWrong);
      setPendingReviewKeys(sessionWrong);
      recordResult(correct, wrong, total);
      setResults({
        correct,
        wrong,
        total,
        isReview: false,
        reviewRemaining: mergedQueue.length,
      });
    } else {
      const remaining = updateReviewQueueAfterReview(settings.reviewQueue, sessionCorrect);
      updateReviewQueue(sessionCorrect);
      setPendingReviewKeys(remaining);
      setResults({
        correct,
        wrong,
        total,
        isReview: true,
        reviewRemaining: remaining.length,
      });
    }

    setScreen('results');
  }

  function handleReviewFromResults() {
    const keys =
      pendingReviewKeys.length > 0
        ? pendingReviewKeys
        : settings.reviewQueue;
    startReview(keys);
  }

  function resetQuiz() {
    setResumeState(null);
    setPendingReviewKeys([]);
    setScreen('setup');
  }

  return (
    <div className="app-shell mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-4 sm:gap-6 lg:max-w-3xl">
      <Header />
      <main className="flex min-w-0 flex-1 flex-col">
        {screen === 'setup' && (
          <SetupScreen
            selectedCount={selectedCount}
            onSelectCount={setSelectedCount}
            onStartQuiz={startQuiz}
            onResumeQuiz={resumeQuiz}
            onStartReview={() => startReview(settings.reviewQueue)}
            onOpenConvert={() => setScreen('convert')}
          />
        )}
        {screen === 'quiz' && (
          <QuizScreen
            key={resumeState ? 'resume' : quizKey}
            mode={quizMode}
            questions={activeQuestions}
            initialIndex={resumeState?.index ?? 0}
            initialCorrect={resumeState?.correct ?? 0}
            initialWrong={resumeState?.wrong ?? 0}
            initialSessionCorrect={resumeState?.sessionCorrect ?? []}
            initialSessionWrong={resumeState?.sessionWrong ?? []}
            onFinish={handleFinish}
            onProgress={handleProgress}
          />
        )}
        {screen === 'results' && (
          <ResultsScreen
            correct={results.correct}
            wrong={results.wrong}
            total={results.total}
            isReview={results.isReview}
            reviewRemaining={results.reviewRemaining}
            onRestart={resetQuiz}
            onReviewWrong={handleReviewFromResults}
          />
        )}
        {screen === 'convert' && <ConvertSection onBack={() => setScreen('setup')} />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default App;
