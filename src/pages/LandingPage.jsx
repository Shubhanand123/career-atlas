import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Search, GraduationCap, Zap, ChevronRight, CheckCircle2,
  Sparkles, DollarSign, Building2, MapPin, Award, Users, Compass,
  TrendingUp, ShieldCheck, ArrowUpRight, CheckCircle, RotateCcw, Clock,
  ChevronDown, Layers, Target, BookOpen, UserCheck, GitBranch
} from 'lucide-react';
import Navbar from '../components/Navbar';
import TransformingAtlasCore from '../components/TransformingAtlasCore';
import { searchCareerCatalog } from '../data/careerCatalog';
import '../styles/landing.css';

// 8 Core Sectors
const CORE_SECTORS = [
  { id: 'healthcare', label: 'Health & Medicine', icon: '🩺', desc: 'Clinical care, neuroscience, biotech', sample: 'Biomedical Engineer' },
  { id: 'tech', label: 'Technology & AI', icon: '⚡', desc: 'Software, LLMs, quantum systems', sample: 'AI Research Scientist' },
  { id: 'science', label: 'Pure Science & Space', icon: '🪐', desc: 'Astrophysics, genomics, chemistry', sample: 'Astrophysicist' },
  { id: 'engineering', label: 'Engineering & Energy', icon: '⚙️', desc: 'Robotics, aerospace, green hydrogen', sample: 'Aerospace Propulsion Engineer' },
  { id: 'business', label: 'Business & Finance', icon: '📈', desc: 'Quant trading, VC, strategic leadership', sample: 'Quantitative Portfolio Manager' },
  { id: 'creative', label: 'Design & Media', icon: '🎨', desc: 'Product UX, architecture, film', sample: 'Lead UX Architect' },
  { id: 'government', label: 'Law & Governance', icon: '⚖️', desc: 'Diplomacy, judiciary, public policy', sample: 'Appellate Court Judge' },
  { id: 'trades', label: 'Skilled Trades', icon: '🛠️', desc: 'Master craftsmanship, precision machining', sample: 'Precision Underwater Welder' },
];

