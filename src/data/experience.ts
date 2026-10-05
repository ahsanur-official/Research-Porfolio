export interface LeadershipRole {
  period: string;
  year: number;
  role: string;
  organization: string;
  description: string;
  responsibilities: string[];
}

export interface AchievementItem {
  year: number;
  title: string;
  organization: string;
  category: "Hackathon & Problem Solving" | "Academic & Competitive" | "Creative & Debate";
  description: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  status: "Completed" | "Ongoing";
  credentialNote?: string;
  verifyUrl?: string;
  skillsLearned: string[];
}

export interface VolunteeringItem {
  year: number;
  roleOrActivity: string;
  organization: string;
  description: string;
}

export const LEADERSHIP_ROLES: LeadershipRole[] = [
  {
    period: "2026",
    year: 2026,
    role: "General Secretary",
    organization: "PUB Computer & Programming Club (PUB CPC)",
    description: "Leading the executive body to drive university-wide programming contests, workshops, and technical mentorship.",
    responsibilities: [
      "Directing club administrative affairs, event roadmaps, and cross-departmental coordination",
      "Organizing large-scale competitive programming contests and coding bootcamps",
      "Mentoring junior students in algorithmic problem solving and data structures"
    ]
  },
  {
    period: "Sept 2025 – Sept 2026",
    year: 2025,
    role: "Convener",
    organization: "BASIS Students' Forum — PUB Chapter",
    description: "Heading the university chapter of the Bangladesh Association of Software and Information Services (BASIS) Students' Forum.",
    responsibilities: [
      "Connecting university talent with national IT industry leaders and BASIS initiatives",
      "Organizing technology seminars, innovation showcases, and career development programs",
      "Fostering entrepreneurship and tech skill incubation on campus"
    ]
  },
  {
    period: "2025",
    year: 2025,
    role: "Vice President (Competitive Programming Community)",
    organization: "PUB Computer & Programming Club",
    description: "Spearheaded competitive programming training camps, weekly practice contests, and team selection.",
    responsibilities: [
      "Formulated problem sets and curated training curriculums for algorithm tracks",
      "Coordinated campus participation in inter-university programming contests",
      "Guided contest prep sessions for freshmen and sophomore cohorts"
    ]
  },
  {
    period: "Sept 2024 – Sept 2025",
    year: 2024,
    role: "Executive Member",
    organization: "BASIS Students' Forum — PUB Chapter",
    description: "Active contributor to IT forum events, student mobilization, and workshop logistics across the northern division.",
    responsibilities: [
      "Assisted in divisional tech events and student outreach drives",
      "Supported technical team logistics during national seminars"
    ]
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    year: 2025,
    title: "Galactic Problem Solver",
    organization: "NASA Space Apps Challenge",
    category: "Hackathon & Problem Solving",
    description: "Awarded for designing MARSWAY — an interactive, science-aware Marswalk mission planner harnessing NASA open datasets."
  },
  {
    year: 2025,
    title: "Hackathon Winner (Special Category)",
    organization: "CSE FEST | Department of CSE, Pundra University",
    category: "Hackathon & Problem Solving",
    description: "First place honors in special innovation category during the annual CSE departmental tech fest."
  },
  {
    year: 2025,
    title: "Runner-Up — Debate Competition",
    organization: "CSE FEST | Department of CSE, Pundra University",
    category: "Creative & Debate",
    description: "Second place in the annual parliamentary debate tournament evaluating contemporary ethics and technology."
  },
  {
    year: 2024,
    title: "Winner — CSE Department Logo Contest",
    organization: "Department of CSE | Pundra University of Science & Technology",
    category: "Creative & Debate",
    description: "First prize for crafting the official visual identity and emblem adopted by the department."
  },
  {
    year: 2023,
    title: "1st Runner-Up — PUPC Beginner's Programming Contest",
    organization: "Department of CSE | Pundra University of Science & Technology",
    category: "Academic & Competitive",
    description: "Second place standing among novice competitive programmers solving algorithmic challenges in C/C++."
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "AI/ML Expert With Phitron (Batch 01)",
    issuer: "Phitron",
    date: "Ongoing",
    status: "Ongoing",
    credentialNote: "Intensive specialization covering end-to-end Machine Learning, Deep Learning, and Mathematics for AI",
    verifyUrl: "https://phitron.io/",
    skillsLearned: ["Supervised & Unsupervised ML", "Deep Learning Foundations", "Model Evaluation", "PyTorch"]
  },
  {
    title: "Virtual Internship in Python Programming",
    issuer: "DecodeLabs",
    date: "07/2026",
    status: "Completed",
    credentialNote: "Hands-on engineering internship applying Python to algorithmic tasks and automation modules",
    verifyUrl: "https://decodelabs.com",
    skillsLearned: ["Python OOP", "Automation Scripts", "Data Processing", "Algorithm Design"]
  },
  {
    title: "AI-Powered Analytics",
    issuer: "Grameenphone Academy",
    date: "09/2026",
    status: "Completed",
    credentialNote: "Application of machine learning algorithms for predictive and diagnostic telemetry analytics",
    verifyUrl: "https://grameenphone.academy",
    skillsLearned: ["Predictive Analytics", "Data Modeling", "Feature Engineering"]
  },
  {
    title: "Data Foundations with AI",
    issuer: "Grameenphone Academy",
    date: "09/2026",
    status: "Completed",
    credentialNote: "Core foundations in big data pipelines, AI workflow orchestration, and statistical reasoning",
    verifyUrl: "https://grameenphone.academy",
    skillsLearned: ["Data Pipelines", "Statistical Inference", "Machine Learning Paradigms"]
  },
  {
    title: "Data Analysis with Excel",
    issuer: "Futurenation",
    date: "03/2025",
    status: "Completed",
    credentialNote: "Advanced spreadsheet modeling, pivot tables, statistical functions, and dashboard generation",
    verifyUrl: "https://futurenation.gov.bd",
    skillsLearned: ["Pivot Tables", "Statistical Modeling", "Financial & Data Analytics"]
  },
  {
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "03/2025",
    status: "Completed",
    credentialNote: "Verified certification covering fundamental data structures, sorting, and algorithmic complexity",
    verifyUrl: "https://www.hackerrank.com/certificates/verify",
    skillsLearned: ["Data Structures", "Time Complexity Analysis", "Algorithms"]
  },
  {
    title: "Data Science Fundamentals",
    issuer: "OSTAD",
    date: "06/2026",
    status: "Completed",
    credentialNote: "Comprehensive training in exploratory data analysis, NumPy, Pandas, and visual storytelling",
    verifyUrl: "https://ostad.app",
    skillsLearned: ["Exploratory Data Analysis", "NumPy & Pandas", "Data Visualization"]
  }
];

