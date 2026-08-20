import React, { useMemo, useState } from 'react';
import { 
  Download, FileText, BriefcaseBusiness, ClipboardCheck, Mic, Building2, 
  Target, Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Sparkles, ChevronRight,
  TrendingUp, Award, BookOpen, Layers, Star, ExternalLink, RefreshCw, Trophy
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { companyResearchData } from '../data/companyResearch';
import { interviewQuestionsByRole } from '../data/interviewQuestions';
import '../styles/workspace.css';

const CV_KEY = 'careerAtlas.cvVersions.v2';
const TRACKER_KEY = 'careerAtlas.applications.v2';
const SAVED_ITEMS_KEY = 'careerAtlas.savedItems.v2';
const STAGES = ['Saved', 'Interested', 'Preparing', 'Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'];

const defaultCv = {
  id: 'cv-1',
  name: 'Full-Stack & Systems Engineering Resume',
  targetRole: 'Software Engineer / Distributed Systems',
  personal: {
    fullName: 'Shubhanand Chowdhary',
    email: 'student@careeratlas.edu',
    phone: '+91 98765 43210',
    location: 'Mumbai / Bangalore, India',
    github: 'github.com/Shubhanand123',
    linkedin: 'linkedin.com/in/careeratlas-student'
  },
  education: [
    { school: 'Indian Institute of Technology / Premier University', degree: 'B.Tech Computer Science & Engineering', year: '2022 - 2026', gpa: '8.8 / 10.0' },
    { school: 'Senior Secondary High School', degree: 'Class 12 Science (PCM + CS)', year: '2020 - 2022', gpa: '94.6%' }
  ],
  projects: [
    { name: 'Career Atlas — Global Career Intelligence Platform', tools: 'React, Three.js, Vite, Fast Search Indexing', desc: 'Built full-stack multi-dimensional career and institution discovery portal supporting 15,000+ occupation nodes and True-Cost calculation.' },
    { name: 'Distributed Key-Value Store with Raft Consensus', tools: 'Go, gRPC, Protobuf, LevelDB', desc: 'Implemented leader election, log replication, and snapshotting across 5-node cluster with sub-10ms failover.' }
  ],
  internships: [
    { company: 'Distributed Systems Labs', role: 'Software Engineering Intern', duration: 'May 2025 - July 2025', desc: 'Optimized high-throughput telemetry ingestion pipeline, reducing p99 latency by 34%.' }
  ],
  certifications: [
    'AWS Certified Solutions Architect Associate',
    'DeepLearning.AI Machine Learning Specialization'
  ],
  achievements: [
    'National Finalist — Smart India Hackathon',
    'ACM ICPC Regional Participant'
  ],
  sportsAchievements: [
    'State Championship Badminton Quarterfinalist (Under-19)',
    'Captain — Inter-College Athletics & 4x100m Relay Squad'
  ],
  extracurriculars: [
    'Lead Coordinator — University Open Source Developer Circle',
    'Volunteer Tutor — STEM for Underprivileged Students'
  ],
  languages: ['English (Fluent)', 'Hindi (Native)'],
  skills: 'JavaScript, TypeScript, Python, C++, Go, React, Three.js, Node.js, SQL, Redis, Docker, Git, Distributed Systems'
};

const sampleJobPosting = {
  company: 'Google / Premier Tech Enterprise',
  position: 'Junior Software Engineer (Cloud & AI Infra)',
  industry: 'Technology & AI',
  location: 'Bangalore / Hybrid',
  workType: 'Full-Time',
  requirements: 'C++, Python, Go, Distributed Systems, SQL, Git, Linux, problem solving, data structures, algorithms, currently pursuing or completed B.Tech in CS/Engineering',
  education: 'B.Tech / B.Sc in Computer Science, Mathematics, or equivalent practical portfolio',
  experience: '0-2 years (internships and substantial projects accepted)',
  salary: '₹18 - ₹32 LPA / $110,000 - $145,000'
};

function readJson(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error('Storage write failed', err);
  }
}

