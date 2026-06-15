import { Badge } from '@/components/ui/badge';

type Props = {
  correct: number;
  wrong: number;
  correctLabel: string;
  wrongLabel: string;
};

export function ScoreBar({ correct, wrong, correctLabel, wrongLabel }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        {correctLabel}: {correct}
      </Badge>
      <Badge variant="destructive">
        {wrongLabel}: {wrong}
      </Badge>
    </div>
  );
}
