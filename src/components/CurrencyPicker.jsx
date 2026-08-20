import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, SUPPORTED_CURRENCIES } from '../context/CurrencyContext';
import { ChevronDown, DollarSign } from 'lucide-react';

export default function CurrencyPicker() {
  const { currency, setCurrency, currentCurrencyInfo } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="currency-picker-wrap" ref={dropdownRef}>
      <button 
        className="currency-picker-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Currency"
        title="Select Currency"
      >
        <span className="currency-flag">{currentCurrencyInfo.flag}</span>
        <span className="currency-code">{currentCurrencyInfo.code} ({currentCurrencyInfo.symbol})</span>
        <ChevronDown size={12} className={`currency-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="currency-dropdown-menu">
          <div className="currency-dropdown-header">Select Display Currency</div>
          {SUPPORTED_CURRENCIES.map((c) => (
            <button
              key={c.code}
              className={`currency-option-row ${currency === c.code ? 'active' : ''}`}
              onClick={() => {
                setCurrency(c.code);
                setIsOpen(false);
              }}
            >
              <div className="d-flex items-center gap-2">
                <span className="c-flag">{c.flag}</span>
                <span className="c-name">{c.name}</span>
              </div>
              <span className="c-symbol">{c.code} ({c.symbol})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
