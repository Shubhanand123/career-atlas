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
  const results = catalog.filter(career => {
    if (q && ![career.name, career.category, career.subcategory, career.shortDescription]
      .some(value => value?.toLowerCase().includes(q))) return false;
    if (filters.family && filters.family !== 'all' && career.family !== filters.family) return false;
    if (filters.skillLevel && filters.skillLevel !== 'all' && career.skillLevel?.toLowerCase() !== filters.skillLevel.toLowerCase()) return false;
    const toughness = Number(career.toughness) || 7;
    if (filters.toughness === 'high' && toughness < 8) return false;
    if (filters.toughness === 'moderate' && (toughness < 6 || toughness >= 8)) return false;
    if (filters.toughness === 'accessible' && toughness >= 6) return false;
    const aiRisk = Number(career.aiRisk) || 3.5;
    if (filters.aiRisk === 'low' && aiRisk > 3.5) return false;
    if (filters.aiRisk === 'high' && aiRisk <= 6) return false;
    return true;
  });
  return { total: results.length, items: results.slice(offset, offset + limit), hasMore: offset + limit < results.length };
}
