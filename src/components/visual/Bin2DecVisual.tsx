import { motion } from 'framer-motion';
import type { Bin2DecVisual } from '../../utils/visualExplain';
import type { ExplainLang } from '../../utils/storage';
import { fadeUp, staggerContainer, useAnimReduce } from './motionPresets';

const LABELS = {
  caption: { ar: 'كل خانة 1 = اجمع قيمة موقعها', en: 'Each 1 = add its position value' },
  sum: { ar: 'المجموع', en: 'Sum' },
  decimal: { ar: 'عشري', en: 'decimal' },
};

type Props = { data: Bin2DecVisual; lang: ExplainLang };

export function Bin2DecVisualAnim({ data, lang }: Props) {
  const reduce = useAnimReduce();
  const L = (k: keyof typeof LABELS) => LABELS[k][lang];
  const activeCols = data.columns.filter((c) => c.active);

  return (
    <div className="visual-explain">
      <p className="visual-caption">{L('caption')}</p>
      <motion.div
        className="bit-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={reduce ? { opacity: 1 } : 'show'}
      >
        {data.columns.map((col, i) => (
          <motion.div
            key={i}
            className={`bit-col${col.active ? ' active' : ''}`}
            variants={fadeUp}
          >
            <motion.span
              className="bit-char mono"
              animate={
                col.active && !reduce
                  ? { scale: [1, 1.25, 1], color: ['#e8edf5', '#34d399', '#34d399'] }
                  : {}
              }
              transition={{ delay: i * 0.15 + 0.5, duration: 0.5 }}
            >
              {col.bit}
            </motion.span>
            <span className="bit-power mono">×{col.power}</span>
            {col.active && (
              <motion.span
                className="bit-val mono"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : i * 0.15 + 0.7 }}
              >
                {col.value}
              </motion.span>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="sum-flow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : data.columns.length * 0.15 + 0.8 }}
      >
        <div className="sum-parts mono">
          {activeCols.map((col, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: reduce ? 0 : data.columns.length * 0.15 + 1 + i * 0.15 }}
            >
              {col.value}
              {i < activeCols.length - 1 ? ' + ' : ''}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="visual-result"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduce ? 0 : data.columns.length * 0.15 + 1.8, type: 'spring' }}
        >
          <span className="result-label">{L('sum')}</span>
          <span className="result-value mono">
            {data.sum} <small>({L('decimal')})</small>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
