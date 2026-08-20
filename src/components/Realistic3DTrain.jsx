import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Realistic High-Speed Luxury Bullet Train in Gold, Black & White
function BulletTrain({ scrollProgress }) {
  const trainGroupRef = useRef();
  const trackGroupRef = useRef();
  const wheelsGroupRef = useRef();
  const speedLinesRef = useRef();

  const targetProgress = useRef(0);
  targetProgress.current = scrollProgress;
  const currentProgress = useRef(0);

  // Speed particles passing by
  const speedLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 40; i++) {
      lines.push({
        pos: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.3) * 6,
          (Math.random() - 0.5) * 20
        ],
        length: 1.5 + Math.random() * 2.5,
        speed: 1.2 + Math.random() * 1.5,
        id: i
      });
    }
    return lines;
  }, []);

  useFrame((state, delta) => {
    currentProgress.current = THREE.MathUtils.lerp(currentProgress.current, targetProgress.current, 0.08);
    const p = currentProgress.current;
    const time = state.clock.getElapsedTime();

    // Train physical vibration and position reacting directly to scroll progression
    if (trainGroupRef.current) {
      // Subtle high-speed rumble
      const rumble = Math.sin(time * 25) * 0.015;
      
      // Train forward translation and banking curves
      trainGroupRef.current.position.y = rumble;
      trainGroupRef.current.position.z = -1.5 + p * 3.0; // Moves forward along the track
      
      // Train banks slightly on curves based on scroll
      const bankAngle = Math.sin(p * Math.PI * 3) * 0.08;
      trainGroupRef.current.rotation.z = bankAngle;
      trainGroupRef.current.rotation.y = -Math.PI / 6 + Math.sin(p * Math.PI * 2) * 0.2;
      trainGroupRef.current.rotation.x = Math.sin(p * Math.PI) * 0.05;
    }

    // Moving track ties illusion
    if (trackGroupRef.current) {
      trackGroupRef.current.position.z = ((time * 8 + p * 50) % 4) - 2;
    }

    // Speed streaks animation
    if (speedLinesRef.current) {
      speedLinesRef.current.children.forEach((child, i) => {
        child.position.z += (delta * 25 + p * 20);
        if (child.position.z > 10) {
          child.position.z = -15;
        }
      });
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* 3D LOCOMOTIVE & CARRIAGES */}
      <group ref={trainGroupRef}>

        {/* 1. AERODYNAMIC NOSE (Bullet Shape) */}
        <mesh position={[0, 0.5, 3.2]} rotation={[Math.PI / 6, 0, 0]}>
          <coneGeometry args={[0.9, 2.0, 32]} />
          <meshStandardMaterial
            color="#0E121A"
            metalness={0.92}
            roughness={0.15}
          />
        </mesh>

        {/* Gold Nose Trim / Accent Stripe */}
        <mesh position={[0, 0.45, 3.3]} rotation={[Math.PI / 6, 0, 0]}>
          <coneGeometry args={[0.92, 0.25, 32]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#785A14"
            emissiveIntensity={0.6}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* 2. MAIN LOCOMOTIVE ENGINE BODY */}
        <mesh position={[0, 0.7, 0.8]}>
          <boxGeometry args={[1.7, 1.4, 4.0]} />
          <meshStandardMaterial
            color="#080A0E"
            metalness={0.94}
            roughness={0.12}
          />
        </mesh>

        {/* Upper Curved Roof */}
        <mesh position={[0, 1.4, 0.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.85, 0.85, 4.0, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial
            color="#141822"
            metalness={0.9}
            roughness={0.18}
          />
        </mesh>

        {/* Gold Streamline Speed Stripes (Left & Right) */}
        <mesh position={[0.86, 0.7, 0.8]}>
          <boxGeometry args={[0.02, 0.15, 4.0]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D4AF37"
            emissiveIntensity={0.8}
            metalness={0.96}
          />
        </mesh>
        <mesh position={[-0.86, 0.7, 0.8]}>
          <boxGeometry args={[0.02, 0.15, 4.0]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D4AF37"
            emissiveIntensity={0.8}
            metalness={0.96}
          />
        </mesh>

        {/* 3. COCKPIT VISOR GLASS (Front Cockpit Window) */}
        <mesh position={[0, 1.1, 2.7]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[1.3, 0.6, 0.1]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FAF5E4"
            emissiveIntensity={1.2}
            roughness={0.05}
            metalness={0.2}
          />
        </mesh>

        {/* 4. PASSENGER ILLUMINATED WINDOW STRIP (Panoramic Glow) */}
        <mesh position={[0.86, 0.95, 0.5]}>
          <boxGeometry args={[0.03, 0.35, 3.2]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FAF8F5"
            emissiveIntensity={1.5}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[-0.86, 0.95, 0.5]}>
          <boxGeometry args={[0.03, 0.35, 3.2]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FAF8F5"
            emissiveIntensity={1.5}
            roughness={0.1}
          />
        </mesh>

        {/* 5. DUAL HIGH-BEAM FRONT HEADLIGHTS */}
        <mesh position={[0.45, 0.35, 4.0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={2.5}
          />
        </mesh>
        <mesh position={[-0.45, 0.35, 4.0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* Light Cone Beams Shooting Forward */}
        <mesh position={[0.45, 0.2, 7.0]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[1.2, 6.0, 16, 1, true]} />
          <meshBasicMaterial
            color="#FFF8E7"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[-0.45, 0.2, 7.0]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[1.2, 6.0, 16, 1, true]} />
          <meshBasicMaterial
            color="#FFF8E7"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 6. SECOND CARRIAGE (Trailing Coach) */}
        <mesh position={[0, 0.7, -3.8]}>
          <boxGeometry args={[1.7, 1.4, 4.2]} />
          <meshStandardMaterial
            color="#0B0E14"
            metalness={0.92}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[0, 1.4, -3.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.85, 0.85, 4.2, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial
            color="#141822"
            metalness={0.9}
            roughness={0.18}
          />
        </mesh>

        {/* Carriage 2 Windows */}
        <mesh position={[0.86, 0.95, -3.8]}>
          <boxGeometry args={[0.03, 0.35, 3.6]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FAF8F5"
            emissiveIntensity={1.5}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[-0.86, 0.95, -3.8]}>
          <boxGeometry args={[0.03, 0.35, 3.6]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FAF8F5"
            emissiveIntensity={1.5}
            roughness={0.1}
          />
        </mesh>

        {/* Carriage 2 Gold Trim */}
        <mesh position={[0.86, 0.7, -3.8]}>
          <boxGeometry args={[0.02, 0.15, 4.2]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D4AF37"
            emissiveIntensity={0.8}
            metalness={0.96}
          />
        </mesh>
        <mesh position={[-0.86, 0.7, -3.8]}>
          <boxGeometry args={[0.02, 0.15, 4.2]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D4AF37"
            emissiveIntensity={0.8}
            metalness={0.96}
          />
        </mesh>

        {/* Accordion Gangway Connector Between Coaches */}
        <mesh position={[0, 0.7, -1.5]}>
          <boxGeometry args={[1.5, 1.2, 0.6]} />
          <meshStandardMaterial
            color="#050608"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>

        {/* 7. HIGH-VOLTAGE GOLDEN ROOF PANTOGRAPH */}
        <group position={[0, 1.6, -1.0]}>
          <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} emissive="#785A14" />
          </mesh>
          <mesh position={[0, 0.55, 0.25]} rotation={[-Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} emissive="#785A14" />
          </mesh>
          <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#D4AF37" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </group>

      {/* 3D GLOWING GOLDEN MAGNETIC HIGH-SPEED TRACKS */}
      <group position={[0, -0.05, 0]}>
        {/* Left Golden Rail */}
        <mesh position={[-0.9, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 30, 16]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D4AF37"
            emissiveIntensity={1.2}
            metalness={0.98}
            roughness={0.1}
          />
        </mesh>

        {/* Right Golden Rail */}
        <mesh position={[0.9, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 30, 16]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D4AF37"
            emissiveIntensity={1.2}
            metalness={0.98}
            roughness={0.1}
          />
        </mesh>

        {/* Animated Moving Sleepers / Ties */}
        <group ref={trackGroupRef}>
          {Array.from({ length: 30 }).map((_, i) => (
            <mesh key={i} position={[0, -0.04, -15 + i * 1.0]}>
              <boxGeometry args={[2.4, 0.05, 0.2]} />
              <meshStandardMaterial
                color="#181D26"
                roughness={0.5}
                metalness={0.8}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* SPEED STREAKS / HYPERSPACE PARTICLES */}
      <group ref={speedLinesRef}>
        {speedLines.map((line) => (
          <mesh key={line.id} position={line.pos}>
            <cylinderGeometry args={[0.015, 0.015, line.length, 6]} rotation={[Math.PI / 2, 0, 0]} />
            <meshBasicMaterial
              color="#FAF5E4"
              transparent
              opacity={0.35}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function CameraController({ scrollProgress }) {
  useFrame((state) => {
    const p = scrollProgress;

    // Camera smoothly pans, zooms, and tracks the train dynamically with scrolling
    // Stage 1: Front dramatic 3/4 hero view
    // Stage 3-5: Dynamic high-speed side chase
    // Stage 6-8: Elevated front diagonal overview
    const targetX = 2.4 - Math.sin(p * Math.PI) * 1.5;
    const targetY = 1.2 + Math.sin(p * Math.PI * 2) * 0.4;
    const targetZ = 6.2 - p * 2.0;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    // Camera looks towards the train's lead nose
    const lookZ = 1.0 + p * 1.5;
    state.camera.lookAt(0, 0.6, lookZ);
  });
  return null;
}

export default function Realistic3DTrain({ scrollProgress = 0 }) {
  return (
    <div className="fixed-3d-train-container">
      <Canvas
        camera={{ position: [2.4, 1.2, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        {/* Warm Golden Key Light */}
        <directionalLight position={[10, 15, 10]} intensity={2.2} color="#FFF8E7" />
        {/* Deep Gold Rim Light */}
        <directionalLight position={[-10, 5, -10]} intensity={1.5} color="#D4AF37" />
        {/* Crisp White Underside Fill */}
        <pointLight position={[0, -0.5, 2]} intensity={1.8} color="#FFFFFF" />

        <CameraController scrollProgress={scrollProgress} />

        <BulletTrain scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
