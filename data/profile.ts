/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ============================================================================
 *  Every section of the site and every chatbot answer is generated from this
 *  file. To update the portfolio, edit here - you should not need to touch any
 *  component. See README.md ("Editing content") for a field-by-field guide.
 *
 *  Fill in the TODO placeholders below when the real URLs / files exist.
 *  Anything left as `null` renders as a graceful disabled state - never a
 *  broken or invented link.
 * ============================================================================
 */

export type ProjectLink = string | null;

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem?: string;
  approach?: string;
  results?: string[];
  stack: string[];
  categories: string[];
  github: ProjectLink;
  demo: ProjectLink;
  /** Shown as a small badge, e.g. "Concept". Omit for normal projects. */
  status?: string;
}

/* -------------------------------------------------------------------------- */
/* Identity                                                                   */
/* -------------------------------------------------------------------------- */

export const person = {
  name: 'Sebin Sunny',
  initials: 'SS',
  role: 'AI & Backend Developer | Python, FastAPI, LangGraph and RAG',
  shortRole: 'AI & Backend Developer',
  summary:
    'Computer Science graduate who builds AI-powered applications end to end, from prototype to tested, deployed systems. Enjoys owning problems, iterating quickly, and shipping reliable software as part of a collaborative team.',
  availability: 'Open to AI, backend, and software engineering opportunities',
};

export const contact = {
  phone: '+91 75581 89843',
  phoneHref: 'tel:+917558189843',
  email: 'sebins322003@gmail.com',
  emailHref: 'mailto:sebins322003@gmail.com',
  github: 'https://github.com/sebin07r' as string | null,
  linkedin: 'https://www.linkedin.com/in/8405gjj7y4n8ve/' as string | null,
};

/**
 * Profile photo, served from `public/images/`.
 * A transparent-background cutout (WebP with alpha), cropped to the subject, so
 * the portrait sits directly on the page rather than inside a white box.
 * Set `available: false` to fall back to the initials monogram instead.
 */
export const photo = {
  path: '/images/sebin-sunny.webp',
  width: 1189,
  height: 1200,
  available: true,
  alt: 'Sebin Sunny',
};

/**
 * Resume PDF, served from `public/resume/`.
 * Set `available: false` if the file is ever removed - every Download Resume
 * control then renders as a labelled disabled button instead of a 404.
 */
export const resume = {
  path: '/resume/Sebin_Sunny_Resume.pdf',
  available: true,
};

/** Used for SEO / Open Graph. Update `url` after the first Vercel deploy. */
export const site = {
  url: 'https://sebin-sunny.vercel.app',
  title: 'Sebin Sunny - AI & Backend Developer',
  description:
    'Portfolio of Sebin Sunny, a Computer Science graduate building AI-powered applications end to end with Python, FastAPI, LangGraph, and RAG.',
};

/* -------------------------------------------------------------------------- */
/* About                                                                      */
/* -------------------------------------------------------------------------- */

export const about = {
  paragraphs: [
    'I build AI-powered applications end to end. That usually means starting from a messy real-world problem, shaping it into a retrieval or agent workflow, wrapping it in a validated backend API, and then proving it actually behaves with automated tests before it goes anywhere near a user.',
    'Most of my work sits at the intersection of retrieval-augmented generation, multi-agent orchestration with LangGraph, and backend engineering in Python and FastAPI. I care about the unglamorous half of AI systems: schema validation, grounding, confidence-based routing, and catching the cases where a model quietly makes something up.',
    'Alongside that I have worked on computer vision and deep learning in medical imaging, and on data analysis in Python. I like owning a problem, iterating quickly, debugging until it is genuinely fixed, and delivering something reliable as part of a team.',
  ],
  highlights: [
    { label: 'End-to-end AI apps', detail: 'Prototype through tested, deployed systems' },
    { label: 'Backend APIs', detail: 'FastAPI services with Pydantic validation' },
    { label: 'RAG and agents', detail: 'Retrieval pipelines and LangGraph workflows' },
    { label: 'Testing and debugging', detail: 'Pytest suites, coverage, reliable delivery' },
  ],
};

/* -------------------------------------------------------------------------- */
/* Experience                                                                 */
/* -------------------------------------------------------------------------- */

