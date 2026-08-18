import React, { useState } from 'react';
import { Sparkles, TrendingUp, Layers, Zap, ArrowRight, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import { salaryCombos } from '../data/salaryCombos';
import '../styles/combos.css';

export default function CombosPage() {
  const [selectedCombo, setSelectedCombo] = useState(salaryCombos[0]);

  return (
    <div className="combos-page">
      <Navbar />
      
      <main className="combos-container">
        <section className="combos-hero">
          <div className="badge-pill">⚡ Exponential Compensation Engineering</div>
          <h1 className="hero-title">High-Yield Skill & Career Combos</h1>
          <p className="hero-subtitle">
            Linear careers produce linear compensation. Stacking rare, cross-disciplinary domain skills creates non-linear 2x–5x salary multipliers and near-zero AI vulnerability.
          </p>
        </section>

        {/* Combos Main Grid: Left Selectors + Right Deep Synergy Blueprint */}
        <div className="combos-layout">
          <div className="combos-sidebar">
            <h3 className="sidebar-title">Multiplier Blueprints</h3>
            <div className="combo-card-list">
              {salaryCombos.map(combo => (
                <div
                  key={combo.id}
                  className={`combo-select-card ${selectedCombo.id === combo.id ? 'active' : ''}`}
                  onClick={() => setSelectedCombo(combo)}
                >
                  <div className="combo-card-top">
                    <span className="combo-multiplier-pill">{combo.comboMultiplier}</span>
                    <span className="combo-diff-tag">Toughness: {combo.difficulty}/10</span>
                  </div>
                  <h4 className="combo-title">{combo.title}</h4>
                  <p className="combo-base">Base: {combo.baseRole}</p>
                  <div className="combo-target-box">
                    <span className="tgt-label">Target Range:</span>
                    <span className="tgt-val text-green">{combo.targetSalaryUSD}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Detailed Strategy Card */}
          {selectedCombo && (
            <div className="combo-detail-panel">
              <div className="detail-hero-card">
                <div className="d-flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <span className="badge category">Stacked Multiplier Archetype</span>
                    <h2 className="detail-title">{selectedCombo.title}</h2>
                    <p className="detail-base-text">Elevated from: <strong className="text-white">{selectedCombo.baseRole}</strong></p>
                  </div>
                  <div className="multiplier-badge-box">
                    <span className="multiplier-num">{selectedCombo.comboMultiplier}</span>
                    <span className="multiplier-label">Target Multiplier</span>
                  </div>
                </div>

                <div className="salary-target-grid">
                  <div className="sal-box">
                    <span className="sal-label">Global Comp Benchmark (US/EU)</span>
                    <span className="sal-val text-green">{selectedCombo.targetSalaryUSD}</span>
                  </div>
                  <div className="sal-box">
                    <span className="sal-label">India Comp Benchmark</span>
                    <span className="sal-val text-cyan">{selectedCombo.targetSalaryINR}</span>
                  </div>
                  <div className="sal-box">
                    <span className="sal-label">Estimated Mastery Time</span>
                    <span className="sal-val text-gold">{selectedCombo.timeToMaster}</span>
                  </div>
                  <div className="sal-box">
                    <span className="sal-label">AI Automation Vulnerability</span>
                    <span className="sal-val text-purple">{selectedCombo.aiRisk} / 10 (Very Low)</span>
                  </div>
                </div>
              </div>

              {/* The Synergy Core Insight */}
              <div className="synergy-insight-card">
                <h3 className="card-subheading"><Zap size={20} className="text-gold" /> Why This Combo Generates Monopoly Value</h3>
                <p className="synergy-text">{selectedCombo.synergyInsight}</p>
              </div>

              {/* Stacked Skills Breakdown */}
              <div className="detail-section">
                <h3 className="card-subheading"><Layers size={20} className="text-cyan" /> Stacked Skill Inventory</h3>
                <div className="skills-stacked-grid">
                  {selectedCombo.stackedSkills.map((skill, idx) => (
                    <div key={idx} className="stacked-skill-card">
                      <div className="skill-num">0{idx + 1}</div>
                      <div className="skill-info">
                        <div className="skill-name">{skill.name}</div>
                        <div className="skill-domain">{skill.domain}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Acquisition Roadmap */}
              <div className="detail-section">
                <h3 className="card-subheading"><TrendingUp size={20} className="text-green" /> 4-Stage Execution Roadmap</h3>
                <div className="roadmap-step-list">
                  {selectedCombo.roadmap.map((step, idx) => (
                    <div key={idx} className="roadmap-step-item">
                      <div className="step-badge">Stage {idx + 1}</div>
                      <div className="step-content">
                        <p className="step-text">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Hiring Employers */}
              <div className="detail-section">
                <h3 className="card-subheading"><Award size={20} className="text-purple" /> Premier Hiring Entities</h3>
                <div className="recruiter-tags-wrap">
                  {selectedCombo.targetRecruiters.map((rec, idx) => (
                    <span key={idx} className="recruiter-pill">{rec}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
