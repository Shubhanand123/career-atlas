import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, GraduationCap, Building2, TrendingUp, DollarSign, Award, ExternalLink, Filter, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { collegePlacementReports } from '../data/placementReports';
import '../styles/placements.css';

export default function PlacementReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCollege, setSelectedCollege] = useState(collegePlacementReports[0]);

  const filteredColleges = collegePlacementReports.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.topRecruiters.some(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTier = selectedTier === 'All' || college.tier.includes(selectedTier);
    const matchesType = selectedType === 'All' || college.type.includes(selectedType);
    return matchesSearch && matchesTier && matchesType;
  });

  return (
    <div className="placements-page">
      <Navbar />
      
      <main className="placements-container">
        {/* Header Hero */}
        <section className="placements-hero">
          <div className="badge-pill">🏛️ Verified Institutional Placement Audits</div>
          <h1 className="hero-title">College Placement & Compensation Reports</h1>
          <p className="hero-subtitle">
            Unfiltered branch-wise placement statistics, domestic vs. international CTC packages, recruiter hiring tiers, and 4-year tuition ROI benchmarks across premier institutions.
          </p>

          <div className="placements-controls">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search college, location, or recruiter (e.g. IIT Bombay, Jane Street, AIIMS)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-chips">
              <span className="filter-label"><Filter size={14} /> Tier:</span>
              {['All', 'Tier 1', 'Global'].map(t => (
                <button
                  key={t}
                  className={`chip ${selectedTier === t ? 'active' : ''}`}
                  onClick={() => setSelectedTier(t)}
                >
                  {t}
                </button>
              ))}
              
              <span className="filter-label ml-4">Type:</span>
              {['All', 'Engineering', 'Management', 'Medical'].map(tp => (
                <button
                  key={tp}
                  className={`chip ${selectedType === tp ? 'active' : ''}`}
                  onClick={() => setSelectedType(tp)}
                >
                  {tp}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Master Content Layout: Left Sidebar List + Right Deep Audit View */}
        <div className="placements-grid-layout">
          {/* Left College Selector */}
          <div className="college-list-sidebar">
            <h3 className="sidebar-title">Institutions ({filteredColleges.length})</h3>
            <div className="college-cards-scroll">
              {filteredColleges.map(college => (
                <div
                  key={college.id}
                  className={`college-select-card ${selectedCollege?.id === college.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCollege(college)}
                >
                  <div className="college-card-header">
                    <GraduationCap size={18} className="text-cyan" />
                    <span className="college-tier-tag">{college.tier.split('(')[0]}</span>
                  </div>
                  <h4 className="college-name">{college.name}</h4>
                  <p className="college-location">{college.location}</p>
                  <div className="college-card-stats">
                    <div>
                      <span className="stat-label">Avg CTC</span>
                      <span className="stat-val text-green">{college.avgPackageDomestic}</span>
                    </div>
                    <div>
                      <span className="stat-label">Placed %</span>
                      <span className="stat-val text-cyan">{college.overallPlacementRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Deep Report Inspection */}
          {selectedCollege && (
            <div className="college-detail-panel">
              <div className="detail-header-card">
                <div className="d-flex justify-between items-start">
                  <div>
                    <span className="badge category">{selectedCollege.type}</span>
                    <h2 className="detail-college-name">{selectedCollege.name}</h2>
                    <p className="detail-location">{selectedCollege.location}</p>
                  </div>
                  <div className="roi-badge-box">
                    <span className="roi-score-num">{selectedCollege.roiScore}/10</span>
                    <span className="roi-score-label">ROI Score</span>
                  </div>
                </div>

                <div className="key-metrics-row">
                  <div className="km-item">
                    <DollarSign size={18} className="text-green" />
                    <div>
                      <div className="km-label">Avg Domestic CTC</div>
                      <div className="km-value text-green">{selectedCollege.avgPackageDomestic}</div>
                    </div>
                  </div>

                  <div className="km-item">
                    <TrendingUp size={18} className="text-cyan" />
                    <div>
                      <div className="km-label">Median CTC</div>
                      <div className="km-value">{selectedCollege.medianPackageDomestic}</div>
                    </div>
                  </div>

                  <div className="km-item">
                    <Award size={18} className="text-gold" />
                    <div>
                      <div className="km-label">Highest Domestic CTC</div>
                      <div className="km-value text-gold">{selectedCollege.highestDomesticPackage}</div>
                    </div>
                  </div>

                  <div className="km-item">
                    <Building2 size={18} className="text-purple" />
                    <div>
                      <div className="km-label">Total Tuition Fee</div>
                      <div className="km-value">{selectedCollege.tuitionFeeTotal}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Wise Breakdown */}
              <div className="detail-section">
                <h3 className="section-title">📊 Branch-Wise Placement & Salary Statistics</h3>
                <div className="table-responsive">
                  <table className="placement-table">
                    <thead>
                      <tr>
                        <th>Department / Branch</th>
                        <th>Placement %</th>
                        <th>Avg Package</th>
                        <th>Median Package</th>
                        <th>Highest CTC</th>
                        <th>Linked Career Profiles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCollege.branches.map((b, idx) => (
                        <tr key={idx}>
                          <td className="font-semibold text-white">{b.branch}</td>
                          <td>
                            <div className="progress-cell">
                              <span className="text-cyan">{b.placedPct}%</span>
                              <div className="mini-progress-bar">
                                <div className="mini-progress-fill" style={{ width: `${b.placedPct}%` }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="text-green">₹{b.avgLPA} LPA</td>
                          <td>₹{b.medianLPA} LPA</td>
                          <td className="text-gold font-bold">₹{b.topLPA} LPA</td>
                          <td>
                            <div className="career-pill-group">
                              {b.topCareers.map(cId => (
                                <Link to={`/career/${cId}`} key={cId} className="career-link-pill">
                                  {cId.replace('-', ' ')} <ExternalLink size={10} />
                                </Link>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Recruiting Companies & Tiers */}
              <div className="detail-section">
                <h3 className="section-title">🏢 Marquee Recruiters & Role Breakdown</h3>
                <div className="recruiters-grid">
                  {selectedCollege.topRecruiters.map((rec, idx) => (
                    <div key={idx} className="recruiter-card">
                      <div className="recruiter-name">{rec.name}</div>
                      <div className="recruiter-roles">
                        {rec.roles.map((role, rIdx) => (
                          <span key={rIdx} className="role-tag">{role}</span>
                        ))}
                      </div>
                      <div className="recruiter-package-range">
                        <span className="pkg-label">Offered CTC:</span>
                        <span className="pkg-val">{rec.packages}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialization & Work-Done Reality */}
              <div className="grid-2-col">
                <div className="info-box">
                  <h4 className="info-box-title">🎯 Specialization & Cutoff Prerequisites</h4>
                  <p className="info-box-text">{selectedCollege.specializationPrerequisites}</p>
                </div>
                <div className="info-box">
                  <h4 className="info-box-title">⚖️ Salary for Work Done & ROI Ratio</h4>
                  <p className="info-box-text">{selectedCollege.salaryForWorkDoneRatio}</p>
                  <div className="toughness-badge mt-3">
                    Institutional Toughness: <span className="text-gold font-bold">{selectedCollege.toughnessIndex} / 10</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
