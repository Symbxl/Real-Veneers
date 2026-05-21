"use client";

import { useState } from "react";

type Patient = {
  name: string;
  caseType: string;
  age: string;
  notes: string;
};

const patients: Patient[] = [
  {
    name: "Madison",
    caseType: "Full upper veneers · 10 units",
    age: "Age 32",
    notes:
      "Reshaped a narrow arch and corrected worn incisal edges. Warm A1 shade with subtle translucency.",
  },
  {
    name: "Daniel",
    caseType: "Smile makeover · 16 units",
    age: "Age 45",
    notes:
      "Closed long-standing diastemas and rebuilt vertical height. Designed to read masculine and natural.",
  },
  {
    name: "Priya",
    caseType: "Upper veneers · 8 units",
    age: "Age 28",
    notes:
      "Brightened heavily tetracycline-stained enamel without an over-white finish. High-gloss surface texture.",
  },
  {
    name: "Marcus",
    caseType: "Anterior veneers · 6 units",
    age: "Age 38",
    notes:
      "Single visit prep, two-day delivery. Subtle warm cream tone matched to existing canines.",
  },
];

// SVG placeholder "before/after" — a stylized portrait silhouette
// with a slider revealing two states.
function BeforeAfter({ patient, index }: { patient: Patient; index: number }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="group relative">
      <div
        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-foreground select-none cursor-ew-resize"
        onPointerMove={(e) => {
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          setPos(Math.max(4, Math.min(96, x)));
        }}
      >
        {/* BEFORE layer */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #3a2e22 0%, #1d1812 60%, #0e0a07 100%)",
          }}
        >
          <PortraitSVG variant="before" seed={index} />
          <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-background bg-foreground/60 backdrop-blur px-3 py-1.5 rounded-full border border-background/20">
            Before
          </div>
        </div>

        {/* AFTER layer (clipped) */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 0 0 ${pos}%)`,
            background:
              "linear-gradient(165deg, #fbf4e6 0%, #f1e2c8 50%, #d9c19a 100%)",
          }}
        >
          <PortraitSVG variant="after" seed={index} />
          <div className="absolute top-4 right-4 text-[10px] tracking-[0.3em] uppercase text-foreground bg-background/90 backdrop-blur px-3 py-1.5 rounded-full border border-accent/40">
            After
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-background pointer-events-none shadow-[0_0_20px_rgba(0,0,0,0.4)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-background border-2 border-accent grid place-items-center text-foreground shadow-xl">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/><polyline points="9 6 15 12 9 18" transform="translate(6 0)"/></svg>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="font-display text-2xl">{patient.name}</div>
          <div className="mt-1 text-xs tracking-[0.18em] uppercase text-foreground-muted">
            {patient.caseType} · {patient.age}
          </div>
        </div>
        <div className="text-accent text-2xl font-display leading-none">
          0{index + 1}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground-muted max-w-md">
        {patient.notes}
      </p>
    </div>
  );
}

function PortraitSVG({
  variant,
  seed,
}: {
  variant: "before" | "after";
  seed: number;
}) {
  const isAfter = variant === "after";
  // Dramatic stylized smile illustration — close-up framing on lips + teeth.
  const lipOuter = isAfter ? "#9c4d4b" : "#3d2622";
  const lipInner = isAfter ? "#7a3d3b" : "#1a0f0d";
  const mouthBg = isAfter ? "#3b1f1d" : "#080604";
  const tooth = isAfter ? "#fcf8ee" : "#7a6b4f";
  const toothShade = isAfter ? "#e8dec6" : "#5a4f3a";
  const gum = isAfter ? "#c97a76" : "#4a2a28";
  const offsetX = (seed % 2 === 0 ? -10 : 8);

  return (
    <svg
      viewBox="0 0 400 500"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`vignette-${variant}-${seed}`} cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity={isAfter ? 0.25 : 0.55} />
        </radialGradient>
        <linearGradient id={`lip-${variant}-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={lipOuter} />
          <stop offset="100%" stopColor={lipInner} />
        </linearGradient>
      </defs>

      {/* Soft face glow (skin) */}
      <ellipse
        cx={200 + offsetX}
        cy={250}
        rx={260}
        ry={300}
        fill={isAfter ? "rgba(251,237,210,0.6)" : "rgba(60,40,28,0.5)"}
      />

      {/* Mouth area — large, close-up */}
      <g transform={`translate(${200 + offsetX}, 280)`}>
        {/* Upper lip */}
        <path
          d="M -160 0 C -120 -45, -60 -55, 0 -42 C 60 -55, 120 -45, 160 0 C 130 -10, 80 -18, 0 -15 C -80 -18, -130 -10, -160 0 Z"
          fill={`url(#lip-${variant}-${seed})`}
        />
        {/* Mouth interior (dark cavity) */}
        <path
          d={`M -150 0 Q 0 ${isAfter ? 35 : 18} 150 0 Q 0 ${
            isAfter ? 18 : 10
          } -150 0 Z`}
          fill={mouthBg}
        />

        {/* Teeth row */}
        <g>
          {Array.from({ length: 10 }).map((_, i) => {
            const t = (i - 4.5) / 4.5; // -1..1
            const x = t * 130;
            // central incisors larger
            const sizeScale = 1 - Math.abs(t) * 0.45;
            const w = (isAfter ? 28 : 18) * sizeScale;
            const h = (isAfter ? 38 : 18) * sizeScale;
            const yOff = Math.abs(t) * (isAfter ? 4 : 8); // arch
            return (
              <g key={i} transform={`translate(${x}, ${1 + yOff})`}>
                <rect
                  x={-w / 2}
                  y={0}
                  width={w}
                  height={h}
                  rx={w * 0.32}
                  fill={tooth}
                />
                {/* shading on the side */}
                <rect
                  x={w / 2 - w * 0.25}
                  y={2}
                  width={w * 0.25}
                  height={h - 4}
                  rx={w * 0.18}
                  fill={toothShade}
                  opacity={isAfter ? 0.5 : 0.9}
                />
                {/* highlight on the front */}
                {isAfter && (
                  <rect
                    x={-w / 2 + w * 0.18}
                    y={3}
                    width={w * 0.22}
                    height={h * 0.45}
                    rx={w * 0.12}
                    fill="white"
                    opacity={0.55}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Gum line (only after — visible healthy gum) */}
        {isAfter && (
          <path
            d="M -135 0 Q 0 -8 135 0 Q 0 -2 -135 0"
            fill={gum}
            opacity="0.7"
          />
        )}

        {/* Lower lip */}
        <path
          d={`M -160 ${isAfter ? 42 : 22} C -120 ${
            isAfter ? 88 : 50
          }, 120 ${isAfter ? 88 : 50}, 160 ${
            isAfter ? 42 : 22
          } C 100 ${isAfter ? 58 : 32}, -100 ${isAfter ? 58 : 32}, -160 ${
            isAfter ? 42 : 22
          } Z`}
          fill={`url(#lip-${variant}-${seed})`}
        />
      </g>

      {/* Sparkle on after */}
      {isAfter && (
        <g transform={`translate(${240 + offsetX}, 275)`}>
          <circle r="4" fill="white" />
          <circle r="2" cx="-12" cy="6" fill="white" opacity="0.8" />
          <circle r="1.5" cx="8" cy="-4" fill="white" opacity="0.6" />
        </g>
      )}

      {/* Vignette */}
      <rect
        x="0"
        y="0"
        width="400"
        height="500"
        fill={`url(#vignette-${variant}-${seed})`}
      />
    </svg>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 lg:py-36 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
              Meet our <span className="italic">models.</span>
            </h2>
          </div>
          <p className="max-w-md text-foreground-muted">
            Every smile is photographed in natural light, untouched.
            Drag the slider on each portrait to see the transformation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-16">
          {patients.map((p, i) => (
            <BeforeAfter key={p.name} patient={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
