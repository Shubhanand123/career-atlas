import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Globe, GraduationCap, Zap, TrendingDown, Layers, HelpCircle, 
  MessageSquare, Search, Bookmark, UserRound, BriefcaseBusiness
} from 'lucide-react';
import LanguagePicker from './LanguagePicker';
import { useLanguage } from '../i18n';
import '../styles/navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { copy } = useLanguage();

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
        
        <div className="desktop-only"><LanguagePicker /></div>

        <button 
          className="mobile-menu-toggle mobile-only"
          aria-label={copy.menu || 'Toggle Menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
          [copy.quiz || 'Quiz', '/quiz', HelpCircle],
          [copy.copilot || 'Copilot', '/copilot', MessageSquare]
        ].map(([name, path, Icon]) => (
          <Link key={name} to={path} className={location.pathname === path ? 'active' : ''}>
            <Icon size={17} />
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
