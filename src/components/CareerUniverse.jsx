import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import StarField from './StarField';
import CareerNode from './CareerNode';
import * as THREE from 'three';

const CAREER_FAMILIES = [
  { id: 'technology', name: 'Technology', color: '#00d4ff', position: [0, 5, 0] },
  { id: 'engineering', name: 'Engineering', color: '#ff6b35', position: [5, 3, 2] },
  { id: 'healthcare', name: 'Healthcare', color: '#00ff88', position: [-5, 3, -2] },
  { id: 'science', name: 'Science & Quant', color: '#aa66ff', position: [4, -3, 4] },
  { id: 'business', name: 'Business & Finance', color: '#ffd700', position: [-4, -3, -4] },
  { id: 'creative', name: 'Creative Arts', color: '#ff3366', position: [6, 0, -3] },
  { id: 'law', name: 'Law & Governance', color: '#66aaff', position: [-6, 0, 3] },
  { id: 'trades', name: 'Skilled Trades', color: '#ff9933', position: [3, -5, -2] },
  { id: 'education', name: 'Education', color: '#33ccaa', position: [-3, -5, 2] },
  { id: 'space', name: 'Space & Aerospace', color: '#b388ff', position: [4, 2, -6] }
];

const MULTIPLIER = 2.5;
const familiesWithAdjustedPosition = CAREER_FAMILIES.map(family => ({
  ...family,
  position: [family.position[0] * MULTIPLIER, family.position[1] * MULTIPLIER, family.position[2] * MULTIPLIER]
}));

// Waypoints for smooth 3D camera travel based on scroll progress (0.0 to 1.0)
const CAMERA_WAYPOINTS = [
  { p: 0.0, pos: [0, 0, 32], look: [0, 0, 0] },
  { p: 0.22, pos: [12, 6, 16], look: [0, 5, 0] },
  { p: 0.44, pos: [-10, -6, 15], look: [-4, -3, -4] },
  { p: 0.66, pos: [0, 10, 14], look: [4, -3, 4] },
  { p: 0.88, pos: [-6, 4, 12], look: [0, 0, 0] },
  { p: 1.0, pos: [0, 0, 10], look: [0, 0, 0] }
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

const UniverseLines = () => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < familiesWithAdjustedPosition.length; i++) {
      for (let j = i + 1; j < familiesWithAdjustedPosition.length; j++) {
        const p1 = new THREE.Vector3(...familiesWithAdjustedPosition[i].position);
        const p2 = new THREE.Vector3(...familiesWithAdjustedPosition[j].position);
        if (p1.distanceTo(p2) < 22) {
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
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.12} />
    </lineSegments>
  );
};

const ScrollCameraController = ({ scrollProgress = 0 }) => {
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }) => {
    const target = getInterpolatedCamera(scrollProgress);
    camera.position.lerp(new THREE.Vector3(target.x, target.y, target.z), 0.06);
    targetLookAt.current.lerp(new THREE.Vector3(target.lx, target.ly, target.lz), 0.06);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

const UniverseScene = ({ scrollProgress = 0, onNodeClick }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotation speed modulates subtly with scroll
      groupRef.current.rotation.y += delta * 0.04;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#00d4ff" distance={40} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffd700" distance={50} />
      
      <StarField count={2500} />
      
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

export default function CareerUniverse({ scrollProgress = 0, onNodeClick }) {
  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 32], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#08080c']} />
        <UniverseScene scrollProgress={scrollProgress} onNodeClick={onNodeClick} />
      </Canvas>
    </div>
  );
}
