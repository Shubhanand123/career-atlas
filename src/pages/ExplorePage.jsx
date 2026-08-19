import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, Layers, Globe, Eye, ArrowRight, ShieldCheck, 
  DollarSign, Cpu, GraduationCap, Building2, Zap, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import Navbar from '../components/Navbar';
import CareerUniverse from '../components/CareerUniverse';
import { careerFamilies } from '../data/sampleCareers';
import { careerRegistry } from '../data/careerRegistry';
import '../styles/explore.css';

const ITEMS_PER_PAGE = 24;

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [viewMode, setViewMode] = useState('3d'); // '3d' or '2d'
  const [toughnessFilter, setToughnessFilter] = useState('all'); // 'all', 'high', 'moderate', 'accessible'
  const [aiRiskFilter, setAiRiskFilter] = useState('all'); // 'all', 'low', 'high'
  const [skillLevelFilter, setSkillLevelFilter] = useState('all'); // 'all', 'High', 'Medium', 'Low'
  const [currentPage, setCurrentPage] = useState(1);

  // Sync URL search query param if present
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null && q !== searchTerm) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFamily, toughnessFilter, aiRiskFilter, skillLevelFilter]);

  const filteredCareers = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();

    return careerRegistry.filter(career => {
      // Substring search in name, category, subcategory, shortDescription
      if (q) {
        const matchesQuery = 
          career.name.toLowerCase().includes(q) ||
          career.subcategory.toLowerCase().includes(q) ||
          career.category.toLowerCase().includes(q) ||
          (career.shortDescription && career.shortDescription.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Family cluster filter
      if (selectedFamily !== 'all' && career.family !== selectedFamily) {
        return false;
      }

      // Skill level filter
      if (skillLevelFilter !== 'all' && career.skillLevel.toLowerCase() !== skillLevelFilter.toLowerCase()) {
        return false;
      }

      // Toughness filter
      const diff = Number(career.toughness) || 7.0;
      if (toughnessFilter === 'high' && diff < 8.0) return false;
      if (toughnessFilter === 'moderate' && (diff < 6.0 || diff >= 8.0)) return false;
      if (toughnessFilter === 'accessible' && diff >= 6.0) return false;

      // AI Risk filter
      const aiRisk = Number(career.aiRisk) || 3.5;
      if (aiRiskFilter === 'low' && aiRisk > 3.5) return false;
      if (aiRiskFilter === 'high' && aiRisk <= 6.0) return false;

      return true;
    });
  }, [searchTerm, selectedFamily, toughnessFilter, aiRiskFilter, skillLevelFilter]);

  const totalPages = Math.ceil(filteredCareers.length / ITEMS_PER_PAGE) || 1;
  const paginatedCareers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCareers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCareers, currentPage]);

  const handleNodeClick = (familyId) => {
    setSelectedFamily(familyId);
    const gridEl = document.getElementById('careers-directory');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedFamily('all');
    setToughnessFilter('all');
    setAiRiskFilter('all');
    setSkillLevelFilter('all');
    setSearchParams({});
  };

  return (
    <div className="explore-page">
      <Navbar />
      
      <main className="explore-main">
        {/* Hero & Search Header */}
        <section className="explore-hero">
          <div className="badge-pill">🌌 10,000+ Canonical Occupations Knowledge Universe</div>
          <h1 className="hero-title">Explore Every Possible Future</h1>
          <p className="hero-subtitle">
            From manual trades, carpenters, and farmers to AI researchers, neurosurgeons, judges, and ministers. Search, compare, and inspect comprehensive compensation, education pipelines, and automation indices.
          </p>

          <div className="explore-controls-wrapper">
            {/* Search Input */}
            <div className="search-bar-main">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search 10,000+ occupations, skills, trades (e.g. Carpenter, Quant, Neurosurgeon, Welder, Diplomat)..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value) {
                    setSearchParams({ search: e.target.value });
                  } else {
                    setSearchParams({});
                  }
                }}
              />
              {searchTerm && (
                <button 
                  className="clear-search-btn"
                  onClick={() => { setSearchTerm(''); setSearchParams({}); }}
                  title="Clear Search"
                  style={{
                    position: 'absolute',
                    right: '1.25rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#7a7a95',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              )}
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
              <span className="filter-label">Cluster:</span>
              <select value={selectedFamily} onChange={(e) => setSelectedFamily(e.target.value)}>
                <option value="all">All Clusters (10,000+ Roles)</option>
                {careerFamilies.map(f => (
                  <option key={f.id} value={f.id}>{f.icon} {f.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-label">Skill Level:</span>
              <select value={skillLevelFilter} onChange={(e) => setSkillLevelFilter(e.target.value)}>
                <option value="all">All Skill Levels</option>
                <option value="High">High / Professional / Executive</option>
                <option value="Medium">Medium / Skilled Trades / Specialist</option>
                <option value="Low">Entry Level / General Trades</option>
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-label">Toughness:</span>
              <select value={toughnessFilter} onChange={(e) => setToughnessFilter(e.target.value)}>
                <option value="all">All Toughness</option>
                <option value="high">High Cognitive (8.0+)</option>
                <option value="moderate">Moderate (6.0 - 7.9)</option>
                <option value="accessible">Accessible (&lt; 6.0)</option>
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

            {(searchTerm || selectedFamily !== 'all' || toughnessFilter !== 'all' || aiRiskFilter !== 'all' || skillLevelFilter !== 'all') && (
              <button className="clear-all-chip" onClick={handleClearFilters} style={{
                background: 'rgba(255, 68, 68, 0.1)',
                border: '1px solid rgba(255, 68, 68, 0.3)',
                color: '#ff6666',
                borderRadius: '8px',
                padding: '0.4rem 0.85rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <X size={14} /> Reset Filters
              </button>
            )}
          </div>
        </section>

        {/* 3D Universe Canvas Container */}
        {viewMode === '3d' && (
          <section className="universe-canvas-section">
            <div className="universe-canvas-header">
              <span className="live-indicator">● Interactive Three.js Orbit Controls Active</span>
              <span className="text-sm text-gray-400">Click a family star to filter catalog • Drag to rotate</span>
            </div>
            <div className="threejs-frame">
              <CareerUniverse onNodeClick={handleNodeClick} />
            </div>
          </section>
        )}

        {/* Career Grid Directory */}
        <section id="careers-directory" className="career-grid-section">
          <div className="grid-header-row">
            <div>
              <h2 className="grid-title">
                {filteredCareers.length.toLocaleString()} Canonical Careers
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#8a8aa2' }}>
                Showing page {currentPage} of {totalPages}
              </span>
            </div>

            <div className="quick-links-group">
              <Link to="/placements" className="quick-pill"><GraduationCap size={14} /> College Placements</Link>
              <Link to="/combos" className="quick-pill"><Zap size={14} /> Salary Combos</Link>
              <Link to="/compare" className="quick-pill"><Layers size={14} /> Compare Careers</Link>
            </div>
          </div>

          <div className="career-cards-grid">
            {paginatedCareers.map((career) => (
              <div key={career.id} className="career-profile-card">
                <div className="card-top-row">
                  <span className="family-badge">{career.family}</span>
                  <span className="diff-pill">Toughness: {career.toughness || 7.0}/10</span>
                </div>

                <h3 className="card-career-title">{career.name}</h3>
                <p className="card-desc" style={{ fontSize: '0.82rem', color: '#6e6e88', marginBottom: '0.5rem' }}>
                  <strong>{career.category}</strong> • {career.subcategory}
                </p>
                <p className="card-desc">{career.shortDescription}</p>

                <div className="card-stats-row">
                  <div>
                    <span className="stat-label">Mid Salary (US)</span>
                    <span className="stat-val text-green">${((career.salaryUSD?.mid || 110000) / 1000).toFixed(0)}k</span>
                  </div>
                  <div>
                    <span className="stat-label">India CTC</span>
                    <span className="stat-val text-cyan">₹{((career.salaryINR?.entry || 600000)/100000).toFixed(1)}L</span>
                  </div>
                  <div>
                    <span className="stat-label">AI Resilience</span>
                    <span className="stat-val text-purple">{(10 - (Number(career.aiRisk) || 3.5)).toFixed(1)}/10</span>
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-bar" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '3rem',
              flexWrap: 'wrap'
            }}>
              <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  document.getElementById('careers-directory')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: '#141422',
                  border: '1px solid #222234',
                  color: currentPage === 1 ? '#444455' : '#fff',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <ChevronLeft size={16} /> Prev
              </button>

              <span style={{ fontSize: '0.9rem', color: '#8a8aa2' }}>
                Page <strong style={{ color: '#00d4ff' }}>{currentPage}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                  document.getElementById('careers-directory')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: '#141422',
                  border: '1px solid #222234',
                  color: currentPage === totalPages ? '#444455' : '#fff',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

