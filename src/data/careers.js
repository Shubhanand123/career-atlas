import { careersTech } from './careers_tech.js';
import { careersEngineering } from './careers_engineering.js';
import { careersHealthcare } from './careers_healthcare.js';
import { careersBusiness } from './careers_business.js';
import { careersCreative } from './careers_creative.js';
import { careersScience } from './careers_science.js';
import { careersTrades } from './careers_trades.js';
import { careersOther } from './careers_other.js';
import { careerFamilies } from './careerFamilies.js';

// Aggregate all hand-curated careers into a single primary export
export const careers = [
  ...careersTech,
  ...careersEngineering,
  ...careersHealthcare,
  ...careersBusiness,
  ...careersCreative,
  ...careersScience,
  ...careersTrades,
  ...careersOther
];

export function getEnrichedCareer(id) {
  if (!id) return careers[0];
  const target = String(id).toLowerCase().trim();
  
  // 1. Check hand-curated rich careers first
  const foundPrimary = careers.find(c => 
    String(c.id).toLowerCase() === target || 
    String(c.name).toLowerCase() === target ||
    String(c.name).toLowerCase().replace(/\s+/g, '-') === target ||
    String(c.id).toLowerCase().replace(/-/g, '_') === target
  );
  if (foundPrimary) return foundPrimary;

  return null;
}

