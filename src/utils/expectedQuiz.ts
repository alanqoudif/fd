import { ALL_QUESTIONS } from '@/data/questions';
import type { McqQuestion } from '@/data/questions';
import {
  EXPECTED_QUESTION_SECTIONS,
  type ExpectedQuestion,
} from '@/data/expectedQuestions';
import { shuffle } from '@/utils/shuffle';

const FALLBACK_DISTRACTORS = [
  'None of the above',
  'All of the above',
  'Not applicable',
  'Unknown',
];

function uniqueAnswers(answers: string[]) {
  return [...new Set(answers.map((a) => a.trim()).filter(Boolean))];
}

function pickDistractors(answer: string, pool: string[], count = 3) {
  const candidates = shuffle(pool.filter((a) => a !== answer));
  const picked: string[] = [];

  for (const c of candidates) {
    if (picked.length >= count) break;
    if (!picked.includes(c)) picked.push(c);
  }

  for (const c of FALLBACK_DISTRACTORS) {
    if (picked.length >= count) break;
    if (c !== answer && !picked.includes(c)) picked.push(c);
  }

  return picked.slice(0, count);
}

function asMcq(mq: McqQuestion): McqQuestion | null {
  if ('o' in mq && mq.o?.length) {
    return { q: mq.q, o: [...mq.o], a: mq.a };
  }
  return null;
}

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function matchFromBank(expected: ExpectedQuestion): McqQuestion | null {
  const eq = expected.q.toLowerCase();

  if (eq.includes('stands for')) {
    const term = eq.split('stands for')[0].replace(/which|what/g, '').trim();
    const found = ALL_QUESTIONS.find(
      (mq) => mq.o && normalize(mq.q).includes(term) && normalize(mq.q).includes('stands for'),
    );
    return found ? asMcq(found) : null;
  }

  const decToBin = eq.match(/decimal\s+(\d+).*binary/);
  if (decToBin) {
    const num = decToBin[1];
    const found = ALL_QUESTIONS.find(
      (mq) =>
        mq.o &&
        mq.q.includes(num) &&
        /decimal/i.test(mq.q) &&
        /binary/i.test(mq.q) &&
        !/hex/i.test(mq.q),
    );
    return found ? asMcq(found) : null;
  }

  const binToDec = eq.match(/binary\s+([01]+).*decimal/);
  if (binToDec) {
    const bits = binToDec[1];
    const found = ALL_QUESTIONS.find(
      (mq) => mq.o && mq.q.includes(bits) && /binary/i.test(mq.q) && /decimal/i.test(mq.q),
    );
    return found ? asMcq(found) : null;
  }

  const hexToBin = eq.match(/hexadecimal\s+([0-9a-f]+).*binary/);
  if (hexToBin) {
    const hex = hexToBin[1].toUpperCase();
    const found = ALL_QUESTIONS.find(
      (mq) => mq.o && mq.q.toUpperCase().includes(hex) && /hexadecimal/i.test(mq.q) && /binary/i.test(mq.q),
    );
    return found ? asMcq(found) : null;
  }

  const decToHex = eq.match(/decimal\s+(\d+).*hexadecimal/);
  if (decToHex) {
    const num = decToHex[1];
    const found = ALL_QUESTIONS.find(
      (mq) => mq.o && mq.q.includes(num) && /decimal/i.test(mq.q) && /hexadecimal/i.test(mq.q),
    );
    return found ? asMcq(found) : null;
  }

  const phraseMatchers: [RegExp, RegExp][] = [
    [/power supply converts/i, /power supply converts/i],
    [/brain of the computer/i, /brain of the computer/i],
    [/spine of the computer/i, /spine of the computer/i],
    [/what does the motherboard do/i, /primary function of the motherboard/i],
    [/stores bios settings/i, /stores the settings for the date, time/i],
    [/loses data when power is off/i, /volatile memory/i],
    [/non-volatile/i, /non-volatile memory/i],
    [/memory is used in laptops/i, /laptops use so-dimm/i],
    [/dimm is mainly used/i, /dimm modules are primarily used in desktop/i],
    [/main purpose of a storage device/i, /primary purpose of a storage device/i],
    [/data is stored in hdd/i, /platter/i],
    [/basic storage unit used in drives/i, /sector/i],
    [/uses magnetic disks/i, /hdd uses/i],
    [/more expensive, hdd or ssd/i, /ssd.*expensive|expensive.*ssd/i],
    [/heavier, hdd or ssd/i, /hdd is heavier/i],
    [/enter bios/i, /enter the bios/i],
    [/first process in the boot sequence/i, /first step in the boot process/i],
    [/loads the operating system into memory/i, /booting is the process/i],
    [/missing operating system/i, /missing operating system/i],
    [/troubleshooting hardware problem/i, /troubleshooting a hardware problem/i],
    [/continuous system reboots/i, /continuous system reboots/i],
    [/blue screen of death/i, /bsod/i],
    [/function of a firewall/i, /function of a firewall/i],
    [/function of a router/i, /purpose of a router/i],
    [/math operations/i, /arithmetic and logic unit/i],
    [/divided by/i, /divided by 2/i],
  ];

  for (const [expectedPattern, bankPattern] of phraseMatchers) {
    if (!expectedPattern.test(expected.q)) continue;
    const found = ALL_QUESTIONS.find((mq) => mq.o && bankPattern.test(mq.q));
    if (found) return asMcq(found);
  }

  const normalizedExpected = normalize(expected.q);
  const found = ALL_QUESTIONS.find((mq) => {
    if (!mq.o) return false;
    const normalizedBank = normalize(mq.q);
    return (
      normalizedBank.includes(normalizedExpected.slice(0, 24)) ||
      normalizedExpected.includes(normalizedBank.slice(0, 24))
    );
  });

  return found ? asMcq(found) : null;
}

function toMcq(question: ExpectedQuestion, sectionAnswers: string[]): McqQuestion {
  const fromBank = matchFromBank(question);
  if (fromBank) return fromBank;

  const pool = uniqueAnswers(sectionAnswers);
  const distractors = pickDistractors(question.answer, pool);
  const options = shuffle([question.answer, ...distractors]);
  const correctIndex = options.indexOf(question.answer);

  return {
    q: question.q,
    o: options,
    a: correctIndex >= 0 ? correctIndex : 0,
  };
}

export function getAllExpectedQuestions() {
  return EXPECTED_QUESTION_SECTIONS.flatMap((section) => section.questions);
}

export function buildExpectedMcqQuestions(): McqQuestion[] {
  return EXPECTED_QUESTION_SECTIONS.flatMap((section) => {
    const sectionAnswers = section.questions.map((q) => q.answer);
    return section.questions.map((q) => toMcq(q, sectionAnswers));
  });
}

export function buildExpectedQuiz(count: number): McqQuestion[] {
  const all = buildExpectedMcqQuestions();
  if (count >= all.length) return shuffle(all);
  return shuffle(all).slice(0, count);
}

export function resolveExpectedQuestions(keys: string[]): McqQuestion[] {
  const map = new Map(buildExpectedMcqQuestions().map((q) => [q.q, q]));
  return keys.map((k) => map.get(k)).filter((q): q is McqQuestion => !!q);
}
