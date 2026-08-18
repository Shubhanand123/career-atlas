export const careersOther = [
  {
    id: 'lawyer',
    name: 'Lawyer',
    family: 'law',
    subcategory: 'lawyers',
    iscoCode: '2611',
    onetCode: '23-1011.00',
    aliases: ['Attorney', 'Counsel', 'Advocate'],
    shortDescription: 'Lawyers advise and represent individuals, businesses, and government agencies on legal issues and disputes.',
    description: 'Lawyers, also known as attorneys, act as both advocates and advisors. As advocates, they represent clients in criminal and civil trials by presenting evidence and arguing in court. As advisors, they counsel their clients on legal rights and obligations in business or personal matters. The profession requires intense analytical reading, writing, and negotiating skills.',
    whatYouDo: {
      daily: ['Read and analyze legal documents and case law', 'Draft contracts, briefs, or wills', 'Communicate with clients and opposing counsel'],
      weekly: ['Attend court hearings or depositions', 'Negotiate settlements', 'Conduct legal research'],
      projects: ['Preparing for a major civil litigation trial', 'Structuring a complex corporate merger'],
      senior: ['Managing a law firm', 'Arguing in appellate courts', 'Developing firm strategy and acquiring major clients']
    },
    dayInLife: [
      { time: '08:30', activity: 'Review emails and daily docket', type: 'admin' },
      { time: '09:30', activity: 'Meeting with a new client for intake', type: 'meeting' },
      { time: '11:00', activity: 'Drafting a motion for summary judgment', type: 'work' },
      { time: '13:00', activity: 'Working lunch reading case law', type: 'research' },
      { time: '14:00', activity: 'Conference call negotiating a contract term', type: 'collaboration' },
      { time: '15:30', activity: 'Pre-trial prep with witnesses', type: 'meeting' },
      { time: '17:30', activity: 'Finalizing and filing documents with the court', type: 'admin' }
    ],
    skills: {
      technical: [
        { name: 'Legal Research (Westlaw/LexisNexis)', category: 'Research', importance: 'critical', level: 'advanced' },
        { name: 'Legal Writing & Drafting', category: 'Communication', importance: 'critical', level: 'advanced' },
        { name: 'Litigation/Negotiation', category: 'Legal', importance: 'high', level: 'advanced' }
      ],
      soft: [
        { name: 'Analytical Thinking', importance: 'critical' },
        { name: 'Persuasion', importance: 'critical' },
        { name: 'Stress Management', importance: 'high' }
      ]
    },
    education: {
      minimum: 'Bachelor\'s Degree + Law Degree (JD/LLB)',
      typical: 'Juris Doctor (JD)',
      preferred: 'JD from a top-tier law school',
      alternatives: ['Reading the law (in very few jurisdictions)'],
      duration: { min: 7, typical: 7, max: 8, unit: 'years' },
      subjects: [
        { name: 'Constitutional Law', importance: 'critical' },
        { name: 'Contracts', importance: 'critical' },
        { name: 'Torts', importance: 'high' }
      ]
    },
    certifications: [
      { name: 'State Bar License', provider: 'State Bar Association', cost: '$500+', difficulty: 9 }
    ],
    difficulty: { overall: 8.5, mathematics: 2, theory: 9, practical: 8, problemSolving: 9, memorization: 9, competition: 9, workload: 10, examDifficulty: 9 },
    salary: {
      entry: { min: 60000, max: 120000, currency: 'USD' },
      mid: { min: 100000, max: 200000, currency: 'USD' },
      senior: { min: 150000, max: 350000, currency: 'USD' },
      lead: { min: 250000, max: 600000, currency: 'USD' },
      principal: { min: 500000, max: 2000000, currency: 'USD' },
      byCountry: {
        'US': { entry: [70000, 215000], mid: [120000, 300000], senior: [200000, 500000] },
        'IN': { entry: [300000, 800000], mid: [800000, 2500000], senior: [2500000, 10000000] },
        'UK': { entry: [30000, 50000], mid: [60000, 100000], senior: [100000, 250000] },
        'DE': { entry: [50000, 70000], mid: [80000, 120000], senior: [120000, 250000] }
      },
      confidence: 'HIGH'
    },
    demand: {
      current: 'high',
      trend: 'stable',
      talentShortage: false,
      hotRegions: ['US', 'UK', 'CA'],
      outlook2030: 'stable',
      outlook2035: 'transforming',
      confidence: 'HIGH'
    },
    aiImpact: {
      automationExposure: 5.5,
      augmentationPotential: 9.5,
      humanImportance: 8.5,
      futureOpportunity: 8.0,
      tasksAutomated: ['Document review (eDiscovery)', 'Basic contract drafting', 'Initial legal research'],
      tasksAugmented: ['Case strategy formulation', 'Predictive analytics for litigation outcomes'],
      tasksHuman: ['Courtroom advocacy', 'Client counseling', 'Ethical judgments', 'Complex negotiations'],
      newTasks: ['Auditing AI legal output', 'Managing legal tech infrastructure']
    },
    lifestyle: {
      workEnvironment: 'office/courtroom',
      teamSize: 'small-medium',
      travel: 'moderate',
      workHours: '50-80/week',
      nightShifts: false,
      stressLevel: 'very-high',
      physicalActivity: 'low',
      remoteWork: 'moderate',
      workLifeBalance: 3,
      autonomy: 7
    },
    careerProgression: [
      { level: 'Associate', years: '0-5', description: 'Legal research, drafting documents, assisting in cases' },
      { level: 'Senior Associate', years: '5-8', description: 'Managing smaller cases, taking depositions independently' },
      { level: 'Partner', years: '8+', description: 'Equity owner, bringing in clients, high-level strategy' }
    ],
    specializations: [
      { id: 'corporate', name: 'Corporate Lawyer', description: 'Business transactions and mergers' },
      { id: 'criminal', name: 'Criminal Defense Attorney', description: 'Defending individuals accused of crimes' }
    ],
    relatedCareers: ['judge', 'paralegal', 'mediator'],
    careerSwitchFrom: ['paralegal', 'police-officer', 'politician'],
    careerSwitchTo: ['judge', 'corporate-executive', 'politician'],
    whoShouldChoose: ['Argumentative thinkers', 'People who love reading and writing', 'Those seeking prestige and high income potential'],
    whoShouldNot: ['People who hate conflict', 'Those looking for a 40-hour work week', 'People who dislike tedious paperwork'],
    misconceptions: ['It\'s like TV courtroom dramas (it\'s 95% reading and writing)'],
    industries: ['Legal Services', 'Corporate', 'Government'],
    status: 'established',
    professionalBodies: ['American Bar Association', 'Law Society']
  }
];
