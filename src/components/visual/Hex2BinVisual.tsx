import { motion } from 'framer-motion';
import type { Hex2BinVisual } from '../../utils/visualExplain';
import type { ExplainLang } from '../../utils/storage';
import { fadeUp, popIn, staggerContainer, useAnimReduce } from './motionPresets';

const LABELS = {
  caption: { ar: 'كل خانة Hex = 4 خانات Binary', en: 'Each Hex digit = 4 Binary bits' },
  result: { ar: 'النتيجة', en: 'Result' },
};

type Props = { data: Hex2BinVisual; lang: ExplainLang };

export function Hex2BinVisualAnim({ data, lang }: Props) {
  const reduce = useAnimReduce();
  const L = (k: keyof typeof LABELS) => LABELS[k][lang];

  return (
    <div className="visual-explain">
      <p className="visual-caption">{L('caption')}</p>
      <motion.div
        className="hex-expand-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={reduce ? { opacity: 1 } : 'show'}
      >
        {data.digits.map((d, i) => (
          <motion.div key={i} className="hex-expand-row" variants={fadeUp}>
            <motion.span className="hex-digit mono" variants={popIn}>
              {d.char}
            </motion.span>
            <motion.span
              className="hex-arrow"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: reduce ? 0 : 0.25 }}
            >
              →
            </motion.span>
            <motion.span
              className="hex-bits mono"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.05em' }}
              transition={{ delay: reduce ? 0 : 0.35, duration: 0.5 }}
            >
              {d.bits.split('').map((b, bi) => (
                <motion.span
                  key={bi}
                  className="hex-bit"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.4 + bi * 0.08 }}
                >
                  {b}
                </motion.span>
              ))}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="visual-result"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : data.digits.length * 0.4 + 0.6, type: 'spring' }}
      >
        <span className="result-label">{L('result')}</span>
        <span className="result-value mono">{data.result}</span>
      </motion.div>
    </div>
  );
}
