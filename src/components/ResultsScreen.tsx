import { TrophyIcon } from 'lucide-react';
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
  onRestart: () => void;
};

export function ResultsScreen({ correct, wrong, total, onRestart }: Props) {
  const { settings, ui } = useApp();
  const pct = Math.round((correct / total) * 100);

  return (
    <Card className="mx-auto w-full max-w-md text-center">
      <CardHeader className="items-center gap-2">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <TrophyIcon />
        </div>
        <CardTitle className="text-4xl font-bold tabular-nums sm:text-5xl">{pct}%</CardTitle>
        <p className="text-sm text-muted-foreground">{ui.scoreOf(correct, total)}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          <StatBox label={ui.correct} value={correct} />
          <StatBox label={ui.wrong} value={wrong} variant="destructive" />
          <StatBox label={ui.total} value={total} variant="secondary" />
        </div>
        <Separator />
        <p className="rounded-lg border bg-muted/50 p-4 text-sm">
          {getGradeMessage(pct, settings.explainLang)}
        </p>
      </CardContent>
      <CardFooter className="border-t-0 bg-transparent">
        <Button className="w-full" size="lg" onClick={onRestart}>
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
    <div className="flex flex-col items-center gap-1 rounded-lg border bg-muted/30 p-3">
      <span className="text-xl font-semibold tabular-nums">{value}</span>
      <Badge variant={variant === 'default' ? 'outline' : variant}>{label}</Badge>
    </div>
  );
}
