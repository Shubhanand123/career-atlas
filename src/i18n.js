import { useEffect, useState } from 'react';

export const LANGUAGES = [
  ['en', 'English'], ['hi', 'हिन्दी'], ['es', 'Español'], ['fr', 'Français'], ['de', 'Deutsch'],
  ['pt', 'Português'], ['ar', 'العربية'], ['zh', '中文'], ['ja', '日本語'], ['it', 'Italiano'],
  ['ko', '한국어'], ['ru', 'Русский'], ['nl', 'Nederlands'], ['tr', 'Türkçe'], ['id', 'Bahasa Indonesia'],
  ['bn', 'বাংলা'], ['mr', 'मराठी'], ['ta', 'தமிழ்'], ['te', 'తెలుగు'], ['gu', 'ગુજરાતી'], ['pa', 'ਪੰਜਾਬੀ'], ['kn', 'ಕನ್ನಡ'], ['ml', 'മലയാളം']
];

export const RTL_LANGUAGES = new Set(['ar']);

export const UI_COPY = {
  en: {
    explore: 'Explore', institutions: 'Institutions', compare: 'Compare', search: 'Search',
    saved: 'Saved', profile: 'Profile', menu: 'Open navigation', quiz: 'Quiz',
    workspace: 'Workspace', copilot: 'Copilot', combos: 'Skill Combos', layoffs: 'Layoff & AI Risk',
    sports: 'Sports Ecosystem', trueCost: 'True Cost', payComparison: 'Pay Comparison'
  },
  hi: {
    explore: 'खोजें', institutions: 'संस्थान', compare: 'तुलना', search: 'खोज',
    saved: 'सहेजे गए', profile: 'प्रोफ़ाइल', menu: 'नेविगेशन खोलें', quiz: 'क्विज',
    workspace: 'कार्यक्षेत्र', copilot: 'कोपायलट', combos: 'कौशल कॉम्बो', layoffs: 'छंटनी व एआई जोखिम',
    sports: 'खेल इकोसिस्टम', trueCost: 'वास्तविक लागत', payComparison: 'वेतन तुलना'
  },
  es: {
    explore: 'Explorar', institutions: 'Instituciones', compare: 'Comparar', search: 'Buscar',
    saved: 'Guardados', profile: 'Perfil', menu: 'Abrir navegación', quiz: 'Cuestionario',
    workspace: 'Espacio de trabajo', copilot: 'Copiloto', combos: 'Combos de habilidades', layoffs: 'Riesgo de despidos e IA',
    sports: 'Ecosistema deportivo', trueCost: 'Costo real', payComparison: 'Comparación salarial'
  },
  fr: {
    explore: 'Explorer', institutions: 'Institutions', compare: 'Comparer', search: 'Rechercher',
    saved: 'Enregistrés', profile: 'Profil', menu: 'Ouvrir la navigation', quiz: 'Quiz',
    workspace: 'Espace de travail', copilot: 'Copilote', combos: 'Combos de compétences', layoffs: 'Risque IA & licenciements',
    sports: 'Écosystème sportif', trueCost: 'Coût réel', payComparison: 'Comparaison des salaires'
  },
  de: {
    explore: 'Entdecken', institutions: 'Institutionen', compare: 'Vergleichen', search: 'Suchen',
    saved: 'Gespeichert', profile: 'Profil', menu: 'Navigation öffnen', quiz: 'Quiz',
    workspace: 'Arbeitsbereich', copilot: 'Copilot', combos: 'Fähigkeiten-Kombis', layoffs: 'Kündigungen & KI-Risiko',
    sports: 'Sport-Ökosystem', trueCost: 'Reale Kosten', payComparison: 'Gehaltsvergleich'
  },
  pt: {
    explore: 'Explorar', institutions: 'Instituições', compare: 'Comparar', search: 'Pesquisar',
    saved: 'Salvos', profile: 'Perfil', menu: 'Abrir navegação', quiz: 'Quiz',
    workspace: 'Espaço de trabalho', copilot: 'Copiloto', combos: 'Combinações de habilidades', layoffs: 'Risco de demissões e IA',
    sports: 'Ecossistema esportivo', trueCost: 'Custo real', payComparison: 'Comparação de salários'
  },
  ar: {
    explore: 'استكشف', institutions: 'المؤسسات', compare: 'مقارنة', search: 'بحث',
    saved: 'المحفوظات', profile: 'الملف الشخصي', menu: 'فتح التنقل', quiz: 'اختبار الميول',
    workspace: 'مساحة العمل', copilot: 'المساعد الذكي', combos: 'مجموعات المهارات', layoffs: 'مخاطر الذكاء الاصطناعي',
    sports: 'المنظومة الرياضية', trueCost: 'التكلفة الحقيقية', payComparison: 'مقارنة الرواتب'
  },
  zh: {
    explore: '探索', institutions: '高等院校', compare: '对比分析', search: '搜索',
    saved: '已保存', profile: '个人中心', menu: '打开导航', quiz: '职业测评',
    workspace: '工作台', copilot: 'AI 领航助手', combos: '高薪技能组合', layoffs: '裁员与AI替代风险',
    sports: '体育职业生态', trueCost: '真实留学成本', payComparison: '全球薪酬对比'
  },
  ja: {
    explore: '探検する', institutions: '高等教育機関', compare: '比較する', search: '検索',
    saved: '保存済み', profile: 'プロフィール', menu: 'メニューを開く', quiz: '適性診断',
    workspace: 'ワークスペース', copilot: 'AIコパイロット', combos: 'スキルコンボ', layoffs: 'レイオフ・AIリスク',
    sports: 'スポーツ業界', trueCost: '実際の留学費用', payComparison: '給与比較'
  },
  it: {
    explore: 'Esplora', institutions: 'Istituzioni', compare: 'Confronta', search: 'Cerca',
    saved: 'Salvati', profile: 'Profilo', menu: 'Apri navigazione', quiz: 'Quiz',
    workspace: 'Spazio di lavoro', copilot: 'Copilota', combos: 'Combo di competenze', layoffs: 'Rischio IA e licenziamenti',
    sports: 'Ecosistema sportivo', trueCost: 'Costo effettivo', payComparison: 'Confronto retribuzioni'
  },
  ko: {
    explore: '탐색하기', institutions: '대학 및 기관', compare: '비교하기', search: '검색',
    saved: '저장됨', profile: '프로필', menu: '내비게이션 열기', quiz: '진로 퀴즈',
    workspace: '워크스페이스', copilot: 'AI 코파일럿', combos: '스킬 콤보', layoffs: 'AI 대체 및 구조조정 위험',
    sports: '스포츠 생태계', trueCost: '실제 유학 비용', payComparison: '급여 비교'
  },
  ru: {
    explore: 'Исследовать', institutions: 'Институты', compare: 'Сравнить', search: 'Поиск',
    saved: 'Сохранено', profile: 'Профиль', menu: 'Меню', quiz: 'Тест',
    workspace: 'Рабочее пространство', copilot: 'Копилот', combos: 'Комбинации навыков', layoffs: 'Риски ИИ и сокращений',
    sports: 'Спортивная индустрия', trueCost: 'Реальная стоимость', payComparison: 'Сравнение зарплат'
  },
  bn: {
    explore: 'অন্বেষণ করুন', institutions: 'প্রতিষ্ঠান', compare: 'তুলনা করুন', search: 'অনুসন্ধান',
    saved: 'সংরক্ষিত', profile: 'প্রোফাইল', menu: 'মেনু খুলুন', quiz: 'ক্যারিয়ার কুইজ',
    workspace: 'ওয়ার্কস্পেস', copilot: 'এআই কোপাইলট', combos: 'স্কিল কম্বো', layoffs: 'ছাঁটাই ও এআই ঝুঁকি',
    sports: 'ক্রীড়া ইকোসিস্টেম', trueCost: 'প্রকৃত খরচ', payComparison: 'বেতন তুলনা'
  },
  mr: {
    explore: 'शोधा', institutions: 'संस्था', compare: 'तुलना करा', search: 'शोध',
    saved: 'जतन केलेले', profile: 'प्रोफाइल', menu: 'नेव्हिगेशन उघडा', quiz: 'करिअर क्विझ',
    workspace: 'कार्यक्षेत्र', copilot: 'कॉपायलट', combos: 'कौशल्य कॉम्बो', layoffs: 'कपात आणि एआय जोखीम',
    sports: 'क्रीडा परिसंस्था', trueCost: 'खरा खर्च', payComparison: 'वेतन तुलना'
  },
  ta: {
    explore: 'ஆராயுங்கள்', institutions: 'நிறுவனங்கள்', compare: 'ஒப்பிடு', search: 'தேடு',
    saved: 'சேமிக்கப்பட்டது', profile: 'சுயவிவரம்', menu: 'மெனு திற', quiz: 'வினாடி வினா',
    workspace: 'பணியிடம்', copilot: 'துணை இயக்கி', combos: 'திறன் சேர்க்கைகள்', layoffs: 'ஆட்குறைப்பு & AI ஆபத்து',
    sports: 'விளையாட்டு சூழலியல்', trueCost: 'உண்மையான செலவு', payComparison: 'சம்பள ஒப்பீடு'
  },
  te: {
    explore: 'అన్వేషించండి', institutions: 'సంస్థలు', compare: 'పోల్చండి', search: 'శోధన',
    saved: 'భద్రపరచినవి', profile: 'ప్రొఫైల్', menu: 'మెను తెరవండి', quiz: 'క్విజ్',
    workspace: 'కార్యస్థలం', copilot: 'కోపైలట్', combos: 'నైపుణ్య కాంబోలు', layoffs: 'ఉద్యోగ తొలగింపు & AI ప్రమాదం',
    sports: 'క్రీడా పర్యావరణం', trueCost: 'వాస్తవ ఖర్చు', payComparison: 'జీతం పోలిక'
  }
};

export function getStoredLanguage() {
  return localStorage.getItem('career-atlas-language') || 'en';
}

export function setLanguage(language) {
  const next = LANGUAGES.some(([code]) => code === language) ? language : 'en';
  localStorage.setItem('career-atlas-language', next);
  document.documentElement.lang = next;
  document.documentElement.dir = RTL_LANGUAGES.has(next) ? 'rtl' : 'ltr';
  window.dispatchEvent(new CustomEvent('career-atlas-language-change', { detail: next }));
}

export function useLanguage() {
  const [language, setCurrentLanguage] = useState(getStoredLanguage);

  useEffect(() => {
    const update = (event) => setCurrentLanguage(event.detail || getStoredLanguage());
    window.addEventListener('career-atlas-language-change', update);
    setLanguage(language);
    return () => window.removeEventListener('career-atlas-language-change', update);
  }, []);

  return { language, copy: UI_COPY[language] || UI_COPY.en };
}
