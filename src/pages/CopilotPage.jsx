import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Compass, GraduationCap, Trophy, Briefcase, Calculator, HelpCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getEnrichedCareerAsync } from '../data/careers';
import { searchCareerCatalog } from '../data/careerCatalog';
import { sportsRoles } from '../data/sportsEcosystem';
import { countryIntelligence } from '../data/countryIntelligence';
import '../styles/copilot.css';

const SUGGESTIONS = [
  "What career suits my strengths? (30-Q Quiz)",
  "How much does studying in Germany actually cost?",
  "Explore sports careers other than athlete",
  "How do I bridge skill gaps for AI engineering?",
  "Compare Software Engineering vs Quant Finance",
  "Help me prepare for technical interviews",
  "Top universities with high placement ROI"
];

export default function CopilotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your Career Atlas Intelligence Copilot. I can assist you with career exploration, university selection, True-Cost study calculations, CV improvements, interview preparation, sports career pathways, and country-to-country comparisons. What would you like to explore today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = async (query) => {
    const q = query.toLowerCase().trim();

    // 1. Check Sports query
    if (q.includes('sport') || q.includes('athlete') || q.includes('coach') || q.includes('fitness') || q.includes('physio')) {
      return (
        <div className="ai-content">
          <p><strong>Sports is a complete economic ecosystem.</strong> Beyond playing professionally, there are high-demand technical, medical, analytical, and legal pathways:</p>
          <ul>
            <li><strong>Sports Science & Medicine:</strong> Sports Physiotherapist, Sports Medicine Physician, Nutritionist.</li>
            <li><strong>Analytics & Tactics:</strong> Performance Video Analyst, Quantitative Sports Data Scientist.</li>
            <li><strong>Business & Law:</strong> Licensed Sports Agent, Sports Lawyer (CAS Arbitrator), Event Director.</li>
            <li><strong>Engineering & AI:</strong> Computer Vision Tracking Engineer (Hawk-Eye / VAR), Wearable Sensor Specialist.</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            <Link to="/explore?family=sports" style={{ color: '#d49658', fontWeight: 600, textDecoration: 'underline' }}>
              Explore All 35+ Dedicated Sports Careers & Disciplines →
            </Link>
          </p>
        </div>
      );
    }

    // 2. Check Study Abroad / True Cost query
    if (q.includes('cost') || q.includes('germany') || q.includes('canada') || q.includes('uk') || q.includes('tuition') || q.includes('study abroad') || q.includes('living')) {
      const de = countryIntelligence.find(c => c.code === 'DE');
      return (
        <div className="ai-content">
          <p><strong>True Cost of Study Analysis:</strong></p>
          <p>When studying abroad, tuition is only one part of the equation. We calculate <strong>Tuition + Accommodation + Food + Transport + Health Insurance</strong>:</p>
          <ul>
            <li><strong>Germany 🇩🇪:</strong> Public university tuition is ~€300/sem (€600/yr). True student living cost is ~€950-€1,200/month (€13,000-€15,000/yr). Students can work 140 full days/year.</li>
            <li><strong>Canada 🇨🇦:</strong> International tuition is ~CA$35k-CA$60k/yr. Living cost is ~CA$1,800-CA$2,500/month. Eligible for up to 3-year PGWP work permit.</li>
            <li><strong>United Kingdom 🇬🇧:</strong> International tuition is ~£25k-£40k/yr. Living cost in London is ~£1,850/mo; regional UK is ~£1,250/mo.</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            <Link to="/placements" style={{ color: '#d49658', fontWeight: 600, textDecoration: 'underline' }}>
              Launch Interactive True-Cost Calculator for 5,000+ Universities →
            </Link>
          </p>
        </div>
      );
    }

    // 3. Check CV / Interview / Application Tracker query
    if (q.includes('cv') || q.includes('resume') || q.includes('interview') || q.includes('job') || q.includes('application') || q.includes('tracker')) {
      return (
        <div className="ai-content">
          <p><strong>Career Ops Command Center:</strong></p>
          <p>Our student workspace provides specialized tools adapted for modern hiring:</p>
          <ul>
            <li><strong>Targeted CV Builder:</strong> Maintain multiple CV versions with distinct project and sports achievements sections.</li>
            <li><strong>CV-to-Job Matching:</strong> Evaluates your qualifications against job postings without fabricating skills.</li>
            <li><strong>8-Stage Application Kanban:</strong> Manage applications across Saved, Interested, Preparing, Applied, Interview, Offer, Rejected, and Accepted states.</li>
            <li><strong>Interview Prep Question Bank:</strong> Role-specific, behavioral, and technical questions with answer frameworks.</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            <Link to="/workspace" style={{ color: '#d49658', fontWeight: 600, textDecoration: 'underline' }}>
              Open Student Career Workspace →
            </Link>
          </p>
        </div>
      );
    }

    // 4. Check specific career lookup
    const words = q.replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 2 && !['what', 'about', 'how', 'tell', 'the', 'does', 'much', 'many', 'become', 'like', 'role', 'jobs', 'work'].includes(w));
    let matchedCareer = null;

    const shouldSearchCatalog = words.length > 0 && !/(suit|best for me|quiz|compare|\bvs\b|ai|automation|layoff|college|placement|roi)/.test(q);
    if (shouldSearchCatalog) {
      const searchKey = words.join(' ');
      const { items } = await searchCareerCatalog({ query: searchKey, limit: 1 });
      matchedCareer = items[0] || null;
    }

    if (matchedCareer) {
      const enriched = await getEnrichedCareerAsync(matchedCareer.id);
      return (
        <div className="ai-content">
          <p>Here is the career intelligence dossier for <strong>{enriched.name}</strong>:</p>
          <ul>
            <li><strong>Sector & Subcategory:</strong> {enriched.category} ({enriched.subcategory})</li>
            <li><strong>Typical Education:</strong> {enriched.education?.typical || enriched.typicalEducation}</li>
            <li><strong>Cognitive Toughness:</strong> {enriched.difficulty?.overall || 7.0}/10</li>
            <li><strong>US Mid Salary:</strong> ${(enriched.salary?.mid?.max || 110000).toLocaleString()} / year</li>
            <li><strong>India Benchmark CTC:</strong> ₹{((enriched.salary?.byCountry?.IN?.entry?.[0] || 600000) / 100000).toFixed(1)} Lakhs+ per annum</li>
            <li><strong>AI Resilience Index:</strong> {(10 - (Number(enriched.aiImpact?.automationExposure) || 3.5)).toFixed(1)}/10</li>
          </ul>
          <p>{enriched.shortDescription}</p>
          <p style={{ marginTop: '0.75rem' }}>
            <Link to={`/career/${enriched.id}`} style={{ color: '#d49658', fontWeight: 600, textDecoration: 'underline' }}>
              Open Full {enriched.name} Profile, Pay Comparison Table & Verified Twins →
            </Link>
          </p>
        </div>
      );
    }

    // 5. Default Quiz / Orientation
    if (q.includes('suit') || q.includes('best for me') || q.includes('quiz') || q.includes('what should i study')) {
      return (
        <div className="ai-content">
          <p>Based on your interest in discovering the best fit, I recommend taking our <strong>Exact 30-Question Career Assessment</strong>.</p>
          <p>It evaluates your traits across 25 distinct dimensions (analytical, creative, hands-on, risk tolerance, people-orientation, sports interest) and delivers:</p>
          <ul>
            <li>Personal Trait Radar Chart</li>
            <li>Top Recommended Career Fields with explicit 'WHY' explanations</li>
            <li>Relevant degrees, branches, institutions, and immediate skill-gap actions</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            <Link to="/quiz" style={{ color: '#d49658', fontWeight: 600, textDecoration: 'underline' }}>
              Take the Exact 30-Question Career Assessment (1/30 to 30/30) →
            </Link>
          </p>
        </div>
      );
    }

    return (
      <div className="ai-content">
        <p>Career Atlas provides comprehensive data across 15,000+ careers, 5,000+ institutions, and 35+ sports professions. You can explore:</p>
        <ul>
          <li><strong>Career Search:</strong> Browse normalized career trees and cross-country pay comparison tables.</li>
          <li><strong>True-Cost University Engine:</strong> Calculate real tuition, accommodation, and living costs worldwide.</li>
          <li><strong>Career Ops Tools:</strong> Use our targeted CV builder, 8-stage application tracker, and interview question banks.</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          <Link to="/explore" style={{ color: '#d49658', fontWeight: 600, textDecoration: 'underline' }}>
            Explore All Careers & Pathways in Career City →
          </Link>
        </p>
      </div>
    );
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await generateResponse(userMsg.text);
    setIsTyping(false);
    setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', isComponent: true, content: response }]);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="copilot-page">
      <Navbar />

      <main className="copilot-container">
        <div className="copilot-header">
          <div className="badge-pill">✦ Career Intelligence Copilot</div>
          <h1 className="copilot-title">AI Career & University Advisor</h1>
          <p className="copilot-subtitle">
            Grounded in 15,000+ occupations, 5,000+ universities, sports ecosystems, and real-world true-cost economic data.
          </p>
        </div>

        <div className="chat-window">
          <div className="messages-area">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                <div className="avatar">
                  {msg.sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className="message-bubble">
                  {msg.isComponent ? msg.content : <p>{msg.text}</p>}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-row ai">
                <div className="avatar"><Bot size={18} /></div>
                <div className="message-bubble typing-bubble">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="suggestions-bar">
            {SUGGESTIONS.map((s, idx) => (
              <button key={idx} className="suggestion-chip" onClick={() => handleSuggestionClick(s)}>
                {s}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="chat-input-form">
            <input
              type="text"
              placeholder="Ask about careers, true costs, universities, interview prep, or sports pathways..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn-send" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
