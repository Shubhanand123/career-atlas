import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, TrendingDown, Clock, HelpCircle, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';
import { layoffSectorReports, aiImpactTimeline } from '../data/layoffReports';
import '../styles/layoffs.css';

export default function LayoffsPage() {
  const [selectedSector, setSelectedSector] = useState(layoffSectorReports[0]);

  return (
    <div className="layoffs-page">
      <Navbar />
      
      <main className="layoffs-container">
        <section className="layoffs-hero">
          <div className="badge-pill danger">📉 Live Market Volatility & Layoff Audit</div>
          <h1 className="hero-title">Sector Layoffs, AI Impact & Job Resilience</h1>
          <p className="hero-subtitle">
            Unvarnished data on industry workforce contractions, roles facing structural elimination, high-conviction resilient niches, and the 2024–2035 AI automation timeline.
          </p>
        </section>

        {/* Sector Resilience Selector */}
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

              {/* Survival Playbook */}
              <div className="survival-box">
                <h4 className="survival-title">🛡️ Career Survival & Pivot Playbook</h4>
                <p className="survival-text">{selectedSector.survivalPlaybook}</p>
              </div>
            </div>
          )}
        </div>

        {/* AI Impact Macro Timeline */}
        <section className="timeline-section">
          <div className="section-header-centered">
            <h2 className="timeline-heading">🤖 2024–2035 AI Impact & Replacement Timeline</h2>
            <p className="timeline-subheading">How machine intelligence will restructure labor across three distinctive waves</p>
          </div>

          <div className="timeline-grid">
            {aiImpactTimeline.map((item, idx) => (
              <div key={idx} className="timeline-phase-card">
                <div className="phase-badge">Wave 0{idx + 1}</div>
                <h3 className="phase-title">{item.phase}</h3>
                <p className="phase-desc">{item.impact}</p>
                
                <div className="winners-losers">
                  <div className="win-box">
                    <span className="wl-label text-green">Surging Demand:</span>
                    <div className="tag-group">
                      {item.winners.map((w, wIdx) => (
                        <span key={wIdx} className="tag-winner">{w}</span>
                      ))}
                    </div>
                  </div>

                  <div className="lose-box">
                    <span className="wl-label text-red">Contracting Demand:</span>
                    <div className="tag-group">
                      {item.losers.map((l, lIdx) => (
                        <span key={lIdx} className="tag-loser">{l}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
