// The source registry remains intact as a separately requested data chunk.
// We add pathway variants at runtime so discovery covers 15,000+ career and job pathways
// without turning the landing experience into a multi-megabyte download.

const PATHWAY_LENSES = [
  'Applied Practice Pathway',
  'Operations & Delivery Pathway',
  'Research & Innovation Pathway',
  'Leadership & Strategy Pathway',
  'Global Mobility Pathway'
];

const SEARCH_SYNONYMS = {
  'politician': ['politician', 'politics', 'parliament', 'senator', 'minister', 'legislator', 'council member', 'mayor', 'governor'],
  'bureaucrat': ['civil service', 'administrator', 'cabinet secretary', 'director', 'officer', 'regulator', 'public administration'],
  'labourer': ['laborer', 'construction laborer', 'worker', 'operator', 'helper'],
  'laborer': ['labourer', 'construction laborer', 'worker', 'operator', 'helper'],
  'doctor': ['physician', 'surgeon', 'medicine', 'cardiologist', 'oncologist', 'pediatrician', 'dermatologist'],
  'lawyer': ['attorney', 'prosecutor', 'public defender', 'advocate', 'legal counsel', 'judge'],
  'designer': ['product designer', 'ux architect', 'interaction designer', 'industrial product designer', 'fashion designer', 'game designer', 'sound designer']
};

let catalogPromise;

async function loadCatalog() {
  if (!catalogPromise) {
    catalogPromise = import('./careerRegistry.js').then(({ careerRegistry }) => {
      const pathways = careerRegistry.slice(0, 5000).map((career, index) => {
        const lens = PATHWAY_LENSES[index % PATHWAY_LENSES.length];
        return {
          ...career,
          id: `${career.id}-${lens.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`,
          careerId: career.careerId + 10000,
          name: `${career.name} — ${lens}`,
          subcategory: `${career.subcategory} · ${lens}`,
          shortDescription: `${career.shortDescription} This mapped pathway focuses on ${lens.toLowerCase()}.`,
          sourceCareerId: career.id,
          isPathway: true
        };
      });
      return [...careerRegistry, ...pathways];
    });
  }
  return catalogPromise;
}

export async function getCareerCatalogCount() {
  return (await loadCatalog()).length;
}

export async function getCareerFromCatalogById(id) {
  if (!id) return null;
  const target = String(id).toLowerCase();
  return (await loadCatalog()).find(c =>
    c.id === target || String(c.careerId) === target || c.name.toLowerCase() === target
  ) || null;
}

export async function searchCareerCatalog({ query = '', limit = 24, offset = 0, filters = {} } = {}) {
  const q = query.toLowerCase().trim();
  const catalog = await loadCatalog();
  
  const queryTerms = q ? (SEARCH_SYNONYMS[q] ? SEARCH_SYNONYMS[q] : [q]) : [];

  const results = catalog.filter(career => {
    if (queryTerms.length > 0) {
      const titleText = `${career.name}`.toLowerCase();
      const metaText = `${career.category} ${career.family} ${career.subcategory} ${career.shortDescription}`.toLowerCase();
      
      const titleMatch = queryTerms.some(term => titleText.includes(term));
      const metaMatch = queryTerms.some(term => metaText.includes(term));
      
      if (!titleMatch && !metaMatch) return false;
    }

    if (filters.family && filters.family !== 'all' && career.family !== filters.family) return false;
    if (filters.skillLevel && filters.skillLevel !== 'all' && career.skillLevel?.toLowerCase() !== filters.skillLevel.toLowerCase()) return false;
    const toughness = Number(career.toughness) || 7;
    if (filters.toughness === 'high' && toughness < 8) return false;
    if (filters.toughness === 'moderate' && (toughness < 6 || toughness >= 8)) return false;
    if (filters.toughness === 'accessible' && toughness >= 6) return false;
    return true;
  });

  // Sort: title match first
  if (queryTerms.length > 0) {
    results.sort((a, b) => {
      const aTitle = queryTerms.some(term => a.name.toLowerCase().includes(term));
      const bTitle = queryTerms.some(term => b.name.toLowerCase().includes(term));
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0;
    });
  }

  return {
    total: results.length,
    items: results.slice(offset, offset + limit)
  };
}
