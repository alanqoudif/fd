import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import type { McqQuestion } from '@/data/questions';
import { useApp } from '@/context/AppContext';
import { isConversionQuestion, LABELS } from '@/utils/conversion';
import { cn } from '@/lib/utils';
import { celebrateCorrect } from '@/utils/celebrate';
import { QuestionLayout } from '@/components/QuestionLayout';
import { VisualExplanation } from '@/components/VisualExplanation';
import { OptionButton } from '@/components/OptionButton';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';

type Props = {
  questions: McqQuestion[];
  mode?: 'quiz' | 'review';
  initialIndex?: number;
  initialCorrect?: number;
  initialWrong?: number;
  onFinish: (correct: number, wrong: number, wrongKeys: string[], correctKeys: string[]) => void;
  onProgress: (
    index: number,
    correct: number,
    wrong: number,
    sessionCorrect: string[],
    sessionWrong: string[],
  ) => void;
};

export function QuizScreen({
  questions,
  mode = 'quiz',
  initialIndex = 0,
  initialCorrect = 0,
  initialWrong = 0,
  initialSessionCorrect = [],
  initialSessionWrong = [],
  onFinish,
  onProgress,
}: Props & {
  initialSessionCorrect?: string[];
  initialSessionWrong?: string[];
}) {
  const { ui, settings } = useApp();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(initialIndex);
  const [correct, setCorrect] = useState(initialCorrect);
  const [wrong, setWrong] = useState(initialWrong);
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const q = questions[index];
  const isTf = 'tf' in q;
  const total = questions.length;

  useEffect(() => {
    onProgress(
      index,
      correct,
      wrong,
      sessionCorrectKeysRef.current,
      sessionWrongKeysRef.current,
    );
  }, [index, correct, wrong, onProgress]);

  function isCorrectChoice(chosenIdx: number, tfValue?: number) {
    return isTf ? tfValue === q.a : chosenIdx === q.a;
  }

  const sessionWrongKeysRef = useRef<string[]>(initialSessionWrong);
  const sessionCorrectKeysRef = useRef<string[]>(initialSessionCorrect);

  function handleAnswer(chosenIdx: number, tfValue?: number) {
    if (answered) return;
    setAnswered(true);
    setSelectedIdx(chosenIdx);
    if (isCorrectChoice(chosenIdx, tfValue)) {
      setCorrect((c) => c + 1);
      sessionCorrectKeysRef.current.push(q.q);
      celebrateCorrect();
    } else {
      setWrong((w) => w + 1);
      sessionWrongKeysRef.current.push(q.q);
    }
  }

  function goNext() {
    if (index + 1 >= total) {
      onFinish(
        correct,
        wrong,
        sessionWrongKeysRef.current,
        sessionCorrectKeysRef.current,
      );
      return;
    }
    setIndex((i) => i + 1);
    setAnswered(false);
    setSelectedIdx(null);
  }

  const correctAnswerIdx = isTf ? q.a - 1 : q.a;
  const wasCorrect =
    selectedIdx !== null && (isTf ? selectedIdx + 1 === q.a : selectedIdx === q.a);

  function optionState(i: number) {
    if (!answered) return 'idle' as const;
    if (isTf ? i + 1 === q.a : i === q.a) return 'correct' as const;
    if (selectedIdx === i) return 'wrong' as const;
    return 'idle' as const;
  }

  const correctLabel = isTf
    ? q.a === 1 ? 'True' : 'False'
    : `${LABELS[correctAnswerIdx]}. ${q.o![correctAnswerIdx]}`;

  const typeBadge = isTf ? ui.trueFalse : ui.mcq;

  return (
    <QuestionLayout
      progress={((index + (answered ? 1 : 0)) / total) * 100}
      progressLabel={mode === 'review' ? ui.reviewProgressLabel : ui.progressLabel}
      counter={
        mode === 'review'
          ? `${ui.questionOf(index + 1, total)} ${ui.reviewRound}`
          : ui.questionOf(index + 1, total)
      }
      correct={correct}
      wrong={wrong}
      correctLabel={ui.correct}
      wrongLabel={ui.wrong}
      typeBadge={typeBadge}
      questionText={`${index + 1}. ${q.q}`}
      footer={
        answered ? (
          <Button className="touch-target w-full" size="lg" onClick={goNext}>
            {index + 1 < total ? ui.nextQuestion : ui.showResults}
          </Button>
        ) : null
      }
    >
      <div className={cn('flex flex-col gap-2', isTf && 'sm:flex-row')} role="group" aria-label={typeBadge}>
        {isTf
          ? ['True', 'False'].map((opt, i) => (
              <OptionButton
                key={opt}
                label={opt}
                state={optionState(i)}
                disabled={answered}
                onClick={() => handleAnswer(i, i + 1)}
                fullWidth
              />
            ))
          : q.o!.map((opt, i) => (
              <OptionButton
                key={opt}
                label={opt}
                letter={LABELS[i]}
                state={optionState(i)}
                disabled={answered}
                onClick={() => handleAnswer(i)}
              />
            ))}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <Alert variant={wasCorrect ? 'default' : 'destructive'} role="status">
            {wasCorrect ? <CheckCircle2Icon /> : <XCircleIcon />}
            <AlertTitle>
              {wasCorrect ? ui.feedbackCorrect : ui.feedbackWrong(correctLabel)}
            </AlertTitle>
          </Alert>
        </motion.div>
      )}

      {!wasCorrect && answered && isConversionQuestion(q) && (
        <VisualExplanation
          question={q}
          lang={settings.explainLang}
          title={ui.visualExplainTitle}
          show
        />
      )}
    </QuestionLayout>
  );
}
