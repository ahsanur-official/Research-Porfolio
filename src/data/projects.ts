export type ProjectCategory =
  | "All"
  | "AI & Scientific"
  | "Web & Full Stack"
  | "Mobile"
  | "Systems & Compilers"
  | "Developer Utilities";

export interface ProjectItem {
  id: string;
  title: string;
  category: "AI & Scientific" | "Web & Full Stack" | "Mobile" | "Systems & Compilers" | "Developer Utilities";
  filterCategory: "ai-scientific" | "web" | "mobile" | "systems" | "utilities";
  tagline: string;
  cvDescription: string;
  fullProblem: string;
  fullSolution: string;
  verifiedFeatures: string[];
  technologies: string[];
  myContribution: string;
  year: number;
  featured: boolean;
  githubUrl: string;
  liveDemoUrl?: string;
  image?: string;
  hasInteractiveDemo?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "marsway-martian-map",
    title: "MARSWAY — Martian Map",
    category: "AI & Scientific",
    filterCategory: "ai-scientific",
    tagline: "Science-Aware Marswalk Mission Planner with NASA Data",
    cvDescription: "Developed a NASA-data-based interactive Mars mission planner with optimized route selection.",
    fullProblem:
      "Planning human EVA (extravehicular activity) routes across Martian terrain demands calculating terrain slopes, hazard proximity, resource availability, and solar exposure while avoiding fatal rover/astronaut traps.",
    fullSolution:
      "Engineered an interactive spatial exploration planner utilizing NASA topographical datasets. Integrates waypoint routing algorithms that balance elevation contours, hazard tolerance, and travel distance.",
    verifiedFeatures: [
      "Topographical elevation and crater traversal calculation",
      "Waypoint selection with shortest-path and hazard-mitigated path routing",
      "Solar and distance telemetry estimates for EVA planners",
      "Responsive canvas interface with planetary coordinate mapping"
    ],
    technologies: ["NASA Open Datasets", "JavaScript", "HTML5 Canvas", "Spatial Algorithms", "CSS3"],
    myContribution:
      "Architected core routing graph algorithms, integrated NASA orbital telemetry coordinates, designed the dark interplanetary mission control interface.",
    year: 2026,
    featured: true,
    githubUrl: "https://github.com/ahsanur-official/Interplanetary-Survival-Guide-Martian-Map",
    image: "/src/assets/images/marsway_mission_map_1791200571783.jpg"
  },
  {
    id: "crypto-chat",
    title: "Crypto Chat",
    category: "Systems & Compilers",
    filterCategory: "systems",
    tagline: "Secure Real-Time Messaging with Modern Cryptography",
    cvDescription: "Developed a secure real-time chat system using modern encryption and authentication techniques.",
    fullProblem:
      "Conventional messaging protocols often expose metadata and plaintext payloads across intermediate servers without end-to-end mathematical verification.",
    fullSolution:
      "Constructed a secure client-server real-time chat application embedding cryptographic primitives for key exchange, authenticated sessions, and payload encryption.",
    verifiedFeatures: [
      "End-to-end payload encryption & cipher validation",
      "Session-based cryptographic authentication",
      "Real-time bidirectional message dispatch",
      "Tamper-resistant message verification checks"
    ],
    technologies: ["Node.js", "WebSocket / Real-Time", "Cryptography", "JavaScript", "Express"],
    myContribution:
      "Implemented encryption and decryption routines, session token lifecycle, and secure socket event handlers.",
    year: 2026,
    featured: true,
    githubUrl: "https://github.com/ahsanur-official/CryptoGraphy-Latest-Project"
  },
  {
    id: "khalierror-lang",
    title: "KhaliError-Lang",
    category: "Systems & Compilers",
    filterCategory: "systems",
    tagline: "Custom Programming Language & Compiler Pipeline",
    cvDescription: "Designed a custom programming language to explore lexical analysis, parsing, and code generation for the Compiler Design Sessional Course.",
    fullProblem:
      "Understanding compiler stages requires hands-on syntax tokenization, context-free grammar parsing, symbol table resolution, and AST evaluation.",
    fullSolution:
      "Designed and implemented a domain-specific toy programming language with structured lexer, parser, custom syntax rules, syntax error reporting, and intermediate execution.",
    verifiedFeatures: [
      "Lexical analyzer identifying tokens, keywords, and numeric literals",
      "Recursive descent parser generating Abstract Syntax Trees (AST)",
      "Symbol table management with variable scoping and type validation",
      "Detailed compiler error reporting with line/column diagnostic output"
    ],
    technologies: ["Compiler Design", "C / C++", "Lexical Analysis", "Context-Free Grammars", "AST"],
    myContribution:
      "Constructed grammar specifications, token stream parser, symbol table datastructure, and runtime evaluator for the course project.",
    year: 2025,
    featured: true,
    githubUrl: "https://github.com/ahsanur-official/KhaliError-Lang"
  },
  {
    id: "writer-ahona-web",
    title: "Writer Ahona Web",
    category: "Web & Full Stack",
    filterCategory: "web",
    tagline: "Bengali Literary Writer Portfolio & Content Management System",
    cvDescription: "Developed a Bengali writer platform using Next.js, React, and TypeScript.",
    fullProblem:
      "Bengali authors require bespoke typographic rendering, publication archives, reader engagement tools, and clean content management that respects Bengali script typography.",
    fullSolution:
      "Built a modern, responsive publication portfolio and CMS with Next.js, featuring optimized Bengali font rendering, category-based essay/book discovery, and dynamic content routing.",
    verifiedFeatures: [
      "Optimized Bengali typography rendering with SolaimanLipi/Hind Siliguri support",
      "Dynamic book catalog and essay publishing engine",
      "Responsive reading interface with dark/light legibility controls",
      "Server-side rendering for optimal literary SEO"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "CMS Architecture"],
    myContribution:
      "Full frontend & backend architecture, typographic scale tuning, reading experience optimization, and responsive design.",
    year: 2026,
    featured: true,
    githubUrl: "https://github.com/ahsanur-official/Writer-Ahona-Web"
  },
  {
    id: "daily-task-tracker",
    title: "Daily Task Tracker",
    category: "Web & Full Stack",
    filterCategory: "web",
    tagline: "Task & Productivity Management with Firebase Cloud Persistence",
    cvDescription: "Developed a responsive task-management application with Firebase data storage.",
    fullProblem:
      "Modern students and researchers need frictionless daily task prioritization without cumbersome overhead or loss of real-time sync across devices.",
    fullSolution:
      "Engineered an intuitive single-page productivity dashboard with real-time Firebase Firestore synchronization, task status filtering, and progress tracking.",
    verifiedFeatures: [
      "Real-time task synchronization across clients via Firebase",
      "Status categorization (Pending, In Progress, Completed)",
      "Priority tagging and deadline tracking",
      "Optimistic UI updates for zero perceptible latency"
    ],
    technologies: ["React.js", "Firebase Firestore", "JavaScript", "CSS3 / Tailwind", "Local Storage"],
    myContribution:
      "Built client state management, Firebase CRUD data handlers, and clean responsive layout.",
    year: 2026,
    featured: true,
    githubUrl: "https://github.com/ahsanur-official/Daily-Task-Tracker"
  },
  {
    id: "aa-game-station",
    title: "AA Game Station",
    category: "Web & Full Stack",
    filterCategory: "web",
    tagline: "Browser-Based Gaming Platform Featuring 10 Interactive JavaScript Games",
    cvDescription: "Developed a browser-based gaming platform featuring 10 interactive JavaScript games.",
    fullProblem:
      "Building responsive, zero-dependency browser games requires mastering HTML5 Canvas, high-frequency requestAnimationFrame loops, collision physics, and event state management.",
    fullSolution:
      "Designed a unified browser hub hosting 10 custom interactive games, showcasing native JavaScript game loops, keyboard/touch input listeners, and local high-score systems.",
    verifiedFeatures: [
      "10 independent mini-games with unique mechanics (Arcade, Puzzle, Reflex)",
      "Custom 60 FPS HTML5 canvas rendering loops",
      "Collision detection algorithms and boundary physics",
      "Sound toggle and persistent local high-score storage"
    ],
    technologies: ["JavaScript (ES6+)", "HTML5 Canvas", "Game Loops", "Web Audio API", "CSS Grid"],
    myContribution:
      "Designed game architecture, collision mathematics, responsive canvas sizing, and hub UI.",
    year: 2026,
    featured: true,
    githubUrl: "https://github.com/ahsanur-official/AA-Game-Station"
  },
  {
    id: "ascii-lab",
    title: "ASCII Lab",
    category: "Developer Utilities",
    filterCategory: "utilities",
    tagline: "Multi-Format Binary, Hex, ASCII & Octal Encoding Utility",
    cvDescription: "A multi-format text, ASCII, binary, hexadecimal, and octal conversion tool.",
    fullProblem:
      "Developers, computer engineering students, and network analysts constantly need instant, bidirectional conversions across machine data encodings without online ad clutter.",
    fullSolution:
      "Built a high-performance encoding workbench with instant bi-directional conversion among Text, ASCII decimal, Binary bit streams, Hexadecimal bytes, and Octal notation.",
    verifiedFeatures: [
      "Bi-directional live reactive conversion across 5 numeral systems",
      "Byte-level spacing, endianness toggling, and input validation",
      "One-click copy, character code inspector, and raw bit representation",
      "Clean developer-centric dark theme"
    ],
    technologies: ["JavaScript", "Bitwise Operations", "Encoding Standards", "Tailwind CSS", "HTML5"],
    myContribution:
      "Sole developer. Built conversion engines, input sanitization routines, and rapid keyboard-friendly interface.",
    year: 2026,
    featured: true,
    githubUrl: "https://github.com/ahsanur-official/ASCII-Converter"
  },
  {
    id: "my-weather-app-2",
    title: "My Weather App 2.0",
    category: "Mobile",
    filterCategory: "mobile",
    tagline: "Cross-Platform Weather Application with Real-Time Meteorological API",
    cvDescription: "Developed a Flutter weather application using real-time API data and location-based forecasts for the Mobile Application Development Sessional Course.",
    fullProblem:
      "Mobile weather monitoring requires managing asynchronous network fetching, device geolocation permissions, offline caching, and responsive cross-platform layout rendering.",
    fullSolution:
      "Developed a fluid Flutter mobile client that consumes real-time weather APIs to deliver hourly forecasts, humidity, wind velocity, and UV metrics with dynamic climate animations.",
    verifiedFeatures: [
      "Real-time GPS device location lookup and city search",
      "Dynamic weather graphics reacting to local atmospheric conditions",
      "Multi-day forecast breakdown with high/low temperature curves",
      "Robust offline fallback caching for recent searches"
    ],
    technologies: ["Flutter", "Dart", "REST API", "Geolocation", "State Management"],
    myContribution:
      "Built mobile state architecture, OpenWeatherMap API integration, and custom weather card UI widgets.",
    year: 2025,
    featured: true,
    githubUrl: "https://github.com/ahsanur-official/My-Weather-App-2.0"
  },
  // Additional verified projects from profile
  {
    id: "personal-finance-tracker",
    title: "Personal Finance Tracker",
    category: "Web & Full Stack",
    filterCategory: "web",
    tagline: "Budget Analytics & Expense Categorization Dashboard",
    cvDescription: "Analytical finance tracking system calculating cash flow and visual expenditure breakdown.",
    fullProblem: "Managing student and household finances requires straightforward expense tagging and visual budget analysis.",
    fullSolution: "Created a lightweight financial tracker with category breakdowns, monthly spending analytics, and balance summaries.",
    verifiedFeatures: ["Income/expense transaction ledger", "Category breakdown charts", "Exportable records"],
    technologies: ["React.js", "Chart.js", "Local Storage", "CSS3"],
    myContribution: "Created ledger logic, financial balance calculators, and summary visualizers.",
    year: 2025,
    featured: false,
    githubUrl: "https://github.com/ahsanur-official"
  },
  {
    id: "color-palette-generator",
    title: "Color Palette Generator",
    category: "Developer Utilities",
    filterCategory: "utilities",
    tagline: "CSS Harmony & Color Scheme Discovery Engine",
    cvDescription: "Interactive web utility generating complementary, monochromatic, and triadic palettes.",
    fullProblem: "Designers and frontend engineers need instant color harmony generation with exportable CSS and HEX values.",
    fullSolution: "Engineered a rapid palette engine computing mathematical color distances and generating accessible color sets.",
    verifiedFeatures: ["Spacebar palette generator", "HEX/RGB/HSL conversion", "Lock color feature", "CSS export"],
    technologies: ["JavaScript", "Color Theory Math", "HTML5", "CSS3"],
    myContribution: "Full developer of color generation logic and UI.",
    year: 2025,
    featured: false,
    githubUrl: "https://github.com/ahsanur-official"
  },
  {
    id: "smart-atm-cash-access",
    title: "Smart ATM Cash Access System",
    category: "Systems & Compilers",
    filterCategory: "systems",
    tagline: "Cardless Authentication & Financial Transaction Logic",
    cvDescription: "Simulated secure ATM transaction flow incorporating PIN verification and session state.",
    fullProblem: "Demonstrating secure hardware transaction verification and state machine management for financial terminals.",
    fullSolution: "Built a transaction simulation model handling account state, withdrawal limits, and cardless OTP validation.",
    verifiedFeatures: ["State machine for ATM screens", "PIN hashing simulation", "Receipt generator"],
    technologies: ["C++ / OOP", "Data Structures", "Transaction State Machine"],
    myContribution: "Designed transaction state logic, error recovery routines, and account validation rules.",
    year: 2024,
    featured: false,
    githubUrl: "https://github.com/ahsanur-official"
  },
  {
    id: "classroom-dashboard",
    title: "Classroom Dashboard",
    category: "Web & Full Stack",
    filterCategory: "web",
    tagline: "Academic Portal for Course Schedules and Material Distribution",
    cvDescription: "University student dashboard for class routines, assignment deadlines, and notices.",
    fullProblem: "Disorganized university WhatsApp groups cause missed assignment deadlines and lost course notes.",
    fullSolution: "Designed a centralized academic timetable and noticeboard portal tailored for the CSE department batch.",
    verifiedFeatures: ["Daily schedule timetable", "Assignment countdown timer", "Syllabus file repository"],
    technologies: ["React.js", "Firebase", "Tailwind CSS"],
    myContribution: "Designed schedule visualizer and notice distribution system for student cohort.",
    year: 2025,
    featured: false,
    githubUrl: "https://github.com/ahsanur-official"
  },
  {
    id: "pub-campus-aide",
    title: "PUB Campus Aide",
    category: "Web & Full Stack",
    filterCategory: "web",
    tagline: "Student Utility Platform for Pundra University",
    cvDescription: "Campus utility system coordinating student resources, club events, and department contacts.",
    fullProblem: "Students lack unified access to club announcements, laboratory guidelines, and faculty contact info.",
    fullSolution: "Engineered an all-in-one portal providing verified campus directories, club membership forms, and event announcements.",
    verifiedFeatures: ["Faculty directory lookup", "Club registration workflows", "Campus map guide"],
    technologies: ["HTML5", "CSS3", "JavaScript", "JSON Data"],
    myContribution: "Coordinated content, implemented responsive navigation, and deployed portal.",
    year: 2025,
    featured: false,
    githubUrl: "https://github.com/ahsanur-official"
  },
  {
    id: "prime-number-analyzer",
    title: "Prime Number & Algorithm Utility",
    category: "Developer Utilities",
    filterCategory: "utilities",
    tagline: "Number Theory & Prime Factorization Toolkit",
    cvDescription: "Algorithmic utility demonstrating Sieve of Eratosthenes and high-efficiency primality testing.",
    fullProblem: "Visualizing algorithmic time complexities in competitive programming and number theory.",
    fullSolution: "Constructed an interactive visualization showing step-by-step prime generation and prime factor decomposition.",
    verifiedFeatures: ["Sieve algorithm step visualizer", "Prime factorization calculator", "Range prime counter"],
    technologies: ["C++", "JavaScript", "Computational Mathematics"],
    myContribution: "Algorithm optimization and visual step rendering.",
    year: 2024,
    featured: false,
    githubUrl: "https://github.com/ahsanur-official"
  }
];
