"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const WORDS = ["Veneers", "Should", "Look", "Real"];

// Words reveal across the scroll.
const WORDS_END = 0.5;

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * WORDS_END;
  const end = ((index + 1) / total) * WORDS_END;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [24, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {word}
    </motion.span>
  );
}

// Closing statement — reveals line by line once the photos have settled,
// fading and lifting up with a soft blur so it feels like a graceful sign-off.
function Outro({ progress }: { progress: MotionValue<number> }) {
  // Reveal the closing statement on scroll-down and leave it in place — it
  // only unwinds again when the user scrolls back up.
  const line1Opacity = useTransform(progress, [0.64, 0.78], [0, 1]);
  const line1Y = useTransform(progress, [0.64, 0.78], [26, 0]);
  const line1Blur = useTransform(progress, [0.64, 0.78], ["8px", "0px"]);

  const line2Opacity = useTransform(progress, [0.74, 0.86], [0, 1]);
  const line2Y = useTransform(progress, [0.74, 0.86], [26, 0]);
  const line2Blur = useTransform(progress, [0.74, 0.86], ["8px", "0px"]);

  return (
    <div className="absolute inset-x-0 bottom-[10vh] flex flex-col items-center px-6 text-center">
      <p className="font-display text-[clamp(1.5rem,3.4vw,3rem)] leading-[1.15] tracking-tight">
        <motion.span
          style={{ opacity: line1Opacity, y: line1Y, filter: line1Blur }}
          className="block"
        >
          Veneers aren&apos;t a procedure.
        </motion.span>
        <motion.span
          style={{ opacity: line2Opacity, y: line2Y, filter: line2Blur }}
          className="block italic text-foreground/70"
        >
          They&apos;re a portrait.
        </motion.span>
      </p>
    </div>
  );
}

export default function RealSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-[260vh] bg-white">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 overflow-hidden">
        <h2 className="z-40 flex justify-center gap-x-[0.5em] whitespace-nowrap font-display text-[clamp(1.25rem,6.2vw,6rem)] leading-[1] tracking-tight text-center">
          {WORDS.map((word, i) => (
            <Word
              key={word}
              word={word}
              index={i}
              total={WORDS.length}
              progress={scrollYProgress}
            />
          ))}
        </h2>

        <Outro progress={scrollYProgress} />
      </div>
    </section>
  );
}
