"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  MeshTransmissionMaterial,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type ToothType = "incisor" | "canine" | "premolar" | "molar";

// Where the bottom of every (normalized) tooth sits on the Y axis.
const FLOOR = -1.28;
// Target longest dimension — every tooth is scaled to roughly this so the
// camera framing stays consistent as you switch types.
const TARGET = 2.45;

interface Profile {
  topW: number; // half-width at the cervical (gum) edge
  botW: number; // half-width at the incisal / occlusal edge
  topY: number;
  botY: number;
  depth: number; // facio-lingual thickness
  cornerR: number;
  cusps: number; // lobes along the biting edge (1 = single point)
  cuspDepth: number; // how far those lobes dip below botY
  bulge: number; // convexity of the front face
}

const PROFILES: Record<ToothType, Profile> = {
  // Flat, wide, chisel-edged — barely-there mamelons on the biting edge.
  incisor: {
    topW: 0.5, botW: 0.78, topY: 1.2, botY: -1.14,
    depth: 0.46, cornerR: 0.22, cusps: 3, cuspDepth: 0.05, bulge: 0.1,
  },
  // Long and narrow, tapering to a single pronounced cusp.
  canine: {
    topW: 0.46, botW: 0.58, topY: 1.3, botY: -1.32,
    depth: 0.58, cornerR: 0.2, cusps: 1, cuspDepth: 0.34, bulge: 0.16,
  },
  // Compact, chunkier, with two cusps.
  premolar: {
    topW: 0.6, botW: 0.7, topY: 0.98, botY: -0.92,
    depth: 0.78, cornerR: 0.28, cusps: 2, cuspDepth: 0.2, bulge: 0.21,
  },
  // Broad, short crown, deep, with four cusps.
  molar: {
    topW: 0.95, botW: 1.05, topY: 0.82, botY: -0.78,
    depth: 1.0, cornerR: 0.34, cusps: 4, cuspDepth: 0.13, bulge: 0.24,
  },
};

function buildToothGeometry(type: ToothType): THREE.BufferGeometry {
  const p = PROFILES[type];
  const shape = new THREE.Shape();
  const xR = p.botW - p.cornerR;
  const xL = -xR;
  const tipY = p.topY - 0.05;

  // Cervical (top) edge — gently convex
  shape.moveTo(-p.topW, tipY);
  shape.quadraticCurveTo(0, p.topY + 0.08, p.topW, tipY);
  // Right side
  shape.bezierCurveTo(
    p.topW + 0.05, p.topY - 0.5,
    p.botW + 0.02, p.botY + 0.8,
    p.botW, p.botY + p.cornerR
  );
  // Right corner
  shape.quadraticCurveTo(p.botW, p.botY, xR, p.botY);
  // Biting edge — scalloped into `cusps` lobes
  const steps = Math.max(18, p.cusps * 16);
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const x = xR + (xL - xR) * t;
    const y = p.botY - p.cuspDepth * Math.abs(Math.sin(p.cusps * Math.PI * t));
    shape.lineTo(x, y);
  }
  // Left corner
  shape.quadraticCurveTo(-p.botW, p.botY, -p.botW, p.botY + p.cornerR);
  // Left side
  shape.bezierCurveTo(
    -p.botW - 0.02, p.botY + 0.8,
    -p.topW - 0.05, p.topY - 0.5,
    -p.topW, tipY
  );

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: p.depth,
    bevelEnabled: true,
    bevelThickness: 0.16,
    bevelSize: 0.16,
    bevelSegments: 12,
    curveSegments: 32,
  });
  geom.translate(0, 0, -p.depth / 2);

  // Sculpt: hollow the lingual side, bulge the labial side, and add a touch
  // of cusp relief in the biting third.
  const pos = geom.attributes.position;
  const maxW = p.botW + 0.18;
  const maxH = p.topY + 0.18;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (z < -0.12) {
      const dish = 0.06 * (1 - (x * x) / (maxW * maxW));
      pos.setZ(i, z * 0.7 + dish);
    } else if (z > 0.12) {
      const bulge =
        p.bulge *
        Math.max(0, 1 - (x * x) / (maxW * maxW)) *
        Math.max(0, 1 - (y * y) / (maxH * maxH));
      const incisal = Math.max(0, (p.botY * 0.45 - y) / 0.6);
      const relief =
        p.cusps > 1
          ? 0.05 * Math.cos(x * p.cusps * 3) * incisal
          : 0.02 * Math.cos(x * 7) * incisal;
      pos.setZ(i, z + bulge + relief);
    }
  }
  geom.computeVertexNormals();

  // Normalize size + seat the tooth on the floor so framing stays steady.
  geom.computeBoundingBox();
  const size = new THREE.Vector3();
  geom.boundingBox!.getSize(size);
  const k = TARGET / Math.max(size.x, size.y);
  geom.scale(k, k, k);
  geom.computeBoundingBox();
  const bb = geom.boundingBox!;
  geom.translate(-(bb.min.x + bb.max.x) / 2, FLOOR - bb.min.y, 0);
  return geom;
}

