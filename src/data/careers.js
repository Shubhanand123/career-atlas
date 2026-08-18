// Need to fix careers.js to include careersCreative and careersScience and careersTrades
import { careersTech } from './careers_tech.js';
import { careersEngineering } from './careers_engineering.js';
import { careersHealthcare } from './careers_healthcare.js';
import { careersBusiness } from './careers_business.js';
import { careersCreative } from './careers_creative.js';
import { careersScience } from './careers_science.js';
import { careersTrades } from './careers_trades.js';

// Aggregate all careers into a single export
export const careers = [
  ...careersTech,
  ...careersEngineering,
  ...careersHealthcare,
  ...careersBusiness,
  ...careersCreative,
  ...careersScience,
  ...careersTrades
];

export const getCareerById = (id) => careers.find(c => c.id === id);
export const getCareersByFamily = (familyId) => careers.filter(c => c.family === familyId);
export const searchCareers = (query) => {
  const q = query.toLowerCase();
  return careers.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.aliases.some(a => a.toLowerCase().includes(q)) ||
    c.shortDescription.toLowerCase().includes(q)
  );
};
