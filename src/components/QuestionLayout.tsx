import type { ReactNode } from 'react';
import { ScoreBar } from '@/components/ScoreBar';
import { ProgressBar } from '@/components/ProgressBar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

type Props = {
  progress: number;
  progressLabel: string;
  counter: string;
  correct: number;
  wrong: number;
  correctLabel: string;
  wrongLabel: string;
  typeBadge: string;
  questionText: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function QuestionLayout({
  progress,
  progressLabel,
  counter,
  correct,
  wrong,
  correctLabel,
  wrongLabel,
  typeBadge,
  questionText,
  children,
  footer,
}: Props) {
  return (
    <section className="flex w-full min-w-0 flex-col gap-4" aria-label={counter}>
      <ProgressBar progress={progress} label={progressLabel} />
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <span className="text-sm text-muted-foreground">{counter}</span>
        <ScoreBar
          correct={correct}
          wrong={wrong}
          correctLabel={correctLabel}
          wrongLabel={wrongLabel}
        />
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-3">
          <Badge variant="outline" className="w-fit">
            {typeBadge}
          </Badge>
          <p
            className="text-left text-base leading-relaxed font-medium text-pretty"
            dir="ltr"
          >
            {questionText}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">{children}</CardContent>
        {footer && (
          <CardFooter className="border-t-0 bg-transparent pt-0">{footer}</CardFooter>
        )}
      </Card>
    </section>
  );
}
