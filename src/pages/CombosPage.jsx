import React, { useState, useMemo } from 'react';
import { 
  Sparkles, TrendingUp, Layers, Zap, ArrowRight, CheckCircle2, ShieldAlert, 
  Award, Plus, Trash2, Sliders, Filter, ShieldCheck, DollarSign, Bot, Brain
} from 'lucide-react';
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
        {/* Header Hero */}
        <section className="combos-hero">
          <div className="badge-pill">⚡ Exponential Compensation Engineering</div>
          <h1 className="hero-title">High-Yield Skill Stacking & Career Multipliers</h1>
          <p className="hero-subtitle">
            Linear careers produce linear compensation. Stacking rare, cross-disciplinary domain skills creates non-linear 2x–5x salary multipliers, market monopolies, and near-zero AI automation risk.
          </p>
        </section>

        {/* SECTION 1: INTERACTIVE SKILL STACKER & SYNERGY CALCULATOR */}
        <section className="custom-stacker-section mb-5">
          <div className="stacker-header-card">
            <div className="d-flex justify-between items-center flex-wrap gap-3">
              <div>
                <span className="badge category">Custom Synergy Engine</span>
                <h2 className="stacker-title">✨ Build Your Custom Skill Stack</h2>
                <p className="stacker-subtitle">Select 2 to 6 cross-domain skills to project your unfair advantage, INR & USD compensation multiplier, and AI resilience score.</p>
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
                    <h3 className="archetype-name">{customSynergy.unlockedArchetype}</h3>
                  </div>
                  <div className="domains-pill">
                    {customSynergy.distinctDomainsCount} Disparate Domains Stacked
                  </div>
                </div>

                {/* 3-Column Key Projections */}
                <div className="comp-projection-grid">
                  <div className="comp-item highlight-inr">
                    <span className="c-lbl">🇮🇳 Projected India Comp (CTC)</span>
                    <strong className="c-val text-cyan">{customSynergy.projectedSalaryINR}</strong>
                    <span className="c-sub">Based on Indian Tier-1 tech/quant benchmarks</span>
                  </div>

                  <div className="comp-item">
                    <span className="c-lbl">🌐 Projected Global Comp (US/EU)</span>
                    <strong className="c-val text-green">{customSynergy.projectedSalaryUSD}</strong>
                    <span className="c-sub">US Bay Area / NYC / London market rates</span>
                  </div>

                  <div className="comp-item">
                    <span className="c-lbl">🛡️ AI Defensibility Rating</span>
                    <strong className="c-val text-purple">{customSynergy.aiResilience}</strong>
                    <span className="c-sub">{customSynergy.aiDefensibilityLabel}</span>
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
          <p className="section-subtitle">Deep dive into proven multi-million dollar interdisciplinary pairings with INR CTC & AI risk breakdown.</p>
        </div>

        <div className="combos-layout">
          {/* Left Sidebar List */}
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
                  
                  {/* Dual INR & USD Display on Card */}
                  <div className="combo-target-box">
                    <div className="d-flex flex-col gap-1">
                      <span className="tgt-inr text-cyan">{combo.targetSalaryINR}</span>
                      <span className="tgt-usd text-muted">{combo.targetSalaryUSD}</span>
                    </div>
                    <span className="combo-shield-pill">AI Risk: {combo.aiRisk}/10</span>
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

                {/* 4-Column Compensation & Rigor Grid */}
                <div className="salary-target-grid">
                  <div className="sal-box highlight-inr">
                    <span className="sal-label">🇮🇳 India CTC Benchmark</span>
                    <span className="sal-val text-cyan">{selectedCombo.targetSalaryINR}</span>
                  </div>
                  <div className="sal-box">
                    <span className="sal-label">🌐 Global US/EU Benchmark</span>
                    <span className="sal-val text-green">{selectedCombo.targetSalaryUSD}</span>
                  </div>
                  <div className="sal-box">
                    <span className="sal-label">⏱️ Mastery Runway</span>
                    <span className="sal-val text-gold">{selectedCombo.timeToMaster}</span>
                  </div>
                  <div className="sal-box">
                    <span className="sal-label">🛡️ AI Vulnerability Index</span>
                    <span className="sal-val text-purple">{selectedCombo.aiRisk} / 10</span>
                  </div>
                </div>
              </div>

              {/* AI AUTOMATION RISK & DEFENSIBILITY DEEP AUDIT */}
              <div className="ai-risk-audit-card">
                <div className="d-flex justify-between items-center flex-wrap gap-2 mb-3">
                  <h3 className="card-subheading mb-0">
                    <ShieldCheck size={22} className="text-purple" /> 
                    AI Automation Defensibility: <span className="text-green">{selectedCombo.aiDefensibilityLabel || 'HIGHLY SHIELDED'}</span>
                  </h3>
                  <div className="ai-score-pill">
                    Risk Score: {selectedCombo.aiRisk} / 10 (Extremely Low Threat)
                  </div>
                </div>

                <div className="ai-risk-meter-wrap mb-3">
                  <div 
                    className="ai-risk-meter-bar"
                    style={{ width: `${Math.max(12, (10 - selectedCombo.aiRisk) * 10)}%` }}
                  />
                </div>

                <p className="ai-shield-explanation">
                  <strong>Why this stack resists automation:</strong> {selectedCombo.aiShieldReason || 'Requires physical hardware calibration, adversarial intuition, or human regulatory compliance that purely digital models cannot independently execute.'}
                </p>

                {/* 2-Column Task Division */}
                <div className="ai-task-split-grid mt-3">
                  <div className="ai-task-box automated">
                    <div className="task-box-head">
                      <Bot size={16} /> Tasks Automated by AI
                    </div>
                    <ul>
                      {(selectedCombo.tasksAutomated || ['Boilerplate generation', 'Routine documentation lookup']).map((t, idx) => (
                        <li key={idx}>• {t}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="ai-task-box human">
                    <div className="task-box-head">
                      <Brain size={16} /> Irreplaceable Human Value
                    </div>
                    <ul>
                      {(selectedCombo.tasksHuman || ['Cross-domain architectural judgment', 'Physical liability and ethical responsibility']).map((t, idx) => (
                        <li key={idx}>• {t}</li>
                      ))}
                    </ul>
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
                        <div className="skill-time">⏱️ {skill.masteryTime || '1 Year'}</div>
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
                      <div className="step-badge">Phase {step.step || `0${idx + 1}`}</div>
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
