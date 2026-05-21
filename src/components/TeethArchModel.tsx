"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type ToothType = "central" | "lateral" | "canine" | "premolar" | "molar";

interface ToothSpec {
  type: ToothType;
  width: number;
  height: number;
  depth: number;
}

const TOOTH_SPECS: ToothSpec[] = [
  { type: "central", width: 0.46, height: 0.66, depth: 0.36 },
  { type: "lateral", width: 0.34, height: 0.58, depth: 0.32 },
  { type: "canine", width: 0.36, height: 0.72, depth: 0.4 },
  { type: "premolar", width: 0.4, height: 0.54, depth: 0.44 },
  { type: "premolar", width: 0.42, height: 0.52, depth: 0.46 },
  { type: "molar", width: 0.54, height: 0.5, depth: 0.56 },
];

const ARCH_WIDTH = 1.95;
const ARCH_DEPTH = 1.55;
const ARCH_ANGLE_RANGE = Math.PI * 0.95;
const UPPER_Y = 0.42;
const LOWER_Y = -0.42;

// Cervical → body → incisal gradient (vermont enamel reference shades)
const CERVICAL_COLOR = new THREE.Color("#e9d5b3");
const BODY_COLOR = new THREE.Color("#f3ead4");
const INCISAL_COLOR = new THREE.Color("#dae3e9");

function buildToothGeometry({ type, width, height, depth }: ToothSpec) {
  const shape = new THREE.Shape();
  const w = width / 2;
  const h = height / 2;

  if (type === "molar" || type === "premolar") {
    const r = 0.08;
    shape.moveTo(-w + r, h);
    shape.quadraticCurveTo(0, h + 0.02, w - r, h);
    shape.quadraticCurveTo(w, h, w, h - r);
    shape.lineTo(w, -h + r);
    shape.quadraticCurveTo(w, -h, w - r, -h);
    shape.quadraticCurveTo(0, -h - 0.02, -w + r, -h);
    shape.quadraticCurveTo(-w, -h, -w, -h + r);
    shape.lineTo(-w, h - r);
    shape.quadraticCurveTo(-w, h, -w + r, h);
  } else if (type === "canine") {
    const topW = w * 0.85;
    shape.moveTo(-topW, h - 0.02);
    shape.quadraticCurveTo(0, h + 0.05, topW, h - 0.02);
    shape.bezierCurveTo(w + 0.03, h * 0.4, w * 0.55, -h * 0.55, w * 0.16, -h);
    shape.quadraticCurveTo(0, -h - 0.07, -w * 0.16, -h);
    shape.bezierCurveTo(-w * 0.55, -h * 0.55, -w - 0.03, h * 0.4, -topW, h - 0.02);
  } else {
    const topW = w * 0.78;
    const cornerR = 0.1;
    shape.moveTo(-topW, h - 0.02);
    shape.quadraticCurveTo(0, h + 0.06, topW, h - 0.02);
    shape.bezierCurveTo(w + 0.04, h * 0.3, w + 0.01, -h * 0.5, w, -h + cornerR);
    shape.quadraticCurveTo(w, -h, w - cornerR, -h);
    shape.quadraticCurveTo(0, -h - 0.05, -(w - cornerR), -h);
    shape.quadraticCurveTo(-w, -h, -w, -h + cornerR);
    shape.bezierCurveTo(-w - 0.01, -h * 0.5, -w - 0.04, h * 0.3, -topW, h - 0.02);
  }

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: depth,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.07,
    bevelSegments: 8,
    curveSegments: 20,
  });
  geom.translate(0, 0, -depth / 2);

  const isAnterior = type === "central" || type === "lateral" || type === "canine";
  const pos = geom.attributes.position;

  // Labial bulge, lingual concavity, mamelons, perikymata
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    if (z > 0.02) {
      const bulge =
        0.045 *
        Math.max(0, 1 - (x * x) / (w * w * 1.6)) *
        Math.max(0, 1 - (y * y) / (h * h * 1.5));
      pos.setZ(i, z + bulge);
    }

    if (z < -0.02 && isAnterior) {
      const dy = y - h * 0.15;
      const dish =
        0.05 *
        Math.max(0, 1 - (x * x) / (w * w * 1.5)) *
        Math.max(0, 1 - (dy * dy) / (h * h * 1.4));
      pos.setZ(i, z - dish);
    }

    // Mamelons + perikymata on incisor labial face
    if (z > 0.05 && (type === "central" || type === "lateral")) {
      const yN = (y + h) / (2 * h);
      const mamelonFade = Math.max(0, 1 - yN * 3);
      if (mamelonFade > 0) {
        const u = x / w;
        const ridge = 0.009 * Math.cos(u * Math.PI * 2.7) * mamelonFade;
        pos.setZ(i, pos.getZ(i) + ridge);
      }
      const perikymata = 0.0025 * Math.sin(y * 22);
      pos.setZ(i, pos.getZ(i) + perikymata);
    }
  }

  // Taper depth at incisal edge — real anteriors are wafer-thin at the biting edge
  if (isAnterior) {
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const yN = (y + h * 1.18) / (h * 2.36);
      const taper = 0.5 + 0.5 * THREE.MathUtils.smoothstep(yN, 0, 0.32);
      pos.setZ(i, z * taper);
    }
  }

  geom.computeVertexNormals();

  // Cervical → body → incisal vertex-color gradient
  geom.computeBoundingBox();
  const yMin = geom.boundingBox!.min.y;
  const yMax = geom.boundingBox!.max.y;
  const colors = new Float32Array(pos.count * 3);
  const tmp = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const yN = (y - yMin) / (yMax - yMin);

    if (yN > 0.65) {
      const t = Math.min(1, (yN - 0.65) / 0.35);
      tmp.copy(BODY_COLOR).lerp(CERVICAL_COLOR, t * 0.8);
    } else if (yN > 0.3) {
      tmp.copy(BODY_COLOR);
    } else {
      const t = Math.min(1, (0.3 - yN) / 0.3);
      tmp.copy(BODY_COLOR).lerp(INCISAL_COLOR, t * 0.9);
    }
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }
  geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return geom;
}

