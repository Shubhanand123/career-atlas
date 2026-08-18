// Layoff & Market Vulnerability Intelligence Database
// Real-world tech/finance/consulting downturns, AI replacement risk timeline, resilient niches

export const layoffSectorReports = [
  {
    sector: 'Big Tech & Consumer Software',
    riskLevel: 'Moderate to High (Restructuring toward AI efficiency)',
    layoffs2023_2026: '380,000+ globally',
    primaryDrivers: ['Post-pandemic overhiring normalization', 'Aggressive reallocation of CapEx to GPU clusters & AI infra', 'Automated code generation (Junior SWE compression)'],
    vulnerableRoles: [
      { title: 'Junior Frontend Developer', riskScore: 8.8, reason: 'LLM agents and component generators replace boilerplate HTML/CSS/React building' },
      { title: 'Manual QA / Test Automation', riskScore: 9.1, reason: 'Automated end-to-end testing agents and synthetic regression suites' },
      { title: 'Entry-level Technical Recruiter', riskScore: 8.5, reason: 'Hiring freeze + automated ATS filtering' },
      { title: 'Middle Management / Agile Scrum Masters', riskScore: 7.8, reason: 'Flattening organizational hierarchies' }
    ],
    resilientRoles: [
      { title: 'Distributed Systems & Kernel Engineers', resilienceScore: 9.6, reason: 'Requires deep low-level memory, hardware acceleration, concurrency' },
      { title: 'AI Infrastructure & ML Platform Engineers', resilienceScore: 9.8, reason: 'Massive enterprise scale demand for training & inference optimization' },
      { title: 'Cybersecurity Incident Responders', resilienceScore: 9.4, reason: 'Adversarial human threats cannot be delegated entirely to AI' }
    ],
    survivalPlaybook: 'Move away from CRUD application wrappers. Gain depth in distributed systems, Rust/C++, specialized domain knowledge (BioTech, FinTech, Robotics).'
  },
  {
    sector: 'Management Consulting & Strategy',
    riskLevel: 'Moderate',
    layoffs2023_2026: '45,000+ across MBB & Big 4',
    primaryDrivers: ['Corporate clients using GenAI for first-pass market research', 'Slowdown in M&A deals', 'Margin pressure on legacy slide-building billing'],
    vulnerableRoles: [
      { title: 'Junior Business Analyst (Desk Research)', riskScore: 8.2, reason: 'AI summarization of industry reports and automated financial model scaffolding' },
      { title: 'Generalist PMO (Project Management Office)', riskScore: 7.5, reason: 'Automated status tracking and reporting dashboards' }
    ],
    resilientRoles: [
      { title: 'Digital Transformation / AI Implementation Lead', resilienceScore: 9.2, reason: 'High client demand for practical AI deployment in legacy businesses' },
      { title: 'Restructuring & Turnaround Specialist', resilienceScore: 9.5, reason: 'Critical during high interest rates and economic distress' }
    ],
    survivalPlaybook: 'Specialize in operational implementation rather than generic deck creation; master data pipelines and executive stakeholder navigation.'
  },
  {
    sector: 'Financial Services & Investment Banking',
    riskLevel: 'Moderate',
    layoffs2023_2026: '60,000+ globally',
    primaryDrivers: ['High interest rates suppressing IPO/M&A volumes', 'Algorithmic market making replacing human floor/desk traders'],
    vulnerableRoles: [
      { title: 'Junior Equity Research Associate', riskScore: 8.4, reason: 'AI models parse 10-K, 10-Q filings, transcripts, and earnings reports in seconds' },
      { title: 'Back-office Settlement & Operations', riskScore: 8.9, reason: 'Blockchain and automated reconciliation engines' }
    ],
    resilientRoles: [
      { title: 'Quantitative Strategist / Math Modelers', resilienceScore: 9.7, reason: 'Complex statistical arbitrage, market microstructure, stochastic modeling' },
      { title: 'Wealth Advisors (High Net Worth Relationship)', resilienceScore: 9.1, reason: 'High emotional trust, bespoke estate planning, human psychology' }
    ],
    survivalPlaybook: 'Pair deep financial mathematics with strong Python/C++ skills and direct client relationship capability.'
  },
  {
    sector: 'Healthcare & Clinical Medicine',
    riskLevel: 'Extremely Low (Massive structural shortage)',
    layoffs2023_2026: '< 1% (Only administrative consolidation)',
    primaryDrivers: ['Global aging demographic', 'Severe shortage of qualified doctors, nurses, surgeons and physical therapists'],
    vulnerableRoles: [
      { title: 'Medical Transcriptionist', riskScore: 9.7, reason: 'Ambient AI clinical voice notes and auto-EHR entry' },
      { title: 'Basic Medical Billing Coder', riskScore: 8.6, reason: 'Automated claims processing and ICD-10 tagging' }
    ],
    resilientRoles: [
      { title: 'Surgeon & Interventional Clinician', resilienceScore: 9.9, reason: 'Fine-motor physical procedures under biological unpredictability' },
      { title: 'Critical Care & Bedside Nurse', resilienceScore: 9.9, reason: 'Human touch, emergency triage, bedside empathy' },
      { title: 'Physical Therapist', resilienceScore: 9.7, reason: 'Hands-on biomechanical manipulation and motivation' }
    ],
    survivalPlaybook: 'Direct patient care and surgical specializations remain among the most AI-proof careers in human history.'
  },
  {
    sector: 'Skilled Trades & Field Engineering',
    riskLevel: 'Extremely Low (Negative layoff risk — acute labor deficit)',
    layoffs2023_2026: 'Zero net layoffs; severe shortage',
    primaryDrivers: ['Retiring workforce', 'Electrification boom (EV chargers, grid upgrades, data center power)', 'Cannot be automated via software'],
    vulnerableRoles: [
      { title: 'Factory Assembly Line Repetitive Worker', riskScore: 7.2, reason: 'Industrial automation and robotic pick-and-place' }
    ],
    resilientRoles: [
      { title: 'Master Electrician (Data Center & Grid)', resilienceScore: 9.9, reason: 'Physical dexterity, high-voltage safety compliance, custom field wiring' },
      { title: 'Commercial HVAC Technician', resilienceScore: 9.8, reason: 'Complex diagnosing inside variable physical environments' },
      { title: 'Specialized Underwater / Pipe Welder', resilienceScore: 9.8, reason: 'Hazardous, high-precision manual craft' }
    ],
    survivalPlaybook: 'Get certified early, accumulate apprenticeships, and build independent contracting or specialty niche business.'
  }
];

