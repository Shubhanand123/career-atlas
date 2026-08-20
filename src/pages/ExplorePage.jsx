import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Layers, Globe, ArrowRight, GraduationCap, Zap, ChevronLeft, ChevronRight, X,
  Trophy, DollarSign, TrendingUp, Sparkles, Filter, ShieldCheck, Briefcase
} from 'lucide-react';
import Navbar from '../components/Navbar';
import CareerUniverse from '../components/CareerUniverse';
import { careerFamilies } from '../data/sampleCareers';
import { searchCareerCatalog } from '../data/careerCatalog';
import { parseNaturalLanguageQuery } from '../utils/naturalLanguageSearch';
import '../styles/explore.css';

const ITEMS_PER_PAGE = 24;

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialFamily = searchParams.get('family') || 'all';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [parsedQuery, setParsedQuery] = useState(() => parseNaturalLanguageQuery(initialSearch));
  const [selectedFamily, setSelectedFamily] = useState(initialFamily);
  const [viewMode, setViewMode] = useState('3d'); // '3d' or '2d'
  const [toughnessFilter, setToughnessFilter] = useState('all');
  const [aiRiskFilter, setAiRiskFilter] = useState('all');
  const [skillLevelFilter, setSkillLevelFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [directory, setDirectory] = useState({ items: [], total: 15000, loading: true });

  // Sync URL search query param if present
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null && q !== searchTerm) {
      setSearchTerm(q);
      setParsedQuery(parseNaturalLanguageQuery(q));
    }
    const f = searchParams.get('family');
    if (f !== null && f !== selectedFamily) {
      setSelectedFamily(f);
    }
  }, [searchParams]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFamily, toughnessFilter, aiRiskFilter, skillLevelFilter]);

  useEffect(() => {
    let cancelled = false;
    setDirectory(current => ({ ...current, loading: true }));

    const queryToUse = parsedQuery.keywords || searchTerm;
    const effectiveFamily = parsedQuery.filters.family || (selectedFamily !== 'all' ? selectedFamily : undefined);

    searchCareerCatalog({
      query: queryToUse,
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      filters: { 
        family: effectiveFamily, 
        skillLevel: skillLevelFilter, 
        toughness: toughnessFilter, 
        aiRisk: aiRiskFilter 
      }
    }).then(result => {
      if (!cancelled) setDirectory({ ...result, loading: false });
    }).catch(() => {
      if (!cancelled) setDirectory({ items: [], total: 0, loading: false });
    });
    return () => { cancelled = true; };
  }, [searchTerm, parsedQuery, selectedFamily, toughnessFilter, aiRiskFilter, skillLevelFilter, currentPage]);

  const totalPages = Math.ceil(directory.total / ITEMS_PER_PAGE) || 1;
  const paginatedCareers = directory.items;

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    const parsed = parseNaturalLanguageQuery(val);
    setParsedQuery(parsed);
    if (parsed.filters.family) setSelectedFamily(parsed.filters.family);
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setParsedQuery(parseNaturalLanguageQuery(''));
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
          <div className="badge-pill">🌌 15,000+ Verified Careers & Specializations</div>
          <h1 className="hero-title">Explore Every Possible Future</h1>
          <p className="hero-subtitle">
            From manual trades, carpenters, and farmers to AI researchers, neurosurgeons, judges, and sports performance analysts. Search with natural language, compare pay benchmarks, and inspect automation indices.
          </p>

          <div className="explore-controls-wrapper">
            {/* Search Input */}
            <div className="search-bar-main">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search with natural language (e.g. 'AI engineering', 'Biomedical devices', 'Carpenter', 'Quant trader')..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="clear-search-btn"
                  onClick={handleClearFilters}
                  title="Clear Search"
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
                <Globe size={16} /> 3D Career Galaxy
              </button>
              <button
                className={`mode-btn ${viewMode === '2d' ? 'active' : ''}`}
                onClick={() => setViewMode('2d')}
              >
                <Layers size={16} /> 2D Directory
              </button>
            </div>
          </div>

          {/* Quick Preset Chips */}
          <div className="search-quick-suggestions mt-3">
            <button type="button" onClick={() => handleSearchChange('Biomedical engineering')}>🩺 Biomedical</button>
            <button type="button" onClick={() => handleSearchChange('AI engineering & foundation models')}>⚡ AI & Computing</button>
            <button type="button" onClick={() => handleSearchChange('Quantitative trading & HFT')}>📈 Quant Finance</button>
            <button type="button" onClick={() => handleSearchChange('Robotics & aerospace propulsion')}>🚀 Robotics & Aero</button>
            <button type="button" onClick={() => handleSearchChange('Skilled trades and precision craft')}>🛠️ Master Trades</button>
          </div>

          {/* Quick Filter Bar */}
          <div className="explore-filter-bar mt-3">
            <div className="filter-group">
              <span className="filter-label">Cluster:</span>
              <select value={selectedFamily} onChange={(e) => { setSelectedFamily(e.target.value); setSearchParams({ family: e.target.value }); }}>
                <option value="all">All Clusters (15,000+ Careers)</option>
                {careerFamilies.map(f => (
                  <option key={f.id} value={f.id}>{f.icon} {f.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-label">Skill Level:</span>
              <select value={skillLevelFilter} onChange={(e) => setSkillLevelFilter(e.target.value)}>
                <option value="all">All Levels</option>
                <option value="High">High (Professional / Advanced)</option>
                <option value="Medium">Medium (Skilled / Associate)</option>
                <option value="Low">Entry (Apprenticeship / Hands-on)</option>
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-label">Toughness Index:</span>
              <select value={toughnessFilter} onChange={(e) => setToughnessFilter(e.target.value)}>
                <option value="all">Any Toughness</option>
                <option value="high">High Rigor (8.0+)</option>
                <option value="moderate">Moderate Rigor (6.0 - 7.9)</option>
                <option value="accessible">Accessible (&lt; 6.0)</option>
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-label">AI Automation Risk:</span>
              <select value={aiRiskFilter} onChange={(e) => setAiRiskFilter(e.target.value)}>
                <option value="all">All AI Profiles</option>
                <option value="low">AI Shielded / Highly Resilient (&le; 3.5)</option>
                <option value="high">High Automation Exposure (&gt; 6.0)</option>
              </select>
            </div>

            {(searchTerm || selectedFamily !== 'all' || toughnessFilter !== 'all' || aiRiskFilter !== 'all' || skillLevelFilter !== 'all') && (
              <button className="clear-filters-btn" onClick={handleClearFilters}>
                <X size={14} /> Clear
              </button>
            )}
          </div>
        </section>

        {/* 3D Visualizer Canvas (when in 3D mode) */}
        {viewMode === '3d' && (
          <section className="universe-canvas-section mb-5" aria-label="3D Career Galaxy Navigation">
            <CareerUniverse onSelectCategory={(catId) => { setSelectedFamily(catId); setSearchParams({ family: catId }); }} />
            <div className="canvas-overlay-hint">
              <span>✨ Interactive 3D Career Galaxy Active · Drag to Orbit · Click any Node to Inspect</span>
            </div>
          </section>
        )}

        {/* Results Counter */}
        <section id="careers-directory" className="results-header-section mb-3">
          <div className="results-count-badge">
            {directory.loading ? 'Scanning career taxonomy…' : `Showing ${directory.items.length} of ${directory.total.toLocaleString()} Mapped Occupations`}
          </div>
        </section>

        {/* Career Directory Grid */}
        <section className="careers-grid-section">
          {directory.loading ? (
            <div className="loading-state-box">
              <div className="spinner" />
              <p>Searching 15,000+ verified career pathways…</p>
            </div>
          ) : paginatedCareers.length === 0 ? (
            <div className="empty-state-box">
              <h3>No matching careers found</h3>
              <p>Try adjusting your search terms or clearing your filters.</p>
              <button className="btn-secondary mt-3" onClick={handleClearFilters}>Clear All Filters</button>
            </div>
          ) : (
            <div className="explore-grid-container">
              {paginatedCareers.map(career => (
                <Link key={career.id} to={`/career/${career.id}`} className="career-explore-card">
                  <div>
                    <div className="card-top-meta">
                      <span className="badge category">{career.category || 'General'}</span>
                      {career.toughnessScore && (
                        <span className="badge-pill">Rigor: {career.toughnessScore}/10</span>
                      )}
                    </div>

                    <h3 className="career-card-title">{career.name}</h3>
                    <p className="career-card-desc">{career.summary || career.description || 'Comprehensive professional role with defined educational and technical milestones.'}</p>
                  </div>

                  <div className="card-footer-stats">
                    <span className="stat-salary">
                      {career.salaryINR ? `₹${(career.salaryINR.mid / 100000).toFixed(1)}L` : (career.salaryUSD ? `$${(career.salaryUSD.mid / 1000).toFixed(0)}k` : '₹12.0L')}
                    </span>
                    <span className="stat-edu">{career.typicalEducation || 'Bachelor Degree'}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-bar mt-4">
            <button
              className="btn-secondary btn-sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="page-indicator">Page {currentPage} of {totalPages}</span>
            <button
              className="btn-secondary btn-sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
