"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { AluminiumProfile } from "./AluminiumProfile";

interface MaterialSceneProps {
  scrollProgress?: number;
}

export function MaterialScene({ scrollProgress = 0 }: MaterialSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.002;

    const targetZ = 5 - scrollProgress * 1.5;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
  });

  const explodeFactor = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.6));

  return (
    <>
      <ambientLight intensity={0.1} color="#B8B8B8" />
      <spotLight
        position={[4, 6, 4]}
        intensity={1.2}
        color="#F5F5F2"
        angle={0.5}
        penumbra={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-3, 3, -2]}
        intensity={0.4}
        color="#B58A62"
        angle={0.6}
        penumbra={1}
      />
      <pointLight position={[0, -3, 2]} intensity={0.15} color="#B58A62" distance={8} />

      <Environment preset="city" environmentIntensity={0.2} />

      <group ref={groupRef}>
        <AluminiumProfile
          explode={explodeFactor}
          rotationSpeed={0}
          scale={1.2}
        />
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0B0B0B" roughness={0.92} metalness={0.15} />
      </mesh>
    </>
  );
}
