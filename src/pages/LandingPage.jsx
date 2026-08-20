import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, GraduationCap, Zap, ChevronRight, CheckCircle2,
  Sparkles, DollarSign, Building2, MapPin, Compass,
  Layers, ChevronDown, Cpu, BadgeCheck, ArrowUpRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import RealisticOrb from '../components/RealisticOrb';
import { searchCareerCatalog } from '../data/careerCatalog';
import '../styles/landing.css';

// 8 Core Sectors with clean minimal metadata
const CORE_SECTORS = [
  { id: 'healthcare', label: 'Medicine & Health', icon: '🩺', badge: '01', desc: 'Clinical surgery, neuroscience, biotech', sample: 'Biomedical Engineer', avgSalary: '₹8.5L – ₹28L' },
  { id: 'tech', label: 'AI & Computing', icon: '⚡', badge: '02', desc: 'Foundation models, distributed systems, quantum', sample: 'AI Research Scientist', avgSalary: '₹18L – ₹65L' },
  { id: 'science', label: 'Pure Science & Space', icon: '🪐', badge: '03', desc: 'Astrophysics, genomics, molecular chem', sample: 'Astrophysicist', avgSalary: '₹10L – ₹32L' },
  { id: 'engineering', label: 'Robotics & Energy', icon: '⚙️', badge: '04', desc: 'Autonomous robotics, aerospace, clean tech', sample: 'Aerospace Propulsion Engineer', avgSalary: '₹12L – ₹38L' },
  { id: 'business', label: 'Finance & Quant', icon: '📈', badge: '05', desc: 'Quant trading, venture capital, high-scale ops', sample: 'Quantitative Portfolio Manager', avgSalary: '₹22L – ₹80L' },
  { id: 'creative', label: 'Design & Spatial UX', icon: '🎨', badge: '06', desc: 'Product UX, spatial computing, brand design', sample: 'Lead UX Architect', avgSalary: '₹14L – ₹36L' },
  { id: 'government', label: 'Law & Policy', icon: '⚖️', badge: '07', desc: 'Judiciary, diplomacy, public policy, civil service', sample: 'Appellate Court Judge', avgSalary: '₹15L – ₹40L' },
  { id: 'trades', label: 'Master Craft & Trades', icon: '🛠️', badge: '08', desc: 'Precision machining, industrial welding, craft', sample: 'Precision Underwater Welder', avgSalary: '₹9L – ₹26L' },
];

