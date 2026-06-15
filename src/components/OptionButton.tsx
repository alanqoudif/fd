import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type OptionState = 'idle' | 'correct' | 'wrong';

type Props = {
  label: string;
  letter?: string;
  state: OptionState;
  disabled: boolean;
  onClick: () => void;
  fullWidth?: boolean;
};

export function OptionButton({
  label,
  letter,
  state,
  disabled,
  onClick,
  fullWidth,
}: Props) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={state !== 'idle' ? state === 'correct' || state === 'wrong' : undefined}
      className={cn(
        'touch-target h-auto min-h-11 justify-start gap-3 px-4 py-3 text-left text-base whitespace-normal sm:text-sm',
        fullWidth && 'flex-1 justify-center',
        state === 'correct' && 'border-primary bg-primary/5',
        state === 'wrong' && 'border-destructive bg-destructive/5',
        disabled && state !== 'idle' && 'disabled:opacity-100',
      )}
      dir="ltr"
    >
      {letter && (
        <span
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold',
            state === 'correct' && 'border-primary bg-primary text-primary-foreground',
            state === 'wrong' && 'border-destructive bg-destructive text-white',
          )}
          aria-hidden
        >
          {letter}
        </span>
      )}
      <span>{label}</span>
    </Button>
  );
}
