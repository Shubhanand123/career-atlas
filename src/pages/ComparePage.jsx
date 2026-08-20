import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Navbar from '../components/Navbar';
import { sampleCareers } from '../data/sampleCareers';
import { getEnrichedCareer, getEnrichedCareerAsync } from '../data/careers';
import { searchCareerCatalog } from '../data/careerCatalog';
import '../styles/compare.css';

const DETAILED_METRICS = [
  { key: 'salaryEntry', label: 'Entry Salary ($ / yr)', type: 'currency' },
  { key: 'salaryMid', label: 'Mid-Career Salary ($ / yr)', type: 'currency' },
  { key: 'salaryIndia', label: 'India Benchmark CTC', type: 'text' },
  { key: 'workHours', label: 'Typical Weekly Hours', type: 'text' },
  { key: 'salaryForWorkDone', label: 'Effort-to-Reward Ratio', type: 'rating' },
  { key: 'toughness', label: 'Cognitive & Math Toughness (1-10)', type: 'number', inverse: true },
  { key: 'specializationReq', label: 'Specialization / Licensure Req', type: 'text' },
  { key: 'educationYears', label: 'Years of Study Required', type: 'number', inverse: true },
  { key: 'aiExposure', label: 'AI Replacement Threat (1-10)', type: 'number', inverse: true },
  { key: 'aiAugmentation', label: 'AI Supercharge Potential (1-10)', type: 'number' },
  { key: 'burnoutRisk', label: 'Burnout & Stress Index (1-10)', type: 'number', inverse: true },
  { key: 'remotePotential', label: 'Remote Flexibility (1-10)', type: 'number' },
  { key: 'topColleges', label: 'Premier Recruiting Campuses', type: 'text' }
];

