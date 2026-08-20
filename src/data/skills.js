// Comprehensive Skill Intelligence System extracted from 15,000+ Career Registry
// Covers all domains: AI, Software, Healthcare, Medicine, Quant Finance, Robotics, 
// Space Tech, Pure Sciences, Master Trades, Law, Design, Energy, and Biotech.

export const skillCategories = [
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & Machine Learning',
    icon: '⚡',
    skills: [
      { id: 'transformer-models', name: 'Transformer Architectures & Attention Kernels', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'distributed-gpu-training', name: 'Distributed GPU Cluster Training (DeepSpeed/Megatron)', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'rlhf-alignment', name: 'Reinforcement Learning from Human Feedback (RLHF)', learningTime: { beginner: '2-4 months', professional: '8-18 months', advanced: '2+ years' } },
      { id: 'cuda-c', name: 'CUDA C/C++ GPU Kernel Optimization', learningTime: { beginner: '4-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'computer-vision-nerf', name: 'Spatial NeRFs & 3D Gaussian Splatting', learningTime: { beginner: '2-4 months', professional: '8-16 months', advanced: '2+ years' } },
      { id: 'llm-agent-orchestration', name: 'Autonomous Agent Frameworks (LangChain, AutoGen)', learningTime: { beginner: '1-2 months', professional: '4-8 months', advanced: '1-2 years' } },
      { id: 'multimodal-diffusion', name: 'Latent Diffusion Models & Video Gen', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '2+ years' } },
      { id: 'model-quantization', name: 'Model Quantization (GGUF, AWQ, FP8/INT4)', learningTime: { beginner: '1-3 months', professional: '6-12 months', advanced: '2+ years' } }
    ]
  },
  {
    id: 'systems-swe',
    name: 'Software, Distributed Systems & Cloud',
    icon: '💻',
    skills: [
      { id: 'rust-systems', name: 'Rust High-Concurrency & Memory Safety', learningTime: { beginner: '2-4 months', professional: '8-18 months', advanced: '2+ years' } },
      { id: 'distributed-consensus', name: 'Distributed Consensus Protocols (Raft, Paxos)', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'kubernetes-cloud-native', name: 'Kubernetes Operator & Cloud-Native Architecture', learningTime: { beginner: '2-4 months', professional: '6-12 months', advanced: '2+ years' } },
      { id: 'ebpf-kernel', name: 'eBPF Linux Kernel Observability & Networking', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'low-latency-cpp', name: 'Ultra Low-Latency Modern C++ (C++20/23)', learningTime: { beginner: '4-6 months', professional: '1-3 years', advanced: '4+ years' } },
      { id: 'database-internals', name: 'LSM-Trees & Database Storage Engine Design', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'webassembly-compilers', name: 'WebAssembly (Wasm) & LLVM Compiler Toolchains', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'zero-knowledge-crypto', name: 'Zero-Knowledge Proofs (ZK-SNARKs/STARKs)', learningTime: { beginner: '4-8 months', professional: '1-3 years', advanced: '3+ years' } }
    ]
  },
  {
    id: 'medicine-health',
    name: 'Clinical Medicine, Surgery & Healthcare',
    icon: '🩺',
    skills: [
      { id: 'robotic-surgery-davinci', name: 'Robotic-Assisted Surgery (da Vinci System)', learningTime: { beginner: '6-12 months', professional: '2-4 years', advanced: '5+ years' } },
      { id: 'cardiac-catheterization', name: 'Interventional Cardiac Catheterization', learningTime: { beginner: '1-2 years', professional: '3-5 years', advanced: '6+ years' } },
      { id: 'neuro-navigation', name: 'Stereotactic Neurosurgical Navigation', learningTime: { beginner: '1-2 years', professional: '3-5 years', advanced: '6+ years' } },
      { id: 'crispr-gene-editing', name: 'CRISPR-Cas9 Therapeutic Gene Editing', learningTime: { beginner: '4-8 months', professional: '1-3 years', advanced: '3+ years' } },
      { id: 'clinical-pharmacokinetics', name: 'Clinical Pharmacokinetics & Drug Interaction Modeling', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'diagnostic-mri-spectroscopy', name: 'High-Field 7T MRI Spectroscopy & Diffusion Tensor Imaging', learningTime: { beginner: '6-12 months', professional: '2-3 years', advanced: '4+ years' } },
      { id: 'implantable-neural-interfaces', name: 'Neural Interface Micro-Electrode Implantation', learningTime: { beginner: '1-2 years', professional: '3-5 years', advanced: '5+ years' } }
    ]
  },
  {
    id: 'quant-finance',
    name: 'Quantitative Finance & Market Strategy',
    icon: '📈',
    skills: [
      { id: 'stochastic-calculus', name: 'Stochastic Calculus & Black-Scholes-Merton', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'statistical-arbitrage', name: 'Statistical Arbitrage & Pairs Trading', learningTime: { beginner: '2-4 months', professional: '8-18 months', advanced: '2+ years' } },
      { id: 'order-book-microstructure', name: 'High-Frequency Order Book Dynamics & Market Microstructure', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'fpga-trading-hardware', name: 'FPGA VHDL/Verilog Ultra-Fast Trading Engines', learningTime: { beginner: '4-8 months', professional: '1-3 years', advanced: '3+ years' } },
      { id: 'risk-var-stress-testing', name: 'Basel III Value-at-Risk (VaR) & Monte Carlo Stress Testing', learningTime: { beginner: '2-4 months', professional: '6-12 months', advanced: '2+ years' } },
      { id: 'm-and-a-financial-modeling', name: 'LBO & M&A Valuation Modeling', learningTime: { beginner: '2-4 months', professional: '6-12 months', advanced: '2+ years' } }
    ]
  },
  {
    id: 'robotics-aerospace',
    name: 'Robotics, Aerospace & Autonomous Systems',
    icon: '🚀',
    skills: [
      { id: 'slam-navigation', name: 'Visual SLAM & LiDAR Point Cloud Navigation', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'aerospace-cfd', name: 'Supersonic CFD & Aerodynamic Boundary Layer Analysis', learningTime: { beginner: '4-8 months', professional: '1-3 years', advanced: '3+ years' } },
      { id: 'rocket-propulsion-design', name: 'Cryogenic Liquid Rocket Engine Combustion Chamber Design', learningTime: { beginner: '6-12 months', professional: '2-4 years', advanced: '5+ years' } },
      { id: 'ros2-embedded', name: 'ROS2 (Robot Operating System) & Micro-ROS Architecture', learningTime: { beginner: '2-4 months', professional: '8-16 months', advanced: '2+ years' } },
      { id: 'actuator-kinematics', name: 'Bipedal Humanoid Inverse Kinematics & Torque Control', learningTime: { beginner: '4-8 months', professional: '1-3 years', advanced: '3+ years' } },
      { id: 'orbital-trajectory-mechanics', name: 'Astrodynamics & Hohmann Transfer Orbit Modeling', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '2+ years' } }
    ]
  },
  {
    id: 'pure-sciences',
    name: 'Quantum Physics, Space & Chemistry',
    icon: '🪐',
    skills: [
      { id: 'quantum-qiskit-circuit', name: 'Qiskit Quantum Circuit Design & Error Mitigation', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'cryogenic-superconductivity', name: 'Cryogenic Superconducting Qubit Resonator Tuning', learningTime: { beginner: '6-12 months', professional: '2-4 years', advanced: '4+ years' } },
      { id: 'spectroscopic-astrophysics', name: 'JWST Infrared Stellar Spectroscopy & Exoplanet Transit Analysis', learningTime: { beginner: '4-8 months', professional: '1-3 years', advanced: '3+ years' } },
      { id: 'crystallography-nmr', name: 'X-Ray Crystallography & 900MHz Protein NMR', learningTime: { beginner: '6-12 months', professional: '2-3 years', advanced: '4+ years' } },
      { id: 'computational-density-functional', name: 'Density Functional Theory (DFT) Quantum Chemistry', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } }
    ]
  },
  {
    id: 'master-trades',
    name: 'Precision Engineering & Master Trades',
    icon: '🛠️',
    skills: [
      { id: 'underwater-hyperbaric-welding', name: 'Hyperbaric Wet & Dry Shielded Metal Arc Welding', learningTime: { beginner: '6-12 months', professional: '2-4 years', advanced: '5+ years' } },
      { id: '5-axis-cnc-machining', name: '5-Axis CNC Precision Mill/Turn Programming (Mastercam)', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } },
      { id: 'high-voltage-grid-linework', name: '765kV High-Voltage Transmission Line Hot-Sticking', learningTime: { beginner: '6-12 months', professional: '2-4 years', advanced: '4+ years' } },
      { id: 'industrial-hvac-ammonia', name: 'Industrial Ammonia Refrigeration & Psychrometrics', learningTime: { beginner: '4-8 months', professional: '1-3 years', advanced: '3+ years' } },
      { id: 'gemstone-lapidary-faceting', name: 'Precision Diamond Faceting & Lapidary Geometry', learningTime: { beginner: '3-6 months', professional: '1-2 years', advanced: '3+ years' } }
    ]
  },
  {
    id: 'law-policy',
    name: 'Law, IP, Ethics & Strategic Policy',
    icon: '⚖️',
    skills: [
      { id: 'patent-prosecution-tech', name: 'Patent Prosecution & USPTO/EPO Cross-Border Filings', learningTime: { beginner: '6-12 months', professional: '2-4 years', advanced: '5+ years' } },
      { id: 'arbitration-cas-sports', name: 'Court of Arbitration for Sport (CAS) Lex Sportiva Advocacy', learningTime: { beginner: '6-12 months', professional: '2-3 years', advanced: '4+ years' } },
      { id: 'ai-ethics-eu-act', name: 'EU AI Act & Global Regulatory Compliance Auditing', learningTime: { beginner: '2-4 months', professional: '6-12 months', advanced: '2+ years' } },
      { id: 'cross-border-tax-structuring', name: 'International Transfer Pricing & Sovereign Tax Treaty Structuring', learningTime: { beginner: '6-12 months', professional: '2-4 years', advanced: '5+ years' } }
    ]
  }
];

