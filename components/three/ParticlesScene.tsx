'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 1200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 2 + 0.5;
    }
    return arr;
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.025 + mouse.current.x * 0.05;
    mesh.current.rotation.x = t * 0.01 + mouse.current.y * 0.03;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#8B0000"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function AmbientSmoke() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = clock.getElapsedTime() * 0.02;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.1;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -3]}>
      <planeGeometry args={[20, 20, 10, 10]} />
      <meshBasicMaterial color="#160c0c" transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
}

function RedLight() {
  const light = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!light.current) return;
    const t = clock.getElapsedTime();
    light.current.intensity = 1.5 + Math.sin(t * 0.8) * 0.3;
    light.current.position.x = Math.sin(t * 0.4) * 3;
    light.current.position.y = Math.cos(t * 0.3) * 2;
  });

  return <pointLight ref={light} color="#8B0000" intensity={2} distance={12} position={[0, 0, 2]} />;
}

export default function ParticlesScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.1} color="#160c0c" />
      <RedLight />
      <Particles count={1000} />
      <AmbientSmoke />
    </Canvas>
  );
}
