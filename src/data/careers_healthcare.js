export const careersHealthcare = [
  {
    id: 'registered-nurse',
    name: 'Registered Nurse (RN)',
    family: 'healthcare',
    subcategory: 'nursing',
    iscoCode: '2221',
    onetCode: '29-1141.00',
    aliases: ['RN', 'Staff Nurse'],
    shortDescription: 'Registered Nurses provide and coordinate patient care, educate patients about health conditions, and provide emotional support.',
    description: 'Registered nurses (RNs) are the backbone of the healthcare system. They assess patient health problems and needs, develop and implement nursing care plans, and maintain medical records. RNs administer nursing care to ill, injured, convalescent, or disabled patients. They work in hospitals, clinics, home care, and schools, playing a critical role in both acute care and long-term health promotion.',
    whatYouDo: {
      daily: ['Administer medications and treatments', 'Monitor patient vital signs', 'Update medical records'],
      weekly: ['Coordinate with doctors and healthcare teams', 'Educate patients and families on post-treatment care'],
      projects: ['Implementing new ward safety protocols', 'Training junior nursing staff'],
      senior: ['Managing nursing shifts', 'Specialized critical care', 'Department administration']
    },
    dayInLife: [
      { time: '07:00', activity: 'Shift handover and patient briefings', type: 'meeting' },
      { time: '07:30', activity: 'Morning rounds, checking vitals and administering meds', type: 'work' },
      { time: '10:00', activity: 'Assisting physician with procedures', type: 'work' },
      { time: '12:00', activity: 'Updating patient charts (EHR)', type: 'admin' },
      { time: '13:00', activity: 'Lunch (if time permits)', type: 'break' },
      { time: '14:00', activity: 'Discharging patients and providing education', type: 'work' },
      { time: '17:00', activity: 'Evening rounds and medication', type: 'work' },
      { time: '19:00', activity: 'Shift handover to night staff', type: 'meeting' }
    ],
    skills: {
      technical: [
        { name: 'Clinical Patient Care', category: 'Medical', importance: 'critical', level: 'advanced' },
        { name: 'Medication Administration', category: 'Medical', importance: 'critical', level: 'advanced' },
        { name: 'Electronic Health Records (EHR)', category: 'Software', importance: 'high', level: 'intermediate' }
      ],
      soft: [
        { name: 'Empathy & Compassion', importance: 'critical' },
        { name: 'Stress Tolerance', importance: 'critical' },
        { name: 'Communication', importance: 'high' }
      ]
    },
    education: {
      minimum: 'Associate\'s Degree in Nursing (ADN) or Nursing Diploma',
      typical: 'Bachelor of Science in Nursing (BSN)',
      preferred: 'BSN with specialty certifications',
      alternatives: ['Accelerated BSN for second-degree students'],
      duration: { min: 2, typical: 4, max: 4, unit: 'years' },
      subjects: [
        { name: 'Anatomy & Physiology', importance: 'critical' },
        { name: 'Pharmacology', importance: 'critical' },
        { name: 'Microbiology', importance: 'high' }
      ]
    },
    certifications: [
      { name: 'NCLEX-RN (Required License)', provider: 'NCSBN', cost: '$200', difficulty: 8 },
      { name: 'Basic Life Support (BLS)', provider: 'AHA', cost: '$80', difficulty: 3 }
    ],
    difficulty: { overall: 7.5, mathematics: 4, theory: 7, practical: 9, problemSolving: 8, memorization: 8, competition: 5, workload: 9, examDifficulty: 8 },
    salary: {
      entry: { min: 55000, max: 75000, currency: 'USD' },
      mid: { min: 75000, max: 95000, currency: 'USD' },
      senior: { min: 95000, max: 125000, currency: 'USD' },
      lead: { min: 110000, max: 150000, currency: 'USD' },
      principal: { min: 130000, max: 200000, currency: 'USD' },
      byCountry: {
        'US': { entry: [60000, 80000], mid: [80000, 100000], senior: [100000, 130000] },
        'IN': { entry: [200000, 400000], mid: [400000, 800000], senior: [800000, 1500000] },
        'UK': { entry: [27000, 32000], mid: [32000, 40000], senior: [40000, 50000] },
        'DE': { entry: [35000, 45000], mid: [45000, 55000], senior: [55000, 70000] }
      },
      confidence: 'HIGH'
    },
    demand: {
      current: 'very-high',
      trend: 'growing',
      talentShortage: true,
      hotRegions: ['US', 'UK', 'DE', 'CA', 'AU'],
      outlook2030: 'growing',
      outlook2035: 'growing',
      confidence: 'HIGH'
    },
    aiImpact: {
      automationExposure: 1.5,
      augmentationPotential: 7.0,
      humanImportance: 9.8,
      futureOpportunity: 8.5,
      tasksAutomated: ['EHR data entry transcription', 'Inventory tracking', 'Basic scheduling'],
      tasksAugmented: ['Diagnostic assistance', 'Patient risk monitoring alerts'],
      tasksHuman: ['Physical patient care', 'Emotional support', 'Complex clinical judgments'],
      newTasks: ['Managing robotic assistants', 'Remote patient monitoring via IoT']
    },
    lifestyle: {
      workEnvironment: 'hospital/clinic',
      teamSize: 'large',
      travel: 'none',
      workHours: '36-40/week (often 12hr shifts)',
      nightShifts: true,
      stressLevel: 'high',
      physicalActivity: 'high',
      remoteWork: 'none',
      workLifeBalance: 6,
      autonomy: 6
    },
    careerProgression: [
      { level: 'Staff Nurse', years: '0-3', description: 'General patient care' },
      { level: 'Charge Nurse', years: '3-8', description: 'Shift leadership on a specific ward' },
      { level: 'Nurse Manager', years: '8-15', description: 'Managing a hospital department or clinic' },
      { level: 'Nurse Practitioner / Advanced Practice', years: '5+ (with Master\'s)', description: 'Diagnosing and prescribing' }
    ],
    specializations: [
      { id: 'icu', name: 'ICU/Critical Care Nurse', description: 'Caring for severely ill patients' },
      { id: 'pediatric', name: 'Pediatric Nurse', description: 'Caring for children and infants' }
    ],
    relatedCareers: ['physician-assistant', 'paramedic', 'nurse-practitioner'],
    careerSwitchFrom: ['medical-assistant', 'paramedic', 'teacher'],
    careerSwitchTo: ['healthcare-administrator', 'nurse-educator', 'medical-sales'],
    whoShouldChoose: ['Empathetic people', 'Those wanting highly active, hands-on work', 'People seeking strong job security'],
    whoShouldNot: ['Those who are squeamish', 'People wanting remote work', 'Those who struggle with high stress'],
    misconceptions: ['Nurses just follow doctors\' orders (they are independent practitioners)', 'It\'s easy work'],
    industries: ['Healthcare', 'Government', 'Education', 'Military'],
    status: 'established',
    professionalBodies: ['ANA', 'ICN']
  }
];
