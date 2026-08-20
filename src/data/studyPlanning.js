// Planning values are rounded annual USD estimates, designed for scenario comparison—not fee quotes.
export const studyDestinations = [
  { id: 'canada-toronto', countryCode: 'CA', country: 'Canada', city: 'Toronto', tuitionAnnual: 34000, livingAnnual: 19000, oneTimeCosts: 3800, years: 4, note: 'Public-university international estimate; co-op and province materially change cost.' },
  { id: 'uk-london', countryCode: 'UK', country: 'United Kingdom', city: 'London', tuitionAnnual: 31000, livingAnnual: 23000, oneTimeCosts: 4200, years: 3, note: 'Typical three-year undergraduate route; London housing is the main variable.' },
  { id: 'germany-berlin', countryCode: 'DE', country: 'Germany', city: 'Berlin', tuitionAnnual: 1800, livingAnnual: 14500, oneTimeCosts: 3100, years: 3, note: 'Public tuition can be low; blocked-account, insurance, and language requirements apply.' },
  { id: 'australia-melbourne', countryCode: 'AU', country: 'Australia', city: 'Melbourne', tuitionAnnual: 30000, livingAnnual: 18000, oneTimeCosts: 3900, years: 3, note: 'Estimate varies significantly by degree, housing choice, and work rights.' },
  { id: 'usa-boston', countryCode: 'US', country: 'United States', city: 'Boston', tuitionAnnual: 57000, livingAnnual: 25000, oneTimeCosts: 4800, years: 4, note: 'Private-university planning estimate before need-based aid and institutional grants.' },
  { id: 'singapore', countryCode: 'SG', country: 'Singapore', city: 'Singapore', tuitionAnnual: 24000, livingAnnual: 14500, oneTimeCosts: 3500, years: 4, note: 'Grant and bond conditions may apply; residence availability changes living costs.' }
];

export const scholarships = [
  { id: 'institutional-merit', name: 'Institutional merit award', countries: ['CA', 'UK', 'US', 'AU', 'SG'], typicalAward: 12000 },
  { id: 'national-talent', name: 'National talent scholarship', countries: ['CA', 'UK', 'DE', 'AU'], typicalAward: 9000 },
  { id: 'discipline-fund', name: 'STEM / sport / arts fund', countries: ['CA', 'UK', 'US', 'AU', 'SG'], typicalAward: 6000 },
  { id: 'germany-foundation', name: 'German foundation stipend', countries: ['DE'], typicalAward: 11000 }
];
