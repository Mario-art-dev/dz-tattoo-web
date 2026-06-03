'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';
import * as THREE from 'three';

const DARK_METAL = '#151515';
const MID_METAL = '#2a2a2a';
const RED_ACCENT = '#8B0000';
const SILVER = '#505050';

export default function TattooMachine3D() {
  const groupRef = useRef<THREE.Group>(null);
  const needleRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.06;
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.08;
    }
    // Needle vibration simulation
    if (needleRef.current) {
      needleRef.current.position.y = 1.72 + Math.sin(t * 30) * 0.015;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.25, 0, 0]}>
      {/* === NEEDLE TIP === */}
      <mesh ref={needleRef} position={[0, 1.72, 0]}>
        <coneGeometry args={[0.022, 0.28, 6]} />
        <meshStandardMaterial color={SILVER} metalness={0.95} roughness={0.05} />
      </mesh>

      {/* === CARTRIDGE NEEDLE HOUSING === */}
      <mesh position={[0, 1.36, 0]}>
        <cylinderGeometry args={[0.052, 0.052, 0.44, 16]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Cartridge grip band */}
      <mesh position={[0, 1.58, 0]}>
        <torusGeometry args={[0.058, 0.014, 8, 24]} />
        <meshStandardMaterial color={RED_ACCENT} metalness={0.85} roughness={0.15} emissive={RED_ACCENT} emissiveIntensity={0.4} />
      </mesh>

      {/* === NEEDLE CONNECTOR === */}
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.072, 0.068, 0.1, 16]} />
        <meshStandardMaterial color={MID_METAL} metalness={0.85} roughness={0.2} />
      </mesh>

      {/* === MOTOR HOUSING (main body) === */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.95, 32]} />
        <meshStandardMaterial color={DARK_METAL} metalness={0.92} roughness={0.12} />
      </mesh>

      {/* Motor housing top cap */}
      <mesh position={[0, 1.075, 0]}>
        <cylinderGeometry args={[0.165, 0.165, 0.025, 32]} />
        <meshStandardMaterial color={RED_ACCENT} metalness={0.9} roughness={0.1} emissive={RED_ACCENT} emissiveIntensity={0.3} />
      </mesh>

      {/* Motor housing bottom cap */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.175, 0.175, 0.025, 32]} />
        <meshStandardMaterial color={MID_METAL} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Brand engraving ring */}
      <mesh position={[0, 0.6, 0]}>
        <torusGeometry args={[0.172, 0.008, 8, 32]} />
        <meshStandardMaterial color={RED_ACCENT} metalness={0.9} roughness={0.1} emissive={RED_ACCENT} emissiveIntensity={0.5} />
      </mesh>

      {/* === GRIP SECTION === */}
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.135, 0.14, 1.22, 32]} />
        <meshStandardMaterial color={DARK_METAL} metalness={0.88} roughness={0.22} />
      </mesh>

      {/* Grip knurl rings */}
      {[-0.1, -0.25, -0.4, -0.55, -0.7, -0.85].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.138, 0.007, 6, 28]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? MID_METAL : '#1e1e1e'}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* === BOTTOM CONNECTOR / POWER INPUT === */}
      <mesh position={[0, -1.19, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.18, 16]} />
        <meshStandardMaterial color={MID_METAL} metalness={0.85} roughness={0.2} />
      </mesh>

      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 12]} />
        <meshStandardMaterial color={RED_ACCENT} metalness={0.9} roughness={0.1} emissive={RED_ACCENT} emissiveIntensity={0.6} />
      </mesh>

      {/* === DECORATIVE SIDE PANEL === */}
      <mesh position={[0.168, 0.6, 0]}>
        <boxGeometry args={[0.01, 0.6, 0.08]} />
        <meshStandardMaterial color={RED_ACCENT} metalness={0.9} roughness={0.05} emissive={RED_ACCENT} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.168, 0.6, 0]}>
        <boxGeometry args={[0.01, 0.6, 0.08]} />
        <meshStandardMaterial color={RED_ACCENT} metalness={0.9} roughness={0.05} emissive={RED_ACCENT} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
