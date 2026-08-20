// Global Post-12th Institutions Database
// Comprehensive profiles with granular True-Cost calculations, City & Country Living Costs,
// admission requirements, international student criteria, and verified benchmarks.

export const globalInstitutions = [
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology (IIT) Bombay',
    shortName: 'IIT Bombay',
    country: 'India',
    countryCode: 'IN',
    city: 'Mumbai',
    type: 'Public / Institute of Eminence',
    established: 1958,
    officialWebsite: 'https://www.iitb.ac.in',
    programs: ['B.Tech Computer Science', 'B.Tech Electrical', 'B.Tech Mechanical', 'Dual Degree AI/ML', 'M.Tech', 'Ph.D'],
    degrees: ['B.Tech', 'B.S.', 'B.Des', 'M.Tech', 'M.Sc', 'Ph.D'],
    specializations: ['Artificial Intelligence', 'VLSI Design', 'Robotics', 'Quantum Computing', 'Biomedical Engineering'],
    currency: 'INR',
    domesticTuitionAnnual: 220000,
    internationalTuitionAnnual: 650000,
    applicationFee: 2000,
    livingCosts: {
      accommodationMonthly: 4000, // On-campus hostel
      foodMonthly: 5500,
      transportMonthly: 1000,
      insuranceAnnual: 3000,
      otherExpensesMonthly: 3000,
      cityAverageLivingMonthly: 28000,
      countryAverageLivingMonthly: 18000
    },
    durationYears: 4,
    intakes: ['July / August (Autumn Semester)'],
    deadlines: 'JEE Advanced counseling rounds: June - July',
    admissionRequirements: {
      exam: 'JEE Main + JEE Advanced rank < 3,500 for top branches; UCEED for B.Des',
      minimumGrade: '75% in Class 12 (or top 20 percentile in respective board)',
      language: 'English medium instruction',
      standardizedTests: 'JEE Advanced'
    },
    scholarships: [
      { name: 'Institute Free Studentship / Merit-cum-Means', coverage: 'Full / Partial tuition fee waiver for eligible family income', eligibility: 'Parental income < ₹5 LPA' },
      { name: 'National Scholarship Portal (NSP) schemes', coverage: 'Central sector scholarship + hostel allowance' }
    ],
    careerOutcomes: {
      placementRate: 89.2,
      medianSalaryINR: 1792000,
      highestSalaryINR: 36700000,
      topEmployers: ['Google', 'Citadel', 'Jane Street', 'Microsoft', 'Qualcomm', 'McKinsey', 'ISRO']
    },
    ratings: {
      academics: 9.8,
      faculty: 9.6,
      infrastructure: 9.3,
      placements: 9.9,
      campusLife: 9.4,
      overall: 9.7
    },
    verificationStatus: 'Verified Official NIRF #3',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology (IIT) Delhi',
    shortName: 'IIT Delhi',
    country: 'India',
    countryCode: 'IN',
    city: 'New Delhi',
    type: 'Public / Institute of Eminence',
    established: 1961,
    officialWebsite: 'https://home.iitd.ac.in',
    programs: ['B.Tech Computer Science', 'B.Tech Mathematics & Computing', 'B.Tech Electrical', 'B.Des', 'Ph.D'],
    degrees: ['B.Tech', 'Dual Degree B.Tech+M.Tech', 'B.Des', 'Ph.D'],
    specializations: ['Data Science', 'Machine Intelligence', 'VLSI', 'Power Electronics', 'Materials'],
    currency: 'INR',
    domesticTuitionAnnual: 220000,
    internationalTuitionAnnual: 650000,
    applicationFee: 2000,
    livingCosts: {
      accommodationMonthly: 3800,
      foodMonthly: 5200,
      transportMonthly: 1200,
      insuranceAnnual: 2800,
      otherExpensesMonthly: 3200,
      cityAverageLivingMonthly: 25000,
      countryAverageLivingMonthly: 18000
    },
    durationYears: 4,
    intakes: ['July / August'],
    deadlines: 'JoSAA Counseling: June - July',
    admissionRequirements: {
      exam: 'JEE Advanced',
      minimumGrade: '75% in Class 12 Science (PCM)',
      language: 'English',
      standardizedTests: 'JEE Advanced'
    },
    scholarships: [
      { name: 'IIT Delhi Merit-cum-Means', coverage: 'Full tuition refund + ₹1,000/mo allowance' }
    ],
    careerOutcomes: {
      placementRate: 88.5,
      medianSalaryINR: 1850000,
      highestSalaryINR: 34500000,
      topEmployers: ['Graviton Research', 'Google', 'Optiver', 'Bain & Co', 'Texas Instruments']
    },
    ratings: {
      academics: 9.7,
      faculty: 9.5,
      infrastructure: 9.2,
      placements: 9.8,
      campusLife: 9.3,
      overall: 9.6
    },
    verificationStatus: 'Verified Official NIRF #2',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'aiims-new-delhi',
    name: 'All India Institute of Medical Sciences (AIIMS) New Delhi',
    shortName: 'AIIMS Delhi',
    country: 'India',
    countryCode: 'IN',
    city: 'New Delhi',
    type: 'Public / Apex Medical Institute',
    established: 1956,
    officialWebsite: 'https://www.aiims.edu',
    programs: ['MBBS', 'B.Sc (Hons) Nursing', 'MD / MS', 'DM / M.Ch Super-specialty'],
    degrees: ['MBBS', 'B.Sc Nursing', 'MD', 'MS', 'M.Ch', 'Ph.D'],
    specializations: ['Cardiology', 'Neurology', 'Cardiothoracic Surgery', 'Oncology', 'Gastroenterology'],
    currency: 'INR',
    domesticTuitionAnnual: 1628, // Highly subsidized apex institution
    internationalTuitionAnnual: 75000,
    applicationFee: 1500,
    livingCosts: {
      accommodationMonthly: 1500,
      foodMonthly: 4000,
      transportMonthly: 800,
      insuranceAnnual: 1500,
      otherExpensesMonthly: 2000,
      cityAverageLivingMonthly: 25000,
      countryAverageLivingMonthly: 18000
    },
    durationYears: 5.5,
    intakes: ['August (Annual)'],
    deadlines: 'NEET UG counseling: June - August',
    admissionRequirements: {
      exam: 'NEET-UG AIR < 60 for General Category',
      minimumGrade: '60% in PCB + English (50% for SC/ST)',
      language: 'English',
      standardizedTests: 'NEET-UG'
    },
    scholarships: [
      { name: 'Central Sector Scholarship Scheme', coverage: 'Maintenance allowance' }
    ],
    careerOutcomes: {
      placementRate: 100,
      medianSalaryINR: 1500000,
      highestSalaryINR: 3500000,
      topEmployers: ['AIIMS Healthcare System', 'Apollo Hospitals', 'Max Healthcare', 'Global Research Residencies']
    },
    ratings: {
      academics: 10.0,
      faculty: 9.9,
      infrastructure: 9.5,
      placements: 10.0,
      campusLife: 9.0,
      overall: 9.9
    },
    verificationStatus: 'Verified Official NIRF Medical #1',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'tum-munich',
    name: 'Technical University of Munich (TUM)',
    shortName: 'TUM Munich',
    country: 'Germany',
    countryCode: 'DE',
    city: 'Munich',
    type: 'Public Research University (TU9)',
    established: 1868,
    officialWebsite: 'https://www.tum.de',
    programs: ['B.Sc Informatics / CS', 'B.Sc Mechanical Engineering', 'B.Sc Management & Technology', 'M.Sc Data Engineering'],
    degrees: ['B.Sc', 'B.Eng', 'M.Sc', 'Doctorate'],
    specializations: ['Automotive Engineering', 'Artificial Intelligence', 'Aerospace', 'Biotechnology', 'Renewable Energy'],
    currency: 'EUR',
    domesticTuitionAnnual: 300, // Semester administrative fee
    internationalTuitionAnnual: 6000, // New non-EU student tuition band
    applicationFee: 75,
    livingCosts: {
      accommodationMonthly: 680,
      foodMonthly: 320,
      transportMonthly: 49, // Deutschlandticket student transit pass
      insuranceAnnual: 1400, // Public statutory health insurance (TK / AOK)
      otherExpensesMonthly: 180,
      cityAverageLivingMonthly: 1350,
      countryAverageLivingMonthly: 990
    },
    durationYears: 3,
    intakes: ['Winter Semester (October)', 'Summer Semester (April)'],
    deadlines: 'Winter: July 15 | Summer: January 15',
    admissionRequirements: {
      exam: 'Abitur / Indian Class 12 + 1-yr university or Studienkolleg / IB Diploma',
      minimumGrade: 'GPA equivalent 1.5 - 2.0 (German scale)',
      language: 'English: IELTS 6.5+ / TOEFL 88+; German: TestDaF 4x4 or Goethe C1 for German-taught degrees',
      standardizedTests: 'Studienkolleg / APS Certificate (for Indian & Chinese students)'
    },
    scholarships: [
      { name: 'DAAD Scholarship for International Students', coverage: '€934/month living stipend + insurance', eligibility: 'Academic excellence' },
      { name: 'Deutschlandstipendium', coverage: '€300/month merit stipend' }
    ],
    careerOutcomes: {
      placementRate: 94.0,
      medianSalaryUSD: 72000,
      highestSalaryUSD: 145000,
      topEmployers: ['BMW Group', 'Siemens', 'SAP', 'Infineon Technologies', 'Allianz', 'Celonis']
    },
    ratings: {
      academics: 9.6,
      faculty: 9.3,
      infrastructure: 9.5,
      placements: 9.4,
      campusLife: 8.8,
      overall: 9.4
    },
    verificationStatus: 'Verified QS World #28',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'u-of-toronto',
    name: 'University of Toronto (U of T)',
    shortName: 'U of T',
    country: 'Canada',
    countryCode: 'CA',
    city: 'Toronto',
    type: 'Public Research University (U15)',
    established: 1827,
    officialWebsite: 'https://www.utoronto.ca',
    programs: ['B.Sc Computer Science', 'B.A.Sc Engineering Science', 'Rotman Commerce B.Com', 'B.Sc Life Sciences'],
    degrees: ['B.A.Sc', 'B.Sc', 'B.Com', 'M.Sc', 'Ph.D'],
    specializations: ['Machine Learning', 'Robotics', 'Quantum Computing', 'Financial Economics', 'Neuroscience'],
    currency: 'CAD',
    domesticTuitionAnnual: 7500,
    internationalTuitionAnnual: 61500,
    applicationFee: 180,
    livingCosts: {
      accommodationMonthly: 1550,
      foodMonthly: 550,
      transportMonthly: 130,
      insuranceAnnual: 756, // UHIP
      otherExpensesMonthly: 300,
      cityAverageLivingMonthly: 2600,
      countryAverageLivingMonthly: 2000
    },
    durationYears: 4,
    intakes: ['Fall (September)'],
    deadlines: 'OUAC Applications: Early November / Final January 15',
    admissionRequirements: {
      exam: 'High School Diploma with Calculus and Advanced Functions',
      minimumGrade: 'Overall 88% - 95% average in senior high school',
      language: 'IELTS 6.5 (no band < 6.0) or TOEFL iBT 100 with 22 in Writing',
      standardizedTests: 'SAT/ACT optional for US students'
    },
    scholarships: [
      { name: 'Lester B. Pearson International Scholarship', coverage: 'Full tuition, books, incidental fees, and full residence for 4 years', eligibility: 'Exceptional academic & leadership nominee' },
      { name: 'President’s Scholars of Excellence', coverage: '$10,000 entrance award' }
    ],
    careerOutcomes: {
      placementRate: 91.5,
      medianSalaryUSD: 78000,
      highestSalaryUSD: 180000,
      topEmployers: ['Amazon', 'RBC Capital Markets', 'Google Canada', 'Shopify', 'McKinsey Toronto']
    },
    ratings: {
      academics: 9.7,
      faculty: 9.5,
      infrastructure: 9.6,
      placements: 9.3,
      campusLife: 8.9,
      overall: 9.5
    },
    verificationStatus: 'Verified QS World #21',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'nus-singapore',
    name: 'National University of Singapore (NUS)',
    shortName: 'NUS',
    country: 'Singapore',
    countryCode: 'SG',
    city: 'Singapore',
    type: 'Public Autonomous Research University',
    established: 1905,
    officialWebsite: 'https://nus.edu.sg',
    programs: ['B.Comp Computer Science', 'B.Eng Electrical Engineering', 'BBA Business Administration', 'B.Sc Data Science'],
    degrees: ['B.Comp', 'B.Eng', 'B.Sc', 'BBA', 'M.Sc', 'Ph.D'],
    specializations: ['Artificial Intelligence', 'Cybersecurity', 'Fintech', 'Biomedical Systems', 'Supply Chain Management'],
    currency: 'SGD',
    domesticTuitionAnnual: 9050, // With MOE Tuition Grant
    internationalTuitionAnnual: 34000, // Non-subsidized rate
    applicationFee: 20,
    livingCosts: {
      accommodationMonthly: 650, // On-campus College residential room
      foodMonthly: 500,
      transportMonthly: 110,
      insuranceAnnual: 160,
      otherExpensesMonthly: 250,
      cityAverageLivingMonthly: 1700,
      countryAverageLivingMonthly: 1700
    },
    durationYears: 4,
    intakes: ['August (Semester 1)'],
    deadlines: 'International Applications: Late February',
    admissionRequirements: {
      exam: 'Singapore-Cambridge GCE A-Levels / Indian Class 12 (90%+) / IB Diploma (38+ points)',
      minimumGrade: 'Top 5-10% cohort standing',
      language: 'IELTS 6.5+ or TOEFL 92+',
      standardizedTests: 'SAT (1450+) or ACT (33+) recommended for international board holders'
    },
    scholarships: [
      { name: 'NUS Global Merit Scholarship', coverage: 'Full tuition fee waiver + S$6,000 annual living allowance + S$2,000 accommodation', eligibility: 'Outstanding leadership and academic profile' },
      { name: 'ASEAN Undergraduate Scholarship', coverage: 'Full tuition + living allowance' }
    ],
    careerOutcomes: {
      placementRate: 95.2,
      medianSalaryUSD: 68000,
      highestSalaryUSD: 160000,
      topEmployers: ['DBS Bank', 'Sea Group (Shopee)', 'Grab', 'Micron', 'ByteDance Singapore', 'GIC']
    },
    ratings: {
      academics: 9.8,
      faculty: 9.6,
      infrastructure: 9.8,
      placements: 9.7,
      campusLife: 9.1,
      overall: 9.7
    },
    verificationStatus: 'Verified QS World #8',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'imperial-college-london',
    name: 'Imperial College London',
    shortName: 'Imperial',
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    type: 'Public Research University',
    established: 1907,
    officialWebsite: 'https://www.imperial.ac.uk',
    programs: ['BEng / MEng Computing', 'BEng Aeronautical Engineering', 'MBBS Medicine', 'BSc Physics'],
    degrees: ['BEng', 'MEng', 'BSc', 'MSci', 'MBBS', 'Ph.D'],
    specializations: ['Artificial Intelligence', 'Computational Medicine', 'Quantum Technologies', 'Clean Energy'],
    currency: 'GBP',
    domesticTuitionAnnual: 9250,
    internationalTuitionAnnual: 39500,
    applicationFee: 28,
    livingCosts: {
      accommodationMonthly: 950,
      foodMonthly: 350,
      transportMonthly: 120,
      insuranceAnnual: 776, // UK Immigration Health Surcharge (IHS)
      otherExpensesMonthly: 280,
      cityAverageLivingMonthly: 1850,
      countryAverageLivingMonthly: 1350
    },
    durationYears: 3,
    intakes: ['October (Autumn Term)'],
    deadlines: 'UCAS Deadline: October 15 (Medicine/Oxbridge) | January 31 (General)',
    admissionRequirements: {
      exam: 'A*A*A in A-Levels including Mathematics and Further Mathematics / Physics',
      minimumGrade: 'Indian CISCE/CBSE Class 12: 95% overall with 95%+ in Mathematics',
      language: 'IELTS 7.0 (no band < 6.5) / TOEFL iBT 100 (22 in all subscores)',
      standardizedTests: 'STEP / TMUA / MAT for Mathematics and Computing'
    },
    scholarships: [
      { name: 'President’s Undergraduate Scholarships', coverage: '£3,000 per academic year for duration of course', eligibility: 'Academic excellence' }
    ],
    careerOutcomes: {
      placementRate: 93.8,
      medianSalaryUSD: 76000,
      highestSalaryUSD: 195000,
      topEmployers: ['Barclays Investment Bank', 'DeepMind', 'Goldman Sachs', 'Arm', 'Rolls-Royce', 'McLaren F1']
    },
    ratings: {
      academics: 9.9,
      faculty: 9.7,
      infrastructure: 9.5,
      placements: 9.8,
      campusLife: 8.9,
      overall: 9.7
    },
    verificationStatus: 'Verified QS World #2',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'university-of-melbourne',
    name: 'University of Melbourne',
    shortName: 'UniMelb',
    country: 'Australia',
    countryCode: 'AU',
    city: 'Melbourne',
    type: 'Public Research University (Group of Eight)',
    established: 1853,
    officialWebsite: 'https://www.unimelb.edu.au',
    programs: ['Bachelor of Science (Computing)', 'Bachelor of Commerce', 'Bachelor of Biomedicine', 'Bachelor of Design'],
    degrees: ['B.Sc', 'B.Com', 'B.Biomed', 'B.Des', 'Master of Engineering'],
    specializations: ['Bioinformatics', 'Actuarial Studies', 'Mechatronics', 'Architecture', 'Data Analytics'],
    currency: 'AUD',
    domesticTuitionAnnual: 8500, // Commonwealth Supported Place (CSP)
    internationalTuitionAnnual: 49500,
    applicationFee: 100,
    livingCosts: {
      accommodationMonthly: 1250,
      foodMonthly: 480,
      transportMonthly: 160,
      insuranceAnnual: 650, // OSHC (Overseas Student Health Cover)
      otherExpensesMonthly: 280,
      cityAverageLivingMonthly: 2200,
      countryAverageLivingMonthly: 1900
    },
    durationYears: 3,
    intakes: ['Semester 1 (February / March)', 'Semester 2 (July)'],
    deadlines: 'Semester 1: November 30 | Semester 2: May 31',
    admissionRequirements: {
      exam: 'Australian ATAR 85.0 - 95.0 / Indian Class 12 (85%-93%) / IB Diploma (32-38 points)',
      minimumGrade: 'Prerequisite mathematics and science subjects with 80%+',
      language: 'IELTS 6.5 (no band < 6.0) / PTE Academic 58+',
      standardizedTests: 'ATAR / National board marks'
    },
    scholarships: [
      { name: 'Melbourne International Undergraduate Scholarship', coverage: '50% or 100% tuition fee remission for duration of course', eligibility: 'High academic tier in secondary school' }
    ],
    careerOutcomes: {
      placementRate: 88.0,
      medianSalaryUSD: 66000,
      highestSalaryUSD: 140000,
      topEmployers: ['Telstra', 'Macquarie Group', 'Atlassian', 'CSL Limited', 'ANZ Bank', 'BHP']
    },
    ratings: {
      academics: 9.5,
      faculty: 9.4,
      infrastructure: 9.6,
      placements: 9.2,
      campusLife: 9.3,
      overall: 9.4
    },
    verificationStatus: 'Verified QS World #13',
    lastUpdated: '2026-08-20'
  }
];

