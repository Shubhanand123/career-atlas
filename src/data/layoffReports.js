// Comprehensive Layoff & Market Vulnerability Intelligence Database
// Tracks macro contractions, AI automation risk indices, company layoff tracker, and pivot playbooks.

export const layoffEventsTracker = [
  { company: 'Intel', sector: 'Semiconductors', year: '2024-2025', count: '15,000+', pct: '15%', severance: '16 weeks base + healthcare + RSUs', reason: 'Foundry spin-off & restructuring', aiFactor: 'Medium (Capex diverted to AI fabs)' },
  { company: 'Google / Alphabet', sector: 'Big Tech', year: '2024-2025', count: '12,000+', pct: '6%', severance: '16 weeks + 2 weeks per year + 6mo health', reason: 'Reallocation to AI models & flattened hierarchy', aiFactor: 'High (Automated code gen & ad ops)' },
  { company: 'Tesla', sector: 'Automotive & Clean Energy', year: '2024-2025', count: '14,000+', pct: '10%', severance: '2 months pay + cobra subsidy', reason: 'Global EV price pressure & shift to Robotaxi/Optimus', aiFactor: 'High (Automation of design lines)' },
  { company: 'Amazon', sector: 'E-Commerce & Cloud', year: '2023-2025', count: '27,000+', pct: '9% (Corp)', severance: 'Full pay during 60-day WARN + 1-2 wks/yr', reason: 'Post-pandemic right-sizing & AWS efficiency', aiFactor: 'High (Automated warehouse & tier 1 IT)' },
  { company: 'Microsoft', sector: 'Cloud & Gaming', year: '2023-2025', count: '10,000+', pct: '5%', severance: 'Above-market severance + 6mo healthcare', reason: 'Activision Blizzard integration & OpenAI focus', aiFactor: 'High (Co-pilot code assistance)' },
  { company: 'Meta', sector: 'Social & AI', year: '2023-2024', count: '21,000+', pct: '24%', severance: '16 weeks base + 2 weeks/year + vesting', reason: 'Year of Efficiency & middle-management flattening', aiFactor: 'High (Llama AI automation)' },
  { company: 'Cisco Systems', sector: 'Networking & Hardware', year: '2024-2025', count: '9,000+', pct: '7%', severance: 'Tiered severance based on tenure', reason: 'Shift to AI networking & software security', aiFactor: 'Medium (Core hardware migration)' },
  { company: 'Dell Technologies', sector: 'Enterprise Hardware', year: '2024-2025', count: '12,500+', pct: '10%', severance: 'Standard corporate severance', reason: 'PC slump & AI server transition', aiFactor: 'Medium (Automated sales & ops)' },
  { company: 'SAP', sector: 'Enterprise Software', year: '2024-2025', count: '8,000+', pct: '7%', severance: 'Generous voluntary redundancy packages', reason: 'Transformation to Business AI Cloud', aiFactor: 'Very High (AI Enterprise assistants)' },
  { company: 'Unity Technologies', sector: 'Gaming & 3D Engines', year: '2024', count: '1,800', pct: '25%', severance: '14 weeks pay + benefits', reason: 'Refocusing on core game engine runtime', aiFactor: 'High (GenAI asset generators)' },
  { company: 'Citigroup', sector: 'Banking & Finance', year: '2024-2026', count: '20,000+', pct: '10%', severance: 'Custom financial package + garden leave', reason: 'Simplification & automated risk settlement', aiFactor: 'High (Algorithmic reconciliation)' },
  { company: 'McKinsey & Co.', sector: 'Management Consulting', year: '2023-2025', count: '2,000+', pct: '4%', severance: 'Search period with full pay', reason: 'Reduced client M&A spend & GenAI report drafting', aiFactor: 'High (Automated deck & research)' },
  { company: 'PwC / EY / Deloitte', sector: 'Big 4 Professional Services', year: '2024-2025', count: '6,500+', pct: '3%', severance: '1-3 months salary + outplacement', reason: 'Audit automation & slower advisory demand', aiFactor: 'High (AI tax & audit automation)' },
  { company: 'Bayer / Pharma', sector: 'Biotech & Life Sciences', year: '2024-2025', count: '7,000+', pct: '7%', severance: 'European standard severance model', reason: 'Debt restructuring & clinical focus', aiFactor: 'Low (Macro financial restructuring)' }
];

