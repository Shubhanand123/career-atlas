import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AmbientFluidBlob() {
  const meshRef = useRef();
  const originalPositions = useRef();

  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(2.0, 48);
    originalPositions.current = Float32Array.from(g.attributes.position.array);
    return g;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    const orig = originalPositions.current;
    const count = pos.count;

    for (let i = 0; i < count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const oz = orig[i * 3 + 2];

      const dist = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
      const nx = ox / dist;
      const ny = oy / dist;
      const nz = oz / dist;

      const wave1 = Math.sin(nx * 2.5 + t * 0.5) * Math.cos(ny * 2.2 + t * 0.4) * 0.22;
      const wave2 = Math.sin(nz * 3.0 + t * 0.7) * Math.cos(nx * 2.8 + t * 0.6) * 0.15;
      const morphFactor = 1.0 + wave1 + wave2;

      pos.setXYZ(i, nx * 2.0 * morphFactor, ny * 2.0 * morphFactor, nz * 2.0 * morphFactor);
    }

    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    meshRef.current.rotation.x = t * 0.05;
    meshRef.current.rotation.y = t * 0.08;
  });

  return (
    <mesh ref={meshRef} geometry={geo} position={[3.5, 0, -2]}>
      <meshStandardMaterial
        color="#0D0D14"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function AmbientParticles() {
  const points = useMemo(() => {
    const count = 250;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#818CF8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function Ambient3DBackground() {
  return (
    <div className="global-ambient-3d-backdrop">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[6, 5, 4]} intensity={10} color="#6366F1" />
        <pointLight position={[-5, -4, -3]} intensity={8} color="#4ADE80" />
        <pointLight position={[0, -6, -4]} intensity={6} color="#A78BFA" />

        <AmbientParticles />
        <AmbientFluidBlob />
      </Canvas>
    </div>
  );
}
