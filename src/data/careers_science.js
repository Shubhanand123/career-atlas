export const careersScience = [
  {
    id: 'biomedical-scientist',
    name: 'Biomedical Scientist',
    family: 'science',
    subcategory: 'life-sciences',
    iscoCode: '2131',
    onetCode: '19-1021.00',
    aliases: ['Medical Researcher', 'Biological Scientist', 'Clinical Scientist'],
    shortDescription: 'Biomedical Scientists conduct research to improve human health, developing new treatments, vaccines, and diagnostic tools.',
    description: 'Biomedical scientists study how the human body works to find new ways to cure or treat disease. They design and conduct experiments, analyze biological samples, and investigate the underlying mechanisms of illnesses like cancer, diabetes, and infectious diseases.',
    whatYouDo: {
      daily: ['Conduct laboratory experiments', 'Analyze cell cultures and tissues'],
      weekly: ['Review scientific literature', 'Discuss findings with the research team'],
      projects: ['Testing a new compound for anti-cancer properties'],
      senior: ['Securing grant funding', 'Publishing papers in peer-reviewed journals']
    },
    dayInLife: [
      { time: '08:30', activity: 'Review overnight experiment results', type: 'work' },
      { time: '09:00', activity: 'Prepare samples for mass spectrometry', type: 'work' },
      { time: '13:30', activity: 'Data analysis using specialized software', type: 'admin' }
    ],
    skills: {
      technical: [
        { name: 'Laboratory Techniques (PCR, ELISA)', category: 'Lab', importance: 'critical', level: 'advanced' },
        { name: 'Data Analysis (R, Python, SPSS)', category: 'Analysis', importance: 'high', level: 'intermediate' }
      ],
      soft: [
        { name: 'Attention to Detail', importance: 'critical' },
        { name: 'Critical Thinking', importance: 'high' }
      ]
    },
    education: {
      minimum: 'Bachelor\'s degree in Biology or related field',
      typical: 'Ph.D. in Biomedical Sciences, Immunology, or similar',
      preferred: 'Ph.D. + Postdoctoral Fellowship',
      alternatives: ['Master\'s degree for Research Assistant roles'],
      duration: { min: 4, typical: 8, max: 12, unit: 'years' },
      subjects: [
        { name: 'Molecular Biology', importance: 'critical' },
        { name: 'Biochemistry', importance: 'critical' }
      ]
    },
    certifications: [
      { name: 'Clinical Laboratory Scientist (CLS)', provider: 'ASCP', cost: '$200', difficulty: 7 }
    ],
    difficulty: { overall: 8.5, mathematics: 6, theory: 9, practical: 9, problemSolving: 9, memorization: 8, competition: 8, workload: 8, examDifficulty: 8 },
    salary: {
      entry: { min: 50000, max: 70000, currency: 'USD' },
      mid: { min: 70000, max: 100000, currency: 'USD' },
      senior: { min: 100000, max: 150000, currency: 'USD' },
      lead: { min: 130000, max: 180000, currency: 'USD' },
      principal: { min: 150000, max: 250000, currency: 'USD' },
      byCountry: {
        'US': { entry: [55000, 75000], mid: [80000, 110000], senior: [110000, 160000] },
        'IN': { entry: [400000, 800000], mid: [800000, 1500000], senior: [1500000, 3000000] },
        'UK': { entry: [30000, 40000], mid: [40000, 60000], senior: [60000, 90000] },
        'DE': { entry: [45000, 55000], mid: [55000, 75000], senior: [75000, 100000] }
      },
      confidence: 'HIGH'
    },
    demand: {
      current: 'high',
      trend: 'growing',
      talentShortage: false,
      hotRegions: ['US', 'UK', 'CH', 'DE'],
      outlook2030: 'growing',
      outlook2035: 'transforming',
      confidence: 'HIGH'
    },
    aiImpact: {
      automationExposure: 3.0,
      augmentationPotential: 9.5,
      humanImportance: 8.5,
      futureOpportunity: 9.0,
      tasksAutomated: ['Basic microscopy cell counting', 'Literature search summaries'],
      tasksAugmented: ['Protein folding predictions', 'Genomic data analysis'],
      tasksHuman: ['Experimental design', 'Hypothesis generation'],
      newTasks: ['Operating AI-driven lab robotics']
    },
    lifestyle: {
      workEnvironment: 'laboratory/office',
      teamSize: 'small-medium',
      travel: 'low',
      workHours: '40-50/week',
      nightShifts: false,
      stressLevel: 'moderate',
      physicalActivity: 'medium',
      remoteWork: 'low',
      workLifeBalance: 6,
      autonomy: 8
    },
    careerProgression: [
      { level: 'Research Assistant', years: '0-2', description: 'Performing routine lab tasks' },
      { level: 'Postdoctoral Researcher', years: '2-6', description: 'Conducting independent research post-PhD' }
    ],
    specializations: [
      { id: 'immunology', name: 'Immunologist', description: 'Studying the immune system and vaccines' }
    ],
    relatedCareers: ['pharmacologist', 'medical-doctor'],
    careerSwitchFrom: ['medical-technologist'],
    careerSwitchTo: ['science-writer', 'pharmaceutical-sales'],
    whoShouldChoose: ['Deep thinkers', 'Curious minds'],
    whoShouldNot: ['Those wanting fast, immediate results'],
    misconceptions: ['Cures are found overnight'],
    industries: ['Pharmaceuticals', 'Academia'],
    status: 'established',
    professionalBodies: ['AAAS']
  }
];
