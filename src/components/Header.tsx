import { MonitorIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Separator } from '@/components/ui/separator';

export function Header() {
  const { settings, ui, setExplainLang } = useApp();

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-primary/5 text-primary"
          aria-hidden
        >
          <MonitorIcon className="size-5" />
        </div>
        <div className="min-w-0">
          <h1 className="font-heading text-balance text-lg font-semibold sm:text-xl">
            {ui.appTitle}
          </h1>
          <p className="text-sm text-muted-foreground">{ui.subtitle}</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 sm:w-auto">
        <span className="text-xs text-muted-foreground">{ui.explainLangLabel}</span>
        <ToggleGroup
          value={[settings.explainLang]}
          onValueChange={(v) => {
            const next = v[0];
            if (next === 'ar' || next === 'en') setExplainLang(next);
          }}
          variant="outline"
          className="w-full sm:w-fit"
          aria-label={ui.explainLangLabel}
        >
          <ToggleGroupItem value="ar" className="touch-target h-11 flex-1 px-4 sm:h-10 sm:flex-none">
            {ui.arabic}
          </ToggleGroupItem>
          <ToggleGroupItem value="en" className="touch-target h-11 flex-1 px-4 sm:h-10 sm:flex-none">
            {ui.english}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Separator className="sm:hidden" />
    </header>
  );
}
