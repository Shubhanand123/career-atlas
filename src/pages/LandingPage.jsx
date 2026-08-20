import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Search, GraduationCap, Zap, TrendingDown, Layers, 
  ChevronDown, ShieldCheck, Award, ArrowUpRight, Compass, Sparkles,
  Trophy, DollarSign, Users, Briefcase, ChevronRight, CheckCircle2,
  Globe, Calculator, FileText, CheckCircle, Clock, MapPin, Building2,
  RotateCcw, ExternalLink
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Navbar from '../components/Navbar';
import CareerUniverse, { ARCHITECTURAL_ZONES } from '../components/CareerUniverse';
import { parseNaturalLanguageQuery } from '../utils/naturalLanguageSearch';
import { searchCareerCatalog } from '../data/careerCatalog';
import { globalInstitutions, calculateTrueCostOfStudy } from '../data/institutionsDatabase';
import { searchInstitutionsCatalog } from '../data/institutionsCatalog';
import { sportsRoles, sportsDisciplines } from '../data/sportsEcosystem';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';
import { quizQuestions, quizOptions, traits } from '../data/quizQuestions';
import { salaryCombos } from '../data/salaryCombos';
import { layoffSectorReports } from '../data/layoffReports';
import { careerTwinsData } from '../data/careerTwins';
import '../styles/landing.css';

