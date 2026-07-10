"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import type { MotionValue } from "motion/react";
import type { Group, PerspectiveCamera } from "three";

/**
 * BRIAM sculpture — ported directly from the user's Three.js spec: exact box/
 * capsule layout, #fafafa matte material, key-light + soft shadows, and the
 * initial tilt. The Y "swirl" is driven by scroll instead of a constant spin.
 */
type Part =
  | { kind: "box"; args: [number, number, number]; pos: [number, number, number] }
  | { kind: "cap"; r: number; len: number; pos: [number, number, number]; rot?: [number, number, number] };

// Matched to the close-up reference: 3-cube stacked tower (right), tall rounded
// pillars (left), and a cube + horizontal pill + vertical pill + stepped top
// blocks through the centre. Wide, dense, interlocking cluster.
const PARTS: Part[] = [
  // right — stacked-cube tower (3 high, stepping slightly forward as it descends)
  { kind: "box", args: [1.05, 1.05, 1.05], pos: [2.1, 1.05, -0.4] },
  { kind: "box", args: [1.05, 1.05, 1.05], pos: [2.15, 0.0, -0.15] },
  { kind: "box", args: [1.05, 1.05, 1.05], pos: [2.2, -1.05, 0.1] },
  // centre-top — stepped block + small cube
  { kind: "box", args: [1.3, 0.9, 0.9], pos: [0.7, 1.35, -0.2] },
  { kind: "box", args: [0.6, 0.6, 0.6], pos: [0.05, 1.55, 0.1] },
  // centre cube
  { kind: "box", args: [1.0, 1.0, 0.95], pos: [0.0, 0.25, 0.35] },
  // centre — horizontal pill + vertical pill
  { kind: "cap", r: 0.45, len: 0.9, pos: [0.55, -0.55, 0.55], rot: [0, 0, Math.PI / 2] },
  { kind: "cap", r: 0.4, len: 0.6, pos: [1.2, -0.35, 0.4] },
  // left — tall rounded pillars + bottom oval
  { kind: "cap", r: 0.42, len: 1.35, pos: [-1.75, 0.15, 0.15] },
  { kind: "cap", r: 0.4, len: 1.0, pos: [-1.15, -0.05, 0.45] },
  { kind: "cap", r: 0.4, len: 0.7, pos: [-1.5, -0.95, 0.5], rot: [0, 0, Math.PI / 2] },
];

function Mat() {
  return <meshStandardMaterial color="#fcfcfd" roughness={0.5} metalness={0.05} />;
}

function PartMesh({ p }: { p: Part }) {
  if (p.kind === "cap") {
    return (
      <mesh position={p.pos} rotation={p.rot} castShadow receiveShadow>
        <capsuleGeometry args={[p.r, p.len, 16, 32]} />
        <Mat />
      </mesh>
    );
  }
  return (
    <mesh position={p.pos} castShadow receiveShadow>
      <boxGeometry args={p.args} />
      <Mat />
    </mesh>
  );
}

function Sculpture({ progress, still }: { progress: MotionValue<number>; still: boolean }) {
  const g = useRef<Group>(null);
  useFrame((state) => {
    const grp = g.current;
    if (!grp) return;
    // slight downward tilt to match the reference's front 3/4 view
    grp.rotation.x = 0.22;
    grp.rotation.z = -0.12;
    if (still) {
      grp.rotation.y = 0.35;
      grp.scale.setScalar(1);
      return;
    }
    const p = progress.get();
    const t = state.clock.elapsedTime;
    // gentle swirl kept in the frontal hero range so the layout stays readable
    grp.rotation.y = -0.1 + p * 1.1 + t * 0.04;
    grp.scale.setScalar(0.92 + p * 0.16);
  });
  return (
    <group ref={g}>
      {PARTS.map((p, i) => (
        <PartMesh key={i} p={p} />
      ))}
    </group>
  );
}

export default function Silo3D({
  progress,
  still = false,
}: {
  progress: MotionValue<number>;
  still?: boolean;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ fov: 45, position: [0, 5, 15] }}
      onCreated={({ camera }) => (camera as PerspectiveCamera).lookAt(0, 0.6, 0)}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#ffffff", "#c9ced4", 0.45]} />
      <directionalLight
        castShadow
        position={[4, 9, 6]}
        intensity={1.15}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />
      <Sculpture progress={progress} still={still} />
      <ContactShadows position={[0, -1.8, 0]} opacity={0.28} scale={14} blur={2.8} far={6} />
    </Canvas>
  );
}
