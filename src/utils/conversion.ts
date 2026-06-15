import type { McqQuestion } from '../data/questions';
import type { ExplainLang } from './storage';

export const LABELS = ['A', 'B', 'C', 'D'] as const;
export const POWERS_OF_2 = [256, 128, 64, 32, 16, 8, 4, 2, 1];

const HEX_MAP: Record<string, string> = {
  '0': '0000', '1': '0001', '2': '0010', '3': '0011',
  '4': '0100', '5': '0101', '6': '0110', '7': '0111',
  '8': '1000', '9': '1001', A: '1010', B: '1011',
  C: '1100', D: '1101', E: '1110', F: '1111',
};

const T = {
  remainder: { ar: 'باقي', en: 'remainder' },
  readBottomUp: { ar: 'اقرأ الباقيات من تحت لفوق', en: 'Read remainders bottom to top' },
  method1: { ar: 'الطريقة 1 — القسمة على 2:', en: 'Method 1 — Divide by 2:' },
  method2: { ar: 'الطريقة 2 — طرح قوى الـ 2:', en: 'Method 2 — Subtract powers of 2:' },
  decimal: { ar: 'عشري', en: 'decimal' },
  binary: { ar: 'ثنائي', en: 'binary' },
  sumPositions: { ar: 'اجمع قيم المواقع اللي فيها 1:', en: 'Sum the positions with 1:' },
  eachDigit: { ar: 'كل خانة = 4 bits:', en: 'Each digit = 4 bits:' },
  result: { ar: 'النتيجة', en: 'Result' },
  groupBits: { ar: 'جمّع كل 4 bits من اليمين:', en: 'Group every 4 bits from the right:' },
  tip255: { ar: '💡 255 = FF لأن كل F = 1111', en: '💡 255 = FF because each F = 1111' },
  reviewLesson: { ar: 'راجع قسم الشرح للطريقة المناسبة.', en: 'Review the lesson section for the appropriate method.' },
  correctAnswer: { ar: 'الإجابة الصحيحة:', en: 'Correct answer:' },
};

function t(key: keyof typeof T, lang: ExplainLang) {
  return T[key][lang];
}

export function isConversionQuestion(q: McqQuestion): boolean {
  if ('tf' in q) return false;
  const text = q.q;
  if (/power supply converts|convert physical documents|convert digital signals|convert wired|Converting coded data|Converts it into a secure|Converting readable data|convert analog signals/i.test(text)) {
    return false;
  }
  return /Conversion of|Convert \(?\d+\)?10|Convert decimal to binary|binary equivalent of the decimal|decimal equivalent (?:for|of) binary|The decimal equivalent of [01]+|hexadecimal representation of the decimal number|hexadecimal number [0-9A-Fa-f]+ to binary|For converting a number in decimal to binary/i.test(text);
}

export function decToBin(n: number, lang: ExplainLang) {
  if (n === 0) return { result: '0', steps: [`0 ÷ 2 = 0  ${t('remainder', lang)} 0`] };
  const steps: string[] = [];
  const remainders: string[] = [];
  let num = n;
  while (num > 0) {
    const rem = num % 2;
    const quot = Math.floor(num / 2);
    steps.push(`${num} ÷ 2 = ${quot}  ${t('remainder', lang)} ${rem}`);
    remainders.unshift(String(rem));
    num = quot;
  }
  return { result: remainders.join(''), steps };
}

export function binToDec(bin: string) {
  const cleaned = bin.replace(/\s/g, '');
  const bits = cleaned.split('').reverse();
  const parts: number[] = [];
  let sum = 0;
  bits.forEach((b, i) => {
    if (b === '1') {
      const val = 2 ** i;
      parts.push(val);
      sum += val;
    }
  });
  return { result: sum, parts, cleaned };
}

export function hexToBin(hex: string) {
  const upper = hex.toUpperCase();
  const steps: string[] = [];
  let result = '';
  for (const ch of upper) {
    const bits = HEX_MAP[ch];
    steps.push(`${ch} = ${bits}`);
    result += bits;
  }
  return { result, steps };
}

export function decToBinBySubtract(n: number) {
  const parts: number[] = [];
  let remaining = n;
  for (const p of POWERS_OF_2) {
    if (remaining >= p) {
      parts.push(p);
      remaining -= p;
    }
  }
  return parts;
}

export type SolutionBlock = { title?: string; lines: string[] };

export function buildSolution(q: McqQuestion, lang: ExplainLang): SolutionBlock[] {
  const text = q.q;
  const blocks: SolutionBlock[] = [];

  let m =
    text.match(/decimal number (\d+) to its binary/i) ||
    text.match(/Convert decimal to binary \((\d+)\)/i) ||
    text.match(/Convert \((\d+)\)10 into a binary/i) ||
    text.match(/binary equivalent of the decimal number (\d+)/i);

  if (m) {
    const n = parseInt(m[1], 10);
    const { result, steps } = decToBin(n, lang);
    const sub = decToBinBySubtract(n);
    blocks.push({ title: `${n} (${t('decimal', lang)})`, lines: [] });
    blocks.push({ title: t('method1', lang), lines: steps });
    blocks.push({ lines: [`${t('readBottomUp', lang)} → ${result}`] });
    blocks.push({
      title: t('method2', lang),
      lines: [`${n} = ${sub.join(' + ')} → ${result}`],
    });
    return blocks;
  }

  m =
    text.match(/decimal equivalent (?:for|of) binary number ([01]+)/i) ||
    text.match(/The decimal equivalent of ([01]+)/i);

  if (m) {
    const { result, parts, cleaned } = binToDec(m[1]);
    blocks.push({ title: `${cleaned} (${t('binary', lang)})`, lines: [] });
    blocks.push({
      lines: [
        t('sumPositions', lang),
        `${parts.join(' + ')} = ${result} (${t('decimal', lang)})`,
      ],
    });
    return blocks;
  }

  m = text.match(/Conversion of binary number ([01]+) to decimal/i);
  if (m) {
    const { result, parts, cleaned } = binToDec(m[1]);
    blocks.push({ title: cleaned, lines: [`${parts.join(' + ')} = ${result}`] });
    return blocks;
  }

  m =
    text.match(/hexadecimal number ([0-9A-Fa-f]+) to binary/i) ||
    text.match(/Conversion of hexadecimal number ([0-9A-Fa-f]+) to binary/i);

  if (m) {
    const { result, steps } = hexToBin(m[1]);
    blocks.push({ title: `${m[1].toUpperCase()} (Hex)`, lines: [t('eachDigit', lang)] });
    blocks.push({ lines: steps });
    blocks.push({ lines: [`${t('result', lang)}: ${result}`] });
    return blocks;
  }

  m = text.match(/hexadecimal representation of the decimal number (\d+)/i);
  if (m) {
    const n = parseInt(m[1], 10);
    const { result } = decToBin(n, lang);
    const hex = n.toString(16).toUpperCase();
    blocks.push({
      lines: [
        `${n} (${t('decimal', lang)}) → ${t('binary', lang)}: ${result}`,
        `${t('groupBits', lang)} ${result} → ${hex} (Hex)`,
        t('tip255', lang),
      ],
    });
    return blocks;
  }

  blocks.push({
    lines: [
      `${t('correctAnswer', lang)} ${q.o?.[q.a] ?? ''}`,
      t('reviewLesson', lang),
    ],
  });
  return blocks;
}