const STAGES = ['Saved', 'Interested', 'Preparing', 'Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'];

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeZone, setActiveZone] = useState('entrance');
  const navigate = useNavigate();

  // Natural Language Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [parsedQuery, setParsedQuery] = useState(() => parseNaturalLanguageQuery(''));
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Embedded University & True Cost State
  const [selectedInst, setSelectedInst] = useState(globalInstitutions[0]);
  const [costScenario, setCostScenario] = useState('average');
  const [isInternational, setIsInternational] = useState(true);
  const [calcCurrency, setCalcCurrency] = useState('USD');

  // Embedded Stream State
  const [selectedStream, setSelectedStream] = useState('science');

  // Embedded Sports State
  const [selectedSportRole, setSelectedSportRole] = useState(sportsRoles[0]);

  // Embedded 30-Q Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizRadarData, setQuizRadarData] = useState([]);

  // Embedded Workspace Kanban State
  const [kanbanApps, setKanbanApps] = useState([
    { id: 'app-1', company: 'Google', position: 'Software Engineer — Distributed Systems', stage: 'Interview' },
    { id: 'app-2', company: 'Jane Street / Citadel', position: 'Quant Systems Developer', stage: 'Preparing' },
    { id: 'app-3', company: 'Apollo Hospitals', position: 'Sports Medicine Resident', stage: 'Applied' },
    { id: 'app-4', company: 'McLaren Racing F1', position: 'Telemetry Data Analyst', stage: 'Offer' }
  ]);

  // Handle scroll tracking for 3D Camera
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.max(0, Math.min(1, window.scrollY / totalHeight));
        setScrollProgress(progress);

        const zoneIdx = Math.min(
          ARCHITECTURAL_ZONES.length - 1,
          Math.floor(progress * ARCHITECTURAL_ZONES.length)
        );
        setActiveZone(ARCHITECTURAL_ZONES[zoneIdx].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live natural language search handler
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const parsed = parseNaturalLanguageQuery(val);
    setParsedQuery(parsed);

    if (val.trim().length > 1) {
      setIsSearching(true);
      searchCareerCatalog({ query: val, limit: 6 }).then(res => {
        setSearchResults(res.items || []);
        setIsSearching(false);
      });
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // True Cost calculation for selected institution
  const trueCost = useMemo(() => {
    return calculateTrueCostOfStudy(selectedInst, {
      scenario: costScenario,
      isInternational,
      currency: calcCurrency
    });
  }, [selectedInst, costScenario, isInternational, calcCurrency]);

  // Handle embedded quiz answers
  const handleQuizAnswer = (score) => {
    const q = quizQuestions[quizStep];
    const newAnswers = { ...quizAnswers, [q.id]: score };
    setQuizAnswers(newAnswers);

    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate Radar
      const traitTotals = {};
      traits.forEach(t => { traitTotals[t.id] = { score: 0, max: 0 }; });
      quizQuestions.forEach(question => {
        const val = newAnswers[question.id] || 3;
        traitTotals[question.trait].score += val;
        traitTotals[question.trait].max += 5;
      });

      const rData = traits.map(t => ({
        trait: t.name,
        score: Math.round((traitTotals[t.id].score / traitTotals[t.id].max) * 100)
      }));

      setQuizRadarData(rData);
      setQuizCompleted(true);
    }
  };

  const currentQ = quizQuestions[quizStep];

  return (
    <div className="landing-3d-wrapper">
      {/* 12-Zone Continuous 3D Architectural Canvas */}
      <CareerUniverse
        scrollProgress={scrollProgress}
        onSelectZone={(zoneId) => scrollToSection(zoneId)}
      />

      {/* Global Navbar */}
      <Navbar />

      {/* Quick Jump Architectural Floating HUD */}
      <aside className="scroll-hud-rail" aria-label="12-Zone Navigation">
        <div className="hud-line">
          <div className="hud-line-fill" style={{ height: `${scrollProgress * 100}%` }} />
        </div>
        <div className="hud-stage-dots">
          {ARCHITECTURAL_ZONES.map((zone, idx) => (
            <button
              key={zone.id}
              className={`hud-dot ${activeZone === zone.id ? 'active' : ''}`}
              onClick={() => scrollToSection(zone.id)}
              title={`${idx + 1} · ${zone.name}`}
            >
              <span className="dot-label">{String(idx + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* CONTINUOUS ALL-IN-ONE SCROLL CONTAINER */}
      <div className="scroll-height-spacer">

        {/* ZONE 1: THE GRAND PORTAL & UNIVERSAL SEARCH */}
        <section id="entrance" className="scroll-viewport-section">
          <motion.div className="stage-content-card main-hub-card">
            <div className="stage-tag-badge">
              <span className="stage-num">01</span> // GRAND PORTAL & UNIVERSAL SEARCH
            </div>
            <h1 className="stage-main-title">THE CAREER CITY</h1>
            <h2 className="stage-subtitle">15,000+ Careers · 10,000+ Universities · 35+ Sports Professions</h2>
            <p className="stage-description">
              One unified platform for every career, university, true living-cost calculation, sports pathway, and skill-multiplier roadmap.
            </p>

            {/* Universal Natural Language Search */}
            <div className="search-module-container mt-3">
              <form onSubmit={handleSearchSubmit} className="minimal-search-bar">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Try: 'AI engineering in Germany under ₹20 lakh' or 'Sports careers other than athlete'..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <button type="submit" className="search-btn">Discover</button>
              </form>

              {/* Parsed Badges */}
              {parsedQuery.badges.length > 0 && (
                <div className="nl-badges-preview">
                  <span className="nl-badges-label">Parsed Filters:</span>
                  {parsedQuery.badges.map((b, idx) => (
                    <span key={idx} className="nl-badge">{b}</span>
                  ))}
                </div>
              )}

              {/* Live Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="live-search-dropdown">
                  {searchResults.map(c => (
                    <Link key={c.id} to={`/career/${c.id}`} className="live-search-item">
                      <div>
                        <strong>{c.name}</strong>
                        <span className="lsi-category">{c.category || c.family}</span>
                      </div>
                      <span className="lsi-salary font-mono text-green">
                        ${((c.salaryUSD?.mid || 85000)/1000).toFixed(0)}k/yr
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Quick Preset Queries */}
              <div className="search-quick-suggestions mt-2">
                <button type="button" onClick={() => handleSearchChange('AI engineering & machine learning in Germany')}>🇩🇪 AI in Germany</button>
                <button type="button" onClick={() => handleSearchChange('Sports careers other than athlete')}>⚽ Sports Roles</button>
                <button type="button" onClick={() => handleSearchChange('High paying careers without coding')}>📈 High-Pay Non-Coding</button>
                <button type="button" onClick={() => handleSearchChange('Clinical surgery and medical research')}>🩺 Medicine</button>
              </div>
            </div>

            <div className="stage-actions mt-4">
              <button className="stage-btn-primary" onClick={() => scrollToSection('careers')}>
                Explore 15,000+ Careers <ArrowDown size={16} />
              </button>
              <button className="stage-btn-secondary" onClick={() => scrollToSection('true-cost')}>
                True Cost Calculator
              </button>
              <button className="stage-btn-secondary" onClick={() => scrollToSection('map')}>
                Take 30-Question Quiz
              </button>
            </div>
          </motion.div>
        </section>

        {/* ZONE 2: STREAMS QUADRANT */}
        <section id="streams" className="scroll-viewport-section">
          <motion.div className="stage-content-card">
            <div className="stage-tag-badge">
              <span className="stage-num">02</span> // POST-10TH & 12TH FOUNDATIONS
            </div>
            <h2 className="stage-main-title">STREAMS QUADRANT</h2>
            <p className="stage-description">
              Explore how high school subjects connect directly into degrees, direct apprenticeships, and high-income careers.
            </p>

            <div className="stream-toggle-pills mt-3">
              {[
                ['science', '🔬 Science (PCM / PCB)'],
                ['commerce', '📊 Commerce & Economics'],
                ['arts', '🎨 Arts & Humanities'],
                ['trades', '🔧 Vocational & Technical']
              ].map(([id, label]) => (
                <button
                  key={id}
                  className={`stream-pill ${selectedStream === id ? 'active' : ''}`}
                  onClick={() => setSelectedStream(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="stream-detail-box mt-3">
              {selectedStream === 'science' && (
                <div>
                  <h4 className="text-gold font-bold">Science Stream Pathways</h4>
                  <p className="text-sm text-secondary">Prerequisites: Physics, Chemistry, Mathematics / Biology</p>
                  <div className="chips-grid mt-2">
                    <span className="chip">B.Tech Software & Systems</span>
                    <span className="chip">MBBS & Clinical Medicine</span>
                    <span className="chip">B.Sc Data Science & AI</span>
                    <span className="chip">Sports Physiotherapy</span>
                    <span className="chip">Aerospace & Robotics</span>
                  </div>
                </div>
              )}
              {selectedStream === 'commerce' && (
                <div>
                  <h4 className="text-gold font-bold">Commerce & Business Pathways</h4>
                  <p className="text-sm text-secondary">Prerequisites: Accountancy, Economics, Business Studies, Math</p>
                  <div className="chips-grid mt-2">
                    <span className="chip">Chartered Accountancy (CA)</span>
                    <span className="chip">Investment Banking & Quant Analyst</span>
                    <span className="chip">BBA + MBA (IIM IPM)</span>
                    <span className="chip">Corporate Law</span>
                  </div>
                </div>
              )}
              {selectedStream === 'arts' && (
                <div>
                  <h4 className="text-gold font-bold">Arts & Humanities Pathways</h4>
                  <p className="text-sm text-secondary">Prerequisites: Political Science, History, Psychology, Literature</p>
                  <div className="chips-grid mt-2">
                    <span className="chip">Civil Services (IAS / IFS)</span>
                    <span className="chip">B.Des UX & Product Design</span>
                    <span className="chip">Journalism & Media Strategy</span>
                    <span className="chip">Sports Management</span>
                  </div>
                </div>
              )}
              {selectedStream === 'trades' && (
                <div>
                  <h4 className="text-gold font-bold">Vocational & Skilled Trades</h4>
                  <p className="text-sm text-secondary">Prerequisites: 10th / 12th + Practical Technical Apprenticeship</p>
                  <div className="chips-grid mt-2">
                    <span className="chip">Industrial Electrician & Automation</span>
                    <span className="chip">Precision CNC Machinist</span>
                    <span className="chip">Renewable Solar Technician</span>
                    <span className="chip">Aircraft Maintenance (AME)</span>
                  </div>
                </div>
              )}
            </div>

            <div className="stage-actions mt-3">
              <Link to={`/explore?family=${selectedStream}`} className="stage-btn-primary">
                Explore All {selectedStream.toUpperCase()} Careers →
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ZONE 3 & 4: 10,000+ UNIVERSITIES & INSTITUTIONS */}
        <section id="institutions" className="scroll-viewport-section">
          <motion.div className="stage-content-card">
            <div className="stage-tag-badge">
              <span className="stage-num">03 & 04</span> // GLOBAL ACADEMIES
            </div>
            <h2 className="stage-main-title">10,000+ UNIVERSITIES</h2>
            <p className="stage-description">
              Unfiltered placement CTCs, admission criteria, and ratings across IITs, AIIMS, BITS, Oxford, TUM, Stanford, Toronto, and NUS.
            </p>

            {/* University Quick Selector */}
            <div className="universities-quick-list mt-3">
              {globalInstitutions.slice(0, 4).map(inst => (
                <div
                  key={inst.id}
                  className={`uni-select-item ${selectedInst.id === inst.id ? 'active' : ''}`}
                  onClick={() => setSelectedInst(inst)}
                >
                  <div className="d-flex justify-between items-center">
                    <strong>{inst.name}</strong>
                    <span className="badge verified">{inst.countryCode}</span>
                  </div>
                  <p className="text-xs text-muted">{inst.city}, {inst.country} · {inst.type}</p>
                </div>
              ))}
            </div>

            <div className="stage-actions mt-3">
              <Link to="/placements" className="stage-btn-primary">
                Search All 10,000+ Universities & Placement Reports <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ZONE 5: TRUE COST OF STUDY CALCULATOR */}
        <section id="true-cost" className="scroll-viewport-section">
          <motion.div className="stage-content-card">
            <div className="stage-tag-badge">
              <span className="stage-num">05</span> // FINANCIAL AUDIT & TRUE COST
            </div>
            <h2 className="stage-main-title">TRUE COST OF STUDY</h2>
            <p className="stage-description">
              Calculate the real investment for <strong>{selectedInst.name}</strong> across Tuition, Rent, Food, Transport, and Health Insurance.
            </p>

            {/* Scenario & Currency Controls */}
            <div className="d-flex justify-between items-center flex-wrap gap-2 mt-3">
              <div className="toggle-pill-group">
                <button className={costScenario === 'low' ? 'active' : ''} onClick={() => setCostScenario('low')}>Low Budget</button>
                <button className={costScenario === 'average' ? 'active' : ''} onClick={() => setCostScenario('average')}>Average Budget</button>
                <button className={costScenario === 'high' ? 'active' : ''} onClick={() => setCostScenario('high')}>High Budget</button>
              </div>

              <div className="toggle-pill-group">
                <button className={isInternational ? 'active' : ''} onClick={() => setIsInternational(true)}>International</button>
                <button className={!isInternational ? 'active' : ''} onClick={() => setIsInternational(false)}>Domestic</button>
              </div>

              <select value={calcCurrency} onChange={e => setCalcCurrency(e.target.value)} className="currency-dropdown">
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (CA$)</option>
              </select>
            </div>

            {/* Cost Breakdown Grid */}
            <div className="cost-breakdown-grid mt-3">
              <div className="cost-box">
                <span className="cost-label">Annual Tuition</span>
                <span className="cost-val text-green font-mono">
                  {formatCurrency(convertCurrency(trueCost.tuitionAnnual, selectedInst.currency, calcCurrency), calcCurrency)}
                </span>
              </div>
              <div className="cost-box">
                <span className="cost-label">Accommodation / mo</span>
                <span className="cost-val text-gold font-mono">
                  {formatCurrency(convertCurrency(trueCost.breakdown.accommodationMonthly, selectedInst.currency, calcCurrency), calcCurrency)}
                </span>
              </div>
              <div className="cost-box">
                <span className="cost-label">Food & Transit / mo</span>
                <span className="cost-val font-mono">
                  {formatCurrency(convertCurrency(trueCost.breakdown.foodMonthly + trueCost.breakdown.transportMonthly, selectedInst.currency, calcCurrency), calcCurrency)}
                </span>
              </div>
              <div className="cost-box">
                <span className="cost-label">Total Annual Study Cost</span>
                <span className="cost-val text-cyan font-mono font-bold">
                  {formatCurrency(convertCurrency(trueCost.totalAnnualCost, selectedInst.currency, calcCurrency), calcCurrency)}
                </span>
              </div>
            </div>

            <div className="stage-actions mt-3">
              <Link to="/placements" className="stage-btn-primary">
                Open Full 10,000+ Institution Cost Calculator →
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ZONE 6: 15,000+ CAREERS & PAY COMPARISON */}
        <section id="careers" className="scroll-viewport-section">
          <motion.div className="stage-content-card">
            <div className="stage-tag-badge">
              <span className="stage-num">06</span> // 15,000 CAREER TOWERS
            </div>
            <h2 className="stage-main-title">CAREER SPECIALIZATIONS</h2>
            <p className="stage-description">
              Traverse 15,000+ occupational nodes with cross-country pay tables, cognitive toughness ratings, and AI resilience indices.
            </p>

            <div className="sample-career-preview-row mt-3">
              <div className="sc-box">
                <span className="sc-cat">Technology</span>
                <strong>Software Engineer</strong>
                <p className="sc-pay text-green">$125,000 / ₹24 LPA</p>
                <Link to="/career/software-engineer" className="sc-link">View Profile & Pay Table →</Link>
              </div>
              <div className="sc-box">
                <span className="sc-cat">Healthcare</span>
                <strong>Sports Physiotherapist</strong>
                <p className="sc-pay text-gold">$95,000 / ₹16 LPA</p>
                <Link to="/career/sports-physiotherapist" className="sc-link">View Profile & Pay Table →</Link>
              </div>
              <div className="sc-box">
                <span className="sc-cat">Skilled Trades</span>
                <strong>Master Carpenter</strong>
                <p className="sc-pay text-cyan">$68,000 / ₹9 LPA</p>
                <Link to="/career/carpenter" className="sc-link">View Profile & Pay Table →</Link>
              </div>
            </div>

            <div className="stage-actions mt-4">
              <Link to="/explore" className="stage-btn-primary">
                Search All 15,000+ Careers <ArrowUpRight size={15} />
              </Link>
              <Link to="/compare" className="stage-btn-secondary">
                Side-by-Side Comparator
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ZONE 7: STUDENT WORKSPACE & APPLICATION KANBAN */}
        <section id="jobs" className="scroll-viewport-section">
          <motion.div className="stage-content-card">
            <div className="stage-tag-badge">
              <span className="stage-num">07</span> // STUDENT WORKSPACE & KANBAN
            </div>
            <h2 className="stage-main-title">CAREER OPS & TRACKER</h2>
            <p className="stage-description">
              Professional student CV builder, CV-to-job matching, and 8-stage Application Kanban.
            </p>

            {/* Mini Kanban View */}
            <div className="mini-kanban-row mt-3">
              {['Saved', 'Preparing', 'Applied', 'Interview', 'Offer'].map(stage => {
                const appsInStage = kanbanApps.filter(a => a.stage === stage);
                return (
                  <div key={stage} className="mk-col">
                    <div className="mk-header">
                      <span>{stage}</span>
                      <span className="mk-count">{appsInStage.length}</span>
                    </div>
                    {appsInStage.map(app => (
                      <div key={app.id} className="mk-card">
                        <strong>{app.position.split('—')[0]}</strong>
                        <p>{app.company}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="stage-actions mt-3">
              <Link to="/workspace" className="stage-btn-primary">
                Open Full Student Workspace & ATS Resume Builder →
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ZONE 8: COMPLETE SPORTS ECOSYSTEM */}
        <section id="sports" className="scroll-viewport-section">
          <motion.div className="stage-content-card">
            <div className="stage-tag-badge">
              <span className="stage-num">08</span> // 35+ SPORTS PROFESSIONS
            </div>
            <h2 className="stage-main-title">THE SPORTS ECOSYSTEM</h2>
            <p className="stage-description">
              Explore full economic pathways: Athletes, Coaches, S&C Specialists, Sports Doctors, Data Analysts, and Agents across 25+ disciplines.
            </p>

            <div className="sports-roles-horizontal-list mt-3">
              {sportsRoles.slice(0, 4).map(role => (
                <div
                  key={role.id}
                  className={`sports-role-pill-card ${selectedSportRole.id === role.id ? 'active' : ''}`}
                  onClick={() => setSelectedSportRole(role)}
                >
                  <span className="sr-icon">{role.icon}</span>
                  <div>
                    <strong>{role.title}</strong>
                    <span className="sr-sub">{role.category}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="sport-role-detail-box mt-3">
              <h4 className="text-gold font-bold">{selectedSportRole.icon} {selectedSportRole.title}</h4>
              <p className="text-sm text-secondary">{selectedSportRole.description}</p>
              <div className="d-flex justify-between items-center mt-2 flex-wrap gap-2">
                <span className="text-xs">Entry: <strong>{selectedSportRole.educationReq}</strong></span>
                <span className="text-xs font-mono text-green">Median: <strong>{selectedSportRole.medianSalaryUSD}</strong></span>
              </div>
            </div>

            <div className="stage-actions mt-3">
              <Link to="/explore?family=sports" className="stage-btn-primary">
                Explore All 35+ Sports Careers →
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ZONE 9 & 10: STUDENT REVIEWS & CAREER TWINS */}
        <section id="twins" className="scroll-viewport-section">
          <motion.div className="stage-content-card">
            <div className="stage-tag-badge">
              <span className="stage-num">09 & 10</span> // SECTION 150 VERIFIED TWINS
            </div>
            <h2 className="stage-main-title">VERIFIED CAREER TWINS</h2>
            <p className="stage-description">
              No fabricated testimonials. Real practitioners documenting their actual degrees, salary milestones, surprises, and retrospective advice.
            </p>

            <div className="twins-preview-card mt-3">
              {careerTwinsData.slice(0, 1).map(twin => (
                <div key={twin.id}>
                  <div className="d-flex justify-between items-start">
                    <div>
                      <h4 className="text-gold font-bold">{twin.name}</h4>
                      <p className="text-xs text-muted">{twin.currentTitle} · {twin.location}</p>
                    </div>
                    <span className="badge verified">{twin.verificationBadge}</span>
                  </div>
                  <p className="text-sm mt-2 text-secondary"><strong>Actual Journey:</strong> {twin.actualPath}</p>
                  <p className="text-xs mt-1 text-muted"><strong>Surprise:</strong> "{twin.whatSurprisedThem}"</p>
                </div>
              ))}
            </div>

            <div className="stage-actions mt-3">
              <Link to="/career/software-engineer" className="stage-btn-primary">
                Read All Career Twins & Reviews →
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ZONE 11: 30-QUESTION CAREER DNA ASSESSMENT */}
        <section id="map" className="scroll-viewport-section">
          <motion.div className="stage-content-card">
            <div className="stage-tag-badge">
              <span className="stage-num">11</span> // EXACT 30-QUESTION QUIZ
            </div>
            <h2 className="stage-main-title">CAREER DNA ASSESSMENT</h2>
            <p className="stage-description">
              Answer 30 structured questions to unlock your personal trait radar and recommended pathways.
            </p>

            {!quizCompleted ? (
              <div className="embedded-quiz-box mt-3">
                <div className="d-flex justify-between items-center text-xs text-muted mb-2">
                  <span>Question <strong>{quizStep + 1}</strong> of <strong>30</strong></span>
                  <span>{Math.round(((quizStep + 1) / 30) * 100)}% Complete</span>
                </div>
                <div className="progress-bar-bg mb-3">
                  <div className="progress-bar-fill" style={{ width: `${((quizStep + 1) / 30) * 100}%` }} />
                </div>

                <h4 className="quiz-q-text">{currentQ?.text}</h4>

                <div className="quiz-options-stack mt-3">
                  {quizOptions.map(opt => (
                    <button
                      key={opt.score}
                      className="quiz-opt-btn"
                      onClick={() => handleQuizAnswer(opt.score)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="quiz-completed-box mt-3">
                <h4 className="text-green font-bold flex items-center gap-1">
                  <CheckCircle size={18} /> Assessment Completed!
                </h4>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="68%" data={quizRadarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.12)" />
                      <PolarAngleAxis dataKey="trait" tick={{ fill: '#d8c4aa', fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="You" dataKey="score" stroke="#f0c778" fill="#f0c778" fillOpacity={0.45} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="d-flex justify-between mt-2">
                  <button className="btn-secondary btn-sm" onClick={() => { setQuizStep(0); setQuizAnswers({}); setQuizCompleted(false); }}>
                    <RotateCcw size={14} /> Retake
                  </button>
                  <Link to="/quiz" className="btn-primary btn-sm">
                    Open Full Career Map & Recommendations →
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* ZONE 12: FUTURE AI & HIGH-YIELD COMBOS */}
        <section id="future" className="scroll-viewport-section">
          <motion.div className="stage-content-card">
            <div className="stage-tag-badge">
              <span className="stage-num">12</span> // HORIZON 2035 & SKILL MULTIPLIERS
            </div>
            <h2 className="stage-main-title">HIGH-YIELD COMBOS & AI</h2>
            <p className="stage-description">
              Stack complementary domain skills for 2x–5x salary multipliers and near-zero AI vulnerability.
            </p>

            <div className="combos-preview-grid mt-3">
              {salaryCombos.slice(0, 2).map(combo => (
                <div key={combo.id} className="combo-mini-box">
                  <div className="d-flex justify-between items-center">
                    <strong className="text-gold">{combo.title}</strong>
                    <span className="combo-multiplier-pill">{combo.comboMultiplier}</span>
                  </div>
                  <p className="text-xs text-secondary mt-1">{combo.synergyRationale}</p>
                  <span className="text-xs font-mono text-green mt-2 block">Target: {combo.targetSalaryUSD}</span>
                </div>
              ))}
            </div>

            <div className="stage-actions mt-4">
              <Link to="/combos" className="stage-btn-primary">
                Explore All Skill Combos <Zap size={15} />
              </Link>
              <Link to="/layoffs" className="stage-btn-secondary">
                Inspect AI Layoff Risk Audit <TrendingDown size={15} />
              </Link>
            </div>
          </motion.div>
        </section>

      </div>

      {/* Floating Scroll Indicator */}
      {scrollProgress < 0.05 && (
        <div className="scroll-indicator-prompt" onClick={() => scrollToSection('streams')}>
          <span>Scroll through the 12 Architectural Zones of Career City</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      )}
    </div>
  );
}

function ArrowDown({ size = 16 }) {
  return <ChevronDown size={size} />;
}
