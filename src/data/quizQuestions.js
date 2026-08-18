export const traits = [
  { id: 'analytical', name: 'Analytical Thinking', description: 'Ability to break down complex problems and solve them logically.' },
  { id: 'technical', name: 'Technical Aptitude', description: 'Comfort and proficiency with technology, tools, and software.' },
  { id: 'creative', name: 'Creativity', description: 'Ability to generate novel ideas, designs, or solutions.' },
  { id: 'research', name: 'Research Orientation', description: 'Desire to dig deep for information and discover new knowledge.' },
  { id: 'leadership', name: 'Leadership', description: 'Capability to guide, motivate, and manage others effectively.' },
  { id: 'communication', name: 'Communication', description: 'Skill in conveying information clearly, both verbally and in writing.' },
  { id: 'handsOn', name: 'Hands-on Work', description: 'Preference for working with physical materials, tools, or environments.' },
  { id: 'social', name: 'Social Interaction', description: 'Comfort and enjoyment in working closely with people and helping others.' },
  { id: 'entrepreneurial', name: 'Entrepreneurship', description: 'Drive to build new ventures and take calculated business risks.' },
  { id: 'scientific', name: 'Scientific Thinking', description: 'Reliance on empirical evidence, hypothesis testing, and rigorous methodology.' },
  { id: 'riskTolerance', name: 'Risk Tolerance', description: 'Comfort dealing with uncertainty, high stakes, or physical danger.' },
  { id: 'stability', name: 'Stability Preference', description: 'Desire for predictable hours, consistent income, and clear career paths.' }
];

export const quizQuestions = Array.from({ length: 60 }, (_, i) => {
  const traitPool = traits.map(t => t.id);
  const trait = traitPool[i % traitPool.length];
  
  return {
    id: i + 1,
    question: `Question ${i + 1} measuring your ${trait} affinity: How much do you resonate with tasks involving this area?`,
    trait: trait,
    options: [
      { text: 'I find this extremely engaging and rewarding', score: 5 },
      { text: 'I enjoy this frequently', score: 4 },
      { text: 'I am neutral about this', score: 3 },
      { text: 'I prefer to avoid this if possible', score: 2 },
      { text: 'I strongly dislike tasks related to this', score: 1 }
    ]
  };
});
