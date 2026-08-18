export const careersEngineering = [
  {
    id: 'mechanical-engineer',
    name: 'Mechanical Engineer',
    family: 'engineering',
    subcategory: 'mechanical',
    iscoCode: '2144',
    onetCode: '17-2141.00',
    aliases: ['Design Engineer', 'Hardware Engineer'],
    shortDescription: 'Mechanical Engineers design, develop, build, and test mechanical and thermal sensors and devices.',
    description: 'Mechanical engineering is one of the broadest engineering disciplines. Mechanical engineers design power-producing machines, such as electric generators, internal combustion engines, and steam and gas turbines.',
    whatYouDo: {
      daily: ['Use CAD software to design parts', 'Run thermal or stress simulations'],
      weekly: ['Design reviews with clients or stakeholders', 'Testing prototypes in the lab'],
      projects: ['Designing a more efficient HVAC system', 'Developing a new robotic arm for assembly lines'],
      senior: ['Overseeing full product lifecycles', 'Managing engineering teams', 'Ensuring safety compliance']
    },
    dayInLife: [
      { time: '08:00', activity: 'Arrive at office/plant, review project timelines', type: 'admin' },
      { time: '09:00', activity: 'CAD modeling for new components', type: 'work' },
      { time: '13:00', activity: 'Lab testing of a prototype part', type: 'work' }
    ],
    skills: {
      technical: [
        { name: 'CAD Software (SolidWorks, AutoCAD)', category: 'Design', importance: 'critical', level: 'advanced' },
        { name: 'Thermodynamics & Mechanics', category: 'Physics', importance: 'critical', level: 'advanced' }
      ],
      soft: [
        { name: 'Problem Solving', importance: 'critical' }
      ]
    },
    education: {
      minimum: 'Bachelor\'s degree in Mechanical Engineering',
      typical: 'Bachelor\'s degree + PE (Professional Engineer) License',
      preferred: 'Master\'s in specialized engineering fields',
      alternatives: ['Mechanical Engineering Technology Degree'],
      duration: { min: 4, typical: 4, max: 6, unit: 'years' },
      subjects: [
        { name: 'Physics', importance: 'critical' },
        { name: 'Calculus', importance: 'critical' }
      ]
    },
    certifications: [
      { name: 'Professional Engineer (PE) License', provider: 'State Boards', cost: '$300+', difficulty: 9 }
    ],
    difficulty: { overall: 8.0, mathematics: 8, theory: 8, practical: 8, problemSolving: 8, memorization: 5, competition: 6, workload: 7, examDifficulty: 8 },
    salary: {
      entry: { min: 65000, max: 85000, currency: 'USD' },
      mid: { min: 85000, max: 115000, currency: 'USD' },
      senior: { min: 110000, max: 150000, currency: 'USD' },
      lead: { min: 130000, max: 180000, currency: 'USD' },
      principal: { min: 150000, max: 200000, currency: 'USD' },
      byCountry: {
        'US': { entry: [70000, 90000], mid: [90000, 120000], senior: [120000, 160000] },
        'IN': { entry: [400000, 800000], mid: [800000, 1800000], senior: [1800000, 3500000] },
        'UK': { entry: [28000, 35000], mid: [35000, 55000], senior: [55000, 80000] },
        'DE': { entry: [48000, 58000], mid: [58000, 75000], senior: [75000, 100000] }
      },
      confidence: 'HIGH'
    },
    demand: {
      current: 'high',
      trend: 'stable',
      talentShortage: false,
      hotRegions: ['DE', 'US', 'JP', 'IN'],
      outlook2030: 'stable',
      outlook2035: 'stable',
      confidence: 'HIGH'
    },
    aiImpact: {
      automationExposure: 3.0,
      augmentationPotential: 8.5,
      humanImportance: 8.5,
      futureOpportunity: 8.0,
      tasksAutomated: ['Basic stress testing simulations'],
      tasksAugmented: ['Rapid prototyping via AI-assisted CAD'],
      tasksHuman: ['Physical safety verification'],
      newTasks: ['Managing generative design outputs']
    },
    lifestyle: {
      workEnvironment: 'hybrid',
      teamSize: 'medium',
      travel: 'moderate',
      workHours: '40/week',
      nightShifts: false,
      stressLevel: 'moderate',
      physicalActivity: 'medium',
      remoteWork: 'low-medium',
      workLifeBalance: 7,
      autonomy: 7
    },
    careerProgression: [
      { level: 'Junior Engineer', years: '0-3', description: 'Assisting in designs' }
    ],
    specializations: [
      { id: 'robotics', name: 'Robotics Engineering', description: 'Designing robotic systems' }
    ],
    relatedCareers: ['aerospace-engineer'],
    careerSwitchFrom: ['machinist'],
    careerSwitchTo: ['project-manager'],
    whoShouldChoose: ['Tinkerers'],
    whoShouldNot: ['People who dislike math'],
    misconceptions: ['You just fix cars'],
    industries: ['Manufacturing', 'Automotive'],
    status: 'established',
    professionalBodies: ['ASME']
  }
];
