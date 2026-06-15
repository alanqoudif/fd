import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import type { McqQuestion } from '@/data/questions';
import { ALL_QUESTIONS } from '@/data/questions';
import { useApp } from '@/context/AppContext';
import { isConversionQuestion, LABELS } from '@/utils/conversion';
import { cn } from '@/lib/utils';
import { shuffle } from '@/utils/shuffle';
import { celebrateCorrect } from '@/utils/celebrate';
import { QuestionLayout } from '@/components/QuestionLayout';
import { VisualExplanation } from '@/components/VisualExplanation';
import { LESSON_TABS, LessonContent, getLessonTabLabel, type LessonId } from '@/components/Lessons';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle } from '@/components/ui/alert';

type Props = { onBack: () => void };

export function ConvertSection({ onBack }: Props) {
  const { settings, ui, setLastLessonTab } = useApp();
  const [mode, setMode] = useState<'learn' | 'practice'>('learn');
  const [lessonId, setLessonId] = useState<LessonId>(settings.lastLessonTab);
  const [round, setRound] = useState(0);
  const lang = settings.explainLang;

  const shuffledQuestions = useMemo(
    () => shuffle(ALL_QUESTIONS.filter(isConversionQuestion)),
    [round],
  );

  function selectLesson(id: LessonId) {
    setLessonId(id);
    setLastLessonTab(id);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeftIcon data-icon="inline-start" />
          {ui.back}
        </Button>
      </div>

      <Tabs
        value={mode}
        onValueChange={(v) => {
          if (v === 'learn' || v === 'practice') setMode(v);
        }}
      >
        <TabsList className="w-full">
          <TabsTrigger value="learn" className="flex-1">
            {ui.learnTab}
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex-1">
            {ui.practiceTab}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="flex flex-col gap-4">
          <Tabs
            value={lessonId}
            onValueChange={(v) => {
              if (v === 'basics' || v === 'dec2bin' || v === 'bin2dec' || v === 'hex') selectLesson(v);
            }}
          >
            <TabsList className="h-auto w-full flex-wrap">
              {LESSON_TABS.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="text-xs sm:text-sm">
                  {getLessonTabLabel(tab.id, lang)}
                </TabsTrigger>
              ))}
            </TabsList>
            {LESSON_TABS.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <LessonContent id={tab.id} lang={lang} />
              </TabsContent>
            ))}
          </Tabs>
          <Button className="w-full" onClick={() => setMode('practice')}>
            {ui.startPractice}
          </Button>
        </TabsContent>

        <TabsContent value="practice">
          <ConvertPractice
            key={round}
            questions={shuffledQuestions}
            round={round}
            onRestartRound={() => setRound((r) => r + 1)}
            onBackToLearn={() => setMode('learn')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ConvertPractice({
  questions,
  round,
  onRestartRound,
  onBackToLearn,
}: {
  questions: McqQuestion[];
  round: number;
  onRestartRound: () => void;
  onBackToLearn: () => void;
}) {
  const { settings, ui } = useApp();
  const lang = settings.explainLang;
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const q = questions[index];
  const total = questions.length;
  const wasCorrect = selectedIdx === q.a;

  function handleAnswer(idx: number) {
    if (answered) return;
    setAnswered(true);
    setSelectedIdx(idx);
    if (idx === q.a) {
      setCorrect((c) => c + 1);
      celebrateCorrect();
    } else {
      setWrong((w) => w + 1);
    }
  }

  function goNext() {
    if (index + 1 >= total) {
      onRestartRound();
      return;
    }
    setIndex((i) => i + 1);
    setAnswered(false);
    setSelectedIdx(null);
  }

  const counter =
    ui.questionOf(index + 1, total) + (round > 0 ? ` ${ui.round(round + 1)}` : '');

  if (!q?.o) return null;

  return (
    <QuestionLayout
      progress={((index + (answered ? 1 : 0)) / total) * 100}
      counter={counter}
      correct={correct}
      wrong={wrong}
      correctLabel={ui.correct}
      wrongLabel={ui.wrong}
      typeBadge={ui.conversion}
      questionText={`${index + 1}. ${q.q}`}
      footer={
        answered ? (
          <Button className="w-full" size="lg" onClick={goNext}>
            {index + 1 < total ? ui.nextQuestion : ui.restartPractice}
          </Button>
        ) : null
      }
    >
      <div className="flex flex-col gap-2">
        {q.o.map((opt, i) => {
          const state = !answered ? 'idle' : i === q.a ? 'correct' : selectedIdx === i ? 'wrong' : 'idle';
          return (
            <Button
              key={opt}
              type="button"
              variant="outline"
              disabled={answered}
              onClick={() => handleAnswer(i)}
              className={cn(
                'touch-target h-auto min-h-11 justify-start px-4 py-3 text-left text-base whitespace-normal sm:text-sm',
                state === 'correct' && 'border-primary bg-primary/5',
                state === 'wrong' && 'border-destructive bg-destructive/5',
              )}
              dir="ltr"
            >
              <span
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold',
                  state === 'correct' && 'border-primary bg-primary text-primary-foreground',
                  state === 'wrong' && 'border-destructive bg-destructive text-white',
                )}
              >
                {LABELS[i]}
              </span>
              <span>{opt}</span>
            </Button>
          );
        })}
      </div>

      {answered && (
        <>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Alert variant={wasCorrect ? 'default' : 'destructive'}>
              {wasCorrect ? <CheckCircle2Icon /> : <XCircleIcon />}
              <AlertTitle>
                {wasCorrect
                  ? ui.feedbackCorrect
                  : ui.feedbackWrong(`${LABELS[q.a]}. ${q.o[q.a]}`)}
              </AlertTitle>
            </Alert>
          </motion.div>
          {!wasCorrect && (
            <VisualExplanation
              question={q}
              lang={lang}
              title={ui.visualExplainTitle}
              show
            />
          )}
        </>
      )}

      {!answered && index === 0 && correct === 0 && (
        <Button variant="ghost" onClick={onBackToLearn}>
          <ArrowLeftIcon data-icon="inline-start" />
          {ui.backToLearn}
        </Button>
      )}
    </QuestionLayout>
  );
}