const TOOTH_GEOMETRIES = TOOTH_SPECS.map(buildToothGeometry);

function getArchXZ(t: number) {
  const theta = (t * ARCH_ANGLE_RANGE) / 2;
  return {
    x: ARCH_WIDTH * Math.sin(theta),
    z: ARCH_DEPTH * Math.cos(theta),
  };
}

// Deterministic pseudo-random jitter per tooth slot
function jitter(i: number, side: number, salt: number) {
  const seed = i * 7 + (side > 0 ? 13 : 0) + salt * 31;
  return (((seed * 9301 + 49297) % 233280) / 233280) * 2 - 1;
}

function ArchTeeth({
  upper,
  gumStyle,
}: {
  upper: boolean;
  gumStyle: GumStyle;
}) {
  const archY = upper ? UPPER_Y : LOWER_Y;
  const rotZ = upper ? 0 : Math.PI;
  const isPlaster = gumStyle === "plaster";
  const teeth = [] as React.ReactNode[];

  for (const side of [-1, 1]) {
    for (let i = 0; i < TOOTH_SPECS.length; i++) {
      const spec = TOOTH_SPECS[i];
      const t = (side * (i + 0.5)) / TOOTH_SPECS.length;
      const { x, z } = getArchXZ(t);
      const yaw = Math.atan2(x, z);

      const yawJ = jitter(i, side, 0) * 0.02;
      const pitchJ = jitter(i, side, 1) * 0.022;
      const xJ = jitter(i, side, 2) * 0.008;
      const zJ = jitter(i, side, 3) * 0.008;

      // Natural incisal line: canines longest, laterals slightly recessed
      let yOffset = 0;
      if (spec.type === "canine") yOffset = upper ? -0.025 : 0.025;
      else if (spec.type === "lateral") yOffset = upper ? 0.025 : -0.025;
      else if (spec.type === "premolar") yOffset = upper ? 0.04 : -0.04;
      else if (spec.type === "molar") yOffset = upper ? 0.06 : -0.06;

      // Subtle per-tooth material variation
      const matIdx = (i + (side > 0 ? 1 : 0)) % 3;
      const matColor = ["#ffffff", "#fffaee", "#fff5e2"][matIdx];
      const roughness = 0.3 + matIdx * 0.018;

      teeth.push(
        <mesh
          key={`${upper ? "U" : "L"}-${side > 0 ? "R" : "L"}-${i}`}
          geometry={TOOTH_GEOMETRIES[i]}
          position={[x + xJ, archY + yOffset, z + zJ]}
          rotation={[pitchJ, yaw + yawJ, rotZ]}
          castShadow
          receiveShadow
        >
          {isPlaster ? (
            <meshPhysicalMaterial
              color="#f6f2e8"
              roughness={0.42}
              metalness={0}
              clearcoat={0.28}
              clearcoatRoughness={0.5}
            />
          ) : (
            <meshPhysicalMaterial
              vertexColors
              color={matColor}
              roughness={roughness}
              metalness={0}
              clearcoat={0.55}
              clearcoatRoughness={0.28}
              transmission={0.22}
              thickness={0.55}
              ior={1.46}
              attenuationColor="#ffeec6"
              attenuationDistance={0.8}
              sheen={0.1}
              sheenColor="#fff0c8"
              sheenRoughness={0.55}
            />
          )}
        </mesh>
      );
    }
  }

  return <>{teeth}</>;
}

