export type ProjectMediaType = "app" | "web";

export interface ProjectItem {
  slug: string;
  title: string;
  company?: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
  githubLink?: string;
  /** Use instead of githubLink when a project has more than one repo (e.g. app + backend) */
  repositories?: { label: string; url: string }[];
  liveLink?: string;
  /** "app" -> detail page shows a screenshot gallery, "web" -> detail page links out to liveLink */
  mediaType: ProjectMediaType;
  /** Screenshot paths under /public, only used when mediaType === "app" */
  screenshots?: string[];
  /** Path/URL to a downloadable .apk, only used when mediaType === "app" */
  apkLink?: string;
  /** Set to false to skip generating a /projects/[slug] page and hide "View Details". Defaults to true. */
  hasDetailPage?: boolean;
}

export const ownProjects: ProjectItem[] = [
  {
    slug: "paw-pet-service-booking-app",
    title: "Paw: Pet Service Booking App",
    duration: "June 1 - 12, 2026",
    description:
      "A mobile app for booking pet care and carrying services such as boarding and walking, backed by a custom lightweight backend.",
    technologies: [
      "Flutter",
      "Dart",
      "GetX",
      "Dio",
      "Node.js",
      "TypeScript",
      "Express 5",
      "Google Sheets DB",
      "Google OAuth",
      "Render",
    ],
    achievements: [
      "Built with Clean Architecture across four layers (presentation, domain, data, and a shared core) with a strict inward dependency flow",
      "Implemented an offline first repository pattern with Dio that falls back to a local in memory cache when the API is unreachable",
      "Added Google OAuth login via deep links, with tokens stored securely using flutter_secure_storage",
      "Designed a custom design system with color tokens, typography (Fraunces and DM Sans/Mono), and a spacing scale",
      "Built a custom backend that uses Google Sheets as the datastore through a self made, schema validated ORM style library (longcelot-sheet-db)",
      "Implemented REST APIs for auth, profiles, bookings, and services using Express 5 and JWT sessions, deployed on Render with separate dev and prod build flavors",
    ],
    repositories: [
      { label: "Mobile App", url: "https://github.com/vannseavlong/pet_carring" },
      { label: "Backend", url: "https://github.com/vannseavlong/backend_paw" },
    ],
    mediaType: "app",
    screenshots: [
      "/project/paw/Home.jpg",
      "/project/paw/Login-Signup.jpg",
      "/project/paw/Booking.jpg",
      "/project/paw/StayList.jpg",
      "/project/paw/Profile.jpg",
      "/project/paw/Logout.jpg",
    ],
    apkLink: "/downloads/paw.apk",
  },
];

