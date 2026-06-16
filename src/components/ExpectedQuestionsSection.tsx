import { useState } from 'react';
import { ArrowLeftIcon, PlayIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MEMORIZE_CONVERSIONS } from '@/data/expectedQuestions';
import { buildExpectedQuiz, getAllExpectedQuestions } from '@/utils/expectedQuiz';
import type { McqQuestion } from '@/data/questions';
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

type Props = { onBack: () => void };

type Mode = 'setup' | 'quiz' | 'results';

const COUNTS = [10, 20, 50] as const;
const TOTAL = getAllExpectedQuestions().length;

export function ExpectedQuestionsSection({ onBack }: Props) {
  const { ui } = useApp();
  const [mode, setMode] = useState<Mode>('setup');
  const [selectedCount, setSelectedCount] = useState<number>(50);
  const [quizKey, setQuizKey] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState<McqQuestion[]>([]);
  const [results, setResults] = useState({ correct: 0, wrong: 0, total: 0 });

  function startQuiz() {
    const questions = buildExpectedQuiz(selectedCount);
    setActiveQuestions(questions);
    setQuizKey((k) => k + 1);
    setMode('quiz');
  }

  function handleFinish(correct: number, wrong: number) {
    setResults({ correct, wrong, total: activeQuestions.length });
    setMode('results');
  }

  function backToSetup() {
    setMode('setup');
  }

  if (mode === 'quiz') {
    return (
      <QuizScreen
        key={quizKey}
        questions={activeQuestions}
        onFinish={(correct, wrong) => handleFinish(correct, wrong)}
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
        onRestart={backToSetup}
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