const SPOTLIGHT_CAREERS = {
  'Biomedical Engineer': {
    title: 'Biomedical Engineer',
    category: 'Healthcare & Tech',
    tagline: 'Engineering neural interfaces, smart prosthetics, and life-saving clinical robotics.',
    salaryINR: '₹6.5L – ₹24.0L / yr',
    salaryUSD: '$78,000 – $165,000 / yr',
    salaryEntry: '₹6.8L / yr',
    salaryMid: '₹14.5L / yr',
    salarySenior: '₹28.0L+ / yr',
    growth: '+17% YoY Global Demand',
    growthBadge: 'High Growth',
    duration: '4–5 Years Degree & Labs',
    aiResilience: '9.2 / 10',
    aiRiskLevel: 'Very Low Risk · Human-Centric',
    skills: [
      { name: 'Biomaterials & Tissue Scaffolds', level: '94%' },
      { name: 'Neural Signal Processing', level: '88%' },
      { name: 'FDA Class III Regulatory Compliance', level: '91%' },
      { name: 'Micro-Electromechanical Systems (MEMS)', level: '86%' }
    ],
    workStyle: 'Hospital R&D labs, sterile cleanrooms, and surgical validation suites.',
    workHours: '40–45 hrs/week · Hybrid Lab/Hospital',
    pathway: [
      { step: '01', title: 'Senior Secondary (10+2 PCM/PCB)', duration: '2 Years', desc: 'Strong foundation in Physics, Chemistry, Math & Biology (85%+ target).' },
      { step: '02', title: 'B.Tech / B.S. in Biomedical Engineering', duration: '4 Years', desc: 'Core coursework in biomechanics, bio-instrumentation, embedded systems, and clinical physiology.' },
      { step: '03', title: 'Medical Device Research Internship', duration: '6–12 Months', desc: 'Hands-on clinical validation at Medtronic, GE Healthcare, or hospital research institutes.' },
      { step: '04', title: 'Junior Medical Device Engineer', duration: 'Years 1–3', desc: 'Sensor calibration, ISO 13485 quality control, and prototype development (₹7.5L / $82k).' },
      { step: '05', title: 'Staff Neural Interface Architect', duration: 'Year 5+', desc: 'Lead engineering for implantable biosensors and surgical robotics (₹28L+ / $190k+).' }
    ],
    unis: [
      { name: 'IIT Bombay', loc: 'Mumbai, India', degree: 'B.Tech Biomedical Engineering', fee: '₹8.4L Total', avgCTC: '₹21.5L Avg CTC', roi: '96% ROI', tag: 'Top Tier 1' },
      { name: 'BITS Pilani', loc: 'Pilani / Goa, India', degree: 'B.E. Biotech & Medical Devices', fee: '₹19.5L Total', avgCTC: '₹18.2L Avg CTC', roi: '92% ROI', tag: 'Top Private' },
      { name: 'National University of Singapore (NUS)', loc: 'Singapore', degree: 'B.Eng Bioengineering', fee: '$38,000 / yr', avgCTC: '$94,000 Avg CTC', roi: '98% ROI', tag: 'Global Top 10' },
      { name: 'University of Toronto', loc: 'Toronto, Canada', degree: 'B.A.Sc Biomedical Engineering', fee: '$52,000 / yr', avgCTC: '$98,000 Avg CTC', roi: '94% ROI', tag: 'Top Research' }
    ],
    twin: {
      name: 'Dr. Ananya Sen',
      role: 'Staff Neural Device Architect',
      org: 'BioSens Robotics · Zurich / Bengaluru',
      imgBadge: 'AS',
      exp: '7 Years Experience',
      education: 'B.Tech IIT Madras → M.S. ETH Zurich',
      story: 'Started with an intense curiosity for human biology and robotics in high school. Built my first microprocessor-controlled bionic arm in college. Today, I lead a team of 14 engineers developing micro-electrode arrays for minimally invasive neurosurgery.',
      advice: 'Never treat biology and software as separate worlds. The highest leverage in modern tech belongs to those who bridge physical biology with computation.'
    },
    related: [
      { name: 'Bioinformatics Scientist', comp: '₹12L – ₹32L', tag: 'Genomics & AI' },
      { name: 'Clinical Trial Specialist', comp: '₹8L – ₹22L', tag: 'FDA Operations' },
      { name: 'Genetic Counselor', comp: '₹7L – ₹18L', tag: 'Patient Diagnostics' },
      { name: 'Surgical Robotics Engineer', comp: '₹15L – ₹42L', tag: 'Robotics' }
    ]
  },
  'AI Research Scientist': {
    title: 'AI Research Scientist',
    category: 'Technology & Computing',
    tagline: 'Designing frontier foundation models, transformer architectures, and reasoning algorithms.',
    salaryINR: '₹18.0L – ₹65.0L / yr',
    salaryUSD: '$140,000 – $380,000 / yr',
    salaryEntry: '₹18.5L / yr',
    salaryMid: '₹34.0L / yr',
    salarySenior: '₹80.0L+ / yr',
    growth: '+42% YoY Exponential Demand',
    growthBadge: 'Hyper Growth',
    duration: '4–6 Years (B.Tech + M.S./Ph.D.)',
    aiResilience: '9.8 / 10',
    aiRiskLevel: 'Creator Tier · Directs Systems',
    skills: [
      { name: 'Transformer Architectures & Attention Kernels', level: '96%' },
      { name: 'Distributed GPU Cluster Training', level: '92%' },
      { name: 'Deep Reinforcement Learning (RLHF/RLAIF)', level: '90%' },
      { name: 'Linear Algebra & Optimization Theory', level: '95%' }
    ],
    workStyle: 'High-compute research labs, asynchronous global teams, and GPU clusters.',
    workHours: '40–50 hrs/week · Flexible / Remote',
    pathway: [
      { step: '01', title: 'Senior Secondary (PCM & CompSci)', duration: '2 Years', desc: 'Linear algebra, calculus, discrete math, and competitive programming foundations.' },
      { step: '02', title: 'B.Tech in Computer Science & AI', duration: '4 Years', desc: 'Algorithms, operating systems, probability theory, and deep learning architectures.' },
      { step: '03', title: 'Pre-Doctoral Research Fellow', duration: '1–2 Years', desc: 'Publishing research papers at NeurIPS, ICML, CVPR under top faculty mentors.' },
      { step: '04', title: 'Applied Machine Learning Scientist', duration: 'Years 1–3', desc: 'Training large-scale vision and language models on massive compute clusters (₹28L / $165k).' },
      { step: '05', title: 'Principal Foundation Model Architect', duration: 'Year 5+', desc: 'Directing frontier research on multimodal reasoning and alignment (₹80L+ / $400k+).' }
    ],
    unis: [
      { name: 'IIT Delhi', loc: 'New Delhi, India', degree: 'B.Tech CSE / ScAI', fee: '₹8.6L Total', avgCTC: '₹28.4L Avg CTC', roi: '99% ROI', tag: 'Top Tier 1' },
      { name: 'IISc Bengaluru', loc: 'Bengaluru, India', degree: 'M.Tech / Ph.D. AI Dept', fee: '₹2.4L Total', avgCTC: '₹34.0L Avg CTC', roi: '100% ROI', tag: 'Top Research' },
      { name: 'Carnegie Mellon University (CMU)', loc: 'Pittsburgh, USA', degree: 'M.S. Machine Learning', fee: '$58,000 / yr', avgCTC: '$175,000 Avg CTC', roi: '97% ROI', tag: 'Global #1 AI' },
      { name: 'ETH Zurich', loc: 'Zurich, Switzerland', degree: 'M.Sc Computer Science', fee: 'CHF 1,600 / yr', avgCTC: 'CHF 130,000 Avg CTC', roi: '100% ROI', tag: 'Top European' }
    ],
    twin: {
      name: 'Rohan Deshmukh',
      role: 'Staff AI Research Scientist',
      org: 'Frontier AI Labs · London / Bengaluru',
      imgBadge: 'RD',
      exp: '6 Years Experience',
      education: 'B.Tech IIT Delhi → Pre-Doc at Oxford',
      story: 'Participated in machine learning hackathons in college. Spent 2 years writing custom CUDA kernels to optimize attention mechanisms. Today, I work on multi-step reasoning capabilities for next-gen models.',
      advice: 'Frameworks change every 18 months, but the mathematics of loss landscapes and gradient flow remains eternal. Master linear algebra and statistics deeply.'
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
  { id: 4, name: 'Skills & AI', tag: '04' },
  { id: 5, name: 'Roadmap', tag: '05' },
  { id: 6, name: 'Top Unis', tag: '06' },
  { id: 7, name: 'Career Twin', tag: '07' },
  { id: 8, name: 'Gateway', tag: '08' },
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

  // Scroll Progress Tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const p = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
      setScrollProgress(p);

      const stageIdx = Math.min(Math.floor(p * 8) + 1, 8);
      setActiveStage(stageIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Universal Live Search
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
    <div className="gold-master-page">
      <Navbar />

      {/* FIXED 3D REALISTIC MORPHING IRIDESCENT ORB */}
      <div className="fixed-3d-backdrop">
        <RealisticOrb scrollProgress={scrollProgress} />
      </div>

      {/* FLOATING STAGE STEPPER */}
      <nav className="fixed-stage-stepper" aria-label="Stages">
        <div className="stepper-header">
          <span className="stepper-title">NAVIGATOR</span>
          <span className="stepper-stage-count">0{activeStage} / 08</span>
        </div>
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
          <span className="telemetry-badge">STAGE 0{activeStage} · INDEX {Math.round(scrollProgress * 100)}%</span>
          <span className="telemetry-caption">
            {activeStage === 1 && 'Possibility — What Could You Become?'}
            {activeStage === 2 && 'Sectors — 8 Core Industry Blueprints'}
            {activeStage === 3 && `Career Spotlight — ${activeCareer.title}`}
            {activeStage === 4 && 'Capabilities — Skills, Salary Ladder & AI Resilience'}
            {activeStage === 5 && 'Roadmap — 5-Step Educational Pathway'}
            {activeStage === 6 && 'Target Academies — Top Audited Institutions'}
            {activeStage === 7 && `Real Story — Verified Practitioner Journey`}
            {activeStage === 8 && 'Gateway — Branching Possibilities & Complete Suite'}
          </span>
          <span className="telemetry-scroll-hint">Scroll to transform ↓</span>
        </div>
      </div>

      {/* 8 CONTINUOUS EDITORIAL DOSSIER STAGES */}
      <main className="stages-container">

        {/* STAGE 01: HERO & POSSIBILITY */}
        <section id="stage-1" className="stage-section">
          <div className="stage-card hero-dossier-card">
            <div className="hero-eyebrow">
              <span className="badge-pill pulse-gold">15,000+ CAREERS</span>
              <span className="badge-pill">10,000+ UNIVERSITIES</span>
              <span className="badge-pill">VERIFIED DATA</span>
            </div>

            <h1 className="hero-main-heading">
              WHAT COULD<br /><span className="text-highlight-gold">YOU BECOME?</span>
            </h1>

            <p className="hero-main-subtitle">
              The modern career intelligence atlas. Explore audited salary data,
              true-cost degrees, AI resilience scores, and real human journeys.
            </p>

            {/* Live Search Input */}
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
              <span className="pill-title">Popular:</span>
              <button className="pill-btn" onClick={() => { setSelectedCareerKey('Biomedical Engineer'); scrollToStage(3); }}>🩺 Biomedical Engineer</button>
              <button className="pill-btn" onClick={() => { setSelectedCareerKey('AI Research Scientist'); scrollToStage(3); }}>⚡ AI Research Scientist</button>
              <Link to="/explore" className="pill-link">Browse all 15k+ →</Link>
            </div>

            <div className="stage-actions-bar center-actions">
              <button className="cta-primary-btn" onClick={() => scrollToStage(2)}>
                Explore Sectors <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 02: CORE SECTORS */}
        <section id="stage-2" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <div className="stage-tag-badge">STAGE 02 · SECTORS</div>
              <h2 className="stage-title">Choose Your Domain Blueprint</h2>
              <p className="stage-desc">Select an industry to reveal specialized roles and compensation ranges.</p>
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
                  <div className="chip-top">
                    <span className="chip-icon">{sec.icon}</span>
                    <span className="chip-badge">{sec.badge}</span>
                  </div>
                  <strong className="chip-title">{sec.label}</strong>
                  <span className="chip-desc">{sec.desc}</span>
                  <div className="chip-footer">
                    <span className="chip-sample">e.g. {sec.sample}</span>
                    <span className="chip-salary">{sec.avgSalary}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="stage-actions-bar">
              <button className="cta-primary-btn" onClick={() => scrollToStage(3)}>
                Inspect Spotlight ({selectedCareerKey}) <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 03: CAREER SPOTLIGHT */}
        <section id="stage-3" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <div className="stage-tag-badge accent-gold">STAGE 03 · SPOTLIGHT</div>
              <div className="title-with-pill">
                <h1 className="career-big-title">{activeCareer.title}</h1>
                <span className="status-pill-gold">{activeCareer.growthBadge}</span>
              </div>
              <p className="career-big-tagline">{activeCareer.tagline}</p>
            </div>

            <div className="spotlight-metric-cards">
              <div className="metric-box">
                <span className="metric-label">Annual Compensation</span>
                <strong className="metric-val text-gold">{activeCareer.salaryINR}</strong>
                <span className="metric-sub">{activeCareer.salaryUSD}</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Market Demand Velocity</span>
                <strong className="metric-val text-white">{activeCareer.growth}</strong>
                <span className="metric-sub">High Placement Stability</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Education Horizon</span>
                <strong className="metric-val text-gold-dim">{activeCareer.duration}</strong>
                <span className="metric-sub">Degree + Practical Labs</span>
              </div>
            </div>

            <div className="stage-actions-bar">
              <button className="cta-secondary-btn" onClick={() => scrollToStage(4)}>
                Skills & AI Defense ↓
              </button>
              <button className="cta-primary-btn" onClick={() => scrollToStage(5)}>
                View 5-Step Roadmap <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 04: CAPABILITIES & DETAILS */}
        <section id="stage-4" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <div className="stage-tag-badge accent-gold">STAGE 04 · CAPABILITIES</div>
              <h2 className="stage-title">{activeCareer.title} — Skills & AI Resilience</h2>
              <p className="stage-desc">Verified competency requirements and real compensation progression.</p>
            </div>

            <div className="details-two-col">
              {/* Technical Stack */}
              <div className="detail-card">
                <h3 className="card-subhead"><Cpu size={18} className="text-gold" /> Core Competencies</h3>
                <div className="skills-stack-list">
                  {activeCareer.skills.map((sk, i) => (
                    <div key={i} className="skill-meter-row">
                      <div className="skill-meta">
                        <span className="skill-name">{sk.name}</span>
                        <span className="skill-pct">{sk.level}</span>
                      </div>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ width: sk.level }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ai-resilience-box">
                  <div className="ai-head">
                    <span className="ai-title">AI Resilience Score</span>
                    <strong className="ai-rating">{activeCareer.aiResilience}</strong>
                  </div>
                  <span className="ai-tag">{activeCareer.aiRiskLevel}</span>
                  <p className="ai-desc">
                    Physical integration, clinical compliance, and edge-case judgment require irreplaceable human expertise.
                  </p>
                </div>
              </div>

              {/* Salary Progression Ladder */}
              <div className="detail-card">
                <h3 className="card-subhead"><DollarSign size={18} className="text-gold" /> Compensation Progression</h3>
                <div className="salary-tier-ladder">
                  <div className="ladder-step">
                    <div className="ladder-meta">
                      <span className="ladder-rank">Entry Level (0–2 yrs)</span>
                      <span className="ladder-role">Junior Engineer / Specialist</span>
                    </div>
                    <strong className="ladder-amt">{activeCareer.salaryEntry}</strong>
                  </div>
                  <div className="ladder-step highlight">
                    <div className="ladder-meta">
                      <span className="ladder-rank">Mid Level (3–6 yrs)</span>
                      <span className="ladder-role">Senior Systems Specialist</span>
                    </div>
                    <strong className="ladder-amt text-gold">{activeCareer.salaryMid}</strong>
                  </div>
                  <div className="ladder-step">
                    <div className="ladder-meta">
                      <span className="ladder-rank">Lead / Principal (7+ yrs)</span>
                      <span className="ladder-role">Staff Architect / Director</span>
                    </div>
                    <strong className="ladder-amt text-white">{activeCareer.salarySenior}</strong>
                  </div>
                </div>

                <div className="work-env-box">
                  <span className="env-label">Work Environment:</span>
                  <p className="env-text">{activeCareer.workStyle} · {activeCareer.workHours}</p>
                </div>
              </div>
            </div>

            <div className="stage-actions-bar">
              <button className="cta-primary-btn" onClick={() => scrollToStage(5)}>
                Proceed to Educational Route ↓
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 05: EDUCATIONAL ROADMAP */}
        <section id="stage-5" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <div className="stage-tag-badge accent-gold">STAGE 05 · ROADMAP</div>
              <h2 className="stage-title">5-Step Educational Pathway</h2>
              <p className="stage-desc">From secondary school foundation to senior industry leadership.</p>
            </div>

            <div className="pathway-timeline">
              {activeCareer.pathway.map((p, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="node-marker">
                    <span className="marker-num">{p.step}</span>
                    {idx < activeCareer.pathway.length - 1 && <div className="marker-line" />}
                  </div>
                  <div className="node-content-card">
                    <div className="node-card-header">
                      <strong className="node-card-title">{p.title}</strong>
                      <span className="node-card-duration">{p.duration}</span>
                    </div>
                    <p className="node-card-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="stage-actions-bar">
              <button className="cta-primary-btn" onClick={() => scrollToStage(6)}>
                Target Academies ↓
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 06: TARGET UNIVERSITIES */}
        <section id="stage-6" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <div className="stage-tag-badge accent-gold">STAGE 06 · ACADEMIES</div>
              <h2 className="stage-title">Top Audited Academies for {activeCareer.title}</h2>
              <p className="stage-desc">Audited from our 10,000+ global higher education database with verified placement statistics.</p>
            </div>

            <div className="unis-horizontal-grid">
              {activeCareer.unis.map((u, i) => (
                <div key={i} className="uni-spotlight-card">
                  <div className="uni-head">
                    <div className="uni-icon-box">
                      <Building2 size={22} className="text-gold" />
                    </div>
                    <div className="uni-titles">
                      <div className="uni-name-row">
                        <strong className="uni-name">{u.name}</strong>
                        <span className="uni-tag-pill">{u.tag}</span>
                      </div>
                      <span className="uni-loc"><MapPin size={12} /> {u.loc}</span>
                      <span className="uni-degree">{u.degree}</span>
                    </div>
                  </div>
                  <div className="uni-stats-bar">
                    <div className="u-stat">
                      <span className="u-stat-lbl">Tuition Fee</span>
                      <strong className="u-stat-val">{u.fee}</strong>
                    </div>
                    <div className="u-stat">
                      <span className="u-stat-lbl">Average CTC</span>
                      <strong className="u-stat-val text-gold">{u.avgCTC}</strong>
                    </div>
                    <div className="u-stat">
                      <span className="u-stat-lbl">Placement ROI</span>
                      <strong className="u-stat-val text-white">{u.roi}</strong>
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
                Career Twin Story ↓
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 07: REAL CAREER TWIN */}
        <section id="stage-7" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <div className="stage-tag-badge accent-gold">STAGE 07 · CAREER TWIN</div>
              <h2 className="stage-title">Real Human Journey & Advice</h2>
              <p className="stage-desc">Verified real-world experience, career pivot points, and guidance.</p>
            </div>

            <div className="twin-editorial-card">
              <div className="twin-identity">
                <div className="twin-avatar-box">
                  <span className="avatar-initials">{activeCareer.twin.imgBadge}</span>
                </div>
                <div className="twin-text-meta">
                  <div className="twin-title-flex">
                    <strong className="twin-name">{activeCareer.twin.name}</strong>
                    <span className="verified-badge"><BadgeCheck size={16} /> Verified Practitioner</span>
                  </div>
                  <span className="twin-role">{activeCareer.twin.role} · <span className="text-cream">{activeCareer.twin.org}</span></span>
                  <span className="twin-edu">{activeCareer.twin.education} · {activeCareer.twin.exp}</span>
                </div>
              </div>

              <div className="twin-story-body">
                <h4 className="story-label">The Journey:</h4>
                <p className="story-para">{activeCareer.twin.story}</p>

                <div className="advice-callout">
                  <span className="advice-badge">Practitioner Advice:</span>
                  <blockquote className="twin-quote">
                    "{activeCareer.twin.advice}"
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="stage-actions-bar">
              <button className="cta-primary-btn" onClick={() => scrollToStage(8)}>
                Branching Possibilities ↓
              </button>
            </div>
          </div>
        </section>

        {/* STAGE 08: BRANCHING POSSIBILITIES & LAUNCH GATEWAY */}
        <section id="stage-8" className="stage-section">
          <div className="stage-card">
            <div className="stage-header">
              <div className="stage-tag-badge accent-gold">STAGE 08 · GATEWAY</div>
              <h2 className="stage-title">Connected Possibilities</h2>
              <p className="stage-desc">Adjacent high-yield career tracks sharing your core competencies and interests.</p>
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
                  <span className="rel-cta">Explore Path →</span>
                </div>
              ))}
            </div>

            <div className="portal-action-cluster">
              <div className="cluster-header">
                <h3>Ready to Map Your Career Trajectory?</h3>
                <p>Access our complete suite of AI tools, comparison engines, and 10,000+ university audits.</p>
              </div>
              <div className="cluster-buttons">
                <Link to="/explore" className="btn-solid-gold">
                  <Compass size={18} /> Search 15,000+ Careers
                </Link>
                <Link to="/quiz" className="btn-solid-white">
                  <Zap size={18} /> 30-Question Assessment
                </Link>
                <Link to="/reports" className="btn-solid-gold-dim">
                  <GraduationCap size={18} /> 10,000 Universities
                </Link>
                <Link to="/compare" className="btn-outline-gold">
                  <Layers size={18} /> Compare Trajectories
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
