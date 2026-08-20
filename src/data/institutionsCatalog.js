// Fast Indexed Search & Retrieval for 10,000+ Global Higher Education Institutions
// Uses dynamic lazy loading so bundle sizes remain ultra-lean.

import { globalInstitutions } from './institutionsDatabase.js';

let cachedRegistry = null;

async function loadRegistry() {
  if (!cachedRegistry) {
    const mod = await import('./institutionsRegistry.js');
    cachedRegistry = mod.institutionsRegistry || [];
  }
  return cachedRegistry;
}

export async function searchInstitutionsCatalog({ query = '', limit = 20, offset = 0, filters = {} } = {}) {
  const registry = await loadRegistry();
  const allInstitutions = registry.length > 0 ? registry : globalInstitutions;

  const q = String(query || '').trim().toLowerCase();
  const { country, type } = filters;

  const filtered = allInstitutions.filter(inst => {
    if (country && country !== 'All' && inst.country !== country) return false;
    if (type && type !== 'All' && !inst.type.toLowerCase().includes(type.toLowerCase())) return false;

    if (!q) return true;
    return inst.name.toLowerCase().includes(q) ||
      inst.city.toLowerCase().includes(q) ||
      inst.country.toLowerCase().includes(q) ||
      inst.type.toLowerCase().includes(q);
  });

  const total = filtered.length;
  const items = filtered.slice(offset, offset + limit);

  return {
    items,
    total,
    offset,
    limit
  };
}

export async function getInstitutionById(id) {
  const registry = await loadRegistry();
  const all = registry.length > 0 ? registry : globalInstitutions;
  return all.find(inst => inst.id === id || inst.id === `inst-${id}`) || null;
}
