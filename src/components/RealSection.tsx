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

export default function RealSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-[120vh] md:h-[170vh] bg-white">
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
      </div>
    </section>
  );
}
