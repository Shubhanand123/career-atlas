import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

const CareerNode = ({ id, name, color, position, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();
  const innerCoreRef = useRef();
  const wireCageRef = useRef();
  const ringRef = useRef();
  const secondRingRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const rotSpeed = hovered ? 2.5 : 0.8;

    // Primary Crystal faceted rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotSpeed;
      meshRef.current.rotation.x = Math.sin(t * 1.2) * 0.2;
      const targetScale = hovered ? 1.4 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
    }

    // Inner glowing core pulsing
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 1.5;
      const pulse = 1.0 + Math.sin(t * 3.5) * 0.1;
      innerCoreRef.current.scale.setScalar(pulse);
    }

    // Outer wireframe cage counter-rotation
    if (wireCageRef.current) {
      wireCageRef.current.rotation.y -= delta * (rotSpeed * 0.6);
      wireCageRef.current.rotation.z += delta * 0.3;
    }

    // Gyroscopic Orbit Rings
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.2;
    }
    if (secondRingRef.current) {
      secondRingRef.current.rotation.x += delta * 0.9;
      secondRingRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <Float
      speed={2.2}
      rotationIntensity={0.6}
      floatIntensity={1.2}
    >
      <group position={position}>
        {/* 1. Central Quantum Core (Pulsing energy sphere) */}
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[0.45, 0]} />
          <meshBasicMaterial 
            color="#FFFFFF" 
            wireframe={false}
          />
        </mesh>

        {/* 2. Main Futuristic Faceted Crystal Prism */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick(id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <octahedronGeometry args={[1.05, 0]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={hovered ? 2.8 : 1.2}
            metalness={0.85}
            roughness={0.15}
            transparent
            opacity={0.92}
          />
        </mesh>
        
        {/* 3. Outer Holographic Diamond Wireframe Cage */}
        <mesh ref={wireCageRef}>
          <icosahedronGeometry args={[1.45, 0]} />
          <meshBasicMaterial 
            color={color} 
            wireframe
            transparent 
            opacity={hovered ? 0.6 : 0.22} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 4. Primary Gyroscopic Orbit Plasma Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={hovered ? 0.85 : 0.35} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 5. Secondary Tilted Equatorial Ring */}
        <mesh ref={secondRingRef} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.05, 0.015, 16, 64]} />
          <meshBasicMaterial 
            color="#FFFFFF" 
            transparent 
            opacity={hovered ? 0.6 : 0.18} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 6. High-Tech Glassmorphic Hover / Node Label */}
        <Html distanceFactor={14} zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
          <div 
            style={{
              opacity: hovered ? 1 : 0.75,
              transform: hovered ? 'translate3d(-50%, -230%, 0) scale(1.12)' : 'translate3d(-50%, -190%, 0) scale(1)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              background: hovered ? 'rgba(17, 17, 24, 0.95)' : 'rgba(10, 10, 15, 0.8)',
              border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.12)'}`,
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '6px 14px',
              color: '#FFFFFF',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '12px',
              fontWeight: '800',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: hovered ? `0 0 20px ${color}80, 0 10px 30px rgba(0,0,0,0.8)` : '0 4px 15px rgba(0,0,0,0.5)'
            }}
          >
            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
            {name}
          </div>
        </Html>
      </group>
    </Float>
  );
};

export default CareerNode;