export const layoffSectorReports = [
  {
    sector: 'Big Tech & Consumer Software',
    riskLevel: 'Moderate to High (Restructuring toward AI efficiency)',
    layoffs2023_2026: '420,000+ globally',
    primaryDrivers: ['Post-pandemic normalization', 'Aggressive reallocation of CapEx to GPU clusters', 'Automated code generation (Junior SWE compression)'],
    vulnerableRoles: [
      { title: 'Junior Frontend Developer', riskScore: 8.9, reason: 'LLM agents and UI scaffolding replace boilerplate HTML/React' },
      { title: 'Manual QA / Test Automation', riskScore: 9.2, reason: 'Automated end-to-end testing agents and synthetic regression suites' },
      { title: 'Entry-level Technical Recruiter', riskScore: 8.6, reason: 'Hiring freeze + automated ATS candidate filtering' },
      { title: 'Middle Management / Agile Scrum Masters', riskScore: 8.0, reason: 'Flattening organizational hierarchies' }
    ],
    resilientRoles: [
      { title: 'Distributed Systems & Kernel Engineers', resilienceScore: 9.7, reason: 'Requires deep low-level memory, hardware acceleration, concurrency' },
      { title: 'AI Infrastructure & ML Platform Engineers', resilienceScore: 9.9, reason: 'Massive enterprise scale demand for training & inference optimization' },
      { title: 'Cybersecurity Incident Responders', resilienceScore: 9.5, reason: 'Adversarial human threats cannot be delegated entirely to AI' }
    ],
    survivalPlaybook: 'Move away from CRUD wrappers. Build deep expertise in distributed systems, Rust/C++, and AI kernel optimization.'
  },
  {
    sector: 'Quantitative Finance & Investment Banking',
    riskLevel: 'Moderate (Back-office compression; Front-office boom)',
    layoffs2023_2026: '85,000+ globally',
    primaryDrivers: ['Algorithmic market making replacing human floor/desk traders', 'AI extraction of 10-K filings and financial modeling', 'Consolidation in retail banking operations'],
    vulnerableRoles: [
      { title: 'Junior Equity Research Associate', riskScore: 8.6, reason: 'AI models parse 10-K, 10-Q filings, transcripts, and earnings reports in seconds' },
      { title: 'Back-office Settlement & Operations', riskScore: 9.1, reason: 'Automated ledger reconciliation and smart contract verification' }
    ],
    resilientRoles: [
      { title: 'Quantitative Strategist / Math Modelers', resilienceScore: 9.8, reason: 'Complex statistical arbitrage, market microstructure, stochastic calculus' },
      { title: 'Wealth Advisors (HNW Relationship)', resilienceScore: 9.2, reason: 'High emotional trust, bespoke estate planning, human psychology' }
    ],
    survivalPlaybook: 'Pair deep financial mathematics with strong Python/C++ skills and direct client relationship capability.'
  },
  {
    sector: 'Management Consulting & Strategy',
    riskLevel: 'Moderate',
    layoffs2023_2026: '55,000+ across MBB & Big 4',
    primaryDrivers: ['Corporate clients using GenAI for first-pass market research', 'Slowdown in M&A deals', 'Margin pressure on legacy slide-building billing'],
    vulnerableRoles: [
      { title: 'Junior Business Analyst (Desk Research)', riskScore: 8.4, reason: 'AI summarization of industry reports and automated financial model scaffolding' },
      { title: 'Generalist PMO (Project Management Office)', riskScore: 7.8, reason: 'Automated status tracking and reporting dashboards' }
    ],
    resilientRoles: [
      { title: 'Digital Transformation / AI Implementation Lead', resilienceScore: 9.3, reason: 'High client demand for practical AI deployment in legacy businesses' },
      { title: 'Restructuring & Turnaround Specialist', resilienceScore: 9.6, reason: 'Critical during high interest rates and economic distress' }
    ],
    survivalPlaybook: 'Specialize in operational implementation rather than generic deck creation; master data pipelines and executive stakeholder navigation.'
  },
  {
    sector: 'Healthcare & Clinical Medicine',
    riskLevel: 'Extremely Low (Massive structural shortage)',
    layoffs2023_2026: '< 0.5% (Severe Global Labor Shortage)',
    primaryDrivers: ['Global aging demographic', 'Severe shortage of qualified doctors, nurses, surgeons and physical therapists', 'Physical unpredictability of biological systems'],
    vulnerableRoles: [
      { title: 'Medical Transcriptionist', riskScore: 9.8, reason: 'Ambient AI clinical voice notes and auto-EHR entry' },
      { title: 'Basic Medical Billing Coder', riskScore: 8.8, reason: 'Automated claims processing and ICD-10 tagging' }
    ],
    resilientRoles: [
      { title: 'Surgeon & Interventional Clinician', resilienceScore: 9.9, reason: 'Fine-motor physical procedures under biological unpredictability' },
      { title: 'Critical Care & Bedside Nurse', resilienceScore: 9.9, reason: 'Human touch, emergency triage, bedside empathy' },
      { title: 'Physical Therapist', resilienceScore: 9.8, reason: 'Hands-on biomechanical manipulation and motivation' }
    ],
    survivalPlaybook: 'Direct patient care and surgical specializations remain among the most AI-proof careers in human history.'
  },
  {
    sector: 'Skilled Trades & Precision Engineering',
    riskLevel: 'Extremely Low (Negative layoff risk — Acute Deficit)',
    layoffs2023_2026: 'Zero net layoffs (Record High Deficit)',
    primaryDrivers: ['Retiring workforce', 'Electrification boom (EV chargers, grid upgrades, data center power)', 'Cannot be automated via software'],
    vulnerableRoles: [
      { title: 'Assembly Line Repetitive Packer', riskScore: 7.5, reason: 'Industrial automation and robotic pick-and-place' }
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
    impact: 'General-purpose humanoid robotics enter manufacturing, warehousing, and commercial kitchens, shifting human value to physical trades, scientific discovery, and executive judgment.',
    winners: ['Bioengineers & Surgeons', 'High-Voltage Power Engineers', 'Elite Human Facilitators & Negotiators'],
    losers: ['Repetitive physical warehouse laborers', 'Basic diagnostic screeners', 'Commodity retail managers']
  }
];