function tokenize(str) {
  return String(str || '')
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .filter(t => t.length > 1);
}

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState('cv-builder'); // 'cv-builder', 'job-matching', 'tracker', 'interview-prep', 'companies', 'skill-gap'

  // CV Builder State
  const [cvVersions, setCvVersions] = useState(() => readJson(CV_KEY, [defaultCv]));
  const [selectedCvIndex, setSelectedCvIndex] = useState(0);
  const currentCv = cvVersions[selectedCvIndex] || cvVersions[0] || defaultCv;

  // Job Matcher State
  const [targetJob, setTargetJob] = useState(sampleJobPosting);

  // Application Tracker State
  const [applications, setApplications] = useState(() => readJson(TRACKER_KEY, [
    {
      id: 'app-1',
      company: 'Google',
      position: 'Software Engineer — Cloud Infra',
      stage: 'Interview',
      cvVersion: defaultCv.name,
      deadline: '2026-09-15',
      applicationDate: '2026-08-01',
      interviewDate: '2026-08-28',
      followUp: 'Review System Design notes on caching & Raft',
      notes: 'Passed technical screen 1. Next round is behavioral + Distributed Systems design.'
    },
    {
      id: 'app-2',
      company: 'Jane Street / Citadel',
      position: 'Quantitative Systems Developer',
      stage: 'Preparing',
      cvVersion: defaultCv.name,
      deadline: '2026-10-01',
      applicationDate: '',
      interviewDate: '',
      followUp: 'Practice low-latency C++ move semantics & socket programming',
      notes: 'Prepare 3 high-performance portfolio projects.'
    }
  ]));

  // Application Form Modal State
  const [showAppModal, setShowAppModal] = useState(false);
  const [appForm, setAppForm] = useState({
    company: '',
    position: '',
    stage: 'Saved',
    cvVersion: currentCv.name,
    deadline: '',
    applicationDate: '',
    interviewDate: '',
    followUp: '',
    notes: ''
  });

  // Interview Prep State
  const [selectedInterviewRole, setSelectedInterviewRole] = useState('software-engineer');
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // CV Matching Analysis Calculation
  const matchAnalysis = useMemo(() => {
    const allCvText = [
      currentCv.skills,
      currentCv.projects?.map(p => `${p.name} ${p.tools} ${p.desc}`).join(' '),
      currentCv.internships?.map(i => `${i.company} ${i.role} ${i.desc}`).join(' '),
      currentCv.certifications?.join(' ')
    ].join(' ');

    const userTokens = new Set(tokenize(allCvText));
    const reqTokens = Array.from(new Set(tokenize(targetJob.requirements))).filter(t => t.length > 2);

    const strongMatches = reqTokens.filter(t => userTokens.has(t));
    const partialMatches = reqTokens.filter(t => !strongMatches.includes(t) && Array.from(userTokens).some(u => u.includes(t) || t.includes(u)));
    const missingSkills = reqTokens.filter(t => !strongMatches.includes(t) && !partialMatches.includes(t));

    const score = reqTokens.length ? Math.round(((strongMatches.length + partialMatches.length * 0.5) / reqTokens.length) * 100) : 75;

    return {
      score,
      strongMatches,
      partialMatches,
      missingSkills,
      educationMatch: 'Strong Academic Fit (Meets B.Tech / Science Requirement)',
      experienceMatch: currentCv.internships?.length ? 'Demonstrated Internship Experience' : 'Requires project proof of work'
    };
  }, [currentCv, targetJob]);

  const updateCurrentCv = (updater) => {
    const next = [...cvVersions];
    next[selectedCvIndex] = typeof updater === 'function' ? updater(next[selectedCvIndex]) : updater;
    setCvVersions(next);
    writeJson(CV_KEY, next);
  };

  const createNewCvVersion = () => {
    const newCv = {
      ...currentCv,
      id: `cv-${Date.now()}`,
      name: `${currentCv.targetRole || 'Target Role'} CV (v${cvVersions.length + 1})`
    };
    const next = [...cvVersions, newCv];
    setCvVersions(next);
    setSelectedCvIndex(next.length - 1);
    writeJson(CV_KEY, next);
  };

  const deleteCvVersion = (idx) => {
    if (cvVersions.length <= 1) return;
    const next = cvVersions.filter((_, i) => i !== idx);
    setCvVersions(next);
    setSelectedCvIndex(Math.max(0, idx - 1));
    writeJson(CV_KEY, next);
  };

  const saveApplication = (e) => {
    e.preventDefault();
    const newApp = { ...appForm, id: `app-${Date.now()}` };
    const next = [newApp, ...applications];
    setApplications(next);
    writeJson(TRACKER_KEY, next);
    setShowAppModal(false);
  };

  const updateAppStage = (appId, nextStage) => {
    const next = applications.map(a => a.id === appId ? { ...a, stage: nextStage } : a);
    setApplications(next);
    writeJson(TRACKER_KEY, next);
  };

  const deleteApp = (appId) => {
    const next = applications.filter(a => a.id !== appId);
    setApplications(next);
    writeJson(TRACKER_KEY, next);
  };

  const interviewData = interviewQuestionsByRole[selectedInterviewRole] || interviewQuestionsByRole['software-engineer'];

  return (
    <div className="workspace-page">
      <Navbar />

      <main className="workspace-main">
        {/* Workspace Hero */}
        <section className="workspace-hero">
          <div className="badge-pill">🛠️ Student Career Command Center</div>
          <h1 className="workspace-title">My Career Intelligence Workspace</h1>
          <p className="workspace-subtitle">
            Craft targeted CVs, match your qualifications against real job requirements, manage applications across 8 Kanban stages, and practice interview questions.
          </p>

          {/* Navigation Tabs */}
          <div className="workspace-tabs-bar">
            <button className={`w-tab ${activeTab === 'cv-builder' ? 'active' : ''}`} onClick={() => setActiveTab('cv-builder')}>
              <FileText size={16} /> Resume / CV Builder
            </button>
            <button className={`w-tab ${activeTab === 'job-matching' ? 'active' : ''}`} onClick={() => setActiveTab('job-matching')}>
              <Target size={16} /> CV-to-Job Matching
            </button>
            <button className={`w-tab ${activeTab === 'tracker' ? 'active' : ''}`} onClick={() => setActiveTab('tracker')}>
              <BriefcaseBusiness size={16} /> Application Tracker ({applications.length})
            </button>
            <button className={`w-tab ${activeTab === 'interview-prep' ? 'active' : ''}`} onClick={() => setActiveTab('interview-prep')}>
              <Mic size={16} /> Interview Preparation
            </button>
            <button className={`w-tab ${activeTab === 'companies' ? 'active' : ''}`} onClick={() => setActiveTab('companies')}>
              <Building2 size={16} /> Company Research
            </button>
            <button className={`w-tab ${activeTab === 'skill-gap' ? 'active' : ''}`} onClick={() => setActiveTab('skill-gap')}>
              <ClipboardCheck size={16} /> Skill-Gap Analysis
            </button>
          </div>
        </section>

        {/* TAB 1: RESUME / CV BUILDER */}
        {activeTab === 'cv-builder' && (
          <section className="workspace-tab-pane">
            <div className="d-flex justify-between items-center flex-wrap gap-2 mb-3">
              <div className="cv-version-selector">
                <span className="cv-v-label">CV Version:</span>
                <select
                  value={selectedCvIndex}
                  onChange={(e) => setSelectedCvIndex(Number(e.target.value))}
                  className="cv-select"
                >
                  {cvVersions.map((cv, idx) => (
                    <option key={cv.id || idx} value={idx}>{cv.name}</option>
                  ))}
                </select>
                <button className="btn-secondary btn-sm" onClick={createNewCvVersion}>
                  <Plus size={14} /> Duplicate / New Version
                </button>
                {cvVersions.length > 1 && (
                  <button className="btn-icon danger" onClick={() => deleteCvVersion(selectedCvIndex)}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              <div className="cv-actions">
                <button className="btn-primary" onClick={() => window.print()}>
                  <Download size={16} /> Export ATS PDF
                </button>
              </div>
            </div>

            <div className="cv-editor-grid">
              {/* Left Column: Form Editor */}
              <div className="cv-form-container">
                <h3 className="card-subheading">✏️ Resume Content Editor</h3>

                <div className="form-group">
                  <label>Resume Version Name</label>
                  <input
                    type="text"
                    value={currentCv.name}
                    onChange={e => updateCurrentCv(c => ({ ...c, name: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>Target Role Title</label>
                  <input
                    type="text"
                    value={currentCv.targetRole || ''}
                    placeholder="e.g. Software Engineer / Data Scientist / Product Manager"
                    onChange={e => updateCurrentCv(c => ({ ...c, targetRole: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>Technical & Core Skills (comma separated)</label>
                  <textarea
                    rows={3}
                    value={currentCv.skills}
                    onChange={e => updateCurrentCv(c => ({ ...c, skills: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>Key Projects & Open Source</label>
                  <textarea
                    rows={4}
                    value={currentCv.projects?.map(p => `${p.name} (${p.tools}): ${p.desc}`).join('\n\n') || ''}
                    onChange={e => {
                      const lines = e.target.value.split('\n\n');
                      const parsed = lines.map(line => {
                        const [header, ...desc] = line.split(':');
                        return { name: header || 'Project', tools: 'Tools', desc: desc.join(':') || 'Description' };
                      });
                      updateCurrentCv(c => ({ ...c, projects: parsed }));
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Sports & Athletic Achievements (Distinct Section)</label>
                  <textarea
                    rows={2}
                    value={currentCv.sportsAchievements?.join('\n') || ''}
                    placeholder="e.g. State Badminton Finalist, Athletics Team Captain"
                    onChange={e => updateCurrentCv(c => ({ ...c, sportsAchievements: e.target.value.split('\n').filter(Boolean) }))}
                  />
                </div>

                <div className="form-group">
                  <label>Certifications & Accreditations</label>
                  <textarea
                    rows={2}
                    value={currentCv.certifications?.join('\n') || ''}
                    onChange={e => updateCurrentCv(c => ({ ...c, certifications: e.target.value.split('\n').filter(Boolean) }))}
                  />
                </div>
              </div>

              {/* Right Column: Live ATS Resume Preview */}
              <div className="cv-live-preview-container">
                <div className="cv-ats-sheet printable-resume">
                  <div className="ats-header">
                    <h2 className="ats-name">{currentCv.personal?.fullName || 'Candidate Name'}</h2>
                    <p className="ats-contact">
                      {currentCv.personal?.location} · {currentCv.personal?.email} · {currentCv.personal?.github}
                    </p>
                    <p className="ats-target-title">{currentCv.targetRole}</p>
                  </div>

                  <div className="ats-section">
                    <h4 className="ats-section-heading">CORE TECHNICAL PROFICIENCIES</h4>
                    <p className="ats-skills-line">{currentCv.skills}</p>
                  </div>

                  <div className="ats-section">
                    <h4 className="ats-section-heading">EDUCATION & ACADEMICS</h4>
                    {currentCv.education?.map((edu, idx) => (
                      <div key={idx} className="ats-entry">
                        <div className="ats-entry-header">
                          <strong>{edu.school}</strong>
                          <span>{edu.year}</span>
                        </div>
                        <p>{edu.degree} — Grade/CGPA: {edu.gpa}</p>
                      </div>
                    ))}
                  </div>

                  <div className="ats-section">
                    <h4 className="ats-section-heading">SELECTED PROJECTS & SYSTEMS</h4>
                    {currentCv.projects?.map((proj, idx) => (
                      <div key={idx} className="ats-entry">
                        <div className="ats-entry-header">
                          <strong>{proj.name}</strong>
                          <span className="ats-tools">[{proj.tools}]</span>
                        </div>
                        <p>{proj.desc}</p>
                      </div>
                    ))}
                  </div>

                  {currentCv.sportsAchievements?.length > 0 && (
                    <div className="ats-section">
                      <h4 className="ats-section-heading">SPORTS & ATHLETIC ACHIEVEMENTS</h4>
                      <ul className="ats-list">
                        {currentCv.sportsAchievements.map((sp, idx) => (
                          <li key={idx}>🏆 {sp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="ats-section">
                    <h4 className="ats-section-heading">HONORS & CERTIFICATIONS</h4>
                    <ul className="ats-list">
                      {currentCv.certifications?.map((c, idx) => <li key={idx}>• {c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: CV-TO-JOB MATCHING */}
        {activeTab === 'job-matching' && (
          <section className="workspace-tab-pane">
            <div className="d-flex justify-between items-center mb-3">
              <div>
                <h3 className="card-subheading">🎯 Automated CV-to-Job Matching Engine</h3>
                <p className="section-subtext">Evaluate qualification coverage against real job requirements without fabricating skills.</p>
              </div>
            </div>

            <div className="grid-2-col">
              {/* Target Job Requirements Input */}
              <div className="job-input-card">
                <h4 className="card-subheading">Job Posting Requirements</h4>
                <div className="form-group">
                  <label>Company & Role</label>
                  <input
                    type="text"
                    value={`${targetJob.company} — ${targetJob.position}`}
                    onChange={e => setTargetJob({ ...targetJob, position: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Required Skills & Qualifications (Paste from job post)</label>
                  <textarea
                    rows={5}
                    value={targetJob.requirements}
                    onChange={e => setTargetJob({ ...targetJob, requirements: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Education & Experience Filter</label>
                  <input
                    type="text"
                    value={targetJob.education}
                    onChange={e => setTargetJob({ ...targetJob, education: e.target.value })}
                  />
                </div>
              </div>

              {/* Match Score & Analysis Output */}
              <div className="match-analysis-card">
                <div className="match-score-header">
                  <div>
                    <span className="msh-label">Overall Requirement Fit</span>
                    <h2 className="msh-val text-gold">{matchAnalysis.score}% Coverage</h2>
                  </div>
                  <span className={`fit-badge ${matchAnalysis.score >= 75 ? 'high' : 'medium'}`}>
                    {matchAnalysis.score >= 75 ? 'Strong Match' : 'Partial Match'}
                  </span>
                </div>

                <div className="matching-breakdown-lists mt-3">
                  <div className="mb-section">
                    <h5 className="text-green flex items-center gap-1">
                      <CheckCircle2 size={16} /> Strong Matching Skills ({matchAnalysis.strongMatches.length})
                    </h5>
                    <div className="tags-cloud">
                      {matchAnalysis.strongMatches.map(s => <span key={s} className="tag strong">{s}</span>)}
                    </div>
                  </div>

                  <div className="mb-section mt-3">
                    <h5 className="text-gold flex items-center gap-1">
                      <AlertCircle size={16} /> Partial Matches ({matchAnalysis.partialMatches.length})
                    </h5>
                    <div className="tags-cloud">
                      {matchAnalysis.partialMatches.map(s => <span key={s} className="tag partial">{s}</span>)}
                    </div>
                  </div>

                  <div className="mb-section mt-3">
                    <h5 className="text-red flex items-center gap-1">
                      <Trash2 size={16} /> Missing Key Skills ({matchAnalysis.missingSkills.length})
                    </h5>
                    <div className="tags-cloud">
                      {matchAnalysis.missingSkills.map(s => <span key={s} className="tag missing">{s}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: APPLICATION TRACKER KANBAN */}
        {activeTab === 'tracker' && (
          <section className="workspace-tab-pane">
            <div className="d-flex justify-between items-center flex-wrap gap-2 mb-3">
              <div>
                <h3 className="card-subheading">📋 Application Lifecycle Kanban ({applications.length})</h3>
                <p className="section-subtext">Track every submission from Saved to Interview and Offer with deadlines and follow-up alerts.</p>
              </div>
              <button className="btn-primary" onClick={() => setShowAppModal(true)}>
                <Plus size={16} /> Add Application
              </button>
            </div>

            <div className="kanban-board-container">
              {STAGES.map(stage => {
                const stageApps = applications.filter(a => a.stage === stage);
                return (
                  <div key={stage} className="kanban-column">
                    <div className="kanban-col-header">
                      <span className="kch-name">{stage}</span>
                      <span className="kch-count">{stageApps.length}</span>
                    </div>

                    <div className="kanban-cards-stack">
                      {stageApps.map(app => (
                        <div key={app.id} className="kanban-item-card">
                          <div className="kic-header">
                            <strong>{app.position}</strong>
                            <button className="kic-del" onClick={() => deleteApp(app.id)}>×</button>
                          </div>
                          <p className="kic-company">{app.company}</p>
                          {app.deadline && <p className="kic-date">⏰ Deadline: {app.deadline}</p>}
                          {app.interviewDate && <p className="kic-date text-gold">🎤 Interview: {app.interviewDate}</p>}
                          {app.notes && <p className="kic-notes">{app.notes}</p>}

                          <div className="kic-stage-select mt-2">
                            <select
                              value={app.stage}
                              onChange={e => updateAppStage(app.id, e.target.value)}
                              className="stage-dropdown"
                            >
                              {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 4: INTERVIEW PREPARATION */}
        {activeTab === 'interview-prep' && (
          <section className="workspace-tab-pane">
            <div className="d-flex justify-between items-center mb-3">
              <div>
                <h3 className="card-subheading">🎤 Role-Specific Interview Preparation</h3>
                <p className="section-subtext">Practice technical, architectural, and behavioral questions with answer frameworks.</p>
              </div>
              <select
                value={selectedInterviewRole}
                onChange={e => setSelectedInterviewRole(e.target.value)}
                className="role-selector-dropdown"
              >
                <option value="software-engineer">Software Engineer & Systems</option>
                <option value="data-scientist">Data Scientist & AI Engineer</option>
                <option value="doctor">Medical Physician & Surgeon</option>
                <option value="sports-physiotherapist">Sports Physiotherapist</option>
              </select>
            </div>

            <div className="interview-prep-content">
              <div className="checklist-card">
                <h4 className="card-subheading">📋 Interview Readiness Checklist</h4>
                <ul className="readiness-list">
                  {interviewData.preparationChecklist.map((item, idx) => (
                    <li key={idx}><CheckCircle2 size={16} className="text-green" /> {item}</li>
                  ))}
                </ul>
              </div>

              <h4 className="card-subheading mt-4">💡 Technical & Scenario Questions</h4>
              <div className="questions-grid mt-2">
                {interviewData.technicalQuestions.map((q, idx) => (
                  <div key={idx} className="iq-card">
                    <span className="iq-diff-badge">{q.difficulty}</span>
                    <h5 className="iq-title">Q{idx + 1}: {q.question}</h5>
                    <div className="iq-framework-box mt-2">
                      <strong>Recommended Answer Framework:</strong>
                      <p>{q.framework}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: COMPANY RESEARCH */}
        {activeTab === 'companies' && (
          <section className="workspace-tab-pane">
            <h3 className="card-subheading mb-2">🏢 Employer & Organization Intelligence</h3>
            <p className="section-subtext">Verified employer benchmarks, required skills, internship tracks, and compensation ranges.</p>

            <div className="companies-cards-grid mt-3">
              {companyResearchData.map(comp => (
                <div key={comp.id} className="company-info-card">
                  <div className="cic-header">
                    <div>
                      <h4 className="cic-name">{comp.name}</h4>
                      <span className="cic-industry">{comp.industry}</span>
                    </div>
                    <a href={comp.website} target="_blank" rel="noreferrer" className="btn-icon">
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <p className="cic-overview mt-2">{comp.overview}</p>

                  <div className="cic-stats-row mt-3">
                    <div>
                      <span className="cs-lbl">Typical Comp:</span>
                      <span className="cs-val text-green">{comp.medianCompensationINR || comp.medianCompensationUSD}</span>
                    </div>
                    <div>
                      <span className="cs-lbl">HQ Location:</span>
                      <span className="cs-val">{comp.headquarters}</span>
                    </div>
                  </div>

                  <div className="cic-skills-list mt-3">
                    <span className="cs-lbl">Commonly Required Skills:</span>
                    <div className="tags-cloud mt-1">
                      {comp.requiredSkills.map(s => <span key={s} className="tag strong">{s}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 6: SKILL GAP ANALYSIS */}
        {activeTab === 'skill-gap' && (
          <section className="workspace-tab-pane">
            <h3 className="card-subheading">📈 Skill Gap & Upskilling Roadmap</h3>
            <p className="section-subtext">Identify and bridge the gap between your current skills and target dream roles.</p>

            <div className="skill-gap-roadmap-grid mt-3">
              <div className="gap-card">
                <h4 className="text-gold font-bold">1. High-Impact Projects</h4>
                <p className="text-sm text-muted">Build tangible proofs of work to bridge your missing skills:</p>
                <ul className="gap-list mt-2">
                  <li>• Deploy a full-stack low-latency project with automated CI/CD and Docker.</li>
                  <li>• Implement an open-source contribution in systems or machine learning.</li>
                </ul>
              </div>

              <div className="gap-card">
                <h4 className="text-cyan font-bold">2. Target Certifications</h4>
                <p className="text-sm text-muted">Recognized industry credentials for verification:</p>
                <ul className="gap-list mt-2">
                  <li>• AWS Solutions Architect / GCP Professional Cloud Developer.</li>
                  <li>• Certified Kubernetes Administrator (CKA).</li>
                </ul>
              </div>

              <div className="gap-card">
                <h4 className="text-green font-bold">3. Mock Interviews & Feedback</h4>
                <p className="text-sm text-muted">Continuous evaluation:</p>
                <ul className="gap-list mt-2">
                  <li>• Practice 2 peer mock interviews per week.</li>
                  <li>• Measure time-to-solution on medium and hard system design problems.</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Add Application Modal */}
      {showAppModal && (
        <div className="modal-overlay" onClick={() => setShowAppModal(false)}>
          <div className="review-modal-card" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Track New Career Application</h3>
            <form onSubmit={saveApplication} className="review-form mt-3">
              <div className="form-group">
                <label>Company / Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google, Jane Street, Apollo Hospitals"
                  value={appForm.company}
                  onChange={e => setAppForm({ ...appForm, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Position / Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineering Intern"
                  value={appForm.position}
                  onChange={e => setAppForm({ ...appForm, position: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Initial Stage</label>
                <select value={appForm.stage} onChange={e => setAppForm({ ...appForm, stage: e.target.value })}>
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Application Deadline</label>
                <input
                  type="date"
                  value={appForm.deadline}
                  onChange={e => setAppForm({ ...appForm, deadline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Notes & Reminders</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Highlight distributed systems project and prepare STAR stories."
                  value={appForm.notes}
                  onChange={e => setAppForm({ ...appForm, notes: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAppModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save to Application Board</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
