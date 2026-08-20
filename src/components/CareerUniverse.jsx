import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// 12 Distinct Architectural Zones of the Knowledge City
export const ARCHITECTURAL_ZONES = [
  {
    id: 'entrance',
    name: '01 · THE GRAND PORTAL',
    subtitle: 'Entrance to the Career City',
    tag: 'FOUNDATION',
    pos: [0, 0, 0],
    scale: [6, 1.2, 5],
    color: '#d6c5b0',
    stoneColor: '#2b231d',
    accentColor: '#c99a5e',
    height: 3.5,
    cameraPos: [4.5, 6.5, 11],
    cameraLook: [0, 1.5, 0],
    description: '15,000+ normalized occupations mapped across global skill, education, and compensation space.'
  },
  {
    id: 'streams',
    name: '02 · STREAMS QUADRANT',
    subtitle: 'Science · Commerce · Arts · Trades',
    tag: 'FOUNDATIONAL STREAMS',
    pos: [-8.5, 0.5, -12],
    scale: [7.5, 1.4, 6],
    color: '#9fb28b',
    stoneColor: '#262d22',
    accentColor: '#b4c99c',
    height: 5.2,
    cameraPos: [-3.8, 8.2, -4.5],
    cameraLook: [-8.5, 2.5, -12],
    description: 'Post-10th & Post-12th branching paths from pure sciences and mathematics to vocational trades.'
  },
  {
    id: 'education',
    name: '03 · ACADEMIA ROTUNDA',
    subtitle: 'Degrees, Diplomas & Certifications',
    tag: 'LEARNING INFRASTRUCTURE',
    pos: [9, 1.2, -22],
    scale: [8, 1.6, 7],
    color: '#d4b37f',
    stoneColor: '#30261b',
    accentColor: '#e8c992',
    height: 6.8,
    cameraPos: [14, 9.5, -13],
    cameraLook: [9, 3.2, -22],
    description: 'Accredited degree pipelines: B.Tech, MBBS, B.Des, BBA, Vocational Apprenticeships.'
  },
  {
    id: 'institutions',
    name: '04 · GLOBAL ACADEMIES',
    subtitle: '5,000+ Universities Worldwide',
    tag: 'INSTITUTIONAL AUDIT',
    pos: [-7, 1.8, -34],
    scale: [9, 1.8, 7.5],
    color: '#b89068',
    stoneColor: '#31251c',
    accentColor: '#d6a87c',
    height: 7.5,
    cameraPos: [-1.5, 10.5, -24],
    cameraLook: [-7, 3.8, -34],
    description: 'Comprehensive benchmarks from IITs, AIIMS, and BITS to Oxford, TUM, Stanford, Toronto, and NUS.'
  },
  {
    id: 'true-cost',
    name: '05 · TRUE-COST MONOLITHS',
    subtitle: 'Tuition + Living + Foreign Currency',
    tag: 'FINANCIAL AUDIT',
    pos: [8, 2.4, -46],
    scale: [8.5, 2.0, 7],
    color: '#8d7965',
    stoneColor: '#28221c',
    accentColor: '#ba9e84',
    height: 5.8,
    cameraPos: [13.5, 11, -36],
    cameraLook: [8, 3.5, -46],
    description: 'Granular true cost of study: Tuition + Rent + Food + Transport + Insurance across 20+ currencies.'
  },
  {
    id: 'careers',
    name: '06 · 15,000 CAREER TOWERS',
    subtitle: 'Specializations & Deep Taxonomy',
    tag: 'CAREER INTELLIGENCE',
    pos: [-9, 3.2, -58],
    scale: [10, 2.2, 8.5],
    color: '#d49658',
    stoneColor: '#332317',
    accentColor: '#f0b070',
    height: 9.5,
    cameraPos: [-3, 13.5, -46],
    cameraLook: [-9, 5.0, -58],
    description: 'Hierarchical specialization trees from manual carpentry to sub-specialist electrophysiologists.'
  },
  {
    id: 'jobs',
    name: '07 · EMPLOYMENT VIADUCT',
    subtitle: 'Market Demand & Active Positions',
    tag: 'OPPORTUNITIES',
    pos: [8.5, 3.8, -70],
    scale: [9, 2.0, 7.5],
    color: '#c26b48',
    stoneColor: '#321f18',
    accentColor: '#e08865',
    height: 7.2,
    cameraPos: [14, 13.0, -58],
    cameraLook: [8.5, 4.8, -70],
    description: 'Live entry-level pipelines, internship tracks, and corporate employer research hubs.'
  },
  {
    id: 'sports',
    name: '08 · SPORTS COLOSSEUM',
    subtitle: '35+ Sports Roles · 25+ Disciplines',
    tag: 'ATHLETIC ECOSYSTEM',
    pos: [-8, 4.2, -82],
    scale: [10, 2.4, 9],
    color: '#b65f42',
    stoneColor: '#2f1c16',
    accentColor: '#db7858',
    height: 6.4,
    cameraPos: [-2, 14.5, -70],
    cameraLook: [-8, 5.2, -82],
    description: 'Complete sports ecosystem: Athlete, Coach, Physio, Analyst, Agent, Sports Law, and Sports Tech.'
  },
  {
    id: 'people',
    name: '09 · PRACTITIONER FORUM',
    subtitle: 'Student Reviews & Field Feedback',
    tag: 'PRACTITIONER VOICES',
    pos: [7.5, 4.8, -94],
    scale: [8.5, 2.0, 7.5],
    color: '#94a882',
    stoneColor: '#232a1f',
    accentColor: '#b1c79e',
    height: 6.0,
    cameraPos: [13, 14.5, -82],
    cameraLook: [7.5, 5.5, -94],
    description: 'Unfiltered student & graduate ratings across academics, faculty, placements, and campus life.'
  },
  {
    id: 'twins',
    name: '10 · CAREER TWIN BRIDGES',
    subtitle: 'Verified Real-World Trajectories',
    tag: 'SECTION 150 STANDARD',
    pos: [-7.5, 5.4, -106],
    scale: [9, 2.2, 8],
    color: '#a88a68',
    stoneColor: '#2c241c',
    accentColor: '#c7a783',
    height: 6.8,
    cameraPos: [-2, 15.5, -94],
    cameraLook: [-7.5, 6.2, -106],
    description: 'Zero fabricated stories. Genuine journeys, salary milestones, surprises, and practical advice.'
  },
  {
    id: 'map',
    name: '11 · MY CAREER LATTICE',
    subtitle: '30-Question Assessment & Personal Map',
    tag: 'STUDENT WORKSPACE',
    pos: [7, 6.0, -118],
    scale: [9.5, 2.2, 8.5],
    color: '#c97754',
    stoneColor: '#332018',
    accentColor: '#e8946f',
    height: 8.0,
    cameraPos: [12.5, 16.5, -106],
    cameraLook: [7, 7.0, -118],
    description: 'Personalized trait radar, CV builder, skill-gap analysis, and application tracker.'
  },
  {
    id: 'future',
    name: '12 · THE HORIZON OBSERVATORY',
    subtitle: 'Frontier AI, Robotics & Long-Term Compounding',
    tag: 'HORIZON 2035',
    pos: [0, 7.2, -132],
    scale: [12, 2.8, 10],
    color: '#d6b37c',
    stoneColor: '#36291b',
    accentColor: '#f7d399',
    height: 11.5,
    cameraPos: [0, 18.0, -118],
    cameraLook: [0, 8.5, -138],
    description: 'Synthesize rare skill combinations to insulate against automation and capture monopoly earning power.'
  }
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getInterpolatedCamera(progress) {
  const p = Math.max(0, Math.min(0.9999, progress));
  const totalZones = ARCHITECTURAL_ZONES.length;
  const rawIdx = p * (totalZones - 1);
  const i = Math.floor(rawIdx);
  const t = rawIdx - i;

  const current = ARCHITECTURAL_ZONES[i];
  const next = ARCHITECTURAL_ZONES[Math.min(totalZones - 1, i + 1)];

  const camX = lerp(current.cameraPos[0], next.cameraPos[0], t);
  const camY = lerp(current.cameraPos[1], next.cameraPos[1], t);
  const camZ = lerp(current.cameraPos[2], next.cameraPos[2], t);

  const lookX = lerp(current.cameraLook[0], next.cameraLook[0], t);
  const lookY = lerp(current.cameraLook[1], next.cameraLook[1], t);
  const lookZ = lerp(current.cameraLook[2], next.cameraLook[2], t);

  return {
    pos: new THREE.Vector3(camX, camY, camZ),
    look: new THREE.Vector3(lookX, lookY, lookZ)
  };
}

// Elevated Stone Skyway / Viaduct System connecting all 12 zones
function GrandViaductSystem() {
  const points = useMemo(() => {
    return ARCHITECTURAL_ZONES.map(z => new THREE.Vector3(z.pos[0], z.pos[1] + 0.15, z.pos[2]));
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 90, 0.45, 8, false), [curve]);

  return (
    <group>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial color="#cbb89d" roughness={0.82} metalness={0.15} />
      </mesh>
      {ARCHITECTURAL_ZONES.slice(0, -1).map((z, idx) => {
        const nextZ = ARCHITECTURAL_ZONES[idx + 1];
        const midX = (z.pos[0] + nextZ.pos[0]) / 2;
        const midY = (z.pos[1] + nextZ.pos[1]) / 2;
        const midZ = (z.pos[2] + nextZ.pos[2]) / 2;
        const dist = new THREE.Vector3(...z.pos).distanceTo(new THREE.Vector3(...nextZ.pos));
        const angleY = Math.atan2(nextZ.pos[0] - z.pos[0], nextZ.pos[2] - z.pos[2]);

        return (
          <group key={`bridge-${z.id}`}>
            {/* Bridge deck */}
            <mesh position={[midX, midY + 0.05, midZ]} rotation={[0, angleY, 0]}>
              <boxGeometry args={[1.4, 0.18, dist]} />
              <meshStandardMaterial color="#4a3e35" roughness={0.9} />
            </mesh>
            {/* Bridge Support Piers */}
            <mesh position={[midX, midY / 2, midZ]}>
              <cylinderGeometry args={[0.3, 0.4, Math.max(0.5, midY), 8]} />
              <meshStandardMaterial color="#2d251f" roughness={0.95} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Architectural Pavilion with Colonnades, Cantilevers, and Illuminated Spires
function ArchitecturalPavilion({ zone, isCurrent, onSelect }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * 0.6 + zone.pos[2] * 0.1;
    groupRef.current.position.y = zone.pos[1] + Math.sin(t) * 0.04;
  });

  const columns = useMemo(() => {
    const cols = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const rX = zone.scale[0] * 0.36;
      const rZ = zone.scale[2] * 0.34;
      cols.push({
        x: Math.cos(angle) * rX,
        z: Math.sin(angle) * rZ,
        h: zone.height * (0.6 + (i % 3) * 0.22)
      });
    }
    return cols;
  }, [zone]);

  return (
    <group ref={groupRef} position={zone.pos}>
      {/* Heavy Plinth / Base Platform */}
      <mesh position={[0, zone.scale[1] / 2, 0]} receiveShadow onClick={() => onSelect?.(zone.id)}>
        <boxGeometry args={zone.scale} />
        <meshStandardMaterial color={zone.stoneColor} roughness={0.88} metalness={0.08} />
      </mesh>

      {/* Stepped Terraces */}
      <mesh position={[0, zone.scale[1] + 0.1, 0]}>
        <boxGeometry args={[zone.scale[0] * 0.85, 0.2, zone.scale[2] * 0.85]} />
        <meshStandardMaterial color="#3d3229" roughness={0.85} />
      </mesh>

      {/* Vertical Spires & Colonnade Columns */}
      {columns.map((col, idx) => (
        <group key={idx} position={[col.x, zone.scale[1] + col.h / 2, col.z]}>
          <mesh castShadow>
            <boxGeometry args={[0.7 + idx * 0.08, col.h, 0.7 + idx * 0.06]} />
            <meshStandardMaterial
              color={idx === 0 ? zone.accentColor : zone.color}
              roughness={0.65}
              metalness={0.18}
            />
          </mesh>
          {/* Glowing Beacon Top */}
          <mesh position={[0, col.h / 2 + 0.15, 0]}>
            <boxGeometry args={[0.85, 0.2, 0.85]} />
            <meshStandardMaterial color="#f7ecd7" emissive={zone.accentColor} emissiveIntensity={0.4} />
          </mesh>
        </group>
      ))}

      {/* Center Knowledge Monolith / Arch */}
      <mesh position={[0, zone.scale[1] + zone.height * 0.55, 0]} castShadow>
        <boxGeometry args={[zone.scale[0] * 0.38, zone.height * 1.1, zone.scale[2] * 0.38]} />
        <meshStandardMaterial color="#f0e2cf" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Floating 3D Zone Label Banner */}
      <Float speed={1.2} floatIntensity={0.2} rotationIntensity={0.03}>
        <group position={[0, zone.height + 2.2, 0]}>
          <mesh>
            <boxGeometry args={[4.2, 0.12, 1.1]} />
            <meshStandardMaterial color="#1a1512" roughness={0.9} />
          </mesh>
          <Html position={[0, 0.15, 0]} center distanceFactor={22} style={{ pointerEvents: 'none' }}>
            <div className={`career-city-architectural-badge ${isCurrent ? 'active' : ''}`}>
              <div className="cca-tag">{zone.tag}</div>
              <div className="cca-name">{zone.name}</div>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
}

// Background Architectural Terrain & Horizon
function CityWorldLandscape() {
  return (
    <group>
      {/* Infinite Sandstone Valley Floor */}
      <mesh position={[0, -0.6, -70]} receiveShadow>
        <boxGeometry args={[70, 0.8, 190]} />
        <meshStandardMaterial color="#17120e" roughness={0.96} metalness={0.04} />
      </mesh>

      {/* Flanking Distant Mountain Ridge / Monoliths */}
      {[-24, 24].map((xOffset, idx) => (
        <group key={idx} position={[xOffset, 0, -70]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[0, 4 + i * 1.2, -80 + i * 22]}>
              <boxGeometry args={[8, 12 + i * 3, 18]} />
              <meshStandardMaterial color="#1c1612" roughness={0.98} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function ContinuousCityScene({ scrollProgress = 0, onSelectZone }) {
  const lookVector = useRef(new THREE.Vector3(0, 1.5, 0));
  const sceneGroup = useRef();

  useFrame(({ camera, clock }) => {
    const target = getInterpolatedCamera(scrollProgress);
    camera.position.lerp(target.pos, 0.065);
    lookVector.current.lerp(target.look, 0.07);
    camera.lookAt(lookVector.current);

    if (sceneGroup.current) {
      // Subtle breath of wind
      sceneGroup.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.008;
    }
  });

  const activeZoneIdx = Math.min(
    ARCHITECTURAL_ZONES.length - 1,
    Math.floor(scrollProgress * ARCHITECTURAL_ZONES.length)
  );

  return (
    <>
      {/* Warm Cinematic Natural Lighting */}
      <ambientLight intensity={0.8} color="#faecd9" />
      <directionalLight
        position={[14, 22, 16]}
        intensity={2.8}
        color="#fbe4c7"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-12, 8, -40]} intensity={1.8} color="#d99962" distance={80} />
      <pointLight position={[10, 12, -90]} intensity={2.2} color="#e0aa75" distance={90} />

      {/* Warm Earth Atmospheric Fog */}
      <fog attach="fog" args={['#14100d', 16, 115]} />

      <group ref={sceneGroup}>
        <CityWorldLandscape />
        <GrandViaductSystem />
        {ARCHITECTURAL_ZONES.map((zone, idx) => (
          <ArchitecturalPavilion
            key={zone.id}
            zone={zone}
            isCurrent={activeZoneIdx === idx}
            onSelect={onSelectZone}
          />
        ))}
      </group>
    </>
  );
}

export default function CareerUniverse({ scrollProgress = 0, onSelectZone }) {
  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [4.5, 6.5, 11], fov: 46 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false
        }}
      >
        <color attach="background" args={['#14100d']} />
        <ContinuousCityScene scrollProgress={scrollProgress} onSelectZone={onSelectZone} />
      </Canvas>
    </div>
  );
}
