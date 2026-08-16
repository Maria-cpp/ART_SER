"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AluminiumProfileProps {
  explode?: number;
  rotationSpeed?: number;
  scale?: number;
}

export function AluminiumProfile({
  explode = 0,
  rotationSpeed = 0,
  scale = 1,
}: AluminiumProfileProps) {
  const groupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      aluminium: new THREE.MeshStandardMaterial({
        color: "#8A8A8A",
        metalness: 0.85,
        roughness: 0.35,
      }),
      darkAluminium: new THREE.MeshStandardMaterial({
        color: "#3A3A3A",
        metalness: 0.9,
        roughness: 0.25,
      }),
      thermalBreak: new THREE.MeshStandardMaterial({
        color: "#1A1A1A",
        metalness: 0.0,
        roughness: 0.9,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#88AACC",
        metalness: 0.0,
        roughness: 0.05,
        transparent: true,
        opacity: 0.35,
        envMapIntensity: 1.5,
      }),
      gasket: new THREE.MeshStandardMaterial({
        color: "#111111",
        metalness: 0.0,
        roughness: 0.95,
      }),
    };
  }, []);

  useFrame(() => {
    if (groupRef.current && rotationSpeed) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  const e = explode;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Outer aluminium frame */}
      <group position={[0, e * 1.2, 0]}>
        <mesh material={materials.aluminium} position={[0, 1.0, 0]}>
          <boxGeometry args={[2.4, 0.15, 0.6]} />
        </mesh>
        <mesh material={materials.aluminium} position={[0, -1.0, 0]}>
          <boxGeometry args={[2.4, 0.15, 0.6]} />
        </mesh>
        <mesh material={materials.aluminium} position={[-1.12, 0, 0]}>
          <boxGeometry args={[0.15, 2.15, 0.6]} />
        </mesh>
        <mesh material={materials.aluminium} position={[1.12, 0, 0]}>
          <boxGeometry args={[0.15, 2.15, 0.6]} />
        </mesh>
      </group>

      {/* Thermal break strip */}
      <group position={[0, e * 0.5, e * 0.3]}>
        <mesh material={materials.thermalBreak} position={[0, 1.0, 0]}>
          <boxGeometry args={[2.0, 0.06, 0.15]} />
        </mesh>
        <mesh material={materials.thermalBreak} position={[0, -1.0, 0]}>
          <boxGeometry args={[2.0, 0.06, 0.15]} />
        </mesh>
        <mesh material={materials.thermalBreak} position={[-1.0, 0, 0]}>
          <boxGeometry args={[0.06, 2.0, 0.15]} />
        </mesh>
        <mesh material={materials.thermalBreak} position={[1.0, 0, 0]}>
          <boxGeometry args={[0.06, 2.0, 0.15]} />
        </mesh>
      </group>

      {/* Inner aluminium frame */}
      <group position={[0, -e * 1.2, 0]}>
        <mesh material={materials.darkAluminium} position={[0, 0.85, 0]}>
          <boxGeometry args={[1.8, 0.12, 0.4]} />
        </mesh>
        <mesh material={materials.darkAluminium} position={[0, -0.85, 0]}>
          <boxGeometry args={[1.8, 0.12, 0.4]} />
        </mesh>
        <mesh material={materials.darkAluminium} position={[-0.84, 0, 0]}>
          <boxGeometry args={[0.12, 1.82, 0.4]} />
        </mesh>
        <mesh material={materials.darkAluminium} position={[0.84, 0, 0]}>
          <boxGeometry args={[0.12, 1.82, 0.4]} />
        </mesh>
      </group>

      {/* Glass panel */}
      <group position={[0, 0, e * -1.5]}>
        <mesh material={materials.glass}>
          <boxGeometry args={[1.5, 1.5, 0.04]} />
        </mesh>
      </group>

      {/* Gaskets */}
      <group position={[0, 0, e * -0.8]}>
        <mesh material={materials.gasket} position={[0, 0.78, 0]}>
          <boxGeometry args={[1.6, 0.04, 0.08]} />
        </mesh>
        <mesh material={materials.gasket} position={[0, -0.78, 0]}>
          <boxGeometry args={[1.6, 0.04, 0.08]} />
        </mesh>
        <mesh material={materials.gasket} position={[-0.78, 0, 0]}>
          <boxGeometry args={[0.04, 1.6, 0.08]} />
        </mesh>
        <mesh material={materials.gasket} position={[0.78, 0, 0]}>
          <boxGeometry args={[0.04, 1.6, 0.08]} />
        </mesh>
      </group>
    </group>
  );
}
