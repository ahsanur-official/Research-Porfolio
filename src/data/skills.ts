export interface SkillGroup {
  category: string;
  badge: string;
  description: string;
  skills: {
    name: string;
    focus: string;
  }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Deep Learning & Neural Modeling",
    badge: "Core Research",
    description: "Architectures for biosignal decoding, temporal modeling, and generative reconstruction",
    skills: [
      { name: "CNN (Convolutional Neural Networks)", focus: "Spatial feature extraction from electrode arrays" },
      { name: "LSTM / BiLSTM", focus: "Recurrent temporal dynamics & sequential phase modeling" },
      { name: "CycleGAN", focus: "Unpaired domain mapping for healthy-like EEG generation" },
      { name: "Diffusion Models (DDPM)", focus: "Probabilistic EEG reconstruction & anomaly detection" },
      { name: "PyTorch", focus: "Model training, custom loss functions & autograd" },
      { name: "TensorFlow / Keras", focus: "Production neural pipelines and layer prototyping" }
    ]
  },
  {
    category: "Data Science & Signal Processing",
    badge: "Biosignals & Analytics",
    description: "Statistical transformation, filtering, and mathematical analysis of multi-dimensional data",
    skills: [
      { name: "NumPy", focus: "High-dimensional array manipulation & vectorized mathematics" },
      { name: "Pandas", focus: "Data cleansing, structured indexing & tabular analysis" },
      { name: "Scikit-learn", focus: "Supervised classification, clustering, dimensionality reduction" },
      { name: "Matplotlib & Seaborn", focus: "Publication-grade scientific figures & power spectral plots" },
      { name: "MNE-Python & SciPy", focus: "Biosignal bandpass filtering, ICA, and CSP decomposition" }
    ]
  },
  {
    category: "Programming Languages",
    badge: "Computational Foundations",
    description: "Core languages applied across algorithmic problem solving, research, and application systems",
    skills: [
      { name: "Python", focus: "Primary research language for AI/ML, scientific computing & scripting" },
      { name: "C / C++", focus: "Competitive programming, memory control, and systems modeling" },
      { name: "Java", focus: "Object-oriented software architecture and design patterns" },
      { name: "JavaScript (ES6+)", focus: "Modern asynchronous web engineering and interactive visualizers" },
      { name: "SQL", focus: "Relational database querying, normalization, and aggregation" }
    ]
  },
  {
    category: "Web & Full Stack Engineering",
    badge: "Application Development",
    description: "Modern frameworks for accessible, interactive, and responsive digital platforms",
    skills: [
      { name: "React.js", focus: "Component architecture, hooks, context & state management" },
      { name: "Node.js & Express", focus: "RESTful API development, WebSockets, server backend logic" },
      { name: "HTML5 & CSS3", focus: "Semantic markup, modern layout models, responsive UI" },
      { name: "Tailwind CSS", focus: "Utility-first design systems and polished design execution" }
    ]
  },
  {
    category: "Databases & Storage",
    badge: "Data Persistence",
    description: "Relational and document storage solutions for scalable software",
    skills: [
      { name: "MongoDB", focus: "Document-oriented schema design and NoSQL queries" },
      { name: "MySQL", focus: "Relational schemas, ACID transactions, and foreign key relations" }
    ]
  },
  {
    category: "Tools & Research Environments",
    badge: "Tooling & Workflow",
    description: "Development environments, version control, scientific simulation, and design tools",
    skills: [
      { name: "Git & GitHub", focus: "Distributed version control, branch management, collaboration" },
      { name: "MATLAB", focus: "Matrix calculations and biosignal visualization" },
      { name: "Figma", focus: "User experience wireframing, UI prototyping, visual specifications" },
      { name: "VS Code / Jupyter", focus: "Interactive data exploration and modular code development" }
    ]
  }
];

export const CURRENTLY_LEARNING = [
  { name: "Advanced Deep Learning", description: "Attention mechanisms, temporal transformers, and self-supervised neural representation learning" },
  { name: "Next.js & Server Components", description: "Modern React full-stack paradigms with edge rendering and optimized hydration" },
  { name: "Advanced Data Analytics", description: "Large-scale exploratory data analysis and time-series feature engineering" }
];

export const SOFT_SKILLS = [
  {
    title: "Research & Analytical Thinking",
    description: "Rigorous literature synthesis, experimental hypothesis testing, and quantitative validation."
  },
  {
    title: "Algorithmic Problem Solving",
    description: "Competitive programming background honing structured algorithmic thinking under time constraints."
  },
  {
    title: "Leadership & Community Building",
    description: "Serving as General Secretary and Convener for university technical clubs and national forums."
  },
  {
    title: "Teamwork & Collaboration",
    description: "Cross-functional coordination among faculty, student peers, and inter-university teams."
  },
  {
    title: "Time Management & Discipline",
    description: "Balancing high academic standing (CGPA 3.83), research submissions, and executive club duties."
  },
  {
    title: "Adaptability & Rapid Learning",
    description: "Quick mastery of emerging AI architectures, unfamiliar hardware paradigms, and new software frameworks."
  }
];
