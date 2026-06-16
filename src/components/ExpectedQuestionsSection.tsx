import { useState } from 'react';
import { ArrowLeftIcon, ChevronDownIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { EXPECTED_QUESTION_SECTIONS, MEMORIZE_CONVERSIONS } from '@/data/expectedQuestions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = { onBack: () => void };

export function ExpectedQuestionsSection({ onBack }: Props) {
  const { settings, ui } = useApp();
  const lang = settings.explainLang;

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
        </CardContent>
      </Card>

      {EXPECTED_QUESTION_SECTIONS.map((section) => (
        <section key={section.id} className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            {lang === 'ar' ? section.titleAr : section.titleEn}
          </h2>
          <div className="flex flex-col gap-2">
            {section.questions.map((item) => (
              <ExpectedQuestionCard key={item.num} num={item.num} q={item.q} answer={item.answer} />
            ))}
          </div>
        </section>
      ))}

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

function ExpectedQuestionCard({ num, q, answer }: { num: number; q: string; answer: string }) {
  const { ui } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="expected-question-card">
      <button
        type="button"
        className="expected-question-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="expected-question-num">{num}.</span>
        <span className="flex-1 text-start">{q}</span>
        <ChevronDownIcon
          className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
        />
      </button>
      {open ? (
        <div className="expected-question-answer">
          <span className="text-xs font-medium text-muted-foreground">{ui.answerLabel}</span>
          <span>{answer}</span>
        </div>
      ) : (
        <button type="button" className="expected-question-reveal touch-target" onClick={() => setOpen(true)}>
          {ui.showAnswer}
        </button>
      )}
    </div>
  );
}
