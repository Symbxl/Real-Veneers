"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  MeshTransmissionMaterial,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function ToothGeometry() {
  const geometry = useMemo(() => {
    // Stylized maxillary central incisor:
    // narrow at the gum (top in screen space), wider at the incisal edge (bottom),
    // with rounded corners and a softly convex labial face.
    const shape = new THREE.Shape();
    // Build clockwise starting at top-left
    // Top (cervical / gum line) — narrower
    const topW = 0.55;
    const botW = 0.78;
    const topY = 1.15; // gum line
    const botY = -1.15; // incisal edge
    const cornerR = 0.28;

    shape.moveTo(-topW, topY - 0.05);
    // top edge (slightly curved up — cervical curve)
    shape.quadraticCurveTo(0, topY + 0.08, topW, topY - 0.05);
    // right side flaring outward
    shape.bezierCurveTo(
      topW + 0.05, topY - 0.5,
      botW + 0.02, botY + 0.8,
      botW, botY + cornerR
    );
    // bottom-right corner
    shape.quadraticCurveTo(botW, botY, botW - cornerR, botY);
    // incisal edge (gently curved — the biting edge)
    shape.quadraticCurveTo(0, botY - 0.08, -(botW - cornerR), botY);
    // bottom-left corner
    shape.quadraticCurveTo(-botW, botY, -botW, botY + cornerR);
    // left side curving back up
    shape.bezierCurveTo(
      -botW - 0.02, botY + 0.8,
      -topW - 0.05, topY - 0.5,
      -topW, topY - 0.05
    );

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.18,
      bevelSize: 0.18,
      bevelSegments: 14,
      curveSegments: 36,
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.translate(0, 0, -0.25);

    // Sculpt: convex labial face, flatter lingual face,
    // and a subtle mamelon/ridge near the incisal edge.
    const pos = geom.attributes.position;
    const maxW = botW + 0.18;
    const maxH = topY + 0.18;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Back (lingual) face: flatten and dish slightly inward
      if (z < -0.15) {
        const dish = 0.06 * (1 - (x * x) / (maxW * maxW));
        pos.setZ(i, z * 0.65 + dish);
      }
      // Front (labial) face: convex bulge, stronger toward middle
      if (z > 0.15) {
        const bulge =
          0.12 *
          Math.max(0, 1 - (x * x) / (maxW * maxW)) *
          Math.max(0, 1 - (y * y) / (maxH * maxH));
        // Subtle vertical ridges (mamelon hint) near incisal edge
        const ridge =
          y < -0.6
            ? 0.015 * Math.cos(x * 9) * Math.max(0, (-y - 0.6) / 0.5)
            : 0;
        pos.setZ(i, z + bulge + ridge);
      }
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.35) * 0.35;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.08;
  });

  return (
    <mesh ref={ref} geometry={geometry} castShadow receiveShadow>
      <MeshTransmissionMaterial
        thickness={0.9}
        roughness={0.08}
        transmission={0.55}
        ior={1.6}
        chromaticAberration={0.04}
        anisotropy={0.4}
        distortion={0.15}
        distortionScale={0.4}
        temporalDistortion={0.1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        attenuationColor="#f7eedd"
        attenuationDistance={1.2}
        color="#fbf8f0"
      />
    </mesh>
  );
}

function Sparkle({
  position,
  delay = 0,
}: {
  position: [number, number, number];
  delay?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    const s = 0.5 + 0.5 * Math.sin(t * 2.5);
    ref.current.scale.setScalar(0.04 + s * 0.05);
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.4 + s * 0.6;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent />
    </mesh>
  );
}

export default function ToothModel() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 6.5], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      className="!touch-none"
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#f0e3cf" />
      <pointLight position={[0, -2, 3]} intensity={0.4} color="#ffffff" />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
          <ToothGeometry />
          <Sparkle position={[0.7, 0.8, 0.6]} delay={0} />
          <Sparkle position={[-0.6, 0.4, 0.7]} delay={1.4} />
          <Sparkle position={[0.3, -0.3, 0.8]} delay={2.7} />
        </Float>

        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.35}
          scale={6}
          blur={2.4}
          far={3}
          color="#3a3225"
        />

        <Environment preset="studio" environmentIntensity={0.8} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.7}
        autoRotate={false}
      />
    </Canvas>
  );
}