export interface ExperienceEntry {
  id: string;
  title: string;
  subtitle: string | null;
  company: string;
  meta: string | null;
  period: string;
  current: boolean;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'freelance',
    title: 'Freelance Software Engineer',
    subtitle: 'AI and Backend Development',
    company: 'Freelance',
    meta: null,
    period: 'June 2026 - Present',
    current: true,
    bullets: [
      'Built RAG and multi-agent pipelines in Python and LangGraph, evaluating 1,000+ queries and improving retrieval relevance/accuracy by 15% through retrieval and prompt optimization.',
      'Developed automated Pytest suites with 80%+ code coverage.',
    ],
  },
  {
    id: 'iziel',
    title: 'Associate Software Engineering Intern',
    subtitle: null,
    company: 'Iziel Healthcare',
    meta: 'Onsite',
    period: 'May 2025 - August 2025',
    current: false,
    bullets: [
      'Developed backend test-automation tools in Python, validating more than 50 software workflows and reducing manual testing effort by 35%.',
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Education                                                                  */
/* -------------------------------------------------------------------------- */

export const education = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Karunya Institute of Technology and Sciences, Coimbatore',
    grade: 'CGPA: 7.48',
    period: 'Graduated: July 2025',
  },
];

/* -------------------------------------------------------------------------- */
/* Featured projects - ORDER IS INTENTIONAL, DO NOT REORDER                   */
/*   1. AI-Powered Symptom Triage Assistant                                   */
/*   2. Voice-to-Clinical-Assessment AI Platform                              */
/*   3. AI-Powered Job Search with LangGraph and Multi-Agent Workflows        */
/* -------------------------------------------------------------------------- */

export const featuredProjects: Project[] = [
  {
    id: 'symptom-triage',
    title: 'AI-Powered Symptom Triage Assistant',
    tagline: 'Hybrid RAG triage with severity classification and confidence-based routing',
    description:
      'Built a hybrid RAG triage system over a 1,000-record medical knowledge base with severity classification and confidence scoring. It routes unmatched queries to a Llama model and achieved 90% Top-3 retrieval accuracy and 97% structured-output validity across 200 test queries. Developed FastAPI endpoints with Pydantic validation, red-flag detection, and confidence-based routing for emergency, doctor-consultation, and self-care pathways.',
    problem:
      'Free-text symptom descriptions have to be matched against reliable medical guidance, and the system needs to know when it is not confident enough to answer from its own knowledge base.',
    approach:
      'A hybrid retrieval layer over a 1,000-record medical knowledge base, combined with severity classification, red-flag detection, and confidence scoring. Unmatched queries are routed to a Llama model, and every response is forced through Pydantic schemas before it leaves the API.',
    results: [
      '90% Top-3 retrieval accuracy across 200 test queries',
      '97% structured-output validity across 200 test queries',
      'Confidence-based routing across emergency, doctor-consultation, and self-care pathways',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'RAG', 'Llama', 'Pydantic', 'Vector retrieval'],
    categories: ['Generative AI'],
    github: null, // TODO: add repository URL
    demo: null, // TODO: add live demo URL
  },
  {
    id: 'voice-clinical',
    title: 'Voice-to-Clinical-Assessment AI Platform',
    tagline: 'Patient voice notes turned into structured, grounded clinical assessments',
    description:
      'Converted patient voice notes into structured clinical assessments using Whisper, LangGraph, LLMs, FastAPI, and Pydantic. Integrated RAG with MongoDB for patient-history retrieval, achieving 92% Top-3 retrieval accuracy across 1,000+ clinical queries. Added deterministic grounding and confidence scoring to catch unsupported clinical values and reduce hallucinations. Built APIs for processing, retrieval, and MongoDB persistence, enabled clinician review and treatment planning, and validated the pipeline with 188+ automated tests.',
    problem:
      'Spoken clinical notes are unstructured, and an LLM asked to structure them will happily invent values that were never said.',
    approach:
      'Whisper handles transcription, a LangGraph pipeline extracts structured fields, and RAG over MongoDB pulls in relevant patient history. A deterministic grounding step plus confidence scoring flags clinical values that are not supported by the source, and clinicians review the result before treatment planning.',
    results: [
      '92% Top-3 retrieval accuracy across 1,000+ clinical queries',
      'Deterministic grounding and confidence scoring to catch unsupported clinical values',
      'Pipeline validated with 188+ automated tests',
    ],
    stack: ['Python', 'Whisper', 'LangGraph', 'LLMs', 'FastAPI', 'Pydantic', 'RAG', 'MongoDB', 'Pytest'],
    categories: ['Generative AI'],
    github: null, // TODO: add repository URL
    demo: null, // TODO: add live demo URL
  },
  {
    id: 'job-search',
    title: 'AI-Powered Job Search with LangGraph and Multi-Agent Workflows',
    tagline: 'A multi-agent pipeline that collects, matches, and tracks job applications',
    description:
      'Built a multi-agent pipeline that collects jobs, parses requirements, matches resumes, supports applications, and tracks results. The agents focus on fresher-friendly roles and use structured filtering by experience, location, and posting date.',
    problem:
      'Entry-level job search is repetitive, high-volume work: the same listings get read, filtered, and matched against the same resume over and over.',
    approach:
      'A LangGraph multi-agent workflow where separate agents collect postings, parse requirements, match a parsed resume against them, support the application step, and track outcomes. Structured filtering by experience level, location, and posting date keeps the pipeline focused on fresher-friendly roles.',
    results: [
      'An agent per stage: collection, requirement parsing, resume matching, application support, tracking',
      'Structured filtering by experience level, location, and posting date',
      'SQLite persistence for application tracking',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'LLM agents', 'PDF parsing', 'SQLite', 'Job-data integrations'],
    categories: ['Generative AI'],
    github: null, // TODO: add repository URL
    demo: null, // TODO: add live demo URL
  },
];