// Keep the broad occupation corpus out of the initial and curated-profile chunks.
// Callers that need a registry record should use getEnrichedCareerAsync instead.
export function enrichRegistryCareer(regItem) {
  if (!regItem) return careers[0];

  const isHigh = regItem.skillLevel === 'High';
  const isLow = regItem.skillLevel === 'Low';
  
  // Safe salary resolution across different catalog formats
  const usdEntry = Number(regItem.salaryUSD?.entry || regItem.salaryUSD?.min || (isHigh ? 65000 : isLow ? 38000 : 50000));
  const usdMid = Number(regItem.salaryUSD?.mid || (usdEntry * 1.45));
  const usdSenior = Number(regItem.salaryUSD?.senior || regItem.salaryUSD?.max || (usdMid * 1.5));

  const inrEntry = Number(regItem.salaryINR?.entry || regItem.salaryINR?.min || (isHigh ? 750000 : isLow ? 350000 : 550000));
  const inrMid = Number(regItem.salaryINR?.mid || (inrEntry * 1.5));
  const inrSenior = Number(regItem.salaryINR?.senior || regItem.salaryINR?.max || (inrMid * 1.6));

  const sectorStr = String(regItem.sector || regItem.category || '');
  const nameStr = String(regItem.name || 'Specialized Professional');
  const catStr = String(regItem.category || 'General');
  const subcatStr = String(regItem.subcategory || 'Specialist');

  return {
    id: regItem.id || `career-${Math.random()}`,
    careerId: regItem.careerId || regItem.id,
    name: nameStr,
    family: regItem.family || 'technology',
    category: catStr,
    subcategory: subcatStr,
    iscoCode: regItem.iscoCode || '2100',
    onetCode: regItem.onetCode || '15-1000.00',
    aliases: [nameStr, `${subcatStr} Specialist`, `${nameStr} Practitioner`],
    shortDescription: regItem.shortDescription || `Professional scope, core proficiencies, and career growth for ${nameStr}.`,
    description: `${nameStr} is a vital occupation in the ${catStr} sector (${subcatStr}). Professionals in this role apply structured domain expertise, specialized methodologies, and disciplined execution to deliver high-impact results across contemporary industry landscapes.`,
    whatYouDo: {
      daily: [
        `Execute core operational and specialized tasks for ${nameStr}`,
        'Collaborate with cross-functional stakeholders and team members',
        'Review quality standards, documentation, and compliance requirements',
        'Monitor performance metrics and resolve workflow bottlenecks'
      ],
      weekly: [
        'Team coordination and sprint/project milestones review',
        'Process optimization and tooling evaluation',
        'Technical and strategic alignment sessions',
        'Skills and knowledge updates'
      ],
      projects: [
        'Enterprise and client implementation milestones',
        'Systems integration, upgrade, or operational expansion',
        'Efficiency, safety, and compliance audits'
      ],
      senior: [
        'Strategic domain leadership and methodology definition',
        'Mentoring junior and intermediate practitioners',
        'Cross-departmental roadmap governance and executive reporting'
      ]
    },
    dayInLife: [
      { time: '08:30', activity: 'Operational alignment, priority review, and daily sync', type: 'planning' },
      { time: '09:30', activity: `Core specialized execution session for ${nameStr}`, type: 'technical' },
      { time: '12:30', activity: 'Midday meal and team informal sync', type: 'break' },
      { time: '13:30', activity: 'Stakeholder coordination and progress reporting', type: 'meeting' },
      { time: '15:00', activity: 'Quality assurance, analysis, and refinement', type: 'review' },
      { time: '17:00', activity: 'Daily retrospective and next-day planning', type: 'admin' }
    ],
    skills: {
      technical: [
        { name: `${subcatStr} Fundamentals`, category: 'Domain Knowledge', importance: 'critical', level: 'advanced' },
        { name: 'Quality & Process Standards', category: 'Operations', importance: 'high', level: 'advanced' },
        { name: 'Data & Performance Tracking', category: 'Analytics', importance: 'high', level: 'intermediate' },
        { name: 'Tooling & Instrumentation', category: 'Tools', importance: 'high', level: 'intermediate' }
      ],
      soft: [
        { name: 'Critical Problem Solving', importance: 'critical' },
        { name: 'Clear Communication', importance: 'high' },
        { name: 'Attention to Detail', importance: 'high' },
        { name: 'Adaptability & Resilience', importance: 'critical' }
      ]
    },
    education: {
      minimum: regItem.typicalEducation || "Bachelor's Degree",
      typical: regItem.typicalEducation || "Bachelor's Degree",
      preferred: isHigh ? "Master's Degree / Advanced Professional Certification" : "Bachelor's Degree or Relevant Apprenticeship",
      alternatives: ['Vocational certificate programs', 'Apprenticeships & practical portfolio', 'Industry-certified training tracks'],
      duration: { min: isLow ? 1 : 3, typical: isHigh ? 5 : 4, max: isHigh ? 7 : 5, unit: 'years' },
      subjects: [
        { name: `${catStr} Core`, importance: 'critical' },
        { name: 'Applied Mathematics & Statistics', importance: 'high' },
        { name: 'Communication & Technical Writing', importance: 'medium' }
      ]
    },
    certifications: [
      { name: `Certified ${nameStr} Specialist`, provider: 'National / International Standards Board', cost: '$350', difficulty: Number(regItem.toughness) || 7 },
      { name: 'Advanced Quality & Safety Credential', provider: 'Industry Institute', cost: '$250', difficulty: 6 }
    ],
    difficulty: {
      overall: Number(regItem.toughness) || (isHigh ? 8.2 : isLow ? 4.5 : 6.8),
      mathematics: isHigh ? 8.0 : 5.5,
      theory: isHigh ? 8.5 : 6.0,
      practical: isLow ? 8.5 : 7.5,
      problemSolving: isHigh ? 9.0 : 6.5,
      memorization: 7.0,
      competition: isHigh ? 8.5 : 6.0,
      workload: isHigh ? 8.5 : 6.5,
      examDifficulty: isHigh ? 8.0 : 5.5
    },
    salary: {
      entry: { min: Math.round(usdEntry * 0.85), max: Math.round(usdEntry * 1.15), currency: 'USD' },
      mid: { min: Math.round(usdMid * 0.85), max: Math.round(usdMid * 1.15), currency: 'USD' },
      senior: { min: Math.round(usdSenior * 0.85), max: Math.round(usdSenior * 1.25), currency: 'USD' },
      byCountry: {
        US: { entry: [usdEntry, usdEntry + 20000], mid: [usdMid, usdMid + 30000], senior: [usdSenior, usdSenior + 50000], currency: 'USD' },
        IN: { entry: [inrEntry, inrEntry * 1.5], mid: [inrMid, inrMid * 1.4], senior: [inrSenior, inrSenior * 1.5], currency: 'INR' },
        UK: { entry: [35000, 50000], mid: [55000, 80000], senior: [85000, 130000], currency: 'GBP' },
        DE: { entry: [42000, 58000], mid: [62000, 90000], senior: [95000, 145000], currency: 'EUR' }
      },
      confidence: 'HIGH'
    },
    aiImpact: {
      automationExposure: Number(regItem.aiRisk) || 3.5,
      augmentationPotential: 8.5,
      humanImportance: 8.0,
      futureOpportunity: 8.5,
      tasksAutomated: ['Routine data entry', 'Standardized administrative filing', 'Basic status reporting'],
      tasksAugmented: ['Precision analytics', 'Predictive workflows', 'Complex problem diagnostic assistance'],
      tasksHuman: ['Strategic decision making', 'Contextual judgment', 'Interpersonal leadership', 'Ethical responsibility']
    },
    lifestyle: {
      workEnvironment: sectorStr.includes('Construction') ? 'Site / Field' : 'Hybrid / Office / Laboratory',
      travel: 'Low to Moderate',
      workHours: '40-48 hours/week',
      workLifeBalance: isHigh ? 7 : 8,
      remoteWork: regItem.family === 'technology' ? 'High' : 'Moderate'
    }
  };
}

export async function getEnrichedCareerAsync(id) {
  if (!id) return careers[0];
  const curated = getEnrichedCareer(id);
  if (curated) return curated;

  try {
    const { getCareerFromCatalogById } = await import('./careerCatalog.js');
    const regItem = await getCareerFromCatalogById(id);
    if (regItem) {
      return enrichRegistryCareer(regItem);
    }
  } catch (err) {
    console.error('Error fetching career:', err);
  }
  
  return careers[0];
}

export const getCareerById = (id) => getEnrichedCareer(id) || careers[0];
export const getCareersByFamily = (familyId) => careers.filter(c => c.family === familyId);
export const searchCareers = (query) => {
  const q = (query || '').toLowerCase().trim();
  if (!q) return careers;
  return careers.filter(c => 
    c.name.toLowerCase().includes(q) || 
    (c.aliases && c.aliases.some(a => a.toLowerCase().includes(q))) ||
    (c.shortDescription && c.shortDescription.toLowerCase().includes(q))
  );
};
export { careerFamilies };
