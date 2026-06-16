import { useState } from 'react';
import { AlertCircleIcon, ArrowLeftIcon, PlayIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MEMORIZE_CONVERSIONS } from '@/data/expectedQuestions';
import {
  buildExpectedQuiz,
  getAllExpectedQuestions,
  resolveExpectedQuestions,
} from '@/utils/expectedQuiz';
import type { McqQuestion } from '@/data/questions';
import { mergeReviewQueue, updateReviewQueueAfterReview } from '@/utils/storage';
import { QuizScreen } from '@/components/QuizScreen';
import { ResultsScreen } from '@/components/ResultsScreen';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';

type Props = { onBack: () => void };

type Mode = 'setup' | 'quiz' | 'results';
type QuizMode = 'quiz' | 'review';

const COUNTS = [10, 20, 50] as const;
const TOTAL = getAllExpectedQuestions().length;

export function ExpectedQuestionsSection({ onBack }: Props) {
  const { settings, ui, addToExpectedReviewQueue, updateExpectedReviewQueue } = useApp();
  const [mode, setMode] = useState<Mode>('setup');
  const [quizMode, setQuizMode] = useState<QuizMode>('quiz');
  const [selectedCount, setSelectedCount] = useState<number>(50);
  const [quizKey, setQuizKey] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState<McqQuestion[]>([]);
  const [pendingReviewKeys, setPendingReviewKeys] = useState<string[]>([]);
  const [results, setResults] = useState({
    correct: 0,
    wrong: 0,
    total: 0,
    isReview: false,
    reviewRemaining: 0,
  });

  const reviewCount = settings.expectedReviewQueue.length;

  function startQuiz() {
    setQuizMode('quiz');
    setPendingReviewKeys([]);
    const questions = buildExpectedQuiz(selectedCount);
    setActiveQuestions(questions);
    setQuizKey((k) => k + 1);
    setMode('quiz');
  }

  function startReview(keys?: string[]) {
    const queue = keys ?? settings.expectedReviewQueue;
    const questions = resolveExpectedQuestions(queue);
    if (questions.length === 0) return;
    setQuizMode('review');
    setActiveQuestions(questions);
    setQuizKey((k) => k + 1);
    setMode('quiz');
  }

  function handleFinish(
    correct: number,
    wrong: number,
    sessionWrong: string[],
    sessionCorrect: string[],
  ) {
    if (quizMode === 'quiz') {
      const mergedQueue = mergeReviewQueue(settings.expectedReviewQueue, sessionWrong);
      addToExpectedReviewQueue(sessionWrong);
      setPendingReviewKeys(sessionWrong);
      setResults({
        correct,
        wrong,
        total: activeQuestions.length,
        isReview: false,
        reviewRemaining: mergedQueue.length,
      });
    } else {
      const remaining = updateReviewQueueAfterReview(
        settings.expectedReviewQueue,
        sessionCorrect,
      );
      updateExpectedReviewQueue(sessionCorrect);
      setPendingReviewKeys(remaining);
      setResults({
        correct,
        wrong,
        total: activeQuestions.length,
        isReview: true,
        reviewRemaining: remaining.length,
      });
    }
    setMode('results');
  }

  function handleReviewFromResults() {
    const keys =
      pendingReviewKeys.length > 0 ? pendingReviewKeys : settings.expectedReviewQueue;
    startReview(keys);
  }

  function backToSetup() {
    setPendingReviewKeys([]);
    setMode('setup');
  }

  if (mode === 'quiz') {
    return (
      <QuizScreen
        key={quizKey}
        mode={quizMode}
        questions={activeQuestions}
        onFinish={handleFinish}
        onProgress={() => {}}
      />
    );
  }

  if (mode === 'results') {
    return (
      <ResultsScreen
        correct={results.correct}
        wrong={results.wrong}
        total={results.total}
        isReview={results.isReview}
        reviewRemaining={results.reviewRemaining}
        onRestart={backToSetup}
        onReviewWrong={handleReviewFromResults}
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Button variant="ghost" className="touch-target self-start" onClick={onBack}>
        <ArrowLeftIcon data-icon="inline-start" />
        {ui.back}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{ui.expectedQuestionsTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">{ui.expectedQuestionsIntro}</p>
          <div className="tip-box text-sm">{ui.expectedQuestionsTip}</div>
          <div>
            <p className="mb-2 text-sm font-medium">{ui.setupTitle}</p>
            <ToggleGroup
              value={[String(selectedCount)]}
              onValueChange={(v) => {
                const n = Number(v[0]);
                if (n === TOTAL || COUNTS.includes(n as (typeof COUNTS)[number])) {
                  setSelectedCount(n);
                }
              }}
              variant="outline"
              className="grid w-full grid-cols-2 sm:grid-cols-4"
            >
              {COUNTS.map((n) => (
                <ToggleGroupItem key={n} value={String(n)} className="touch-target h-11 flex-1 sm:h-10">
                  {n}
                </ToggleGroupItem>
              ))}
              <ToggleGroupItem value={String(TOTAL)} className="touch-target h-11 flex-1 sm:h-10">
                {ui.all} ({TOTAL})
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 border-t-0 bg-transparent pt-0">
          <Button className="touch-target w-full" size="lg" onClick={startQuiz}>
            <PlayIcon data-icon="inline-start" />
            {ui.startExpectedQuiz}
          </Button>
          {reviewCount > 0 && (
            <Button className="w-full" variant="secondary" size="lg" onClick={() => startReview()}>
              <AlertCircleIcon data-icon="inline-start" />
              {ui.reviewWrong}
              <Badge variant="destructive" className="ms-1">
                {reviewCount}
              </Badge>
            </Button>
          )}
          {reviewCount > 0 && (
            <p className="text-center text-xs text-muted-foreground">{ui.pendingReview(reviewCount)}</p>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{ui.memorizeTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="example-box whitespace-pre-wrap">{MEMORIZE_CONVERSIONS.join('\n')}</pre>
        </CardContent>
      </Card>

      <p className="pb-2 text-center text-sm text-muted-foreground">{ui.expectedQuestionsFooter}</p>
    </div>
  );
}