class GumCurve extends THREE.Curve<THREE.Vector3> {
  constructor(
    public widthRadius: number,
    public depthRadius: number,
    public y: number
  ) {
    super();
  }
  getPoint(tt: number, target = new THREE.Vector3()) {
    const t = (tt - 0.5) * 2;
    const theta = (t * ARCH_ANGLE_RANGE) / 2;
    return target.set(
      this.widthRadius * Math.sin(theta),
      this.y,
      this.depthRadius * Math.cos(theta)
    );
  }
}

const GUM_MATERIAL_PROPS = {
  color: "#b86868",
  roughness: 0.55,
  metalness: 0,
  clearcoat: 0.22,
  clearcoatRoughness: 0.5,
  transmission: 0.05,
  thickness: 0.6,
  ior: 1.36,
  attenuationColor: "#883a3a",
  attenuationDistance: 1.0,
  sheen: 0.25,
  sheenColor: "#d68080",
  sheenRoughness: 0.6,
} as const;

function GumArch({ upper }: { upper: boolean }) {
  const geometry = useMemo(() => {
    const y = upper ? UPPER_Y + 0.42 : LOWER_Y - 0.42;
    const curve = new GumCurve(ARCH_WIDTH * 0.98, ARCH_DEPTH * 0.98, y);
    return new THREE.TubeGeometry(curve, 80, 0.2, 16, false);
  }, [upper]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial {...GUM_MATERIAL_PROPS} />
    </mesh>
  );
}

function Papillae({ upper }: { upper: boolean }) {
  const papillae = [] as React.ReactNode[];
  const baseY = upper ? UPPER_Y + 0.32 : LOWER_Y - 0.32;
  const dir = upper ? -1 : 1; // papilla tip points toward biting edge

  const placeAt = (tt: number, key: string, size = 0.05) => {
    const { x, z } = getArchXZ(tt);
    const yaw = Math.atan2(x, z);
    papillae.push(
      <mesh
        key={key}
        position={[x, baseY + dir * 0.06, z]}
        rotation={[0, yaw, 0]}
        scale={[0.7, dir * 2.2, 0.7]}
        castShadow
      >
        <sphereGeometry args={[size, 14, 14]} />
        <meshPhysicalMaterial {...GUM_MATERIAL_PROPS} />
      </mesh>
    );
  };

  for (const side of [-1, 1]) {
    for (let i = 0; i < TOOTH_SPECS.length - 1; i++) {
      const t1 = (side * (i + 0.5)) / TOOTH_SPECS.length;
      const t2 = (side * (i + 1.5)) / TOOTH_SPECS.length;
      placeAt((t1 + t2) / 2, `pap-${upper ? "U" : "L"}-${side}-${i}`);
    }
  }
  placeAt(0, `pap-${upper ? "U" : "L"}-mid`, 0.055);

  return <>{papillae}</>;
}

// -------- Realistic gum (dental-scan style: solid mass with scalloped festooned margin) --------

const REALISTIC_GUM_PROPS = {
  color: "#b25c5c",
  roughness: 0.6,
  metalness: 0,
  clearcoat: 0.2,
  clearcoatRoughness: 0.48,
  transmission: 0.08,
  thickness: 0.8,
  ior: 1.38,
  attenuationColor: "#7a2a2a",
  attenuationDistance: 0.5,
  sheen: 0.35,
  sheenColor: "#d77a7a",
  sheenRoughness: 0.5,
} as const;

