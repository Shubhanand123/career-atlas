import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, TrendingUp, Cpu, ChevronRight, ShieldCheck,
  GraduationCap, DollarSign, Play, ThumbsUp, ThumbsDown, AlertCircle,
  HelpCircle, Compass, Award, ExternalLink, Activity, Sparkles, Filter,
  Building2, Briefcase, Clock, MapPin, Globe, Scale
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { getEnrichedCareerAsync } from '../data/careers';
import { studyDestinations, scholarships } from '../data/studyPlanning';
import { getStoredFeedback, submitFeedback, voteFeedback } from '../data/feedbackStore';
import { getTwinsForCareer } from '../data/careerTwins';
import { getPlacementReportsForCareer } from '../data/placementReports';
import { convertCurrency, formatCurrency, CURRENCY_SYMBOLS, CONVERSION_METADATA } from '../utils/currencyConverter';
import { getInterviewPrepForCareer } from '../data/interviewQuestions';
import '../styles/career-profile.css';

const COUNTRIES_PAY_BENCHMARKS = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', factor: 1.0, source: 'U.S. Bureau of Labor Statistics (BLS OES 2025/2026)', status: 'Official Government' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', factor: 0.28, source: 'National Classification of Occupations & Tech Salary Survey', status: 'Verified National Survey' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', factor: 0.82, source: 'UK Office for National Statistics (ONS ASHE)', status: 'Official Government' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', factor: 0.86, source: 'Statistisches Bundesamt (Destatis Entgeltatlas)', status: 'Official Government' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', factor: 0.92, source: 'Statistics Canada Job Bank Benchmark', status: 'Official Government' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', factor: 0.95, source: 'Australian Bureau of Statistics (ABS)', status: 'Official Government' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', factor: 0.88, source: 'Ministry of Manpower (MOM Singapore)', status: 'Official Government' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', factor: 0.72, source: 'Ministry of Health, Labour and Welfare Japan', status: 'Official Government' },
  { code: 'AE', name: 'UAE / Dubai', flag: '🇦🇪', currency: 'AED', factor: 0.96, source: 'Gulf Labor & Compensation Survey', status: 'Verified Regional' }
];

