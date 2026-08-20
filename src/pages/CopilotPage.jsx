import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, Sparkles, Compass, GraduationCap, Trophy, Briefcase, 
  Calculator, HelpCircle, ArrowRight, Globe, Key, Settings, Check, X, ExternalLink
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { getEnrichedCareerAsync } from '../data/careers';
import { searchCareerCatalog } from '../data/careerCatalog';
import { 
  askGeminiCopilot, getStoredGeminiKey, setStoredGeminiKey, 
  isGoogleSearchEnabled, setGoogleSearchEnabled 
} from '../services/geminiCopilotService';
import '../styles/copilot.css';

const SUGGESTIONS = [
  "What career suits my strengths? (30-Q Quiz)",
  "How much does studying in Germany actually cost?",
  "Explore sports careers other than athlete",
  "How do I bridge skill gaps for AI engineering?",
  "Compare Software Engineering vs Quant Finance",
  "Top universities with high placement ROI",
  "Explain 2026 AI automation risk for junior developers"
];

// Helper to render basic Gemini markdown safely
function FormattedAiText({ text }) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let currentList = [];

  const flushList = (keyPrefix) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-ul`} className="ai-markdown-list">
          {currentList.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInlineMarkdown = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      currentList.push(trimmed.substring(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      currentList.push(trimmed.replace(/^\d+\.\s/, ''));
    } else {
      flushList(i);
      if (trimmed.startsWith('### ')) {
        elements.push(<h4 key={i} className="ai-markdown-h4">{trimmed.substring(4)}</h4>);
      } else if (trimmed.startsWith('## ')) {
        elements.push(<h3 key={i} className="ai-markdown-h3">{trimmed.substring(3)}</h3>);
      } else if (trimmed.startsWith('# ')) {
        elements.push(<h2 key={i} className="ai-markdown-h2">{trimmed.substring(2)}</h2>);
      } else if (trimmed.length > 0) {
        elements.push(
          <p key={i} className="ai-markdown-p" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />
        );
      }
    }
  });
  flushList('final');

  return <div className="ai-markdown-container">{elements}</div>;
}

export default function CopilotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your Career Atlas Intelligence Copilot powered by Google Gemini and live Google Search Grounding. Ask me anything about career trajectories, cutoff scores, true study abroad costs, placement statistics, or sports ecosystems worldwide."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(() => getStoredGeminiKey());
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [searchGrounding, setSearchGrounding] = useState(() => isGoogleSearchEnabled());
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const saveSettings = () => {
    setStoredGeminiKey(tempApiKey);
    setApiKey(tempApiKey);
    setGoogleSearchEnabled(searchGrounding);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowSettingsModal(false);
    }, 1200);
  };

  // Fallback Local Knowledge Base
  const generateLocalResponse = async (query) => {
    const q = query.toLowerCase().trim();

    // 1. Check Sports query
    if (q.includes('sport') || q.includes('athlete') || q.includes('coach') || q.includes('fitness') || q.includes('physio')) {
      return {
        text: "Sports is a multi-billion dollar economic ecosystem. Beyond playing professionally on the field, there are high-demand technical, medical, analytical, and legal pathways:\n\n* **Sports Science & Medicine:** Sports Physiotherapist, Orthopedic Sports Surgeon, Performance Nutritionist.\n* **Analytics & Tactics:** Performance Video Analyst, Quantitative Sports Data Scientist, GPS Tracking Specialist.\n* **Business & Law:** Licensed FIFA/CAS Sports Agent, Sports Regulatory Lawyer, Global Event Director.\n* **Engineering & AI:** Computer Vision Tracking Engineer (Hawk-Eye / VAR), Biomechanical Wearable Sensor Specialist.",
        actionLink: { url: '/explore?family=sports', label: 'Explore All 35+ Dedicated Sports Careers & Disciplines' }
      };
    }

    // 2. Check Study Abroad / True Cost query
    if (q.includes('cost') || q.includes('germany') || q.includes('canada') || q.includes('uk') || q.includes('tuition') || q.includes('study abroad') || q.includes('living')) {
      return {
        text: "### True Cost of Study Economic Breakdown\nWhen evaluating degrees worldwide, tuition is only one part of the equation. We calculate **Tuition + Rent + Food + Transport + Health Insurance**:\n\n* **Germany 🇩🇪:** Public university tuition is ~€300/sem (€600/yr). True student living cost is ~€950–€1,200/month (€13,000–€15,000/yr). Students can work 140 full days/year.\n* **Canada 🇨🇦:** International tuition is ~CA$35k–CA$60k/yr. Living cost is ~CA$1,800–CA$2,500/month. Eligible for up to 3-year PGWP work permit.\n* **United Kingdom 🇬🇧:** International tuition is ~£25k–£40k/yr. Living cost in London is ~£1,850/mo; regional UK is ~£1,250/mo.",
        actionLink: { url: '/placements', label: 'Launch Interactive True-Cost Calculator for 10,000+ Universities' }
      };
    }

    // 3. Check Career lookup
    const words = q.replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 2 && !['what', 'about', 'how', 'tell', 'the', 'does', 'much', 'many', 'become', 'like', 'role', 'jobs', 'work'].includes(w));
    if (words.length > 0 && !/(suit|best for me|quiz|compare|\bvs\b|ai|automation|layoff|college|placement|roi)/.test(q)) {
      const searchKey = words.join(' ');
      const { items } = await searchCareerCatalog({ query: searchKey, limit: 1 });
      if (items[0]) {
        const enriched = await getEnrichedCareerAsync(items[0].id);
        return {
          text: `### Career Intelligence Dossier: ${enriched.name}\n\n* **Sector & Subcategory:** ${enriched.category} (${enriched.subcategory})\n* **Typical Education:** ${enriched.education?.typical || enriched.typicalEducation}\n* **Cognitive Toughness:** ${enriched.difficulty?.overall || 7.0}/10\n* **US Mid Salary:** $${(enriched.salary?.mid?.max || 110000).toLocaleString()} / yr\n* **India Benchmark CTC:** ₹${((enriched.salary?.byCountry?.IN?.entry?.[0] || 600000) / 100000).toFixed(1)} LPA+\n* **AI Resilience Index:** ${(10 - (Number(enriched.aiImpact?.automationExposure) || 3.5)).toFixed(1)} / 10\n\n${enriched.shortDescription}`,
          actionLink: { url: `/career/${enriched.id}`, label: `Open Full ${enriched.name} Profile & Pay Table` }
        };
      }
    }

    // Default Local
    return {
      text: "Career Atlas provides comprehensive data across 15,000+ careers, 10,000+ institutions, and 35+ sports professions.\n\n* **30-Question Assessment:** Discover career fields aligned with your 25 cognitive traits.\n* **True-Cost Calculator:** Calculate real tuition and living expenses worldwide.\n* **Skill Combos:** Stack high-yield skill multipliers for non-linear salary growth.",
      actionLink: { url: '/explore', label: 'Explore the 3D Career Universe & Registry' }
    };
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Try Google Gemini + Google Search Grounding first if Key exists
    if (apiKey) {
      const geminiResult = await askGeminiCopilot({
        prompt: userText,
        conversationHistory: messages,
        apiKey,
        enableGoogleSearch: searchGrounding
      });

      if (geminiResult.success && geminiResult.text) {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: geminiResult.text,
            isGemini: true,
            grounded: geminiResult.grounded,
            sources: geminiResult.sources || []
          }
        ]);
        return;
      }
    }

    // Graceful fallback to Local Intelligence
    const localRes = await generateLocalResponse(userText);
    setIsTyping(false);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'ai',
        text: localRes.text,
        actionLink: localRes.actionLink,
        isGemini: false
      }
    ]);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="copilot-page">
      <Navbar />

      <main className="copilot-container">
        {/* Header with Gemini Engine Status */}
        <div className="copilot-header">
          <div className="copilot-badges-bar">
            <div className="badge-pill">✦ Career Intelligence Copilot</div>
            <button 
              className={`gemini-status-pill ${apiKey ? 'active' : 'inactive'}`}
              onClick={() => setShowSettingsModal(true)}
              title="Configure Google Gemini API & Google Search Grounding"
            >
              <Globe size={13} className={apiKey ? 'text-green' : 'text-gold'} />
              <span>{apiKey ? (searchGrounding ? 'Gemini 3.6 + Google Search Active' : 'Gemini 3.6 Connected') : 'Connect Gemini & Google Search'}</span>
              <Settings size={13} />
            </button>
          </div>

          <h1 className="copilot-title">AI Career & Admissions Advisor</h1>
          <p className="copilot-subtitle">
            Powered by Google Gemini intelligence, live Google Search Grounding, and 15,000+ verified career datasets.
          </p>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <div className="messages-area">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                <div className="avatar">
                  {msg.sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className="message-bubble">
                  <FormattedAiText text={msg.text} />

                  {/* Google Search Grounding Citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="grounding-sources-block">
                      <div className="grounding-title">
                        <Globe size={13} className="text-cyan" /> Grounded with Google Search Engine:
                      </div>
                      <div className="grounding-chips">
                        {msg.sources.map((src, i) => (
                          <a 
                            key={i} 
                            href={src.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="source-chip"
                          >
                            <span>{src.title}</span>
                            <ExternalLink size={11} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Link */}
                  {msg.actionLink && (
                    <div className="ai-action-link-box">
                      <Link to={msg.actionLink.url} className="ai-action-link">
                        {msg.actionLink.label} <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
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
              placeholder={apiKey ? "Ask anything (Gemini + live Google Search enabled)..." : "Ask about careers, cutoffs, tuition, or connect Gemini API key..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn-send" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>

        {/* Gemini Settings Modal */}
        {showSettingsModal && (
          <div className="modal-overlay" onClick={() => setShowSettingsModal(false)}>
            <div className="gemini-settings-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-top">
                <div className="d-flex items-center gap-2">
                  <Sparkles size={20} className="text-cyan" />
                  <h3 className="modal-title">Google Gemini & Search Grounding</h3>
                </div>
                <button className="close-modal-btn" onClick={() => setShowSettingsModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <p className="modal-desc">
                Connect your Google Gemini API key to enable real-time generative reasoning and live Google Search grounding for 2025/2026 admissions, cutoffs, and global compensation figures.
              </p>

              <div className="setting-field">
                <label className="field-lbl">Google Gemini API Key</label>
                <div className="input-with-icon">
                  <Key size={16} className="text-muted" />
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={tempApiKey}
                    onChange={e => setTempApiKey(e.target.value)}
                  />
                </div>
                <div className="field-help">
                  Get a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio <ExternalLink size={11} /></a>. Keys are stored locally in your browser.
                </div>
              </div>

              <div className="setting-toggle-row">
                <div className="toggle-info">
                  <span className="toggle-title">🌐 Live Google Search Engine Grounding</span>
                  <span className="toggle-sub">Enables Gemini to search Google in real-time to fetch updated cutoff ranks and verified sources.</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={searchGrounding}
                    onChange={e => setSearchGrounding(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="modal-actions">
                <button className="btn-save-settings" onClick={saveSettings}>
                  {savedSuccess ? <><Check size={16} /> Saved Successfully</> : 'Save & Enable'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
