import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Bookmark, Share2, MessageSquare, Clock, CheckCircle2, 
  TrendingUp, Cpu, Briefcase, ChevronRight, AlertTriangle, ShieldCheck, 
  GraduationCap, DollarSign, Activity, Play, HelpCircle, Layers, Check
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { getEnrichedCareer } from '../data/careers';
import { careerTwinsData, getTwinsForCareer } from '../data/careerTwins';
import { getPlacementReportsForCareer } from '../data/placementReports';
import '../styles/career-profile.css';

export default function CareerProfile() {
  const { careerId } = useParams();
  const [career, setCareer] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionSent, setCorrectionSent] = useState(false);
  const [testerCompleted, setTesterCompleted] = useState(false);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(1500000); // 15 Lakhs default
  const [loanTenureYears, setLoanTenureYears] = useState(7);
  const [interestRate, setInterestRate] = useState(9.5);

  useEffect(() => {
    const foundCareer = getEnrichedCareer(careerId);
    setCareer(foundCareer);
    window.scrollTo(0, 0);
  }, [careerId]);

  if (!career) {
    return (
      <div className="career-profile not-found">
        <Navbar />
        <div className="not-found-content">
          <h2>Career Not Found</h2>
          <Link to="/explore" className="btn-primary">Back to Explore</Link>
        </div>
      </div>
    );
  }

  const twins = getTwinsForCareer(career.id, career.name);
  const linkedColleges = getPlacementReportsForCareer(career.id);

  // Calculate EMI
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = loanTenureYears * 12;
  const emi = Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1));
  const estimatedMonthlySalaryINR = Math.round((career.salary?.byCountry?.IN?.entry?.[0] || 600000) / 12);
  const emiToIncomeRatio = Math.round((emi / estimatedMonthlySalaryINR) * 100);

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'twins', label: 'Career Twins (Real Stories)' },
    { id: 'toughness', label: 'Toughness & Work-Done' },
    { id: 'placements', label: 'College Placements' },
    { id: 'tester', label: 'Micro-Exposure Simulation' },
    { id: 'finance', label: 'Financial & EMI Audit' },
    { id: 'ai-impact', label: 'AI Impact & Resilience' },
    { id: 'accuracy', label: 'Practitioner Verification' }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="career-profile">
      <Navbar />
      
      {/* Hero Header */}
      <header className="profile-header">
        <div className="header-container">
          <Link to="/explore" className="back-link">
            <ArrowLeft size={16} /> Back to Explore
          </Link>
          
          <div className="header-main">
            <div className="header-title-area">
              <div className="badges-row">
                <span className="badge category">{career.family}</span>
                <span className="badge code">ONET: {career.onetCode || '15-1252.00'}</span>
                <span className="badge isco">ISCO: {career.iscoCode || '2512'}</span>
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
                <button className="btn-primary" onClick={() => setShowCorrectionModal(true)}>
                  <CheckCircle2 size={16} /> I Work in This Field
                </button>
              </div>
            </div>
          </div>
          
          <div className="quick-metrics">
            <div className="q-metric">
              <DollarSign size={20} className="qm-icon text-green" />
              <div>
                <p className="qm-label">Entry / Mid Salary (USD)</p>
                <p className="qm-value">${((career.salary?.entry?.max || 75000) / 1000).toFixed(0)}k – ${((career.salary?.mid?.max || 130000) / 1000).toFixed(0)}k</p>
              </div>
            </div>
            
            <div className="q-metric">
              <TrendingUp size={20} className="qm-icon text-cyan" />
              <div>
                <p className="qm-label">India Median CTC</p>
                <p className="qm-value">₹{((career.salary?.byCountry?.IN?.entry?.[0] || 600000)/100000).toFixed(1)} – ₹{((career.salary?.byCountry?.IN?.mid?.[1] || 2500000)/100000).toFixed(1)} LPA</p>
              </div>
            </div>
            
            <div className="q-metric">
              <GraduationCap size={20} className="qm-icon text-purple" />
              <div>
                <p className="qm-label">Education Duration</p>
                <p className="qm-value">{career.education?.duration?.typical || 4} Years Typical</p>
              </div>
            </div>
            
            <div className="q-metric">
              <Cpu size={20} className="qm-icon text-gold" />
              <div>
                <p className="qm-label">AI Resilience</p>
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

      {/* Main Content Layout */}
      <main className="profile-content">
        <div className="content-container">
          
          {/* SECTION: Overview */}
          <section id="overview" className="profile-section">
            <h2 className="section-heading">Overview & Core Purpose</h2>
            <p className="lead-text">{career.description}</p>
            
            <div className="grid-2-col mt-4">
              <div className="info-box">
                <h4 className="info-box-title">✅ Who Should Choose This</h4>
                <ul className="bullet-list">
                  {career.whoShouldChoose?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="info-box">
                <h4 className="info-box-title">⚠️ Who Should Avoid This</h4>
                <ul className="bullet-list">
                  {career.whoShouldNot?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 150: Career Twins (Real Verified Stories) */}
          <section id="twins" className="profile-section">
            <div className="section-badge">Section 150 Master Standard</div>
            <h2 className="section-heading">Verified Human Stories — Career Twins</h2>
            <p className="section-subtext">
              Real professionals, unvarnished career paths, surprises, and retrospective lessons.
            </p>

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
                <p>No verified Career Twins yet for this specific profile.</p>
                <button className="btn-secondary mt-3" onClick={() => setShowCorrectionModal(true)}>
                  Share Your Story as a Practitioner
                </button>
              </div>
            )}
          </section>

          {/* SECTION: Toughness & Salary for Work Done */}
          <section id="toughness" className="profile-section">
            <h2 className="section-heading">Toughness Index & Salary-for-Work-Done Analysis</h2>
            
            <div className="toughness-metrics-grid">
              <div className="tough-card">
                <span className="tough-label">Cognitive & Math Load</span>
                <span className="tough-num">{career.difficulty?.mathematics || 6} / 10</span>
                <p className="tough-desc">Discrete math, system abstractions, and logical proofs</p>
              </div>
              <div className="tough-card">
                <span className="tough-label">Problem Solving Intensity</span>
                <span className="tough-num">{career.difficulty?.problemSolving || 8.5} / 10</span>
                <p className="tough-desc">Novel debugging and algorithmic decomposition</p>
              </div>
              <div className="tough-card">
                <span className="tough-label">Physical & Travel Load</span>
                <span className="tough-num">{career.difficulty?.practical || 3} / 10</span>
                <p className="tough-desc">Ergonomic desk-bound vs field agility requirements</p>
              </div>
              <div className="tough-card">
                <span className="tough-label">Barrier to Entry</span>
                <span className="tough-num">{career.difficulty?.competition || 7} / 10</span>
                <p className="tough-desc">Competition ratio and interview screening rigor</p>
              </div>
            </div>

            <div className="work-done-callout mt-4">
              <h4 className="card-subheading">⚖️ Real Hourly Pay & Effort-to-Reward Ratio</h4>
              <p>
                For a standard 42-hour work week, this career yields an estimated <strong>$48 – $95/hour net</strong> in mid career. Unlike investment banking or surgical residency (which require 70-90 hour weeks), software and data architecture offer an exceptionally high <strong>Effort-to-Reward ratio (8.8/10)</strong>.
              </p>
            </div>
          </section>

          {/* SECTION: College Placements */}
          <section id="placements" className="profile-section">
            <div className="d-flex justify-between items-center mb-3">
              <h2 className="section-heading">College Recruitment Pipelines</h2>
              <Link to="/placements" className="text-cyan text-sm flex items-center gap-1">
                View All College Placement Reports <ChevronRight size={14} />
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
                        <span className="cs-label">Avg CTC:</span>
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
                <div className="college-summary-card">
                  <h4 className="college-card-name">Premier Institutes (IITs, NITs, BITS, Global)</h4>
                  <p className="college-card-loc">Campus drives with 90%+ placement rates in technical departments.</p>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 154: Micro-Exposure Marketplace Simulation */}
          <section id="tester" className="profile-section">
            <div className="section-badge">Section 154 Micro-Exposure</div>
            <h2 className="section-heading">Career Tester: Realistic Miniature Task</h2>
            <p className="section-subtext">
              Try a realistic micro-problem from this profession to test your intrinsic interest before committing.
            </p>

            <div className="tester-box">
              <div className="tester-header">
                <Play size={20} className="text-cyan" />
                <div>
                  <h4 className="tester-title">Simulation Scenario: Concurrent Concurrency Race Condition</h4>
                  <p className="tester-instruction">
                    A multi-threaded payment gateway is occasionally double-charging users during high-load flash sales. Review the architectural scenario below:
                  </p>
                </div>
              </div>

              <div className="code-snippet-box">
                <code>
                  {`// Vulnerable Transaction Pattern
async function processDebit(userId, amount) {
  const balance = await db.getBalance(userId);
  if (balance >= amount) {
    // Latency window creates race condition under concurrent requests
    await externalPaymentGateway.charge(userId, amount);
    await db.setBalance(userId, balance - amount);
  }
}`}
                </code>
              </div>

              {!testerCompleted ? (
                <div className="tester-options">
                  <p className="font-semibold text-white mb-2">What is the correct architectural remediation?</p>
                  <button className="tester-opt-btn" onClick={() => setTesterCompleted(true)}>
                    A) Wrap balance check & deduction in an atomic database transaction with row-level locking (SELECT FOR UPDATE) or idempotent transaction keys.
                  </button>
                  <button className="tester-opt-btn" onClick={() => alert('Incorrect. Increasing server memory does not resolve concurrent race conditions.')}>
                    B) Increase the server CPU and RAM to make the asynchronous operation faster.
                  </button>
                </div>
              ) : (
                <div className="tester-success-box">
                  <CheckCircle2 size={24} className="text-green" />
                  <div>
                    <h5 className="font-bold text-green">Correct Solution!</h5>
                    <p className="text-sm text-gray-300">
                      Atomic row locking and idempotent keys prevent duplicate processing. If you enjoyed thinking through this concurrency puzzle, systems engineering will feel deeply rewarding to you.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 155: Financial Literacy & EMI Calculator */}
          <section id="finance" className="profile-section">
            <div className="section-badge">Section 155 Financial Layer</div>
            <h2 className="section-heading">Can I Realistically Afford This Career Path?</h2>
            <p className="section-subtext">
              Model student education loans, monthly EMI payback burdens, and compare against entry-level post-tax earnings.
            </p>

            <div className="emi-calculator-grid">
              <div className="emi-inputs-panel">
                <div className="input-group">
                  <label>Total Education Loan (INR): ₹{(loanAmount / 100000).toFixed(1)} Lakhs</label>
                  <input
                    type="range"
                    min="200000"
                    max="5000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                  />
                </div>

                <div className="input-group">
                  <label>Loan Repayment Tenure: {loanTenureYears} Years</label>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="1"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  />
                </div>

                <div className="input-group">
                  <label>Interest Rate (% p.a.): {interestRate}%</label>
                  <input
                    type="range"
                    min="7.5"
                    max="14.0"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="emi-results-panel">
                <div className="emi-stat-box">
                  <span className="emi-label">Estimated Monthly EMI</span>
                  <span className="emi-number text-gold">₹{emi.toLocaleString()} / mo</span>
                </div>

                <div className="emi-stat-box mt-3">
                  <span className="emi-label">Estimated Entry Monthly Take-home</span>
                  <span className="emi-number text-green">₹{estimatedMonthlySalaryINR.toLocaleString()} / mo</span>
                </div>

                <div className="emi-ratio-gauge mt-3">
                  <span className="gauge-label">EMI-to-Income Ratio: <strong>{emiToIncomeRatio}%</strong></span>
                  <div className="ratio-bar">
                    <div
                      className="ratio-bar-fill"
                      style={{
                        width: `${Math.min(100, emiToIncomeRatio)}%`,
                        background: emiToIncomeRatio > 40 ? '#ff4466' : '#00ff88'
                      }}
                    />
                  </div>
                  <p className="ratio-verdict mt-2">
                    {emiToIncomeRatio <= 30
                      ? '✅ Healthy & Safe: Education debt is comfortably manageable on entry compensation.'
                      : '⚠️ Moderate to High: Requires budgeting discipline or exploring subsidized scholarship options.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: AI Impact */}
          <section id="ai-impact" className="profile-section">
            <h2 className="section-heading">AI Impact, Task Automation & 5-Year Resilience</h2>
            <div className="ai-breakdown-grid">
              <div className="ai-card">
                <span className="ai-metric-label">Automation Exposure</span>
                <span className="ai-metric-val text-gold">{(career.aiImpact?.automationExposure || 3.5).toFixed(1)} / 10</span>
                <p className="ai-desc">Percentage of routine repetitive tasks delegable to LLMs and agents.</p>
              </div>

              <div className="ai-card">
                <span className="ai-metric-label">Augmentation Multiplier</span>
                <span className="ai-metric-val text-cyan">{(career.aiImpact?.augmentationPotential || 9.2).toFixed(1)} / 10</span>
                <p className="ai-desc">Productivity leverage gained by a skilled human operator wielding AI tools.</p>
              </div>
            </div>

            <div className="tasks-impact-grid mt-4">
              <div className="task-col">
                <h4 className="task-title text-red">Automated / Compressed Tasks</h4>
                <ul className="task-list">
                  {career.aiImpact?.tasksAutomated?.map((t, idx) => (
                    <li key={idx}>⚠️ {t}</li>
                  ))}
                </ul>
              </div>

              <div className="task-col">
                <h4 className="task-title text-green">Core Human Value Vector</h4>
                <ul className="task-list">
                  {career.aiImpact?.tasksAugmented?.map((t, idx) => (
                    <li key={idx}>🛡️ {t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 151: Crowdsourced Accuracy Loop */}
          <section id="accuracy" className="profile-section">
            <div className="section-badge">Section 151 Verification Loop</div>
            <div className="practitioner-cta-card">
              <ShieldCheck size={32} className="text-cyan" />
              <div>
                <h3 className="card-subheading text-white">Practitioner Accuracy & Crowdsourced Review</h3>
                <p className="text-sm text-gray-300">
                  Are you a practicing professional in this field? Help maintain the highest standard of labor market accuracy by suggesting corrections or reporting shifting industry requirements.
                </p>
                <button className="btn-primary mt-3" onClick={() => setShowCorrectionModal(true)}>
                  Submit Correction or Update
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Suggest Correction Modal */}
      {showCorrectionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>I Work in This Field — Suggest Correction</h3>
            <p className="modal-sub">Submitted updates enter the Practitioner Review Queue for validation.</p>
            
            {!correctionSent ? (
              <form onSubmit={(e) => { e.preventDefault(); setCorrectionSent(true); }}>
                <div className="form-group">
                  <label>Your Role & Professional Background</label>
                  <input type="text" placeholder="e.g. Senior Backend Engineer @ Stripe (7 yrs)" required />
                </div>
                <div className="form-group">
                  <label>Field to Correct</label>
                  <select>
                    <option>Salary & Compensation Data</option>
                    <option>Education / Degree Prerequisites</option>
                    <option>Day-to-Day Tasks</option>
                    <option>AI Impact & Automation Score</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Correction & Evidence</label>
                  <textarea rows={4} placeholder="Describe the inaccurate detail, provide updated numbers, and link credible evidence..." required></textarea>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowCorrectionModal(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">Submit for Review</button>
                </div>
              </form>
            ) : (
              <div className="modal-success">
                <CheckCircle2 size={40} className="text-green mx-auto mb-2" />
                <h4>Correction Submitted to Admin Queue</h4>
                <p>Thank you for keeping Career Atlas accurate and trusted.</p>
                <button className="btn-primary mt-3" onClick={() => { setShowCorrectionModal(false); setCorrectionSent(false); }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
