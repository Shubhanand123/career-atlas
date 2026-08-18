import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, GraduationCap, Zap, TrendingDown, Layers, HelpCircle, MessageSquare } from 'lucide-react';
import '../styles/navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '3D Explore', path: '/explore', icon: Globe },
    { name: 'Placements', path: '/placements', icon: GraduationCap },
    { name: 'Salary Combos', path: '/combos', icon: Zap },
    { name: 'Layoff & AI Risk', path: '/layoffs', icon: TrendingDown },
    { name: 'Compare', path: '/compare', icon: Layers },
    { name: 'Quiz', path: '/quiz', icon: HelpCircle },
    { name: 'AI Copilot', path: '/copilot', icon: MessageSquare }
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

        <button 
          className="mobile-menu-toggle mobile-only"
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
        </div>
      )}
    </nav>
  );
}
