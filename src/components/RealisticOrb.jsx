import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Realistic Morphing Fluid Orb — Gen Z iridescent blob
function FluidOrb({ scrollProgress }) {
  const meshRef = useRef();
  const geometry = useRef();
  const originalPositions = useRef();

  // Store original positions after mount
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(2.2, 80);
    originalPositions.current = Float32Array.from(g.attributes.position.array);
    return g;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollProgress;

    // Morph the sphere vertices into a fluid blob with scroll
    const pos = meshRef.current.geometry.attributes.position;
    const orig = originalPositions.current;
    const count = pos.count;

    for (let i = 0; i < count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const oz = orig[i * 3 + 2];

      const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const nx = ox / dist;
      const ny = oy / dist;
      const nz = oz / dist;

      // Layered noise for organic undulation
      const wave1 = Math.sin(nx * 3.2 + t * 0.6) * Math.cos(ny * 2.8 + t * 0.4) * 0.28;
      const wave2 = Math.sin(nz * 4.0 + t * 0.9 + p * 2.0) * Math.cos(nx * 3.5 + t * 0.7) * 0.18;
      const wave3 = Math.cos(ny * 5.0 + t * 1.2 + p * Math.PI) * Math.sin(nz * 4.2 + t * 0.5) * 0.14;

      const morphFactor = 1.0 + wave1 + wave2 + wave3 + p * 0.25;

      pos.setXYZ(i, nx * 2.2 * morphFactor, ny * 2.2 * morphFactor, nz * 2.2 * morphFactor);
    }

    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    // Slow drift rotation
    meshRef.current.rotation.x = t * 0.08 + p * 0.6;
    meshRef.current.rotation.y = t * 0.12 + p * 1.2;
    meshRef.current.rotation.z = t * 0.05;
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial
        color="#0D0D10"
        metalness={0.0}
        roughness={0.0}
        envMapIntensity={1}
      />
    </mesh>
  );
}

// Iridescent glass shell overlay
function GlassShell({ scrollProgress }) {
  const shellRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (shellRef.current) {
      shellRef.current.rotation.x = -t * 0.05 + scrollProgress * 0.4;
      shellRef.current.rotation.y = t * 0.1 + scrollProgress * 0.8;

      // Subtle scale breathe
      const breathe = 1 + Math.sin(t * 0.7) * 0.02;
      shellRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <mesh ref={shellRef}>
      <icosahedronGeometry args={[2.45, 4]} />
      <meshStandardMaterial
        color="#6366F1"
        transparent
        opacity={0.1}
        wireframe={false}
        metalness={0.9}
        roughness={0.05}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Orbit ring lines
function OrbitRings({ scrollProgress }) {
  const rings = [
    { radius: 3.2, color: '#6366F1', opacity: 0.18, tilt: 0.4, speed: 0.3 },
    { radius: 3.8, color: '#4ADE80', opacity: 0.12, tilt: -0.8, speed: -0.2 },
    { radius: 4.4, color: '#A78BFA', opacity: 0.08, tilt: 1.2, speed: 0.15 },
  ];

  const ringRefs = useRef(rings.map(() => React.createRef()));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ringRefs.current.forEach((ref, i) => {
      if (ref.current) {
        ref.current.rotation.z = t * rings[i].speed + scrollProgress * 1.5 * (i % 2 === 0 ? 1 : -1);
      }
    });
  });

  return (
    <>
      {rings.map((ring, i) => (
        <mesh key={i} ref={ringRefs.current[i]} rotation={[ring.tilt, 0, 0]}>
          <torusGeometry args={[ring.radius, 0.015, 8, 128]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity + scrollProgress * 0.06}
          />
        </mesh>
      ))}
    </>
  );
}

// Floating ambient particles
function Particles() {
  const points = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const particleRef = useRef();

  useFrame((state) => {
    if (particleRef.current) {
      particleRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      particleRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={particleRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#A78BFA"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

export default function RealisticOrb({ scrollProgress = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.2} />
      {/* Violet key light */}
      <pointLight position={[5, 6, 5]} intensity={14} color="#6366F1" />
      {/* Neon green rim */}
      <pointLight position={[-6, -4, -4]} intensity={10} color="#4ADE80" />
      {/* Soft white fill */}
      <pointLight position={[0, 0, 7]} intensity={5} color="#FFFFFF" />
      {/* Deep purple back */}
      <pointLight position={[0, -8, -6]} intensity={8} color="#7C3AED" />

      <Particles />
      <FluidOrb scrollProgress={scrollProgress} />
      <GlassShell scrollProgress={scrollProgress} />
      <OrbitRings scrollProgress={scrollProgress} />
    </Canvas>
  );
}
