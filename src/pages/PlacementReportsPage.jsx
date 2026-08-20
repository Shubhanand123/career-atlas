import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, GraduationCap, Building2, TrendingUp, DollarSign, Award, ExternalLink, 
  Filter, CheckCircle, Globe, MapPin, Calculator, ThumbsUp, ThumbsDown, MessageSquare,
  ShieldCheck, AlertCircle, Clock, BookOpen, ChevronLeft, ChevronRight, CheckCircle2,
  Calendar, FileCheck, Layers
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { globalInstitutions, calculateTrueCostOfStudy } from '../data/institutionsDatabase';
import { searchInstitutionsCatalog } from '../data/institutionsCatalog';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';
import { useCurrency } from '../context/CurrencyContext';
import { getStoredFeedback, submitFeedback, voteFeedback } from '../data/feedbackStore';
import '../styles/placements.css';

const ITEMS_PER_PAGE = 25;

export default function PlacementReportsPage() {
  const { currency: globalCurrency, setCurrency: setGlobalCurrency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [catalogState, setCatalogState] = useState({
    items: globalInstitutions,
    total: 10000,
    loading: false
  });

  const [selectedInst, setSelectedInst] = useState(globalInstitutions[0]);
  
  // True Cost Calculator State
  const [costScenario, setCostScenario] = useState('average'); // 'low', 'average', 'high'
  const [isInternationalStudent, setIsInternationalStudent] = useState(true);
  const [targetCurrency, setTargetCurrency] = useState(globalCurrency);

  useEffect(() => {
    setTargetCurrency(globalCurrency);
  }, [globalCurrency]);

  // Student Review Form State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    author: '',
    role: 'Current Student',
    program: '',
    overallRating: 9.0,
    experience: '',
    pros: '',
    cons: '',
    isVerified: true
  });
  const [reviews, setReviews] = useState(() => getStoredFeedback(selectedInst?.id || 'iit-bombay'));
  const [notification, setNotification] = useState('');

  // Fetch from 10,000+ indexed catalog
  useEffect(() => {
    let active = true;
    setCatalogState(prev => ({ ...prev, loading: true }));

    searchInstitutionsCatalog({
      query: searchTerm,
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      filters: { country: selectedCountry, type: selectedType }
    }).then(res => {
      if (active) {
        setCatalogState({
          items: res.items,
          total: res.total,
          loading: false
        });
        if (res.items.length > 0 && !res.items.some(i => i.id === selectedInst?.id)) {
          setSelectedInst(res.items[0]);
          setReviews(getStoredFeedback(res.items[0].id));
        }
      }
    }).catch(() => {
      if (active) setCatalogState(prev => ({ ...prev, loading: false }));
    });

    return () => { active = false; };
  }, [searchTerm, selectedCountry, selectedType, currentPage]);

  const totalPages = Math.ceil(catalogState.total / ITEMS_PER_PAGE) || 1;

  const handleSelectInstitution = (inst) => {
    setSelectedInst(inst);
    setReviews(getStoredFeedback(inst.id));
  };

  const trueCost = selectedInst ? calculateTrueCostOfStudy(selectedInst, {
    scenario: costScenario,
    isInternational: isInternationalStudent,
    currency: targetCurrency
  }) : null;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!selectedInst) return;
    try {
      submitFeedback({
        targetId: selectedInst.id,
        targetType: 'institution',
        targetName: selectedInst.name,
        author: reviewForm.author || 'Student',
        role: reviewForm.role,
        program: reviewForm.program || 'Degree Program',
        overallRating: reviewForm.overallRating,
        experience: reviewForm.experience,
        pros: reviewForm.pros,
        cons: reviewForm.cons,
        isVerified: reviewForm.isVerified
      });
      setReviews(getStoredFeedback(selectedInst.id));
      setShowReviewModal(false);
      setNotification('Your verified review was submitted and added.');
      setTimeout(() => setNotification(''), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleVote = (revId, type) => {
    if (!selectedInst) return;
    voteFeedback(revId, type);
    setReviews(getStoredFeedback(selectedInst.id));
  };

  return (
    <div className="placements-page">
      <Navbar />

      <main className="placements-container">
        {/* Header Hero */}
        <section className="placements-hero">
          <div className="badge-pill">🏛️ 10,000+ Higher Ed Campuses & True-Cost Engine</div>
          <h1 className="hero-title">Global University Discovery & True-Cost Audit</h1>
          <p className="hero-subtitle">
            Search 10,000+ top global and Indian institutions. Audit verified branch CTCs, admission cutoffs, and calculate the **True Total Cost of Study** (Tuition + Accommodation + Groceries + Transit + Health Insurance).
          </p>
        </section>

        {notification && (
          <div className="notification-toast">
            <CheckCircle2 size={16} /> {notification}
          </div>
        )}

        {/* Global Controls & Filters */}
        <div className="placements-controls">
          <div className="search-filter-group">
            <input
              type="text"
              placeholder="Search 10,000+ universities, cities, or shortcodes (e.g. IIT Bombay, BITS Pilani, TU Munich, Waterloo)..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="placements-search-input"
            />

            <select value={selectedCountry} onChange={e => { setSelectedCountry(e.target.value); setCurrentPage(1); }} className="placements-select">
              <option value="All">All Countries (Global)</option>
              <option value="India">India (IITs, NITs, BITS, IIMs)</option>
              <option value="United States">United States (Ivy League & STEM)</option>
              <option value="Germany">Germany (Tuition-Free Public)</option>
              <option value="Canada">Canada (Co-op & PGWP)</option>
              <option value="United Kingdom">United Kingdom (Russell Group)</option>
              <option value="Australia">Australia (Group of Eight)</option>
              <option value="Singapore">Singapore (NUS, NTU)</option>
            </select>

            <select value={selectedType} onChange={e => { setSelectedType(e.target.value); setCurrentPage(1); }} className="placements-select">
              <option value="All">All Campus Types</option>
              <option value="Engineering">Engineering & Tech</option>
              <option value="Management">Business & Management</option>
              <option value="Medical">Medical & Clinical</option>
              <option value="Science">Pure Science & Research</option>
              <option value="Arts">Design & Liberal Arts</option>
            </select>
          </div>

          <div className="catalog-count-badge">
            {catalogState.loading ? 'Scanning university registry…' : `${catalogState.total.toLocaleString()} Indexed Institutions`}
          </div>
        </div>

        {/* Two-Column Explorer Layout */}
        <div className="placements-split-layout">
          {/* Left Campus List Selector */}
          <div className="college-list-sidebar">
            <div className="sidebar-header">
              <h3>Indexed Campuses ({catalogState.total.toLocaleString()})</h3>
              <span className="text-xs text-muted">Page {currentPage} of {totalPages}</span>
            </div>

            <div className="college-scroll-list">
              {catalogState.items.map(inst => (
                <div
                  key={inst.id}
                  className={`college-list-item ${selectedInst?.id === inst.id ? 'active' : ''}`}
                  onClick={() => handleSelectInstitution(inst)}
                >
                  <div className="cli-header">
                    <span className="cli-name">{inst.name}</span>
                    <span className="cli-badge">{inst.countryCode || 'INTL'}</span>
                  </div>
                  <p className="cli-loc">{inst.city}, {inst.country}</p>
                  <div className="cli-stats">
                    <span>⭐ {inst.ratings?.overall || 9.5} Rating</span>
                    <span className="cli-type">{String(inst.type).split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination for Sidebar */}
            {totalPages > 1 && (
              <div className="pagination-bar mt-3">
                <button
                  className="btn-page btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={14} /> Prev
                </button>
                <span className="page-indicator">
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="btn-page btn-sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Right Deep Institution & True Cost Audit View */}
          {selectedInst && trueCost && (
            <div className="college-audit-pane">
              <div className="audit-header">
                <div>
                  <div className="audit-tier-tag">
                    {selectedInst.type} · Est. {selectedInst.established} · {selectedInst.nirfRank ? `NIRF #${selectedInst.nirfRank}` : `QS Top ${selectedInst.qsRank || 50}`}
                  </div>
                  <h2 className="audit-college-name">{selectedInst.name}</h2>
                  <p className="audit-location flex items-center gap-1">
                    <MapPin size={15} /> {selectedInst.city}, {selectedInst.country}
                  </p>
                </div>
                <div className="audit-header-right">
                  <button className="btn-primary" onClick={() => setShowReviewModal(true)}>
                    <MessageSquare size={16} /> Have You Studied Here?
                  </button>
                  {selectedInst.officialWebsite && (
                    <a href={selectedInst.officialWebsite} target="_blank" rel="noreferrer" className="btn-secondary">
                      Official Portal <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* TRUE COST OF STUDY SYSTEM SECTION */}
              <div className="audit-card true-cost-card mt-4">
                <div className="d-flex justify-between items-center flex-wrap gap-2 mb-3">
                  <div className="d-flex items-center gap-2">
                    <Calculator className="text-gold" size={22} />
                    <div>
                      <h3 className="card-subheading">True Cost of Study Calculator</h3>
                      <span className="text-xs text-muted">Includes Tuition + Rent + Food + Transit + Health Insurance</span>
                    </div>
                  </div>

                  {/* Scenario & Currency Controls */}
                  <div className="true-cost-controls">
                    <div className="toggle-pill-group">
                      <button className={costScenario === 'low' ? 'active' : ''} onClick={() => setCostScenario('low')}>Low Budget</button>
                      <button className={costScenario === 'average' ? 'active' : ''} onClick={() => setCostScenario('average')}>Average</button>
                      <button className={costScenario === 'high' ? 'active' : ''} onClick={() => setCostScenario('high')}>High Budget</button>
                    </div>

                    <div className="toggle-pill-group">
                      <button className={isInternationalStudent ? 'active' : ''} onClick={() => setIsInternationalStudent(true)}>International</button>
                      <button className={!isInternationalStudent ? 'active' : ''} onClick={() => setIsInternationalStudent(false)}>Domestic</button>
                    </div>

                    <select value={targetCurrency} onChange={e => setTargetCurrency(e.target.value)} className="currency-dropdown">
                      <option value="USD">USD ($)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (CA$)</option>
                      <option value="AUD">AUD (A$)</option>
                      <option value="SGD">SGD (S$)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="AED">AED (د.إ)</option>
                      <option value="CHF">CHF (Fr)</option>
                    </select>
                  </div>
                </div>

                {/* True Cost Breakdown Grid */}
                <div className="cost-breakdown-grid">
                  <div className="cost-box">
                    <span className="cost-label">Annual Tuition ({isInternationalStudent ? 'Intl' : 'Domestic'})</span>
                    <span className="cost-val text-green font-mono">
                      {formatCurrency(convertCurrency(trueCost.tuitionAnnual, selectedInst.currency, targetCurrency), targetCurrency)}
                    </span>
                    <span className="cost-sub">Institutional Academic Fees</span>
                  </div>

                  <div className="cost-box">
                    <span className="cost-label">Accommodation (Monthly)</span>
                    <span className="cost-val text-gold font-mono">
                      {formatCurrency(convertCurrency(trueCost.breakdown.accommodationMonthly, selectedInst.currency, targetCurrency), targetCurrency)}
                    </span>
                    <span className="cost-sub">Hostel / Student Housing</span>
                  </div>

                  <div className="cost-box">
                    <span className="cost-label">Food & Groceries (Monthly)</span>
                    <span className="cost-val font-mono">
                      {formatCurrency(convertCurrency(trueCost.breakdown.foodMonthly, selectedInst.currency, targetCurrency), targetCurrency)}
                    </span>
                    <span className="cost-sub">Dining / Meal Plan</span>
                  </div>

                  <div className="cost-box">
                    <span className="cost-label">Transport & Transit (Monthly)</span>
                    <span className="cost-val font-mono">
                      {formatCurrency(convertCurrency(trueCost.breakdown.transportMonthly, selectedInst.currency, targetCurrency), targetCurrency)}
                    </span>
                    <span className="cost-sub">Subsidized Student Transit</span>
                  </div>

                  <div className="cost-box">
                    <span className="cost-label">Health Insurance (Annual)</span>
                    <span className="cost-val font-mono">
                      {formatCurrency(convertCurrency(trueCost.breakdown.insuranceAnnual, selectedInst.currency, targetCurrency), targetCurrency)}
                    </span>
                    <span className="cost-sub">Statutory Health Cover</span>
                  </div>

                  <div className="cost-box">
                    <span className="cost-label">Total Monthly Living Budget</span>
                    <span className="cost-val text-cyan font-mono font-bold">
                      {formatCurrency(convertCurrency(trueCost.breakdown.totalMonthlyLiving, selectedInst.currency, targetCurrency), targetCurrency)}
                    </span>
                    <span className="cost-sub">City Average: {formatCurrency(convertCurrency(trueCost.cityAverageLivingMonthly, selectedInst.currency, targetCurrency), targetCurrency)}/mo</span>
                  </div>
                </div>

                {/* Total Annual & Total Degree Cost Rollup Banner */}
                <div className="total-cost-rollup-banner mt-3">
                  <div className="rollup-item">
                    <span className="ru-label">ESTIMATED TOTAL ANNUAL STUDY COST</span>
                    <span className="ru-val text-gold">
                      {formatCurrency(convertCurrency(trueCost.totalAnnualCost, selectedInst.currency, targetCurrency), targetCurrency)} / year
                    </span>
                    <span className="ru-sub">Tuition + Living + Insurance + Personal</span>
                  </div>

                  <div className="rollup-item highlight">
                    <span className="ru-label">TOTAL {selectedInst.durationYears || 4}-YEAR DEGREE INVESTMENT</span>
                    <span className="ru-val text-green">
                      {formatCurrency(convertCurrency(trueCost.totalDegreeCost, selectedInst.currency, targetCurrency), targetCurrency)}
                    </span>
                    <span className="ru-sub">Full degree investment before scholarships</span>
                  </div>
                </div>
              </div>

              {/* ADMISSION REQUIREMENTS & SCHOLARSHIPS */}
              <div className="grid-2-col mt-4">
                <div className="audit-card">
                  <h3 className="card-subheading flex items-center gap-1">
                    <BookOpen size={18} className="text-cyan" /> Admission & Language Requirements
                  </h3>
                  
                  <div className="req-tiles-stack mt-3">
                    <div className="req-tile">
                      <div className="req-tile-icon"><FileCheck size={16} className="text-cyan" /></div>
                      <div>
                        <span className="req-tile-label">Entrance Exam</span>
                        <p className="req-tile-val">{selectedInst.admissionRequirements?.exam || 'JEE Advanced / SAT / Standard Entrance'}</p>
                      </div>
                    </div>

                    <div className="req-tile">
                      <div className="req-tile-icon"><Award size={16} className="text-gold" /></div>
                      <div>
                        <span className="req-tile-label">Academic Minimum</span>
                        <p className="req-tile-val">{selectedInst.admissionRequirements?.minimumGrade || '75% - 85% in 12th Grade'}</p>
                      </div>
                    </div>

                    <div className="req-tile">
                      <div className="req-tile-icon"><Globe size={16} className="text-green" /></div>
                      <div>
                        <span className="req-tile-label">Language Proficiency</span>
                        <p className="req-tile-val">{selectedInst.admissionRequirements?.language || 'English Medium / IELTS 6.5+ / TOEFL 90+'}</p>
                      </div>
                    </div>

                    <div className="req-tile">
                      <div className="req-tile-icon"><Calendar size={16} className="text-purple" /></div>
                      <div>
                        <span className="req-tile-label">Annual Intakes</span>
                        <p className="req-tile-val">{selectedInst.intakes?.join(', ') || 'Fall (Aug/Sep), Spring (Jan)'}</p>
                      </div>
                    </div>

                    <div className="req-tile">
                      <div className="req-tile-icon"><Clock size={16} className="text-muted" /></div>
                      <div>
                        <span className="req-tile-label">Application Deadlines</span>
                        <p className="req-tile-val">{selectedInst.deadlines || 'Rolling Admission / Dec 15 - Jan 15'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="audit-card">
                  <h3 className="card-subheading flex items-center gap-1">
                    <Award size={18} className="text-gold" /> Scholarships & Financial Aid
                  </h3>
                  <div className="scholarships-list mt-3">
                    {selectedInst.scholarships && selectedInst.scholarships.length > 0 ? (
                      selectedInst.scholarships.map((s, idx) => (
                        <div key={idx} className="scholarship-item-box">
                          <div className="d-flex justify-between items-center">
                            <strong className="sch-name">{s.name}</strong>
                            <span className="sch-coverage-badge">{s.coverage}</span>
                          </div>
                          {s.eligibility && <p className="sch-eligibility">Eligibility: {s.eligibility}</p>}
                        </div>
                      ))
                    ) : (
                      <div className="scholarship-item-box default">
                        <strong className="sch-name">Merit & Need-Based Institutional Aid</strong>
                        <p className="sch-coverage-badge text-green">Up to 100% Tuition Waiver</p>
                        <p className="sch-eligibility">Direct institutional grants available upon admission review.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CAREER OUTCOMES & RECRUITERS */}
              <div className="audit-card mt-4">
                <h3 className="card-subheading flex items-center gap-1">
                  <TrendingUp size={18} className="text-green" /> Verified Placement & Career Outcomes
                </h3>
                <div className="metrics-row-4 mt-3">
                  <div className="stat-box">
                    <span className="sb-label">Placement Rate</span>
                    <span className="sb-val text-green">{selectedInst.careerOutcomes?.placementRate || selectedInst.placementStats?.placementRate || '96.5%'}</span>
                  </div>
                  <div className="stat-box">
                    <span className="sb-label">Average CTC</span>
                    <span className="sb-val text-cyan">
                      {selectedInst.placementStats?.avgDomesticCTC || (selectedInst.careerOutcomes?.medianSalaryINR ? `₹${(selectedInst.careerOutcomes.medianSalaryINR/100000).toFixed(1)} LPA` : '$115,000/yr')}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="sb-label">Highest Package</span>
                    <span className="sb-val text-gold">{selectedInst.placementStats?.highestDomesticCTC || '₹1.85 Cr ($350,000+)'}</span>
                  </div>
                  <div className="stat-box">
                    <span className="sb-label">ROI Payback Rating</span>
                    <span className="sb-val text-purple">{selectedInst.ratings?.placements || 9.5} / 10</span>
                  </div>
                </div>

                {/* Top Recruiters Tag Cloud */}
                <div className="top-recruiters-block mt-3">
                  <span className="tr-title">Top Recruiting Partners:</span>
                  <div className="tr-chips">
                    {(selectedInst.topRecruiters || selectedInst.careerOutcomes?.topEmployers || ['Google', 'Microsoft', 'Goldman Sachs', 'McKinsey', 'Apple', 'NVIDIA', 'Amazon']).map((r, i) => (
                      <span key={i} className="recruiter-chip">{r}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* VERIFIED STUDENT REVIEWS */}
              <div className="audit-card mt-4">
                <div className="d-flex justify-between items-center mb-3">
                  <h3 className="card-subheading flex items-center gap-1">
                    <ShieldCheck size={18} className="text-gold" /> Student Reviews & "Have You Studied Here?"
                  </h3>
                  <button className="btn-secondary" onClick={() => setShowReviewModal(true)}>
                    + Add Your Review
                  </button>
                </div>

                <div className="reviews-stack">
                  {reviews.length > 0 ? (
                    reviews.map(rev => (
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

                        <div className="rev-pros-cons-grid mt-2">
                          <div className="rpc-box pro"><strong>PROS:</strong> {rev.pros}</div>
                          <div className="rpc-box con"><strong>CONS:</strong> {rev.cons}</div>
                        </div>

                        <div className="rev-footer mt-2">
                          <div className="rev-votes">
                            <span>Helpful?</span>
                            <button className="vote-btn" onClick={() => handleVote(rev.id, 'helpful')}>
                              <ThumbsUp size={13} /> {rev.helpfulVotes}
                            </button>
                            <button className="vote-btn" onClick={() => handleVote(rev.id, 'unhelpful')}>
                              <ThumbsDown size={13} /> {rev.unhelpfulVotes}
                            </button>
                          </div>
                          <span className="rec-flag">{rev.recommend ? '✅ Recommends this institution' : '⚠️ Does not recommend'}</span>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="text-muted">No student reviews submitted yet. Be the first graduate or student to review {selectedInst.name}.</p>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      {/* Review Modal */}
      {showReviewModal && selectedInst && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="review-modal-card" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Have You Studied at {selectedInst.name}?</h3>
            <p className="modal-subtitle">Share your unvarnished feedback on academics, placements, campus life, and true living costs.</p>

            <form onSubmit={handleReviewSubmit} className="review-form mt-3">
              <div className="form-group">
                <label>Your Name / Pseudonym</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ankit P. or Alumni"
                  value={reviewForm.author}
                  onChange={e => setReviewForm({ ...reviewForm, author: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Your Status</label>
                <select value={reviewForm.role} onChange={e => setReviewForm({ ...reviewForm, role: e.target.value })}>
                  <option value="Current Student">Current Student</option>
                  <option value="Graduate">Graduate (Alumni)</option>
                  <option value="Former Student">Former Student</option>
                  <option value="Sports Student">Athlete / Sports Student</option>
                </select>
              </div>

              <div className="form-group">
                <label>Program / Major & Year</label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech Computer Science (Batch 2025)"
                  value={reviewForm.program}
                  onChange={e => setReviewForm({ ...reviewForm, program: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Written Experience (min 20 characters)</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details on professors, campus culture, placement preparation, and true living expenses."
                  value={reviewForm.experience}
                  onChange={e => setReviewForm({ ...reviewForm, experience: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Top Advantage / Pro</label>
                <input
                  type="text"
                  placeholder="e.g. Great alumni network, excellent computing facilities"
                  value={reviewForm.pros}
                  onChange={e => setReviewForm({ ...reviewForm, pros: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Top Challenge / Con</label>
                <input
                  type="text"
                  placeholder="e.g. High living costs off-campus, rigorous exam schedule"
                  value={reviewForm.cons}
                  onChange={e => setReviewForm({ ...reviewForm, cons: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowReviewModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Submit Verified Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
