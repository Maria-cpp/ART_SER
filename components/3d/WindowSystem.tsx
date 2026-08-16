"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WindowSystemProps {
  explode?: number;
  mouseOffset?: [number, number];
  scale?: number;
}

export function WindowSystem({
  explode = 0,
  mouseOffset = [0, 0],
  scale = 1,
}: WindowSystemProps) {
  const groupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => ({
    frame: new THREE.MeshStandardMaterial({
      color: "#2C2C2C",
      metalness: 0.9,
      roughness: 0.2,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: "#6699BB",
      metalness: 0.0,
      roughness: 0.05,
      transparent: true,
      opacity: 0.3,
      envMapIntensity: 2.0,
    }),
    handle: new THREE.MeshStandardMaterial({
      color: "#B58A62",
      metalness: 0.8,
      roughness: 0.2,
    }),
    gasket: new THREE.MeshStandardMaterial({
      color: "#0A0A0A",
      roughness: 0.95,
    }),
  }), []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouseOffset[0] * 0.3 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (mouseOffset[1] * 0.15 - groupRef.current.rotation.x) * 0.05;
  });

  const e = explode;
  const W = 3;
  const H = 4;
  const D = 0.12;
  const T = 0.12;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Outer frame */}
      <group position={[0, 0, e * 0.8]}>
        <mesh material={materials.frame} position={[0, H / 2, 0]}>
          <boxGeometry args={[W + T * 2, T, D]} />
        </mesh>
        <mesh material={materials.frame} position={[0, -H / 2, 0]}>
          <boxGeometry args={[W + T * 2, T, D]} />
        </mesh>
        <mesh material={materials.frame} position={[-W / 2 - T / 2, 0, 0]}>
          <boxGeometry args={[T, H, D]} />
        </mesh>
        <mesh material={materials.frame} position={[W / 2 + T / 2, 0, 0]}>
          <boxGeometry args={[T, H, D]} />
        </mesh>
        <mesh material={materials.frame} position={[0, 0, 0]}>
          <boxGeometry args={[T * 0.8, H, D]} />
        </mesh>
      </group>

      {/* Left glass pane */}
      <group position={[-W / 4 - T * 0.2, 0, -e * 0.5]}>
        <mesh material={materials.glass}>
          <boxGeometry args={[W / 2 - T * 0.5, H - T * 2, 0.02]} />
        </mesh>
      </group>

      {/* Right glass pane */}
      <group position={[W / 4 + T * 0.2, 0, -e * 0.5]}>
        <mesh material={materials.glass}>
          <boxGeometry args={[W / 2 - T * 0.5, H - T * 2, 0.02]} />
        </mesh>
      </group>

      {/* Gasket strips */}
      <group position={[-W / 4 - T * 0.2, 0, e * 0.3]}>
        <mesh material={materials.gasket} position={[0, (H - T * 2) / 2, 0]}>
          <boxGeometry args={[W / 2 - T * 0.3, 0.03, 0.06]} />
        </mesh>
        <mesh material={materials.gasket} position={[0, -(H - T * 2) / 2, 0]}>
          <boxGeometry args={[W / 2 - T * 0.3, 0.03, 0.06]} />
        </mesh>
      </group>

      {/* Handle */}
      <group position={[T * 0.6, 0, D / 2 + 0.02 + e * 1.2]}>
        <mesh material={materials.handle} position={[0, 0, 0.02]}>
          <boxGeometry args={[0.06, 0.18, 0.04]} />
        </mesh>
        <mesh material={materials.handle} position={[0, 0.12, 0.04]}>
          <boxGeometry args={[0.04, 0.12, 0.04]} />
        </mesh>
        <mesh material={materials.handle} position={[0, 0.18, 0.04]}>
          <cylinderGeometry args={[0.025, 0.025, 0.06, 8]} />
        </mesh>
      </group>
    </group>
  );
}
