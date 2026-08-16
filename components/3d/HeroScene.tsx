"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { WindowSystem } from "./WindowSystem";

interface HeroSceneProps {
  scrollProgress?: number;
  mouse?: { x: number; y: number };
}

export function HeroScene({ scrollProgress = 0, mouse = { x: 0, y: 0 } }: HeroSceneProps) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 8 - scrollProgress * 4;
    const targetY = 0.5 - scrollProgress * 0.8;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#B8B8B8" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color="#F5F5F2"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#B58A62" />
      <pointLight position={[0, -2, 3]} intensity={0.2} color="#B58A62" distance={10} />

      <Environment preset="city" environmentIntensity={0.3} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0B0B0B" roughness={0.95} metalness={0.1} />
      </mesh>

      <WindowSystem
        mouseOffset={[mouse.x, mouse.y]}
        explode={scrollProgress * 0.6}
        scale={0.8}
      />

      <group position={[3.5, -0.5, -3]} rotation={[0, -0.4, 0]} scale={0.4}>
        <mesh>
          <boxGeometry args={[2.4, 3.2, 0.1]} />
          <meshStandardMaterial color="#2C2C2C" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[2.0, 2.8, 0.02]} />
          <meshPhysicalMaterial
            color="#6699BB"
            transparent
            opacity={0.2}
            roughness={0.05}
          />
        </mesh>
      </group>

      <group position={[-4, 1.5, -4]} rotation={[0.2, 0.5, 0.1]} scale={0.3}>
        <mesh>
          <boxGeometry args={[0.15, 4, 0.6]} />
          <meshStandardMaterial color="#8A8A8A" metalness={0.85} roughness={0.35} />
        </mesh>
      </group>
    </>
  );
}
