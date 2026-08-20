import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './index.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const CareerProfile = lazy(() => import('./pages/CareerProfile'));
const PlacementReportsPage = lazy(() => import('./pages/PlacementReportsPage'));
const CombosPage = lazy(() => import('./pages/CombosPage'));
const LayoffsPage = lazy(() => import('./pages/LayoffsPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const CopilotPage = lazy(() => import('./pages/CopilotPage'));
const WorkspacePage = lazy(() => import('./pages/WorkspacePage'));

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#17100b',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: '#fff'
      }}>
        CAREER ATLAS
      </div>
      <div className="spinner" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/:familyId" element={<ExplorePage />} />
          <Route path="/career/:careerId" element={<CareerProfile />} />
          <Route path="/placements" element={<PlacementReportsPage />} />
          <Route path="/combos" element={<CombosPage />} />
          <Route path="/layoffs" element={<LayoffsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/copilot" element={<CopilotPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
