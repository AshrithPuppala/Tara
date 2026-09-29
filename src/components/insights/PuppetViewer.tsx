"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MathUtils, type Group } from "three";

// Three.js materials need raw colours (same reason as lib/chartColors.ts).
const WOOD = "#b98a5a";
const SKIN = "#d9a679";
const CLOTH = "#1f6660";
const TURBAN = "#e0a526";

const ARM_LENGTH = 1.1;

/** One arm. 0 deg = hanging down; positive values raise it sideways. */
function Arm({ side, deg, grip }: { side: "left" | "right"; deg: number; grip: number }) {
  const pivot = useRef<Group>(null);
  // Puppet's left arm is on the viewer's right (+x).
  const sign = side === "left" ? 1 : -1;

  useFrame((_, delta) => {
    if (!pivot.current) return;
    pivot.current.rotation.z = MathUtils.damp(
      pivot.current.rotation.z,
      sign * MathUtils.degToRad(deg),
      14,
      delta,
    );
  });

  const glow = Math.min(grip / 8, 1);
  return (
    <group ref={pivot} position={[sign * 0.75, 1.15, 0]}>
      <mesh position={[0, -ARM_LENGTH / 2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, ARM_LENGTH, 16]} />
        <meshStandardMaterial color={WOOD} />
      </mesh>
      <mesh position={[0, -ARM_LENGTH - 0.05, 0]}>
        <sphereGeometry args={[0.17, 20, 20]} />
        <meshStandardMaterial color={SKIN} emissive="#ff6b3d" emissiveIntensity={glow} />
      </mesh>
    </group>
  );
}

function Puppet({
  leftDeg,
  rightDeg,
  grip,
}: {
  leftDeg: number;
  rightDeg: number;
  grip: number;
}) {
  return (
    <group position={[0, -1.2, 0]}>
      {/* torso */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[1.3, 1.6, 0.6]} />
        <meshStandardMaterial color={CLOTH} />
      </mesh>
      {/* legs / skirt */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.55, 0.8, 0.9, 24]} />
        <meshStandardMaterial color={WOOD} />
      </mesh>
      {/* head and turban */}
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial color={SKIN} />
      </mesh>
      <mesh position={[0, 2.25, 0]}>
        <cylinderGeometry args={[0.3, 0.45, 0.35, 24]} />
        <meshStandardMaterial color={TURBAN} />
      </mesh>
      <Arm side="left" deg={leftDeg} grip={grip} />
      <Arm side="right" deg={rightDeg} grip={grip} />
    </group>
  );
}

export function PuppetViewer({
  leftDeg,
  rightDeg,
  grip,
}: {
  leftDeg: number;
  rightDeg: number;
  grip: number;
}) {
  return (
    <Canvas camera={{ position: [0, 0.6, 6], fov: 40 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <Puppet leftDeg={leftDeg} rightDeg={rightDeg} grip={grip} />
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={9}
        maxPolarAngle={Math.PI * 0.6}
      />
    </Canvas>
  );
}
