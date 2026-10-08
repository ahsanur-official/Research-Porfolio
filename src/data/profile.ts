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
  department: string;
  location: string;
  email: string;
  phone: string;
  relationship?: string;
}

export const PROFILE_DATA = {
  fullName: "Md. Ahsanur Rahaman",
  shortName: "Ahsanur Rahaman",
  initials: "AR",
  role: "AI/ML Researcher & Computer Science Engineer",
  tagline: "Exploring Brain-Computer Interfaces, EEG Signal Processing, Deep Learning, Intelligent Rehabilitation Systems, and Modern Software Engineering.",
  heroStatement: "I build intelligent systems at the intersection of AI, neural signals, and software engineering.",
  personalStatement:
    "Motivated Computer Science and Engineering student specializing in Artificial Intelligence for Brain-Computer Interfaces and neurorehabilitation. My research focuses on EEG-based motor imagery, deep learning for neural signal analysis, healthy-like EEG reconstruction, and AI-assisted digital neural bypass systems for post-stroke motor rehabilitation. Experienced with CNN, LSTM, generative models (CycleGAN, Diffusion), EEG signal processing, and research-oriented projects. Seeking a research-focused Master's programme to advance my work in AI-driven neural engineering and intelligent rehabilitation systems.",
  
  personalInfo: {
    dateOfBirth: "27/01/2003",
    nationality: "Bangladeshi",
    presentAddress: "Bogura, Bangladesh",
    permanentAddress: "Shibpur, Khetlal, Shibpur-5920, Joypurhat, Bangladesh",
  },

  contact: {
    email: "mdahsanurrahaman2456@gmail.com",
    phone: "+880 1776 890648",
    location: "Bogura, Bangladesh",
    permanentAddress: "Shibpur, Khetlal, Shibpur-5920, Joypurhat, Bangladesh",
    address: "Bogura & Joypurhat, Bangladesh",
    github: "https://github.com/ahsanur-official",
    linkedin: "https://www.linkedin.com/in/md-ahsanur-rahaman/",
    portfolio: "https://ahsanur-portfolio.netlify.app/",
  },

  academicMetrics: {
    cgpa: "3.83 / 4.00",
    cgpaNote: "Up to 7th Semester",
    institution: "Pundra University of Science & Technology",
    department: "Department of Computer Science and Engineering",
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
        "Specializing in Artificial Intelligence for Brain-Computer Interfaces (BCI) and Neurorehabilitation",
        "Conducted research on CycleGAN & Diffusion-based EEG signal reconstruction for Motor Imagery & Parkinson's Disease detection",
        "Elected General Secretary (2026) & Vice President (2025) of PUB Computer & Programming Club (PUB CPC)",
        "Convener (2025–2026) & Executive Member (2024–2025) of BASIS Students' Forum (PUB Chapter)"
      ]
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Govt. Shah Sultan College",
      location: "Bogura, Bangladesh",
      duration: "07/2019 – 12/2020",
      grade: "GPA 5.00 / 5.00",
      details: [
        "Science Group with rigorous mathematics, physics, and chemistry foundations",
        "Achieved highest possible academic grade point average (GPA 5.00 / 5.00)"
      ]
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Akhlas Shibpur Shampur B.L. High School",
      location: "Khetlal, Joypurhat, Bangladesh",
      duration: "01/2017 – 12/2018",
      grade: "GPA 5.00 / 5.00",
      details: [
        "Science Group with outstanding distinction in analytical and science curricula",
        "Achieved highest possible academic grade point average (GPA 5.00 / 5.00)"
      ]
    }
  ] as AcademicRecord[],

  languages: [
    {
      language: "Bangla",
      level: "Native / Mother Tongue",
      details: {
        listening: "C2 (Mastery)",
        reading: "C2 (Mastery)",
        spokenInteraction: "C2 (Mastery)",
        spokenProduction: "C2 (Mastery)",
        writing: "C2 (Mastery)"
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
        listening: "C1 (Effective Operational Proficiency)",
        reading: "A1 (Basic)",
        spokenInteraction: "B2 (Vantage)",
        spokenProduction: "B2 (Vantage)",
        writing: "A1 (Basic)"
      }
    }
  ] as LanguageProficiency[],

  references: [
    {
      name: "Md. Habib Ehsanul Hoque",
      title: "Assistant Professor & Head",
      department: "Department of Computer Science and Engineering",
      institution: "Pundra University of Science & Technology",
      location: "Bogura, Bangladesh",
      email: "ehsanamil@gmail.com",
      phone: "+880 1786 044388",
      relationship: "Department Head & Academic Mentor"
    },
    {
      name: "Mrittika Mahbub",
      title: "Lecturer",
      department: "Department of Computer Science and Engineering",
      institution: "Pundra University of Science & Technology",
      location: "Bogura, Bangladesh",
      email: "mrittikatania@gmail.com",
      phone: "+880 1701 577906",
      relationship: "Research Advisor & Co-Author"
    }
  ] as AcademicReference[],

  annexes: [
    "Official Academic Transcripts (B.Sc, HSC, SSC)",
    "Degree Certificates",
    "IELTS Academic Official Test Report Form",
    "Letters of Recommendation (Referees)",
    "Research Manuscripts & Conference Acceptance Letters",
    "Hackathon & NASA Space Apps Award Certificates",
    "Passport Copy"
  ]
};
