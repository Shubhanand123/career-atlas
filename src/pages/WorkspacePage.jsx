import React, { useMemo, useState, useEffect } from 'react';
import { 
  Download, FileText, BriefcaseBusiness, ClipboardCheck, Mic, Building2, 
  Target, Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Sparkles, ChevronRight,
  TrendingUp, Award, BookOpen, Layers, Star, ExternalLink, RefreshCw, Trophy,
  Search, MapPin, DollarSign, Check, Sliders, Eye, Printer, ShieldCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { companyResearchData, searchCompanies } from '../data/companyResearch';
import { interviewQuestionsByRole } from '../data/interviewQuestions';
import { searchCareerCatalog } from '../data/careerCatalog';
import '../styles/workspace.css';

const CV_KEY = 'careerAtlas.cvVersions.v3';
const TRACKER_KEY = 'careerAtlas.applications.v3';
const STAGES = ['Saved', 'Interested', 'Preparing', 'Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'];

// Pre-built rich templates across major career disciplines
const ROLE_TEMPLATES = {
  'Biomedical Engineer': {
    targetRole: 'Biomedical Engineer / Neural Interface Architect',
    summary: 'Biomedical engineer with 3+ years of research and prototyping experience in implantable biosensors, MEMS devices, and neural signal processing. Proven track record in ISO 13485 compliance and FDA Class III medical device validation.',
    skills: 'Biomaterials, Neural Signal Processing, MATLAB/Simulink, ISO 13485, MEMS Sensors, Embedded C++, Python, Micro-Electrode Arrays, FDA Class III Regulatory',
    education: [
      { school: 'IIT Bombay / Premier University', degree: 'B.Tech / M.S. Biomedical Engineering', year: '2022 - 2026', gpa: '9.1 / 10.0' }
    ],
    experience: [
      { company: 'BioSens Robotics Labs', role: 'Medical Device Engineering Intern', duration: 'May 2025 - Dec 2025', location: 'Zurich / Bengaluru', desc: '• Designed and calibrated micro-electrode array firmware, increasing signal-to-noise ratio by 28%.\n• Authored 4 validation protocols for ISO 13485 clinical audit compliance.\n• Co-developed non-invasive EMG prosthetic sensor interface with sub-12ms response latency.' }
    ],
    projects: [
      { name: 'Microprocessor-Controlled Bionic Arm', tools: 'Embedded C++, ARM Cortex, 3D CAD, EMG Sensors', desc: 'Built 6-degree-of-freedom myoelectric prosthetic arm with adaptive grip classification achieving 94% intent accuracy.' },
      { name: 'Neural Spike Sorting Pipeline', tools: 'Python, PyTorch, SciPy, Wavelet Transforms', desc: 'Engineered real-time neural spike sorting algorithm processing 64-channel extracellular electrophysiology streams.' }
    ],
    certifications: ['Certified Biomedical Auditor (CBA)', 'Regulatory Affairs Certification (RAC)'],
    achievements: ['1st Place — Global Bio-Design Hackathon', 'Published in IEEE Transactions on Biomedical Engineering']
  },
  'AI Research Scientist': {
    targetRole: 'AI Research Scientist / Foundation Model Architect',
    summary: 'Machine learning researcher specializing in transformer architectures, distributed GPU training optimization, and multi-step reasoning capabilities. Author of accepted papers at top AI conferences (NeurIPS/ICML).',
    skills: 'PyTorch, CUDA C/C++, Distributed Training (DeepSpeed/Megatron), Transformer Kernels, RLHF/RLAIF, Linear Algebra, Triton, FlashAttention, JAX',
    education: [
      { school: 'IIT Delhi / Carnegie Mellon University', degree: 'B.Tech / Ph.D. Computer Science & AI', year: '2021 - 2025', gpa: '3.95 / 4.0' }
    ],
    experience: [
      { company: 'Frontier AI Research Labs', role: 'Applied ML Research Fellow', duration: 'June 2024 - Present', location: 'London / Remote', desc: '• Optimized attention kernel computation in custom Triton shaders, yielding 1.38x speedup on NVIDIA H100 clusters.\n• Led post-training alignment research with Direct Preference Optimization (DPO) for code reasoning.\n• Scaled 14B parameter multimodal model pre-training across 512-GPU Slurm cluster.' }
    ],
    projects: [
      { name: 'Sparse FlashAttention Custom CUDA Kernel', tools: 'C++, CUDA, PyTorch C++ Extension', desc: 'Implemented memory-efficient block-sparse attention kernel achieving 85% theoretical roofline bandwidth on Hopper architecture.' },
      { name: 'Autonomous Tool-Calling Agent Framework', tools: 'Python, Asyncio, FastAPI, Vector Search', desc: 'Built multi-turn agent evaluation benchmark with structured JSON output and self-reflection loops.' }
    ],
    certifications: ['DeepLearning.AI Generative AI for LLMs Specialization', 'NVIDIA Certified CUDA Developer'],
    achievements: ['Oral Presentation at NeurIPS 2025', 'ACM ICPC World Finalist']
  },
  'Quantitative Trader / Researcher': {
    targetRole: 'Quantitative Trader / High-Frequency Strategist',
    summary: 'Quantitative researcher with deep background in stochastic calculus, statistical arbitrage, and ultra-low latency C++ execution engines. Experience modeling limit order book microstructure and backtesting statistical alphas.',
    skills: 'Modern C++ (C++20), Python (Polars/NumPy), Stochastic Calculus, Statistical Arbitrage, Order Book Microstructure, Linux Kernel Bypass, FPGA, Time-Series Forecasting',
    education: [
      { school: 'IIT Kanpur / Princeton University', degree: 'B.Tech / M.S. Mathematics & Computing', year: '2022 - 2026', gpa: '9.4 / 10.0' }
    ],
    experience: [
      { company: 'High-Frequency Market Making Firm', role: 'Quantitative Trading Intern', duration: 'May 2025 - Aug 2025', location: 'Chicago / Singapore', desc: '• Designed tick-level mean-reversion alpha strategy on equity futures achieving Sharpe Ratio of 3.4 in historical backtests.\n• Profiling C++ order processing pipeline using perf/valgrind, shaving 450ns off socket-to-wire latency.\n• Built automated portfolio risk-limits monitor calculating real-time intraday VaR.' }
    ],
    projects: [
      { name: 'Ultra-Low Latency Order Book Engine', tools: 'Modern C++20, Lock-Free Queues, Linux Solarflare', desc: 'Engineered cache-aligned L3 limit order book processing 10,000,000 market events/sec with zero heap allocations in hot-path.' },
      { name: 'Stochastic Volatility Calibration Suite', tools: 'Python, C++, Heston Model, Monte Carlo', desc: 'Implemented calibration of Heston stochastic volatility models on live options chains using differential evolution.' }
    ],
    certifications: ['Chartered Financial Analyst (CFA) Level 1 Passed', 'CQF (Certificate in Quantitative Finance)'],
    achievements: ['National Mathematics Olympiad Gold Medalist', 'Top 5 in WorldQuant Global Alpha Challenge']
  }
};

const defaultCv = {
  id: 'cv-1',
  name: 'Engineering & Technology Master CV',
  targetRole: 'Software Engineer / Distributed Systems',
  templateStyle: 'minimal-dark', // 'minimal-dark', 'ats-classic', 'systems-mono'
  personal: {
    fullName: 'Candidate Name',
    email: 'candidate@careeratlas.edu',
    phone: '+91 98765 43210',
    location: 'Bengaluru / San Francisco / London',
    github: 'github.com/profile',
    linkedin: 'linkedin.com/in/profile',
    portfolio: 'portfolio.dev'
  },
  summary: 'Passionate engineer with experience designing scalable distributed architectures, high-performance computing pipelines, and clean user experiences.',
  education: [
    { school: 'Premier Technological University / IIT', degree: 'B.Tech Computer Science & Engineering', year: '2022 - 2026', gpa: '8.9 / 10.0' },
    { school: 'Senior Secondary High School', degree: 'Class 12 Science (PCM + CS)', year: '2020 - 2022', gpa: '95.2%' }
  ],
  skills: 'JavaScript, TypeScript, Python, C++, Go, React, Distributed Systems, SQL, Redis, Docker, Git, Linux Kernel, Cloud Infra',
  experience: [
    { company: 'Distributed Systems Labs', role: 'Software Engineering Intern', duration: 'May 2025 - July 2025', location: 'Bengaluru / Remote', desc: '• Optimized high-throughput telemetry ingestion pipeline, reducing p99 latency by 34%.\n• Designed fault-tolerant Kafka stream partitioner processing 50k events/sec.' }
  ],
  projects: [
    { name: 'Career Atlas — Global Career Intelligence Platform', tools: 'React, Three.js, Vite, Fast Search Indexing', desc: 'Built full-stack multi-dimensional career and institution discovery portal supporting 15,000+ occupation nodes and True-Cost calculation.' },
    { name: 'Distributed Key-Value Store with Raft Consensus', tools: 'Go, gRPC, Protobuf, LevelDB', desc: 'Implemented leader election, log replication, and snapshotting across 5-node cluster with sub-10ms failover.' }
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
  showSports: true,
  languages: ['English (Fluent)', 'Hindi (Native)']
};

const sampleJobPosting = {
  company: 'Google / Frontier Tech Enterprise',
  position: 'Software Engineer / Systems Specialist',
  industry: 'Technology & AI',
  location: 'Bengaluru / Hybrid',
  workType: 'Full-Time',
  requirements: 'C++, Python, Go, Distributed Systems, SQL, Git, Linux, problem solving, data structures, algorithms, currently pursuing or completed B.Tech in CS/Engineering',
  education: 'B.Tech / B.Sc in Computer Science, Mathematics, or equivalent practical portfolio',
  experience: '0-2 years (internships and substantial projects accepted)',
  salary: '₹18 - ₹35 LPA / $120,000 - $160,000'
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
  const [activeTab, setActiveTab] = useState('cv-builder'); // 'cv-builder', 'companies', 'job-matching', 'tracker', 'interview-prep'

  // CV Builder State
  const [cvVersions, setCvVersions] = useState(() => readJson(CV_KEY, [defaultCv]));
  const [selectedCvIndex, setSelectedCvIndex] = useState(0);
  const currentCv = cvVersions[selectedCvIndex] || cvVersions[0] || defaultCv;

  // Career Auto-Template Search State
  const [careerTemplateSearch, setCareerTemplateSearch] = useState('');
  const [careerSearchResults, setCareerSearchResults] = useState([]);
  const [isSearchingCareers, setIsSearchingCareers] = useState(false);

  // 1000+ Company Explorer State
  const [companySearch, setCompanySearch] = useState('');
  const [companyIndustryFilter, setCompanyIndustryFilter] = useState('all');
  const [selectedCompanyDetail, setSelectedCompanyDetail] = useState(companyResearchData[0]);

  // Job Matcher State
  const [targetJob, setTargetJob] = useState(sampleJobPosting);

  // Application Tracker State
  const [applications, setApplications] = useState(() => readJson(TRACKER_KEY, [
    {
      id: 'app-1',
      company: 'Google',
      position: 'Software Engineer — Cloud & AI Infra',
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
      company: 'Citadel / Jane Street',
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

  // Application Modal State
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

  // Search careers for template generation
  useEffect(() => {
    if (!careerTemplateSearch.trim()) {
      setCareerSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await searchCareerCatalog({ query: careerTemplateSearch, limit: 6 });
        setCareerSearchResults(res.items || []);
      } catch {
        setCareerSearchResults([]);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [careerTemplateSearch]);

  // Filter 1000+ companies
  const filteredCompanies = useMemo(() => {
    let list = searchCompanies(companySearch, 100);
    if (companyIndustryFilter !== 'all') {
      list = list.filter(c => c.industry.toLowerCase().includes(companyIndustryFilter.toLowerCase()));
    }
    return list;
  }, [companySearch, companyIndustryFilter]);

  // CV Matching Analysis Calculation
  const matchAnalysis = useMemo(() => {
    const allCvText = [
      currentCv.skills,
      currentCv.summary,
      currentCv.projects?.map(p => `${p.name} ${p.tools} ${p.desc}`).join(' '),
      currentCv.experience?.map(i => `${i.company} ${i.role} ${i.desc}`).join(' '),
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
      educationMatch: 'Strong Academic Fit (Meets Degree Requirement)',
      experienceMatch: currentCv.experience?.length ? 'Demonstrated Professional Experience' : 'Requires project proof of work'
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

  // Load a tailored template for any of the 15,000+ careers
  const loadCareerTemplate = (careerName) => {
    const template = ROLE_TEMPLATES[careerName] || {
      targetRole: careerName,
      summary: `Dedicated professional specializing in ${careerName} with practical skills, rigorous academic foundation, and quantifiable project outcomes.`,
      skills: 'Domain Principles, Problem Solving, Analytical Methodology, System Design, Team Collaboration, Technical Documentation',
      education: [
        { school: 'Premier University / Institute', degree: `Degree in ${careerName} / Related Discipline`, year: '2022 - 2026', gpa: '9.0 / 10.0' }
      ],
      experience: [
        { company: `${careerName} Practice & Innovation Labs`, role: `Associate ${careerName}`, duration: 'May 2025 - Present', location: 'Hybrid / On-Site', desc: `• Led domain execution on key operational milestones, achieving 24% measurable improvement in efficiency.\n• Authored comprehensive technical documentation and standardized protocols.\n• Collaborated with multidisciplinary teams to deliver high-quality outcomes.` }
      ],
      projects: [
        { name: `${careerName} Capstone Implementation`, tools: 'Modern Toolchain, Analytical Frameworks', desc: `Designed and executed end-to-end practical solution for real-world ${careerName.toLowerCase()} challenges.` }
      ],
      certifications: [`Accredited Certification in ${careerName}`],
      achievements: [`Excellence Award in ${careerName} Innovation`]
    };

    updateCurrentCv(c => ({
      ...c,
      name: `${careerName} Resume`,
      targetRole: template.targetRole,
      summary: template.summary,
      skills: template.skills,
      education: template.education,
      experience: template.experience,
      projects: template.projects,
      certifications: template.certifications,
      achievements: template.achievements
    }));

    setCareerTemplateSearch('');
    setCareerSearchResults([]);
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

  return (
    <div className="workspace-page">
      <Navbar />

      <main className="workspace-main">
        {/* Workspace Hero */}
        <section className="workspace-hero">
          <div className="badge-pill">🛠️ Student Career Command Center</div>
          <h1 className="workspace-title">Career Intelligence Workspace</h1>
          <p className="workspace-subtitle">
            Craft targeted CVs for any of 15,000+ careers, explore 1,000+ verified global employers, audit ATS compatibility, and manage multi-stage job applications.
          </p>

          {/* Navigation Tabs */}
          <div className="workspace-tabs-bar">
            <button className={`w-tab ${activeTab === 'cv-builder' ? 'active' : ''}`} onClick={() => setActiveTab('cv-builder')}>
              <FileText size={16} /> Resume / CV Builder
            </button>
            <button className={`w-tab ${activeTab === 'companies' ? 'active' : ''}`} onClick={() => setActiveTab('companies')}>
              <Building2 size={16} /> 1,000+ Companies Explorer
            </button>
            <button className={`w-tab ${activeTab === 'job-matching' ? 'active' : ''}`} onClick={() => setActiveTab('job-matching')}>
              <Target size={16} /> CV-to-Job Matching ({matchAnalysis.score}% Fit)
            </button>
            <button className={`w-tab ${activeTab === 'tracker' ? 'active' : ''}`} onClick={() => setActiveTab('tracker')}>
              <BriefcaseBusiness size={16} /> Application Tracker ({applications.length})
            </button>
            <button className={`w-tab ${activeTab === 'interview-prep' ? 'active' : ''}`} onClick={() => setActiveTab('interview-prep')}>
              <Mic size={16} /> Interview Prep
            </button>
          </div>
        </section>

        {/* TAB 1: RESUME / CV BUILDER */}
        {activeTab === 'cv-builder' && (
          <section className="workspace-tab-pane">
            {/* Top Toolbar */}
            <div className="cv-top-toolbar mb-4">
              <div className="cv-version-controls">
                <span className="cv-v-label">Resume Version:</span>
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

              {/* Template Style Switcher */}
              <div className="cv-style-controls">
                <span className="cv-v-label">Preview Theme:</span>
                <select
                  value={currentCv.templateStyle || 'minimal-dark'}
                  onChange={(e) => updateCurrentCv(c => ({ ...c, templateStyle: e.target.value }))}
                  className="cv-select"
                >
                  <option value="minimal-dark">Gen Z Modern (Dark + Accent)</option>
                  <option value="ats-classic">Classic ATS Standard (Crisp White)</option>
                  <option value="systems-mono">Technical / Quant Monospace</option>
                </select>
                <button className="btn-primary btn-sm" onClick={() => window.print()}>
                  <Printer size={15} /> Print / Export PDF
                </button>
              </div>
            </div>

            {/* 1-Click 15,000+ Career Template Generator */}
            <div className="career-template-banner mb-4">
              <div className="d-flex justify-between items-center flex-wrap gap-2">
                <div className="template-banner-info">
                  <span className="badge category">15,000+ Career Autocomplete</span>
                  <h3 className="banner-title">✨ Load AI-Optimized Role Template</h3>
                  <p className="banner-desc">Type any career from our 15,000+ database to auto-populate skills, project STAR bullets, and certifications.</p>
                </div>

                <div className="template-search-wrap">
                  <div className="search-input-field">
                    <Search size={16} className="text-dim" />
                    <input
                      type="text"
                      placeholder="Search career (e.g. Biomedical Engineer, AI Scientist, Quant Trader, Surgeon)..."
                      value={careerTemplateSearch}
                      onChange={(e) => setCareerTemplateSearch(e.target.value)}
                    />
                  </div>

                  {careerSearchResults.length > 0 && (
                    <div className="template-search-dropdown">
                      {careerSearchResults.map(item => (
                        <button
                          key={item.id}
                          className="template-drop-row"
                          onClick={() => loadCareerTemplate(item.name)}
                        >
                          <span className="drop-name">{item.name}</span>
                          <span className="drop-cat">{item.category}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Template Chips */}
              <div className="quick-template-chips mt-2">
                <span className="chip-label">Quick Presets:</span>
                <button className="q-pill" onClick={() => loadCareerTemplate('Biomedical Engineer')}>🩺 Biomedical Engineer</button>
                <button className="q-pill" onClick={() => loadCareerTemplate('AI Research Scientist')}>⚡ AI Research Scientist</button>
                <button className="q-pill" onClick={() => loadCareerTemplate('Quantitative Trader / Researcher')}>📈 Quantitative Trader</button>
              </div>
            </div>

            {/* Editor Grid: Left Form + Right Live ATS Preview */}
            <div className="cv-editor-grid">
              {/* Left Column: Modular Editor */}
              <div className="cv-form-container">
                <h3 className="card-subheading">✏️ Resume Content Editor</h3>

                {/* Personal Information */}
                <div className="editor-group-card mb-3">
                  <h4 className="group-title">1. Personal & Contact Details</h4>
                  <div className="grid-2-col gap-2">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={currentCv.personal?.fullName || ''}
                        onChange={e => updateCurrentCv(c => ({ ...c, personal: { ...c.personal, fullName: e.target.value } }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={currentCv.personal?.email || ''}
                        onChange={e => updateCurrentCv(c => ({ ...c, personal: { ...c.personal, email: e.target.value } }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        value={currentCv.personal?.phone || ''}
                        onChange={e => updateCurrentCv(c => ({ ...c, personal: { ...c.personal, phone: e.target.value } }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Location (City, Country)</label>
                      <input
                        type="text"
                        value={currentCv.personal?.location || ''}
                        onChange={e => updateCurrentCv(c => ({ ...c, personal: { ...c.personal, location: e.target.value } }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>GitHub / Portfolio Link</label>
                      <input
                        type="text"
                        value={currentCv.personal?.github || ''}
                        onChange={e => updateCurrentCv(c => ({ ...c, personal: { ...c.personal, github: e.target.value } }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>LinkedIn URL</label>
                      <input
                        type="text"
                        value={currentCv.personal?.linkedin || ''}
                        onChange={e => updateCurrentCv(c => ({ ...c, personal: { ...c.personal, linkedin: e.target.value } }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Target Role & Summary */}
                <div className="editor-group-card mb-3">
                  <h4 className="group-title">2. Target Role & Executive Summary</h4>
                  <div className="form-group">
                    <label>Target Role Title</label>
                    <input
                      type="text"
                      value={currentCv.targetRole || ''}
                      placeholder="e.g. Biomedical Engineer / Neural Interface Architect"
                      onChange={e => updateCurrentCv(c => ({ ...c, targetRole: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Professional Summary</label>
                    <textarea
                      rows={3}
                      value={currentCv.summary || ''}
                      placeholder="Concise 2-3 sentence overview of your domain expertise and key quantifiable impacts..."
                      onChange={e => updateCurrentCv(c => ({ ...c, summary: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="editor-group-card mb-3">
                  <h4 className="group-title">3. Core Skills & Technical Proficiencies</h4>
                  <div className="form-group">
                    <label>Skills List (comma-separated)</label>
                    <textarea
                      rows={3}
                      value={currentCv.skills || ''}
                      onChange={e => updateCurrentCv(c => ({ ...c, skills: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Work Experience */}
                <div className="editor-group-card mb-3">
                  <h4 className="group-title">4. Professional Experience & Internships</h4>
                  {currentCv.experience?.map((exp, idx) => (
                    <div key={idx} className="sub-entry-box mb-2">
                      <div className="grid-2-col gap-2">
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={e => {
                            const nextExp = [...currentCv.experience];
                            nextExp[idx].company = e.target.value;
                            updateCurrentCv(c => ({ ...c, experience: nextExp }));
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Role Title"
                          value={exp.role}
                          onChange={e => {
                            const nextExp = [...currentCv.experience];
                            nextExp[idx].role = e.target.value;
                            updateCurrentCv(c => ({ ...c, experience: nextExp }));
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g. May 2025 - Aug 2025)"
                          value={exp.duration}
                          onChange={e => {
                            const nextExp = [...currentCv.experience];
                            nextExp[idx].duration = e.target.value;
                            updateCurrentCv(c => ({ ...c, experience: nextExp }));
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. Zurich / Remote)"
                          value={exp.location}
                          onChange={e => {
                            const nextExp = [...currentCv.experience];
                            nextExp[idx].location = e.target.value;
                            updateCurrentCv(c => ({ ...c, experience: nextExp }));
                          }}
                        />
                      </div>
                      <textarea
                        rows={3}
                        className="mt-2"
                        placeholder="Bullet points (Start each with • and include quantified results)..."
                        value={exp.desc}
                        onChange={e => {
                          const nextExp = [...currentCv.experience];
                          nextExp[idx].desc = e.target.value;
                          updateCurrentCv(c => ({ ...c, experience: nextExp }));
                        }}
                      />
                      <button
                        className="btn-text-danger mt-1"
                        onClick={() => {
                          const nextExp = currentCv.experience.filter((_, i) => i !== idx);
                          updateCurrentCv(c => ({ ...c, experience: nextExp }));
                        }}
                      >
                        Remove Experience
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn-secondary btn-sm mt-2"
                    onClick={() => {
                      const nextExp = [...(currentCv.experience || []), { company: '', role: '', duration: '', location: '', desc: '' }];
                      updateCurrentCv(c => ({ ...c, experience: nextExp }));
                    }}
                  >
                    + Add Experience Entry
                  </button>
                </div>

                {/* Key Projects */}
                <div className="editor-group-card mb-3">
                  <h4 className="group-title">5. Selected Projects & Proof of Work</h4>
                  {currentCv.projects?.map((proj, idx) => (
                    <div key={idx} className="sub-entry-box mb-2">
                      <div className="grid-2-col gap-2">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={proj.name}
                          onChange={e => {
                            const nextProj = [...currentCv.projects];
                            nextProj[idx].name = e.target.value;
                            updateCurrentCv(c => ({ ...c, projects: nextProj }));
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Tech Stack / Tools (e.g. C++, PyTorch, Docker)"
                          value={proj.tools}
                          onChange={e => {
                            const nextProj = [...currentCv.projects];
                            nextProj[idx].tools = e.target.value;
                            updateCurrentCv(c => ({ ...c, projects: nextProj }));
                          }}
                        />
                      </div>
                      <textarea
                        rows={2}
                        className="mt-2"
                        placeholder="Project description and key architectural highlights..."
                        value={proj.desc}
                        onChange={e => {
                          const nextProj = [...currentCv.projects];
                          nextProj[idx].desc = e.target.value;
                          updateCurrentCv(c => ({ ...c, projects: nextProj }));
                        }}
                      />
                      <button
                        className="btn-text-danger mt-1"
                        onClick={() => {
                          const nextProj = currentCv.projects.filter((_, i) => i !== idx);
                          updateCurrentCv(c => ({ ...c, projects: nextProj }));
                        }}
                      >
                        Remove Project
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn-secondary btn-sm mt-2"
                    onClick={() => {
                      const nextProj = [...(currentCv.projects || []), { name: '', tools: '', desc: '' }];
                      updateCurrentCv(c => ({ ...c, projects: nextProj }));
                    }}
                  >
                    + Add Project Entry
                  </button>
                </div>

                {/* Education */}
                <div className="editor-group-card mb-3">
                  <h4 className="group-title">6. Education & Academics</h4>
                  {currentCv.education?.map((edu, idx) => (
                    <div key={idx} className="sub-entry-box mb-2">
                      <div className="grid-2-col gap-2">
                        <input
                          type="text"
                          placeholder="University / Institute Name"
                          value={edu.school}
                          onChange={e => {
                            const nextEdu = [...currentCv.education];
                            nextEdu[idx].school = e.target.value;
                            updateCurrentCv(c => ({ ...c, education: nextEdu }));
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Degree Title (e.g. B.Tech Biomedical Engineering)"
                          value={edu.degree}
                          onChange={e => {
                            const nextEdu = [...currentCv.education];
                            nextEdu[idx].degree = e.target.value;
                            updateCurrentCv(c => ({ ...c, education: nextEdu }));
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Graduation Year (e.g. 2022 - 2026)"
                          value={edu.year}
                          onChange={e => {
                            const nextEdu = [...currentCv.education];
                            nextEdu[idx].year = e.target.value;
                            updateCurrentCv(c => ({ ...c, education: nextEdu }));
                          }}
                        />
                        <input
                          type="text"
                          placeholder="GPA / CGPA / Percentage"
                          value={edu.gpa}
                          onChange={e => {
                            const nextEdu = [...currentCv.education];
                            nextEdu[idx].gpa = e.target.value;
                            updateCurrentCv(c => ({ ...c, education: nextEdu }));
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certifications & Optional Sections */}
                <div className="editor-group-card mb-3">
                  <h4 className="group-title">7. Certifications, Honors & Optional Sections</h4>
                  <div className="form-group">
                    <label>Certifications & Accreditations (one per line)</label>
                    <textarea
                      rows={2}
                      value={currentCv.certifications?.join('\n') || ''}
                      onChange={e => updateCurrentCv(c => ({ ...c, certifications: e.target.value.split('\n').filter(Boolean) }))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Honors, Hackathons & Awards (one per line)</label>
                    <textarea
                      rows={2}
                      value={currentCv.achievements?.join('\n') || ''}
                      onChange={e => updateCurrentCv(c => ({ ...c, achievements: e.target.value.split('\n').filter(Boolean) }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="d-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={currentCv.showSports !== false}
                        onChange={e => updateCurrentCv(c => ({ ...c, showSports: e.target.checked }))}
                      />
                      <span>Include Sports / Athletic Leadership (Optional)</span>
                    </label>
                    {currentCv.showSports !== false && (
                      <textarea
                        rows={2}
                        className="mt-1"
                        placeholder="e.g. State Badminton Finalist, Inter-College Athletics Captain"
                        value={currentCv.sportsAchievements?.join('\n') || ''}
                        onChange={e => updateCurrentCv(c => ({ ...c, sportsAchievements: e.target.value.split('\n').filter(Boolean) }))}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Live ATS Resume Preview */}
              <div className="cv-live-preview-container">
                <div className={`cv-ats-sheet printable-resume ${currentCv.templateStyle || 'minimal-dark'}`}>
                  <div className="ats-header">
                    <h2 className="ats-name">{currentCv.personal?.fullName || 'Candidate Name'}</h2>
                    <p className="ats-target-title">{currentCv.targetRole || 'Target Role'}</p>
                    <p className="ats-contact">
                      {currentCv.personal?.location} · {currentCv.personal?.email} · {currentCv.personal?.phone}
                      {currentCv.personal?.github && ` · ${currentCv.personal?.github}`}
                      {currentCv.personal?.linkedin && ` · ${currentCv.personal?.linkedin}`}
                    </p>
                  </div>

                  {currentCv.summary && (
                    <div className="ats-section">
                      <h4 className="ats-section-heading">PROFESSIONAL SUMMARY</h4>
                      <p className="ats-summary-text">{currentCv.summary}</p>
                    </div>
                  )}

                  <div className="ats-section">
                    <h4 className="ats-section-heading">CORE TECHNICAL PROFICIENCIES</h4>
                    <p className="ats-skills-line">{currentCv.skills}</p>
                  </div>

                  {currentCv.experience?.length > 0 && (
                    <div className="ats-section">
                      <h4 className="ats-section-heading">PROFESSIONAL EXPERIENCE</h4>
                      {currentCv.experience.map((exp, idx) => (
                        <div key={idx} className="ats-entry">
                          <div className="ats-entry-header">
                            <strong>{exp.role} — {exp.company}</strong>
                            <span>{exp.duration}</span>
                          </div>
                          {exp.location && <div className="ats-loc">{exp.location}</div>}
                          <div className="ats-desc-bullets">
                            {exp.desc?.split('\n').map((bullet, bIdx) => (
                              <p key={bIdx} className="ats-bullet">{bullet}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentCv.projects?.length > 0 && (
                    <div className="ats-section">
                      <h4 className="ats-section-heading">SELECTED PROJECTS & SYSTEMS</h4>
                      {currentCv.projects.map((proj, idx) => (
                        <div key={idx} className="ats-entry">
                          <div className="ats-entry-header">
                            <strong>{proj.name}</strong>
                            <span className="ats-tools">[{proj.tools}]</span>
                          </div>
                          <p className="ats-desc-p">{proj.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

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

                  {currentCv.certifications?.length > 0 && (
                    <div className="ats-section">
                      <h4 className="ats-section-heading">CERTIFICATIONS & ACCREDITATIONS</h4>
                      <ul className="ats-list">
                        {currentCv.certifications.map((c, idx) => <li key={idx}>• {c}</li>)}
                      </ul>
                    </div>
                  )}

                  {currentCv.achievements?.length > 0 && (
                    <div className="ats-section">
                      <h4 className="ats-section-heading">HONORS & AWARDS</h4>
                      <ul className="ats-list">
                        {currentCv.achievements.map((a, idx) => <li key={idx}>• {a}</li>)}
                      </ul>
                    </div>
                  )}

                  {currentCv.showSports !== false && currentCv.sportsAchievements?.length > 0 && (
                    <div className="ats-section">
                      <h4 className="ats-section-heading">LEADERSHIP & ATHLETIC ACHIEVEMENTS</h4>
                      <ul className="ats-list">
                        {currentCv.sportsAchievements.map((sp, idx) => (
                          <li key={idx}>🏆 {sp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: 1,000+ COMPANY RESEARCH EXPLORER */}
        {activeTab === 'companies' && (
          <section className="workspace-tab-pane">
            <div className="company-explorer-header mb-4">
              <div className="d-flex justify-between items-center flex-wrap gap-3">
                <div>
                  <span className="badge category">1,000+ Employer Intelligence</span>
                  <h3 className="card-subheading">🏢 Global Company Intelligence & Compensation Directory</h3>
                  <p className="section-subtext">Verified employer profiles across Big Tech, Quant Finance, Aerospace, Healthcare, Biotech, Semis, and High-Growth Unicorns.</p>
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <input
                    type="text"
                    placeholder="Search 1,000+ companies (e.g. Google, Jane Street, SpaceX, TSMC)..."
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                    className="company-search-field"
                  />
                  <select
                    value={companyIndustryFilter}
                    onChange={(e) => setCompanyIndustryFilter(e.target.value)}
                    className="company-cat-select"
                  >
                    <option value="all">All Industries ({companyResearchData.length})</option>
                    <option value="Technology">Tech & Cloud</option>
                    <option value="Quantitative">Quant & Finance</option>
                    <option value="Aerospace">Aerospace & Robotics</option>
                    <option value="Healthcare">Healthcare & Medicine</option>
                    <option value="Semiconductor">Semiconductors</option>
                    <option value="Consulting">Consulting & Strategy</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="company-explorer-layout">
              {/* Company List Sidebar */}
              <div className="company-sidebar-list">
                <span className="list-count-badge">Showing {filteredCompanies.length} Companies</span>
                <div className="company-cards-stack mt-2">
                  {filteredCompanies.map((comp) => (
                    <div
                      key={comp.id}
                      className={`company-preview-card ${selectedCompanyDetail?.id === comp.id ? 'active' : ''}`}
                      onClick={() => setSelectedCompanyDetail(comp)}
                    >
                      <div className="c-head">
                        <strong className="c-name">{comp.name}</strong>
                        <span className="c-badge-pill">{comp.industry.split('&')[0]}</span>
                      </div>
                      <span className="c-loc"><MapPin size={11} /> {comp.headquarters}</span>
                      <div className="c-comp-line">
                        <span className="c-inr text-cyan">{comp.medianCompensationINR}</span>
                        <span className="c-usd text-dim">{comp.medianCompensationUSD}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Company Intelligence Dossier */}
              {selectedCompanyDetail && (
                <div className="company-detail-pane">
                  <div className="company-dossier-card">
                    <div className="d-flex justify-between items-start flex-wrap gap-3">
                      <div>
                        <span className="badge category">{selectedCompanyDetail.industry}</span>
                        <h2 className="dossier-name">{selectedCompanyDetail.name}</h2>
                        <span className="dossier-loc"><MapPin size={14} /> HQ: {selectedCompanyDetail.headquarters}</span>
                      </div>
                      <div className="hiring-status-badge">
                        <span className="pulse-dot" /> {selectedCompanyDetail.hiringStatus}
                      </div>
                    </div>

                    <p className="dossier-overview mt-3">{selectedCompanyDetail.overview}</p>

                    <div className="dossier-stats-grid mt-4">
                      <div className="d-stat">
                        <span className="ds-label">India Comp Range</span>
                        <strong className="ds-val text-cyan">{selectedCompanyDetail.medianCompensationINR}</strong>
                      </div>
                      <div className="d-stat">
                        <span className="ds-label">Global Comp (USD)</span>
                        <strong className="ds-val text-green">{selectedCompanyDetail.medianCompensationUSD}</strong>
                      </div>
                      <div className="d-stat">
                        <span className="ds-label">Interview Difficulty</span>
                        <strong className="ds-val text-gold">{selectedCompanyDetail.interviewDifficulty}</strong>
                      </div>
                    </div>

                    <div className="dossier-section mt-4">
                      <h4 className="d-sec-title">Popular Roles & Career Tracks</h4>
                      <div className="roles-chips-wrap">
                        {selectedCompanyDetail.popularRoles?.map((r, i) => (
                          <span key={i} className="role-tag-pill">{r}</span>
                        ))}
                      </div>
                    </div>

                    <div className="dossier-section mt-4">
                      <h4 className="d-sec-title">Core Required Skills & Toolchains</h4>
                      <div className="skills-chips-wrap">
                        {selectedCompanyDetail.requiredSkills?.map((s, i) => (
                          <span key={i} className="skill-tag-pill">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="dossier-section mt-4">
                      <h4 className="d-sec-title">Culture & Engineering Values</h4>
                      <div className="culture-chips-wrap">
                        {selectedCompanyDetail.cultureKeywords?.map((k, i) => (
                          <span key={i} className="culture-tag-pill">✨ {k}</span>
                        ))}
                      </div>
                    </div>

                    <div className="dossier-actions mt-4">
                      <a href={selectedCompanyDetail.website} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        Visit Careers Portal <ExternalLink size={14} />
                      </a>
                      <button
                        className="btn-secondary"
                        onClick={() => {
                          setTargetJob({
                            company: selectedCompanyDetail.name,
                            position: selectedCompanyDetail.popularRoles[0] || 'Software Engineer',
                            industry: selectedCompanyDetail.industry,
                            location: selectedCompanyDetail.headquarters,
                            workType: 'Full-Time',
                            requirements: selectedCompanyDetail.requiredSkills.join(', '),
                            education: 'B.Tech / B.Sc / Equivalent Degree',
                            experience: '0-3 years',
                            salary: `${selectedCompanyDetail.medianCompensationINR} / ${selectedCompanyDetail.medianCompensationUSD}`
                          });
                          setActiveTab('job-matching');
                        }}
                      >
                        Match Current CV Against {selectedCompanyDetail.name} →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 3: CV-TO-JOB MATCHING */}
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
                    onChange={e => setTargetJob(j => ({ ...j, position: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Required Skills & Technologies</label>
                  <textarea
                    rows={4}
                    value={targetJob.requirements}
                    onChange={e => setTargetJob(j => ({ ...j, requirements: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Compensation & Location</label>
                  <input
                    type="text"
                    value={`${targetJob.salary} · ${targetJob.location}`}
                    onChange={e => setTargetJob(j => ({ ...j, salary: e.target.value }))}
                  />
                </div>
              </div>

              {/* Match Score & Analysis Output */}
              <div className="match-analysis-card">
                <div className="d-flex justify-between items-center mb-3">
                  <h4 className="card-subheading">ATS Qualification Analysis</h4>
                  <div className="score-badge-circle">
                    <span className="score-num">{matchAnalysis.score}%</span>
                    <span className="score-lbl">Match</span>
                  </div>
                </div>

                <div className="match-detail-section mb-3">
                  <h5 className="match-subheading text-green">✓ Matched Keywords ({matchAnalysis.strongMatches.length})</h5>
                  <div className="tag-cloud">
                    {matchAnalysis.strongMatches.map((t, idx) => (
                      <span key={idx} className="tag strong-match">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="match-detail-section mb-3">
                  <h5 className="match-subheading text-gold">⚠️ Partial / Synonym Matches ({matchAnalysis.partialMatches.length})</h5>
                  <div className="tag-cloud">
                    {matchAnalysis.partialMatches.map((t, idx) => (
                      <span key={idx} className="tag partial-match">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="match-detail-section">
                  <h5 className="match-subheading text-red">✗ Missing Target Skills ({matchAnalysis.missingSkills.length})</h5>
                  <div className="tag-cloud">
                    {matchAnalysis.missingSkills.map((t, idx) => (
                      <span key={idx} className="tag missing-match">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: APPLICATION TRACKER */}
        {activeTab === 'tracker' && (
          <section className="workspace-tab-pane">
            <div className="d-flex justify-between items-center flex-wrap gap-2 mb-4">
              <div>
                <h3 className="card-subheading">📋 Application Kanban & Pipeline Tracker</h3>
                <p className="section-subtext">Manage deadlines, interview dates, and custom CV versions across 8 hiring stages.</p>
              </div>
              <button className="btn-primary" onClick={() => setShowAppModal(true)}>
                <Plus size={16} /> Track New Application
              </button>
            </div>

            <div className="kanban-board-container">
              {STAGES.map(stage => {
                const stageApps = applications.filter(a => a.stage === stage);
                return (
                  <div key={stage} className="kanban-column">
                    <div className="kanban-col-header">
                      <span className="col-stage-name">{stage}</span>
                      <span className="col-count-pill">{stageApps.length}</span>
                    </div>
                    <div className="kanban-cards-list">
                      {stageApps.map(app => (
                        <div key={app.id} className="kanban-item-card">
                          <div className="k-card-top">
                            <strong className="k-company">{app.company}</strong>
                            <button className="k-delete-btn" onClick={() => deleteApp(app.id)}>×</button>
                          </div>
                          <p className="k-pos">{app.position}</p>
                          {app.deadline && <span className="k-deadline">📅 Due: {app.deadline}</span>}
                          {app.interviewDate && <span className="k-interview">🎙️ Interview: {app.interviewDate}</span>}
                          
                          <div className="k-stage-move-bar mt-2">
                            <select
                              value={app.stage}
                              onChange={(e) => updateAppStage(app.id, e.target.value)}
                              className="k-stage-select"
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

        {/* TAB 5: INTERVIEW PREP */}
        {activeTab === 'interview-prep' && (
          <section className="workspace-tab-pane">
            <div className="interview-prep-header mb-4">
              <h3 className="card-subheading">🎙️ Real-World Interview Question Bank</h3>
              <p className="section-subtext">Review actual technical and behavioral interview questions asked at top global employers.</p>
            </div>

            <div className="interview-cards-grid">
              {interviewQuestionsByRole && Object.entries(interviewQuestionsByRole).map(([roleKey, data]) => (
                <div key={roleKey} className="interview-role-card">
                  <h4 className="i-role-title">{data.title || roleKey}</h4>
                  <div className="i-questions-list mt-3">
                    {data.questions?.map((q, qIdx) => (
                      <div key={qIdx} className="i-q-box mb-2">
                        <span className="i-q-num">Q{qIdx + 1}:</span>
                        <p className="i-q-text">{q.question || q}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Application Modal */}
      {showAppModal && (
        <div className="modal-backdrop" onClick={() => setShowAppModal(false)}>
          <div className="modal-content-card" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Track New Application</h3>
            <form onSubmit={saveApplication} className="modal-form mt-3">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  required
                  value={appForm.company}
                  onChange={e => setAppForm({ ...appForm, company: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Position Title</label>
                <input
                  type="text"
                  required
                  value={appForm.position}
                  onChange={e => setAppForm({ ...appForm, position: e.target.value })}
                />
              </div>
              <div className="grid-2-col gap-2">
                <div className="form-group">
                  <label>Application Stage</label>
                  <select
                    value={appForm.stage}
                    onChange={e => setAppForm({ ...appForm, stage: e.target.value })}
                  >
                    {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Deadline</label>
                  <input
                    type="date"
                    value={appForm.deadline}
                    onChange={e => setAppForm({ ...appForm, deadline: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-actions mt-4">
                <button type="button" className="btn-secondary" onClick={() => setShowAppModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save to Tracker</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