/* -------------------------------------------------------------------------- */
/* More projects - ORDER IS INTENTIONAL                                       */
/* -------------------------------------------------------------------------- */

export const projectFilters = [
  'All',
  'Generative AI',
  'Computer Vision',
  'Deep Learning',
  'Data Science',
  'Analytics',
];

export const moreProjects: Project[] = [
  {
    id: 'breast-mass-yolo',
    title: 'Breast Mass Detection using YOLOv11',
    tagline: 'Object detection for mammogram screening support',
    description:
      'Fine-tuned a YOLOv11 object-detection model for automated breast-mass localization in mammograms, achieving 89.3% mAP and a 0.85 F1 score at a tuned 0.44 confidence threshold. Analyzed precision-recall performance to balance sensitivity and false positives.',
    stack: ['Python', 'YOLOv11', 'Computer vision', 'Mammography', 'Model evaluation'],
    categories: ['Computer Vision', 'Deep Learning'],
    github: null,
    demo: null,
  },
  {
    id: 'diet-exercise',
    title: 'AI-Based Diet and Exercise Recommendation using DeepSeek and LLaVA',
    tagline: 'Multimodal food recognition and personalized planning',
    description:
      'Built a multimodal Flask application that identifies food from uploaded images with LLaVA, estimates calories and nutrition, and generates personalized diet plans with DeepSeek based on health profiles, preferences, and fitness goals. Published in the Journal of Neonatal Surgery in 2025; reported 90% model accuracy.',
    stack: ['Python', 'Flask', 'LLaVA', 'DeepSeek', 'Multimodal AI'],
    categories: ['Generative AI', 'Computer Vision'],
    github: null,
    demo: null,
  },
  {
    id: 'lstm-stock',
    title: 'LSTM Stock Price Predictor',
    tagline: 'Time-series forecasting with sequential windows',
    description:
      'Built a time-series forecasting pipeline that collects historical Open, High, Low, Close, and Volume data; cleans and normalizes it; creates sequential windows; trains an LSTM; predicts trends; and compares predicted and actual values visually.',
    stack: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'scikit-learn'],
    categories: ['Deep Learning', 'Data Science'],
    github: null,
    demo: null,
  },
  {
    id: 'sales-prediction',
    title: 'Sales Prediction Using Advertising Expenditures',
    tagline: 'Which advertising channels actually move sales',
    description:
      'Analyzed the relationship between TV, radio, and newspaper advertising budgets and product sales. Used regression and correlation analysis to identify impactful channels and support marketing-budget decisions.',
    stack: ['Python', 'Pandas', 'scikit-learn', 'Regression', 'EDA', 'Visualization'],
    categories: ['Data Science', 'Analytics'],
    github: null,
    demo: null,
  },
  {
    id: 'facebook-live-sellers',
    title: 'Facebook Live Sellers in Thailand Analysis',
    tagline: 'Post type, timing, and engagement across ten sellers',
    description:
      'Analyzed 7,050 records and 14 attributes from ten Thai fashion and cosmetics sellers. Explored how post type and publication timing relate to reactions, comments, shares, and customer engagement; included missing-value handling and feature selection.',
    stack: ['Python', 'Pandas', 'Data preprocessing', 'EDA', 'Visualization'],
    categories: ['Data Science', 'Analytics'],
    github: null,
    demo: null,
  },
  {
    id: 'youtube-success',
    title: 'YouTube Success Analysis',
    tagline: 'Patterns behind channel growth and content performance',
    description:
      'Analyzed top creators using subscriber counts, views, upload frequency, countries, and estimated earnings to uncover patterns behind channel growth and online content performance.',
    stack: ['Python', 'Pandas', 'EDA', 'Data visualization'],
    categories: ['Analytics', 'Data Science'],
    github: null,
    demo: null,
  },
  {
    id: 'mental-health',
    title: 'Mental Health Monitoring',
    tagline: 'Concept for emotion-aware, data-driven wellbeing insights',
    description:
      'Designed a concept for monitoring emotional state using machine learning, sentiment analysis, and NLP to provide data-driven insights and personalized recommendations.',
    stack: ['Python', 'NLP', 'Sentiment analysis', 'Machine learning'],
    categories: ['Generative AI', 'Data Science'],
    github: null,
    demo: null,
  },
  {
    id: 'pneumonia-cnn',
    title: 'Pneumonia Classification using CNN',
    tagline: 'Normal vs. pneumonia-affected chest X-rays',
    description:
      'Trained a CNN-based image-classification approach to distinguish normal and pneumonia-affected chest X-rays and demonstrate deep-learning-assisted medical-image analysis.',
    stack: ['Python', 'CNN', 'Deep learning', 'Chest X-rays'],
    categories: ['Deep Learning', 'Computer Vision'],
    github: null,
    demo: null,
  },
  {
    id: 'chest-xray',
    title: 'Chest X-ray Disease Classification',
    tagline: 'Categorizing visible disease patterns for decision support',
    description:
      'Applied CNN-based deep learning to analyze chest X-ray images and categorize visible disease patterns for faster decision support.',
    stack: ['Python', 'CNN', 'Deep learning', 'Medical imaging'],
    categories: ['Deep Learning', 'Computer Vision'],
    github: null,
    demo: null,
  },
  {
    id: 'mall-segmentation',
    title: 'Mall Customer Segmentation Analysis',
    tagline: 'Clustering shoppers into actionable segments',
    description:
      'Used clustering to group mall customers by similar traits and behaviors, supporting tailored marketing, product decisions, and customer experiences.',
    stack: ['Python', 'Clustering', 'scikit-learn', 'EDA', 'Visualization'],
    categories: ['Data Science', 'Analytics'],
    github: null,
    demo: null,
  },
];

