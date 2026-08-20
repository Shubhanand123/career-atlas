import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';
import { LANGUAGES, getStoredLanguage, setLanguage } from '../i18n';

export default function LanguagePicker() {
  const [language, setCurrentLanguage] = useState(getStoredLanguage);

  useEffect(() => {
    const update = event => setCurrentLanguage(event.detail || getStoredLanguage());
    window.addEventListener('career-atlas-language-change', update);
    setLanguage(language);
    return () => window.removeEventListener('career-atlas-language-change', update);
  }, [language]);

  return (
    <label className="language-picker" title="Interface language preference">
      <Languages size={14} aria-hidden="true" />
      <select aria-label="Interface language" value={language} onChange={event => setLanguage(event.target.value)}>
        {LANGUAGES.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
      </select>
    </label>
  );
}
