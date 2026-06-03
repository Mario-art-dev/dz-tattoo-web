'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import TattooMachine3D from './tattoo-machine-3d';

export default function Globe() {
  return (
    <div className="w-[280px] h-[280px] relative">
      {/* Red ambient glow behind the machine */}
      <div className="absolute inset-0 rounded-full bg-[#8B0000]/10 blur-3xl scale-150 pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        {/* Lights */}
        <ambientLight intensity={0.08} />
        <pointLight color="#8B0000" intensity={4} position={[2, 1, 3]} distance={12} />
        <pointLight color="#C41E1E" intensity={2} position={[-2, 2, 2]} distance={10} />
        <pointLight color="#ffffff" intensity={0.8} position={[0, -2, 3]} distance={8} />
        <pointLight color="#8B0000" intensity={1.5} position={[0, 3, 1]} distance={8} />

        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <TattooMachine3D />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI * 0.7}
          minPolarAngle={Math.PI * 0.3}
        />
      </Canvas>
    </div>
  );
}
