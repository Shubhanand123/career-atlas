export const careersCreative = [
  {
    id: 'ui-ux-designer',
    name: 'UI/UX Designer',
    family: 'creative',
    subcategory: 'design',
    iscoCode: '2166',
    onetCode: '15-1255.00',
    aliases: ['Product Designer', 'User Experience Designer', 'Interface Designer'],
    shortDescription: 'UI/UX Designers create intuitive, visually appealing, and user-centric interfaces for digital products and applications.',
    description: 'UI (User Interface) and UX (User Experience) Designers bridge the gap between human behavior and digital interfaces. They research how people interact with products, create wireframes and prototypes, and design the final visual elements.',
    whatYouDo: {
      daily: ['Create wireframes in Figma', 'Design high-fidelity UI mockups'],
      weekly: ['Conduct user research interviews', 'Present design concepts to stakeholders'],
      projects: ['Redesigning a mobile banking app for better accessibility'],
      senior: ['Leading design strategy', 'Mentoring junior designers']
    },
    dayInLife: [
      { time: '09:00', activity: 'Review feedback on yesterday\'s designs', type: 'work' },
      { time: '10:30', activity: 'Deep work: building a new checkout flow prototype', type: 'work' },
      { time: '13:30', activity: 'User testing session via Zoom', type: 'research' }
    ],
    skills: {
      technical: [
        { name: 'Figma / Sketch / Adobe XD', category: 'Design Tools', importance: 'critical', level: 'advanced' },
        { name: 'Wireframing & Prototyping', category: 'UX', importance: 'critical', level: 'advanced' }
      ],
      soft: [
        { name: 'Empathy', importance: 'critical' },
        { name: 'Communication', importance: 'critical' }
      ]
    },
    education: {
      minimum: 'Strong portfolio (Degree optional)',
      typical: 'Bachelor\'s in Design, HCI, or related field',
      preferred: 'Master\'s in Human-Computer Interaction (HCI) for UX Research',
      alternatives: ['UX Bootcamps', 'Self-taught with robust portfolio'],
      duration: { min: 0.5, typical: 4, max: 6, unit: 'years' },
      subjects: [
        { name: 'Human-Computer Interaction', importance: 'critical' },
        { name: 'Graphic Design Principles', importance: 'high' }
      ]
    },
    certifications: [
      { name: 'Google UX Design Professional Certificate', provider: 'Coursera', cost: '$39/mo', difficulty: 4 }
    ],
    difficulty: { overall: 6.5, mathematics: 2, theory: 7, practical: 9, problemSolving: 7, memorization: 4, competition: 8, workload: 6, examDifficulty: 3 },
    salary: {
      entry: { min: 55000, max: 80000, currency: 'USD' },
      mid: { min: 80000, max: 120000, currency: 'USD' },
      senior: { min: 110000, max: 160000, currency: 'USD' },
      lead: { min: 140000, max: 200000, currency: 'USD' },
      principal: { min: 160000, max: 250000, currency: 'USD' },
      byCountry: {
        'US': { entry: [60000, 85000], mid: [90000, 130000], senior: [130000, 180000] },
        'IN': { entry: [500000, 1000000], mid: [1000000, 2500000], senior: [2500000, 4500000] },
        'UK': { entry: [30000, 45000], mid: [45000, 70000], senior: [70000, 95000] },
        'DE': { entry: [40000, 55000], mid: [55000, 75000], senior: [75000, 95000] }
      },
      confidence: 'HIGH'
    },
    demand: {
      current: 'high',
      trend: 'stable',
      talentShortage: false,
      hotRegions: ['US', 'UK', 'CA', 'DE', 'AU'],
      outlook2030: 'stable',
      outlook2035: 'transforming',
      confidence: 'HIGH'
    },
    aiImpact: {
      automationExposure: 4.5,
      augmentationPotential: 8.5,
      humanImportance: 7.5,
      futureOpportunity: 8.0,
      tasksAutomated: ['Generating base UI variants', 'Asset resizing'],
      tasksAugmented: ['Rapid wireframing', 'Synthesizing user research data'],
      tasksHuman: ['Deep empathetic user research', 'Stakeholder negotiation'],
      newTasks: ['Designing AI interaction patterns (chatbots, voice)']
    },
    lifestyle: {
      workEnvironment: 'office/remote',
      teamSize: 'small',
      travel: 'minimal',
      workHours: '40/week',
      nightShifts: false,
      stressLevel: 'low-moderate',
      physicalActivity: 'low',
      remoteWork: 'very-high',
      workLifeBalance: 8,
      autonomy: 7
    },
    careerProgression: [
      { level: 'Junior Designer', years: '0-2', description: 'Assisting with assets' },
      { level: 'Senior Designer', years: '5-8', description: 'Leading large projects' }
    ],
    specializations: [
      { id: 'ux-research', name: 'UX Researcher', description: 'Focusing entirely on user testing' }
    ],
    relatedCareers: ['frontend-developer', 'product-manager'],
    careerSwitchFrom: ['graphic-designer'],
    careerSwitchTo: ['product-manager'],
    whoShouldChoose: ['Visual thinkers', 'Empathetic problem solvers'],
    whoShouldNot: ['Those who hate taking subjective feedback'],
    misconceptions: ['You just make things look pretty (UX is highly analytical)'],
    industries: ['Technology', 'Agency/Consulting'],
    status: 'established',
    professionalBodies: ['Interaction Design Association (IxDA)']
  }
];
