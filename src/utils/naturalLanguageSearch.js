// Natural Language Query Parser for Career Atlas
// Parses queries like "AI engineering in Germany under ₹20 lakh", "Sports careers after science",
// "High-paying careers without coding", "Affordable universities in Australia", etc.

export function parseNaturalLanguageQuery(query = '') {
  if (!query || typeof query !== 'string') {
    return { raw: '', keywords: '', filters: {}, badges: [] };
  }

  const q = query.trim().toLowerCase();
  const filters = {};
  const badges = [];
  let remainingText = q;

  // 1. Detect Budget constraints (e.g. "under ₹20 lakh", "under $20,000", "< 15000 eur", "under 10k")
  const lakhMatch = q.match(/under\s*(?:₹|inr|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lac|lacs|l)/i) ||
                    q.match(/(?:below|less than|<)\s*(?:₹|inr|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lac|lacs|l)/i);
  if (lakhMatch) {
    const lakhVal = parseFloat(lakhMatch[1]);
    const maxINR = lakhVal * 100000;
    const maxUSD = Math.round(maxINR / 85); // approximate conversion
    filters.maxBudgetINR = maxINR;
    filters.maxBudgetUSD = maxUSD;
    badges.push(`Budget: ≤ ₹${lakhVal} Lakh (~$${(maxUSD/1000).toFixed(0)}k)`);
    remainingText = remainingText.replace(lakhMatch[0], '');
  } else {
    const usdMatch = q.match(/under\s*(?:\$|usd)?\s*(\d+)(?:,\d+)?(?:\s*k|\s*thousand|\s*usd)?(?:\s*(?:per|a)\s*year)?/i);
    if (usdMatch) {
      let usdVal = parseInt(usdMatch[1].replace(/,/g, ''), 10);
      if (usdMatch[0].includes('k') && usdVal < 1000) usdVal *= 1000;
      if (usdVal > 1000) {
        filters.maxBudgetUSD = usdVal;
        filters.maxBudgetINR = Math.round(usdVal * 85);
        badges.push(`Budget: ≤ $${usdVal.toLocaleString()}/yr`);
        remainingText = remainingText.replace(usdMatch[0], '');
      }
    }
  }

  // 2. Detect Countries / Regions
  const countryMap = [
    { names: ['germany', 'deutschland', 'german'], code: 'DE', label: 'Germany 🇩🇪' },
    { names: ['canada', 'canadian', 'toronto', 'vancouver'], code: 'CA', label: 'Canada 🇨🇦' },
    { names: ['united states', 'usa', 'america', 'us', 'american'], code: 'US', label: 'United States 🇺🇸' },
    { names: ['united kingdom', 'uk', 'britain', 'england', 'british', 'london'], code: 'UK', label: 'United Kingdom 🇬🇧' },
    { names: ['australia', 'australian', 'sydney', 'melbourne'], code: 'AU', label: 'Australia 🇦🇺' },
    { names: ['india', 'indian', 'iit', 'iim', 'delhi', 'mumbai', 'bangalore'], code: 'IN', label: 'India 🇮🇳' },
    { names: ['singapore', 'nus', 'ntu'], code: 'SG', label: 'Singapore 🇸🇬' },
    { names: ['france', 'french', 'paris'], code: 'FR', label: 'France 🇫🇷' },
    { names: ['japan', 'japanese', 'tokyo'], code: 'JP', label: 'Japan 🇯🇵' },
    { names: ['netherlands', 'holland', 'dutch', 'amsterdam'], code: 'NL', label: 'Netherlands 🇳🇱' },
    { names: ['switzerland', 'swiss', 'zurich'], code: 'CH', label: 'Switzerland 🇨🇭' }
  ];

  for (const c of countryMap) {
    for (const name of c.names) {
      const regex = new RegExp(`\\b${name}\\b`, 'i');
      if (regex.test(remainingText)) {
        filters.country = c.code;
        badges.push(`Country: ${c.label}`);
        remainingText = remainingText.replace(regex, '');
        break;
      }
    }
    if (filters.country) break;
  }

  // 3. Detect Stream / Academic Field Intent
  const streamMap = [
    { regex: /\b(?:after|in|from)?\s*science\b/i, stream: 'science', label: 'Stream: Science 🔬' },
    { regex: /\b(?:after|in|from)?\s*commerce\b/i, stream: 'commerce', label: 'Stream: Commerce 📊' },
    { regex: /\b(?:after|in|from)?\s*(?:arts|humanities)\b/i, stream: 'arts', label: 'Stream: Arts & Humanities 🎨' },
    { regex: /\b(?:after|in|from)?\s*(?:trades|vocational|iti|polytechnic)\b/i, stream: 'trades', label: 'Stream: Trades & Vocational 🛠️' }
  ];

  for (const s of streamMap) {
    if (s.regex.test(remainingText)) {
      filters.stream = s.stream;
      badges.push(s.label);
      remainingText = remainingText.replace(s.regex, '');
      break;
    }
  }

  // 4. Detect Specific Industry / Domain Specializations
  const familyMap = [
    { keywords: ['sport', 'sports', 'football', 'cricket', 'athlete', 'coach', 'fitness', 'athletic', 'esports', 'badminton'], family: 'sports', label: 'Category: Sports ⚽' },
    { keywords: ['ai', 'artificial intelligence', 'machine learning', 'data science', 'software', 'coding', 'cybersecurity', 'tech', 'cloud', 'developer', 'engineering', 'systems'], family: 'technology', label: 'Category: Tech & AI 💻' },
    { keywords: ['doctor', 'nurse', 'nursing', 'medical', 'medicine', 'hospital', 'dentist', 'physio', 'pharmacy', 'health', 'surgeon'], family: 'healthcare', label: 'Category: Healthcare & Medicine 🩺' },
    { keywords: ['business', 'finance', 'consulting', 'banking', 'management', 'marketing', 'sales', 'startup', 'product manager'], family: 'business', label: 'Category: Business & Finance 📈' },
    { keywords: ['design', 'creative', 'art', 'graphic', 'ux', 'fashion', 'animation', 'film', 'music', 'journalism', 'media'], family: 'creative', label: 'Category: Design & Media 🎨' },
    { keywords: ['civil', 'mechanical', 'electrical', 'aerospace', 'robotics', 'chemical engineer', 'infrastructure'], family: 'engineering', label: 'Category: Engineering ⚙️' },
    { keywords: ['trade', 'carpenter', 'electrician', 'plumber', 'welder', 'mechanic', 'construction', 'laborer', 'machinist'], family: 'trades', label: 'Category: Trades & Labor 🔨' },
    { keywords: ['politics', 'politician', 'diplomat', 'judge', 'lawyer', 'bureaucrat', 'civil service', 'ias', 'government'], family: 'law', label: 'Category: Government & Law ⚖️' },
    { keywords: ['agriculture', 'farmer', 'farming', 'forestry', 'soil', 'agronomy', 'viticulture', 'aquaculture', 'horticulture'], family: 'agriculture', label: 'Category: Agriculture 🌾' },
    { keywords: ['research', 'scientist', 'physics', 'chemistry', 'biology', 'astronomy', 'genetics', 'geology'], family: 'science', label: 'Category: Pure Science 🧪' }
  ];

  for (const f of familyMap) {
    for (const kw of f.keywords) {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(remainingText)) {
        filters.family = f.family;
        badges.push(f.label);
        break;
      }
    }
    if (filters.family) break;
  }

  // 5. Detect Non-Coding / Non-Math / Low Stress preferences
  if (/\b(?:without|no|non)[-\s]*(?:coding|programming|code)\b/i.test(q)) {
    filters.noCoding = true;
    badges.push('Requirement: Non-Coding');
  }

  if (/\b(?:high[-\s]*paying|high salary|highest paying|rich|top salary)\b/i.test(q)) {
    filters.highPaying = true;
    badges.push('Sort: High Paying');
  }

  if (/\b(?:affordable|cheap|low cost|budget friendly)\b/i.test(q)) {
    filters.affordable = true;
    badges.push('Filter: High Affordability / Low Cost');
  }

  if (/\b(?:other than player|non[-\s]*athlete|behind the scenes)\b/i.test(q)) {
    filters.nonAthlete = true;
    badges.push('Focus: Non-Athlete Sports Careers');
  }

  // Clean remaining text into clean keywords
  const cleanedKeywords = remainingText
    .replace(/\b(?:in|under|for|after|with|without|best|top|affordable|careers?|jobs?|universit(?:y|ies)|colleges?)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    raw: query,
    keywords: cleanedKeywords,
    filters,
    badges
  };
}
