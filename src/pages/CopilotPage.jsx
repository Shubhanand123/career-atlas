import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import { careerRegistry } from '../data/careerRegistry';
import { getEnrichedCareer } from '../data/careers';
import '../styles/copilot.css';

const SUGGESTIONS = [
  "What career suits me?",
  "Compare engineering vs medicine",
  "How to become a data scientist?",
  "What's the AI impact on accounting?",
  "Cheapest way to become a software engineer",
  "What careers have the highest demand?"
];

export default function CopilotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your Career Atlas AI. I can help you explore careers, understand educational paths, compare roles, or analyze industry trends. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (query) => {
    const q = query.toLowerCase().trim();
    
    // Check if query is asking about a specific career from the registry
    const words = q.replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 2 && !['what', 'about', 'how', 'tell', 'the', 'does', 'much', 'many', 'become', 'like', 'role', 'jobs', 'work'].includes(w));
    let matchedCareer = null;

    if (words.length > 0) {
      const searchKey = words.join(' ');
      matchedCareer = careerRegistry.find(c => c.name.toLowerCase().includes(searchKey) || c.id === searchKey);
    }

    if (matchedCareer) {
      const enriched = getEnrichedCareer(matchedCareer.id);
      return (
        <div className="ai-content">
          <p>Here is the career intelligence dossier for <strong>{enriched.name}</strong>:</p>
          <ul>
            <li><strong>Sector & Cluster:</strong> {enriched.category} ({enriched.subcategory})</li>
            <li><strong>Typical Education:</strong> {enriched.education?.typical || enriched.typicalEducation}</li>
            <li><strong>Cognitive Toughness:</strong> {enriched.difficulty?.overall || 7.0}/10</li>
            <li><strong>US Mid Salary:</strong> ${(enriched.salaryUSD?.mid || 110000).toLocaleString()} / year</li>
            <li><strong>India Benchmark CTC:</strong> ₹{((enriched.salaryINR?.entry || 600000) / 100000).toFixed(1)} Lakhs+ per annum</li>
            <li><strong>AI Resilience Index:</strong> {(10 - (Number(enriched.aiRisk) || 3.5)).toFixed(1)}/10</li>
          </ul>
          <p>{enriched.shortDescription}</p>
          <p style={{ marginTop: '0.75rem' }}>
            <Link to={`/career/${enriched.id}`} style={{ color: '#00d4ff', fontWeight: 600, textDecoration: 'underline' }}>
              Open Full {enriched.name} Profile, EMI Calculator & Practitioner Stories →
            </Link>
          </p>
        </div>
      );
    }

    if (q.includes('suit') || q.includes('best for me') || q.includes('quiz')) {
      return (
        <div className="ai-content">
          <p>Based on your interest in finding the right fit, I highly recommend our <strong>Career DNA Quiz</strong>.</p>
          <p>It takes about 10 minutes and evaluates your traits across 12 different dimensions including:</p>
          <ul>
            <li>Analytical vs Creative thinking</li>
            <li>Risk tolerance and Stability needs</li>
            <li>Leadership and Communication styles</li>
          </ul>
          <p><Link to="/quiz" style={{ color: '#00d4ff', textDecoration: 'underline' }}>Take the 60-Question Career DNA Assessment →</Link></p>
        </div>
      );
    } else if (q.includes('compare') || q.includes('vs')) {
      return (
        <div className="ai-content">
          <p>Comparing careers side-by-side is a great way to make a decision. Our <strong>Comparison Tool</strong> lets you evaluate roles based on:</p>
          <ul>
            <li>Salary progression (Entry, Mid, Senior)</li>
            <li>Work-life balance & stress levels</li>
            <li>Education duration & cost</li>
            <li>AI automation exposure</li>
          </ul>
          <p><Link to="/compare" style={{ color: '#00d4ff', textDecoration: 'underline' }}>Launch Career Side-by-Side Comparison Tool →</Link></p>
        </div>
      );
    } else if (q.includes('ai') || q.includes('automation') || q.includes('layoff')) {
      return (
        <div className="ai-content">
          <p>We track structural contraction and automation risks across 380,000+ data points:</p>
          <ul>
            <li><strong>High Automation Risk:</strong> Repetitive data entry, standard copywriting, basic coding boilerplate.</li>
            <li><strong>AI Resilient Niches:</strong> Low-latency C++, neurosurgery, specialized trades (electricians, master plumbers), high-empathy healthcare, and hardware robotics.</li>
          </ul>
          <p><Link to="/layoffs" style={{ color: '#00d4ff', textDecoration: 'underline' }}>Explore Live Layoffs & AI Risk Tracker →</Link></p>
        </div>
      );
    } else if (q.includes('college') || q.includes('placement') || q.includes('roi') || q.includes('iit') || q.includes('bits')) {
      return (
        <div className="ai-content">
          <p>Our <strong>Institutional Placement Audit</strong> covers verified branch-wise placement percentages, tuition fee recovery, and recruiter tiers across IITs, BITS, IIMs, AIIMS, Stanford, and MIT.</p>
          <p><Link to="/placements" style={{ color: '#00d4ff', textDecoration: 'underline' }}>View College Placement Reports & ROI Rankings →</Link></p>
        </div>
      );
    } else {
      return (
        <div className="ai-content">
          <p>I have access to our database of <strong>10,000+ verified occupational profiles</strong>, college ROI audits, and compensation multipliers.</p>
          <p>You can ask me about any career (e.g. <em>"tell me about carpenter"</em>, <em>"how to become a quant"</em>, <em>"neurosurgeon salary"</em>, <em>"AI impact on accounting"</em>) or ask for college placement benchmarks!</p>
        </div>
      );
    }
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        content: generateResponse(text)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="copilot-container">
      <Navbar />
      
      <div className="copilot-header">
        <h1 className="copilot-title"><Bot size={40} /> Career Atlas AI</h1>
        <p className="quiz-subtitle">Your intelligent career advisor</p>
      </div>

      <div className="chat-interface">
        <div className="chat-messages">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`message-wrapper ${msg.sender}`}
              >
                {msg.sender === 'ai' && (
                  <div className="message-avatar">
                    <Bot size={20} color="white" />
                  </div>
                )}
                <div className="message-bubble">
                  {msg.content ? msg.content : msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="message-avatar">
                    <User size={20} color="white" />
                  </div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="message-wrapper ai"
              >
                <div className="message-avatar">
                  <Bot size={20} color="white" />
                </div>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="suggestions-container">
          {SUGGESTIONS.map((suggestion, idx) => (
            <div 
              key={idx} 
              className="suggestion-chip"
              onClick={() => handleSend(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <div className="input-wrapper">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask me anything about your career..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              className="btn-send" 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