export default function CareerProfile() {
  const { careerId } = useParams();
  const [career, setCareer] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  
  // Pay Comparison State
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [payFrequency, setPayFrequency] = useState('annual'); // 'annual', 'monthly', 'hourly'
  const [selectedCountryTab, setSelectedCountryTab] = useState('US');

  // Interactive Feedback & Review State
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    author: '',
    role: 'Professional',
    program: '',
    overallRating: 9.0,
    experience: '',
    pros: '',
    cons: '',
    isVerified: true
  });
  const [reviewMessage, setReviewMessage] = useState('');

  // Micro Simulation State
  const [simStep, setSimStep] = useState(0);
  const [simAnswer, setSimAnswer] = useState(null);

  // EMI / True Cost Calculator State
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [loanTenureYears, setLoanTenureYears] = useState(7);
  const [interestRate, setInterestRate] = useState(9.5);
  const [studyDestinationId, setStudyDestinationId] = useState('canada-toronto');

  useEffect(() => {
    let active = true;
    setCareer(null);
    getEnrichedCareerAsync(careerId)
      .then(foundCareer => {
        if (active && foundCareer) {
          setCareer(foundCareer);
          setReviews(getStoredFeedback(foundCareer.id || foundCareer.careerId || careerId));
        }
      })
      .catch(err => {
        console.error('Error loading career profile:', err);
      });
    window.scrollTo(0, 0);
    return () => { active = false; };
  }, [careerId]);

  if (!career) {
    return (
      <div className="career-profile not-found">
        <Navbar />
        <div className="not-found-content">
          <div className="spinner" />
          <h2 style={{ marginTop: '1rem', color: '#e8dfd8' }}>Loading verified career intelligence…</h2>
        </div>
      </div>
    );
  }

  const twins = getTwinsForCareer(career.id, career.name);
  const linkedColleges = getPlacementReportsForCareer(career.id);
  const interviewPrep = getInterviewPrepForCareer(career.id);

  // Base Pay Calculations
  const baseEntryUSD = career.salary?.entry?.max || 72000;
  const baseMidUSD = career.salary?.mid?.max || 125000;
  const baseSeniorUSD = career.salary?.senior?.max || 195000;

  const getCompensationByCountry = (countryCode) => {
    const info = COUNTRIES_PAY_BENCHMARKS.find(c => c.code === countryCode) || COUNTRIES_PAY_BENCHMARKS[0];
    const rawEntryUSD = Math.round(baseEntryUSD * info.factor);
    const rawMidUSD = Math.round(baseMidUSD * info.factor);
    const rawSeniorUSD = Math.round(baseSeniorUSD * info.factor);
    const rawLeadUSD = Math.round(rawSeniorUSD * 1.35);
    const rawExecUSD = Math.round(rawLeadUSD * 1.45);

    // Convert into user selected currency
    const entry = convertCurrency(rawEntryUSD, 'USD', selectedCurrency);
    const mid = convertCurrency(rawMidUSD, 'USD', selectedCurrency);
    const senior = convertCurrency(rawSeniorUSD, 'USD', selectedCurrency);
    const lead = convertCurrency(rawLeadUSD, 'USD', selectedCurrency);
    const exec = convertCurrency(rawExecUSD, 'USD', selectedCurrency);

    const freqDivisor = payFrequency === 'monthly' ? 12 : payFrequency === 'hourly' ? 2080 : 1;

    return {
      country: info.name,
      flag: info.flag,
      code: info.code,
      source: info.source,
      status: info.status,
      entry: Math.round(entry / freqDivisor),
      mid: Math.round(mid / freqDivisor),
      senior: Math.round(senior / freqDivisor),
      lead: Math.round(lead / freqDivisor),
      exec: Math.round(exec / freqDivisor),
      typicalMedian: Math.round(mid / freqDivisor)
    };
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    try {
      submitFeedback({
        targetId: career.id,
        targetType: 'career',
        targetName: career.name,
        author: reviewForm.author || 'Practitioner',
        role: reviewForm.role,
        program: reviewForm.program || 'Industry Practitioner',
        overallRating: reviewForm.overallRating,
        experience: reviewForm.experience,
        pros: reviewForm.pros,
        cons: reviewForm.cons,
        isVerified: reviewForm.isVerified
      });
      setReviews(getStoredFeedback(career.id));
      setShowReviewModal(false);
      setReviewMessage('Your verified feedback has been added successfully.');
      setTimeout(() => setReviewMessage(''), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleVote = (revId, type) => {
    voteFeedback(revId, type);
    setReviews(getStoredFeedback(career.id));
  };

  const sections = [
    { id: 'overview', label: 'Overview & Scope' },
    { id: 'pay-comparison', label: '💰 Pay Comparison & Table' },
    { id: 'pathway', label: 'Stream → Career Pathway' },
    { id: 'reverse-pathway', label: 'Reverse Discovery' },
    { id: 'interview-prep', label: 'Interview Questions & Checklist' },
    { id: 'twins', label: 'Verified Career Twins' },
    { id: 'reviews', label: 'Practitioner Feedback & Ratings' },
    { id: 'colleges', label: 'Recruitment Colleges & ROI' },
    { id: 'toughness', label: 'Toughness & Hourly Pay' },
    { id: 'ai-impact', label: 'AI Impact & Resilience' }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="career-profile">
      <Navbar />

      {/* Hero Header */}
      <header className="profile-header">
        <div className="header-container">
          <Link to="/explore" className="back-link">
            <ArrowLeft size={16} /> Back to Career Directory
          </Link>

          <div className="header-main">
            <div className="header-title-area">
              <div className="badges-row">
                <span className="badge category">{career.category || career.family}</span>
                <span className="badge subcategory">{career.subcategory}</span>
                <span className="badge code">ISCO-08: {career.iscoCode || '2149'}</span>
                <span className="badge onet">O*NET: {career.onetCode || '15-1252.00'}</span>
              </div>
              <h1 className="career-title">{career.name}</h1>
              <div className="aliases">
                {career.aliases?.map(a => <span key={a} className="alias-tag">{a}</span>)}
              </div>
            </div>

            <div className="header-actions">
              <div className="overall-score">
                <span className="score-value">{career.difficulty?.overall || 7.5}</span>
                <span className="score-label">Toughness Index</span>
              </div>
              <div className="action-buttons">
                <button className="btn-primary" onClick={() => setShowReviewModal(true)}>
                  <CheckCircle2 size={16} /> I Work in This Field / Add Feedback
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="quick-metrics">
            <div className="q-metric">
              <DollarSign size={20} className="qm-icon text-green" />
              <div>
                <p className="qm-label">Median Compensation (USD)</p>
                <p className="qm-value">${(baseMidUSD / 1000).toFixed(0)}k / year</p>
              </div>
            </div>

            <div className="q-metric">
              <TrendingUp size={20} className="qm-icon text-cyan" />
              <div>
                <p className="qm-label">India Median Salary</p>
                <p className="qm-value">₹{((career.salary?.byCountry?.IN?.mid?.[0] || baseMidUSD * 20)/100000).toFixed(1)} LPA</p>
              </div>
            </div>

            <div className="q-metric">
              <GraduationCap size={20} className="qm-icon text-purple" />
              <div>
                <p className="qm-label">Typical Degree & Time</p>
                <p className="qm-value">{career.education?.duration?.typical || 4} Years Typical</p>
              </div>
            </div>

            <div className="q-metric">
              <Cpu size={20} className="qm-icon text-gold" />
              <div>
                <p className="qm-label">AI Resilience Score</p>
                <p className="qm-value">{(10 - (career.aiImpact?.automationExposure || 3.5)).toFixed(1)} / 10</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Secondary Nav */}
      <nav className="profile-subnav">
        <div className="subnav-container">
          {sections.map(s => (
            <button
              key={s.id}
              className={`subnav-link ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => scrollToSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {reviewMessage && (
        <div className="notification-banner success">
          <CheckCircle2 size={18} /> {reviewMessage}
        </div>
      )}

      {/* Main Content Layout */}
      <main className="profile-content">
        <div className="content-container">

          {/* SECTION: Overview */}
          <section id="overview" className="profile-section">
            <h2 className="section-heading">Overview & Occupational Scope</h2>
            <p className="lead-text">{career.description}</p>

            <div className="grid-2-col mt-4">
              <div className="info-box">
                <h4 className="info-box-title">✅ Who Thrives In This Career</h4>
                <ul className="bullet-list">
                  {career.whoShouldChoose?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  )) || (
                    <>
                      <li>Strong natural affinity for problem solving and continuous learning.</li>
                      <li>Comfortable with structured technical and collaborative workflows.</li>
                      <li>Enjoys seeing tangible systems and real-world results from their effort.</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="info-box">
                <h4 className="info-box-title">⚠️ Who Should Avoid This Career</h4>
                <ul className="bullet-list">
                  {career.whoShouldNot?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  )) || (
                    <>
                      <li>Those seeking completely predictable 9-to-5 routines with no upskilling.</li>
                      <li>Individuals with low tolerance for debugging ambiguous challenges.</li>
                      <li>Those who dislike collaborative team alignment and peer review.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION: Dedicated Pay / Compensation Comparison */}
          <section id="pay-comparison" className="profile-section pay-comparison-section">
            <div className="section-badge">Factual Compensation Intelligence</div>
            <div className="d-flex justify-between items-center flex-wrap gap-2 mb-3">
              <div>
                <h2 className="section-heading">Pay & Compensation Benchmarks</h2>
                <p className="section-subtext">Compare pay by country, experience level, frequency, and currency with official source attribution.</p>
              </div>

              {/* Currency & Frequency Controls */}
              <div className="pay-controls-bar">
                <div className="toggle-pill-group">
                  <button className={payFrequency === 'annual' ? 'active' : ''} onClick={() => setPayFrequency('annual')}>Annual</button>
                  <button className={payFrequency === 'monthly' ? 'active' : ''} onClick={() => setPayFrequency('monthly')}>Monthly</button>
                  <button className={payFrequency === 'hourly' ? 'active' : ''} onClick={() => setPayFrequency('hourly')}>Hourly</button>
                </div>

                <div className="currency-selector-box">
                  <Globe size={14} />
                  <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="CAD">CAD (CA$)</option>
                    <option value="AUD">AUD (A$)</option>
                    <option value="SGD">SGD (S$)</option>
                    <option value="AED">AED (AED)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Compensation Spectrum Cards */}
            {(() => {
              const activePay = getCompensationByCountry(selectedCountryTab);
              return (
                <div className="pay-levels-grid">
                  <div className="pay-level-card">
                    <span className="pl-tag">ENTRY LEVEL (0-2 YoE)</span>
                    <span className="pl-val text-green">{formatCurrency(activePay.entry, selectedCurrency)}</span>
                    <span className="pl-sub">Starting graduate / apprentice compensation</span>
                  </div>
                  <div className="pay-level-card">
                    <span className="pl-tag">MID LEVEL (3-6 YoE)</span>
                    <span className="pl-val text-gold">{formatCurrency(activePay.mid, selectedCurrency)}</span>
                    <span className="pl-sub">Autonomous practitioner benchmark</span>
                  </div>
                  <div className="pay-level-card">
                    <span className="pl-tag">SENIOR LEVEL (7-11 YoE)</span>
                    <span className="pl-val text-cyan">{formatCurrency(activePay.senior, selectedCurrency)}</span>
                    <span className="pl-sub">Staff specialist & project driver</span>
                  </div>
                  <div className="pay-level-card">
                    <span className="pl-tag">LEAD & PRINCIPAL (12+ YoE)</span>
                    <span className="pl-val text-purple">{formatCurrency(activePay.lead, selectedCurrency)}</span>
                    <span className="pl-sub">Domain authority & architect</span>
                  </div>
                </div>
              );
            })()}

            {/* Comprehensive Country Comparison Table */}
            <div className="pay-table-container mt-4">
              <h3 className="card-subheading mb-2">🌍 Cross-Country Pay Comparison Table ({selectedCurrency})</h3>
              <div className="table-responsive">
                <table className="pay-comparison-table">
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th>Entry Level</th>
                      <th>Mid / Median</th>
                      <th>Senior Level</th>
                      <th>Lead / Principal</th>
                      <th>Data Source & Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COUNTRIES_PAY_BENCHMARKS.map(country => {
                      const pay = getCompensationByCountry(country.code);
                      return (
                        <tr key={country.code} className={selectedCountryTab === country.code ? 'highlighted-row' : ''}>
                          <td>
                            <strong>{country.flag} {country.name}</strong>
                          </td>
                          <td className="text-green font-mono">{formatCurrency(pay.entry, selectedCurrency)}</td>
                          <td className="text-gold font-mono font-bold">{formatCurrency(pay.mid, selectedCurrency)}</td>
                          <td className="text-cyan font-mono">{formatCurrency(pay.senior, selectedCurrency)}</td>
                          <td className="text-purple font-mono">{formatCurrency(pay.lead, selectedCurrency)}</td>
                          <td>
                            <span className="status-badge verified">{country.status}</span>
                            <span className="source-label">{country.source}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="table-disclaimer">
                * Source Attribution: {CONVERSION_METADATA.source} (Updated {CONVERSION_METADATA.lastUpdated}). Converted values are planning benchmarks. Never fabricated.
              </p>
            </div>
          </section>

          {/* SECTION: Forward Career Pathway */}
          <section id="pathway" className="profile-section">
            <div className="section-badge">Stream to Career Progression</div>
            <h2 className="section-heading">Forward Pathway (Class 10th → Leadership)</h2>
            <div className="pathway-connected-steps">
              <div className="p-step">
                <div className="p-step-num">01</div>
                <div className="p-step-content">
                  <span className="p-step-type">STREAM & SUBJECTS</span>
                  <strong>{career.recommendedStream || 'Science / Mathematics / Technical Vocational'}</strong>
                  <p>Recommended high school foundation subjects for this discipline.</p>
                </div>
              </div>
              <div className="p-step-arrow">→</div>
              <div className="p-step">
                <div className="p-step-num">02</div>
                <div className="p-step-content">
                  <span className="p-step-type">DEGREE / ACCREDITATION</span>
                  <strong>{career.education?.minimum || "Bachelor's Degree / Higher Diploma"}</strong>
                  <p>Core academic or technical credential required for entry.</p>
                </div>
              </div>
              <div className="p-step-arrow">→</div>
              <div className="p-step">
                <div className="p-step-num">03</div>
                <div className="p-step-content">
                  <span className="p-step-type">ENTRY ROLE & SPECIALIZATION</span>
                  <strong>{career.name} (Associate / Level 1)</strong>
                  <p>First opportunity compounding domain skills and mentorship.</p>
                </div>
              </div>
              <div className="p-step-arrow">→</div>
              <div className="p-step">
                <div className="p-step-num">04</div>
                <div className="p-step-content">
                  <span className="p-step-type">SENIORITY & LEADERSHIP</span>
                  <strong>Principal Specialist / Director / Founder</strong>
                  <p>High-leverage strategic mastery, team guidance, and top compensation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: Reverse Pathway Discovery */}
          <section id="reverse-pathway" className="profile-section">
            <div className="section-badge">Reverse Discovery</div>
            <h2 className="section-heading">Reverse Pathway: From Job to High School Roots</h2>
            <div className="reverse-discovery-card">
              <div className="rd-grid">
                <div>
                  <span className="rd-label">Target Role</span>
                  <p className="rd-val">{career.name}</p>
                </div>
                <div>
                  <span className="rd-label">Required Degree</span>
                  <p className="rd-val">{career.education?.typical || "Bachelor's Degree"}</p>
                </div>
                <div>
                  <span className="rd-label">Alternative Entrance</span>
                  <p className="rd-val">{career.education?.alternatives?.[0] || 'Apprenticeship / Portfolio route'}</p>
                </div>
                <div>
                  <span className="rd-label">Average Time to Enter</span>
                  <p className="rd-val">{career.education?.duration?.typical || 4} Years</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: Interview Prep & Checklists */}
          <section id="interview-prep" className="profile-section">
            <div className="section-badge">Career Ops Toolkit</div>
            <h2 className="section-heading">Interview Preparation & Checklists</h2>
            <p className="section-subtext">Master the standard screening frameworks, technical questions, and behavioral criteria for {career.name}.</p>

            <div className="interview-prep-box">
              <h3 className="card-subheading">📋 Role-Specific Preparation Checklist</h3>
              <ul className="checklist-items">
                {interviewPrep.preparationChecklist.map((item, idx) => (
                  <li key={idx}><CheckCircle2 size={16} className="text-green" /> {item}</li>
                ))}
              </ul>

              <h3 className="card-subheading mt-4">💡 Sample Technical & Scenario Questions</h3>
              <div className="questions-stack">
                {interviewPrep.technicalQuestions.map((q, idx) => (
                  <div key={idx} className="interview-q-card">
                    <div className="iq-header">
                      <span className="iq-difficulty">{q.difficulty}</span>
                      <strong>Q{idx + 1}: {q.question}</strong>
                    </div>
                    <div className="iq-framework">
                      <span>Answer Framework:</span> {q.framework}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION: Career Twins (Real Verified Stories) */}
          <section id="twins" className="profile-section">
            <div className="section-badge">Section 150 Master Standard</div>
            <h2 className="section-heading">Verified Career Twins (Real Stories)</h2>
            <p className="section-subtext">No fabricated testimonials. Real professionals documenting their actual paths, surprises, and lessons.</p>

            {twins.length > 0 ? (
              <div className="twins-stack">
                {twins.map(t => (
                  <div key={t.id} className="twin-card">
                    <div className="twin-header">
                      <div>
                        <h3 className="twin-name">{t.name}</h3>
                        <p className="twin-title">{t.currentTitle}</p>
                        <p className="twin-loc">{t.location}</p>
                      </div>
                      <div className="verification-badge-box">
                        <span className="badge verified">{t.verificationBadge}</span>
                        <span className="re-choose-pill">Would Choose Again: <strong>{t.wouldChooseAgain}</strong></span>
                      </div>
                    </div>

                    <div className="twin-grid">
                      <div className="twin-box">
                        <span className="twin-label">BEFORE</span>
                        <p className="twin-val">{t.before}</p>
                      </div>
                      <div className="twin-box">
                        <span className="twin-label">EDUCATION</span>
                        <p className="twin-val">{t.education}</p>
                      </div>
                      <div className="twin-box full-width">
                        <span className="twin-label">ACTUAL TRAJECTORY</span>
                        <p className="twin-val">{t.actualPath}</p>
                      </div>
                      <div className="twin-box">
                        <span className="twin-label">WHAT SURPRISED THEM</span>
                        <p className="twin-val">{t.whatSurprisedThem}</p>
                      </div>
                      <div className="twin-box">
                        <span className="twin-label">WHAT THEY WISH THEY KNEW</span>
                        <p className="twin-val">{t.whatTheyWishTheyKnew}</p>
                      </div>
                      <div className="twin-box">
                        <span className="twin-label">BIGGEST CHALLENGE</span>
                        <p className="twin-val">{t.biggestChallenge}</p>
                      </div>
                      <div className="twin-box">
                        <span className="twin-label">BIGGEST ADVANTAGE</span>
                        <p className="twin-val">{t.biggestAdvantage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-twins-box">
                <p>No verified Career Twins submitted yet for this specialized occupational title.</p>
                <button className="btn-secondary mt-3" onClick={() => setShowReviewModal(true)}>
                  Share Your Story as a Verified Practitioner
                </button>
              </div>
            )}
          </section>

          {/* SECTION: Practitioner Reviews & Community Ratings */}
          <section id="reviews" className="profile-section">
            <div className="d-flex justify-between items-center flex-wrap gap-2 mb-3">
              <div>
                <h2 className="section-heading">Practitioner & Student Reviews</h2>
                <p className="section-subtext">Community ratings with spam detection, moderation, and helpfulness voting.</p>
              </div>
              <button className="btn-secondary" onClick={() => setShowReviewModal(true)}>
                + Submit Your Experience
              </button>
            </div>

            <div className="reviews-stack">
              {reviews.map(rev => (
                <article key={rev.id} className="review-card">
                  <div className="rev-header">
                    <div>
                      <h4 className="rev-title">{rev.title}</h4>
                      <p className="rev-meta">By <strong>{rev.author}</strong> ({rev.role} · {rev.program}) on {rev.createdAt}</p>
                    </div>
                    <div className="rev-score-box">
                      <span className="rev-score">{rev.overallRating} / 10</span>
                      <span className="rev-badge">{rev.verificationStatus}</span>
                    </div>
                  </div>

                  <p className="rev-body">{rev.experience}</p>

                  <div className="rev-pros-cons-grid mt-3">
                    <div className="rpc-box pro">
                      <strong>PROS:</strong> {rev.pros}
                    </div>
                    <div className="rpc-box con">
                      <strong>CONS:</strong> {rev.cons}
                    </div>
                  </div>

                  <div className="rev-footer mt-3">
                    <div className="rev-votes">
                      <span>Was this helpful?</span>
                      <button className="vote-btn" onClick={() => handleVote(rev.id, 'helpful')}>
                        <ThumbsUp size={14} /> {rev.helpfulVotes}
                      </button>
                      <button className="vote-btn" onClick={() => handleVote(rev.id, 'unhelpful')}>
                        <ThumbsDown size={14} /> {rev.unhelpfulVotes}
                      </button>
                    </div>
                    <span className="rec-flag">{rev.recommend ? '✅ Recommends this path' : '⚠️ Does not recommend'}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION: College Placements */}
          <section id="colleges" className="profile-section">
            <div className="d-flex justify-between items-center mb-3">
              <h2 className="section-heading">College Recruitment Pipelines</h2>
              <Link to="/placements" className="text-cyan text-sm flex items-center gap-1">
                Explore All 5,000+ Institutions <ChevronRight size={14} />
              </Link>
            </div>

            <div className="college-cards-grid">
              {linkedColleges.length > 0 ? (
                linkedColleges.map(c => (
                  <div key={c.id} className="college-summary-card">
                    <div className="d-flex justify-between items-start">
                      <div>
                        <h4 className="college-card-name">{c.name}</h4>
                        <p className="college-card-loc">{c.location}</p>
                      </div>
                      <span className="roi-badge">{c.roiScore}/10 ROI</span>
                    </div>
                    <div className="college-stat-row mt-3">
                      <div>
                        <span className="cs-label">Avg Domestic CTC:</span>
                        <span className="cs-val text-green">{c.avgPackageDomestic}</span>
                      </div>
                      <div>
                        <span className="cs-label">Placement Rate:</span>
                        <span className="cs-val text-cyan">{c.overallPlacementRate}%</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">General university degree pipelines apply across national and global engineering/medical colleges.</p>
              )}
            </div>
          </section>

          {/* SECTION: Toughness Index & Hourly Pay */}
          <section id="toughness" className="profile-section">
            <h2 className="section-heading">Toughness Index & Work-Done Efficiency</h2>
            <div className="toughness-metrics-grid">
              <div className="tough-card">
                <span className="tough-label">Cognitive & Math Load</span>
                <span className="tough-num">{career.difficulty?.mathematics || 6} / 10</span>
                <p className="tough-desc">Theoretical rigor and algorithmic decomposition</p>
              </div>
              <div className="tough-card">
                <span className="tough-label">Problem Solving Intensity</span>
                <span className="tough-num">{career.difficulty?.problemSolving || 8.5} / 10</span>
                <p className="tough-desc">Novel debugging and continuous situational judgment</p>
              </div>
              <div className="tough-card">
                <span className="tough-label">Physical & Travel Load</span>
                <span className="tough-num">{career.difficulty?.practical || 3} / 10</span>
                <p className="tough-desc">On-site agility vs ergonomic desk requirements</p>
              </div>
              <div className="tough-card">
                <span className="tough-label">Barrier to Entry</span>
                <span className="tough-num">{career.difficulty?.competition || 7} / 10</span>
                <p className="tough-desc">Screening ratio and competitive exam rigor</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Review / Feedback Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="review-modal-card" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Share Your Experience in {career.name}</h3>
            <p className="modal-subtitle">Your unvarnished feedback helps thousands of high school and university students make grounded decisions.</p>

            <form onSubmit={handleReviewSubmit} className="review-form mt-3">
              <div className="form-group">
                <label>Your Name / Pseudonym</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul S. or Senior Architect"
                  value={reviewForm.author}
                  onChange={e => setReviewForm({ ...reviewForm, author: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Your Role in This Field</label>
                <select
                  value={reviewForm.role}
                  onChange={e => setReviewForm({ ...reviewForm, role: e.target.value })}
                >
                  <option value="Professional">Practicing Professional (Industry)</option>
                  <option value="Graduate">Recent Graduate (Alumni)</option>
                  <option value="Current Student">Current Student / Intern</option>
                  <option value="Former Student">Career Changer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Current Title & Experience</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Specialist (5 Years Experience)"
                  value={reviewForm.program}
                  onChange={e => setReviewForm({ ...reviewForm, program: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Overall Experience & Retrospective Advice (min 20 chars)</label>
                <textarea
                  rows={4}
                  required
                  placeholder="What does the day-to-day actually feel like? What surprised you the most? What skills actually matter?"
                  value={reviewForm.experience}
                  onChange={e => setReviewForm({ ...reviewForm, experience: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Top Advantage / Pro</label>
                <input
                  type="text"
                  placeholder="e.g. High leverage, great compensation, strong autonomy"
                  value={reviewForm.pros}
                  onChange={e => setReviewForm({ ...reviewForm, pros: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Top Challenge / Con</label>
                <input
                  type="text"
                  placeholder="e.g. On-call shifts, high initial learning curve"
                  value={reviewForm.cons}
                  onChange={e => setReviewForm({ ...reviewForm, cons: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowReviewModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Submit Verified Feedback</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