export const VOLUNTEERING_ACTIVITIES: VolunteeringItem[] = [
  {
    year: 2026,
    roleOrActivity: "NASA Space Apps Challenge, Bangladesh",
    organization: "Global Organizing Committee / Local Bangladesh Chapter",
    description: "Contributed as local participant and event volunteer supporting innovation teams in regional challenges."
  },
  {
    year: 2026,
    roleOrActivity: "Bakeman's 4th International Language League (Divisional Round)",
    organization: "BASIS Students' Forum PUB Chapter, Bogura",
    description: "Coordinated logistics, participant registration, and stage management for the divisional academic competition."
  },
  {
    year: 2025,
    roleOrActivity: "National Newspaper Olympiad (Divisional Selection Round)",
    organization: "BASIS Students' Forum PUB Chapter, Bogura",
    description: "Facilitated venue management, student coordination, and event administration for school/college competitors."
  },
  {
    year: 2025,
    roleOrActivity: "CSE FEST — Technical Team",
    organization: "Department of CSE | Pundra University of Science & Technology",
    description: "Managed contest platform configuration, network connectivity, and live scoreboard monitoring for the annual CSE Fest."
  },
  {
    year: 2025,
    roleOrActivity: "Managed and Coordinated the Beginner's Programming Contest",
    organization: "PUB CPC | Pundra University of Science & Technology",
    description: "Authored problem guidelines, coordinated contest lab invigilation, and supported freshmen through their first competitive coding experience."
  }
];
