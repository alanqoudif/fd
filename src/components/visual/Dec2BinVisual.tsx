import { motion } from 'framer-motion';
import type { Dec2BinVisual } from '../../utils/visualExplain';
import type { ExplainLang } from '../../utils/storage';
import { fadeUp, popIn, staggerContainer, useAnimReduce } from './motionPresets';

const LABELS = {
  divide: { ar: 'اقسم على 2 واكتب الباقي', en: 'Divide by 2 and write the remainder' },
  readUp: { ar: 'اقرأ من تحت لفوق', en: 'Read bottom to top' },
  result: { ar: 'النتيجة الثنائية', en: 'Binary result' },
  remainder: { ar: 'باقي', en: 'rem' },
};

type Props = { data: Dec2BinVisual; lang: ExplainLang };

export function Dec2BinVisualAnim({ data, lang }: Props) {
  const reduce = useAnimReduce();
  const L = (k: keyof typeof LABELS) => LABELS[k][lang];

  return (
    <div className="visual-explain">
      <p className="visual-caption">{L('divide')}</p>
      <motion.div
        className="division-stack"
        variants={staggerContainer}
        initial="hidden"
        animate={reduce ? { opacity: 1 } : 'show'}
      >
        {data.divisions.map((step, i) => (
          <motion.div key={i} className="division-row" variants={fadeUp}>
            <span className="div-num">{step.num}</span>
            <span className="div-op">÷ 2 =</span>
            <span className="div-quot">{step.quot}</span>
            <motion.span
              className="div-rem"
              variants={popIn}
              initial="hidden"
              animate="show"
              transition={{ delay: reduce ? 0 : 0.2 }}
            >
              {L('remainder')} <strong>{step.rem}</strong>
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="remainder-flow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : data.divisions.length * 0.4 + 0.3 }}
      >
        <p className="visual-caption">{L('readUp')}</p>
        <div className="remainder-bits">
          {[...data.remainders].reverse().map((bit, i) => (
            <motion.span
              key={i}
              className="rem-bit"
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: reduce ? 0 : data.divisions.length * 0.25 + 0.35 + i * 0.08,
                duration: reduce ? 0 : 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {bit}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="visual-result"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduce ? 0 : data.divisions.length * 0.25 + 0.7, duration: reduce ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="result-label">{L('result')}</span>
          <span className="result-value">{data.result}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