function buildRealisticGumGeometry(upper: boolean) {
  const N = 200;
  const halfRange = ARCH_ANGLE_RANGE / 2;
  const dir = upper ? 1 : -1;
  const archBaseY = upper ? UPPER_Y : LOWER_Y;

  // Y where the gum meets the tooth crowns (center of scallop wave)
  const gumLineY = archBaseY + dir * 0.30;
  // Y at the far edge of the gum tissue (toward the palate / floor of mouth)
  const gumTopY = archBaseY + dir * 1.05;

  // Radial offsets from the arch centerline.
  // Slight outer extension (labial bulge over root area), substantial inward extension (palatal mass).
  const radialOuter = 0.06;
  const radialInner = -0.36;

  const N_TEETH = TOOTH_SPECS.length;
  const cellW = 1 / N_TEETH;

  const positions: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];

  for (let i = 0; i <= N; i++) {
    const tt = i / N;
    const t = (tt - 0.5) * 2; // [-1, 1]
    const theta = t * halfRange;

    const xCenter = ARCH_WIDTH * Math.sin(theta);
    const zCenter = ARCH_DEPTH * Math.cos(theta);

    // Outward radial unit vector at this curve point (perpendicular to tangent, away from origin)
    const tangentX = ARCH_WIDTH * Math.cos(theta);
    const tangentZ = -ARCH_DEPTH * Math.sin(theta);
    const tLen = Math.hypot(tangentX, tangentZ) || 1;
    let rx = tangentZ / tLen;
    let rz = -tangentX / tLen;
    if (rx * xCenter + rz * zCenter < 0) {
      rx = -rx;
      rz = -rz;
    }

    // Scallop wave: peaks (recede away from teeth) over each tooth crown,
    // troughs (papillae toward the biting edge) between teeth.
    const phase = ((t - cellW / 2) * 2 * Math.PI) / cellW;
    const scallop = Math.cos(phase);
    // Slight non-uniform irregularity to break up the perfect periodicity
    const irregular = Math.sin(t * 19.3) * 0.12 + Math.cos(t * 41.7) * 0.08;

    const gumYBot = gumLineY + dir * (scallop * 0.075 + irregular * 0.015);
    const gumYTop = gumTopY + Math.sin(t * 7.7) * 0.025;

    // Subtle organic bumpiness on the outer and inner gum surfaces
    const bumpOuter =
      Math.sin(t * 27.1) * 0.006 + Math.cos(t * 13.7 + 1.3) * 0.004;
    const bumpInner = Math.sin(t * 23.3 + 2.1) * 0.008;

    const outerX = xCenter + rx * (radialOuter + bumpOuter);
    const outerZ = zCenter + rz * (radialOuter + bumpOuter);
    const innerX = xCenter + rx * (radialInner + bumpInner);
    const innerZ = zCenter + rz * (radialInner + bumpInner);

    // 4 verts per slice: 0=outer-bot, 1=outer-top, 2=inner-top, 3=inner-bot
    positions.push(outerX, gumYBot, outerZ);
    positions.push(outerX, gumYTop, outerZ);
    positions.push(innerX, gumYTop, innerZ);
    positions.push(innerX, gumYBot, innerZ);
    uvs.push(tt, 0, tt, 1, tt, 1, tt, 0);

    if (i > 0) {
      const base = i * 4;
      const prev = base - 4;

      // Outer wall (facing radially outward)
      indices.push(prev + 0, base + 0, base + 1);
      indices.push(prev + 0, base + 1, prev + 1);
      // Top edge (facing away from biting edge)
      indices.push(prev + 1, base + 1, base + 2);
      indices.push(prev + 1, base + 2, prev + 2);
      // Inner wall (facing palate / tongue side)
      indices.push(prev + 3, base + 3, base + 2);
      indices.push(prev + 3, base + 2, prev + 2);
      // Bottom (gum line — facing the biting edge / tooth crowns)
      indices.push(prev + 3, base + 3, base + 0);
      indices.push(prev + 3, base + 0, prev + 0);
    }
  }

  // End caps at the back of the arch on each side
  indices.push(0, 1, 2);
  indices.push(0, 2, 3);
  const last = N * 4;
  indices.push(last + 0, last + 2, last + 1);
  indices.push(last + 0, last + 3, last + 2);

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

