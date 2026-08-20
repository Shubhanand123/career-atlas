// Google Gemini 3.6 Flash & Google Search Grounding Service for Career Atlas Copilot

const STORAGE_API_KEY = 'careerAtlas_gemini_key';
const STORAGE_USE_SEARCH = 'careerAtlas_gemini_search_enabled';

export function getStoredGeminiKey() {
  try {
    return localStorage.getItem(STORAGE_API_KEY) || import.meta.env.VITE_GEMINI_API_KEY || '';
  } catch {
    return import.meta.env.VITE_GEMINI_API_KEY || '';
  }
}

export function setStoredGeminiKey(key) {
  try {
    if (!key) {
      localStorage.removeItem(STORAGE_API_KEY);
    } else {
      localStorage.setItem(STORAGE_API_KEY, key.trim());
    }
  } catch (e) {
    console.error(e);
  }
}

export function isGoogleSearchEnabled() {
  try {
    const val = localStorage.getItem(STORAGE_USE_SEARCH);
    return val !== 'false'; // Default to true
  } catch {
    return true;
  }
}

export function setGoogleSearchEnabled(enabled) {
  try {
    localStorage.setItem(STORAGE_USE_SEARCH, enabled ? 'true' : 'false');
  } catch (e) {
    console.error(e);
  }
}

const SYSTEM_INSTRUCTION = `You are the Career Atlas Principal Intelligence Copilot — an expert global career advisor, education economist, and university admissions strategist.
Your purpose is to deliver accurate, non-superficial, data-backed insights to students and professionals.
You have access to Google Search to pull live 2025/2026 cutoff ranks, verified university tuition fees, international student living costs, post-study work visa (PGWP/OPT) regulations, and real-time tech/quant/corporate compensation trends.

Key Guidelines:
1. Always ground career advice in market realities (cognitive rigor, AI automation vulnerability vs augmentation potential, work hours, real Indian CTC LPA vs US/EU salaries).
2. For universities, calculate True-Cost (Tuition + Rent + Living Expenses + Health Insurance).
3. Use formatted headings, concise bullet points, bold key terms, and markdown tables when comparing options.
4. Keep advice strategic, direct, actionable, and encouraging.`;

export async function askGeminiCopilot({
  prompt,
  conversationHistory = [],
  apiKey = null,
  enableGoogleSearch = true
}) {
  const activeKey = apiKey || getStoredGeminiKey();
  
  if (!activeKey) {
    return {
      success: false,
      error: 'NO_API_KEY',
      message: 'No Google Gemini API key configured.'
    };
  }

  // Model choice: Gemini 2.5 Flash / Gemini 3.6 Flash
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeKey}`;

  // Format contents
  const contents = [];
  
  // Previous turns (last 6 messages for context)
  conversationHistory.slice(-6).forEach(msg => {
    if (msg.sender === 'user') {
      contents.push({
        role: 'user',
        parts: [{ text: typeof msg.text === 'string' ? msg.text : '' }]
      });
    } else if (msg.sender === 'ai' && typeof msg.text === 'string' && msg.text) {
      contents.push({
        role: 'model',
        parts: [{ text: msg.text }]
      });
    }
  });

  // Current prompt
  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  const requestBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 2048
    }
  };

  // Google Search Grounding Tool
  if (enableGoogleSearch) {
    requestBody.tools = [
      {
        googleSearch: {}
      }
    ];
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      const errMsg = errJson?.error?.message || `HTTP ${res.status}: ${res.statusText}`;
      return {
        success: false,
        error: 'API_ERROR',
        message: errMsg
      };
    }

    const data = await res.json();
    const candidate = data.candidates?.[0];
    const textPart = candidate?.content?.parts?.map(p => p.text).filter(Boolean).join('\n') || '';

    // Extract Google Search Grounding metadata & citations
    const groundingMetadata = candidate?.groundingMetadata || {};
    const webSearchQueries = groundingMetadata.webSearchQueries || [];
    const searchChunks = groundingMetadata.groundingChunks || [];
    const webSources = [];

    searchChunks.forEach(chunk => {
      if (chunk.web?.uri) {
        webSources.push({
          title: chunk.web.title || new URL(chunk.web.uri).hostname,
          url: chunk.web.uri
        });
      }
    });

    // Deduplicate sources by URL
    const uniqueSources = Array.from(new Map(webSources.map(s => [s.url, s])).values()).slice(0, 5);

    return {
      success: true,
      text: textPart,
      grounded: uniqueSources.length > 0 || webSearchQueries.length > 0,
      searchQueries: webSearchQueries,
      sources: uniqueSources
    };
  } catch (err) {
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: err.message || 'Failed to connect to Google Gemini API.'
    };
  }
}
