import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Globe, GraduationCap, Zap, TrendingDown, Layers, HelpCircle, 
  MessageSquare, Search, Bookmark, UserRound, BriefcaseBusiness, Sun, Moon
} from 'lucide-react';
import LanguagePicker from './LanguagePicker';
import { useLanguage } from '../i18n';
import { useTheme } from '../context/ThemeContext';
import '../styles/navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { copy } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: copy.explore || 'Explore', path: '/explore', icon: Globe },
    { name: copy.institutions || 'Institutions', path: '/placements', icon: GraduationCap },
    { name: copy.workspace || 'Workspace', path: '/workspace', icon: BriefcaseBusiness },
    { name: copy.combos || 'Skill Combos', path: '/combos', icon: Zap },
    { name: copy.layoffs || 'Layoff & AI Risk', path: '/layoffs', icon: TrendingDown },
    { name: copy.compare || 'Compare', path: '/compare', icon: Layers },
    { name: copy.quiz || 'Quiz', path: '/quiz', icon: HelpCircle },
    { name: copy.copilot || 'Copilot', path: '/copilot', icon: MessageSquare }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-symbol">✦</span> CAREER ATLAS
        </Link>
        
        <div className="navbar-links desktop-only">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={14} className="nav-icon" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
        
        <div className="d-flex items-center gap-2 desktop-only">
          {/* Theme Toggle Button */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={17} className="text-gold" /> : <Moon size={17} className="text-cyan" />}
          </button>

          <LanguagePicker />
        </div>

        {/* Mobile controls */}
        <div className="d-flex items-center gap-2 mobile-only">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={17} className="text-gold" /> : <Moon size={17} className="text-cyan" />}
          </button>

          <button 
            className="mobile-menu-toggle"
            aria-label={copy.menu || 'Toggle Menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-dropdown">
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="mobile-lang-picker-wrapper">
            <LanguagePicker />
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="mobile-bottom-nav mobile-only" aria-label="Primary Mobile Navigation">
        {[
          [copy.explore || 'Explore', '/explore', Globe],
          [copy.institutions || 'Colleges', '/placements', GraduationCap],
          [copy.workspace || 'Workspace', '/workspace', BriefcaseBusiness],
          [copy.combos || 'Combos', '/combos', Zap]
        ].map(([label, path, Icon]) => {
          const isActive = location.pathname === path;
          return (
            <Link key={path} to={path} className={isActive ? 'active' : ''}>
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
