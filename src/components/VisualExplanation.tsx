import { motion, useReducedMotion } from 'framer-motion';
import type { McqQuestion } from '@/data/questions';
import type { ExplainLang } from '@/utils/storage';
import { buildSolution } from '@/utils/conversion';
import { getVisualExplanation } from '@/utils/visualExplain';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bin2DecVisualAnim } from '@/components/visual/Bin2DecVisual';
import { Dec2BinVisualAnim } from '@/components/visual/Dec2BinVisual';
import { Dec2HexVisualAnim } from '@/components/visual/Dec2HexVisual';
import { Hex2BinVisualAnim } from '@/components/visual/Hex2BinVisual';

type Props = {
  question: McqQuestion;
  lang: ExplainLang;
  title: string;
  show: boolean;
};

export function VisualExplanation({ question, lang, title, show }: Props) {
  const reduceMotion = useReducedMotion();
  const visual = getVisualExplanation(question, lang);
  const textSolution = buildSolution(question, lang);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {visual ? (
            <VisualRenderer visual={visual} lang={lang} />
          ) : (
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              {textSolution.map((block, bi) => (
                <div key={bi} className="flex flex-col gap-1">
                  {block.title && <strong className="text-foreground">{block.title}</strong>}
                  {block.lines.map((line, li) => (
                    <div key={li}>{line}</div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function VisualRenderer({
  visual,
  lang,
}: {
  visual: NonNullable<ReturnType<typeof getVisualExplanation>>;
  lang: ExplainLang;
}) {
  switch (visual.type) {
    case 'dec2bin':
      return <Dec2BinVisualAnim data={visual} lang={lang} />;
    case 'bin2dec':
      return <Bin2DecVisualAnim data={visual} lang={lang} />;
    case 'hex2bin':
      return <Hex2BinVisualAnim data={visual} lang={lang} />;
    case 'dec2hex':
      return <Dec2HexVisualAnim data={visual} lang={lang} />;
  }
}
