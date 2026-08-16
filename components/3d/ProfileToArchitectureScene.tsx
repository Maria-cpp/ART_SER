"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

interface ProfileToArchitectureSceneProps {
  scrollProgress?: number;
}

export function ProfileToArchitectureScene({ scrollProgress = 0 }: ProfileToArchitectureSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const materials = useMemo(() => ({
    rawAluminium: new THREE.MeshStandardMaterial({
      color: "#A0A0A0",
      metalness: 0.6,
      roughness: 0.5,
    }),
    cutAluminium: new THREE.MeshStandardMaterial({
      color: "#8A8A8A",
      metalness: 0.85,
      roughness: 0.35,
    }),
    darkFrame: new THREE.MeshStandardMaterial({
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
    }),
    wall: new THREE.MeshStandardMaterial({
      color: "#1A1A1A",
      roughness: 0.95,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: "#B58A62",
      metalness: 0.7,
      roughness: 0.3,
    }),
  }), []);

  const stage = Math.min(6, Math.floor(scrollProgress * 7));
  const stageProgress = (scrollProgress * 7) - stage;

  useFrame(() => {
    if (!groupRef.current) return;

    const angle = scrollProgress * Math.PI * 0.4 - 0.2;
    const radius = 6 - scrollProgress * 1.5;
    camera.position.x += (Math.sin(angle) * radius - camera.position.x) * 0.05;
    camera.position.z += (Math.cos(angle) * radius - camera.position.z) * 0.05;
    camera.position.y += (2 - scrollProgress * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.12} color="#B8B8B8" />
      <spotLight position={[5, 8, 5]} intensity={1.0} color="#F5F5F2" angle={0.5} penumbra={0.8} castShadow />
      <spotLight position={[-3, 4, -3]} intensity={0.3} color="#B58A62" angle={0.6} penumbra={1} />
      <Environment preset="city" environmentIntensity={0.15} />

      <group ref={groupRef}>
        {/* Stage 0: Raw aluminium profile */}
        <group visible={stage <= 1}>
          <mesh
            material={materials.rawAluminium}
            position={[0, 0, 0]}
            scale={[
              1,
              1,
              stage === 0 ? 1 + stageProgress * 0.5 : 1.5 - stageProgress * 0.5,
            ]}
          >
            <boxGeometry args={[0.15, 2.5, 4]} />
          </mesh>
          <mesh material={materials.rawAluminium} position={[0.5, 0, 0]}>
            <boxGeometry args={[0.15, 2.5, 4]} />
          </mesh>
        </group>

        {/* Stage 1-2: Cutting / Machining */}
        <group visible={stage >= 1 && stage <= 3}>
          <mesh
            material={materials.cutAluminium}
            position={[0, 1.2, 0]}
            scale={stage >= 2 ? [1, 1, 1] : [1, 1, stageProgress]}
          >
            <boxGeometry args={[2.4, 0.15, 0.6]} />
          </mesh>
          <mesh
            material={materials.cutAluminium}
            position={[0, -1.2, 0]}
            scale={stage >= 2 ? [1, 1, 1] : [1, 1, stageProgress]}
          >
            <boxGeometry args={[2.4, 0.15, 0.6]} />
          </mesh>
          <mesh
            material={materials.cutAluminium}
            position={[-1.12, 0, 0]}
            scale={stage >= 2 ? [1, 1, 1] : [1, stageProgress, 1]}
          >
            <boxGeometry args={[0.15, 2.55, 0.6]} />
          </mesh>
          <mesh
            material={materials.cutAluminium}
            position={[1.12, 0, 0]}
            scale={stage >= 2 ? [1, 1, 1] : [1, stageProgress, 1]}
          >
            <boxGeometry args={[0.15, 2.55, 0.6]} />
          </mesh>
        </group>

        {/* Stage 3-4: Assembly + Glass insertion */}
        <group visible={stage >= 3 && stage <= 5}>
          <group>
            <mesh material={materials.darkFrame} position={[0, 1.2, 0]}>
              <boxGeometry args={[2.6, 0.14, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[0, -1.2, 0]}>
              <boxGeometry args={[2.6, 0.14, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[-1.23, 0, 0]}>
              <boxGeometry args={[0.14, 2.54, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[1.23, 0, 0]}>
              <boxGeometry args={[0.14, 2.54, 0.5]} />
            </mesh>
          </group>
          <mesh
            material={materials.glass}
            position={[
              0,
              stage === 3 ? 3 - stageProgress * 3 : 0,
              0,
            ]}
            scale={stage >= 4 ? [1, 1, 1] : [1, Math.max(0.01, stageProgress), 1]}
          >
            <boxGeometry args={[2.2, 2.2, 0.04]} />
          </mesh>
          {stage >= 4 && (
            <group position={[1.0, 0, 0.28]}>
              <mesh material={materials.accent}>
                <boxGeometry args={[0.06, 0.18, 0.04]} />
              </mesh>
              <mesh material={materials.accent} position={[0, 0.12, 0.02]}>
                <boxGeometry args={[0.04, 0.12, 0.04]} />
              </mesh>
            </group>
          )}
        </group>

        {/* Stage 5-6: Finished window + Installed */}
        <group visible={stage >= 5}>
          {stage >= 6 && (
            <mesh material={materials.wall} position={[0, 0, -0.3]}>
              <boxGeometry args={[5, 4, 0.3]} />
            </mesh>
          )}
          <group>
            <mesh material={materials.darkFrame} position={[0, 1.2, 0]}>
              <boxGeometry args={[2.6, 0.14, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[0, -1.2, 0]}>
              <boxGeometry args={[2.6, 0.14, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[-1.23, 0, 0]}>
              <boxGeometry args={[0.14, 2.54, 0.5]} />
            </mesh>
            <mesh material={materials.darkFrame} position={[1.23, 0, 0]}>
              <boxGeometry args={[0.14, 2.54, 0.5]} />
            </mesh>
            <mesh material={materials.glass}>
              <boxGeometry args={[2.2, 2.2, 0.04]} />
            </mesh>
            <group position={[1.0, 0, 0.28]}>
              <mesh material={materials.accent}>
                <boxGeometry args={[0.06, 0.18, 0.04]} />
              </mesh>
              <mesh material={materials.accent} position={[0, 0.12, 0.02]}>
                <boxGeometry args={[0.04, 0.12, 0.04]} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.95} />
      </mesh>
    </>
  );
}
