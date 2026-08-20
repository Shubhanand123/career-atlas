// High-Yield Skill & Career Combos Database
// Shows how stacking complementary domains produces non-linear salary multipliers and AI resistance

export const salaryCombos = [
  {
    id: 'quant-combo',
    title: 'Quantitative Finance & Algo Trader',
    baseRole: 'Software Developer or Data Analyst (₹15 LPA / $90,000)',
    comboMultiplier: '3.4x — 5.0x',
    targetSalaryUSD: '$350,000 - $650,000+',
    targetSalaryINR: '₹85 LPA — ₹3.50 Cr',
    baseSalaryINR: '₹15 LPA',
    baseSalaryUSD: '$90,000',
    difficulty: 9.6,
    timeToMaster: '2 - 3 Years Dedicated Upskilling',
    stackedSkills: [
      { name: 'Modern C++ (C++20/23)', domain: 'Low-latency systems & memory layout', masteryTime: '1 - 2 Years' },
      { name: 'Stochastic Calculus & Time Series', domain: 'Martingales, Brownian motion, volatility surfaces', masteryTime: '1.5 Years' },
      { name: 'Linux Kernel & Network Bypass (DPDK/Solarflare)', domain: 'Sub-microsecond packet transmission', masteryTime: '1 Year' },
      { name: 'Market Microstructure', domain: 'Order book dynamics, limit orders, tick data analysis', masteryTime: '8 Months' }
    ],
    targetRecruiters: ['Jane Street', 'Citadel', 'Optiver', 'Jump Trading', 'Graviton', 'Tower Research'],
    roadmap: [
      { step: '01', title: 'Low-Level Systems & Concurrency', duration: '6 Months', description: 'Master C++ memory layout, cache-locality, lock-free queues, and assembly disassembly.' },
      { step: '02', title: 'Stochastic Math & Probability', duration: '8 Months', description: 'Study Ito calculus, Black-Scholes derivations, volatility smiles, and GARCH statistical models.' },
      { step: '03', title: 'Order Book Simulator & Backtesting', duration: '6 Months', description: 'Build a sub-millisecond execution engine and simulate order book queue matching.' },
      { step: '04', title: 'Competitive Brainteasers & Interviews', duration: '4 Months', description: 'Solve Brainstellar, Green Book probability puzzles, and real-time market making games.' }
    ],
    aiRisk: 1.8,
    aiDefensibilityLabel: 'EXTREMELY HIGH SHIELD',
    aiShieldReason: 'Trading algorithms operate in adversarial zero-sum environments where generic public LLM predictions are immediately front-run and exploited.',
    tasksAutomated: ['Basic tick data cleaning', 'Standard statistical metric reporting'],
    tasksHuman: ['Adversarial alpha discovery', 'Risk capital allocation under unprecedented black-swan regime shifts'],
    synergyInsight: 'Pure math majors lack low-level systems speed; pure programmers lack deep stochastic intuition. The intersection commands the highest entry salaries in global industry.'
  },
  {
    id: 'ai-infra-combo',
    title: 'AI Infrastructure & GPU Systems Architect',
    baseRole: 'Standard Backend / Web Developer (₹18 LPA / $110,000)',
    comboMultiplier: '2.5x — 3.8x',
    targetSalaryUSD: '$280,000 - $480,000',
    targetSalaryINR: '₹65 LPA — ₹1.85 Cr',
    baseSalaryINR: '₹18 LPA',
    baseSalaryUSD: '$110,000',
    difficulty: 8.9,
    timeToMaster: '1.5 - 2 Years',
    stackedSkills: [
      { name: 'CUDA / Triton & GPU Kernel Optimization', domain: 'Writing custom FP8/INT4 attention kernels', masteryTime: '1 Year' },
      { name: 'Distributed Training (Megatron-LM, DeepSpeed)', domain: '3D parallelism (Tensor, Pipeline, Expert)', masteryTime: '1 Year' },
      { name: 'High-Speed Networking (InfiniBand, RDMA, RoCE)', domain: 'AllReduce collective communication bottlenecks', masteryTime: '8 Months' },
      { name: 'vLLM, TensorRT-LLM & Inference Serving', domain: 'PagedAttention, speculative decoding, continuous batching', masteryTime: '6 Months' }
    ],
    targetRecruiters: ['Nvidia', 'OpenAI', 'Meta AI', 'Anthropic', 'Together AI', 'Microsoft AI Infra'],
    roadmap: [
      { step: '01', title: 'GPU Hardware Architecture & CUDA', duration: '6 Months', description: 'Write custom matrix multiplication and flash attention kernels in CUDA C++ and Triton.' },
      { step: '02', title: 'Multi-Node Cluster Scaling', duration: '6 Months', description: 'Deploy 70B+ parameter models across multi-node GPU clusters with RoCE/InfiniBand.' },
      { step: '03', title: 'Performance Profiling & Bottlenecks', duration: '4 Months', description: 'Profile memory bandwidth vs compute utilization with Nvidia Nsight Systems.' },
      { step: '04', title: 'High-Throughput Inference Engines', duration: '4 Months', description: 'Deploy low-latency streaming endpoints using vLLM, TensorRT-LLM, and continuous batching.' }
    ],
    aiRisk: 1.5,
    aiDefensibilityLabel: 'EXTREMELY HIGH SHIELD',
    aiShieldReason: 'AI cannot configure physical optical transceivers, debug cluster networking drops, or write bleeding-edge architecture kernels before training data exists.',
    tasksAutomated: ['Standard boilerplate configuration files', 'Basic Grafana dashboard templating'],
    tasksHuman: ['Physical hardware cluster orchestration', 'Kernel latency optimization for unreleased chip architectures'],
    synergyInsight: 'While AI models generate simple web apps, they cannot engineer the high-performance physical computing clusters that train and serve them.'
  },
  {
    id: 'biotech-ai-combo',
    title: 'Computational Biology & AI Drug Discovery',
    baseRole: 'Biologist or Traditional Chemist (₹10 LPA / $70,000)',
    comboMultiplier: '2.6x — 3.5x',
    targetSalaryUSD: '$200,000 - $360,000',
    targetSalaryINR: '₹48 LPA — ₹1.25 Cr',
    baseSalaryINR: '₹10 LPA',
    baseSalaryUSD: '$70,000',
    difficulty: 9.2,
    timeToMaster: '2 - 3 Years',
    stackedSkills: [
      { name: 'Molecular Biology & Protein Dynamics', domain: 'PDB structures, binding affinities, ligand docking', masteryTime: '2 Years' },
      { name: 'Geometric Deep Learning & Diffusion Models', domain: 'Equivariant graph neural networks, AlphaFold 3 / ESMFold', masteryTime: '1 Year' },
      { name: 'Python Scientific Stack (BioPython, RDKit)', domain: 'Cheminformatics and molecular fingerprinting', masteryTime: '8 Months' },
      { name: 'Cloud Pipelines (Nextflow, GCP Life Sciences)', domain: 'Scalable genomic sequence processing', masteryTime: '6 Months' }
    ],
    targetRecruiters: ['DeepMind (Isomorphic Labs)', 'Schrödinger', 'Relay Therapeutics', 'Recursion Bio', 'Genentech'],
    roadmap: [
      { step: '01', title: 'Structural Biology & Bioenergetics', duration: '8 Months', description: 'Gain grounding in structural biology, amino acid physics, and pharmacokinetics.' },
      { step: '02', title: 'Graph Neural Networks & Molecular ML', duration: '8 Months', description: 'Train graph neural networks on ChEMBL and Protein Data Bank datasets.' },
      { step: '03', title: 'Docking & Cryo-EM Validation', duration: '6 Months', description: 'Simulate molecular binding affinities and validate with cryo-EM benchmarks.' },
      { step: '04', title: 'End-to-End Discovery Pipeline', duration: '6 Months', description: 'Build and deploy an automated small molecule candidate screening pipeline.' }
    ],
    aiRisk: 1.4,
    aiDefensibilityLabel: 'EXTREMELY HIGH SHIELD',
    aiShieldReason: 'Requires wet-lab chemical synthesis verification and FDA clinical trial compliance that software models cannot self-authorize.',
    tasksAutomated: ['Virtual library database filtering', 'Basic molecular format conversion'],
    tasksHuman: ['Wet-lab clinical trial design', 'Novel mechanism-of-action formulation and biological target validation'],
    synergyInsight: 'Pharmaceutical companies spend $2B+ per drug; automating candidate screening with AI brings immense capital value.'
  },
  {
    id: 'robotics-embodied-combo',
    title: 'Embodied AI & Humanoid Robotics Kinematics',
    baseRole: 'Mechanical or Embedded Engineer (₹12 LPA / $85,000)',
    comboMultiplier: '2.8x — 4.0x',
    targetSalaryUSD: '$240,000 - $420,000',
    targetSalaryINR: '₹55 LPA — ₹1.60 Cr',
    baseSalaryINR: '₹12 LPA',
    baseSalaryUSD: '$85,000',
    difficulty: 9.4,
    timeToMaster: '2 Years Dedicated',
    stackedSkills: [
      { name: 'Inverse Kinematics & Torque Control', domain: 'Bipedal balance, motor current loops, actuator physics', masteryTime: '1.5 Years' },
      { name: 'Vision-Language-Action (VLA) Models', domain: 'RT-2, OpenVLA, tactile sensor integration', masteryTime: '1 Year' },
      { name: 'ROS2 & Real-Time Linux (PREEMPT_RT)', domain: 'Microsecond deterministic actuator loops', masteryTime: '8 Months' },
      { name: 'Physics Simulation (Isaac Sim, MuJoCo)', domain: 'Sim-to-real transfer and domain randomization', masteryTime: '6 Months' }
    ],
    targetRecruiters: ['Tesla Optimus', 'Figure AI', 'Boston Dynamics', '1X Technologies', 'Agility Robotics'],
    roadmap: [
      { step: '01', title: 'Rigid Body Dynamics & Actuator Control', duration: '6 Months', description: 'Implement PID/impedance control and Lagrangian dynamics for multi-joint arms.' },
      { step: '02', title: 'MuJoCo & Isaac Sim Reinforcement Learning', duration: '6 Months', description: 'Train locomotion and manipulation policies in GPU physics simulators.' },
      { step: '03', title: 'Sim-to-Real Hardware Calibration', duration: '6 Months', description: 'Deploy learned policies to physical bipedal actuators with domain randomization.' },
      { step: '04', title: 'Multi-Modal VLA Integration', duration: '6 Months', description: 'Connect natural language voice instructions with real-time tactile visual feedback loops.' }
    ],
    aiRisk: 1.2,
    aiDefensibilityLabel: 'UNTOUCHABLE DEFENSE',
    aiShieldReason: 'Physical world physics, material friction, sensor noise, and mechanical hardware debugging are completely immune to pure digital automation.',
    tasksAutomated: ['Basic CAD file mesh conversion', 'Standard motor specification lookup'],
    tasksHuman: ['Physical hardware debugging', 'Sim-to-real gap resolution', 'Safety-critical torque loop calibration'],
    synergyInsight: 'Software AI has saturated screens; the next trillion-dollar frontier is bringing intelligence into physical atoms and humanoid bodies.'
  },
  {
    id: 'cloud-sec-combo',
    title: 'Cloud Security & DevSecOps Architect',
    baseRole: 'SysAdmin or Junior IT Analyst (₹8 LPA / $65,000)',
    comboMultiplier: '2.3x — 3.2x',
    targetSalaryUSD: '$190,000 - $320,000',
    targetSalaryINR: '₹42 LPA — ₹98 LPA',
    baseSalaryINR: '₹8 LPA',
    baseSalaryUSD: '$65,000',
    difficulty: 7.9,
    timeToMaster: '1 - 2 Years',
    stackedSkills: [
      { name: 'Multi-Cloud Architecture (AWS/Azure/GCP)', domain: 'IAM governance, VPC peering, KMS encryption', masteryTime: '1 Year' },
      { name: 'Kubernetes & Container Security (eBPF, Falco)', domain: 'Runtime threat detection, Cilium networking', masteryTime: '8 Months' },
      { name: 'Infrastructure as Code (Terraform, Pulumi)', domain: 'Automated policy-as-code and compliance guardrails', masteryTime: '6 Months' },
      { name: 'Zero Trust & Threat Modeling', domain: 'OAuth2/OIDC, SAML, SPIFFE/SPIRE micro-segmentation', masteryTime: '6 Months' }
    ],
    targetRecruiters: ['CrowdStrike', 'Palo Alto Networks', 'Datadog', 'Wiz', 'Major Banks & Cloud Providers'],
    roadmap: [
      { step: '01', title: 'Cloud Architecture & IAM Mastery', duration: '4 Months', description: 'Earn CKA (Certified Kubernetes Administrator) and AWS Solutions Architect Pro.' },
      { step: '02', title: 'Automated CI/CD Guardrails', duration: '4 Months', description: 'Implement automated vulnerability scanning in GitHub Actions / GitLab CI.' },
      { step: '03', title: 'Kernel Security & eBPF Telemetry', duration: '4 Months', description: 'Build eBPF security telemetry monitors and simulate attack vectors in sandbox labs.' },
      { step: '04', title: 'Zero Trust & Compliance Architecture', duration: '4 Months', description: 'Audit enterprise infrastructure against CIS Benchmarks and SOC 2 / ISO 27001.' }
    ],
    aiRisk: 2.1,
    aiDefensibilityLabel: 'HIGHLY SHIELDED',
    aiShieldReason: 'Security breaches carry immense legal and financial liability; corporations will always require verified human certification for risk clearance.',
    tasksAutomated: ['Routine log syntax parsing', 'Basic firewall rule templating'],
    tasksHuman: ['Incident response under active zero-day exploitation', 'Executive regulatory compliance governance'],
    synergyInsight: 'Security breaches cost millions; enterprise executives will never delegate total infrastructure security compliance to unverified code generators.'
  }
];

export function getSalaryComboById(id) {
  return salaryCombos.find(c => c.id === id);
}
