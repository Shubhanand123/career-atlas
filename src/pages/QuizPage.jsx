import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, Compass, Activity, ArrowRight } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Navbar from '../components/Navbar';
import { quizQuestions, quizOptions, traits } from '../data/quizQuestions';
import '../styles/quiz.css';

const STORAGE_KEY = 'careerAtlas.latestQuizResult';

const FIELD_PROFILES = [
  {
    field: 'Technology & AI',
    careers: ['Software Engineer', 'Data Scientist', 'AI Product Engineer'],
    streams: ['Science with Mathematics', 'Computer Science'],
    branches: ['Computer Science', 'AI/ML', 'Data Science', 'Electronics'],
    degrees: ['B.Tech CSE', 'B.Sc Computer Science', 'BCA + MCA'],
    institutions: ['IITs / NITs', 'BITS Pilani', 'IIITs', 'strong local engineering colleges'],
    jobs: ['Software Intern', 'Junior Developer', 'Data Analyst', 'QA Automation Intern'],
    skills: ['Programming', 'Mathematics', 'Projects', 'Systems thinking'],
    alternatives: ['Cybersecurity', 'Product Management', 'Technical Consulting'],
    weights: { technical: 10, problemSolving: 9, science: 7, income: 7, education: 7, creative: 5 }
  },
  {
    field: 'Medicine, Health & Life Sciences',
    careers: ['Doctor', 'Nurse Practitioner', 'Sports Physiotherapist', 'Biomedical Researcher'],
    streams: ['Science with Biology', 'Science with PCB/PCMB'],
    branches: ['Medicine', 'Physiotherapy', 'Biotechnology', 'Public Health'],
    degrees: ['MBBS', 'BPT', 'B.Sc Nursing', 'B.Sc Biotechnology'],
    institutions: ['AIIMS', 'CMC Vellore', 'Manipal', 'state medical colleges'],
    jobs: ['Clinical Assistant', 'Research Intern', 'Hospital Operations Intern'],
    skills: ['Biology', 'Patient communication', 'Evidence reading', 'Ethics'],
    alternatives: ['Pharmacy', 'Healthcare Management', 'Medical Technology'],
    weights: { science: 10, people: 9, education: 10, stability: 8, communication: 7, handsOn: 6 }
  },
  {
    field: 'Business, Finance & Entrepreneurship',
    careers: ['Product Manager', 'Investment Analyst', 'Business Analyst', 'Founder'],
    streams: ['Commerce', 'Science or Humanities with Economics'],
    branches: ['Finance', 'Economics', 'Business Analytics', 'Management'],
    degrees: ['BBA', 'B.Com', 'BA Economics', 'MBA later'],
    institutions: ['SRCC', 'IIM IPM programs', 'NMIMS', 'top state commerce colleges'],
    jobs: ['Business Analyst Intern', 'Marketing Intern', 'Finance Trainee'],
    skills: ['Excel', 'Communication', 'Market research', 'Financial basics'],
    alternatives: ['Consulting', 'Operations', 'Sales Strategy'],
    weights: { business: 10, leadership: 8, communication: 8, income: 8, risk: 7, ambition: 8 }
  },
  {
    field: 'Design, Media & Creative Work',
    careers: ['UX Designer', 'Graphic Designer', 'Content Strategist', 'Creative Director'],
    streams: ['Any stream with portfolio', 'Arts/Humanities', 'Design foundation'],
    branches: ['Design', 'Communication Design', 'Media Studies', 'Fine Arts'],
    degrees: ['B.Des', 'BA Design', 'BFA', 'Mass Communication'],
    institutions: ['NID', 'NIFT', 'Srishti Manipal', 'MIT Institute of Design'],
    jobs: ['Design Intern', 'Content Intern', 'Junior Visual Designer'],
    skills: ['Portfolio', 'Visual thinking', 'Writing', 'User research'],
    alternatives: ['Architecture', 'Marketing', 'Game Art'],
    weights: { creative: 10, arts: 9, communication: 7, people: 5, risk: 6, handsOn: 7 }
  },
  {
    field: 'Engineering, Infrastructure & Skilled Systems',
    careers: ['Civil Engineer', 'Mechanical Engineer', 'Electrician', 'Robotics Technician'],
    streams: ['Science with Mathematics', 'Vocational / Polytechnic pathways'],
    branches: ['Mechanical', 'Civil', 'Electrical', 'Mechatronics'],
    degrees: ['B.Tech', 'Diploma Engineering', 'ITI + Apprenticeship'],
    institutions: ['IITs / NITs', 'state engineering colleges', 'polytechnic institutes'],
    jobs: ['Site Intern', 'CAD Trainee', 'Maintenance Technician Apprentice'],
    skills: ['Physics', 'Drawing/CAD', 'Safety', 'Hands-on diagnostics'],
    alternatives: ['Architecture', 'Construction Management', 'Industrial Design'],
    weights: { handsOn: 10, technical: 8, problemSolving: 8, stability: 7, environment: 7, science: 7 }
  },
  {
    field: 'Sports, Performance & Coaching',
    careers: ['Athlete', 'Coach', 'Sports Analyst', 'Strength Coach', 'Sports Manager'],
    streams: ['Any stream with sport pathway', 'Physical Education', 'Sports Science'],
    branches: ['Sports Science', 'Physiotherapy', 'Analytics', 'Sports Management'],
    degrees: ['B.P.Ed', 'B.Sc Sports Science', 'BBA Sports Management', 'BPT'],
    institutions: ['SAI centres', 'LNIPE', 'sports universities', 'elite academies'],
    jobs: ['Academy Assistant Coach', 'Performance Analyst Intern', 'Fitness Trainer'],
    skills: ['Training discipline', 'Performance analysis', 'Nutrition basics', 'Coaching communication'],
    alternatives: ['Sports Physiotherapy', 'Sports Journalism', 'Sports Marketing'],
    weights: { sports: 10, competitive: 9, handsOn: 8, people: 7, risk: 7, ambition: 8 }
  }
];

