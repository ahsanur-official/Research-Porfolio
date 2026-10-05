export interface AcademicRecord {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade: string;
  details?: string[];
}

export interface LanguageProficiency {
  language: string;
  level: string;
  details: {
    listening: string;
    reading: string;
    spokenInteraction: string;
    spokenProduction: string;
    writing: string;
  };
}

export interface AcademicReference {
  name: string;
  title: string;
  institution: string;
  location: string;
  email: string;
  phone: string;
}

export const PROFILE_DATA = {
  fullName: "Md. Ahsanur Rahaman",
  shortName: "Ahsanur Rahaman",
  initials: "AR",
  role: "AI/ML Researcher & Computer Science Engineer",
  tagline: "Exploring Brain-Computer Interfaces, EEG Signal Processing, Deep Learning, Intelligent Rehabilitation Systems, and Modern Software Engineering.",
  heroStatement: "I build intelligent systems at the intersection of AI, neural signals, and software engineering.",
  personalStatement:
    "Motivated Computer Science and Engineering student specializing in Artificial Intelligence for Brain-Computer Interfaces and neurorehabilitation. My research focuses on EEG-based motor imagery, deep learning for neural signal analysis, healthy-like EEG reconstruction, and AI-assisted digital neural bypass systems for post-stroke motor rehabilitation. Experienced with CNN, LSTM, generative models, EEG signal processing, and research-oriented projects. Seeking a research-focused Master's programme to advance my work in AI-driven neural engineering and intelligent rehabilitation systems.",
  
  contact: {
    email: "mdahsanurrahaman2456@gmail.com",
    phone: "+880 1776 890648",
    location: "Bogura, Bangladesh",
    address: "Shibpur, Khetlal, Shibpur-5920, Joypurhat, Bangladesh",
    github: "https://github.com/ahsanur-official",
    linkedin: "https://www.linkedin.com/in/md-ahsanur-rahaman/",
    portfolio: "https://ahsanur-portfolio.netlify.app/",
  },

  academicMetrics: {
    cgpa: "3.83 / 4.00",
    cgpaNote: "Up to 7th Semester",
    institution: "Pundra University of Science & Technology",
    hscGpa: "5.00 / 5.00",
    sscGpa: "5.00 / 5.00",
    ieltsOverall: "6.0",
    ieltsBreakdown: {
      listening: "5.5",
      reading: "5.5",
      writing: "6.0",
      speaking: "6.0",
      date: "06/07/2024",
      type: "IELTS Academic"
    }
  },

  education: [
    {
      degree: "B.Sc in Computer Science and Engineering",
      institution: "Pundra University of Science & Technology",
      location: "Bogura, Bangladesh",
      duration: "01/2023 – Ongoing",
      grade: "CGPA 3.83 (Up to 7th Semester) / 4.00",
      details: [
        "Focus on Artificial Intelligence, Neural Signal Processing, and Algorithm Engineering",
        "Conducted research on CycleGAN & Diffusion-based EEG signal reconstruction for Motor Imagery BCI & Parkinson's Disease detection",
        "Elected General Secretary (2026) & Vice President (2025) of PUB Computer & Programming Club"
      ]
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Govt. Shah Sultan College",
      location: "Bogura, Bangladesh",
      duration: "07/2019 – 12/2020",
      grade: "GPA 5.00 / 5.00",
      details: ["Science Group with rigorous mathematics, physics, and chemistry fundamentals"]
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Akhlas Shibpur Shampur B.L. High School",
      location: "Khetlal, Joypurhat, Bangladesh",
      duration: "01/2017 – 12/2018",
      grade: "GPA 5.00 / 5.00",
      details: ["Science Group with top academic distinction"]
    }
  ] as AcademicRecord[],

  languages: [
    {
      language: "Bangla",
      level: "Native / Mother Tongue",
      details: {
        listening: "C2",
        reading: "C2",
        spokenInteraction: "C2",
        spokenProduction: "C2",
        writing: "C2"
      }
    },
    {
      language: "English",
      level: "B2 (IELTS Academic 6.0)",
      details: {
        listening: "B2 (IELTS 5.5)",
        reading: "B2 (IELTS 5.5)",
        spokenInteraction: "B2 (IELTS 6.0)",
        spokenProduction: "B2 (IELTS 6.0)",
        writing: "B2 (IELTS 6.0)"
      }
    },
    {
      language: "Hindi",
      level: "Conversational & Listening Proficient",
      details: {
        listening: "C1",
        reading: "A1",
        spokenInteraction: "B2",
        spokenProduction: "B2",
        writing: "A1"
      }
    }
  ] as LanguageProficiency[],

  references: [
    {
      name: "Md. Habib Ehsanul Hoque",
      title: "Assistant Professor & Head (CSE)",
      institution: "Pundra University of Science & Technology",
      location: "Bogura, Bangladesh",
      email: "ehsanamil@gmail.com",
      phone: "+880 1786 044388"
    },
    {
      name: "Mrittika Mahbub",
      title: "Lecturer (CSE)",
      institution: "Pundra University of Science & Technology",
      location: "Bogura, Bangladesh",
      email: "mrittikatania@gmail.com",
      phone: "+880 1701 577906"
    }
  ] as AcademicReference[],

  annexes: [
    "Academic Transcripts",
    "Degree Certificates",
    "Language Test Report (IELTS)",
    "Recommendation Letters",
    "Passport Copy"
  ]
};
