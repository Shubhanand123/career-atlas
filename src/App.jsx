import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Ambient3DBackground from './components/Ambient3DBackground';
import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
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
      background: 'var(--bg-primary)',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '1.4rem',
        fontWeight: 900,
        letterSpacing: '0.08em',
        color: 'var(--text-primary)'
      }}>
        ✦ CAREER ATLAS
      </div>
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid rgba(99, 102, 241, 0.2)',
        borderTop: '3px solid var(--accent-cyan)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
    </div>
  );
}

function GlobalLayout({ children }) {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {!isLandingPage && <Ambient3DBackground />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <Router>
          <GlobalLayout>
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
          </GlobalLayout>
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
