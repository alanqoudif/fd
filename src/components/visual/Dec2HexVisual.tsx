import { motion } from 'framer-motion';
import type { Dec2HexVisual } from '../../utils/visualExplain';
import type { ExplainLang } from '../../utils/storage';
import { fadeUp, staggerContainer, useAnimReduce } from './motionPresets';

const LABELS = {
  step1: { ar: 'حوّل للثنائي أولاً', en: 'Convert to binary first' },
  step2: { ar: 'جمّع كل 4 bits من اليمين', en: 'Group every 4 bits from the right' },
  result: { ar: 'Hex', en: 'Hex' },
};

type Props = { data: Dec2HexVisual; lang: ExplainLang };

export function Dec2HexVisualAnim({ data, lang }: Props) {
  const reduce = useAnimReduce();
  const L = (k: keyof typeof LABELS) => LABELS[k][lang];

  return (
    <div className="visual-explain">
      <p className="visual-caption">{L('step1')}</p>
      <motion.div
        className="binary-strip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {data.binary.split('').map((b, i) => (
          <motion.span
            key={i}
            className="bin-char"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduce ? 0 : i * 0.04 }}
          >
            {b}
          </motion.span>
        ))}
      </motion.div>

      <p className="visual-caption" style={{ marginTop: 16 }}>{L('step2')}</p>
      <motion.div
        className="hex-group-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={reduce ? { opacity: 1 } : 'show'}
      >
        {data.groups.map((g, i) => (
          <motion.div key={i} className="hex-group" variants={fadeUp}>
            <span className="group-bits">{g.bits}</span>
            <motion.span
              className="group-arrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.3 }}
            >
              ↓
            </motion.span>
            <motion.span
              className="group-hex"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduce ? 0 : 0.35, duration: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {g.hex}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="visual-result"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reduce ? 0 : data.groups.length * 0.2 + 0.4, duration: reduce ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="result-label">{L('result')}</span>
        <span className="result-value">{data.result}</span>
      </motion.div>
    </div>
  );
}
