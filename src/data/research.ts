export interface ResearchInterest {
  id: string;
  title: string;
  oneLiner: string;
  category: "BCI & Neural Signals" | "Generative & Deep Learning" | "Clinical Neuroengineering";
  description: string;
  keyTech: string[];
}

export interface PipelineStep {
  stepNumber: number;
  label: string;
  category: "Biological Input" | "Acquisition" | "Signal Processing" | "AI Inference" | "Digital Bypass" | "Effector Target";
  description: string;
  technology: string;
}

export const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    id: "bci",
    title: "Brain-Computer Interfaces",
    oneLiner: "Direct communication pathways translating cerebral neural impulses into operational machine directives.",
    category: "BCI & Neural Signals",
    description: "Developing robust non-invasive neural decoders capable of real-time translation of cerebral intention for assistive robotics and communication aids.",
    keyTech: ["OpenBCI", "MNE-Python", "10-20 Electrode System", "Event-Related Desynchronization (ERD)"]
  },
  {
    id: "eeg-analysis",
    title: "EEG Signal Analysis",
    oneLiner: "Mathematical decomposition, artifact suppression, and oscillatory rhythm analysis from microvolt signals.",
    category: "BCI & Neural Signals",
    description: "Filtering ocular and muscular artifacts using bandpass filtration, ICA, and wavelet decomposition across sensorimotor frequency bands.",
    keyTech: ["Butterworth Filters", "ICA", "Wavelet Transform", "Power Spectral Density (PSD)"]
  },
  {
    id: "motor-imagery",
    title: "Motor Imagery Decoding",
    oneLiner: "Classifying mental rehearsal of physical limb movements without overt muscular activation.",
    category: "BCI & Neural Signals",
    description: "Decoding mu (8-12 Hz) and beta (13-30 Hz) rhythm fluctuations across C3, Cz, and C4 motor cortex channels for intentional control.",
    keyTech: ["Common Spatial Pattern (CSP)", "Spatial Covariance", "Channel Selection (C3/Cz/C4)"]
  },
  {
    id: "deep-learning",
    title: "Deep Learning (CNN & LSTM)",
    oneLiner: "Extracting hierarchical spatio-temporal features directly from raw multichannel neural timeseries.",
    category: "Generative & Deep Learning",
    description: "Architecting hybrid convolutional and recurrent networks to capture both spatial electrode topology and temporal phase transitions.",
    keyTech: ["Temporal Convolution", "Spatial Convolution", "Bidirectional LSTM", "PyTorch / TensorFlow"]
  },
  {
    id: "generative-neural-ai",
    title: "Generative AI for Neural Signals",
    oneLiner: "Synthesizing and aligning high-fidelity synthetic EEG distributions via CycleGAN and Diffusion.",
    category: "Generative & Deep Learning",
    description: "Overcoming severe patient data scarcity and domain mismatch through conditional generative adversarial and score-based diffusion models.",
    keyTech: ["CycleGAN", "DDPM Diffusion", "Adversarial Training", "Wasserstein Loss"]
  },
  {
    id: "eeg-reconstruction",
    title: "Neural Signal Reconstruction",
    oneLiner: "Mapping impaired or noise-corrupted neurological epochs onto healthy-like reference patterns.",
    category: "Generative & Deep Learning",
    description: "Restoring corrupted or post-stroke attenuated neural waveforms to reference distributions to dramatically boost downstream classifier fidelity.",
    keyTech: ["Reference Conditioning", "Latent Manifold Alignment", "Cosine Feature Similarity"]
  },
  {
    id: "ai-rehabilitation",
    title: "AI-Assisted Rehabilitation",
    oneLiner: "Intelligent neurofeedback algorithms engineered to promote functional neuroplasticity post-stroke.",
    category: "Clinical Neuroengineering",
    description: "Closing the sensory-motor loop by pairing instantaneous intention classification with visual feedback or functional stimulation protocols.",
    keyTech: ["Closed-Loop Neurofeedback", "Adaptive Thresholding", "Patient Progress Analytics"]
  },
  {
    id: "digital-neural-bypass",
    title: "Digital Neural Bypass Systems",
    oneLiner: "Bridging interrupted spinal/peripheral pathways by generating synthetic artificial neural spikes.",
    category: "Clinical Neuroengineering",
    description: "Exploring algorithmic hardware and software architectures that convert decoded cortical commands into synthetic stimulator control signals.",
    keyTech: ["Verilog / Algorithmic Simulation", "Synthetic Spike Generation", "Spike Timing Protocols"]
  },
  {
    id: "parkinsons-detection",
    title: "Parkinson's Disease Detection",
    oneLiner: "Automated early biomarker discovery in resting-state and task-evoked electrophysiological patterns.",
    category: "Clinical Neuroengineering",
    description: "Investigating spectral power degradation and baseline drift in neurodegenerative cohorts using self-supervised representations.",
    keyTech: ["Self-Supervised Learning", "Spectral Entropy", "ROC-AUC Diagnostics"]
  },
  {
    id: "intelligent-healthcare",
    title: "Intelligent Healthcare Systems",
    oneLiner: "Bridging computational intelligence with accessible, deployable assistive medical technologies.",
    category: "Clinical Neuroengineering",
    description: "Designing end-to-end software architectures that combine real-time sensor ingestion, low-latency inferencing, and clinical visibility.",
    keyTech: ["Distributed Systems", "Full-Stack Medical UI", "Real-Time Telemetry"]
  }
];

