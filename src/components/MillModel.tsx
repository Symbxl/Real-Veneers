"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  RoundedBox,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

// Proportions calibrated from the reference photo (≈ 1.8 : 1 width:height,
// tiered base wider than main body, dark band occupies mid-front).
const MAIN_W = 4.6;
const MAIN_H = 1.95;
const MAIN_D = 2.4;

const BASE_W = 5.05;
const BASE_H = 0.78;
const BASE_D = 2.6;

const TOTAL_H = MAIN_H + BASE_H;
const MAIN_Y = (TOTAL_H - MAIN_H) / 2 - MAIN_H / 2 + BASE_H / 2; // sit on top of base
const BASE_Y = -TOTAL_H / 2 + BASE_H / 2;

const SHELL_COLOR = "#f6f5f1";
const SHELL_WARM = "#ecebe5";
const PANEL_DARK = "#16171a";
const PANEL_DEEP = "#070809";
const RIM_COLOR = "#27282c";
const LOGO_COLOR = "#9a9a9d";
const BASE_LOGO_COLOR = "#5b5a56";

/* ----- Sirona "D" mark (stylized triangular-D shape) ----------------------- */
function dLogoGeometry() {
  // Approx D-with-notch silhouette: vertical left edge, arced right, inner cut.
  const r = 0.5;
  const outer = new THREE.Shape();
  outer.moveTo(-r * 0.55, -r);
  outer.lineTo(-r * 0.55, r);
  outer.lineTo(0, r);
  outer.absarc(0, 0, r, Math.PI / 2, -Math.PI / 2, true);
  outer.lineTo(-r * 0.55, -r);

  // Small inner notch giving the mark its identity
  const notch = new THREE.Path();
  notch.moveTo(-r * 0.15, -r * 0.35);
  notch.lineTo(r * 0.35, r * 0.05);
  notch.lineTo(-r * 0.15, r * 0.45);
  notch.lineTo(-r * 0.15, -r * 0.35);
  outer.holes.push(notch);

  return new THREE.ShapeGeometry(outer);
}

