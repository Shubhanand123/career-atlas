// High-Yield Skill & Career Combos Database
// Shows how stacking complementary domains produces non-linear salary multipliers

export const salaryCombos = [
  {
    id: 'quant-combo',
    title: 'Quantitative Finance & Algo Trader',
    baseRole: 'Software Developer or Data Analyst ($90,000 / ₹15 LPA)',
    comboMultiplier: '3.4x — 5.0x',
    targetSalaryUSD: '$350,000 - $650,000+',
    targetSalaryINR: '₹80 LPA - ₹3.5 CPA',
    difficulty: 9.6,
    timeToMaster: '2 - 3 Years Dedicated Upskilling',
    stackedSkills: [
      { name: 'Modern C++ (C++20/23)', domain: 'Low-latency systems & memory layout' },
      { name: 'Stochastic Calculus & Time Series', domain: 'Martingales, Brownian motion, volatility surface modeling' },
      { name: 'Linux Kernel & Network Bypass (DPDK/Solarflare)', domain: 'Sub-microsecond packet transmission' },
      { name: 'Market Microstructure', domain: 'Order book dynamics, limit orders, tick data analysis' }
    ],
    targetRecruiters: ['Jane Street', 'Citadel', 'Optiver', 'Jump Trading', 'Graviton', 'Tower Research'],
    roadmap: [
      'Master low-level C++ concurrency, cache-locality, and assembly disassembly',
      'Learn Ito calculus, Black-Scholes derivations, and GARCH/ARIMA statistical models',
      'Build a sub-millisecond backtester and simulate order book matching',
      'Solve Brainstellar, Green Book, and algorithmic probability puzzles'
    ],
    aiRisk: 2.5,
    synergyInsight: 'Pure math majors lack low-level systems speed; pure programmers lack deep stochastic intuition. The intersection commands the highest entry salaries on Earth.'
  },
  {
    id: 'ai-infra-combo',
    title: 'AI Infrastructure & GPU Systems Architect',
    baseRole: 'Standard Backend / Web Developer ($110,000 / ₹18 LPA)',
    comboMultiplier: '2.5x — 3.8x',
    targetSalaryUSD: '$280,000 - $480,000',
    targetSalaryINR: '₹60 LPA - ₹1.8 CPA',
    difficulty: 8.9,
    timeToMaster: '1.5 - 2 Years',
    stackedSkills: [
      { name: 'CUDA / Triton & GPU Kernel Optimization', domain: 'Writing custom FP8/INT4 attention kernels' },
      { name: 'Distributed Training (Megatron-LM, DeepSpeed, FSDP)', domain: '3D parallelism (Tensor, Pipeline, Expert)' },
      { name: 'High-Speed Networking (InfiniBand, RDMA, RoCE)', domain: 'AllReduce collective communication bottlenecks' },
      { name: 'vLLM, TensorRT-LLM & Inference Serving', domain: 'PagedAttention, speculative decoding, continuous batching' }
    ],
    targetRecruiters: ['Nvidia', 'OpenAI', 'Meta AI', 'Anthropic', 'Together AI', 'Microsoft AI Infra'],
    roadmap: [
      'Write custom matrix multiplication and flash attention kernels in CUDA C++',
      'Deploy 70B+ parameter models across multi-node GPU clusters with RoCE/InfiniBand',
      'Benchmark memory bandwidth vs compute utilization with Nvidia Nsight',
      'Contribute to open-source vLLM, DeepSpeed, or HuggingFace TGI'
    ],
    aiRisk: 1.8,
    synergyInsight: 'While AI models generate simple web apps, they cannot engineer the high-performance physical computing clusters that train and serve them.'
  },
  {
    id: 'biotech-ai-combo',
    title: 'Computational Biology & AI Drug Discovery',
    baseRole: 'Biologist or Traditional Chemist ($70,000 / ₹10 LPA)',
    comboMultiplier: '2.6x — 3.5x',
    targetSalaryUSD: '$200,000 - $360,000',
    targetSalaryINR: '₹45 LPA - ₹1.2 CPA',
    difficulty: 9.2,
    timeToMaster: '2 - 3 Years',
    stackedSkills: [
      { name: 'Molecular Biology & Protein Dynamics', domain: 'PDB structures, binding affinities, ligand docking' },
      { name: 'Geometric Deep Learning & Diffusion Models', domain: 'Equivariant graph neural networks, AlphaFold 3 / ESMFold' },
      { name: 'Python Scientific Stack (BioPython, PyMOL, RDKit)', domain: 'Cheminformatics and molecular fingerprinting' },
      { name: 'Cloud Pipelines (Nextflow, GCP Life Sciences)', domain: 'Scalable genomic sequence processing' }
    ],
    targetRecruiters: ['DeepMind (Isomorphic Labs)', 'Schrödinger', 'Relay Therapeutics', 'Recursion Bio', 'Genentech'],
    roadmap: [
      'Gain grounding in structural biology, amino acid physics, and pharmacokinetics',
      'Train graph neural networks on ChEMBL and Protein Data Bank datasets',
      'Simulate molecular binding affinities and validate with cryo-EM benchmarks',
      'Publish or build an open-source antibody or small molecule screening tool'
    ],
    aiRisk: 1.5,
    synergyInsight: 'Pharmaceutical companies spend $2B+ per drug; automating candidate screening with AI brings immense capital value.'
  },
  {
    id: 'cloud-sec-combo',
    title: 'Cloud Security & DevSecOps Architect',
    baseRole: 'SysAdmin or Junior IT Analyst ($65,000 / ₹8 LPA)',
    comboMultiplier: '2.3x — 3.2x',
    targetSalaryUSD: '$190,000 - $320,000',
    targetSalaryINR: '₹40 LPA - ₹95 LPA',
    difficulty: 7.9,
    timeToMaster: '1 - 2 Years',
    stackedSkills: [
      { name: 'Multi-Cloud Architecture (AWS/Azure/GCP)', domain: 'IAM governance, VPC peering, KMS encryption' },
      { name: 'Kubernetes & Container Security (eBPF, Falco)', domain: 'Runtime threat detection, Cilium networking' },
      { name: 'Infrastructure as Code (Terraform, Pulumi)', domain: 'Automated policy-as-code and compliance guardrails' },
      { name: 'Zero Trust & Threat Modeling', domain: 'OAuth2/OIDC, SAML, SPIFFE/SPIRE micro-segmentation' }
    ],
    targetRecruiters: ['CrowdStrike', 'Palo Alto Networks', 'Datadog', 'Wiz', 'Major Banks & Cloud Providers'],
    roadmap: [
      'Earn CKA (Certified Kubernetes Administrator) and AWS Solutions Architect Pro',
      'Implement automated vulnerability scanning in GitHub Actions / GitLab CI',
      'Build eBPF security telemetry monitors and simulate ransomware attacks in lab environments',
      'Audit enterprise infrastructure against CIS Benchmarks and SOC 2 / ISO 27001'
    ],
    aiRisk: 2.1,
    synergyInsight: 'Security breaches cost millions; enterprise executives will never delegate total infrastructure security compliance to unverified code generators.'
  },
  {
    id: 'product-growth-combo',
    title: 'AI Product Strategy & Technical Product Management',
    baseRole: 'Project Manager or Scrum Master ($80,000 / ₹12 LPA)',
    comboMultiplier: '2.1x — 3.0x',
    targetSalaryUSD: '$210,000 - $350,000',
    targetSalaryINR: '₹45 LPA - ₹1.1 CPA',
    difficulty: 7.8,
    timeToMaster: '1 - 2 Years',
    stackedSkills: [
      { name: 'Technical System Architecture & LLM Evals', domain: 'Understanding latency, token costs, RAG architectures' },
      { name: 'Product Analytics & SQL (PostHog, Mixpanel, Amplitude)', domain: 'Cohort retention, funnel drop-off, churn modeling' },
      { name: 'Pricing & Monetization Strategy', domain: 'Token-based vs seat-based pricing, unit economics' },
      { name: 'User Experience & Human-in-the-loop Design', domain: 'Prompt UX, streaming UX, confidence scoring feedback' }
    ],
    targetRecruiters: ['Stripe', 'OpenAI', 'Figma', 'Notion', 'Uber', 'Atlassian'],
    roadmap: [
      'Ship 2 end-to-end full stack AI products with real paying users',
      'Master SQL, AB testing statistics, and conversion rate optimization',
      'Design product specs with explicit latency budgets and fallback cascades',
      'Lead cross-functional sprints aligning engineering, sales, and executive teams'
    ],
    aiRisk: 4.2,
    synergyInsight: 'Engineering alone fails if users do not understand the value; business acumen combined with deep technical AI literacy creates rare leadership talent.'
  }
];

export function getSalaryComboById(id) {
  return salaryCombos.find(c => c.id === id);
}
