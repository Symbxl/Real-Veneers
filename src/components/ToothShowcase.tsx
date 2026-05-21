"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ToothModel from "./ToothModelLoader";
import type { ToothType } from "./ToothModel";

const LABELS: Record<ToothType, string> = {
  incisor: "Incisor",
  canine: "Canine",
  premolar: "Premolar",
  molar: "Molar",
};

export default function ToothShowcase() {
  const [type, setType] = useState<ToothType>("incisor");

  return (
    <div>
      <div className="relative aspect-[4/3] w-full">
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-accent-soft/60 via-transparent to-transparent blur-3xl" />
        <div className="relative h-full w-full">
          {/* Auto mode: a calm spin, then a quick whip that swaps to the
              next tooth at its peak — handled inside the 3D scene. */}
          <ToothModel auto onTypeChange={setType} />
        </div>
      </div>

      <div className="relative mt-6 h-8">
        <AnimatePresence mode="wait">
          <motion.span
            key={type}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-x-0 font-display text-2xl tracking-tight"
          >
            {LABELS[type]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
