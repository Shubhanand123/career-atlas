import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Search, GraduationCap, Zap, TrendingDown, Layers, 
  ChevronDown, ShieldCheck, Award, ArrowUpRight, Compass, Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import CareerUniverse from '../components/CareerUniverse';
import '../styles/landing.css';

const SCROLL_STAGES = [
  {
    id: 0,
    index: '01',
    tag: 'GLOBAL ONTOLOGY',
    title: 'THE CAREER COSMOS',
    subtitle: 'Every Career. Every Specialization. Every Possible Path.',
    desc: 'Navigate 10,000+ canonical occupations mapped into multidimensional skill, education, and compensation space. Unfettered clarity from high school streams to deep-tech research.',
    ctaText: 'Enter 3D Cosmos',
    ctaLink: '/explore',
    secondaryText: 'Take Matching Quiz',
    secondaryLink: '/quiz',
    metricLabel: 'Occupational Graph',
    metricVal: '10,000+ Nodes'
  },
  {
    id: 1,
    index: '02',
    tag: 'INSTITUTIONAL AUDIT',
    title: 'COLLEGE PLACEMENTS & ROI',
    subtitle: 'Unfiltered Branch CTCs, Cutoffs & 4-Year Payback Ratios.',
    desc: 'Direct institutional data from IITs, BITS, IIMs, AIIMS, Stanford, and MIT. Real median domestic and international CTCs, marquee recruiters, and tuition fee recovery benchmarks.',
    ctaText: 'Explore Placement Reports',
    ctaLink: '/placements',
    secondaryText: 'Compare Colleges',
    secondaryLink: '/compare',
    metricLabel: 'Verified Top CTC',
    metricVal: '₹3.67 CPA / $440k'
  },
  {
    id: '2',
    index: '03',
    tag: 'COMPENSATION MULTIPLIER',
    title: 'HIGH-YIELD SKILL COMBOS',
    subtitle: 'Stack Rare Complementary Domains for 2.5x–5.0x Pay.',
    desc: 'Linear specializations yield linear salaries. Stacking low-latency systems with stochastic calculus (Quant), or CUDA with distributed clusters (AI Infra) unlocks monopoly earning power.',
    ctaText: 'Stack Skill Multipliers',
    ctaLink: '/combos',
    secondaryText: 'Inspect Roadmaps',
    secondaryLink: '/combos',
    metricLabel: 'Peak Target Comp',
    metricVal: '₹3.5 CPA / $650k'
  },
  {
    id: 3,
    index: '04',
    tag: 'MARKET INTELLIGENCE',
    title: 'LAYOFF AUDIT & AI SHIELD',
    subtitle: 'Vulnerability Analysis Across 380,000+ Reductions.',
    desc: 'Real-time structural contraction tracking across Big Tech, Finance, and Consulting. Contrast vulnerable boilerplate roles against mission-critical, AI-resilient specializations.',
    ctaText: 'View Layoff & AI Tracker',
    ctaLink: '/layoffs',
    secondaryText: '3-Wave Timeline',
    secondaryLink: '/layoffs',
    metricLabel: 'AI Resilience Leader',
    metricVal: 'Systems & Medical'
  },
  {
    id: 4,
    index: '05',
    tag: 'SECTION 150 STANDARD',
    title: 'VERIFIED CAREER TWINS',
    subtitle: 'Real People. Unvarnished Trajectories. Practical Lessons.',
    desc: 'No fabricated testimonials. Genuine practitioners documenting their educational backgrounds, first jobs, salary inflection points, biggest surprises, and whether they would choose it again.',
    ctaText: 'Read Practitioner Stories',
    ctaLink: '/career/software-engineer',
    secondaryText: 'Verify as Professional',
    secondaryLink: '/career/software-engineer',
    metricLabel: 'Verification Standard',
    metricVal: '100% Verified'
  }
];

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.max(0, Math.min(1, window.scrollY / totalHeight));
        setScrollProgress(progress);
        
        // Determine active stage based on scroll range
        const stageIdx = Math.min(SCROLL_STAGES.length - 1, Math.floor(progress * SCROLL_STAGES.length));
        setActiveStage(stageIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const scrollToStage = (index) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (index / (SCROLL_STAGES.length - 1)) * totalHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const currentStageData = SCROLL_STAGES[activeStage] || SCROLL_STAGES[0];

  return (
    <div className="landing-3d-wrapper">
      {/* Three.js 3D Background Canvas Driven by Scroll Progress */}
      <CareerUniverse scrollProgress={scrollProgress} />

      {/* Persistent Global Navbar */}
      <Navbar />

      {/* Floating HUD: Scroll Progress Meter & Stage Indicator */}
      <aside className="scroll-hud-rail" aria-label="3D Scroll Navigation">
        <div className="hud-line">
          <div className="hud-line-fill" style={{ height: `${scrollProgress * 100}%` }} />
        </div>
        <div className="hud-stage-dots">
          {SCROLL_STAGES.map((stg, idx) => (
            <button
              key={stg.id}
              className={`hud-dot ${activeStage === idx ? 'active' : ''}`}
              onClick={() => scrollToStage(idx)}
              title={stg.title}
            >
              <span className="dot-label">{stg.index}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Scrollable Transparent Sections Container */}
      <div className="scroll-height-spacer">
        {SCROLL_STAGES.map((stage, idx) => (
          <section key={stage.id} className="scroll-viewport-section">
            <div className="stage-content-card">
              <div className="stage-tag-badge">
                <span className="stage-num">{stage.index}</span> // {stage.tag}
              </div>

              <h1 className="stage-main-title">{stage.title}</h1>
              <h2 className="stage-subtitle">{stage.subtitle}</h2>
              <p className="stage-description">{stage.desc}</p>

              <div className="stage-metric-strip">
                <div>
                  <span className="sm-label">{stage.metricLabel}</span>
                  <span className="sm-val">{stage.metricVal}</span>
                </div>
              </div>

              <div className="stage-actions">
                <Link to={stage.ctaLink} className="stage-btn-primary">
                  {stage.ctaText} <ArrowUpRight size={16} />
                </Link>
                <Link to={stage.secondaryLink} className="stage-btn-secondary">
                  {stage.secondaryText}
                </Link>
              </div>

              {idx === 0 && (
                <form onSubmit={handleSearchSubmit} className="minimal-search-bar">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search careers, skills, colleges (e.g. Quant, CUDA, IIT Bombay)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="search-btn">Explore</button>
                </form>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Scroll Down Prompt for Stage 0 */}
      {scrollProgress < 0.1 && (
        <div className="scroll-indicator-prompt" onClick={() => scrollToStage(1)}>
          <span>Scroll to travel through the 3D Cosmos</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      )}
    </div>
  );
}