export const allSkillsList = skillCategories.flatMap(c => 
  c.skills.map(s => ({
    ...s,
    categoryId: c.id,
    categoryName: c.name,
    icon: c.icon
  }))
);

function formatSalaryINR(lakhs) {
  if (lakhs >= 100) {
    return `₹${(lakhs / 100).toFixed(2)} Cr`;
  }
  return `₹${Math.round(lakhs)} LPA`;
}

export function calculateSkillSynergy(selectedSkillIds = []) {
  if (!selectedSkillIds.length) return null;

  const selectedSkills = allSkillsList.filter(s => selectedSkillIds.includes(s.id));
  const distinctCategories = new Set(selectedSkills.map(s => s.categoryId));
  const count = selectedSkills.length;
  const numDomains = distinctCategories.size;

  // Multiplier logic: The more distinct disparate high-leverage domains you combine, the higher the non-linear premium
  let multiplier = 1.0;
  if (count === 1) multiplier = 1.2;
  else if (count === 2 && numDomains === 1) multiplier = 1.6;
  else if (count === 2 && numDomains === 2) multiplier = 2.4;
  else if (count === 3 && numDomains >= 2) multiplier = 3.2;
  else if (count >= 4 && numDomains >= 3) multiplier = 4.5;
  else multiplier = Math.min(5.2, 1.4 + count * 0.5 + numDomains * 0.6);

  // Projected salary tier in INR and USD
  const baseSalaryINR = 15; // 15 LPA base
  const lowINR = baseSalaryINR * multiplier;
  const highINR = lowINR * 1.65;
  const projectedSalaryINR = `${formatSalaryINR(lowINR)} — ${formatSalaryINR(highINR)}`;

  const baseSalaryUSD = 95000;
  const lowUSD = Math.round((baseSalaryUSD * multiplier) / 1000) * 1000;
  const highUSD = Math.round((lowUSD * 1.55) / 1000) * 1000;
  const projectedSalaryUSD = `$${lowUSD.toLocaleString()} — $${highUSD.toLocaleString()}`;

  // AI Resilience and Risk rating
  const aiResilienceScore = Math.min(9.9, (8.2 + numDomains * 0.4 + count * 0.12)).toFixed(1);
  const aiRiskScore = Math.max(1.1, (10 - Number(aiResilienceScore))).toFixed(1);
  const aiDefensibilityLabel = Number(aiResilienceScore) >= 9.2 ? 'UNTOUCHABLE DEFENSE' : Number(aiResilienceScore) >= 8.5 ? 'EXTREMELY HIGH SHIELD' : 'HIGHLY RESILIENT';

  // Match unlocked archetype
  let unlockedArchetype = 'Full-Stack Interdisciplinary Specialist';
  if (distinctCategories.has('ai-ml') && distinctCategories.has('medicine-health')) {
    unlockedArchetype = 'Frontier Bio-Computational AI Architect';
  } else if (distinctCategories.has('quant-finance') && distinctCategories.has('systems-swe')) {
    unlockedArchetype = 'High-Frequency Quantitative Infrastructure Lead';
  } else if (distinctCategories.has('robotics-aerospace') && distinctCategories.has('ai-ml')) {
    unlockedArchetype = 'Autonomous Embodied Robotics Principal';
  } else if (distinctCategories.has('pure-sciences') && distinctCategories.has('ai-ml')) {
    unlockedArchetype = 'Quantum Machine Learning Fellow';
  } else if (distinctCategories.has('law-policy') && distinctCategories.has('ai-ml')) {
    unlockedArchetype = 'Frontier AI Governance & IP Counsel';
  } else if (distinctCategories.has('master-trades') && distinctCategories.has('robotics-aerospace')) {
    unlockedArchetype = 'Aerospace Precision Fabrication Lead';
  }

  return {
    selectedSkills,
    multiplier: `${multiplier.toFixed(1)}x Multiplier`,
    multiplierRaw: multiplier,
    projectedSalaryINR,
    projectedSalaryUSD,
    aiResilience: `${aiResilienceScore} / 10`,
    aiRiskScore,
    aiDefensibilityLabel,
    unlockedArchetype,
    distinctDomainsCount: numDomains,
    insights: `Combining ${numDomains} distinct fields creates high market defensibility. While single-skill tasks face rapid AI commoditization, the intersection of ${selectedSkills.map(s => s.name.split(' ')[0]).join(' + ')} forms an asymmetric monopoly advantage.`
  };
}
