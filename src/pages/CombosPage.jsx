import React, { useState, useMemo } from 'react';
import { Sparkles, TrendingUp, Layers, Zap, ArrowRight, CheckCircle2, ShieldAlert, Award, Plus, Trash2, Sliders, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import { salaryCombos } from '../data/salaryCombos';
import { skillCategories, allSkillsList, calculateSkillSynergy } from '../data/skills';
import '../styles/combos.css';

export default function CombosPage() {
  const [selectedCombo, setSelectedCombo] = useState(salaryCombos[0]);
  
  // Custom Skill Stacker State
  const [selectedCustomSkills, setSelectedCustomSkills] = useState([
    'transformer-models',
    'distributed-consensus',
    'robotic-surgery-davinci'
  ]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchSkillQuery, setSearchSkillQuery] = useState('');

  // Calculate live custom synergy
  const customSynergy = useMemo(() => {
    return calculateSkillSynergy(selectedCustomSkills);
  }, [selectedCustomSkills]);

  const toggleSkill = (skillId) => {
    if (selectedCustomSkills.includes(skillId)) {
      if (selectedCustomSkills.length > 1) {
        setSelectedCustomSkills(selectedCustomSkills.filter(id => id !== skillId));
      }
    } else {
      if (selectedCustomSkills.length < 6) {
        setSelectedCustomSkills([...selectedCustomSkills, skillId]);
      }
    }
  };

  const filteredSkills = useMemo(() => {
    return allSkillsList.filter(s => {
      const matchCat = filterCategory === 'all' || s.categoryId === filterCategory;
      const matchQuery = !searchSkillQuery || s.name.toLowerCase().includes(searchSkillQuery.toLowerCase()) || s.categoryName.toLowerCase().includes(searchSkillQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [filterCategory, searchSkillQuery]);

  return (
    <div className="combos-page">
      <Navbar />
      
      <main className="combos-container">
        <section className="combos-hero">
          <div className="badge-pill">⚡ Exponential Compensation Engineering</div>
          <h1 className="hero-title">High-Yield Skill Stacking & Career Multipliers</h1>
          <p className="hero-subtitle">
            Linear careers produce linear compensation. Stacking rare, cross-disciplinary domain skills from our 15,000+ career registry creates non-linear 2x–5x salary multipliers and near-zero AI vulnerability.
          </p>
        </section>

        {/* SECTION 1: INTERACTIVE SKILL STACKER & SYNERGY CALCULATOR */}
        <section className="custom-stacker-section mb-5">
          <div className="stacker-header-card">
            <div className="d-flex justify-between items-center flex-wrap gap-3">
              <div>
                <span className="badge category">Custom Synergy Engine</span>
                <h2 className="stacker-title">✨ Build Your Custom Skill Stack</h2>
                <p className="stacker-subtitle">Select 2 to 6 cross-domain skills to project your unfair advantage, compensation multiplier, and AI resilience score.</p>
              </div>
              {customSynergy && (
                <div className="live-multiplier-badge">
                  <span className="live-num">{customSynergy.multiplier}</span>
                  <span className="live-sub">AI Resilience: {customSynergy.aiResilience}</span>
                </div>
              )}
            </div>

            {/* Custom Projection Results Box */}
            {customSynergy && (
              <div className="custom-results-dashboard mt-4">
                <div className="res-card-top">
                  <div>
                    <span className="archetype-label">Unlocked Career Archetype:</span>
                    <h3 className="archetype-name text-gold">{customSynergy.unlockedArchetype}</h3>
                  </div>
                  <div className="domains-pill">
                    {customSynergy.distinctDomainsCount} Disparate Domains Stacked
                  </div>
                </div>

                <div className="comp-projection-grid">
                  <div className="comp-item">
                    <span className="c-lbl">Projected Global Comp (US/EU)</span>
                    <strong className="c-val text-green">{customSynergy.projectedSalaryUSD}</strong>
                  </div>
                  <div className="comp-item">
                    <span className="c-lbl">Projected India Comp (CTC)</span>
                    <strong className="c-val text-cyan">{customSynergy.projectedSalaryINR}</strong>
                  </div>
                  <div className="comp-item">
                    <span className="c-lbl">AI Automation Defensibility</span>
                    <strong className="c-val text-purple">{customSynergy.aiResilience} (Extremely Safe)</strong>
                  </div>
                </div>

                <p className="insight-text mt-3">{customSynergy.insights}</p>
              </div>
            )}

            {/* Active Selected Skills Chips */}
            <div className="active-skills-bar mt-4">
              <span className="active-label">Active Stack ({selectedCustomSkills.length}/6):</span>
              <div className="chips-wrap">
                {customSynergy?.selectedSkills.map(s => (
                  <span key={s.id} className="active-chip">
                    <span>{s.icon} {s.name}</span>
                    <button className="chip-remove" onClick={() => toggleSkill(s.id)}>×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Skill Selector Matrix */}
            <div className="skill-matrix-controls mt-4">
              <div className="d-flex justify-between items-center flex-wrap gap-2 mb-3">
                <div className="cat-filter-tabs">
                  <button className={`cat-tab ${filterCategory === 'all' ? 'active' : ''}`} onClick={() => setFilterCategory('all')}>All Disciplines</button>
                  {skillCategories.map(c => (
                    <button key={c.id} className={`cat-tab ${filterCategory === c.id ? 'active' : ''}`} onClick={() => setFilterCategory(c.id)}>
                      {c.icon} {c.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Filter skills (e.g. GPU, Surgery, Quantum, Rust)..."
                  value={searchSkillQuery}
                  onChange={(e) => setSearchSkillQuery(e.target.value)}
                  className="skill-search-input"
                />
              </div>

              <div className="skills-selectable-grid">
                {filteredSkills.map(skill => {
                  const isSelected = selectedCustomSkills.includes(skill.id);
                  return (
                    <div
                      key={skill.id}
                      className={`skill-pick-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleSkill(skill.id)}
                    >
                      <div className="s-card-head">
                        <span className="s-icon">{skill.icon}</span>
                        <span className={`s-check ${isSelected ? 'checked' : ''}`}>{isSelected ? '✓' : '+'}</span>
                      </div>
                      <strong className="s-name">{skill.name}</strong>
                      <span className="s-cat">{skill.categoryName}</span>
                      <div className="s-time">Mastery: {skill.learningTime.professional}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CURATED EXPONENTIAL BLUEPRINTS */}
        <div className="section-divider mb-4">
          <h2 className="section-title">🏆 Curated Monopoly Archetypes</h2>
          <p className="section-subtitle">Deep dive into proven multi-million dollar interdisciplinary pairings.</p>
        </div>

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
                        <div className="skill-time">⏱️ {skill.masteryTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Acquisition Roadmap */}
              <div className="detail-section">
                <h3 className="card-subheading"><TrendingUp size={20} className="text-green" /> Step-by-Step Acquisition Roadmap</h3>
                <div className="roadmap-steps-list">
                  {selectedCombo.roadmap.map((step, idx) => (
                    <div key={idx} className="roadmap-step-item">
                      <div className="step-badge">Phase {step.step}</div>
                      <div className="step-content">
                        <h4 className="step-title">{step.title} <span className="step-dur">({step.duration})</span></h4>
                        <p className="step-desc">{step.description}</p>
                      </div>
                    </div>
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
