import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, Compass, Activity, ArrowRight } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Navbar from '../components/Navbar';
import '../styles/quiz.css';

// Generate 60 questions quickly.
// 12 traits, 5 questions each.
const TRAITS = ['analytical', 'technical', 'creative', 'research', 'leadership', 'communication', 'handsOn', 'social', 'entrepreneurial', 'scientific', 'riskTolerance', 'stability'];

const QUESTIONS_DATA = [
  // Analytical
  { id: 1, trait: 'analytical', q: "I enjoy solving complex puzzles and riddles." },
  { id: 2, trait: 'analytical', q: "I naturally look for patterns in data or behavior." },
  { id: 3, trait: 'analytical', q: "I prefer making decisions based on logic rather than emotion." },
  { id: 4, trait: 'analytical', q: "I like breaking down a large problem into smaller parts." },
  { id: 5, trait: 'analytical', q: "I can easily spot flaws in someone else's argument." },
  // Technical
  { id: 6, trait: 'technical', q: "I am fascinated by how machines and software work." },
  { id: 7, trait: 'technical', q: "I enjoy learning new software tools or programming languages." },
  { id: 8, trait: 'technical', q: "I often troubleshoot tech issues for my friends and family." },
  { id: 9, trait: 'technical', q: "I prefer working with computers over working directly with people." },
  { id: 10, trait: 'technical', q: "I like reading manuals or documentation to understand features." },
  // Creative
  { id: 11, trait: 'creative', q: "I often come up with original ideas or designs." },
  { id: 12, trait: 'creative', q: "I enjoy expressing myself through art, music, or writing." },
  { id: 13, trait: 'creative', q: "I find brainstorming sessions energizing." },
  { id: 14, trait: 'creative', q: "I dislike strict rules that limit my imagination." },
  { id: 15, trait: 'creative', q: "I care a lot about the aesthetics and visual appeal of things." },
  // Research
  { id: 16, trait: 'research', q: "I love diving deep into a topic to learn everything about it." },
  { id: 17, trait: 'research', q: "I am comfortable spending hours reading and gathering information." },
  { id: 18, trait: 'research', q: "I always verify facts before accepting them as truth." },
  { id: 19, trait: 'research', q: "I enjoy synthesizing information from multiple sources." },
  { id: 20, trait: 'research', q: "I find the process of discovering new knowledge highly rewarding." },
  // Leadership
  { id: 21, trait: 'leadership', q: "I naturally take charge in group settings." },
  { id: 22, trait: 'leadership', q: "I enjoy mentoring and guiding others." },
  { id: 23, trait: 'leadership', q: "I am comfortable making tough decisions for a team." },
  { id: 24, trait: 'leadership', q: "I like organizing people and delegating tasks." },
  { id: 25, trait: 'leadership', q: "I can motivate others to achieve a common goal." },
  // Communication
  { id: 26, trait: 'communication', q: "I am good at explaining complex ideas simply." },
  { id: 27, trait: 'communication', q: "I enjoy public speaking or presenting to groups." },
  { id: 28, trait: 'communication', q: "I am an active listener when others are speaking." },
  { id: 29, trait: 'communication', q: "I can easily adapt my communication style to my audience." },
  { id: 30, trait: 'communication', q: "I enjoy writing reports, essays, or persuasive pieces." },
  // HandsOn
  { id: 31, trait: 'handsOn', q: "I prefer tasks where I can build or fix things physically." },
  { id: 32, trait: 'handsOn', q: "I learn best by doing rather than reading." },
  { id: 33, trait: 'handsOn', q: "I enjoy working outdoors or in a dynamic physical environment." },
  { id: 34, trait: 'handsOn', q: "I like working with tools or instruments." },
  { id: 35, trait: 'handsOn', q: "I get restless sitting at a desk all day." },
  // Social
  { id: 36, trait: 'social', q: "I get my energy from interacting with other people." },
  { id: 37, trait: 'social', q: "I genuinely care about helping others overcome personal challenges." },
  { id: 38, trait: 'social', q: "I am very empathetic to the feelings of those around me." },
  { id: 39, trait: 'social', q: "I enjoy collaborating on a team rather than working alone." },
  { id: 40, trait: 'social', q: "I like meeting new people on a regular basis." },
  // Entrepreneurial
  { id: 41, trait: 'entrepreneurial', q: "I am always looking for ways to improve businesses or services." },
  { id: 42, trait: 'entrepreneurial', q: "I am comfortable taking calculated risks for high rewards." },
  { id: 43, trait: 'entrepreneurial', q: "I dream of starting my own company one day." },
  { id: 44, trait: 'entrepreneurial', q: "I am highly motivated by financial success and growth." },
  { id: 45, trait: 'entrepreneurial', q: "I enjoy networking and pitching ideas to others." },
  // Scientific
  { id: 46, trait: 'scientific', q: "I am fascinated by how the natural world works." },
  { id: 47, trait: 'scientific', q: "I enjoy conducting experiments and testing hypotheses." },
  { id: 48, trait: 'scientific', q: "I value empirical evidence over intuition." },
  { id: 49, trait: 'scientific', q: "I follow news regarding new scientific discoveries." },
  { id: 50, trait: 'scientific', q: "I am comfortable using mathematics to solve real-world problems." },
  // RiskTolerance
  { id: 51, trait: 'riskTolerance', q: "I am comfortable working in a role where my income varies based on performance." },
  { id: 52, trait: 'riskTolerance', q: "I thrive in unpredictable, fast-paced environments." },
  { id: 53, trait: 'riskTolerance', q: "I am willing to relocate frequently for the right opportunity." },
  { id: 54, trait: 'riskTolerance', q: "I prefer novelty and change over routine." },
  { id: 55, trait: 'riskTolerance', q: "I am not stressed by ambiguity or lack of clear instructions." },
  // Stability
  { id: 56, trait: 'stability', q: "I highly value job security and a steady paycheck." },
  { id: 57, trait: 'stability', q: "I prefer working standard hours (e.g., 9-to-5) without overtime." },
  { id: 58, trait: 'stability', q: "I want a clear, well-defined career progression path." },
  { id: 59, trait: 'stability', q: "I prefer staying with one company for a long time." },
  { id: 60, trait: 'stability', q: "I like knowing exactly what is expected of me every day." }
];