export const allProjects: Project[] = [...featuredProjects, ...moreProjects];

/* -------------------------------------------------------------------------- */
/* Skills in practice - technology mapped to evidence                         */
/* -------------------------------------------------------------------------- */

export interface SkillEntry {
  name: string;
  proof: string;
}

export const skillsInPractice: SkillEntry[] = [
  {
    name: 'Python',
    proof:
      'Core language across RAG, multi-agent, computer-vision, deep-learning, automation, and analytics projects.',
  },
  {
    name: 'FastAPI and Pydantic',
    proof: 'Structured, validated APIs in the symptom-triage and clinical-assessment platforms.',
  },
  {
    name: 'LangGraph and LangChain',
    proof: 'Agent orchestration and controlled AI workflows in triage, clinical extraction, and job search.',
  },
  {
    name: 'RAG and vector retrieval',
    proof: 'Medical knowledge retrieval, patient-history retrieval, grounding, and confidence-aware routing.',
  },
  {
    name: 'MongoDB and SQLite',
    proof: 'Persistent clinical assessments and job-application tracking.',
  },
  {
    name: 'Whisper',
    proof: 'Audio transcription in the clinical-assessment pipeline.',
  },
  {
    name: 'Pytest',
    proof: 'Automated testing, including 188+ pipeline tests and 80%+ coverage in freelance work.',
  },
  {
    name: 'YOLOv11 and CNNs',
    proof: 'Object detection and medical-image classification.',
  },
  {
    name: 'TensorFlow and Keras',
    proof: 'LSTM time-series prediction and deep-learning projects.',
  },
  {
    name: 'Pandas, NumPy, scikit-learn, Matplotlib, Seaborn',
    proof: 'Preprocessing, modeling, evaluation, and visualization.',
  },
  {
    name: 'Java, SQL, JavaScript, HTML/CSS, OOP',
    proof: 'Supporting programming and software-engineering foundations.',
  },
];