function ToothMesh({ type }: { type: ToothType }) {
  const geometry = useMemo(() => buildToothGeometry(type), [type]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <MeshTransmissionMaterial
        thickness={0.85}
        roughness={0.1}
        transmission={0.45}
        ior={1.55}
        chromaticAberration={0.03}
        clearcoat={1}
        clearcoatRoughness={0.06}
        attenuationColor="#f7eedd"
        attenuationDistance={1.2}
        color="#fbf8f0"
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// The order the auto showcase cycles through.
const CYCLE: ToothType[] = ["incisor", "canine", "premolar", "molar"];

// Auto-rotating showcase: the tooth spins slowly, then whips into a quick
// spin during which it swaps to the next tooth — the swap lands at the peak
// of the spin (and a small scale dip) so it reads as one clean transition.
function AutoTooth({
  onTypeChange,
}: {
  onTypeChange?: (t: ToothType) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [typeIndex, setTypeIndex] = useState(0);
  const state = useRef({
    phase: "slow" as "slow" | "fast",
    t: 0,
    swapped: false,
  });

  useEffect(() => {
    onTypeChange?.(CYCLE[typeIndex]);
  }, [typeIndex, onTypeChange]);

  useFrame((_, rawDelta) => {
    const g = groupRef.current;
    if (!g) return;
    // Clamp so a backgrounded tab doesn't jump the rotation on return.
    const delta = Math.min(rawDelta, 0.05);
    const s = state.current;
    s.t += delta;

    const SLOW_DUR = 3.2; // seconds of calm rotation
    const FAST_DUR = 0.9; // seconds of the quick transition spin
    const SLOW_SPEED = 0.5; // rad/s
    const FAST_SPEED = 16; // rad/s added at the peak of the whip

    if (s.phase === "slow") {
      g.rotation.y += SLOW_SPEED * delta;
      if (s.t >= SLOW_DUR) {
        s.phase = "fast";
        s.t = 0;
        s.swapped = false;
      }
    } else {
      const p = Math.min(1, s.t / FAST_DUR);
      const ease = Math.sin(p * Math.PI); // 0 → 1 → 0: accelerate, decelerate
      g.rotation.y += (SLOW_SPEED + FAST_SPEED * ease) * delta;

      // Swap teeth at the peak of the whip — the tooth is spinning fastest
      // there, so the geometry change is hidden by the motion.
      if (!s.swapped && p >= 0.5) {
        s.swapped = true;
        setTypeIndex((i) => (i + 1) % CYCLE.length);
      }
      if (s.t >= FAST_DUR) {
        s.phase = "slow";
        s.t = 0;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <ToothMesh type={CYCLE[typeIndex]} />
    </group>
  );
}

export default function ToothModel({
  type = "incisor",
  auto = false,
  autoRotate = false,
  onTypeChange,
}: {
  type?: ToothType;
  auto?: boolean;
  autoRotate?: boolean;
  onTypeChange?: (t: ToothType) => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [3.2, 1.4, 5.4], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      className="!touch-none"
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#f0e3cf" />
      <pointLight position={[0, 0, 3]} intensity={0.35} color="#ffb070" />

      <Suspense fallback={null}>
        {auto ? (
          <AutoTooth onTypeChange={onTypeChange} />
        ) : (
          <ToothMesh type={type} />
        )}

        <ContactShadows
          position={[0, FLOOR - 0.2, 0]}
          opacity={0.45}
          scale={7}
          blur={2.4}
          far={3}
          color="#1a1612"
        />

        <Environment preset="studio" environmentIntensity={0.7} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.7}
        autoRotate={autoRotate}
        autoRotateSpeed={1.1}
      />
    </Canvas>
  );
}
