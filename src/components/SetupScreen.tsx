import { BookOpenIcon, PlayIcon, RotateCcwIcon, AlertCircleIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type Props = {
  selectedCount: number;
  onSelectCount: (n: number) => void;
  onStartQuiz: () => void;
  onResumeQuiz: () => void;
  onStartReview: () => void;
  onOpenConvert: () => void;
};

const COUNTS = [10, 20, 50, 200] as const;

export function SetupScreen({
  selectedCount,
  onSelectCount,
  onStartQuiz,
  onResumeQuiz,
  onStartReview,
  onOpenConvert,
}: Props) {
  const { settings, ui, setQuestionCount, resetCache } = useApp();
  const progress = settings.quizProgress;
  const hasQuizProgress = progress !== null && progress.mode === 'quiz';
  const hasReviewProgress = progress !== null && progress.mode === 'review';
  const reviewCount = settings.reviewQueue.length;
  const bestScore = settings.history.length
    ? Math.max(...settings.history.map((h) => h.pct))
    : null;

  function pickCount(n: number) {
    setQuestionCount(n);
    onSelectCount(n);
  }

  function handleClearCache() {
    if (!window.confirm(ui.clearCacheConfirm)) return;
    resetCache();
  }

  return (
    <div className="grid w-full min-w-0 gap-4 lg:grid-cols-[1fr_280px]">
      <Card>
        <CardHeader>
          <CardTitle>{ui.setupTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <ToggleGroup
            value={[String(selectedCount)]}
            onValueChange={(v) => {
              const n = Number(v[0]);
              if (COUNTS.includes(n as (typeof COUNTS)[number])) pickCount(n);
            }}
            variant="outline"
            className="grid w-full grid-cols-2 sm:grid-cols-4"
          >
            {COUNTS.map((n) => (
              <ToggleGroupItem key={n} value={String(n)} className="touch-target h-11 flex-1 sm:h-10">
                {n === 200 ? ui.all : n}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 border-t-0 bg-transparent pt-0">
          <Button className="touch-target w-full" size="lg" onClick={onStartQuiz}>
            <PlayIcon data-icon="inline-start" />
            {ui.startQuiz}
          </Button>
          {hasQuizProgress && (
            <Button className="w-full" variant="secondary" size="lg" onClick={onResumeQuiz}>
              <RotateCcwIcon data-icon="inline-start" />
              {ui.resumeQuiz}
            </Button>
          )}
          {hasQuizProgress && (
            <p className="text-center text-xs text-muted-foreground">{ui.resumeHint}</p>
          )}
          {hasReviewProgress && (
            <Button className="w-full" variant="secondary" size="lg" onClick={onResumeQuiz}>
              <RotateCcwIcon data-icon="inline-start" />
              {ui.resumeReview}
            </Button>
          )}
          {hasReviewProgress && (
            <p className="text-center text-xs text-muted-foreground">{ui.resumeReviewHint}</p>
          )}
          {reviewCount > 0 && !hasReviewProgress && (
            <Button className="w-full" variant="secondary" size="lg" onClick={onStartReview}>
              <AlertCircleIcon data-icon="inline-start" />
              {ui.reviewWrong}
              <Badge variant="destructive" className="ms-1">
                {reviewCount}
              </Badge>
            </Button>
          )}
          {reviewCount > 0 && !hasReviewProgress && (
            <p className="text-center text-xs text-muted-foreground">{ui.pendingReview(reviewCount)}</p>
          )}
          <Button className="w-full" variant="outline" onClick={onOpenConvert}>
            <BookOpenIcon data-icon="inline-start" />
            {ui.learnConversions}
          </Button>
        </CardFooter>
      </Card>

      {(settings.history.length > 0 || hasQuizProgress || hasReviewProgress || reviewCount > 0) && (
        <Card size="sm">
          <CardHeader>
            <CardTitle>{ui.statsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2">
              {bestScore !== null && (
                <div className="flex flex-1 flex-col items-center rounded-lg border bg-muted/50 p-3">
                  <span className="text-2xl font-semibold tabular-nums">{bestScore}%</span>
                  <span className="text-xs text-muted-foreground">{ui.bestScore}</span>
                </div>
              )}
              <div className="flex flex-1 flex-col items-center rounded-lg border bg-muted/50 p-3">
                <span className="text-2xl font-semibold tabular-nums">{settings.history.length}</span>
                <span className="text-xs text-muted-foreground">{ui.attempts}</span>
              </div>
            </div>
            {settings.history.length > 0 && (
              <>
                <Separator />
                <div className="flex flex-col gap-2">
                  {settings.history.slice(0, 5).map((h, i) => (
                    <div
                      key={h.date + i}
                      className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm"
                    >
                      <Badge variant={h.pct >= 70 ? 'default' : 'destructive'}>{h.pct}%</Badge>
                      <span className="flex-1 text-muted-foreground tabular-nums">
                        {h.correct}/{h.total}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(h.date).toLocaleDateString(
                          settings.explainLang === 'ar' ? 'ar-OM' : 'en-US',
                          { month: 'short', day: 'numeric' },
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="border-t-0 bg-transparent">
            <Button className="touch-target w-full" variant="ghost" onClick={handleClearCache}>
              {ui.clearCache}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