// Spotlight Career Profiles for Dynamic Exploration
const SPOTLIGHT_CAREERS = {
  'Biomedical Engineer': {
    title: 'Biomedical Engineer',
    category: 'Healthcare & Engineering',
    tagline: 'Engineering the next generation of neural interfaces, smart prosthetics, and life-saving medical devices.',
    salaryINR: '₹6.5L – ₹24L / yr',
    salaryUSD: '$78,000 – $165,000 / yr',
    growth: '+17% YoY Global Demand',
    duration: '4–5 Years Degree & Labs',
    aiResilience: '9.2 / 10 · Very Low Risk',
    skills: ['Biomaterials & Polymers', 'Biomechanics Simulation', 'Neural Signal Processing', 'FDA Clinical Compliance'],
    workStyle: 'High-tech Hospital R&D labs, cleanrooms, and surgical validation suites.',
    pathway: [
      { step: '01 · Foundation', title: '10+2 Secondary School (PCM/PCB)', desc: 'Focus on Physics, Chemistry, Math & Biology with 85%+ score.' },
      { step: '02 · Undergraduate', title: 'B.Tech / B.S. Bioengineering', desc: '4-year engineering core with embedded electronics, anatomy & biomaterials.' },
      { step: '03 · Research & Labs', title: 'Clinical Device Internship', desc: 'Hands-on validation at Medtronic, GE Healthcare, or hospital research labs.' },
      { step: '04 · Industry Entry', title: 'Junior Medical Device Engineer', desc: 'Entry compensation of ₹7.5L ($82k) working on sensor calibration and testing.' },
      { step: '05 · Specialization', title: 'Lead Neural Interface Architect', desc: 'Senior leadership commanding ₹28L+ ($190k) directing surgical systems.' }
    ],
    unis: [
      { name: 'IIT Bombay', degree: 'B.Tech Biomedical', fee: '₹8.4L Total', avgCTC: '₹21.5L Avg CTC', roi: '96% ROI' },
      { name: 'BITS Pilani', degree: 'B.E. Biotech & Devices', fee: '₹19.5L Total', avgCTC: '₹18.2L Avg CTC', roi: '92% ROI' },
      { name: 'National University of Singapore', degree: 'B.Eng Bioengineering', fee: '$38,000 / yr', avgCTC: '$94,000 Avg CTC', roi: '98% ROI' },
      { name: 'University of Toronto', degree: 'B.A.Sc Biomedical', fee: '$52,000 / yr', avgCTC: '$98,000 Avg CTC', roi: '94% ROI' }
    ],
    twin: {
      name: 'Dr. Ananya Sen',
      role: 'Staff Neural Device Architect',
      org: 'BioSens Robotics · Zurich / Bengaluru',
      story: 'Started in Class 12 with a dual interest in biology and electronics. Built first prosthetic hand prototype in year 3 of B.Tech. Now leads micro-electrode R&D for robotic surgery.',
      advice: 'Do not choose between biology and code. The modern world pays top premiums to people who speak both languages fluently.'
    },
    related: [
      { name: 'Bioinformatics Scientist', comp: '₹12L – ₹32L', tag: 'Genomic Data' },
      { name: 'Clinical Trial Specialist', comp: '₹8L – ₹22L', tag: 'FDA Operations' },
      { name: 'Genetic Counselor', comp: '₹7L – ₹18L', tag: 'Patient Diagnostics' },
      { name: 'Surgical Robotics Engineer', comp: '₹15L – ₹42L', tag: 'Automation' }
    ]
  },
  'AI Research Scientist': {
    title: 'AI Research Scientist',
    category: 'Technology & Computing',
    tagline: 'Designing frontier foundation models, reasoning architectures, and neural algorithms.',
    salaryINR: '₹18L – ₹65L / yr',
    salaryUSD: '$140,000 – $380,000 / yr',
    growth: '+42% YoY Exponential Demand',
    duration: '4–6 Years (B.Tech + M.S./Ph.D.)',
    aiResilience: '9.8 / 10 · Creator Tier',
    skills: ['Deep Reinforcement Learning', 'Transformer Architectures', 'Distributed GPU Clusters', 'Calculus & Probability'],
    workStyle: 'High-compute research labs, asynchronous global teams, top-tier GPU clusters.',
    pathway: [
      { step: '01 · Foundation', title: 'Advanced High School Math', desc: 'Linear algebra, statistics, competitive programming foundations.' },
      { step: '02 · Undergraduate', title: 'B.Tech Computer Science / Math', desc: 'Algorithms, data structures, neural network mathematics.' },
      { step: '03 · Research & Labs', title: 'Pre-Doctoral Research Fellow', desc: 'Publishing at NeurIPS, ICML, CVPR under faculty guidance.' },
      { step: '04 · Industry Entry', title: 'Applied Machine Learning Engineer', desc: 'Building scalable model training pipelines at ₹24L ($160k).' },
      { step: '05 · Specialization', title: 'Principal Foundation Model Scientist', desc: 'Directing reasoning architectures at ₹80L+ ($450k+).' }
    ],
    unis: [
      { name: 'IIT Delhi', degree: 'B.Tech CSE / AI Dept', fee: '₹8.6L Total', avgCTC: '₹28.4L Avg CTC', roi: '99% ROI' },
      { name: 'IISc Bengaluru', degree: 'M.Tech / Ph.D. AI', fee: '₹2.4L Total', avgCTC: '₹34.0L Avg CTC', roi: '100% ROI' },
      { name: 'Carnegie Mellon University', degree: 'M.S. Machine Learning', fee: '$58,000 / yr', avgCTC: '$175,000 Avg CTC', roi: '97% ROI' },
      { name: 'ETH Zurich', degree: 'M.Sc Computer Science', fee: 'CHF 1,600 / yr', avgCTC: 'CHF 130,000 Avg CTC', roi: '100% ROI' }
    ],
    twin: {
      name: 'Rohan Deshmukh',
      role: 'Staff AI Researcher',
      org: 'DeepMind / Meta FAIR · London',
      story: 'Transitioned from competitive coding in college to self-supervised learning research. Spent 2 years optimizing attention kernels.',
      advice: 'Master the first principles of linear algebra and loss landscapes. Frameworks change every 2 years, but math is eternal.'
    },
    related: [
      { name: 'MLOps Infrastructure Architect', comp: '₹22L – ₹55L', tag: 'Distributed GPUs' },
      { name: 'Quantum Algorithm Scientist', comp: '₹25L – ₹70L', tag: 'Quantum Computing' },
      { name: 'Computer Vision Engineer', comp: '₹14L – ₹38L', tag: 'Spatial AI' },
      { name: 'Robotics Perception Specialist', comp: '₹16L – ₹45L', tag: 'Autonomous Systems' }
    ]
  }
};

