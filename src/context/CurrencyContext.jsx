import React, { createContext, useContext, useState, useEffect } from 'react';
import { convertCurrency, formatCurrency, CURRENCY_SYMBOLS, BASE_RATES_TO_USD } from '../utils/currencyConverter';

const CurrencyContext = createContext();

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' }
];

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem('careerAtlas_currency');
      return saved || 'USD';
    } catch {
      return 'USD';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('careerAtlas_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  const convert = (amount, fromCurrency = 'USD') => {
    return convertCurrency(amount, fromCurrency, currency);
  };

  const format = (amount, fromCurrency = 'USD', formatStyle = 'standard') => {
    const converted = convertCurrency(amount, fromCurrency, currency);
    return formatCurrency(converted, currency, formatStyle);
  };

  const currentCurrencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      convert,
      format,
      currentCurrencyInfo,
      supportedCurrencies: SUPPORTED_CURRENCIES
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    return {
      currency: 'USD',
      setCurrency: () => {},
      convert: (a) => a,
      format: (a) => `$${a}`,
      currentCurrencyInfo: SUPPORTED_CURRENCIES[0],
      supportedCurrencies: SUPPORTED_CURRENCIES
    };
  }
  return ctx;
}
