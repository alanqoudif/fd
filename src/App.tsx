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
import type { QuizProgress } from '@/utils/storage';

type Screen = 'setup' | 'quiz' | 'results' | 'convert';

function questionKey(q: McqQuestion) {
  return q.q;
}

function resolveQuestions(keys: string[]): McqQuestion[] {
  const map = new Map(ALL_QUESTIONS.map((q) => [q.q, q]));
  return keys.map((k) => map.get(k)).filter((q): q is McqQuestion => !!q);
}

function AppInner() {
  const { settings, saveProgress, recordResult } = useApp();
  const [screen, setScreen] = useState<Screen>('setup');
  const [selectedCount, setSelectedCount] = useState(settings.questionCount);
  const [quizKey, setQuizKey] = useState(0);
  const [resumeState, setResumeState] = useState<{
    index: number;
    correct: number;
    wrong: number;
  } | null>(null);
  const [results, setResults] = useState({ correct: 0, wrong: 0, total: 0 });
  const [activeQuestions, setActiveQuestions] = useState<McqQuestion[]>([]);

  function startQuiz() {
    setResumeState(null);
    const questions = shuffle([...ALL_QUESTIONS]).slice(0, selectedCount);
    setActiveQuestions(questions);
    setQuizKey((k) => k + 1);
    setScreen('quiz');
  }

  function resumeQuiz() {
    const p = settings.quizProgress;
    if (!p) return;
    const questions = resolveQuestions(p.questions);
    if (questions.length === 0) return;
    setActiveQuestions(questions);
    setResumeState({ index: p.index, correct: p.correct, wrong: p.wrong });
    setScreen('quiz');
  }

  const handleProgress = useCallback(
    (index: number, correct: number, wrong: number) => {
      if (screen !== 'quiz') return;
      const progress: QuizProgress = {
        questions: activeQuestions.map(questionKey),
        index,
        correct,
        wrong,
        startedAt: settings.quizProgress?.startedAt ?? Date.now(),
      };
      saveProgress(progress);
    },
    [screen, activeQuestions, settings.quizProgress?.startedAt, saveProgress],
  );

  function handleFinish(correct: number, wrong: number) {
    const total = activeQuestions.length;
    setResults({ correct, wrong, total });
    recordResult(correct, wrong, total);
    setResumeState(null);
    setScreen('results');
  }

  function resetQuiz() {
    setResumeState(null);
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
            onOpenConvert={() => setScreen('convert')}
          />
        )}
        {screen === 'quiz' && (
          <QuizScreen
            key={resumeState ? 'resume' : quizKey}
            questions={activeQuestions}
            initialIndex={resumeState?.index ?? 0}
            initialCorrect={resumeState?.correct ?? 0}
            initialWrong={resumeState?.wrong ?? 0}
            onFinish={handleFinish}
            onProgress={handleProgress}
          />
        )}
        {screen === 'results' && (
          <ResultsScreen
            correct={results.correct}
            wrong={results.wrong}
            total={results.total}
            onRestart={resetQuiz}
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