// Helper to compute granular True Cost of Study with scenarios
export function calculateTrueCostOfStudy(institution, options = {}) {
  const {
    scenario = 'average', // 'low', 'average', 'high'
    isInternational = true,
    currency = 'USD'
  } = options;

  const tuitionAnnual = isInternational
    ? institution.internationalTuitionAnnual
    : institution.domesticTuitionAnnual;

  const multiplier = scenario === 'low' ? 0.78 : scenario === 'high' ? 1.35 : 1.0;

  const living = institution.livingCosts;
  const accommodationMonthly = Math.round(living.accommodationMonthly * multiplier);
  const foodMonthly = Math.round(living.foodMonthly * multiplier);
  const transportMonthly = Math.round(living.transportMonthly * multiplier);
  const otherMonthly = Math.round(living.otherExpensesMonthly * multiplier);
  const insuranceAnnual = living.insuranceAnnual;

  const totalMonthlyLiving = accommodationMonthly + foodMonthly + transportMonthly + otherMonthly;
  const totalAnnualLiving = (totalMonthlyLiving * 12) + insuranceAnnual;
  const totalAnnualCost = tuitionAnnual + totalAnnualLiving;
  const totalDegreeCost = (totalAnnualCost * institution.durationYears) + institution.applicationFee;

  return {
    scenario,
    currency: institution.currency,
    durationYears: institution.durationYears,
    tuitionAnnual,
    breakdown: {
      accommodationMonthly,
      foodMonthly,
      transportMonthly,
      insuranceAnnual,
      otherMonthly,
      totalMonthlyLiving,
      totalAnnualLiving
    },
    cityAverageLivingMonthly: living.cityAverageLivingMonthly,
    countryAverageLivingMonthly: living.countryAverageLivingMonthly,
    totalAnnualCost,
    totalDegreeCost
  };
}
