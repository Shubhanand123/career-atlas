import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Search, GraduationCap, Zap, TrendingDown, Layers, 
  ChevronDown, ShieldCheck, Award, ArrowUpRight, Compass, Sparkles,
  Trophy, DollarSign, Users, Briefcase, ChevronRight, CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import CareerUniverse, { ARCHITECTURAL_ZONES } from '../components/CareerUniverse';
import { parseNaturalLanguageQuery } from '../utils/naturalLanguageSearch';
import '../styles/landing.css';

const SCROLL_STAGES = [
  {
    id: 'entrance',
    index: '01',
    zoneId: 'entrance',
    tag: 'GRAND ENTRANCE',
    title: 'THE CAREER CITY',
    subtitle: 'Every Career. Every Specialization. Every Possible Path.',
    desc: 'Traverse 15,000+ occupation and specialization pathways across manual trades, clinical medicine, engineering, civil service, sports, and AI research. Mapped into multidimensional skills, education, and compensation realities.',
    ctaText: 'Explore 15,000+ Careers',
    ctaLink: '/explore',
    secondaryText: 'Take 30-Question Quiz',
    secondaryLink: '/quiz',
    metricLabel: 'Occupational Graph',
    metricVal: '15,000+ Paths'
  },
  {
    id: 'streams',
    index: '02',
    zoneId: 'streams',
    tag: 'POST-10TH & 12TH PATHWAYS',
    title: 'FOUNDATIONAL STREAMS & BRANCHES',
    subtitle: 'Science · Commerce · Arts & Humanities · Vocational Trades',
    desc: 'Understand how your school subjects directly gate or enable higher degrees, polytechnics, and direct vocational apprenticeships. Explore both conventional ladders and alternative routes into high-income fields.',
    ctaText: 'Explore Stream Branches',
    ctaLink: '/explore?stream=science',
    secondaryText: 'Reverse Pathway Finder',
    secondaryLink: '/quiz',
    metricLabel: 'Stream Frameworks',
    metricVal: '4 Core / 48 Branches'
  },
  {
    id: 'education',
    index: '03',
    zoneId: 'education',
    tag: 'ACADEMIC PATHWAYS',
    title: 'DEGREE & PROGRAM PIPELINES',
    subtitle: 'B.Tech, MBBS, B.Des, BBA, Law, Vocational ITI & Certifications',
    desc: 'Detailed timelines, entrance exams, accreditation standards, and practical course duration benchmarks. See which degrees provide immediate industry placement vs those requiring postgraduate specialization.',
    ctaText: 'Inspect Degree Pipelines',
    ctaLink: '/placements',
    secondaryText: 'Compare Programs',
    secondaryLink: '/compare',
    metricLabel: 'Degree Coverage',
    metricVal: '120+ Accredited Degrees'
  },
  {
    id: 'institutions',
    index: '04',
    zoneId: 'institutions',
    tag: 'GLOBAL INSTITUTIONS',
    title: '5,000+ POST-12TH UNIVERSITIES',
    subtitle: 'IITs, AIIMS, BITS, Oxford, TUM, Stanford, Toronto & NUS',
    desc: 'Unfiltered placement statistics, branch CTCs, domestic & international tuition, international student criteria, and verified ROI payback ratios without promotional marketing bias.',
    ctaText: 'Search 5,000+ Universities',
    ctaLink: '/placements',
    secondaryText: 'Compare Colleges',
    secondaryLink: '/compare',
    metricLabel: 'Verified Top CTC',
    metricVal: '₹3.67 CPA / $440k'
  },
  {
    id: 'true-cost',
    index: '05',
    zoneId: 'true-cost',
    tag: 'FINANCIAL AUDIT',
    title: 'TRUE COST OF STUDY SYSTEM',
    subtitle: 'Tuition + Accommodation + Food + Transport + Insurance',
    desc: 'Calculate the real cost of attending university abroad or domestically across Low, Average, and High budget scenarios. Instant multi-currency conversion into INR, USD, EUR, and GBP with city-level living costs.',
    ctaText: 'Calculate True Cost of Study',
    ctaLink: '/placements',
    secondaryText: 'Find Scholarships',
    secondaryLink: '/placements',
    metricLabel: 'True Cost Coverage',
    metricVal: '100% Granular Costs'
  },
  {
    id: 'careers',
    index: '06',
    zoneId: 'careers',
    tag: 'DEEP SPECIALIZATIONS',
    title: 'THE 15,000-CAREER REPOSITORY',
    subtitle: 'From Master Trades to Interventional Electrophysiologists',
    desc: 'Deep specialization breakdowns: Doctor → Cardiologist → Interventional Cardiologist. Detailed daily responsibilities, tools, skills, education time, licensing requirements, and official pay tables.',
    ctaText: 'Search Career Database',
    ctaLink: '/explore',
    secondaryText: 'Pay Comparison Tables',
    secondaryLink: '/career/software-engineer',
    metricLabel: 'Granular Occupations',
    metricVal: '15,000+ Titles'
  },
  {
    id: 'jobs',
    index: '07',
    zoneId: 'jobs',
    tag: 'CAREER OPS & MARKET',
    title: 'APPLICATION TRACKER & CV BUILDER',
    subtitle: 'Targeted CV Versions, Skill-Gap Matcher & Interview Prep',
    desc: 'Professional student-friendly CV builder with live ATS formatting and PDF export. Match your qualifications against job postings, track applications through 8 Kanban states, and practice role-specific interview questions.',
    ctaText: 'Open Career Workspace',
    ctaLink: '/workspace',
    secondaryText: 'Interview Question Banks',
    secondaryLink: '/workspace',
    metricLabel: 'Application Stages',
    metricVal: '8 Kanban States'
  },
  {
    id: 'sports',
    index: '08',
    zoneId: 'sports',
    tag: 'COMPLETE SPORTS ECOSYSTEM',
    title: 'THE SPORTS CAREER WORLD',
    subtitle: '35+ Careers · 25+ Sports · Athlete to Sports Tech & Law',
    desc: 'Sports is a complete economic ecosystem. Explore pathways for Athletes, Coaches, S&C Trainers, Sports Physiotherapists, Sports Doctors, Data Analysts, Agents, Sports Lawyers, and Event Directors across 25+ disciplines.',
    ctaText: 'Explore Sports Ecosystem',
    ctaLink: '/explore?family=sports',
    secondaryText: 'Athlete Pathways',
    secondaryLink: '/explore?family=sports',
    metricLabel: 'Sports Careers',
    metricVal: '35+ Dedicated Roles'
  },
  {
    id: 'people',
    index: '09',
    zoneId: 'people',
    tag: 'COMMUNITY VOICES',
    title: 'STUDENT REVIEWS & FEEDBACK',
    subtitle: 'Unvarnished Ratings & "Have You Studied Here?"',
    desc: 'Verified student and graduate feedback across academics, faculty, infrastructure, placements, workload, and value for money. Includes duplicate detection, spam filtering, and helpfulness voting.',
    ctaText: 'Read Verified Reviews',
    ctaLink: '/placements',
    secondaryText: 'Leave Institution Review',
    secondaryLink: '/placements',
    metricLabel: 'Verification Standard',
    metricVal: 'Verified Students'
  },
  {
    id: 'twins',
    index: '10',
    zoneId: 'twins',
    tag: 'SECTION 150 STANDARD',
    title: 'VERIFIED CAREER TWINS',
    subtitle: 'Real People. Unvarnished Trajectories. Practical Lessons.',
    desc: 'No fabricated testimonials. Genuine practitioners documenting their educational backgrounds, first jobs, salary inflection points, biggest surprises, challenges, and whether they would choose the path again.',
    ctaText: 'Read Career Twin Stories',
    ctaLink: '/career/software-engineer',
    secondaryText: 'Share Your Story',
    secondaryLink: '/career/software-engineer',
    metricLabel: 'Factual Accuracy',
    metricVal: '100% Unfabricated'
  },
  {
    id: 'map',
    index: '11',
    zoneId: 'map',
    tag: 'PERSONAL INTELLIGENCE',
    title: 'MY CAREER MAP & RADAR',
    subtitle: '30-Question Assessment & Trait Breakdown',
    desc: 'Answer exactly 30 structured questions covering your interests, strengths, work styles, and risk tolerance. Get a personalized trait radar chart, recommended streams, degrees, target institutions, and skill gaps.',
    ctaText: 'Take 30-Question Quiz',
    ctaLink: '/quiz',
    secondaryText: 'View Saved Map',
    secondaryLink: '/quiz',
    metricLabel: 'Quiz Precision',
    metricVal: 'Exact 30 Questions'
  },
  {
    id: 'future',
    index: '12',
    zoneId: 'future',
    tag: 'HORIZON 2035',
    title: 'FRONTIER AI & HIGH-YIELD COMBOS',
    subtitle: 'Stack Rare Complementary Domains for 3x–5x Leverage',
    desc: 'Linear skills yield linear salaries. Stacking low-latency systems with stochastic calculus (Quant), or CUDA with medical robotics unlocks monopoly earning power and insulates against automation.',
    ctaText: 'Explore Skill Multipliers',
    ctaLink: '/combos',
    secondaryText: 'Inspect Layoff Tracker',
    secondaryLink: '/layoffs',
    metricLabel: 'Peak Target Comp',
    metricVal: '₹3.5 CPA / $650k'
  }
];

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [parsedQuery, setParsedQuery] = useState(() => parseNaturalLanguageQuery(''));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.max(0, Math.min(1, window.scrollY / totalHeight));
        setScrollProgress(progress);

        const stageIdx = Math.min(
          SCROLL_STAGES.length - 1,
          Math.floor(progress * SCROLL_STAGES.length)
        );
        setActiveStage(stageIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setParsedQuery(parseNaturalLanguageQuery(val));
  };

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

  const currentStage = SCROLL_STAGES[activeStage] || SCROLL_STAGES[0];

  return (
    <div className="landing-3d-wrapper">
      {/* 12-Zone Continuous 3D Architectural World */}
      <CareerUniverse
        scrollProgress={scrollProgress}
        onSelectZone={(zoneId) => {
          const idx = SCROLL_STAGES.findIndex(s => s.zoneId === zoneId);
          if (idx !== -1) scrollToStage(idx);
        }}
      />

      {/* Persistent Global Navbar */}
      <Navbar />

      {/* Floating Architectural HUD Rail */}
      <aside className="scroll-hud-rail" aria-label="Architectural Journey Navigation">
        <div className="hud-line">
          <div className="hud-line-fill" style={{ height: `${scrollProgress * 100}%` }} />
        </div>
        <div className="hud-stage-dots">
          {SCROLL_STAGES.map((stg, idx) => (
            <button
              key={stg.id}
              className={`hud-dot ${activeStage === idx ? 'active' : ''}`}
              onClick={() => scrollToStage(idx)}
              title={`${stg.index} · ${stg.title}`}
            >
              <span className="dot-label">{stg.index}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* 12 Scrollable Atmospheric Story Sections */}
      <div className="scroll-height-spacer">
        {SCROLL_STAGES.map((stage, idx) => (
          <section key={stage.id} className="scroll-viewport-section">
            <motion.div 
              className="stage-content-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
            >
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
                <div className="sm-indicator">
                  Zone {idx + 1} of 12 · Architectural Pavilion Active
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

              {/* Natural Language Search Bar on Stage 1 */}
              {idx === 0 && (
                <div className="search-module-container">
                  <form onSubmit={handleSearchSubmit} className="minimal-search-bar">
                    <Search size={18} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Try: 'AI engineering in Germany under ₹20 lakh' or 'Sports careers after science'..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button type="submit" className="search-btn">Discover</button>
                  </form>

                  {/* Parsed Filter Badges */}
                  {parsedQuery.badges.length > 0 && (
                    <div className="nl-badges-preview">
                      <span className="nl-badges-label">Parsed Filters:</span>
                      {parsedQuery.badges.map((badge, bIdx) => (
                        <span key={bIdx} className="nl-badge">{badge}</span>
                      ))}
                    </div>
                  )}

                  <div className="search-quick-suggestions">
                    <button type="button" onClick={() => { setSearchQuery('AI engineering in Germany under ₹20 lakh'); setParsedQuery(parseNaturalLanguageQuery('AI engineering in Germany under ₹20 lakh')); }}>
                      🇩🇪 AI in Germany &lt; ₹20L
                    </button>
                    <button type="button" onClick={() => { setSearchQuery('Sports careers other than athlete'); setParsedQuery(parseNaturalLanguageQuery('Sports careers other than athlete')); }}>
                      ⚽ Non-Athlete Sports
                    </button>
                    <button type="button" onClick={() => { setSearchQuery('High paying careers without coding'); setParsedQuery(parseNaturalLanguageQuery('High paying careers without coding')); }}>
                      📈 High-Pay Non-Coding
                    </button>
                    <button type="button" onClick={() => { setSearchQuery('Affordable nursing in Canada'); setParsedQuery(parseNaturalLanguageQuery('Affordable nursing in Canada')); }}>
                      🩺 Nursing in Canada
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </section>
        ))}
      </div>

      {/* Scroll Down Prompt for Initial Viewport */}
      {scrollProgress < 0.05 && (
        <div className="scroll-indicator-prompt" onClick={() => scrollToStage(1)}>
          <span>Scroll to journey through the 12 Architectural Zones of Career City</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      )}
    </div>
  );
}
