export const careersTrades = [
  {
    id: 'electrician',
    name: 'Electrician',
    family: 'trades',
    subcategory: 'electrical-trades',
    iscoCode: '7411',
    onetCode: '47-2111.00',
    aliases: ['Electrical Contractor', 'Journeyman Electrician', 'Wireman'],
    shortDescription: 'Electricians install, maintain, and repair electrical power, communications, lighting, and control systems in homes and businesses.',
    description: 'Electricians are highly skilled tradespeople who ensure the safe and reliable delivery of electricity. They read blueprints, install wiring, troubleshoot electrical problems, and maintain the complex electrical infrastructure of modern buildings.',
    whatYouDo: {
      daily: ['Read blueprints and technical diagrams', 'Install wiring, control, and lighting systems'],
      weekly: ['Identify electrical problems using testing devices', 'Repair or replace wiring and equipment'],
      projects: ['Wiring a newly constructed commercial building', 'Upgrading a home\'s electrical panel for solar integration'],
      senior: ['Planning layouts for electrical wiring', 'Directing and training apprentices', 'Bidding on large contracts']
    },
    dayInLife: [
      { time: '07:00', activity: 'Arrive at job site, review the day\'s blueprints', type: 'admin' },
      { time: '07:30', activity: 'Pulling wire through conduits for a new office space', type: 'work' },
      { time: '13:00', activity: 'Installing and testing light fixtures and switches', type: 'work' }
    ],
    skills: {
      technical: [
        { name: 'Electrical Wiring & Troubleshooting', category: 'Trade Skills', importance: 'critical', level: 'advanced' },
        { name: 'Blueprint Reading', category: 'Technical', importance: 'critical', level: 'intermediate' }
      ],
      soft: [
        { name: 'Safety Consciousness', importance: 'critical' },
        { name: 'Problem Solving', importance: 'high' }
      ]
    },
    education: {
      minimum: 'High School Diploma + Apprenticeship',
      typical: '4-5 Year Paid Apprenticeship Program',
      preferred: 'Apprenticeship + Associate Degree in Electrical Technology',
      alternatives: ['Trade school certificate followed by apprenticeship'],
      duration: { min: 4, typical: 4, max: 5, unit: 'years' },
      subjects: [
        { name: 'Algebra and Basic Math', importance: 'critical' },
        { name: 'Electrical Theory', importance: 'critical' }
      ]
    },
    certifications: [
      { name: 'Journeyman Electrician License', provider: 'State Boards', cost: '$100-$300', difficulty: 7 },
      { name: 'Master Electrician License', provider: 'State Boards', cost: '$200-$400', difficulty: 9 }
    ],
    difficulty: { overall: 7.0, mathematics: 6, theory: 7, practical: 9, problemSolving: 8, memorization: 7, competition: 4, workload: 8, examDifficulty: 7 },
    salary: {
      entry: { min: 40000, max: 55000, currency: 'USD' },
      mid: { min: 60000, max: 85000, currency: 'USD' },
      senior: { min: 85000, max: 120000, currency: 'USD' },
      lead: { min: 100000, max: 150000, currency: 'USD' },
      principal: { min: 120000, max: 200000, currency: 'USD' },
      byCountry: {
        'US': { entry: [45000, 60000], mid: [65000, 90000], senior: [90000, 130000] },
        'IN': { entry: [150000, 300000], mid: [300000, 600000], senior: [600000, 1000000] },
        'UK': { entry: [25000, 32000], mid: [35000, 45000], senior: [45000, 60000] },
        'DE': { entry: [35000, 45000], mid: [45000, 55000], senior: [55000, 70000] }
      },
      confidence: 'HIGH'
    },
    demand: {
      current: 'very-high',
      trend: 'growing',
      talentShortage: true,
      hotRegions: ['US', 'CA', 'AU', 'UK', 'DE'],
      outlook2030: 'growing',
      outlook2035: 'stable',
      confidence: 'HIGH'
    },
    aiImpact: {
      automationExposure: 1.0,
      augmentationPotential: 5.0,
      humanImportance: 9.5,
      futureOpportunity: 9.0,
      tasksAutomated: ['Inventory ordering', 'Scheduling software'],
      tasksAugmented: ['AR glasses for seeing wiring behind walls'],
      tasksHuman: ['Physically routing wires through complex spaces', 'Ensuring physical safety compliance'],
      newTasks: ['Installing smart home AI systems']
    },
    lifestyle: {
      workEnvironment: 'construction-site/various',
      teamSize: 'small',
      travel: 'local',
      workHours: '40/week',
      nightShifts: false,
      stressLevel: 'moderate',
      physicalActivity: 'very-high',
      remoteWork: 'none',
      workLifeBalance: 7,
      autonomy: 8
    },
    careerProgression: [
      { level: 'Apprentice', years: '0-4', description: 'Learning on the job' },
      { level: 'Journeyman Electrician', years: '4-8', description: 'Fully licensed, working independently' }
    ],
    specializations: [
      { id: 'residential', name: 'Residential Electrician', description: 'Wiring homes and apartments' }
    ],
    relatedCareers: ['hvac-technician', 'plumber'],
    careerSwitchFrom: ['construction-laborer'],
    careerSwitchTo: ['electrical-inspector'],
    whoShouldChoose: ['People who like working with their hands', 'Detail-oriented problem solvers'],
    whoShouldNot: ['People afraid of heights or tight spaces', 'Those wanting a desk job'],
    misconceptions: ['It\'s just pulling wires'],
    industries: ['Construction', 'Maintenance', 'Energy'],
    status: 'established',
    professionalBodies: ['IBEW', 'NECA']
  }
];