function scoreProfile(profile, scores) {
  const entries = Object.entries(profile.weights);
  const weighted = entries.reduce((sum, [trait, weight]) => sum + (scores[trait] || 0) * weight, 0);
  const max = entries.reduce((sum, [, weight]) => sum + 100 * weight, 0);
  return Math.round((weighted / max) * 100);
}

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [resultsData, setResultsData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  });
  const [showResults, setShowResults] = useState(Boolean(resultsData));

  const traitIds = useMemo(() => traits.map(t => t.id), []);
  const currentQ = quizQuestions[currentIdx];
  const progress = ((currentIdx + 1) / quizQuestions.length) * 100;
  const hasAnswered = Boolean(answers[currentQ.id]);

  const handleOptionSelect = (score) => {
    setAnswers({ ...answers, [currentQ.id]: score });
  };

  const calculateResults = () => {
    const totals = Object.fromEntries(traitIds.map(id => [id, { score: 0, max: 0 }]));
    quizQuestions.forEach(question => {
      const score = answers[question.id] || 3;
      totals[question.trait].score += score;
      totals[question.trait].max += 5;
    });

    const normalizedTraits = Object.fromEntries(
      traitIds.map(id => [id, totals[id].max ? Math.round((totals[id].score / totals[id].max) * 100) : 0])
    );

    const matches = FIELD_PROFILES
      .map(profile => {
        const matchScore = scoreProfile(profile, normalizedTraits);
        const strongestDrivers = Object.entries(profile.weights)
          .sort((a, b) => (normalizedTraits[b[0]] || 0) * b[1] - (normalizedTraits[a[0]] || 0) * a[1])
          .slice(0, 3)
          .map(([trait]) => traits.find(t => t.id === trait)?.name || trait);
        const skillGaps = profile.skills.map(skill => ({
          skill,
          status: strongestDrivers.some(driver => skill.toLowerCase().includes(driver.toLowerCase().split(' ')[0]))
            ? 'Strong Match'
            : matchScore >= 72
              ? 'Partial Match'
              : 'Missing Skill'
        }));

        return {
          ...profile,
          matchScore,
          reason: `${profile.field} rose because your strongest signals align with ${strongestDrivers.join(', ')}.`,
          skillGaps,
          improvements: [
            `Build one ${profile.field.toLowerCase()} portfolio project.`,
            `Take an introductory course before committing to a degree.`,
            `Interview two students or professionals from this path.`
          ]
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    const result = {
      createdAt: new Date().toISOString(),
      traits: normalizedTraits,
      chartData: traits.map(t => ({ trait: t.name, score: normalizedTraits[t.id] })),
      matches: matches.slice(0, 4),
      alternatives: matches.slice(4, 6)
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    setResultsData(result);
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
            <h1 className="quiz-title">My Career Map</h1>
            <p className="quiz-subtitle">Latest saved result from a 30-question assessment. Retake anytime to replace it.</p>
          </div>

          <div className="charts-layout">
            <div className="chart-card">
              <h3 className="chart-title">Trait Map</h3>
              <div style={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="68%" data={resultsData.chartData}>
                    <PolarGrid stroke="rgba(255,255,255,0.12)" />
                    <PolarAngleAxis dataKey="trait" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px' }} />
                    <Radar name="You" dataKey="score" stroke="var(--accent-gold)" fill="var(--accent-gold)" fillOpacity={0.45} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <h3 className="chart-title">Strongest Signals</h3>
              {Object.entries(resultsData.traits).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([trait, score]) => (
                <div key={trait} className="trait-bar-container">
                  <div className="trait-header">
                    <span>{traits.find(t => t.id === trait)?.name || trait}</span>
                    <span>{score}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="results-section-title">Top Career Fields</h2>
          <div className="matches-grid">
            {resultsData.matches.map(match => (
              <article key={match.field} className="match-card">
                <div className="match-header">
                  <h3 className="match-title">{match.field}</h3>
                  <div className="match-score">{match.matchScore}%</div>
                </div>
                <p className="match-desc">{match.reason}</p>
                <div className="match-metrics">
                  <span className="match-metric"><Activity size={16} /> {match.streams[0]}</span>
                  <span className="match-metric"><Compass size={16} /> {match.degrees[0]}</span>
                </div>
                <div className="recommendation-list">
                  <p><strong>Careers:</strong> {match.careers.join(', ')}</p>
                  <p><strong>Branches:</strong> {match.branches.join(', ')}</p>
                  <p><strong>Institutions:</strong> {match.institutions.join(', ')}</p>
                  <p><strong>Relevant jobs:</strong> {match.jobs.join(', ')}</p>
                  <p><strong>Skill gaps:</strong> {match.skillGaps.map(gap => `${gap.skill} (${gap.status})`).join(', ')}</p>
                  <p><strong>Improve next:</strong> {match.improvements.join(' ')}</p>
                </div>
                <Link to={`/explore?search=${encodeURIComponent(match.careers[0])}`} className="btn-explore">
                  Explore Careers <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>

          <div className="chart-card alternatives-card">
            <h3 className="chart-title">Alternative Careers</h3>
            <p>{resultsData.alternatives.flatMap(item => item.alternatives).join(', ')}</p>
          </div>

          <button className="btn-retake" onClick={restartQuiz}>
            <RotateCcw size={18} /> Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <Navbar />
      <div className="quiz-header">
        <h1 className="quiz-title">Find Your Career Map</h1>
        <p className="quiz-subtitle">Answer exactly {quizQuestions.length} questions to get career fields, streams, degrees, jobs, skill gaps, and alternatives.</p>
      </div>

      <div className="progress-container">
        <div className="progress-text">
          <span>{currentIdx + 1}/30</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
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
          <h2 className="question-text">{currentQ.question}</h2>
          <div className="options-grid">
            {quizOptions.map(option => (
              <button
                key={option.score}
                type="button"
                className={`option-card ${answers[currentQ.id] === option.score ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option.score)}
              >
                <span className="radio-circle"><span className="radio-inner" /></span>
                <span>{option.text}</span>
              </button>
            ))}
          </div>

          <div className="quiz-controls">
            <button className="btn-nav btn-back" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} style={{ visibility: currentIdx === 0 ? 'hidden' : 'visible' }}>
              <ChevronLeft size={20} /> Back
            </button>
            <button className="btn-nav btn-next" onClick={() => currentIdx < quizQuestions.length - 1 ? setCurrentIdx(currentIdx + 1) : calculateResults()} disabled={!hasAnswered}>
              {currentIdx === quizQuestions.length - 1 ? 'See Results' : 'Next'} <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