export const schoolProjects: ProjectItem[] = [
  {
    slug: "air-quality-monitoring-system",
    title: "Air Quality Monitoring System",
    duration: "June 2025 - August 2025",
    description:
      "Learn to create an air quality monitoring system using Flutter, FastAPI, connected to Open-meteo live sensor data.",
    technologies: [
      "Flutter",
      "FastAPI",
      "open-meteo",
      "XGBOOST model selection",
    ],
    githubLink: "https://github.com/LONGCELOT/Air_Quality_Prediction/",
    achievements: [
      "Integrate everything together",
      "Prediction accuracy improvement",
      "Members: Bin Sodina, Nhek ChanPanha, Chea LivChea, Hong Pimolsaknan, VANN Seavlong (Me)",
    ],
    mediaType: "app",
    screenshots: [],
  },
  {
    slug: "quiz-app",
    title: "Quiz App",
    duration: "June 2025 - August 2025",
    description:
      "Learn to create a quiz app using Flutter and provided API integration",
    technologies: ["Flutter", "API integration"],
    githubLink: "https://github.com/LONGCELOT/quizApp/",
    achievements: [
      "Integrate everything together",
      "Prediction accuracy improvement",
      "Members: VANN Seavlong",
    ],
    mediaType: "app",
    screenshots: [],
  },
  {
    slug: "movie-booking-ticket-system",
    title: "Movie Booking Ticket System",
    duration: "January 2025 - May 2025",
    description:
      "Learn to create a movie booking ticket system using React vite, express, connected to a share database server on Heidy SQL.",
    technologies: ["React.js", "Express.js", "MySQL", "Heidy SQL"],
    achievements: [
      "Learn MySQL queries",
      "OOP Concepts unlock",
      "Members: Bin Sodina, Nhek ChanPanha, VANN Seavlong (Me)",
    ],
    mediaType: "web",
  },
  {
    slug: "academic-record-system",
    title: "Academic Record System Database + Figma UI",
    duration: "July 2024 - August 2024",
    description:
      "Learn to design a database schema with relationship, ER-Diagram and create a user-friendly UX/UI interface for managing academic records.",
    technologies: ["MySQL", "Figma", "Mamp server Php my admin"],
    achievements: [
      "Learn MySQL queries",
      "OOP Concepts unlock",
      "Members: Bin Sodina, Nhek ChanPanha, Chea LivChea, Hong PimolSaknan, VANN Seavlong (Me)",
    ],
    mediaType: "app",
    screenshots: [],
  },
  {
    slug: "rice-quality-detection-system",
    title: "Rice Quality Detection System",
    duration: "July 2024 - August 2024",
    description:
      "Created own dataset and trained a model to detect the quality of rice. This project allowed me to understand the basics of machine learning and image classification. Yet this project is not fully completed due to time limitations.",
    technologies: ["Python", "Roboflow", "TensorFlow"],
    githubLink:
      "https://github.com/LONGCELOT/Rice-Qualification-Detection.git",
    achievements: [
      "Python",
      "Roboflow",
      "Members: Bin Sodina, Nhek ChanPanha, Hong PimolSaknan, Mona Ameliazzaman, VANN Seavlong (Me)",
    ],
    mediaType: "app",
    screenshots: [],
  },
  {
    slug: "baw-project-khmer-enterprise",
    title: "BAW Project at Khmer Enterprise (KE)",
    duration: "June 2023 - July 2023",
    description:
      "Developed a sample website for the BAW project at Khmer Enterprise, related to Digital Education platform which allow student to access the video solution to each exercise from text book base with QR code.",
    technologies: ["html", "css", "javascript"],
    githubLink: "https://github.com/LONGCELOT/My-Final-BAW.git",
    liveLink: "https://longcelot.github.io/My-Final-BAW/",
    achievements: [
      "Won a first round award in top 8",
      "Team Collaboration with 5 members",
      "Certified by Khmer Enterprise",
    ],
    mediaType: "web",
  },
  {
    slug: "flappy-bird-game-clone",
    title: "Flappy Bird Game Clone",
    duration: "April 2023 - June 2023",
    description:
      "Learn how to build a Flappy Bird game clone using Python and Pygame. This project allow me to understand some basic game development using Pygame.",
    technologies: ["Python", "Pygame"],
    githubLink: "https://github.com/LONGCELOT/FlappyBird.git",
    achievements: [
      "Implemented a good graphics and sound effects from open-source resources",
      "The game display the score live and has a game over screen",
      "Members: VANN Seavlong (Me), Chea LivChea",
    ],
    mediaType: "app",
    screenshots: [],
  },
];

export const internshipExperiences: ProjectItem[] = [
  {
    slug: "beasy-cleaning-pest-landing-page",
    title: "bEasy: Cleaning & Pest Landing Page",
    company: "Suntel technology Cambodia",
    duration: "Present",
    description:
      "A landing page for bEasy, a cleaning and pest control service company in Cambodia. The website is built using React.js, JavaScript, and CSS, then refactor to Next.js with shadcn for SEO friendly and it is designed to be responsive and user-friendly.",
    technologies: [
      "React",
      "JavaScript",
      "CSS",
      "Firebase",
      "Next.js",
      "shadcn",
      "GA4",
    ],
    liveLink: "https://beasy.info/en",
    achievements: [
      "Implemented responsive design for mobile and desktop + fully translated in Khmer, English and Chinese",
      "Integrated Firebase for user performanc and event tracking",
      "Work as a Frontend Intern contributing to some part of the website while learning from senior developers",
      "Get some real working experience in a software company environment",
      "Contributed with some other projects as assigned",
    ],
    mediaType: "web",
    hasDetailPage: false,
  },
  {
    slug: "isi-marketing-internship",
    title: "ISI Intern in Marketing Department",
    company:
      "ISI Group: Innovation, Striving, Integrity, and Growing together (ISIG)",
    duration: "January 2024",
    description:
      "Assisted in the categories the POSM materials, and develop a digital catalog for ISI products",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://catalogue.isisteel.com.kh/",
    achievements: ["New Experience as first time internship experience"],
    mediaType: "web",
    hasDetailPage: false,
  },
];

export const allProjects: ProjectItem[] = [
  ...ownProjects,
  ...schoolProjects,
  ...internshipExperiences,
];

export const hasDetailPage = (project: ProjectItem): boolean =>
  project.hasDetailPage !== false;

export const getProjectBySlug = (slug: string): ProjectItem | undefined =>
  allProjects.find((project) => project.slug === slug && hasDetailPage(project));