function RealisticGum({ upper }: { upper: boolean }) {
  const geometry = useMemo(() => buildRealisticGumGeometry(upper), [upper]);
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        {...REALISTIC_GUM_PROPS}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// -------- Plaster cast (dental study model — solid block, no pink gums) --------

const PLASTER_PROPS = {
  color: "#eee9de",
  roughness: 0.55,
  metalness: 0,
  clearcoat: 0.22,
  clearcoatRoughness: 0.58,
} as const;

function buildPlasterCastGeometry(upper: boolean) {
  const dir = upper ? 1 : -1;
  const archBaseY = upper ? UPPER_Y : LOWER_Y;
  const castNearY = archBaseY + dir * 0.30; // close to teeth (gum line)
  const castFarY = archBaseY + dir * 1.3; // far from teeth (top / bottom of cast)
  const castHeight = Math.abs(castFarY - castNearY);

  const halfRange = ARCH_ANGLE_RANGE / 2;
  const radialOuter = 0.12;
  const sideX = 2.15; // half-width of cast in plan view
  const backZ = -0.6; // back wall depth (negative Z, behind the arch)

  // Build plan-view shape (shape's XY = world's XZ).
  // Counter-clockwise winding: back-left → forward → arch curve (left→right) → back → close.
  const shape = new THREE.Shape();

  // Compute outer-edge arch points
  const archRes = 96;
  const archPts: [number, number][] = [];
  for (let i = 0; i <= archRes; i++) {
    const tt = i / archRes;
    const t = (tt - 0.5) * 2;
    const theta = t * halfRange;
    const cx = ARCH_WIDTH * Math.sin(theta);
    const cz = ARCH_DEPTH * Math.cos(theta);
    const tx = ARCH_WIDTH * Math.cos(theta);
    const tz = -ARCH_DEPTH * Math.sin(theta);
    const tlen = Math.hypot(tx, tz) || 1;
    let nx = tz / tlen;
    let nz = -tx / tlen;
    if (nx * cx + nz * cz < 0) {
      nx = -nx;
      nz = -nz;
    }
    archPts.push([cx + nx * radialOuter, cz + nz * radialOuter]);
  }

  const firstPt = archPts[0];
  const lastPt = archPts[archPts.length - 1];

  shape.moveTo(-sideX, backZ);
  shape.lineTo(-sideX, firstPt[1]); // forward along left side
  shape.lineTo(firstPt[0], firstPt[1]); // connect to arch start
  for (let i = 1; i < archPts.length; i++) {
    shape.lineTo(archPts[i][0], archPts[i][1]);
  }
  shape.lineTo(sideX, lastPt[1]); // connect to right side
  shape.lineTo(sideX, backZ); // back along right side
  shape.lineTo(-sideX, backZ); // across the back
  shape.closePath();

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: castHeight,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 4,
    curveSegments: 12,
  });

  // Shape was in XY plane extruded along Z. Rotate so the extrude axis becomes -Y.
  geom.rotateX(Math.PI / 2);
  // Position so depth=0 face sits at the far end of the cast,
  // depth=castHeight face sits at the near end (gum line) — works for both arches.
  const tY = upper ? castFarY : castNearY;
  geom.translate(0, tY, 0);

  geom.computeVertexNormals();
  return geom;
}

function PlasterCast({ upper }: { upper: boolean }) {
  const geometry = useMemo(() => buildPlasterCastGeometry(upper), [upper]);
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial {...PLASTER_PROPS} />
    </mesh>
  );
}

// -------- Mouth + canvas --------

export type GumStyle = "tube" | "realistic" | "plaster";

function Mouth({ gumStyle }: { gumStyle: GumStyle }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.22) * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.17) * 0.025;
  });
  return (
    <group ref={ref}>
      {gumStyle === "realistic" ? (
        <>
          <RealisticGum upper={true} />
          <RealisticGum upper={false} />
        </>
      ) : gumStyle === "plaster" ? (
        <>
          <PlasterCast upper={true} />
          <PlasterCast upper={false} />
        </>
      ) : (
        <>
          <GumArch upper={true} />
          <GumArch upper={false} />
          <Papillae upper={true} />
          <Papillae upper={false} />
        </>
      )}
      <ArchTeeth upper={true} gumStyle={gumStyle} />
      <ArchTeeth upper={false} gumStyle={gumStyle} />
    </group>
  );
}

export default function TeethArchModel({
  gumStyle = "tube",
}: { gumStyle?: GumStyle } = {}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [1.05, 0.9, 5.8], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      className="!touch-none"
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[2.5, 4, 4]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 1.5, -2.5]} intensity={0.5} color="#f3e3c8" />
      <pointLight position={[0, -0.8, 2.5]} intensity={0.35} color="#fff3d8" />
      <pointLight position={[0, 1.6, 2.8]} intensity={0.35} color="#fff7e2" />

      <Suspense fallback={null}>
        <Mouth gumStyle={gumStyle} />
        <ContactShadows
          position={[0, -1.15, 0]}
          opacity={0.4}
          scale={6}
          blur={2.4}
          far={3}
          color="#2a2520"
        />
        <Environment preset="studio" environmentIntensity={1.0} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.7}
        autoRotate={false}
      />
    </Canvas>
  );
}
