import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Layers, Globe, Eye, ArrowRight, ShieldCheck, DollarSign, Cpu, GraduationCap, Building2, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import CareerUniverse from '../components/CareerUniverse';
import { sampleCareers, careerFamilies } from '../data/sampleCareers';
import '../styles/explore.css';

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [viewMode, setViewMode] = useState('3d'); // '3d' or '2d'
  const [toughnessFilter, setToughnessFilter] = useState('all'); // 'all', 'high', 'moderate', 'accessible'
  const [aiRiskFilter, setAiRiskFilter] = useState('all'); // 'all', 'low', 'high'

  const filteredCareers = sampleCareers.filter(career => {
    const matchesSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.aliases?.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFamily = selectedFamily === 'all' || career.family === selectedFamily;
    
    let matchesToughness = true;
    const diff = career.difficulty?.overall || 7;
    if (toughnessFilter === 'high') matchesToughness = diff >= 8.0;
    if (toughnessFilter === 'moderate') matchesToughness = diff >= 6.0 && diff < 8.0;
    if (toughnessFilter === 'accessible') matchesToughness = diff < 6.0;

    let matchesAi = true;
    const aiRisk = career.aiImpact?.automationExposure || 4;
    if (aiRiskFilter === 'low') matchesAi = aiRisk <= 3.5;
    if (aiRiskFilter === 'high') matchesAi = aiRisk > 6.0;

    return matchesSearch && matchesFamily && matchesToughness && matchesAi;
  });

  return (
    <div className="explore-page">
      <Navbar />
      
      <main className="explore-main">
        {/* Hero & Search Header */}
        <section className="explore-hero">
          <div className="badge-pill">🌌 Global Career Knowledge Universe</div>
          <h1 className="hero-title">Explore Every Possible Future</h1>
          <p className="hero-subtitle">
            Navigate through occupational galaxies, explore specialization prerequisites, compare college recruitment pipelines, and discover resilient career vectors.
          </p>

          <div className="explore-controls-wrapper">
            {/* Search Input */}
            <div className="search-bar-main">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search occupations, specializations, skills (e.g. Quant, Cloud Architect, Neurosurgeon)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Mode Switcher: 3D Universe vs 2D Accessible Matrix */}
            <div className="mode-toggle-group">
              <button
                className={`mode-btn ${viewMode === '3d' ? 'active' : ''}`}
                onClick={() => setViewMode('3d')}
              >
                <Globe size={16} /> 3D Cosmos Mode
              </button>
              <button
                className={`mode-btn ${viewMode === '2d' ? 'active' : ''}`}
                onClick={() => setViewMode('2d')}
              >
                <Layers size={16} /> 2D Accessible Mode
              </button>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div className="explore-filter-bar">
            <div className="filter-group">
              <span className="filter-label">Occupational Cluster:</span>
              <select value={selectedFamily} onChange={(e) => setSelectedFamily(e.target.value)}>
                <option value="all">All Occupational Families (20+)</option>
                {careerFamilies.map(f => (
                  <option key={f.id} value={f.id}>{f.icon} {f.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-label">Toughness:</span>
              <select value={toughnessFilter} onChange={(e) => setToughnessFilter(e.target.value)}>
                <option value="all">All Toughness Levels</option>
                <option value="high">High Cognitive / Math (8.0+)</option>
                <option value="moderate">Moderate Difficulty (6.0 - 7.9)</option>
                <option value="accessible">Accessible Entry (&lt; 6.0)</option>
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-label">AI Resilience:</span>
              <select value={aiRiskFilter} onChange={(e) => setAiRiskFilter(e.target.value)}>
                <option value="all">All AI Profiles</option>
                <option value="low">AI Resilient / Safe</option>
                <option value="high">High Automation Exposure</option>
              </select>
            </div>
          </div>
        </section>

        {/* 3D Universe Canvas Container */}
        {viewMode === '3d' && (
          <section className="universe-canvas-section">
            <div className="universe-canvas-header">
              <span className="live-indicator">● Interactive Three.js Orbit Controls Active</span>
              <span className="text-sm text-gray-400">Click & Drag to rotate • Scroll to zoom • Select cluster</span>
            </div>
            <div className="threejs-frame">
              <CareerUniverse />
            </div>
          </section>
        )}

        {/* Career Grid Directory */}
        <section className="career-grid-section">
          <div className="grid-header-row">
            <h2 className="grid-title">Matching Occupational Profiles ({filteredCareers.length})</h2>
            <div className="quick-links-group">
              <Link to="/placements" className="quick-pill"><GraduationCap size={14} /> College Placements</Link>
              <Link to="/combos" className="quick-pill"><Zap size={14} /> Salary Combos</Link>
              <Link to="/compare" className="quick-pill"><Layers size={14} /> Compare Careers</Link>
            </div>
          </div>

          <div className="career-cards-grid">
            {filteredCareers.map((career) => (
              <div key={career.id} className="career-profile-card">
                <div className="card-top-row">
                  <span className="family-badge">{career.family}</span>
                  <span className="diff-pill">Toughness: {career.difficulty?.overall || 7.0}/10</span>
                </div>

                <h3 className="card-career-title">{career.name}</h3>
                <p className="card-desc">{career.shortDescription}</p>

                <div className="card-stats-row">
                  <div>
                    <span className="stat-label">Mid Salary (US)</span>
                    <span className="stat-val text-green">${((career.salary?.mid?.max || 120000) / 1000).toFixed(0)}k</span>
                  </div>
                  <div>
                    <span className="stat-label">India Median</span>
                    <span className="stat-val text-cyan">₹{((career.salary?.byCountry?.IN?.entry?.[0] || 600000)/100000).toFixed(0)}L</span>
                  </div>
                  <div>
                    <span className="stat-label">AI Resilience</span>
                    <span className="stat-val text-purple">{(10 - (career.aiImpact?.automationExposure || 3.5)).toFixed(1)}/10</span>
                  </div>
                </div>

                <div className="card-footer-action">
                  <Link to={`/career/${career.id}`} className="view-profile-btn">
                    Inspect Full Profile <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
