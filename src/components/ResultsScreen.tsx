import { TrophyIcon, RotateCcwIcon } from 'lucide-react';
import { getGradeMessage } from '@/i18n/translations';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type Props = {
  correct: number;
  wrong: number;
  total: number;
  isReview?: boolean;
  reviewRemaining?: number;
  onRestart: () => void;
  onReviewWrong?: () => void;
};

export function ResultsScreen({
  correct,
  wrong,
  total,
  isReview = false,
  reviewRemaining = 0,
  onRestart,
  onReviewWrong,
}: Props) {
  const { settings, ui } = useApp();
  const pct = Math.round((correct / total) * 100);
  const showReview = !isReview && wrong > 0 && onReviewWrong;
  const showContinueReview = isReview && reviewRemaining > 0 && onReviewWrong;

  return (
    <Card className="mx-auto w-full max-w-md text-center">
      <h2 className="sr-only">{isReview ? ui.reviewResultsTitle : ui.resultsTitle}</h2>
      <CardHeader className="items-center gap-2">
        <div
          className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
          aria-hidden
        >
          <TrophyIcon className="size-6" />
        </div>
        <CardTitle className="text-4xl font-bold tabular-nums sm:text-5xl">{pct}%</CardTitle>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {ui.scoreOf(correct, total)}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          <StatBox label={ui.correct} value={correct} />
          <StatBox label={ui.wrong} value={wrong} variant="destructive" />
          <StatBox label={ui.total} value={total} variant="secondary" />
        </div>
        <Separator />
        {isReview ? (
          <div className="flex flex-col gap-2 text-sm">
            <p className="rounded-lg border bg-muted/50 p-4 text-pretty">
              {ui.reviewMastered(correct)}
            </p>
            <p className="text-muted-foreground">
              {reviewRemaining > 0 ? ui.reviewRemaining(reviewRemaining) : ui.reviewAllDone}
            </p>
          </div>
        ) : (
          <p className="rounded-lg border bg-muted/50 p-4 text-sm text-pretty" aria-live="polite">
            {getGradeMessage(pct, settings.explainLang)}
          </p>
        )}
        {showReview && (
          <p className="text-sm text-muted-foreground">{ui.reviewWrongHint(wrong)}</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 border-t-0 bg-transparent pt-0">
        {showReview && (
          <Button className="touch-target w-full" size="lg" onClick={onReviewWrong}>
            <RotateCcwIcon data-icon="inline-start" />
            {ui.reviewWrong}
          </Button>
        )}
        {showContinueReview && (
          <Button className="touch-target w-full" size="lg" onClick={onReviewWrong}>
            <RotateCcwIcon data-icon="inline-start" />
            {ui.reviewWrong}
          </Button>
        )}
        <Button
          className="touch-target w-full"
          size="lg"
          variant={showReview || showContinueReview ? 'outline' : 'default'}
          onClick={onRestart}
        >
          {ui.newQuiz}
        </Button>
      </CardFooter>
    </Card>
  );
}

function StatBox({
  label,
  value,
  variant = 'default',
}: {
  label: string;
  value: number;
  variant?: 'default' | 'destructive' | 'secondary';
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border bg-muted/30 p-2.5 sm:p-3">
      <span className="text-lg font-semibold tabular-nums sm:text-xl">{value}</span>
      <Badge variant={variant === 'default' ? 'outline' : variant}>{label}</Badge>
    </div>
  );
}
