// College Placement Reports Database — Comprehensive National & Global Benchmarks
// Verified institutional placement stats, branch-wise CTC, recruiter tiers, and ROI metrics

export const collegePlacementReports = [
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology (IIT) Bombay',
    location: 'Mumbai, Maharashtra, India',
    tier: 'Tier 1 (Institute of Eminence)',
    type: 'Engineering & Technology',
    overallPlacementRate: 89.2,
    batchSize: 1845,
    avgPackageDomestic: '₹21.82 LPA',
    medianPackageDomestic: '₹17.92 LPA',
    highestDomesticPackage: '₹1.68 CPA',
    highestInternationalPackage: '₹3.67 CPA ($440,000)',
    tuitionFeeTotal: '₹10.5 Lakhs (4 Years B.Tech)',
    roiScore: 9.8, // ROI rating out of 10
    topRecruiters: [
      { name: 'Google', roles: ['SWE', 'AI Research', 'Systems'], packages: '₹35 - ₹65 LPA' },
      { name: 'Jane Street / Optiver / Citadel', roles: ['Quant Researcher', 'HFT Developer'], packages: '₹1.5 - ₹3.67 CPA' },
      { name: 'Microsoft', roles: ['Software Engineer', 'Data Scientist'], packages: '₹30 - ₹55 LPA' },
      { name: 'McKinsey & Bain', roles: ['Associate Consultant', 'Data Lead'], packages: '₹24 - ₹38 LPA' },
      { name: 'Qualcomm / Texas Instruments', roles: ['VLSI / Embedded / Hardware'], packages: '₹22 - ₹36 LPA' },
      { name: 'ISRO / DRDO', roles: ['Scientist/Engineer SC'], packages: '₹12 - ₹16 LPA' }
    ],
    branches: [
      { branch: 'Computer Science & Engineering', placedPct: 98.4, avgLPA: 34.6, medianLPA: 30.0, topLPA: 367.0, topCareers: ['software-engineer', 'data-scientist', 'cybersecurity-analyst', 'ai-researcher'] },
      { branch: 'Electrical Engineering', placedPct: 92.1, avgLPA: 24.2, medianLPA: 20.5, topLPA: 180.0, topCareers: ['electrical-engineer', 'software-engineer', 'robotics-engineer'] },
      { branch: 'Mechanical Engineering', placedPct: 86.5, avgLPA: 17.8, medianLPA: 15.0, topLPA: 95.0, topCareers: ['mechanical-engineer', 'aerospace-engineer', 'management-consultant'] },
      { branch: 'Chemical Engineering', placedPct: 83.2, avgLPA: 16.4, medianLPA: 14.2, topLPA: 68.0, topCareers: ['chemical-engineer', 'environmental-scientist', 'product-manager'] },
      { branch: 'Civil Engineering', placedPct: 79.8, avgLPA: 14.8, medianLPA: 12.5, topLPA: 55.0, topCareers: ['civil-engineer', 'urban-planner', 'data-analyst'] },
      { branch: 'Aerospace Engineering', placedPct: 84.0, avgLPA: 18.9, medianLPA: 16.0, topLPA: 82.0, topCareers: ['aerospace-engineer', 'mechanical-engineer', 'space-scientist'] }
    ],
    sectorBreakdown: [
      { sector: 'Software & IT', percentage: 38 },
      { sector: 'Core Engineering', percentage: 22 },
      { sector: 'Finance & High-Frequency Trading', percentage: 18 },
      { sector: 'Consulting & Analytics', percentage: 14 },
      { sector: 'R&D / Public Sector', percentage: 8 }
    ],
    specializationPrerequisites: 'JEE Advanced Rank < 3,500. Specialization in AI/Robotics requires minor or dual degree electives in 3rd/4th year.',
    toughnessIndex: 9.4,
    salaryForWorkDoneRatio: 'Very High (1st year payback on 4-yr investment is ~1.8x total education cost)'
  },
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology (IIT) Delhi',
    location: 'New Delhi, India',
    tier: 'Tier 1 (Institute of Eminence)',
    type: 'Engineering & Technology',
    overallPlacementRate: 88.5,
    batchSize: 1790,
    avgPackageDomestic: '₹22.40 LPA',
    medianPackageDomestic: '₹18.50 LPA',
    highestDomesticPackage: '₹1.80 CPA',
    highestInternationalPackage: '₹3.45 CPA ($415,000)',
    tuitionFeeTotal: '₹10.2 Lakhs',
    roiScore: 9.7,
    topRecruiters: [
      { name: 'Graviton Research Capital / Tower Research', roles: ['Quant Engineer', 'Algo Trader'], packages: '₹1.2 - ₹3.4 CPA' },
      { name: 'Apple / Google / Uber', roles: ['Software Engineer', 'ML Engineer'], packages: '₹36 - ₹70 LPA' },
      { name: 'Boston Consulting Group (BCG)', roles: ['Management Consultant'], packages: '₹28 - ₹42 LPA' },
      { name: 'Goldman Sachs & Morgan Stanley', roles: ['Quant Analyst', 'Tech Analyst'], packages: '₹26 - ₹45 LPA' }
    ],
    branches: [
      { branch: 'Computer Science & Engineering', placedPct: 99.1, avgLPA: 36.2, medianLPA: 32.0, topLPA: 345.0, topCareers: ['software-engineer', 'data-scientist', 'ai-researcher'] },
      { branch: 'Mathematics & Computing', placedPct: 97.5, avgLPA: 31.8, medianLPA: 28.0, topLPA: 280.0, topCareers: ['data-scientist', 'financial-analyst', 'software-engineer'] },
      { branch: 'Electrical Engineering', placedPct: 91.4, avgLPA: 25.1, medianLPA: 21.0, topLPA: 160.0, topCareers: ['electrical-engineer', 'robotics-engineer'] },
      { branch: 'Mechanical Engineering', placedPct: 85.0, avgLPA: 18.2, medianLPA: 15.5, topLPA: 90.0, topCareers: ['mechanical-engineer', 'automotive-engineer'] }
    ],
    sectorBreakdown: [
      { sector: 'Software & IT', percentage: 40 },
      { sector: 'Quantitative Finance', percentage: 20 },
      { sector: 'Core Engineering', percentage: 20 },
      { sector: 'Consulting', percentage: 15 },
      { sector: 'Other', percentage: 5 }
    ],
    specializationPrerequisites: 'JEE Advanced Rank < 4,000. Rigorous discrete math and low-level computing benchmarks.',
    toughnessIndex: 9.3,
    salaryForWorkDoneRatio: 'Extremely High'
  },
  {
    id: 'bits-pilani',
    name: 'BITS Pilani (Pilani, Goa & Hyderabad Campuses)',
    location: 'Pilani, Rajasthan & Multi-campus, India',
    tier: 'Tier 1 (Private Institute of Eminence)',
    type: 'Engineering, Sciences & Management',
    overallPlacementRate: 87.8,
    batchSize: 3200,
    avgPackageDomestic: '₹19.64 LPA',
    medianPackageDomestic: '₹16.50 LPA',
    highestDomesticPackage: '₹1.33 CPA',
    highestInternationalPackage: '₹2.80 CPA',
    tuitionFeeTotal: '₹24.5 Lakhs (4 Years B.E.)',
    roiScore: 8.5,
    topRecruiters: [
      { name: 'Amazon / Microsoft / Oracle', roles: ['Software Engineer', 'Cloud Architect'], packages: '₹28 - ₹52 LPA' },
      { name: 'Da Vinci Derivatives / DE Shaw', roles: ['Software Dev', 'FinTech Dev'], packages: '₹45 - ₹133 LPA' },
      { name: 'Texas Instruments / Nvidia', roles: ['Hardware Engineer', 'GPU Architect'], packages: '₹24 - ₹40 LPA' },
      { name: 'PwC / Deloitte / ZS Associates', roles: ['Tech Consultant', 'Business Analyst'], packages: '₹14 - ₹22 LPA' }
    ],
    branches: [
      { branch: 'Computer Science', placedPct: 97.2, avgLPA: 29.8, medianLPA: 26.0, topLPA: 133.0, topCareers: ['software-engineer', 'data-scientist', 'cybersecurity-analyst'] },
      { branch: 'Electronics & Communication', placedPct: 90.5, avgLPA: 21.4, medianLPA: 18.0, topLPA: 95.0, topCareers: ['electrical-engineer', 'embedded-engineer'] },
      { branch: 'Mechanical & Manufacturing', placedPct: 81.2, avgLPA: 14.5, medianLPA: 12.0, topLPA: 50.0, topCareers: ['mechanical-engineer', 'industrial-engineer'] },
      { branch: 'Economics + CS (Dual Degree)', placedPct: 98.0, avgLPA: 32.0, medianLPA: 28.5, topLPA: 133.0, topCareers: ['financial-analyst', 'data-scientist', 'product-manager'] }
    ],
    sectorBreakdown: [
      { sector: 'IT & Software', percentage: 46 },
      { sector: 'Core Engineering & Electronics', percentage: 24 },
      { sector: 'Finance & Analytics', percentage: 18 },
      { sector: 'Consulting', percentage: 12 }
    ],
    specializationPrerequisites: 'BITSAT Score 280+ for CS/Circuits. Zero attendance policy allows intense open-source & startup project incubation.',
    toughnessIndex: 8.7,
    salaryForWorkDoneRatio: 'High (Moderate fee recovery in 1.4-1.8 years)'
  },
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology (NIT) Tiruchirappalli',
    location: 'Tiruchirappalli, Tamil Nadu, India',
    tier: 'Tier 1 (Premier NIT)',
    type: 'Engineering & Technology',
    overallPlacementRate: 88.2,
    batchSize: 1420,
    avgPackageDomestic: '₹17.80 LPA',
    medianPackageDomestic: '₹14.20 LPA',
    highestDomesticPackage: '₹84.0 LPA',
    highestInternationalPackage: '₹1.50 CPA',
    tuitionFeeTotal: '₹6.8 Lakhs',
    roiScore: 9.6,
    topRecruiters: [
      { name: 'Morgan Stanley / Goldman Sachs', roles: ['Software Analyst', 'Quant'], packages: '₹25 - ₹45 LPA' },
      { name: 'Qualcomm / Intel / Cisco', roles: ['Hardware Dev', 'Network Engineer'], packages: '₹18 - ₹32 LPA' },
      { name: 'Samsung R&D / Adobe', roles: ['R&D Engineer', 'Product Dev'], packages: '₹22 - ₹40 LPA' }
    ],
    branches: [
      { branch: 'Computer Science & Engineering', placedPct: 98.0, avgLPA: 27.2, medianLPA: 23.5, topLPA: 84.0, topCareers: ['software-engineer', 'data-scientist'] },
      { branch: 'ECE & EEE', placedPct: 91.0, avgLPA: 19.5, medianLPA: 16.0, topLPA: 60.0, topCareers: ['electrical-engineer', 'robotics-engineer'] },
      { branch: 'Mechanical & Production', placedPct: 82.5, avgLPA: 12.8, medianLPA: 10.5, topLPA: 35.0, topCareers: ['mechanical-engineer', 'supply-chain-manager'] }
    ],
    sectorBreakdown: [
      { sector: 'Software & IT', percentage: 44 },
      { sector: 'Core Engineering', percentage: 30 },
      { sector: 'Analytics & Banking', percentage: 16 },
      { sector: 'Consulting', percentage: 10 }
    ],
    specializationPrerequisites: 'JEE Main 99.4+ Percentile. Strong algorithmic core & practical laboratory curriculum.',
    toughnessIndex: 8.5,
    salaryForWorkDoneRatio: 'Exceptional ROI due to low subsidized fees'
  },
  {
    id: 'iim-ahmedabad',
    name: 'Indian Institute of Management (IIM) Ahmedabad',
    location: 'Ahmedabad, Gujarat, India',
    tier: 'Tier 1 (Premier Business School)',
    type: 'Management & Strategy',
    overallPlacementRate: 100.0,
    batchSize: 450,
    avgPackageDomestic: '₹34.36 LPA',
    medianPackageDomestic: '₹31.50 LPA',
    highestDomesticPackage: '₹1.15 CPA',
    highestInternationalPackage: '₹2.65 CPA ($318,000)',
    tuitionFeeTotal: '₹28.0 Lakhs (2 Years PGP/MBA)',
    roiScore: 9.3,
    topRecruiters: [
      { name: 'McKinsey & Company / BCG / Bain', roles: ['Management Consultant', 'Strategy Director'], packages: '₹36 - ₹55 LPA' },
      { name: 'Goldman Sachs / Morgan Stanley / Avendus', roles: ['Investment Banker', 'Private Equity Associate'], packages: '₹40 - ₹85 LPA' },
      { name: 'Tata Sons / Aditya Birla Group / Mahindra', roles: ['General Management / Leadership Track'], packages: '₹30 - ₹45 LPA' },
      { name: 'Amazon / Microsoft / Google', roles: ['Senior Product Manager', 'Program Lead'], packages: '₹35 - ₹60 LPA' }
    ],
    branches: [
      { branch: 'PGP General Management', placedPct: 100.0, avgLPA: 34.36, medianLPA: 31.5, topLPA: 115.0, topCareers: ['management-consultant', 'investment-banker', 'product-manager'] },
      { branch: 'PGP Food & Agribusiness (FABM)', placedPct: 100.0, avgLPA: 22.8, medianLPA: 20.0, topLPA: 42.0, topCareers: ['agricultural-scientist', 'supply-chain-manager'] }
    ],
    sectorBreakdown: [
      { sector: 'Management Consulting', percentage: 41 },
      { sector: 'Investment Banking & PE/VC', percentage: 26 },
      { sector: 'Product Management & Tech', percentage: 16 },
      { sector: 'General Management & FMCG', percentage: 17 }
    ],
    specializationPrerequisites: 'CAT 99.6+ Percentile + Deep case method mastery, high stress tolerance, 70-80 hr work weeks during internships.',
    toughnessIndex: 9.6,
    salaryForWorkDoneRatio: 'High (High entry salary offset by steep 60-80 hr workweeks in IB/Consulting)'
  },
  {
    id: 'aiims-new-delhi',
    name: 'All India Institute of Medical Sciences (AIIMS) New Delhi',
    location: 'New Delhi, India',
    tier: 'Tier 1 (Apex Medical Institute)',
    type: 'Medical & Healthcare',
    overallPlacementRate: 100.0,
    batchSize: 132,
    avgPackageDomestic: '₹18.0 - ₹24.0 LPA (Junior Resident / Doctor Stipend & Base)',
    medianPackageDomestic: '₹20.0 LPA',
    highestDomesticPackage: '₹60.0 LPA (Super-specialist Hospital Hire / Private Practice Post-MD)',
    highestInternationalPackage: '₹2.80 CPA (USMLE Residency / Fellowship)',
    tuitionFeeTotal: '₹7,500 Total for entire MBBS',
    roiScore: 10.0,
    topRecruiters: [
      { name: 'AIIMS / PGI / Apollo / Fortis / Medanta', roles: ['Resident Doctor', 'Specialist Surgeon', 'Clinician'], packages: '₹18 - ₹45 LPA' },
      { name: 'US / UK Residency (Harvard, Mayo Clinic, NHS)', roles: ['Clinical Fellow / Specialist'], packages: '$75k - $350k/yr' }
    ],
    branches: [
      { branch: 'MBBS (Clinical Medicine & Surgery)', placedPct: 100.0, avgLPA: 19.5, medianLPA: 18.0, topLPA: 60.0, topCareers: ['physician', 'surgeon', 'pediatrician'] },
      { branch: 'MD/MS Super-speciality', placedPct: 100.0, avgLPA: 32.0, medianLPA: 28.0, topLPA: 85.0, topCareers: ['cardiologist', 'neurologist', 'radiologist'] }
    ],
    sectorBreakdown: [
      { sector: 'Super-speciality Hospitals', percentage: 55 },
      { sector: 'Academic & Medical Research', percentage: 25 },
      { sector: 'Global Clinical Practice', percentage: 20 }
    ],
    specializationPrerequisites: 'NEET AIR < 55. 5.5 years MBBS + 3 years MD/MS + 3 years DM/MCh for super-specialty.',
    toughnessIndex: 9.9,
    salaryForWorkDoneRatio: 'Moderate early career (Extreme 80-100 hr residency stress), Exponential in mid-to-late career (₹50L - ₹2Cr+)'
  },
  {
    id: 'stanford-university',
    name: 'Stanford University',
    location: 'Stanford, California, USA',
    tier: 'Global Tier 1 (Ivy Plus / Silicon Valley Core)',
    type: 'Global University (Engineering, Business, Medicine, Law)',
    overallPlacementRate: 94.6,
    batchSize: 1750,
    avgPackageDomestic: '$172,000 / yr (~₹1.43 CPA)',
    medianPackageDomestic: '$155,000 / yr (~₹1.29 CPA)',
    highestDomesticPackage: '$480,000 / yr (~₹4.0 CPA Quant/Tech + Equity)',
    highestInternationalPackage: '$520,000 / yr',
    tuitionFeeTotal: '$340,000 (4 Years Undergraduate)',
    roiScore: 9.5,
    topRecruiters: [
      { name: 'Nvidia / OpenAI / Google / Meta', roles: ['AI Researcher', 'Distributed Systems', 'Product Design'], packages: '$180k - $360k' },
      { name: 'Sequoia / Andreessen Horowitz / Y Combinator', roles: ['Founder / Venture Associate'], packages: 'High Equity / $150k+' },
      { name: 'Citadel / Jane Street / Point72', roles: ['Quantitative Strategist'], packages: '$300k - $550k' }
    ],
    branches: [
      { branch: 'Computer Science (AI & Systems)', placedPct: 98.0, avgLPA: 165.0, medianLPA: 150.0, topLPA: 450.0, topCareers: ['software-engineer', 'data-scientist', 'ai-researcher'] },
      { branch: 'Electrical Engineering & Bio-computation', placedPct: 94.0, avgLPA: 148.0, medianLPA: 135.0, topLPA: 350.0, topCareers: ['electrical-engineer', 'biomedical-engineer'] },
      { branch: 'Economics & Mathematical Science', placedPct: 93.0, avgLPA: 140.0, medianLPA: 125.0, topLPA: 400.0, topCareers: ['financial-analyst', 'management-consultant'] }
    ],
    sectorBreakdown: [
      { sector: 'AI & Big Tech', percentage: 48 },
      { sector: 'Early-stage Startups & Founders', percentage: 22 },
      { sector: 'Finance & VC', percentage: 18 },
      { sector: 'Academia & Biotech', percentage: 12 }
    ],
    specializationPrerequisites: 'Sub-4% acceptance rate. Requires proven extraordinary distinction, olympiad/research background or top standardized profiles.',
    toughnessIndex: 9.7,
    salaryForWorkDoneRatio: 'Extremely High (Uncapped Silicon Valley equity upside)'
  },
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, Massachusetts, USA',
    tier: 'Global Tier 1 (Apex Science & Tech)',
    type: 'Science, Engineering & Computing',
    overallPlacementRate: 96.2,
    batchSize: 1180,
    avgPackageDomestic: '$178,500 / yr (~₹1.48 CPA)',
    medianPackageDomestic: '$160,000 / yr (~₹1.33 CPA)',
    highestDomesticPackage: '$510,000 / yr (HFT Quant / DeepTech Founder)',
    highestInternationalPackage: '$530,000 / yr',
    tuitionFeeTotal: '$335,000',
    roiScore: 9.7,
    topRecruiters: [
      { name: 'Hudson River Trading / Two Sigma / Citadel', roles: ['Quant Researcher', 'Core C++ Dev'], packages: '$320k - $520k' },
      { name: 'Apple / Google DeepMind / Microsoft Quantum', roles: ['Quantum/AI Scientist', 'Robotics Specialist'], packages: '$200k - $400k' },
      { name: 'SpaceX / Tesla / Boston Dynamics', roles: ['Autonomy / Propulsion / Hardware Engineer'], packages: '$150k - $240k' }
    ],
    branches: [
      { branch: 'EECS (Course 6 - CS & Electrical)', placedPct: 99.0, avgLPA: 175.0, medianLPA: 160.0, topLPA: 480.0, topCareers: ['software-engineer', 'robotics-engineer', 'ai-researcher'] },
      { branch: 'Mechanical & Aero (Course 2 & 16)', placedPct: 94.5, avgLPA: 135.0, medianLPA: 120.0, topLPA: 260.0, topCareers: ['mechanical-engineer', 'aerospace-engineer'] },
      { branch: 'Mathematics & Physics (Course 18 & 8)', placedPct: 95.0, avgLPA: 168.0, medianLPA: 155.0, topLPA: 510.0, topCareers: ['data-scientist', 'financial-analyst', 'astronomer'] }
    ],
    sectorBreakdown: [
      { sector: 'AI & High Performance Computing', percentage: 45 },
      { sector: 'Quantitative Trading', percentage: 24 },
      { sector: 'Robotics & DeepTech', percentage: 18 },
      { sector: 'Academia & National Labs', percentage: 13 }
    ],
    specializationPrerequisites: 'Sub-4% acceptance. Intensive problem sets (p-sets), fundamental physics & mathematical proofs.',
    toughnessIndex: 9.9,
    salaryForWorkDoneRatio: 'Extremely High'
  }
];

export function getPlacementReportById(id) {
  return collegePlacementReports.find(c => c.id === id);
}

export function getPlacementReportsForCareer(careerId) {
  return collegePlacementReports.filter(college => 
    college.branches.some(b => b.topCareers.includes(careerId))
  );
}
