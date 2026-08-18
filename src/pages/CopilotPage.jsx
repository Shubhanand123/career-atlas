import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import Navbar from '../components/Navbar';
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
    const q = query.toLowerCase();
    
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
          <p>Would you like me to direct you to the quiz?</p>
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
          <p>You can head over to the Compare page to select up to 5 careers at once!</p>
        </div>
      );
    } else if (q.includes('how to become') || q.includes('path') || q.includes('data scientist')) {
      return (
        <div className="ai-content">
          <p>Here is a typical roadmap for becoming a <strong>Data Scientist</strong>:</p>
          <ul>
            <li><strong>Step 1 (Education):</strong> Bachelor's in CS, Statistics, or Math. (Alternative: Data Science Bootcamp)</li>
            <li><strong>Step 2 (Skills):</strong> Master Python, SQL, and Machine Learning libraries (scikit-learn, TensorFlow).</li>
            <li><strong>Step 3 (Portfolio):</strong> Build 2-3 end-to-end projects demonstrating data cleaning, EDA, and predictive modeling.</li>
            <li><strong>Step 4 (Entry Role):</strong> Start as a Data Analyst or Junior Data Scientist to gain industry experience.</li>
          </ul>
        </div>
      );
    } else if (q.includes('ai') || q.includes('automation') || q.includes('accounting')) {
      return (
        <div className="ai-content">
          <p>The impact of AI on fields like <strong>Accounting</strong> is significant but mostly augmenting rather than replacing entirely.</p>
          <ul>
            <li><strong>Routine Tasks:</strong> Data entry, basic tax prep, and bookkeeping are highly exposed to automation.</li>
            <li><strong>Augmentation:</strong> AI tools help accountants detect fraud, analyze financial trends, and generate reports much faster.</li>
            <li><strong>Future Outlook:</strong> The role will shift from "number crunching" to "strategic financial advisory."</li>
          </ul>
        </div>
      );
    } else if (q.includes('cost') || q.includes('cheap') || q.includes('software engineer')) {
      return (
        <div className="ai-content">
          <p>There are several cost-effective ways to become a <strong>Software Engineer</strong> today:</p>
          <ul>
            <li><strong>Self-Taught (Free - $500):</strong> Using resources like FreeCodeCamp, Odin Project, and Udemy. Requires high discipline.</li>
            <li><strong>Bootcamps ($5k - $15k):</strong> Accelerated 3-6 month programs. Good for structured learning and career services.</li>
            <li><strong>Community College ($2k - $8k):</strong> Associate's degree in CS, often transferable to a 4-year university.</li>
          </ul>
        </div>
      );
    } else if (q.includes('demand') || q.includes('highest')) {
      return (
        <div className="ai-content">
          <p>Based on current labor market data, the careers with the highest projected growth over the next decade are:</p>
          <ul>
            <li><strong>Information Security Analysts:</strong> +32% growth (driven by cyber threats).</li>
            <li><strong>Nurse Practitioners:</strong> +40% growth (driven by healthcare demands).</li>
            <li><strong>Data Scientists:</strong> +35% growth (driven by big data and AI).</li>
            <li><strong>Wind Turbine Service Technicians:</strong> +44% growth (driven by renewable energy shifts).</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="ai-content">
          <p>That's an interesting question about your career journey.</p>
          <p>As an AI Copilot, I can help you analyze specific roles, compare industries, or map out educational requirements. Could you provide a bit more detail about which field or aspect you're curious about?</p>
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
