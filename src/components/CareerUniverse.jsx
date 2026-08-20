import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import StarField from './StarField';
import CareerNode from './CareerNode';
import * as THREE from 'three';

export const CAREER_FAMILIES = [
  { id: 'technology', name: 'Technology & AI', color: '#6366F1', position: [0, 5, 0], tag: 'HIGH GROWTH', avgCTC: '₹28.5L' },
  { id: 'engineering', name: 'Aerospace & Robotics', color: '#F59E0B', position: [5, 3, 2], tag: 'EMBODIED TECH', avgCTC: '₹22.0L' },
  { id: 'healthcare', name: 'Clinical Medicine & Surgery', color: '#38BDF8', position: [-5, 3, -2], tag: 'STRUCTURAL DEFICIT', avgCTC: '₹24.0L' },
  { id: 'science', name: 'Quantum & Pure Science', color: '#4ADE80', position: [4, -3, 4], tag: 'FRONTIER DISCOVERY', avgCTC: '₹19.5L' },
  { id: 'business', name: 'Quantitative Finance', color: '#A78BFA', position: [-4, -3, -4], tag: 'MAXIMUM CTC', avgCTC: '₹65.0L' },
  { id: 'creative', name: 'Spatial UX & Game Engines', color: '#FB7185', position: [6, 0, -3], tag: 'SPATIAL COMPUTE', avgCTC: '₹18.0L' },
  { id: 'law', name: 'Law & Strategic Governance', color: '#C084FC', position: [-6, 0, 3], tag: 'HIGH TRUST', avgCTC: '₹20.5L' },
  { id: 'trades', name: 'Master Trades & Craft', color: '#06B6D4', position: [3, -5, -2], tag: 'ACUTE SHORTAGE', avgCTC: '₹16.5L' },
  { id: 'education', name: 'Academia & Research', color: '#34D399', position: [-3, -5, 2], tag: 'KNOWLEDGE BASE', avgCTC: '₹14.0L' },
  { id: 'space', name: 'Deep Space Propulsion', color: '#818CF8', position: [4, 2, -6], tag: 'ORBITAL INFRA', avgCTC: '₹26.0L' }
];

const MULTIPLIER = 2.4;
const familiesWithAdjustedPosition = CAREER_FAMILIES.map(family => ({
  ...family,
  position: [family.position[0] * MULTIPLIER, family.position[1] * MULTIPLIER, family.position[2] * MULTIPLIER]
}));

// 8 Cinematic Camera Trajectory Waypoints driven by scrollProgress (0.0 to 1.0)
const CAMERA_WAYPOINTS = [
  { p: 0.00, pos: [0, 2, 34], look: [0, 0, 0] },
  { p: 0.14, pos: [3, 14, 16], look: [0, 12, 0] },         // Technology & AI
  { p: 0.28, pos: [15, 9, 14], look: [12, 7, 5] },        // Aerospace & Robotics
  { p: 0.42, pos: [-14, 9, 10], look: [-12, 7, -5] },      // Healthcare & Medicine
  { p: 0.56, pos: [12, -7, 16], look: [10, -7, 10] },       // Quantum Physics
  { p: 0.70, pos: [-12, -7, -10], look: [-10, -7, -10] },   // Quantitative Finance
  { p: 0.84, pos: [15, 2, -10], look: [14, 0, -7] },        // Spatial & Trades
  { p: 1.00, pos: [0, 0, 12], look: [0, 0, 0] }            // Supermassive Core Convergence
];

function getInterpolatedCamera(progress) {
  const p = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < CAMERA_WAYPOINTS.length - 1; i++) {
    const w1 = CAMERA_WAYPOINTS[i];
    const w2 = CAMERA_WAYPOINTS[i + 1];
    if (p >= w1.p && p <= w2.p) {
      const t = (p - w1.p) / (w2.p - w1.p);
      const ease = t * t * (3 - 2 * t); // smoothstep
      return {
        x: w1.pos[0] + (w2.pos[0] - w1.pos[0]) * ease,
        y: w1.pos[1] + (w2.pos[1] - w1.pos[1]) * ease,
        z: w1.pos[2] + (w2.pos[2] - w1.pos[2]) * ease,
        lx: w1.look[0] + (w2.look[0] - w1.look[0]) * ease,
        ly: w1.look[1] + (w2.look[1] - w1.look[1]) * ease,
        lz: w1.look[2] + (w2.look[2] - w1.look[2]) * ease
      };
    }
  }
  return { x: 0, y: 0, z: 32, lx: 0, ly: 0, lz: 0 };
}

// Interconnecting Constellation Lines
const UniverseLines = () => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < familiesWithAdjustedPosition.length; i++) {
      for (let j = i + 1; j < familiesWithAdjustedPosition.length; j++) {
        const p1 = new THREE.Vector3(...familiesWithAdjustedPosition[i].position);
        const p2 = new THREE.Vector3(...familiesWithAdjustedPosition[j].position);
        if (p1.distanceTo(p2) < 24) {
          pts.push(p1, p2);
        }
      }
    }
    return pts;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#818CF8" transparent opacity={0.2} />
    </lineSegments>
  );
};

// Central Supermassive Atlas Gravitational Ring
const CentralCoreRing = () => {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + Math.PI / 4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Supermassive Star Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#08080C"
          emissive="#6366F1"
          emissiveIntensity={1.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Orbiting Gravitational Plasma Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[3.2, 0.035, 16, 128]} />
        <meshBasicMaterial color="#4ADE80" transparent opacity={0.45} />
      </mesh>
    </group>
  );
};

const ScrollCameraController = ({ scrollProgress = 0 }) => {
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }) => {
    const target = getInterpolatedCamera(scrollProgress);
    camera.position.lerp(new THREE.Vector3(target.x, target.y, target.z), 0.08);
    targetLookAt.current.lerp(new THREE.Vector3(target.lx, target.ly, target.lz), 0.08);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

const UniverseScene = ({ scrollProgress = 0, onNodeClick }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.035;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0, 0]} intensity={3.0} color="#6366F1" distance={50} />
      <pointLight position={[15, 15, 15]} intensity={2.0} color="#4ADE80" distance={60} />
      <pointLight position={[-15, -10, -10]} intensity={1.8} color="#A78BFA" distance={60} />
      
      <StarField count={2500} />
      <CentralCoreRing />
      
      <ScrollCameraController scrollProgress={scrollProgress} />

      <group ref={groupRef}>
        <UniverseLines />
        {familiesWithAdjustedPosition.map((family) => (
          <CareerNode
            key={family.id}
            id={family.id}
            name={family.name}
            color={family.color}
            position={family.position}
            onClick={onNodeClick || (() => {})}
          />
        ))}
      </group>
    </>
  );
};

export default function CareerUniverse({ scrollProgress = 0, onNodeClick, onSelectCategory, height = '100%' }) {
  const handleClick = (id) => {
    if (onSelectCategory) onSelectCategory(id);
    if (onNodeClick) onNodeClick(id);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: height, overflow: 'hidden' }}>
      <Canvas 
        camera={{ position: [0, 2, 34], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <UniverseScene scrollProgress={scrollProgress} onNodeClick={handleClick} />
      </Canvas>
    </div>
  );
}
