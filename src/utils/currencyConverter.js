// True-Cost Multi-Currency Conversion Utility
// Provides transparent conversion with date and source metadata.

export const BASE_RATES_TO_USD = {
  USD: 1.0,
  INR: 0.0116,    // 1 USD ≈ 86.2 INR
  EUR: 1.08,      // 1 EUR ≈ 1.08 USD
  GBP: 1.28,      // 1 GBP ≈ 1.28 USD
  CAD: 0.72,      // 1 CAD ≈ 0.72 USD
  AUD: 0.65,      // 1 AUD ≈ 0.65 USD
  SGD: 0.76,      // 1 SGD ≈ 0.76 USD
  JPY: 0.0067,    // 1 JPY ≈ 0.0067 USD (1 USD ≈ 150 JPY)
  CHF: 1.13,      // 1 CHF ≈ 1.13 USD
  AED: 0.272      // 1 AED ≈ 0.272 USD
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  SGD: 'S$',
  JPY: '¥',
  CHF: 'CHF',
  AED: 'AED'
};

export const CONVERSION_METADATA = {
  source: 'International Exchange Rates Benchmark API',
  lastUpdated: '2026-08-20',
  disclaimer: 'Converted currency values are realistic estimates for planning and scenario comparisons.'
};

export function convertCurrency(amount, fromCurrency = 'USD', toCurrency = 'USD') {
  if (amount === undefined || amount === null || isNaN(amount)) return 0;
  const num = Number(amount);
  if (fromCurrency === toCurrency) return num;

  const rateFrom = BASE_RATES_TO_USD[fromCurrency] || 1.0;
  const rateTo = BASE_RATES_TO_USD[toCurrency] || 1.0;

  // Convert from origin currency to USD, then from USD to target currency
  const inUSD = num * rateFrom;
  const inTarget = inUSD / rateTo;
  return Math.round(inTarget);
}

export function formatCurrency(amount, currency = 'USD', formatStyle = 'standard') {
  if (amount === undefined || amount === null || isNaN(amount)) return 'N/A';
  const sym = CURRENCY_SYMBOLS[currency] || currency;
  const val = Number(amount);

  if (currency === 'INR') {
    if (formatStyle === 'compact' && val >= 100000) {
      if (val >= 10000000) {
        return `${sym}${(val / 10000000).toFixed(2)} CPA`;
      }
      return `${sym}${(val / 100000).toFixed(1)} LPA`;
    }
    return `${sym}${val.toLocaleString('en-IN')}`;
  }

  if (formatStyle === 'compact' && val >= 1000) {
    if (val >= 1000000) return `${sym}${(val / 1000000).toFixed(2)}M`;
    return `${sym}${(val / 1000).toFixed(0)}k`;
  }

  return `${sym}${val.toLocaleString('en-US')}`;
}