export default function ComparePage() {
  const [search, setSearch] = useState('');
  const [selectedCareers, setSelectedCareers] = useState([
    getEnrichedCareer('software-engineer'),
    getEnrichedCareer('carpenter'),
    getEnrichedCareer('physician')
  ].filter(Boolean));
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!search.trim()) {
      setFilteredCareers(sampleCareers.filter(sc => !selectedCareers.some(s => s.id === sc.id)).slice(0, 10));
      return undefined;
    }
    setIsSearching(true);
    searchCareerCatalog({ query: search, limit: 15 }).then(({ items }) => {
      if (!cancelled) setFilteredCareers(items.filter(item => !selectedCareers.some(selected => selected.id === item.id)));
    }).finally(() => { if (!cancelled) setIsSearching(false); });
    return () => { cancelled = true; };
  }, [search, selectedCareers]);

  const handleSelect = async (career) => {
    if (selectedCareers.length < 4) {
      const enriched = await getEnrichedCareerAsync(career.id);
      setSelectedCareers([...selectedCareers, enriched]);
      setSearch('');
      setShowDropdown(false);
    }
  };

  const handleRemove = (id) => {
    setSelectedCareers(selectedCareers.filter(c => c.id !== id));
  };

  // Helper to extract clean comparative metrics from the career object
  const getCareerMetricValue = (c, key) => {
    if (!c) return 'N/A';
    switch (key) {
      case 'salaryEntry':
        return '$' + (c.salary?.entry?.max || 70000).toLocaleString();
      case 'salaryMid':
        return '$' + (c.salary?.mid?.max || 120000).toLocaleString();
      case 'salaryIndia':
        return c.salary?.byCountry?.IN ? `₹${(c.salary.byCountry.IN.mid[0]/100000).toFixed(1)} - ₹${(c.salary.byCountry.IN.mid[1]/100000).toFixed(1)} LPA` : '₹12 - ₹35 LPA';
      case 'workHours':
        return c.lifestyle?.workLifeBalance <= 4 ? '60 - 80 hrs/wk' : '40 - 45 hrs/wk';
      case 'salaryForWorkDone':
        return c.difficulty?.overall >= 8 ? 'Very High (Steep learning curve, high payoff)' : 'High (Balanced effort/payoff)';
      case 'toughness':
        return c.difficulty?.overall || 7.0;
      case 'specializationReq':
        return c.education?.preferred || c.education?.typical || 'Bachelor degree + Portfolio';
      case 'educationYears':
        return c.education?.duration?.typical || 4;
      case 'aiExposure':
        return c.aiImpact?.automationExposure ? Math.round(c.aiImpact.automationExposure) : 4;
      case 'aiAugmentation':
        return c.aiImpact?.augmentationPotential ? Math.round(c.aiImpact.augmentationPotential) : 8;
      case 'burnoutRisk':
        return c.lifestyle?.stressLevel || 7;
      case 'remotePotential':
        return c.lifestyle?.remoteFlexibility || 8;
      case 'topColleges':
        return 'IITs, BITS Pilani, Stanford, MIT, IIMs';
      default:
        return 'N/A';
    }
  };

  // Prepare radar data
  const radarMetrics = [
    { subject: 'Entry Pay', max: 10 },
    { subject: 'Work-Life', max: 10 },
    { subject: 'AI Resilience', max: 10 },
    { subject: 'Difficulty', max: 10 },
    { subject: 'Demand', max: 10 },
    { subject: 'Remote Flex', max: 10 },
  ];

  const radarData = radarMetrics.map(metric => {
    const item = { subject: metric.subject };
    selectedCareers.forEach((c) => {
      let val = 5;
      if (metric.subject === 'Entry Pay') val = Math.min(10, Math.round((c.salary?.entry?.max || 70000) / 15000));
      if (metric.subject === 'Work-Life') val = c.lifestyle?.workLifeBalance || 6;
      if (metric.subject === 'AI Resilience') val = 10 - (c.aiImpact?.automationExposure || 4);
      if (metric.subject === 'Difficulty') val = c.difficulty?.overall || 7;
      if (metric.subject === 'Demand') val = 8;
      if (metric.subject === 'Remote Flex') val = c.lifestyle?.remoteFlexibility || 7;
      item[c.name] = val;
    });
    return item;
  });

  const COLORS = ['#00d4ff', '#ff3366', '#00ff88', '#ffd700'];

  return (
    <div className="compare-page">
      <Navbar />
      
      <main className="compare-container">
        <section className="compare-hero">
          <div className="badge-pill">⚖️ Deep Multidimensional Career Matrix</div>
          <h1 className="hero-title">Side-by-Side Career Comparison</h1>
          <p className="hero-subtitle">
            Compare compensation trajectories, cognitive toughness, specialization prerequisites, AI risk, real-world work hours, and top college recruitment pipelines.
          </p>

          {/* Career Selector Bar */}
          <div className="compare-selector-bar">
            <div className="search-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder={selectedCareers.length >= 4 ? "Max 4 careers selected" : "Type to add another career to compare..."}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                disabled={selectedCareers.length >= 4}
              />
              
              {showDropdown && search && (
                <div className="dropdown-list">
                  {filteredCareers.slice(0, 8).map(c => (
                    <div key={c.id} className="dropdown-item" onClick={() => handleSelect(c)}>
                      <span className="career-name">{c.name}</span>
                      <span className="career-family">{c.family}</span>
                    </div>
                  ))}
                  {isSearching && <div className="dropdown-item">Searching the career catalogue…</div>}
                </div>
              )}
            </div>

            <div className="selected-tags">
              {selectedCareers.map((c, i) => (
                <div key={c.id} className="career-pill" style={{ borderColor: COLORS[i] }}>
                  <span className="color-dot" style={{ background: COLORS[i] }} />
                  <span className="name">{c.name}</span>
                  {selectedCareers.length > 2 && (
                    <button className="remove-btn" onClick={() => handleRemove(c.id)}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Multidimensional Radar Chart */}
        <section className="radar-section-card">
          <h3 className="section-title">📊 Multi-Axis Capability Radar</h3>
          <div className="radar-wrapper">
            <ResponsiveContainer width="100%" height={360}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" stroke="#aaa" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#555" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a24', borderColor: '#333', color: '#fff' }} />
                <Legend />
                {selectedCareers.map((c, idx) => (
                  <Radar
                    key={c.id}
                    name={c.name}
                    dataKey={c.name}
                    stroke={COLORS[idx]}
                    fill={COLORS[idx]}
                    fillOpacity={0.25}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Deep Matrix Table */}
        <section className="matrix-section">
          <h3 className="section-title">🔍 Comprehensive Comparison Grid</h3>
          <div className="matrix-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="metric-header">Evaluation Dimension</th>
                  {selectedCareers.map((c, idx) => (
                    <th key={c.id} style={{ borderTop: `3px solid ${COLORS[idx]}` }}>
                      <div className="th-career-name">{c.name}</div>
                      <div className="th-family">{c.family}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DETAILED_METRICS.map(m => (
                  <tr key={m.key}>
                    <td className="metric-cell-label">{m.label}</td>
                    {selectedCareers.map(c => {
                      const val = getCareerMetricValue(c, m.key);
                      return (
                        <td key={c.id} className="metric-cell-val">
                          {typeof val === 'number' ? (
                            <span className={`stat-pill ${val >= 7 ? 'text-cyan' : 'text-gold'}`}>
                              {val} / 10
                            </span>
                          ) : (
                            <span>{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Action Callout */}
        <section className="compare-bottom-cta">
          <div className="cta-box">
            <h3>Explore College Cutoffs or Stack Skill Combos</h3>
            <p>Dive into verified placement statistics from top institutions or unlock non-linear salary multipliers.</p>
            <div className="cta-buttons">
              <a href="/placements" className="btn-primary">View Placement Reports</a>
              <a href="/combos" className="btn-secondary">Explore High-Yield Combos</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
