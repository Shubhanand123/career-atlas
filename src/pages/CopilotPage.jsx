import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, Sparkles, Compass, GraduationCap, Trophy, Briefcase, 
  Calculator, HelpCircle, ArrowRight, Globe, Search, Zap, CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { processCopilotQuery } from '../services/copilotEngine';
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

// Helper to render basic markdown safely in-app
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
      if (trimmed.startsWith('#### ')) {
        elements.push(<h5 key={i} className="ai-markdown-h5">{trimmed.substring(5)}</h5>);
      } else if (trimmed.startsWith('### ')) {
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
      text: "### ✦ Career Atlas Instant Intelligence & Search Engine\nHello! I am your in-app Copilot. Ask me any question about career pathways, true study costs abroad, 2026 college cutoffs, salary benchmarks, or sports professions. All data and search analysis are delivered **directly right here in this chat** without leaving the application."
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

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const result = await processCopilotQuery(userText);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: result.text,
          actionLink: result.actionLink
        }
      ]);
    }, 350);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="copilot-page">
      <Navbar />

      <main className="copilot-container">
        {/* Header with Direct In-App Intelligence Badges */}
        <div className="copilot-header">
          <div className="copilot-badges-bar">
            <div className="badge-pill">✦ Career Intelligence Copilot</div>
            <div className="gemini-status-pill active">
              <Zap size={13} className="text-green" />
              <span>Direct In-App Search & AI Synthesis Active</span>
            </div>
          </div>

          <h1 className="copilot-title">AI Career & Admissions Advisor</h1>
          <p className="copilot-subtitle">
            Instant, direct answers for 15,000+ careers, 10,000+ university cutoffs, true costs, and salary benchmarks — delivered right in this chat.
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

                  {/* Direct Internal Atlas Action Link */}
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

          {/* Prompt Suggestions Bar */}
          <div className="suggestions-bar">
            {SUGGESTIONS.map((s, idx) => (
              <button key={idx} className="suggestion-chip" onClick={() => handleSuggestionClick(s)}>
                {s}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSend} className="chat-input-form">
            <input
              type="text"
              placeholder="Ask anything (e.g. top CS colleges, Germany tuition, sports physiotherapist salary, AI layoff risk)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            
            {/* In-App Send Button */}
            <button type="submit" className="btn-send" disabled={!input.trim()} title="Ask Copilot">
              <Send size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
