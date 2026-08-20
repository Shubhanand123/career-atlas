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
  const target = String(id).toLowerCase();
  
  // 1. Check hand-curated rich careers first
  const foundPrimary = careers.find(c => c.id === target || c.name.toLowerCase() === target);
  if (foundPrimary) return foundPrimary;

  return careers[0];
}

// Keep the broad occupation corpus out of the initial and curated-profile chunks.
// Callers that need a registry record should use getEnrichedCareerAsync instead.
export function enrichRegistryCareer(regItem) {
  if (regItem) {
    const isHigh = regItem.skillLevel === 'High';
    const isLow = regItem.skillLevel === 'Low';
    
    return {
      id: regItem.id,
      careerId: regItem.careerId,
      name: regItem.name,
      family: regItem.family || 'technology',
      category: regItem.category,
      subcategory: regItem.subcategory,
      iscoCode: regItem.iscoCode || '2100',
      onetCode: regItem.onetCode || '15-1000.00',
      aliases: [regItem.name, `${regItem.subcategory} Specialist`, `${regItem.name} Practitioner`],
      shortDescription: regItem.shortDescription || `Professional scope, core proficiencies, and career growth for ${regItem.name}.`,
      description: `${regItem.name} is a vital occupation in the ${regItem.category} sector (${regItem.subcategory}). Professionals in this role apply structured domain expertise, specialized methodologies, and disciplined execution to deliver high-impact results across contemporary industry landscapes.`,
      whatYouDo: {
        daily: [
          `Execute core operational and specialized tasks for ${regItem.name}`,
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
        { time: '09:30', activity: `Core specialized execution session for ${regItem.name}`, type: 'technical' },
        { time: '12:30', activity: 'Midday meal and team informal sync', type: 'break' },
        { time: '13:30', activity: 'Stakeholder coordination and progress reporting', type: 'meeting' },
        { time: '15:00', activity: 'Quality assurance, analysis, and refinement', type: 'review' },
        { time: '17:00', activity: 'Daily retrospective and next-day planning', type: 'admin' }
      ],
      skills: {
        technical: [
          { name: `${regItem.subcategory} Fundamentals`, category: 'Domain Knowledge', importance: 'critical', level: 'advanced' },
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
          { name: `${regItem.category} Core`, importance: 'critical' },
          { name: 'Applied Mathematics & Statistics', importance: 'high' },
          { name: 'Communication & Technical Writing', importance: 'medium' }
        ]
      },
      certifications: [
        { name: `Certified ${regItem.name} Specialist`, provider: 'National / International Standards Board', cost: '$350', difficulty: Number(regItem.toughness) || 7 },
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
        entry: { min: Math.round(regItem.salaryUSD.entry * 0.85), max: Math.round(regItem.salaryUSD.entry * 1.15), currency: 'USD' },
        mid: { min: Math.round(regItem.salaryUSD.mid * 0.85), max: Math.round(regItem.salaryUSD.mid * 1.15), currency: 'USD' },
        senior: { min: Math.round(regItem.salaryUSD.senior * 0.85), max: Math.round(regItem.salaryUSD.senior * 1.25), currency: 'USD' },
        byCountry: {
          US: { entry: [regItem.salaryUSD.entry, regItem.salaryUSD.entry + 20000], mid: [regItem.salaryUSD.mid, regItem.salaryUSD.mid + 30000], senior: [regItem.salaryUSD.senior, regItem.salaryUSD.senior + 50000], currency: 'USD' },
          IN: { entry: [regItem.salaryINR.entry, regItem.salaryINR.entry * 1.5], mid: [regItem.salaryINR.mid, regItem.salaryINR.mid * 1.4], senior: [regItem.salaryINR.senior, regItem.salaryINR.senior * 1.5], currency: 'INR' },
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
        workEnvironment: regItem.sector.includes('Construction') ? 'Site / Field' : 'Hybrid / Office / Laboratory',
        travel: 'Low to Moderate',
        workHours: '40-48 hours/week',
        workLifeBalance: isHigh ? 7 : 8,
        remoteWork: regItem.family === 'technology' ? 'High' : 'Moderate'
      }
    };
  }

  return careers[0];
}

export async function getEnrichedCareerAsync(id) {
  const curated = getEnrichedCareer(id);
  const target = String(id || '').toLowerCase();
  if (curated && (curated.id === target || !id)) return curated;

  const { getCareerFromCatalogById } = await import('./careerCatalog.js');
  return enrichRegistryCareer(await getCareerFromCatalogById(id));
}

export const getCareerById = (id) => getEnrichedCareer(id);
export const getCareersByFamily = (familyId) => careers.filter(c => c.family === familyId);
export const searchCareers = (query) => {
  const q = (query || '').toLowerCase();
  return careers.filter(c => 
    c.name.toLowerCase().includes(q) || 
    (c.aliases && c.aliases.some(a => a.toLowerCase().includes(q))) ||
    (c.shortDescription && c.shortDescription.toLowerCase().includes(q))
  );
};
export { careerFamilies };
