import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, AlertTriangle, CheckCircle2, TrendingDown, Clock, 
  HelpCircle, Layers, Search, Building2, Filter, DollarSign, ArrowRight,
  ShieldCheck, Briefcase, FileText, Check, AlertCircle, Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { layoffSectorReports, aiImpactTimeline, layoffEventsTracker } from '../data/layoffReports';
import '../styles/layoffs.css';

export default function LayoffsPage() {
  const [selectedSector, setSelectedSector] = useState(layoffSectorReports[0]);
  const [trackerSearch, setTrackerSearch] = useState('');
  const [trackerSectorFilter, setTrackerSectorFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('sectors'); // 'sectors', 'tracker', 'timeline', 'playbook'

  const filteredTracker = useMemo(() => {
    return layoffEventsTracker.filter(item => {
      const matchSearch = !trackerSearch || 
        item.company.toLowerCase().includes(trackerSearch.toLowerCase()) || 
        item.sector.toLowerCase().includes(trackerSearch.toLowerCase()) ||
        item.reason.toLowerCase().includes(trackerSearch.toLowerCase());
      const matchSector = trackerSectorFilter === 'all' || item.sector.toLowerCase().includes(trackerSectorFilter.toLowerCase());
      return matchSearch && matchSector;
    });
  }, [trackerSearch, trackerSectorFilter]);

  return (
    <div className="layoffs-page">
      <Navbar />
      
      <main className="layoffs-container">
        <section className="layoffs-hero">
          <div className="badge-pill danger">📉 Live Market Volatility & Layoff Audit</div>
          <h1 className="hero-title">Sector Layoffs, AI Impact & Job Resilience</h1>
          <p className="hero-subtitle">
            Unvarnished data on industry workforce contractions, roles facing structural elimination, high-conviction resilient niches, and company layoff events with severance package benchmarks.
          </p>

          {/* Navigation Sub-Tabs */}
          <div className="layoffs-tabs-bar mt-4">
            <button className={`l-tab ${activeTab === 'sectors' ? 'active' : ''}`} onClick={() => setActiveTab('sectors')}>
              <Layers size={16} /> Sector Vulnerability Matrix
            </button>
            <button className={`l-tab ${activeTab === 'tracker' ? 'active' : ''}`} onClick={() => setActiveTab('tracker')}>
              <Building2 size={16} /> Company Layoff & Severance Tracker ({layoffEventsTracker.length})
            </button>
            <button className={`l-tab ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>
              <Clock size={16} /> 2024–2035 AI Automation Horizon
            </button>
            <button className={`l-tab ${activeTab === 'playbook' ? 'active' : ''}`} onClick={() => setActiveTab('playbook')}>
              <ShieldCheck size={16} /> Layoff Survival & Pivot Playbook
            </button>
          </div>
        </section>

        {/* TAB 1: SECTORS VULNERABILITY */}
        {activeTab === 'sectors' && (
          <div className="layoffs-layout">
            <div className="sector-list-sidebar">
              <h3 className="sidebar-title">Sectors Tracked</h3>
              <div className="sector-cards">
                {layoffSectorReports.map((sector, idx) => (
                  <div
                    key={idx}
                    className={`sector-card ${selectedSector.sector === sector.sector ? 'active' : ''}`}
                    onClick={() => setSelectedSector(sector)}
                  >
                    <div className="sector-top">
                      <span className="sector-name">{sector.sector}</span>
                      <span className="risk-indicator">{sector.riskLevel.split('(')[0]}</span>
                    </div>
                    <div className="sector-cut-stat">
                      <span className="stat-label">Contraction:</span>
                      <span className="stat-val text-red">{sector.layoffs2023_2026}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sector Deep Dive Report */}
            {selectedSector && (
              <div className="sector-detail-panel">
                <div className="sector-hero-card">
                  <span className="badge category">Sector Vulnerability Analysis</span>
                  <h2 className="detail-sector-name">{selectedSector.sector}</h2>
                  <div className="sector-meta-grid">
                    <div>
                      <span className="meta-label">Total Reductions (2023-2026)</span>
                      <span className="meta-val text-red">{selectedSector.layoffs2023_2026}</span>
                    </div>
                    <div>
                      <span className="meta-label">Overall Sector Risk</span>
                      <span className="meta-val text-gold">{selectedSector.riskLevel}</span>
                    </div>
                  </div>

                  <div className="macro-drivers">
                    <h4 className="sub-title">📌 Primary Structural Drivers</h4>
                    <ul className="driver-list">
                      {selectedSector.primaryDrivers.map((driver, dIdx) => (
                        <li key={dIdx}>{driver}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Vulnerable vs Resilient Roles Side-by-Side */}
                <div className="grid-2-col">
                  {/* Vulnerable Roles */}
                  <div className="role-column vulnerable">
                    <h3 className="col-title"><AlertTriangle size={18} className="text-red" /> High Vulnerability Roles</h3>
                    <div className="role-cards-stack">
                      {selectedSector.vulnerableRoles.map((role, rIdx) => (
                        <div key={rIdx} className="role-item-card">
                          <div className="role-header">
                            <span className="role-title-text">{role.title}</span>
                            <span className="risk-badge-high">Risk: {role.riskScore}/10</span>
                          </div>
                          <p className="role-reason-text">{role.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resilient Roles */}
                  <div className="role-column resilient">
                    <h3 className="col-title"><CheckCircle2 size={18} className="text-green" /> Highly Resilient Roles</h3>
                    <div className="role-cards-stack">
                      {selectedSector.resilientRoles.map((role, rIdx) => (
                        <div key={rIdx} className="role-item-card">
                          <div className="role-header">
                            <span className="role-title-text">{role.title}</span>
                            <span className="resilience-badge-high">Resilience: {role.resilienceScore}/10</span>
                          </div>
                          <p className="role-reason-text">{role.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Survival Playbook Box */}
                <div className="survival-box">
                  <h4 className="playbook-title">💡 Strategic Survival Playbook</h4>
                  <p className="playbook-text">{selectedSector.survivalPlaybook}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COMPANY LAYOFF & SEVERANCE TRACKER */}
        {activeTab === 'tracker' && (
          <section className="tracker-tab-pane">
            <div className="tracker-controls-card">
              <div className="d-flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h3 className="card-subheading">🏢 Verified Employer Layoff & Severance Tracker</h3>
                  <p className="section-subtext">Detailed records of headcount reductions, severance benchmarks, and core business drivers.</p>
                </div>

                <div className="d-flex gap-2">
                  <input
                    type="text"
                    placeholder="Search company (e.g. Google, Intel, Tesla, Amazon)..."
                    value={trackerSearch}
                    onChange={(e) => setTrackerSearch(e.target.value)}
                    className="tracker-search-input"
                  />
                </div>
              </div>
            </div>

            <div className="tracker-table-container mt-4">
              <table className="tracker-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Sector</th>
                    <th>Period</th>
                    <th>Headcount Cut</th>
                    <th>Workforce %</th>
                    <th>Severance Package Benchmark</th>
                    <th>AI / Automation Driver</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTracker.map((evt, idx) => (
                    <tr key={idx}>
                      <td><strong>{evt.company}</strong></td>
                      <td><span className="sector-tag-sm">{evt.sector}</span></td>
                      <td>{evt.year}</td>
                      <td><strong className="text-red">{evt.count}</strong></td>
                      <td><span className="badge-pct">{evt.pct}</span></td>
                      <td><span className="text-dim text-sm">{evt.severance}</span></td>
                      <td><span className="text-gold text-sm">{evt.aiFactor}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: AI AUTOMATION TIMELINE */}
        {activeTab === 'timeline' && (
          <section className="timeline-tab-pane">
            <h2 className="timeline-main-title">⏳ 2024–2035 AI Impact & Job Displacement Timeline</h2>
            <p className="timeline-subtitle">How multi-agent systems and embodied robotics will restructure employment across the next decade.</p>

            <div className="timeline-phases-grid mt-4">
              {aiImpactTimeline.map((item, idx) => (
                <div key={idx} className="timeline-phase-card">
                  <div className="phase-badge">Phase 0{idx + 1}</div>
                  <h3 className="phase-title">{item.phase}</h3>
                  <p className="phase-desc">{item.impact}</p>

                  <div className="phase-grid-winners-losers">
                    <div className="win-box">
                      <span className="win-lbl">🏆 Primary Beneficiaries (Winners)</span>
                      <ul className="win-list">
                        {item.winners.map((w, wIdx) => <li key={wIdx}>• {w}</li>)}
                      </ul>
                    </div>
                    <div className="lose-box">
                      <span className="lose-lbl">⚠️ Structural Displacement (Losers)</span>
                      <ul className="lose-list">
                        {item.losers.map((l, lIdx) => <li key={lIdx}>• {l}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 4: LAYOFF SURVIVAL & PIVOT PLAYBOOK */}
        {activeTab === 'playbook' && (
          <section className="playbook-tab-pane">
            <h2 className="timeline-main-title">🛡️ Layoff Survival, Severance & Fast-Track Pivot Guide</h2>
            <p className="timeline-subtitle">Actionable step-by-step guidance for navigating corporate reductions, negotiating severance, and pivoting into safe sectors.</p>

            <div className="playbook-cards-grid mt-4">
              <div className="playbook-card">
                <h3 className="p-card-title">1. Emergency Severance Checklist</h3>
                <ul className="p-list">
                  <li><strong>Do Not Sign on Day 1:</strong> You typically have 21 to 45 days under the OWBPA to review severance agreements.</li>
                  <li><strong>Audit Unvested RSUs & Equity:</strong> Negotiate for accelerated vesting through the next immediate quarterly tranche.</li>
                  <li><strong>Healthcare & COBRA Subsidies:</strong> Ensure 3 to 6 months of subsidized healthcare coverage is written into the agreement.</li>
                  <li><strong>Neutral Reference Clause:</strong> Guarantee the company provides standard confirmation of dates & title without negative remarks.</li>
                </ul>
              </div>

              <div className="playbook-card">
                <h3 className="p-card-title">2. Fast-Track Pivot to Safe Sectors</h3>
                <ul className="p-list">
                  <li><strong>Healthcare & Clinical Tech:</strong> Deep structural shortage. Pivot software skills to medical device firmware or health data infrastructure.</li>
                  <li><strong>Defense & Aerospace:</strong> Sovereign defense spending is at 30-year highs. High demand for C++, embedded systems, and security clearance.</li>
                  <li><strong>High-Voltage & Power Grid:</strong> Data centers and EV expansion have created unprecedented demand for electrical infrastructure engineering.</li>
                  <li><strong>Quantitative Systems:</strong> Trading firms and market makers continue to expand infrastructure teams during volatility.</li>
                </ul>
              </div>

              <div className="playbook-card">
                <h3 className="p-card-title">3. Resume & Portfolio Re-Tooling</h3>
                <ul className="p-list">
                  <li><strong>Erase Outdated CRUD Keywords:</strong> Shift focus from basic web frameworks to distributed systems, performance optimization, and AI platform tooling.</li>
                  <li><strong>Demonstrate Verifiable Proof of Work:</strong> Deploy working prototypes, open-source pull requests, or benchmark metrics rather than static bullet points.</li>
                  <li><strong>Target Founders & Engineering VPs Directly:</strong> Skip automated ATS portals by presenting concise architectural proposals directly to hiring managers.</li>
                </ul>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
