import type { McqQuestion } from '../data/questions';
import { decToBin, binToDec, hexToBin, decToBinBySubtract } from './conversion';
import type { ExplainLang } from './storage';

export type DivisionStep = { num: number; quot: number; rem: number };

export type Dec2BinVisual = {
  type: 'dec2bin';
  decimal: number;
  divisions: DivisionStep[];
  remainders: string[];
  result: string;
  subtractParts: number[];
};

export type Bin2DecVisual = {
  type: 'bin2dec';
  binary: string;
  columns: { bit: string; power: number; value: number; active: boolean }[];
  parts: number[];
  sum: number;
};

export type Hex2BinVisual = {
  type: 'hex2bin';
  hex: string;
  digits: { char: string; bits: string }[];
  result: string;
};

export type Dec2HexVisual = {
  type: 'dec2hex';
  decimal: number;
  binary: string;
  groups: { bits: string; hex: string }[];
  result: string;
};

export type VisualExplain = Dec2BinVisual | Bin2DecVisual | Hex2BinVisual | Dec2HexVisual;

export function getVisualExplanation(q: McqQuestion, lang: ExplainLang): VisualExplain | null {
  const text = q.q;

  let m =
    text.match(/decimal number (\d+) to its binary/i) ||
    text.match(/Convert decimal to binary \((\d+)\)/i) ||
    text.match(/Convert \((\d+)\)10 into a binary/i) ||
    text.match(/binary equivalent of the decimal number (\d+)/i);

  if (m) {
    const decimal = parseInt(m[1], 10);
    const { result, steps } = decToBin(decimal, lang);
    const divisions: DivisionStep[] = steps.map((line) => {
      const match = line.match(/^(\d+) ÷ 2 = (\d+)\s+\S+\s+(\d)/);
      if (!match) return { num: 0, quot: 0, rem: 0 };
      return { num: +match[1], quot: +match[2], rem: +match[3] };
    });
    return {
      type: 'dec2bin',
      decimal,
      divisions,
      remainders: result.split(''),
      result,
      subtractParts: decToBinBySubtract(decimal),
    };
  }

  m =
    text.match(/decimal equivalent (?:for|of) binary number ([01]+)/i) ||
    text.match(/The decimal equivalent of ([01]+)/i) ||
    text.match(/Conversion of binary number ([01]+) to decimal/i);

  if (m) {
    const { result, parts, cleaned } = binToDec(m[1]);
    const bits = cleaned.split('');
    const rev = [...bits].reverse();
    const columns = rev.map((bit, i) => ({
      bit,
      power: 2 ** i,
      value: bit === '1' ? 2 ** i : 0,
      active: bit === '1',
    }));
    return { type: 'bin2dec', binary: cleaned, columns: [...columns].reverse(), parts, sum: result };
  }

  m =
    text.match(/hexadecimal number ([0-9A-Fa-f]+) to binary/i) ||
    text.match(/Conversion of hexadecimal number ([0-9A-Fa-f]+) to binary/i);

  if (m) {
    const hex = m[1].toUpperCase();
    const { result, steps } = hexToBin(hex);
    const digits = steps.map((line) => {
      const [char, bits] = line.split(' = ');
      return { char, bits };
    });
    return { type: 'hex2bin', hex, digits, result };
  }

  m = text.match(/hexadecimal representation of the decimal number (\d+)/i);
  if (m) {
    const decimal = parseInt(m[1], 10);
    const { result: binary } = decToBin(decimal, lang);
    const padded = binary.padStart(Math.ceil(binary.length / 4) * 4, '0');
    const groups: { bits: string; hex: string }[] = [];
    for (let i = 0; i < padded.length; i += 4) {
      const bits = padded.slice(i, i + 4);
      groups.push({ bits, hex: parseInt(bits, 2).toString(16).toUpperCase() });
    }
    return {
      type: 'dec2hex',
      decimal,
      binary: padded,
      groups,
      result: decimal.toString(16).toUpperCase(),
    };
  }

  return null;
}
