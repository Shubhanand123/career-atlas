// Company Research Database for Career Atlas
// Detailed employer benchmarks across Tech, Healthcare, Finance, Engineering, Consulting, Sports, and Research.

export const companyResearchData = [
  {
    id: 'google',
    name: 'Google / Alphabet',
    industry: 'Technology & AI',
    headquarters: 'Mountain View, California, USA',
    globalOffices: ['Mountain View', 'New York', 'London', 'Zurich', 'Bengaluru', 'Hyderabad', 'Tokyo', 'Singapore'],
    overview: 'Global technology leader in search, cloud infrastructure, AI models (Gemini), Android, YouTube, and hardware.',
    popularRoles: ['Software Engineer', 'Data Scientist', 'Product Manager', 'AI Research Scientist', 'Site Reliability Engineer'],
    requiredSkills: ['C++, Python, Java, Go', 'Distributed Systems', 'Machine Learning', 'Large-Scale Infrastructure', 'System Design'],
    cultureKeywords: ['Innovation', 'High Scale', 'Open Source Contribution', 'Peer Review', 'High Compensation'],
    internshipPrograms: ['Google STEP Internship', 'Google Summer of Code (GSoC)', 'PhD Research Fellowships'],
    medianCompensationUSD: '$190,000 - $350,000',
    medianCompensationINR: '₹35 - ₹65 LPA',
    website: 'https://careers.google.com'
  },
  {
    id: 'citadel-optiver',
    name: 'Citadel / Jane Street / Optiver',
    industry: 'Quantitative Finance & High-Frequency Trading',
    headquarters: 'Chicago / New York / Amsterdam',
    globalOffices: ['New York', 'Chicago', 'London', 'Amsterdam', 'Singapore', 'Sydney', 'Hong Kong', 'Mumbai'],
    overview: 'World-leading market makers and quantitative trading firms utilizing ultra-low latency algorithms and mathematical models.',
    popularRoles: ['Quantitative Researcher', 'HFT Systems Developer', 'Quantitative Trader', 'FPGA Hardware Engineer'],
    requiredSkills: ['Modern C++ (20/23)', 'Stochastic Calculus & Probability', 'Linux Kernel Bypass / Solarflare', 'Python (NumPy/Polars)'],
    cultureKeywords: ['Meritocracy', 'Extreme Mathematical Rigor', 'Microsecond Latency', 'Highest Market CTC'],
    internshipPrograms: ['Quant Trading & SWE Summer Internships ($15k-$25k/mo)'],
    medianCompensationUSD: '$350,000 - $700,000+',
    medianCompensationINR: '₹1.5 - ₹3.67 CPA',
    website: 'https://www.janestreet.com/join-jane-street/'
  },
  {
    id: 'apollo-max-healthcare',
    name: 'Apollo Hospitals & Healthcare Network',
    industry: 'Healthcare & Clinical Medicine',
    headquarters: 'Chennai / New Delhi, India',
    globalOffices: ['Chennai', 'Delhi NCR', 'Hyderabad', 'Bengaluru', 'Kolkata', 'International Telehealth'],
    overview: 'One of Asia’s largest integrated healthcare networks with tertiary hospitals, oncology centers, and research institutes.',
    popularRoles: ['Consultant Physician', 'Cardiothoracic Surgeon', 'Sports Medicine Specialist', 'Hospital Administrator', 'Nurse Navigator'],
    requiredSkills: ['Clinical Diagnostics', 'Emergency Triage', 'NABH/JCI Standards', 'Medical Informatics', 'Patient Communication'],
    cultureKeywords: ['Clinical Excellence', 'Patient Care', 'Multidisciplinary Tumor Boards', 'Accredited Residencies'],
    internshipPrograms: ['Compulsory Rotatory Residential Internship (CRRI)', 'Clinical Fellowships'],
    medianCompensationINR: '₹18 - ₹45 LPA (Consultant)',
    website: 'https://www.apollohospitals.com'
  },
  {
    id: 'mclarens-redbull-f1',
    name: 'McLaren Racing & Red Bull High Performance',
    industry: 'Motorsport, Automotive & Sports Technology',
    headquarters: 'Woking / Milton Keynes, United Kingdom',
    globalOffices: ['Woking (UK)', 'Milton Keynes (UK)', 'Global FIA F1 Circuit'],
    overview: 'Premier Formula 1 constructors integrating cutting-edge aerodynamics, telemetry sensor networks, and high-performance engineering.',
    popularRoles: ['Aerodynamicist', 'Performance Data Analyst', 'Race Strategist', 'Composite Materials Engineer', 'Telemetry Software Engineer'],
    requiredSkills: ['CFD (Computational Fluid Dynamics)', 'Wind Tunnel Testing', 'Python / MATLAB Real-Time Telemetry', 'Carbon Composite Tooling'],
    cultureKeywords: ['High Pressure', 'Weekly Iteration Cycle', 'Engineering Excellence', 'Championship Pursuit'],
    internshipPrograms: ['F1 Graduate Engineering Scheme', 'Industrial Placement Internships'],
    medianCompensationUSD: '$80,000 - $185,000 (£65k - £145k)',
    website: 'https://www.mclaren.com/racing/careers/'
  }
];

export function getCompanyById(id) {
  if (!id) return null;
  return companyResearchData.find(c => c.id === id.toLowerCase()) || null;
}
