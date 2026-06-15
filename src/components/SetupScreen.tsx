import { BookOpenIcon, PlayIcon, RotateCcwIcon } from 'lucide-react';
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
  onOpenConvert: () => void;
};

const COUNTS = [10, 20, 50, 200] as const;

export function SetupScreen({
  selectedCount,
  onSelectCount,
  onStartQuiz,
  onResumeQuiz,
  onOpenConvert,
}: Props) {
  const { settings, ui, setQuestionCount, resetCache } = useApp();
  const hasProgress = settings.quizProgress !== null;
  const bestScore = settings.history.length
    ? Math.max(...settings.history.map((h) => h.pct))
    : null;

  function pickCount(n: number) {
    setQuestionCount(n);
    onSelectCount(n);
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
        <CardFooter className="flex flex-col gap-2 border-t-0 bg-transparent p-4 pt-0">
          <Button className="w-full" size="lg" onClick={onStartQuiz}>
            <PlayIcon data-icon="inline-start" />
            {ui.startQuiz}
          </Button>
          {hasProgress && (
            <Button className="w-full" variant="secondary" size="lg" onClick={onResumeQuiz}>
              <RotateCcwIcon data-icon="inline-start" />
              {ui.resumeQuiz}
            </Button>
          )}
          {hasProgress && (
            <p className="text-center text-xs text-muted-foreground">{ui.resumeHint}</p>
          )}
          <Button className="w-full" variant="outline" onClick={onOpenConvert}>
            <BookOpenIcon data-icon="inline-start" />
            {ui.learnConversions}
          </Button>
        </CardFooter>
      </Card>

      {(settings.history.length > 0 || hasProgress) && (
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
            <Button variant="ghost" className="w-full" onClick={resetCache}>
              {ui.clearCache}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
