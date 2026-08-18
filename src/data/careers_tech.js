export const careersTech = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    family: 'technology',
    subcategory: 'software-development',
    iscoCode: '2512',
    onetCode: '15-1252.00',
    aliases: ['Software Developer', 'Programmer', 'Application Developer'],
    shortDescription: 'Software Engineers design, develop, and maintain the software systems that power modern technology.',
    description: 'Software Engineers are the architects and builders of the digital world. They apply computer science principles, mathematical analysis, and engineering concepts to design, develop, test, and evaluate software and systems.',
    whatYouDo: {
      daily: ['Write clean, maintainable code', 'Review pull requests from peers', 'Participate in agile ceremonies (standups)'],
      weekly: ['Sprint planning and retrospective meetings', 'System architecture discussions', 'Deploying updates to production'],
      projects: ['Building new user-facing features', 'Migrating legacy systems to modern cloud infrastructure'],
      senior: ['Designing complex distributed systems', 'Mentoring junior developers']
    },
    dayInLife: [
      { time: '09:00', activity: 'Morning review of emails and project boards', type: 'admin' },
      { time: '09:30', activity: 'Team daily standup meeting', type: 'meeting' },
      { time: '10:00', activity: 'Deep work: coding a new API endpoint', type: 'work' }
    ],
    skills: {
      technical: [
        { name: 'Programming Languages (Python, Java, JS)', category: 'Programming', importance: 'critical', level: 'advanced' }
      ],
      soft: [
        { name: 'Problem Solving', importance: 'critical' }
      ]
    },
    education: {
      minimum: 'Bachelor\'s degree in Computer Science or related field',
      typical: 'Bachelor\'s in CS, Software Engineering, or related',
      preferred: 'Master\'s in Computer Science',
      alternatives: ['Coding bootcamps', 'Self-taught with a strong portfolio'],
      duration: { min: 0.5, typical: 4, max: 6, unit: 'years' },
      subjects: [
        { name: 'Data Structures and Algorithms', importance: 'critical' }
      ]
    },
    certifications: [
      { name: 'AWS Certified Solutions Architect', provider: 'Amazon', cost: '$150', difficulty: 7 }
    ],
    difficulty: { overall: 7.5, mathematics: 6, theory: 7, practical: 8, problemSolving: 9, memorization: 4, competition: 8, workload: 7, examDifficulty: 6 },
    salary: {
      entry: { min: 60000, max: 100000, currency: 'USD' },
      mid: { min: 100000, max: 150000, currency: 'USD' },
      senior: { min: 140000, max: 220000, currency: 'USD' },
      lead: { min: 180000, max: 300000, currency: 'USD' },
      principal: { min: 250000, max: 500000, currency: 'USD' },
      byCountry: {
        'US': { entry: [70000, 110000], mid: [110000, 160000], senior: [160000, 250000] },
        'IN': { entry: [600000, 1500000], mid: [1500000, 3500000], senior: [3500000, 7000000] },
        'UK': { entry: [35000, 50000], mid: [50000, 80000], senior: [80000, 130000] },
        'DE': { entry: [45000, 65000], mid: [65000, 95000], senior: [95000, 140000] }
      },
      confidence: 'HIGH'
    },
    demand: {
      current: 'very-high',
      trend: 'growing',
      talentShortage: true,
      hotRegions: ['US', 'IN', 'DE', 'UK', 'CA'],
      outlook2030: 'growing',
      outlook2035: 'transforming',
      confidence: 'HIGH'
    },
    aiImpact: {
      automationExposure: 4.0,
      augmentationPotential: 9.5,
      humanImportance: 7.0,
      futureOpportunity: 9.0,
      tasksAutomated: ['Boilerplate code generation'],
      tasksAugmented: ['Code refactoring'],
      tasksHuman: ['System architecture'],
      newTasks: ['AI integration']
    },
    lifestyle: {
      workEnvironment: 'office/remote',
      teamSize: 'medium',
      travel: 'minimal',
      workHours: '40-45/week',
      nightShifts: false,
      stressLevel: 'moderate',
      physicalActivity: 'low',
      remoteWork: 'high',
      workLifeBalance: 7,
      autonomy: 8
    },
    careerProgression: [
      { level: 'Junior Developer', years: '0-2', description: 'Learning codebase, bug fixes' }
    ],
    specializations: [
      { id: 'frontend', name: 'Frontend Engineering', description: 'User interfaces' }
    ],
    relatedCareers: ['data-scientist'],
    careerSwitchFrom: ['mathematician'],
    careerSwitchTo: ['product-manager'],
    whoShouldChoose: ['Analytical thinkers'],
    whoShouldNot: ['Those who dislike screen time'],
    misconceptions: ['You just sit in a basement typing alone'],
    industries: ['Technology'],
    status: 'established',
    professionalBodies: ['ACM']
  }
];
