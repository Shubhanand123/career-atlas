import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { Sparkles, ArrowRight, Zap, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';

// 8 Luminous Career Galaxy Domains
export const GALAXY_DOMAINS = [
  {
    id: 'tech',
    name: 'AI & Distributed Systems',
    tag: 'HIGH GROWTH',
    color: '#6366F1',
    emissive: '#4F46E5',
    pos: [7.5, 1.2, -4],
    avgCTC: '₹28.5L Avg CTC',
    growth: '+42% YoY',
    aiResilience: '9.8 / 10',
    sampleCareers: ['AI Research Scientist', 'Systems Architect', 'GPU Kernel Dev', 'Security Researcher'],
    familyId: 'technology'
  },
  {
    id: 'healthcare',
    name: 'Medicine & Clinical Surgery',
    tag: 'STRUCTURAL SHORTAGE',
    color: '#38BDF8',
    emissive: '#0284C7',
    pos: [-7.0, 2.5, -5],
    avgCTC: '₹24.0L Avg CTC',
    growth: '+28% YoY',
    aiResilience: '9.9 / 10',
    sampleCareers: ['Biomedical Engineer', 'Cardiothoracic Surgeon', 'Neuro-Oncologist', 'Clinical Trialist'],
    familyId: 'healthcare'
  },
  {
    id: 'science',
    name: 'Quantum Physics & Space',
    tag: 'FRONTIER DISCOVERY',
    color: '#4ADE80',
    emissive: '#16A34A',
    pos: [5.2, -3.0, -9],
    avgCTC: '₹19.5L Avg CTC',
    growth: '+22% YoY',
    aiResilience: '9.7 / 10',
    sampleCareers: ['Quantum Algorithm Scientist', 'Astrophysicist', 'Genomics Fellow', 'Spectroscopist'],
    familyId: 'science'
  },
  {
    id: 'engineering',
    name: 'Aerospace & Humanoid Robotics',
    tag: 'EMBODIED TECH',
    color: '#F59E0B',
    emissive: '#D97706',
    pos: [-6.5, -2.2, -10],
    avgCTC: '₹22.0L Avg CTC',
    growth: '+34% YoY',
    aiResilience: '9.6 / 10',
    sampleCareers: ['Aerospace Propulsion Lead', 'Bipedal Kinematics Eng', 'Avionics Architect', 'CFD Specialist'],
    familyId: 'engineering'
  },
  {
    id: 'finance',
    name: 'Quantitative Finance & Alpha',
    tag: 'MAXIMUM CTC',
    color: '#A78BFA',
    emissive: '#7C3AED',
    pos: [8.5, 3.8, -13],
    avgCTC: '₹65.0L Avg CTC',
    growth: '+19% YoY',
    aiResilience: '9.4 / 10',
    sampleCareers: ['Quantitative Trader', 'HFT C++ Engineer', 'Portfolio Manager', 'Stochastic Modeler'],
    familyId: 'business'
  },
  {
    id: 'creative',
    name: 'Spatial UX & Game Engines',
    tag: 'SPATIAL COMPUTE',
    color: '#FB7185',
    emissive: '#E11D48',
    pos: [-8.2, 4.0, -14],
    avgCTC: '₹18.0L Avg CTC',
    growth: '+26% YoY',
    aiResilience: '9.1 / 10',
    sampleCareers: ['visionOS Spatial Architect', 'Lead Product Designer', 'Unreal Engine Technical Director'],
    familyId: 'creative'
  },
  {
    id: 'governance',
    name: 'Law & Strategic Governance',
    tag: 'HIGH TRUST',
    color: '#C084FC',
    emissive: '#9333EA',
    pos: [2.5, 5.2, -17],
    avgCTC: '₹20.5L Avg CTC',
    growth: '+15% YoY',
    aiResilience: '9.5 / 10',
    sampleCareers: ['Appellate Judge', 'Cross-Border M&A Counsel', 'AI Patent Litigator', 'Diplomat'],
    familyId: 'government'
  },
  {
    id: 'trades',
    name: 'Master Trades & Precision Craft',
    tag: 'ACUTE DEFICIT',
    color: '#06B6D4',
    emissive: '#0891B2',
    pos: [-3.5, -4.5, -16],
    avgCTC: '₹16.5L Avg CTC',
    growth: '+38% YoY',
    aiResilience: '9.9 / 10',
    sampleCareers: ['Underwater Welder', 'Master Electrician', '5-Axis CNC Millwright', 'Cryogenic Tech'],
    familyId: 'trades'
  }
];

// Central Supermassive Atlas Core
function SupermassiveAtlasCore() {
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.2;
      coreRef.current.rotation.z = t * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.15;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group position={[0, 0, -8]}>
      {/* Central Pulsing Nucleus */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshStandardMaterial
          color="#0B0E17"
          emissive="#6366F1"
          emissiveIntensity={1.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Internal Core Halo */}
      <mesh>
        <sphereGeometry args={[1.9, 24, 24]} />
        <meshBasicMaterial
          color="#818CF8"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      {/* Orbiting Gravitational Dust Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[3.2, 0.04, 16, 100]} />
        <meshBasicMaterial
          color="#4ADE80"
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

// Interactive Luminous Domain Node
function DomainPlanetNode({ domain, isSelected, onSelect }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      // Gentle float hover
      meshRef.current.position.y = domain.pos[1] + Math.sin(t * 1.5 + domain.pos[0]) * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.6;
    }
  });

  return (
    <group position={domain.pos}>
      {/* Interactive Planet Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(domain);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        scale={isSelected || hovered ? 1.25 : 1.0}
      >
        <icosahedronGeometry args={[0.9, 4]} />
        <meshStandardMaterial
          color={domain.color}
          emissive={domain.emissive}
          emissiveIntensity={isSelected || hovered ? 2.5 : 1.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Orbiting Equatorial Shield Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.35, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={domain.color}
          transparent
          opacity={hovered || isSelected ? 0.8 : 0.35}
        />
      </mesh>

      {/* Floating 3D Text Label */}
      <Html position={[0, -1.4, 0]} center distanceFactor={14}>
        <div 
          onClick={() => onSelect(domain)}
          style={{
            background: isSelected ? 'rgba(99, 102, 241, 0.3)' : 'rgba(17, 17, 22, 0.85)',
            border: `1px solid ${isSelected ? domain.color : 'rgba(255,255,255,0.12)'}`,
            backdropFilter: 'blur(12px)',
            borderRadius: '10px',
            padding: '4px 10px',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: '700',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
            transition: 'all 0.15s ease'
          }}
        >
          {domain.name}
        </div>
      </Html>
    </group>
  );
}

// Connecting Neural Constellation Lines between Galaxy Hubs
function ConstellationLines() {
  const linePositions = useMemo(() => {
    const coords = [];
    const n = GALAXY_DOMAINS.length;
    for (let i = 0; i < n; i++) {
      const p1 = GALAXY_DOMAINS[i].pos;
      const p2 = GALAXY_DOMAINS[(i + 1) % n].pos;
      coords.push(p1[0], p1[1], p1[2]);
      coords.push(p2[0], p2[1], p2[2]);

      // Connect to center core
      coords.push(p1[0], p1[1], p1[2]);
      coords.push(0, 0, -8);
    }
    return new Float32Array(coords);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#818CF8"
        transparent
        opacity={0.18}
      />
    </lineSegments>
  );
}

// Ambient Floating Stardust Field
function GalaxyStarDust() {
  const points = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 8;
    }
    return positions;
  }, []);

  const starRef = useRef();

  useFrame((state) => {
    if (starRef.current) {
      starRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#A78BFA"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Camera Orbit Coordinator
function GalaxySceneManager({ selectedDomain }) {
  const { camera } = useThree();

  useFrame(() => {
    if (selectedDomain) {
      const targetPos = new THREE.Vector3(
        selectedDomain.pos[0] * 0.6,
        selectedDomain.pos[1] * 0.6 + 1.5,
        selectedDomain.pos[2] + 7
      );
      camera.position.lerp(targetPos, 0.04);
      camera.lookAt(selectedDomain.pos[0], selectedDomain.pos[1], selectedDomain.pos[2]);
    }
  });

  return null;
}

export default function CareerUniverse({ onSelectCategory }) {
  const [selectedDomain, setSelectedDomain] = useState(GALAXY_DOMAINS[0]);

  const handleSelect = (domain) => {
    setSelectedDomain(domain);
    if (onSelectCategory) {
      onSelectCategory(domain.familyId);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '620px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#080809' }}>
      <Canvas
        camera={{ position: [0, 2, 11], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={12} color="#6366F1" />
        <pointLight position={[-10, -5, -5]} intensity={8} color="#4ADE80" />
        <pointLight position={[0, -10, 5]} intensity={6} color="#A78BFA" />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxDistance={18}
          minDistance={4}
          autoRotate={!selectedDomain}
          autoRotateSpeed={0.5}
        />

        <GalaxySceneManager selectedDomain={selectedDomain} />

        <GalaxyStarDust />
        <ConstellationLines />
        <SupermassiveAtlasCore />

        {GALAXY_DOMAINS.map((domain) => (
          <DomainPlanetNode
            key={domain.id}
            domain={domain}
            isSelected={selectedDomain?.id === domain.id}
            onSelect={handleSelect}
          />
        ))}
      </Canvas>

      {/* HUD Telemetry Overlay on Bottom Left */}
      {selectedDomain && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          maxWidth: '380px',
          background: 'rgba(17, 17, 22, 0.92)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '1.25rem',
          color: '#FAFAFA',
          zIndex: 20,
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: '800', color: selectedDomain.color, background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
              {selectedDomain.tag}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4ADE80' }}>
              {selectedDomain.growth}
            </span>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: '900', margin: '0 0 0.5rem 0' }}>
            {selectedDomain.name}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.6rem 0.8rem', borderRadius: '10px', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>Avg Benchmark</span>
              <strong style={{ fontSize: '0.92rem', color: '#4ADE80' }}>{selectedDomain.avgCTC}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>AI Resilience</span>
              <strong style={{ fontSize: '0.92rem', color: '#A78BFA' }}>{selectedDomain.aiResilience}</strong>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.75rem' }}>
            <strong style={{ color: '#fff' }}>Key Roles: </strong>
            {selectedDomain.sampleCareers.join(', ')}
          </div>

          <Link
            to={`/explore?family=${selectedDomain.familyId}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              width: '100%',
              background: selectedDomain.color,
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '0.82rem',
              padding: '0.55rem',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: `0 4px 15px ${selectedDomain.color}40`
            }}
          >
            Explore All Roles in {selectedDomain.name.split(' ')[0]} <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Quick Domain Filter Selector on Top */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        right: '15px',
        display: 'flex',
        gap: '0.4rem',
        overflowX: 'auto',
        paddingBottom: '4px',
        zIndex: 20
      }}>
        {GALAXY_DOMAINS.map(d => (
          <button
            key={d.id}
            onClick={() => handleSelect(d)}
            style={{
              background: selectedDomain?.id === d.id ? d.color : 'rgba(17, 17, 22, 0.85)',
              border: `1px solid ${selectedDomain?.id === d.id ? d.color : 'rgba(255,255,255,0.08)'}`,
              color: selectedDomain?.id === d.id ? '#FFFFFF' : '#94A3B8',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.15s ease'
            }}
          >
            {d.name.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
