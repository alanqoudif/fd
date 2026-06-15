import confetti from 'canvas-confetti';

const EMOJIS = ['🎉', '🎊', '✨', '🥳', '⭐', '💫'];

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function emojiShape(text: string) {
  return confetti.shapeFromText({ text, scalar: 1.8 });
}

export function celebrateCorrect() {
  if (prefersReducedMotion()) return;

  const origin = { y: 0.62 };

  confetti({
    particleCount: 55,
    spread: 75,
    startVelocity: 38,
    origin,
    ticks: 180,
    colors: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'],
  });

  window.setTimeout(() => {
    confetti({
      particleCount: 22,
      spread: 100,
      startVelocity: 28,
      origin: { x: 0.2, y: 0.65 },
      shapes: EMOJIS.slice(0, 3).map(emojiShape),
      scalar: 1.6,
      ticks: 200,
    });
    confetti({
      particleCount: 22,
      spread: 100,
      startVelocity: 28,
      origin: { x: 0.8, y: 0.65 },
      shapes: EMOJIS.slice(3).map(emojiShape),
      scalar: 1.6,
      ticks: 200,
    });
  }, 120);
}