const STAGES = [
  { id: 1, name: 'Possibility', tag: '01' },
  { id: 2, name: 'Sectors', tag: '02' },
  { id: 3, name: 'Spotlight', tag: '03' },
  { id: 4, name: 'Details', tag: '04' },
  { id: 5, name: 'Pathway', tag: '05' },
  { id: 6, name: 'Universities', tag: '06' },
  { id: 7, name: 'Career Twin', tag: '07' },
  { id: 8, name: 'Launch Gateway', tag: '08' },
];

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCareerKey, setSelectedCareerKey] = useState('Biomedical Engineer');
  const [activeCategory, setActiveCategory] = useState('healthcare');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeStage, setActiveStage] = useState(1);

  const navigate = useNavigate();

  // Track scroll progress continuously
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const p = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
      setScrollProgress(p);

      // Compute active stage
      const stageIdx = Math.min(Math.floor(p * 8) + 1, 8);
      setActiveStage(stageIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Live Search Handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchCareerCatalog({ query: searchQuery, limit: 6 });
        setSearchResults(res.items || []);
      } catch (e) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const activeCareer = SPOTLIGHT_CAREERS[selectedCareerKey] || SPOTLIGHT_CAREERS['Biomedical Engineer'];

  const scrollToStage = (stageNum) => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = ((stageNum - 1) / 7.2) * totalScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div className="scrolly-master-page">
      <Navbar />

      {/* FIXED 3D BACKGROUND CANVAS (Continuous Visual Transformation) */}
      <div className="fixed-3d-backdrop">
        <TransformingAtlasCore scrollProgress={scrollProgress} activeCategory={activeCategory} />
      </div>

      {/* FLOATING STAGE STEPPER RAIL */}
      <nav className="fixed-stage-stepper" aria-label="Stages">
        {STAGES.map((st) => (
          <button
            key={st.id}
            className={`stepper-btn ${activeStage === st.id ? 'active' : ''}`}
            onClick={() => scrollToStage(st.id)}
          >
            <span className="stepper-tag">{st.tag}</span>
            <span className="stepper-name">{st.name}</span>
          </button>
        ))}
      </nav>

      {/* FLOATING TELEMETRY BAR */}
      <div className="fixed-telemetry-bar">
        <div className="telemetry-track">
          <div className="telemetry-fill" style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }} />
        </div>
        <div className="telemetry-info">
          <span className="telemetry-badge">STAGE 0{activeStage} / 08</span>
          <span className="telemetry-caption">
            {activeStage === 1 && 'Possibility — What Could You Become?'}
            {activeStage === 2 && 'Sectors & Core Disciplines'}
            {activeStage === 3 && `Career Spotlight — ${activeCareer.title}`}
            {activeStage === 4 && 'Compensation, Skills & AI Defense'}
            {activeStage === 5 && 'Step-by-Step Educational Trajectory'}
            {activeStage === 6 && 'Target Academies, Fees & ROI'}
            {activeStage === 7 && `Verified Human Career Twin`}
            {activeStage === 8 && 'Branching Trajectories & Launch Gateway'}
          </span>
          <span className="telemetry-scroll-hint">Scroll down to morph ↓</span>
        </div>
      </div>

      {/* CONTINUOUS SCROLLABLE EDITORIAL SECTIONS (8 Full Stages) */}
      <main className="stages-container">

        {/* STAGE 01: POSSIBILITY */}
        <section id="stage-1" className="stage-section">
          <div className="stage-card hero-card">
            <div className="hero-eyebrow">
              <span className="badge-pill pulse-lime">15,000+ CAREERS INDEXED</span>
              <span className="badge-pill">10,000+ UNIVERSITIES</span>
            </div>
            <h1 className="hero-editorial-title">
              WHAT COULD<br />YOU BECOME?
            </h1>
            <p className="hero-editorial-subtitle">
              The definitive global atlas of human professions. Explore salaries, true-cost degrees,
              educational trajectories, and verified human career paths.
            </p>

            {/* Universal Search Bar */}
            <div className="hero-search-box">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search any career (e.g. Cardiologist, Quantum Engineer, Carpenter, Politician)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-btn" onClick={() => setSearchQuery('')}>×</button>
                )}
              </div>

              {searchResults.length > 0 && (
                <div className="hero-search-dropdown">
                  {searchResults.map((item) => (
                    <Link key={item.id} to={`/career/${item.id}`} className="search-result-row">
                      <div className="row-main">
                        <span className="item-title">{item.name}</span>
                        <span className="item-cat">{item.category} · {item.typicalEducation}</span>
                      </div>
                      <span className="item-salary">{item.salaryINR ? `₹${(item.salaryINR.mid / 100000).toFixed(1)}L` : '$85k'}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="hero-quick-pills">
              <span className="pill-title">Featured Highlights:</span>
              <button onClick={() => { setSelectedCareerKey('Biomedical Engineer'); scrollToStage(3); }}>Biomedical Engineer</button>
              <button onClick={() => { setSelectedCareerKey('AI Research Scientist'); scrollToStage(3); }}>AI Research Scientist</button>
              <Link to="/explore">Explore All 15k Careers →</Link>
            </div>

            <div className="stage-actions-bar center-actions">
              <button className="cta-primary-btn" onClick={() => scrollToStage(2)}>
                Start Scroll Journey <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 02: SECTORS */}
        <section id="stage-2" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <span className="stage-tag accent-purple">STAGE 02 · CORE SECTORS</span>
              <h2>Choose Your Domain Matrix</h2>
              <p>Select an industry archetype to reveal specialized roles and career blueprints.</p>
            </div>

            <div className="sectors-grid-container">
              {CORE_SECTORS.map((sec) => (
                <div
                  key={sec.id}
                  className={`sector-chip ${activeCategory === sec.id ? 'active-chip' : ''}`}
                  onClick={() => {
                    setActiveCategory(sec.id);
                    if (SPOTLIGHT_CAREERS[sec.sample]) {
                      setSelectedCareerKey(sec.sample);
                    }
                  }}
                >
                  <span className="chip-icon">{sec.icon}</span>
                  <div className="chip-meta">
                    <strong className="chip-title">{sec.label}</strong>
                    <span className="chip-desc">{sec.desc}</span>
                  </div>
                  <span className="chip-sample">e.g. {sec.sample}</span>
                </div>
              ))}
            </div>

            <div className="stage-actions-bar">
              <button className="cta-primary-btn" onClick={() => scrollToStage(3)}>
                Morph into Selected Career ({selectedCareerKey}) <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 03: CAREER SPOTLIGHT */}
        <section id="stage-3" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <span className="stage-tag accent-lime">STAGE 03 · CAREER SPOTLIGHT</span>
              <h1 className="career-big-title">{activeCareer.title}</h1>
              <p className="career-big-tagline">{activeCareer.tagline}</p>
            </div>

            <div className="spotlight-metric-cards">
              <div className="metric-box">
                <span className="metric-label">Typical Compensation</span>
                <strong className="metric-val text-lime">{activeCareer.salaryINR}</strong>
                <span className="metric-sub">{activeCareer.salaryUSD}</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Market Demand</span>
                <strong className="metric-val text-sky">{activeCareer.growth}</strong>
                <span className="metric-sub">High Placement Velocity</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Preparation Horizon</span>
                <strong className="metric-val text-purple">{activeCareer.duration}</strong>
                <span className="metric-sub">B.Tech + Practical Lab</span>
              </div>
            </div>

            <div className="stage-actions-bar">
              <button className="cta-secondary-btn" onClick={() => scrollToStage(4)}>
                Scroll to Details & Skills Radar ↓
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 04: DETAILS */}
        <section id="stage-4" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <span className="stage-tag accent-purple">STAGE 04 · CAPABILITIES & METRICS</span>
              <h2>{activeCareer.title} — Professional Anatomy</h2>
            </div>

            <div className="details-two-col">
              <div className="detail-card">
                <h3>Core Technical Competencies</h3>
                <div className="skills-badge-list">
                  {activeCareer.skills.map((sk, i) => (
                    <span key={i} className="skill-pill">
                      <CheckCircle size={14} className="text-lime" /> {sk}
                    </span>
                  ))}
                </div>

                <div className="ai-resilience-box">
                  <div className="ai-head">
                    <span>AI Automation Defense Rating</span>
                    <strong className="text-lime">{activeCareer.aiResilience}</strong>
                  </div>
                  <p className="ai-desc">
                    Physical clinical hardware calibration, human patient safety certification, and surgical integration require irreplaceable in-person judgment.
                  </p>
                </div>
              </div>

              <div className="detail-card">
                <h3>Operational Work Environment</h3>
                <p className="workstyle-text">{activeCareer.workStyle}</p>

                <div className="salary-tier-ladder">
                  <div className="ladder-step">
                    <span>Entry Level</span>
                    <strong>₹6.5L - ₹9.0L</strong>
                  </div>
                  <div className="ladder-step highlight">
                    <span>Median (3-6 yrs)</span>
                    <strong>₹14.8L - ₹18.5L</strong>
                  </div>
                  <div className="ladder-step">
                    <span>Staff / Lead (8+ yrs)</span>
                    <strong>₹24.0L - ₹38.0L+</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="stage-actions-bar">
              <button className="cta-primary-btn" onClick={() => scrollToStage(5)}>
                Explore Educational Trajectory ↓
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 05: PATHWAY */}
        <section id="stage-5" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <span className="stage-tag accent-pink">STAGE 05 · CONTINUOUS PATHWAY</span>
              <h2>The Step-by-Step Trajectory</h2>
              <p>From foundational 10+2 high school subjects to senior industry leadership.</p>
            </div>

            <div className="pathway-step-cards">
              {activeCareer.pathway.map((p, idx) => (
                <div key={idx} className="pathway-card-node">
                  <div className="node-badge">{p.step}</div>
                  <div className="node-body">
                    <strong className="node-title">{p.title}</strong>
                    <p className="node-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="stage-actions-bar">
              <button className="cta-primary-btn" onClick={() => scrollToStage(6)}>
                View Target Universities & Fees ↓
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 06: UNIVERSITIES */}
        <section id="stage-6" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <span className="stage-tag accent-sky">STAGE 06 · TARGET ACADEMIES</span>
              <h2>Top Universities for {activeCareer.title}</h2>
              <p>Audited from our 10,000+ global higher education database with verified placement statistics.</p>
            </div>

            <div className="unis-horizontal-grid">
              {activeCareer.unis.map((u, i) => (
                <div key={i} className="uni-spotlight-card">
                  <div className="uni-head">
                    <Building2 size={24} className="text-sky" />
                    <div>
                      <strong className="uni-name">{u.name}</strong>
                      <span className="uni-degree">{u.degree}</span>
                    </div>
                  </div>
                  <div className="uni-stats">
                    <div className="u-stat">
                      <span>Tuition Fee</span>
                      <strong>{u.fee}</strong>
                    </div>
                    <div className="u-stat">
                      <span>Average CTC</span>
                      <strong className="text-lime">{u.avgCTC}</strong>
                    </div>
                    <div className="u-stat">
                      <span>Placement ROI</span>
                      <strong className="text-purple">{u.roi}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="stage-actions-bar">
              <Link to="/reports" className="cta-secondary-btn">
                Open 10,000+ University True-Cost Explorer <ArrowUpRight size={16} />
              </Link>
              <button className="cta-primary-btn" onClick={() => scrollToStage(7)}>
                Meet Verified Career Twin ↓
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 07: CAREER TWIN */}
        <section id="stage-7" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <span className="stage-tag accent-teal">STAGE 07 · VERIFIED CAREER TWIN</span>
              <h2>Real Human Journey & Advice</h2>
            </div>

            <div className="twin-editorial-card">
              <div className="twin-identity">
                <div className="twin-avatar-badge">
                  <Users size={32} className="text-teal" />
                </div>
                <div>
                  <strong className="twin-name">{activeCareer.twin.name}</strong>
                  <span className="twin-role">{activeCareer.twin.role}</span>
                  <span className="twin-org">{activeCareer.twin.org}</span>
                </div>
                <span className="verified-pill">
                  <ShieldCheck size={14} /> Verified Practitioner
                </span>
              </div>

              <div className="twin-story-body">
                <h4>The Journey:</h4>
                <p>{activeCareer.twin.story}</p>

                <blockquote className="twin-quote">
                  "{activeCareer.twin.advice}"
                </blockquote>
              </div>
            </div>

            <div className="stage-actions-bar">
              <button className="cta-primary-btn" onClick={() => scrollToStage(8)}>
                Explore Branching Possibilities ↓
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 08: RELATED CAREERS & LAUNCH GATEWAY */}
        <section id="stage-8" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <span className="stage-tag accent-purple">STAGE 08 · BRANCHING POSSIBILITIES</span>
              <h2>Where Can You Branch Next?</h2>
              <p>Adjacent high-yield career paths sharing your core competencies and interests.</p>
            </div>

            <div className="related-cards-grid">
              {activeCareer.related.map((rel, idx) => (
                <div
                  key={idx}
                  className="related-branch-card"
                  onClick={() => {
                    if (SPOTLIGHT_CAREERS[rel.name]) {
                      setSelectedCareerKey(rel.name);
                      scrollToStage(3);
                    } else {
                      navigate(`/explore?search=${encodeURIComponent(rel.name)}`);
                    }
                  }}
                >
                  <div className="rel-tag">{rel.tag}</div>
                  <strong className="rel-name">{rel.name}</strong>
                  <span className="rel-comp">{rel.comp}</span>
                  <span className="rel-cta">Explore Blueprint →</span>
                </div>
              ))}
            </div>

            <div className="portal-action-cluster">
              <div className="cluster-header">
                <h3>Ready to Map Your Complete Trajectory?</h3>
                <p>Access our complete suite of deep AI tools, comparison engines, and 10k university audits.</p>
              </div>
              <div className="cluster-buttons">
                <Link to="/explore" className="btn-solid-lime">
                  <Compass size={18} /> Search 15,000+ Careers
                </Link>
                <Link to="/quiz" className="btn-solid-purple">
                  <Zap size={18} /> 30-Question Assessment
                </Link>
                <Link to="/reports" className="btn-solid-sky">
                  <GraduationCap size={18} /> 10,000 Universities
                </Link>
                <Link to="/compare" className="btn-outline-cream">
                  Compare Trajectories
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