export const skillCategories: { title: string; items: string[] }[] = [
  {
    title: 'Engineering',
    items: ['Software development', 'REST APIs', 'Test automation', 'Debugging'],
  },
  {
    title: 'Data',
    items: ['Data pipelines', 'Databases', 'Data analysis'],
  },
  {
    title: 'Working style',
    items: ['Collaboration', 'Adaptability', 'Analytical thinking', 'Rapid learning'],
  },
];

/* -------------------------------------------------------------------------- */
/* Publication                                                                */
/* -------------------------------------------------------------------------- */

export const publications = [
  {
    title: 'AI-Driven Personalized Health & Nutrition Assistant Using DeepSeek and LLaVA',
    journal: 'Journal of Neonatal Surgery',
    year: '2025',
    url: 'https://jneonatalsurg.com/index.php/jns/article/view/2734',
    cta: 'Read Publication',
  },
];

/* -------------------------------------------------------------------------- */
/* Certifications                                                             */
/* -------------------------------------------------------------------------- */

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  /** TODO: add a certificate URL if one exists. `null` renders no link. */
  url: string | null;
}

export const certifications: Certification[] = [
  { title: 'Full Stack Development', issuer: 'Tap Academy', date: 'June 2025', url: null },
  { title: 'Data Science with Python', issuer: 'Finlatics', date: 'November 2024', url: null },
  { title: 'Data Science', issuer: 'Teachnook', date: 'June 2023', url: null },
  { title: 'Cloud Security', issuer: 'Cisco', date: 'May 2023', url: null },
  { title: 'Programming Essentials in Python', issuer: 'Cisco', date: 'June 2022', url: null },
];

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `label` is the full name, used in the mobile menu and the footer.
 * `short` is what the desktop bar shows - the long titles are abbreviated there
 * so all ten items sit on one tidy row instead of overflowing.
 */
export const navItems = [
  { id: 'home', label: 'Home', short: 'Home' },
  { id: 'about', label: 'About', short: 'About' },
  { id: 'experience', label: 'Experience', short: 'Experience' },
  { id: 'featured-projects', label: 'Featured Projects', short: 'Featured' },
  { id: 'more-projects', label: 'More Projects', short: 'More Work' },
  { id: 'skills', label: 'Skills in Practice', short: 'Skills' },
  { id: 'education', label: 'Education', short: 'Education' },
  { id: 'publications', label: 'Publications', short: 'Publications' },
  { id: 'certifications', label: 'Certifications', short: 'Certificates' },
  { id: 'contact', label: 'Contact', short: 'Contact' },
];

/**
 * Measurable results, kept in one place so the assistant cannot drift from
 * them. Every number here must be traceable to the resume or a project above.
 */
export const metrics = [
  {
    value: '15%',
    label: 'retrieval relevance/accuracy improvement',
    context: 'Freelance RAG and multi-agent pipelines, evaluated over 1,000+ queries',
  },
  { value: '80%+', label: 'Pytest code coverage', context: 'Automated test suites in freelance work' },
  {
    value: '35%',
    label: 'reduction in manual testing effort',
    context: 'Backend test-automation tools at Iziel Healthcare, validating 50+ workflows',
  },
  {
    value: '90%',
    label: 'Top-3 retrieval accuracy',
    context: 'AI-Powered Symptom Triage Assistant, across 200 test queries',
  },
  {
    value: '97%',
    label: 'structured-output validity',
    context: 'AI-Powered Symptom Triage Assistant, across 200 test queries',
  },
  {
    value: '92%',
    label: 'Top-3 retrieval accuracy',
    context: 'Voice-to-Clinical-Assessment AI Platform, across 1,000+ clinical queries',
  },
  {
    value: '188+',
    label: 'automated tests',
    context: 'Voice-to-Clinical-Assessment AI Platform pipeline validation',
  },
  {
    value: '89.3%',
    label: 'mAP, with a 0.85 F1 score at a 0.44 confidence threshold',
    context: 'Breast Mass Detection using YOLOv11',
  },
];