const OPTIONS = [
  { text: "Strongly Disagree", score: 1 },
  { text: "Disagree", score: 2 },
  { text: "Neutral", score: 3 },
  { text: "Agree", score: 4 },
  { text: "Strongly Agree", score: 5 }
];

// Sample careers with trait weights (1-10)
const CAREERS = [
  { name: 'Software Engineer', diff: 'Hard', salary: '$80k - $180k', desc: 'Build and maintain software systems.', weights: { analytical: 9, technical: 10, creative: 6, research: 5, leadership: 3, communication: 4, handsOn: 2, social: 3, entrepreneurial: 5, scientific: 6, riskTolerance: 4, stability: 8 } },
  { name: 'Data Scientist', diff: 'Hard', salary: '$90k - $190k', desc: 'Analyze complex data to drive business decisions.', weights: { analytical: 10, technical: 8, creative: 4, research: 9, leadership: 3, communication: 5, handsOn: 1, social: 2, entrepreneurial: 4, scientific: 8, riskTolerance: 4, stability: 8 } },
  { name: 'Product Manager', diff: 'Medium', salary: '$90k - $180k', desc: 'Guide the development of products from concept to launch.', weights: { analytical: 7, technical: 5, creative: 6, research: 6, leadership: 9, communication: 9, handsOn: 1, social: 8, entrepreneurial: 8, scientific: 2, riskTolerance: 6, stability: 6 } },
  { name: 'UX Designer', diff: 'Medium', salary: '$70k - $150k', desc: 'Design user-friendly interfaces and experiences.', weights: { analytical: 6, technical: 4, creative: 10, research: 8, leadership: 3, communication: 7, handsOn: 3, social: 6, entrepreneurial: 4, scientific: 2, riskTolerance: 4, stability: 7 } },
  { name: 'Physician', diff: 'Very Hard', salary: '$150k - $350k+', desc: 'Diagnose and treat medical conditions.', weights: { analytical: 9, technical: 5, creative: 2, research: 8, leadership: 7, communication: 8, handsOn: 8, social: 9, entrepreneurial: 4, scientific: 10, riskTolerance: 3, stability: 9 } },
  { name: 'Entrepreneur', diff: 'Very Hard', salary: 'Variable', desc: 'Start and run new businesses.', weights: { analytical: 7, technical: 4, creative: 8, research: 6, leadership: 9, communication: 9, handsOn: 5, social: 8, entrepreneurial: 10, scientific: 2, riskTolerance: 10, stability: 1 } },
  { name: 'Graphic Designer', diff: 'Medium', salary: '$45k - $90k', desc: 'Create visual concepts for print and digital media.', weights: { analytical: 3, technical: 6, creative: 10, research: 3, leadership: 2, communication: 6, handsOn: 4, social: 4, entrepreneurial: 6, scientific: 1, riskTolerance: 6, stability: 5 } },
  { name: 'Civil Engineer', diff: 'Hard', salary: '$70k - $130k', desc: 'Design and oversee construction projects.', weights: { analytical: 9, technical: 6, creative: 4, research: 5, leadership: 6, communication: 5, handsOn: 6, social: 4, entrepreneurial: 3, scientific: 8, riskTolerance: 3, stability: 9 } },
  { name: 'Marketing Manager', diff: 'Medium', salary: '$60k - $140k', desc: 'Develop strategies to promote products or services.', weights: { analytical: 6, technical: 3, creative: 8, research: 6, leadership: 8, communication: 9, handsOn: 1, social: 8, entrepreneurial: 7, scientific: 1, riskTolerance: 5, stability: 6 } },
  { name: 'Research Scientist', diff: 'Hard', salary: '$60k - $140k', desc: 'Conduct experiments to expand scientific knowledge.', weights: { analytical: 9, technical: 6, creative: 5, research: 10, leadership: 3, communication: 5, handsOn: 6, social: 2, entrepreneurial: 2, scientific: 10, riskTolerance: 3, stability: 7 } }
];

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [resultsData, setResultsData] = useState(null);

  const handleOptionSelect = (score) => {
    setAnswers({ ...answers, [QUESTIONS_DATA[currentIdx].id]: score });
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS_DATA.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const calculateResults = () => {
    // 1. Calculate trait scores (normalized 0-100)
    const traitScores = {};
    TRAITS.forEach(t => traitScores[t] = 0);
    
    let traitCounts = {};
    TRAITS.forEach(t => traitCounts[t] = 0);

    Object.keys(answers).forEach(qId => {
      const q = QUESTIONS_DATA.find(x => x.id === parseInt(qId));
      traitScores[q.trait] += answers[qId];
      traitCounts[q.trait] += 5; // Max score per question is 5
    });

    const normalizedTraits = {};
    TRAITS.forEach(t => {
      normalizedTraits[t] = Math.round((traitScores[t] / traitCounts[t]) * 100) || 0;
    });

    // 2. Match with careers
    const matches = CAREERS.map(career => {
      let scoreSum = 0;
      let maxScoreSum = 0;

      TRAITS.forEach(t => {
        const weight = career.weights[t]; // 1-10
        // How close is the user's trait to the career's required trait?
        // Let's assume career weight 10 means user needs 100%. 
        // We'll calculate a simple match score.
        const userVal = normalizedTraits[t];
        const targetVal = weight * 10;
        
        // Difference penalty
        const diff = Math.abs(userVal - targetVal);
        const matchPercent = Math.max(0, 100 - diff);
        
        scoreSum += matchPercent * weight;
        maxScoreSum += 100 * weight;
      });

      return {
        ...career,
        matchScore: Math.round((scoreSum / maxScoreSum) * 100)
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);

    // Prepare radar chart data
    const chartData = TRAITS.map(t => ({
      trait: t.charAt(0).toUpperCase() + t.slice(1),
      score: normalizedTraits[t]
    }));

    setResultsData({ traits: normalizedTraits, matches, chartData });
    setShowResults(true);
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
    setResultsData(null);
  };

  if (showResults && resultsData) {
    return (
      <div className="quiz-container">
        <Navbar />
        <div className="results-container">
          <div className="results-header">
            <h1 className="quiz-title">My Career DNA</h1>
            <p className="quiz-subtitle">Based on your responses, here is your unique professional profile.</p>
          </div>

          <div className="charts-layout">
            <div className="chart-card">
              <h3 style={{ marginBottom: '20px', textAlign: 'center', fontFamily: 'Space Grotesk' }}>Trait Map</h3>
              <div style={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={resultsData.chartData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="trait" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px' }} />
                    <Radar name="You" dataKey="score" stroke="var(--accent-cyan)" fill="var(--accent-cyan)" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="chart-card" style={{ overflowY: 'auto', maxHeight: '430px' }}>
              <h3 style={{ marginBottom: '20px', fontFamily: 'Space Grotesk' }}>Detailed Breakdown</h3>
              {Object.keys(resultsData.traits).sort((a,b) => resultsData.traits[b] - resultsData.traits[a]).map(t => (
                <div key={t} className="trait-bar-container">
                  <div className="trait-header">
                    <span style={{ textTransform: 'capitalize' }}>{t}</span>
                    <span>{resultsData.traits[t]}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${resultsData.traits[t]}%`, background: `linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontFamily: 'Space Grotesk', marginBottom: '25px', textAlign: 'center' }}>Top Career Matches</h2>
          <div className="matches-grid">
            {resultsData.matches.map((m, idx) => (
              <div key={idx} className="match-card">
                <div className="match-header">
                  <h3 className="match-title">{m.name}</h3>
                  <div className="match-score">{m.matchScore}%</div>
                </div>
                <p className="match-desc">{m.desc}</p>
                <div className="match-metrics">
                  <div className="match-metric">
                    <Activity size={16} color="var(--accent-cyan)" /> {m.diff}
                  </div>
                  <div className="match-metric">
                    <Compass size={16} color="var(--accent-green)" /> {m.salary}
                  </div>
                </div>
                <Link to={`/explore?search=${encodeURIComponent(m.name)}`} className="btn-explore" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  Explore This Career <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          <button className="btn-retake" onClick={restartQuiz}>
            <RotateCcw size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = QUESTIONS_DATA[currentIdx];
  const progress = ((currentIdx + 1) / QUESTIONS_DATA.length) * 100;
  const hasAnswered = !!answers[currentQ.id];

  return (
    <div className="quiz-container">
      <Navbar />
      
      <div className="quiz-header">
        <h1 className="quiz-title">Find Your Career DNA</h1>
        <p className="quiz-subtitle">Answer {QUESTIONS_DATA.length} questions to discover your career personality and get matched with ideal careers.</p>
      </div>

      <div className="progress-container">
        <div className="progress-text">
          <span>Question {currentIdx + 1} of {QUESTIONS_DATA.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="question-card"
        >
          <h2 className="question-text">"{currentQ.q}"</h2>
          
          <div className="options-grid">
            {OPTIONS.map((opt, i) => (
              <div 
                key={i} 
                className={`option-card ${answers[currentQ.id] === opt.score ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(opt.score)}
              >
                <div className="radio-circle">
                  <div className="radio-inner"></div>
                </div>
                <span>{opt.text}</span>
              </div>
            ))}
          </div>

          <div className="quiz-controls">
            <button 
              className="btn-nav btn-back" 
              onClick={handleBack}
              style={{ visibility: currentIdx === 0 ? 'hidden' : 'visible' }}
            >
              <ChevronLeft size={20} /> Back
            </button>
            <button 
              className="btn-nav btn-next" 
              onClick={handleNext}
              disabled={!hasAnswered}
            >
              {currentIdx === QUESTIONS_DATA.length - 1 ? 'See Results' : 'Next'} <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
