import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 8 Stages Color Accents
const STAGE_THEMES = [
  { color: '#8B5CF6', emissive: '#6D28D9', name: 'Possibility' },   // Electric Purple
  { color: '#38BDF8', emissive: '#0284C7', name: 'Interest' },      // Sky Blue
  { color: '#10B981', emissive: '#059669', name: 'Career' },        // Emerald / Bright Lime
  { color: '#F59E0B', emissive: '#D97706', name: 'Details' },       // Warm Amber
  { color: '#EC4899', emissive: '#BE185D', name: 'Pathway' },       // Hot Pink
  { color: '#6366F1', emissive: '#4338CA', name: 'University' },    // Indigo
  { color: '#14B8A6', emissive: '#0F766E', name: 'Career Twin' },   // Teal
  { color: '#A855F7', emissive: '#7E22CE', name: 'Possibilities' }, // Violet
];

function MorphingSculpture({ scrollProgress, activeCategory }) {
  const meshRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const nodesGroupRef = useRef();

  // Interpolated smooth progress
  const targetProgress = useRef(0);
  targetProgress.current = scrollProgress;
  const currentProgress = useRef(0);

  // Generate orbital nodes for Stage 2 / Stage 5 / Stage 8
  const orbitalNodes = useMemo(() => {
    const nodes = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.8;
      nodes.push({
        pos: [Math.cos(angle) * radius, (Math.sin(i * 1.5) * 0.6), Math.sin(angle) * radius],
        scale: 0.08 + (i % 3) * 0.03,
        id: i
      });
    }
    return nodes;
  }, []);

  useFrame((state, delta) => {
    // Smooth lerp of progress
    currentProgress.current = THREE.MathUtils.lerp(currentProgress.current, targetProgress.current, 0.08);
    const p = currentProgress.current;
    const time = state.clock.getElapsedTime();

    // Stage index from 0 to 7
    const stageFloat = p * 7;
    const stageIndex = Math.min(Math.floor(stageFloat), 7);
    const stageProgress = stageFloat - stageIndex;

    // Base rotation influenced by scroll
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2 + p * Math.PI * 4;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.15 + (p * Math.PI * 1.5);
      meshRef.current.rotation.z = Math.cos(time * 0.25) * 0.1;

      // Morphing scale based on stage
      let baseScale = 1.4;
      if (p < 0.15) {
        // Stage 1: Expanding from center
        baseScale = 1.2 + p * 1.5;
      } else if (p < 0.35) {
        // Stage 2: Category expansion
        baseScale = 1.5 + Math.sin(stageProgress * Math.PI) * 0.3;
      } else if (p < 0.50) {
        // Stage 3 & 4: Focused career crystal
        baseScale = 1.35;
      } else if (p < 0.65) {
        // Stage 5: Elongated pathway
        baseScale = 1.1;
      } else if (p < 0.85) {
        // Stage 6 & 7: Rotunda & Twin
        baseScale = 1.4;
      } else {
        // Stage 8: Branching expansion
        baseScale = 1.6;
      }
      
      meshRef.current.scale.setScalar(baseScale);
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.4 - p * Math.PI * 3;
      innerRef.current.rotation.x = time * 0.3;
    }

    // Rings orientation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.15 + p * Math.PI * 2;
      ring1Ref.current.rotation.y = Math.PI / 4 + p * Math.PI;
      ring1Ref.current.scale.setScalar(1.9 + Math.sin(p * Math.PI * 4) * 0.25);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.2 + p * Math.PI * 2.5;
      ring2Ref.current.rotation.z = Math.PI / 3 + p * Math.PI * 1.5;
      ring2Ref.current.scale.setScalar(2.3 + Math.cos(p * Math.PI * 3) * 0.3);
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.12 - p * Math.PI * 3;
      ring3Ref.current.rotation.x = Math.PI / 6 + p * Math.PI * 2;
      ring3Ref.current.scale.setScalar(2.7 + Math.sin(p * Math.PI * 2) * 0.35);
    }

    // Nodes expansion
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y = time * 0.08 + p * Math.PI;
      const nodeExpansion = 1.0 + Math.sin(p * Math.PI) * 0.5;
      nodesGroupRef.current.scale.setScalar(nodeExpansion);
    }
  });

  // Pick theme color smoothly based on scroll progress
  const stageFloat = scrollProgress * 7;
  const currentStageIdx = Math.min(Math.floor(stageFloat), 7);
  const currentTheme = STAGE_THEMES[currentStageIdx] || STAGE_THEMES[0];

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Morphing Geometric Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color={currentTheme.color}
          emissive={currentTheme.emissive}
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.2}
          transmission={0.65}
          thickness={1.2}
          ior={1.45}
          transparent
          opacity={0.88}
          wireframe={scrollProgress > 0.45 && scrollProgress < 0.65}
        />
      </mesh>

      {/* Inner Glowing Polyhedron Nucleus */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive={currentTheme.color}
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Primary Orbital Transformation Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={currentTheme.color}
          emissive={currentTheme.color}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Secondary Orbital Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Tertiary Alignment Ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#EC4899"
          emissive="#DB2777"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Satellite Data Nodes */}
      <group ref={nodesGroupRef}>
        {orbitalNodes.map(node => (
          <mesh key={node.id} position={node.pos}>
            <sphereGeometry args={[node.scale, 16, 16]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive={currentTheme.color}
              emissiveIntensity={0.9}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function CameraRig({ scrollProgress }) {
  useFrame((state) => {
    // Subtle, elegant camera drift keyed directly to scroll progression
    const p = scrollProgress;
    const targetZ = 5.2 - Math.sin(p * Math.PI) * 0.8;
    const targetY = (p - 0.5) * 0.6;
    const targetX = Math.sin(p * Math.PI * 2) * 0.4;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function TransformingAtlasCore({ scrollProgress = 0, activeCategory = 'all' }) {
  return (
    <div className="transforming-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} color="#FFFBF5" />
        <directionalLight position={[-10, -5, -10]} intensity={0.6} color="#8B5CF6" />
        <pointLight position={[0, 0, 2]} intensity={0.8} color="#38BDF8" />

        <CameraRig scrollProgress={scrollProgress} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <MorphingSculpture scrollProgress={scrollProgress} activeCategory={activeCategory} />
        </Float>
      </Canvas>
    </div>
  );
}
