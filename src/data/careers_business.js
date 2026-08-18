export const careersBusiness = [
  {
    id: 'management-consultant',
    name: 'Management Consultant',
    family: 'business',
    subcategory: 'consulting',
    iscoCode: '2421',
    onetCode: '13-1111.00',
    aliases: ['Strategy Consultant', 'Business Analyst', 'Adviser'],
    shortDescription: 'Management Consultants help organizations solve complex issues, create value, maximize growth, and improve business performance.',
    description: 'Management consultants are problem solvers hired by companies, governments, and nonprofits to identify issues, analyze data, and implement strategic changes.',
    whatYouDo: {
      daily: ['Analyze financial and operational data', 'Create slide decks for client presentations'],
      weekly: ['Travel to client sites', 'Present interim findings to stakeholders'],
      projects: ['Post-merger integration for two tech giants'],
      senior: ['Selling new consulting projects', 'Managing client executive relationships']
    },
    dayInLife: [
      { time: '08:00', activity: 'Flight or travel to client site', type: 'travel' },
      { time: '10:00', activity: 'Kickoff meeting with client executives', type: 'meeting' },
      { time: '14:00', activity: 'Financial modeling in Excel', type: 'work' }
    ],
    skills: {
      technical: [
        { name: 'Financial Modeling & Excel', category: 'Analysis', importance: 'critical', level: 'advanced' },
        { name: 'Presentation Design (PowerPoint)', category: 'Communication', importance: 'critical', level: 'advanced' }
      ],
      soft: [
        { name: 'Structured Problem Solving', importance: 'critical' },
        { name: 'Client Management', importance: 'critical' }
      ]
    },
    education: {
      minimum: 'Bachelor\'s degree from a top-tier university',
      typical: 'MBA from a top-tier business school',
      preferred: 'MBA, JD, or PhD depending on specialty',
      alternatives: ['Industry experts transitioning mid-career'],
      duration: { min: 4, typical: 6, max: 8, unit: 'years' },
      subjects: [
        { name: 'Economics', importance: 'high' },
        { name: 'Business Strategy', importance: 'critical' }
      ]
    },
    certifications: [
      { name: 'Certified Management Consultant (CMC)', provider: 'IMC', cost: '$350', difficulty: 7 }
    ],
    difficulty: { overall: 8.5, mathematics: 7, theory: 8, practical: 8, problemSolving: 9, memorization: 5, competition: 9, workload: 10, examDifficulty: 6 },
    salary: {
      entry: { min: 80000, max: 120000, currency: 'USD' },
      mid: { min: 140000, max: 220000, currency: 'USD' },
      senior: { min: 250000, max: 400000, currency: 'USD' },
      lead: { min: 400000, max: 1000000, currency: 'USD' },
      principal: { min: 1000000, max: 3000000, currency: 'USD' },
      byCountry: {
        'US': { entry: [90000, 120000], mid: [150000, 220000], senior: [250000, 500000] },
        'IN': { entry: [1200000, 2500000], mid: [3000000, 5000000], senior: [6000000, 15000000] },
        'UK': { entry: [45000, 60000], mid: [75000, 120000], senior: [130000, 300000] },
        'DE': { entry: [65000, 85000], mid: [100000, 140000], senior: [150000, 300000] }
      },
      confidence: 'HIGH'
    },
    demand: {
      current: 'high',
      trend: 'stable',
      talentShortage: false,
      hotRegions: ['US', 'UK', 'AE', 'SG'],
      outlook2030: 'stable',
      outlook2035: 'transforming',
      confidence: 'HIGH'
    },
    aiImpact: {
      automationExposure: 4.5,
      augmentationPotential: 9.0,
      humanImportance: 8.5,
      futureOpportunity: 9.0,
      tasksAutomated: ['Basic data aggregation', 'Initial slide drafting'],
      tasksAugmented: ['Rapid scenario modeling'],
      tasksHuman: ['Persuading skeptical executives'],
      newTasks: ['Advising clients on AI transformation']
    },
    lifestyle: {
      workEnvironment: 'office/client-site',
      teamSize: 'small',
      travel: 'high',
      workHours: '55-70/week',
      nightShifts: false,
      stressLevel: 'high',
      physicalActivity: 'low',
      remoteWork: 'moderate',
      workLifeBalance: 3,
      autonomy: 6
    },
    careerProgression: [
      { level: 'Business Analyst', years: '0-2', description: 'Data crunching, slide building' },
      { level: 'Engagement Manager', years: '2-5', description: 'Leading workstreams' }
    ],
    specializations: [
      { id: 'strategy', name: 'Strategy Consulting', description: 'C-level strategic direction' }
    ],
    relatedCareers: ['investment-banker', 'product-manager'],
    careerSwitchFrom: ['engineer'],
    careerSwitchTo: ['corporate-strategy-director'],
    whoShouldChoose: ['Ambitious overachievers'],
    whoShouldNot: ['Those needing strict work-life balance'],
    misconceptions: ['It\'s all glamorous travel'],
    industries: ['Consulting', 'Finance'],
    status: 'established',
    professionalBodies: ['Institute of Management Consultants']
  }
];