export const THESIS_PROJECT = {
  title: "AI-Based Artificial Neural Signal Generator for a Digital Neural Bypass System in Post-Stroke Motor Rehabilitation",
  academicContext: "Undergraduate Research Thesis / Capstone System",
  supervision: "Department of Computer Science & Engineering, Pundra University of Science & Technology",
  overview:
    "Following ischemic or hemorrhagic stroke, motor pathways between the cerebral cortex and peripheral effector muscles can become severely damaged. While the motor cortex continues to produce voluntary intentions, signals cannot reach muscles. This research investigates an algorithmic digital neural bypass: decoding motor intentions from non-invasive EEG using deep neural networks, and synthesising calibrated artificial neural spike trains through algorithmic and digital logic simulation.",
  clinicalImpactDisclaimer:
    "Research Prototype & Computational Simulation — Developed as an academic framework combining computational neuroscience, deep learning, and digital logic simulation. Not an approved clinical medical device.",
  keyTechnologies: [
    "EEG (64-Channel / 10-20 Standard)",
    "Python 3.11",
    "PyTorch & TensorFlow",
    "CNN & Bidirectional LSTM",
    "Signal Processing (MNE / SciPy)",
    "Digital Logic / Verilog Algorithmic Simulation",
    "Virtual Motor Neuron Model"
  ],
  pipelineSteps: [
    {
      stepNumber: 1,
      label: "Human Motor Intention",
      category: "Biological Input",
      description: "Subject mentally rehearses limb motion (e.g. left vs. right hand grasp), triggering desynchronization in the motor cortex.",
      technology: "Sensorimotor Cortex Activity"
    },
    {
      stepNumber: 2,
      label: "EEG Acquisition",
      category: "Acquisition",
      description: "Multi-channel scalp potential capture centered on motor regions (C3, Cz, C4 electrode positions) at 250–1000 Hz.",
      technology: "10-20 Scalp Montage / Differential Amp"
    },
    {
      stepNumber: 3,
      label: "Signal Preprocessing",
      category: "Signal Processing",
      description: "0.5–45 Hz Butterworth bandpass filtering, 50 Hz notch filter for powerline hum, and ocular artifact attenuation via ICA.",
      technology: "Bandpass Filtering & FastICA"
    },
    {
      stepNumber: 4,
      label: "Feature Extraction",
      category: "Signal Processing",
      description: "Spatial pattern decomposition via Common Spatial Pattern (CSP) and continuous wavelet transform into time-frequency matrices.",
      technology: "CSP & Morlet Wavelet Decomposition"
    },
    {
      stepNumber: 5,
      label: "Deep Learning (CNN + LSTM)",
      category: "AI Inference",
      description: "Spatial convolutional layers extract inter-electrode spatial geometry while BiLSTM captures recurrent temporal transitions.",
      technology: "Spatio-Temporal Hybrid Network"
    },
    {
      stepNumber: 6,
      label: "Motor Intention Decoding",
      category: "AI Inference",
      description: "Real-time probabilistic classification discerning intention states (Left Hand, Right Hand, Foot, Rest) with high confidence.",
      technology: "Softmax Probability Vector"
    },
    {
      stepNumber: 7,
      label: "Artificial Neural Signal Generation",
      category: "Digital Bypass",
      description: "Synthesizing biometric action potential spike bursts calibrated to match motor unit firing rate characteristics.",
      technology: "Leaky Integrate-and-Fire / Spike Synthesis"
    },
    {
      stepNumber: 8,
      label: "Digital Signal / Verilog Simulation",
      category: "Digital Bypass",
      description: "Simulating pulse timing, frequency modulation, and hardware synthesis feasibility in HDL simulation models.",
      technology: "Verilog / Behavioral Simulation"
    },
    {
      stepNumber: 9,
      label: "Virtual Motor Neuron Interface",
      category: "Digital Bypass",
      description: "Computational membrane model simulating post-synaptic neuromuscular potential generation from synthesized spikes.",
      technology: "Hodgkin-Huxley / Biophysical Model"
    },
    {
      stepNumber: 10,
      label: "Motor Rehabilitation Target",
      category: "Effector Target",
      description: "Targeted simulated muscle contraction or robotic exoskeleton trigger to close the neurorehabilitative biofeedback loop.",
      technology: "Closed-Loop Biomechanical Output"
    }
  ] as PipelineStep[]
};

export const EEG_BANDS = [
  { name: "Delta (δ)", range: "0.5 – 4 Hz", significance: "Deep non-REM sleep, pathological slow waves" },
  { name: "Theta (θ)", range: "4 – 8 Hz", significance: "Drowsiness, cognitive processing, memory encoding" },
  { name: "Alpha / Mu (μ)", range: "8 – 12 Hz", significance: "Sensorimotor rhythm over C3/C4; desynchronizes during motor imagery" },
  { name: "Beta (β)", range: "13 – 30 Hz", significance: "Active motor planning, tactile execution, post-movement synchronization" },
  { name: "Gamma (γ)", range: "30 – 50+ Hz", significance: "Multi-modal cross-cortical binding, high cognitive focus" }
];