/* ----- White shell ---------------------------------------------------------- */
function Shell() {
  return (
    <group>
      {/* Wider base tier */}
      <RoundedBox
        args={[BASE_W, BASE_H, BASE_D]}
        radius={0.32}
        smoothness={6}
        creaseAngle={0.5}
        position={[0, BASE_Y, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={SHELL_WARM}
          roughness={0.5}
          metalness={0.03}
          clearcoat={0.35}
          clearcoatRoughness={0.35}
          sheen={0.15}
          sheenColor="#ffffff"
        />
      </RoundedBox>

      {/* Main body sits on the base, slightly inset */}
      <RoundedBox
        args={[MAIN_W, MAIN_H, MAIN_D]}
        radius={0.36}
        smoothness={6}
        creaseAngle={0.45}
        position={[0, MAIN_Y, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={SHELL_COLOR}
          roughness={0.42}
          metalness={0.04}
          clearcoat={0.5}
          clearcoatRoughness={0.28}
          sheen={0.2}
          sheenColor="#ffffff"
          sheenRoughness={0.6}
        />
      </RoundedBox>

      {/* Shadow seam where main body meets base */}
      <mesh
        position={[0, MAIN_Y - MAIN_H / 2 + 0.005, BASE_D / 2 + 0.002]}
        renderOrder={1}
      >
        <planeGeometry args={[MAIN_W * 0.96, 0.02]} />
        <meshBasicMaterial color="#b9b7b1" transparent opacity={0.55} />
      </mesh>

      {/* Sirona D mark on the front of the base */}
      <mesh
        position={[0, BASE_Y + 0.04, BASE_D / 2 + 0.003]}
        scale={[0.32, 0.32, 0.32]}
        geometry={useMemo(() => dLogoGeometry(), [])}
      >
        <meshBasicMaterial color={BASE_LOGO_COLOR} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ----- Milling spindle (housing + collar + tool bit) ---------------------- */
function Spindle({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      {/* Upper housing — heavier cylinder near the chamber roof */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.085, 0.085, 0.18, 20]} />
        <meshPhysicalMaterial
          color="#eeece5"
          roughness={0.3}
          metalness={0.28}
          clearcoat={0.55}
          clearcoatRoughness={0.22}
        />
      </mesh>
      {/* Mid shaft */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.062, 0.07, 0.2, 20]} />
        <meshPhysicalMaterial
          color="#e6e3db"
          roughness={0.35}
          metalness={0.3}
          clearcoat={0.45}
          clearcoatRoughness={0.28}
        />
      </mesh>
      {/* Chuck collar */}
      <mesh position={[0, -0.025, 0]} castShadow>
        <cylinderGeometry args={[0.048, 0.05, 0.06, 20]} />
        <meshStandardMaterial color="#5d5d61" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Tool bit */}
      <mesh position={[0, -0.12, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.013, 0.16, 14]} />
        <meshStandardMaterial color="#2d2d31" roughness={0.25} metalness={0.85} />
      </mesh>
    </group>
  );
}

/* ----- Chamber: rim, recessed interior, platform, spindles, glass tint ---- */
function Chamber({ size, z }: { size: number; z: number }) {
  return (
    <group position={[0, 0, z]}>
      {/* Outer dark rim */}
      <RoundedBox
        args={[size + 0.06, size + 0.06, 0.04]}
        radius={0.07}
        smoothness={5}
        position={[0, 0, -0.01]}
      >
        <meshStandardMaterial color={RIM_COLOR} roughness={0.35} metalness={0.3} />
      </RoundedBox>

      {/* Recessed interior box, opening backwards so we see inside */}
      <mesh position={[0, 0, -0.18]}>
        <boxGeometry args={[size * 0.92, size * 0.92, 0.34]} />
        <meshStandardMaterial
          color={PANEL_DEEP}
          roughness={0.85}
          metalness={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Internal floor / work platform */}
      <mesh position={[0, -size * 0.36, -0.08]}>
        <boxGeometry args={[size * 0.72, 0.04, 0.22]} />
        <meshStandardMaterial color="#3a3a3e" roughness={0.4} metalness={0.55} />
      </mesh>

      {/* Two spindles hanging from the chamber roof */}
      <group position={[0, size * 0.08, -0.06]}>
        <Spindle x={-size * 0.18} />
        <Spindle x={size * 0.18} />
      </group>

      {/* Subtle glass reflection — angled highlight band */}
      <mesh
        position={[-size * 0.22, size * 0.18, 0.012]}
        rotation={[0, 0, -0.32]}
      >
        <planeGeometry args={[size * 0.14, size * 0.62]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.07} />
      </mesh>
      <mesh
        position={[size * 0.18, -size * 0.22, 0.012]}
        rotation={[0, 0, -0.32]}
      >
        <planeGeometry args={[size * 0.08, size * 0.32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

/* ----- Touchscreen with pale-blue UI suggestion --------------------------- */
function Screen({ w, h, z }: { w: number; h: number; z: number }) {
  return (
    <group position={[0, 0, z]}>
      {/* Bezel */}
      <RoundedBox
        args={[w, h, 0.03]}
        radius={0.035}
        smoothness={5}
        position={[0, 0, -0.005]}
      >
        <meshStandardMaterial color="#0a0a0c" roughness={0.3} metalness={0.4} />
      </RoundedBox>

      {/* LCD active area */}
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[w * 0.9, h * 0.86]} />
        <meshStandardMaterial
          color="#eef2f6"
          emissive="#b5cce0"
          emissiveIntensity={0.4}
          roughness={0.14}
          metalness={0}
        />
      </mesh>

      {/* Header strip */}
      <mesh position={[-w * 0.1, h * 0.3, 0.014]}>
        <planeGeometry args={[w * 0.6, h * 0.08]} />
        <meshBasicMaterial color="#6f96bd" />
      </mesh>

      {/* List rows */}
      {[0.13, 0.0, -0.13, -0.26].map((yN, i) => (
        <mesh key={i} position={[-w * 0.1, h * yN, 0.014]}>
          <planeGeometry args={[w * 0.6, h * 0.06]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#d5dde6" : "#c4d0de"} />
        </mesh>
      ))}

      {/* Right-side icon column */}
      <mesh position={[w * 0.32, h * 0.0, 0.014]}>
        <planeGeometry args={[w * 0.1, h * 0.7]} />
        <meshBasicMaterial color="#bbc7d4" />
      </mesh>
      {/* Icon dots in the column */}
      {[-0.22, -0.08, 0.06, 0.2].map((yN, i) => (
        <mesh key={i} position={[w * 0.32, h * yN, 0.015]}>
          <circleGeometry args={[h * 0.025, 16]} />
          <meshBasicMaterial color="#6783a0" />
        </mesh>
      ))}
    </group>
  );
}

/* ----- Dark front panel with all the inset hardware ----------------------- */
function FrontPanel() {
  const panelW = MAIN_W * 0.9;
  const panelH = MAIN_H * 0.74;
  const panelZ = MAIN_D / 2 + 0.008;
  const dGeom = useMemo(() => dLogoGeometry(), []);

  const chamberSize = panelH * 0.78;
  const screenW = panelH * 0.78;
  const screenH = panelH * 0.62;

  return (
    <group position={[0, MAIN_Y + MAIN_H * 0.04, panelZ]}>
      {/* Dark inset panel */}
      <RoundedBox
        args={[panelW, panelH, 0.045]}
        radius={0.09}
        smoothness={5}
        position={[0, 0, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color={PANEL_DARK}
          roughness={0.32}
          metalness={0.2}
          clearcoat={0.65}
          clearcoatRoughness={0.18}
        />
      </RoundedBox>

      {/* Sirona D mark — top-left of dark panel */}
      <mesh
        position={[-panelW * 0.44, panelH * 0.36, 0.026]}
        scale={[0.13, 0.13, 0.13]}
        geometry={dGeom}
      >
        <meshBasicMaterial color={LOGO_COLOR} side={THREE.DoubleSide} />
      </mesh>

      {/* Chamber — slightly left of center */}
      <group position={[-panelW * 0.16, panelH * 0.02, 0.012]}>
        <Chamber size={chamberSize} z={0} />
      </group>

      {/* Screen — right side */}
      <group position={[panelW * 0.29, panelH * 0.04, 0.012]}>
        <Screen w={screenW} h={screenH} z={0} />
      </group>

      {/* CEREC wordmark — light text suggested by thin white bar */}
      <mesh position={[-panelW * 0.16, -panelH * 0.42, 0.026]}>
        <planeGeometry args={[panelW * 0.28, 0.05]} />
        <meshBasicMaterial color="#dadadc" transparent opacity={0.85} />
      </mesh>
      {/* Underline accent for the wordmark */}
      <mesh position={[-panelW * 0.22, -panelH * 0.47, 0.026]}>
        <planeGeometry args={[panelW * 0.05, 0.006]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>

      {/* Two status indicator lights below the screen */}
      <mesh position={[panelW * 0.2, -panelH * 0.42, 0.026]}>
        <circleGeometry args={[0.022, 20]} />
        <meshStandardMaterial
          color="#7fe2a0"
          emissive="#7fe2a0"
          emissiveIntensity={0.75}
        />
      </mesh>
      <mesh position={[panelW * 0.26, -panelH * 0.42, 0.026]}>
        <circleGeometry args={[0.022, 20]} />
        <meshStandardMaterial color="#3a3a3e" roughness={0.5} />
      </mesh>

      {/* Very subtle vertical seam between chamber zone and screen zone */}
      <mesh position={[panelW * 0.06, 0, 0.025]}>
        <planeGeometry args={[0.006, panelH * 0.82]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* ----- Composition + auto-sway ------------------------------------------- */
function Mill() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.22;
    ref.current.rotation.x = Math.sin(t * 0.14) * 0.02;
  });
  return (
    <group ref={ref}>
      <Shell />
      <FrontPanel />
    </group>
  );
}

export default function MillModel() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [3.6, 1.2, 6.6], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      className="!touch-none"
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 5, 5]}
        intensity={1.15}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.45} color="#f1e7d4" />
      <pointLight position={[0, 0.6, 3.2]} intensity={0.32} color="#ffffff" />
      <pointLight position={[-2, -1, 2]} intensity={0.18} color="#cfd9e6" />

      <Suspense fallback={null}>
        <Mill />
        <ContactShadows
          position={[0, -TOTAL_H / 2 - 0.05, 0]}
          opacity={0.5}
          scale={9}
          blur={2.6}
          far={3.5}
          color="#1a1612"
        />
        <Environment preset="studio" environmentIntensity={0.78} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.9}
        autoRotate={false}
      />
    </Canvas>
  );
}
