import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';

type Props = {
  progress: number;
  label: string;
};

export function ProgressBar({ progress, label }: Props) {
  const value = Math.round(progress);

  return (
    <Progress
      value={progress}
      className="w-full"
      aria-label={label}
      aria-valuetext={`${value}%`}
    >
      <ProgressTrack className="h-1.5">
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}
