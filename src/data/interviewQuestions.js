// Interview Preparation Question Bank & Checklists
// Role-specific, behavioral, and technical questions with answer frameworks.

export const interviewQuestionsByRole = {
  'software-engineer': {
    roleName: 'Software Engineer',
    category: 'Technology & AI',
    preparationChecklist: [
      'Master Big-O analysis and fundamental data structures (Arrays, Hash Maps, Trees, Graphs)',
      'Prepare 3 STAR stories: a complex bug solved, a cross-functional trade-off, and an architectural decision',
      'Review system design basics (Caching, Load Balancing, SQL vs NoSQL, CAP theorem)',
      'Set up a live coding environment with syntax checking and clean testing practices'
    ],
    technicalQuestions: [
      {
        question: 'How would you design a distributed URL shortening service (like Bitly) to handle 100M daily writes and 1B reads?',
        framework: 'Clarify scale (QPS, storage) → API Design (POST /shorten, GET /:id) → Base62 encoding vs hashing → Database schema (partitioning by hash) → Cache layer (Redis LRU) → Concurrency and collision handling.',
        difficulty: 'Senior / Hard'
      },
      {
        question: 'Explain the difference between synchronous blocking operations and asynchronous non-blocking event loops in Node.js / JavaScript.',
        framework: 'Define call stack, Web APIs, Task Queue, Microtask Queue (Promises), and how the event loop continuously checks if the stack is clear before dequeueing.',
        difficulty: 'Mid / Medium'
      },
      {
        question: 'What is database normalization (1NF through 3NF), and in which scenarios would you deliberately denormalize a database?',
        framework: 'Define reduction of redundancy and anomalies → Explain read-heavy analytical/OLAP requirements where JOINs are bottlenecked and pre-aggregated read models save latency.',
        difficulty: 'Mid / Medium'
      }
    ],
    behavioralQuestions: [
      {
        question: 'Tell me about a time when you disagreed with a senior engineer or product manager on an architectural decision. How did you resolve it?',
        framework: 'Situation (feature context) → Task (the conflicting proposals) → Action (gathered data, ran benchmarks, focused on customer impact rather than ego) → Result (aligned consensus and outcome).',
        difficulty: 'Behavioral Standard'
      },
      {
        question: 'Describe a production outage or critical bug you caused or investigated under pressure. What was the post-mortem?',
        framework: 'Own responsibility immediately → Explain rapid triage and mitigation → Detail root cause analysis (RCA) → Highlight 2 automated safeguards implemented to prevent recurrence.',
        difficulty: 'Senior / Leadership'
      }
    ]
  },
  'data-scientist': {
    roleName: 'Data Scientist & Machine Learning Engineer',
    category: 'Technology & AI',
    preparationChecklist: [
      'Be ready to derive backpropagation, gradient descent, and cross-entropy loss from first principles',
      'Explain model evaluation metrics: Precision vs Recall, ROC-AUC, F1-score, and cost matrix tradeoffs',
      'Have 2 end-to-end ML pipeline projects prepared with data cleaning, feature engineering, and deployment details',
      'Review SQL window functions, CTEs, and aggregation under sparse data'
    ],
    technicalQuestions: [
      {
        question: 'How do you diagnose and address severe class imbalance in a fraud detection dataset with 99.8% negative samples?',
        framework: 'Metrics choice (never use raw Accuracy; use PR-AUC, F-beta) → Resampling techniques (SMOTE, random undersampling) → Algorithmic tuning (focal loss, class-weighted loss) → Threshold calibration via ROC curve.',
        difficulty: 'Senior / Hard'
      },
      {
        question: 'What causes model drift in production, and how would you build an automated monitoring system to catch it?',
        framework: 'Data drift (covariate shift) vs Concept drift → Statistical distance tests (KS-test, Population Stability Index / PSI, Wasserstein distance) → Automated alert pipeline + Scheduled retraining triggers.',
        difficulty: 'Senior / Hard'
      }
    ],
    behavioralQuestions: [
      {
        question: 'How do you communicate a complex black-box machine learning model output to non-technical business stakeholders?',
        framework: 'Use SHAP / LIME explainability plots → Frame metrics in business dollars / risk reduction rather than log-loss → Provide concrete intuitive examples of model decision boundaries.',
        difficulty: 'Behavioral'
      }
    ]
  },
  'doctor': {
    roleName: 'Medical Physician & Surgeon',
    category: 'Healthcare & Medicine',
    preparationChecklist: [
      'Review emergency triage protocols (ABCDE primary assessment)',
      'Prepare ethical dilemma scenarios (informed consent, patient confidentiality, triage under resource constraints)',
      'Articulate clinical empathy, patient communication, and interprofessional teamwork with nursing staff'
    ],
    technicalQuestions: [
      {
        question: 'A 58-year-old patient presents to the emergency room with acute substernal chest pain radiating to the left arm and jaw. Walk through your immediate 10-minute diagnostic and therapeutic pathway.',
        framework: 'Immediate ABC stabilization → 12-lead ECG within 10 min → Aspirin, Nitroglycerin, high-flow O2 if hypoxic → Troponin panel → Triage for immediate cardiac catheterization (STEMI pathway) vs NSTEMI protocol.',
        difficulty: 'Clinical Core'
      }
    ],
    behavioralQuestions: [
      {
        question: 'How do you break difficult or terminal news to an anxious family in a busy clinical environment?',
        framework: 'Use the SPIKES protocol (Setting, Perception, Invitation, Knowledge, Empathy, Strategy/Summary) → Ensure quiet private setting → Use simple non-jargon language → Allow silence and acknowledge emotion.',
        difficulty: 'Medical Ethics'
      }
    ]
  },
  'sports-physiotherapist': {
    roleName: 'Sports Physiotherapist',
    category: 'Sports Medicine',
    preparationChecklist: [
      'Review return-to-play testing criteria (Limb Symmetry Index, hop tests, dynamic valgus kinematics)',
      'Prepare protocols for acute ligamentous tears (ACL, ATFL) and muscle strain periodization',
      'Demonstrate multidisciplinary communication with head coaches and strength trainers'
    ],
    technicalQuestions: [
      {
        question: 'An elite soccer winger is 6 months post-ACL reconstruction. What objective criteria do you require before clearing them for full-contact competitive training?',
        framework: 'Limb Symmetry Index ≥ 90% across single-leg hop, triple hop, and isokinetic quad/hamstring strength → Y-Balance test stability → Video kinematics showing zero dynamic knee valgus → Psychological readiness (ACL-RSI score > 75).',
        difficulty: 'Sports Performance'
      }
    ],
    behavioralQuestions: [
      {
        question: 'An athlete and head coach are pressuring you to clear the athlete for a crucial final before clinical milestones are met. How do you manage this conflict?',
        framework: 'Reiterate duty of care and long-term joint health → Present objective benchmark data visually → Explain catastrophic re-tear risks → Offer modified low-risk role if clinically safe, or stand firm on protocol.',
        difficulty: 'Sports Ethics'
      }
    ]
  }
};

export function getInterviewPrepForCareer(careerId) {
  if (!careerId) return interviewQuestionsByRole['software-engineer'];
  const key = String(careerId).toLowerCase();
  return interviewQuestionsByRole[key] || interviewQuestionsByRole['software-engineer'];
}
