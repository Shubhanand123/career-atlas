import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

const CareerNode = ({ id, name, color, position, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <group position={position}>
        <mesh
          ref={meshRef}
          onClick={() => onClick(id)}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <boxGeometry args={[0.9, 1.5, 0.9]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        <mesh>
          <boxGeometry args={[1.1, 1.7, 1.1]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={hovered ? 0.2 : 0.05} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {(hovered || true) && (
          <Html distanceFactor={15} zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
            <div 
              className="career-node-label" 
              style={{ 
                opacity: hovered ? 1 : 0.5,
                transform: hovered ? 'translate3d(-50%, -200%, 0) scale(1.1)' : 'translate3d(-50%, -150%, 0) scale(1)',
                transition: 'all 0.2s ease-out',
                border: hovered ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.1)',
                boxShadow: hovered ? `0 0 10px ${color}80` : 'none'
              }}
            >
              {name}
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
};

export default CareerNode;
