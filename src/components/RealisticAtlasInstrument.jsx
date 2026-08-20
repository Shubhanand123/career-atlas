import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Precision Realistic Golden Atlas Navigational Instrument
function GyroscopicAstrolabe({ scrollProgress }) {
  const groupRef = useRef();
  const outerRingRef = useRef();
  const midRingRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();
  const radialNeedleRef = useRef();
  const nodesGroupRef = useRef();

  const targetProgress = useRef(0);
  targetProgress.current = scrollProgress;
  const currentProgress = useRef(0);

  // Generate 8 Orbital Career Node Coordinates on the Golden Track
  const orbitalNodes = useMemo(() => {
    const nodes = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.6;
      nodes.push({
        pos: [Math.cos(angle) * radius, (Math.sin(i * 2) * 0.4), Math.sin(angle) * radius],
        scale: 0.08 + (i % 2) * 0.03,
        id: i
      });
    }
    return nodes;
  }, []);

  useFrame((state, delta) => {
    currentProgress.current = THREE.MathUtils.lerp(currentProgress.current, targetProgress.current, 0.08);
    const p = currentProgress.current;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15 + p * Math.PI * 3;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1 + (p * Math.PI * 0.8);
      
      // Dynamic scale transformation across 8 stages
      const baseScale = 1.35 + Math.sin(p * Math.PI) * 0.25;
      groupRef.current.scale.setScalar(baseScale);
    }

    // Outer Heavy Golden Gimbal Ring
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * 0.2 + p * Math.PI * 2;
      outerRingRef.current.rotation.y = Math.PI / 4 + p * Math.PI;
    }

    // Middle Precision Calibration Ring
    if (midRingRef.current) {
      midRingRef.current.rotation.y = -time * 0.25 + p * Math.PI * 2.5;
      midRingRef.current.rotation.z = Math.PI / 3 + p * Math.PI * 1.5;
    }

    // Inner Gyro Alignment Ring
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = time * 0.18 - p * Math.PI * 3;
      innerRingRef.current.rotation.x = Math.PI / 6 + p * Math.PI * 2;
    }

    // Navigational Pointer / Needle
    if (radialNeedleRef.current) {
      radialNeedleRef.current.rotation.z = time * 0.4 + p * Math.PI * 4;
      radialNeedleRef.current.rotation.y = time * 0.2;
    }

    // Central Crystalline Gold Core
    if (coreRef.current) {
      coreRef.current.rotation.y = -time * 0.3 - p * Math.PI * 2;
      coreRef.current.rotation.x = time * 0.25;
    }

    // Orbital Nodes Group
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y = time * 0.1 + p * Math.PI * 1.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Outer Heavy Golden Astrolabe Ring with Calibration Teeth */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.2, 0.05, 24, 120]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#785A14"
          emissiveIntensity={0.25}
          roughness={0.16}
          metalness={0.94}
        />
      </mesh>

      {/* 2. Middle Golden Precision Dial Ring */}
      <mesh ref={midRingRef}>
        <torusGeometry args={[1.75, 0.04, 20, 100]} />
        <meshStandardMaterial
          color="#F3E5AB"
          emissive="#C5A059"
          emissiveIntensity={0.3}
          roughness={0.12}
          metalness={0.96}
        />
      </mesh>

      {/* 3. Inner Gyroscopic Gimbal Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.3, 0.035, 18, 90]} />
        <meshStandardMaterial
          color="#E6CA65"
          emissive="#997A15"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.92}
        />
      </mesh>

      {/* 4. Central Mechanical Navigational Compass Dial */}
      <group ref={radialNeedleRef}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.4, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#D4AF37"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 1.8, 16]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#785A14"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>
      </group>

      {/* 5. Central Faceted Crystal & Gold Nucleus */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FAF5E4"
          emissiveIntensity={1.4}
          roughness={0.08}
          metalness={0.4}
          wireframe={false}
        />
      </mesh>

      {/* 6. Surrounding Diamond-Faceted Gold Outer Cage */}
      <mesh>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#997A15"
          emissiveIntensity={0.4}
          roughness={0.18}
          metalness={0.92}
          wireframe={true}
        />
      </mesh>

      {/* 7. Orbital Golden Compass Nodes */}
      <group ref={nodesGroupRef}>
        {orbitalNodes.map((node) => (
          <mesh key={node.id} position={node.pos}>
            <sphereGeometry args={[node.scale, 16, 16]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#D4AF37"
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function CameraRig({ scrollProgress }) {
  useFrame((state) => {
    const p = scrollProgress;
    const targetZ = 5.2 - Math.sin(p * Math.PI) * 0.7;
    const targetY = (p - 0.5) * 0.5;
    const targetX = Math.sin(p * Math.PI * 2) * 0.3;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function RealisticAtlasInstrument({ scrollProgress = 0 }) {
  return (
    <div className="fixed-3d-instrument-container">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        {/* Warm Golden Key Light */}
        <directionalLight position={[10, 10, 10]} intensity={1.8} color="#FFF8E7" />
        {/* Deep Gold Rim Light */}
        <directionalLight position={[-10, -5, -10]} intensity={1.2} color="#D4AF37" />
        {/* Pure White Central Fill */}
        <pointLight position={[0, 0, 2.5]} intensity={1.4} color="#FFFFFF" />

        <CameraRig scrollProgress={scrollProgress} />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
          <GyroscopicAstrolabe scrollProgress={scrollProgress} />
        </Float>
      </Canvas>
    </div>
  );
}