export const aiImpactTimeline = [
  {
    phase: '2024 - 2026 (Augmentation & Junior Compression)',
    impact: 'AI tools act as 3x multiplier for senior professionals while cutting entry-level routine task hiring by 30-50% in pure software & content.',
    winners: ['Senior System Architects', 'Full-stack AI Integrators', 'Domain Experts who code'],
    losers: ['Junior pure-syntax coders', 'Stock copywriters', 'Data entry clerks']
  },
  {
    phase: '2026 - 2029 (Autonomous Agents & Workflow Automation)',
    impact: 'Multi-agent workflows autonomously handle end-to-end customer support, Tier 1 IT support, standard financial audits, and automated testing.',
    winners: ['AI Safety & Security Auditors', 'Robotics & Hardware Engineers', 'Clinical Healthcare Providers'],
    losers: ['Routine desk analysts', 'Basic customer support reps', 'Junior translators']
  },
  {
    phase: '2029 - 2035 (Embodied Robotics & Physical Expansion)',
    impact: 'Humanoid robotics enters controlled warehousing, logistics, and limited manufacturing; intellectual jobs become heavily orchestrator-centric.',
    winners: ['Quantum Computing Engineers', 'Biotech Genetic Engineers', 'Human Psychology / Community Leaders'],
    losers: ['Repetitive warehouse pickers', 'Standard truck freight drivers']
  }
];
