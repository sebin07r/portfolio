/**
 * ============================================================================
 *  DETERMINISTIC PORTFOLIO ASSISTANT - KNOWLEDGE BASE
 * ============================================================================
 *  This is a local, rules-based question answerer. There is no LLM, no network
 *  call, and no API key involved - every answer is composed from the approved
 *  facts in `data/profile.ts`.
 *
 *  HARD RULES (these are enforced by construction, keep them that way):
 *    - Never state a job, date, metric, link, degree, or certificate that is
 *      not present in `data/profile.ts`.
 *    - When there is no confident match, return `fallbackAnswer()` verbatim.
 *    - Never give medical, investment, hiring, or legal advice - see
 *      `ADVICE_GUARD` below.
 *
 *  A server-side LLM could be layered on later (see README, "Chatbot
 *  architecture"): `answerQuestion()` would become the fast local path, with a
 *  server route as the fallback. An LLM API key must never reach this file,
 *  because everything here ships to the browser.
 * ============================================================================
 */

import {
  allProjects,
  certifications,
  contact,
  education,
  experience,
  featuredProjects,
  metrics,
  moreProjects,
  person,
  publications,
  skillsInPractice,
} from '@/data/profile';

export interface AnswerLink {
  label: string;
  /** Element id to scroll to, e.g. "featured-projects" or "project-symptom-triage". */
  target: string;
}

export interface AnswerAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface Answer {
  /** Intent id, useful for tests and analytics. */
  id: string;
  text: string;
  bullets?: string[];
  links?: AnswerLink[];
  actions?: AnswerAction[];
}

/** The exact wording required when the assistant does not know something. */
export const FALLBACK_TEXT = `I don't have that information, but you can contact Sebin at ${contact.email} or ${contact.phone}.`;

export function fallbackAnswer(): Answer {
  return {
    id: 'fallback',
    text: FALLBACK_TEXT,
    actions: [
      { label: `Email ${contact.email}`, href: contact.emailHref },
      { label: `Call ${contact.phone}`, href: contact.phoneHref },
    ],
  };
}

/* -------------------------------------------------------------------------- */
/* Text normalisation and term matching                                        */
/* -------------------------------------------------------------------------- */

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    // Hyphens become spaces so that "Voice-to-Clinical-Assessment" and
    // "voice clinical assessment" tokenize identically.
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Matches a term against the normalized query.
 * Multi-word terms are substring matches; single words match on word
 * boundaries so that "ai" does not match "said" or "detail".
 */
function hasTerm(query: string, term: string): boolean {
  if (term.includes(' ')) return query.includes(term);
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(query);
}

interface Intent {
  id: string;
  /** Distinctive terms - strong evidence for this intent. */
  strong?: string[];
  /** Supporting terms - weak evidence. */
  terms?: string[];
  build: () => Answer;
}

const STRONG_WEIGHT = 3;
const WEAK_WEIGHT = 1;
/** Below this score we do not trust the match and fall back. */
const CONFIDENCE_THRESHOLD = 3;

function scoreIntent(query: string, intent: Intent): number {
  let score = 0;
  for (const term of intent.strong ?? []) {
    if (hasTerm(query, term)) score += STRONG_WEIGHT;
  }
  for (const term of intent.terms ?? []) {
    if (hasTerm(query, term)) score += WEAK_WEIGHT;
  }
  return score;
}

/* -------------------------------------------------------------------------- */
/* Answer builders - all content is derived from data/profile.ts               */
/* -------------------------------------------------------------------------- */

const contactActions: AnswerAction[] = [
  { label: `Email ${contact.email}`, href: contact.emailHref },
  { label: `Call ${contact.phone}`, href: contact.phoneHref },
];

function whoIsSebin(): Answer {
  const degree = education[0];
  return {
    id: 'who',
    text: `${person.name} is an ${person.shortRole}. ${person.summary} He holds a ${degree.degree} from ${degree.institution} (${degree.grade}, ${degree.period.toLowerCase()}).`,
    links: [
      { label: 'Read the About section', target: 'about' },
      { label: 'See education', target: 'education' },
    ],
  };
}

function aiProjects(): Answer {
  return {
    id: 'projects',
    text: 'Sebin has three featured AI projects, all built end to end:',
    bullets: featuredProjects.map((project) => `${project.title} - ${project.tagline}.`),
    links: [
      ...featuredProjects.map((project) => ({
        label: `Jump to ${project.title}`,
        target: `project-${project.id}`,
      })),
      { label: 'See all featured projects', target: 'featured-projects' },
    ],
  };
}

function techStack(): Answer {
  return {
    id: 'stack',
    text: 'His strongest stack is Python-based AI and backend engineering: Python, FastAPI, LangGraph, LangChain, RAG and vector retrieval, Pydantic, MongoDB, Whisper, and Pytest, plus AI/ML tooling such as YOLOv11, CNNs, TensorFlow, and Keras. In practice that looks like:',
    bullets: skillsInPractice.slice(0, 7).map((skill) => `${skill.name}: ${skill.proof}`),
    links: [
      { label: 'See Skills in Practice', target: 'skills' },
      { label: 'See featured projects', target: 'featured-projects' },
    ],
  };
}

function healthcareAi(): Answer {
  return {
    id: 'healthcare',
    text: 'Yes - a good part of his portfolio is healthcare-adjacent AI engineering. He also interned at Iziel Healthcare. Note that these are engineering projects, not clinical tools, and the assistant cannot give medical advice.',
    bullets: [
      'AI-Powered Symptom Triage Assistant: hybrid RAG over a medical knowledge base with severity classification and confidence-based routing.',
      'Voice-to-Clinical-Assessment AI Platform: Whisper plus LangGraph turning patient voice notes into structured, grounded clinical assessments for clinician review.',
      'Breast Mass Detection using YOLOv11: object detection for mammogram screening support.',
      'Pneumonia Classification using CNN and Chest X-ray Disease Classification: CNN-based medical-image classification.',
    ],
    links: [
      { label: 'Featured projects', target: 'featured-projects' },
      { label: 'More projects', target: 'more-projects' },
    ],
  };
}

function experienceAnswer(): Answer {
  return {
    id: 'experience',
    text: 'Sebin has two roles on his resume:',
    bullets: experience.map((role) => {
      const heading = role.subtitle ? `${role.title} | ${role.subtitle}` : role.title;
      const where = role.company === 'Freelance' ? '' : ` at ${role.company}`;
      return `${heading}${where} (${role.period}). ${role.bullets.join(' ')}`;
    }),
    links: [{ label: 'See the experience timeline', target: 'experience' }],
  };
}

function metricsAnswer(): Answer {
  return {
    id: 'metrics',
    text: 'Here are the measurable results from his work, each with the project it came from:',
    bullets: metrics.map((metric) => `${metric.value} ${metric.label} - ${metric.context}.`),
    links: [
      { label: 'See experience', target: 'experience' },
      { label: 'See featured projects', target: 'featured-projects' },
    ],
  };
}

function publicationAnswer(): Answer {
  const paper = publications[0];
  return {
    id: 'publication',
    text: `Yes. "${paper.title}" was published in the ${paper.journal}, ${paper.year}.`,
    links: [{ label: 'See the publication card', target: 'publications' }],
    actions: [{ label: paper.cta, href: paper.url, external: true }],
  };
}

function contactAnswer(): Answer {
  return {
    id: 'contact',
    text: `You can reach Sebin by email at ${contact.email} or by phone at ${contact.phone}. There is also a contact form on this page.`,
    links: [{ label: 'Go to the contact section', target: 'contact' }],
    actions: contactActions,
  };
}

function availabilityAnswer(): Answer {
  return {
    id: 'availability',
    text: `${person.availability}. If a role looks like a fit, the best next step is to get in touch directly - he will be able to answer specifics himself.`,
    links: [{ label: 'Go to the contact section', target: 'contact' }],
    actions: contactActions,
  };
}

function educationAnswer(): Answer {
  const degree = education[0];
  return {
    id: 'education',
    text: `${degree.degree} from ${degree.institution}. ${degree.grade}. ${degree.period}.`,
    links: [{ label: 'See education', target: 'education' }],
  };
}

function certificationsAnswer(): Answer {
  return {
    id: 'certifications',
    text: 'Sebin has completed these certifications and courses:',
    bullets: certifications.map((cert) => `${cert.title} - ${cert.issuer}, ${cert.date}.`),
    links: [{ label: 'See certifications', target: 'certifications' }],
  };
}

function testingAnswer(): Answer {
  return {
    id: 'testing',
    text: 'Testing is a consistent thread through his work rather than an afterthought:',
    bullets: [
      'Freelance: automated Pytest suites with 80%+ code coverage.',
      'Voice-to-Clinical-Assessment AI Platform: pipeline validated with 188+ automated tests.',
      'Iziel Healthcare: backend test-automation tools in Python, validating more than 50 software workflows and reducing manual testing effort by 35%.',
    ],
    links: [
      { label: 'See experience', target: 'experience' },
      { label: 'See Skills in Practice', target: 'skills' },
    ],
  };
}

function ragAnswer(): Answer {
  return {
    id: 'rag',
    text: 'RAG and agent orchestration are the core of his AI work:',
    bullets: [
      'Symptom Triage Assistant: hybrid RAG over a 1,000-record medical knowledge base, 90% Top-3 retrieval accuracy across 200 test queries, with confidence-based routing.',
      'Voice-to-Clinical-Assessment Platform: RAG with MongoDB for patient-history retrieval, 92% Top-3 retrieval accuracy across 1,000+ clinical queries, plus deterministic grounding to catch unsupported values.',
      'AI-Powered Job Search: a LangGraph multi-agent workflow for collection, requirement parsing, resume matching, application support, and tracking.',
      'Freelance work: RAG and multi-agent pipelines evaluated over 1,000+ queries, improving retrieval relevance/accuracy by 15%.',
    ],
    links: [{ label: 'See featured projects', target: 'featured-projects' }],
  };
}

function computerVisionAnswer(): Answer {
  const cv = moreProjects.filter((project) => project.categories.includes('Computer Vision'));
  return {
    id: 'computer-vision',
    text: 'Yes - his computer vision and deep learning work includes:',
    bullets: cv.map((project) => `${project.title} - ${project.tagline}.`),
    links: [{ label: 'See more projects', target: 'more-projects' }],
  };
}

function dataAnswer(): Answer {
  const data = moreProjects.filter(
    (project) => project.categories.includes('Data Science') || project.categories.includes('Analytics'),
  );
  return {
    id: 'data',
    text: 'His data science and analytics projects include:',
    bullets: data.map((project) => `${project.title} - ${project.tagline}.`),
    links: [{ label: 'See more projects', target: 'more-projects' }],
  };
}

function resumeAnswer(): Answer {
  return {
    id: 'resume',
    text: 'There is a Download Resume button in the navigation bar and in the hero and contact sections. If it shows as unavailable, the PDF has not been uploaded yet - email Sebin and he will send it across.',
    links: [{ label: 'Go to the contact section', target: 'contact' }],
    actions: contactActions,
  };
}

function greetingAnswer(): Answer {
  return {
    id: 'greeting',
    text: `Hi! I can tell you about ${person.name.split(' ')[0]}'s experience, projects, skills, education, and publications. Pick one of the suggestions below or ask in your own words.`,
  };
}

function adviceGuardAnswer(): Answer {
  return {
    id: 'advice-guard',
    text: `I can only answer questions about Sebin's portfolio - I can't give medical, investment, hiring, or legal advice. If you want to discuss any of that with Sebin directly, you can reach him at ${contact.email} or ${contact.phone}.`,
    actions: contactActions,
  };
}

/**
 * Advice guard. Checked before every intent so that a question like
 * "should I invest in this stock?" can never be answered from project content.
 */
const ADVICE_GUARD: { strong: string[]; terms: string[] } = {
  strong: [
    'diagnose me',
    'should i invest',
    'medical advice',
    'legal advice',
    'investment advice',
    'am i sick',
    'do i have',
    'treat my',
    'should i buy',
    'should i hire',
    'is it legal',
    'sue',
    'prescribe',
  ],
  terms: ['symptoms i have', 'my symptoms', 'my illness', 'my lawsuit', 'stock tip'],
};

function isAdviceRequest(query: string): boolean {
  return (
    ADVICE_GUARD.strong.some((term) => hasTerm(query, term)) ||
    ADVICE_GUARD.terms.some((term) => hasTerm(query, term))
  );
}

/* -------------------------------------------------------------------------- */
/* Intent table                                                               */
/* -------------------------------------------------------------------------- */

const INTENTS: Intent[] = [
  {
    id: 'greeting',
    strong: ['hello', 'hey there', 'good morning', 'good evening'],
    terms: ['hi', 'hey', 'yo'],
    build: greetingAnswer,
  },
  {
    id: 'who',
    // "tell me about" on its own is too generic - it also opens questions about
    // testing, a project, or a certification, so it is scoped to the person.
    strong: [
      'who is sebin',
      'who is he',
      'about sebin',
      'tell me about him',
      'tell me about sebin',
      'introduce',
      'his background',
    ],
    terms: ['who', 'about', 'background', 'summary', 'bio', 'himself'],
    build: whoIsSebin,
  },
  {
    id: 'projects',
    strong: ['what projects', 'ai projects', 'featured projects', 'what has he built', 'what did he build'],
    terms: ['project', 'projects', 'built', 'build', 'portfolio', 'work on', 'showcase'],
    build: aiProjects,
  },
  {
    id: 'stack',
    strong: ['tech stack', 'strongest', 'technologies', 'what languages', 'best at'],
    terms: ['stack', 'skills', 'skill', 'tools', 'tech', 'language', 'languages', 'framework', 'expertise'],
    build: techStack,
  },
  {
    id: 'healthcare',
    strong: ['healthcare', 'health care', 'medical experience', 'clinical'],
    terms: ['medical', 'health', 'hospital', 'patient', 'triage', 'doctor'],
    build: healthcareAi,
  },
  {
    id: 'experience',
    strong: ['work experience', 'what experience', 'where has he worked', 'employment', 'job history'],
    terms: ['experience', 'worked', 'work', 'internship', 'intern', 'employer', 'company', 'role', 'career'],
    build: experienceAnswer,
  },
  {
    id: 'metrics',
    strong: ['measurable results', 'what results', 'metrics', 'numbers', 'accuracy'],
    terms: ['results', 'impact', 'performance', 'percent', 'achievements', 'outcome', 'benchmark'],
    build: metricsAnswer,
  },
  {
    id: 'publication',
    strong: ['published research', 'publication', 'paper', 'journal', 'research'],
    terms: ['publish', 'published', 'article', 'academic'],
    build: publicationAnswer,
  },
  {
    id: 'contact',
    strong: ['how can i contact', 'contact him', 'get in touch', 'email address', 'phone number', 'reach him'],
    terms: ['contact', 'email', 'phone', 'call', 'reach', 'message', 'mail'],
    build: contactAnswer,
  },
  {
    id: 'availability',
    strong: ['is he available', 'open to work', 'looking for a job', 'hiring', 'opportunities', 'available for'],
    terms: ['available', 'availability', 'open', 'vacancy', 'recruit', 'freelance work', 'notice period'],
    build: availabilityAnswer,
  },
  {
    id: 'education',
    strong: ['education', 'degree', 'university', 'college', 'cgpa', 'graduated', 'b.tech', 'btech'],
    terms: ['study', 'studied', 'school', 'gpa', 'karunya', 'academics'],
    build: educationAnswer,
  },
  {
    id: 'certifications',
    strong: ['certifications', 'certificates', 'certification', 'courses'],
    terms: ['certificate', 'certified', 'course', 'training', 'cisco', 'finlatics'],
    build: certificationsAnswer,
  },
  {
    id: 'testing',
    strong: ['testing', 'test automation', 'pytest', 'code coverage', 'qa'],
    terms: ['tests', 'test', 'coverage', 'automation', 'quality'],
    build: testingAnswer,
  },
  {
    id: 'rag',
    strong: ['rag', 'retrieval augmented', 'langgraph', 'multi agent', 'multi-agent', 'agents', 'vector'],
    terms: ['retrieval', 'agent', 'langchain', 'embedding', 'orchestration', 'llm', 'llms'],
    build: ragAnswer,
  },
  {
    id: 'computer-vision',
    strong: ['computer vision', 'yolo', 'yolov11', 'image detection', 'object detection'],
    terms: ['vision', 'cnn', 'image', 'images', 'x ray', 'xray', 'mammogram', 'detection', 'classification'],
    build: computerVisionAnswer,
  },
  {
    id: 'data',
    strong: ['data science', 'data analysis', 'analytics'],
    terms: ['data', 'pandas', 'eda', 'visualization', 'clustering', 'regression', 'analysis'],
    build: dataAnswer,
  },
  {
    id: 'resume',
    strong: ['resume', 'cv', 'download resume'],
    terms: ['pdf', 'download'],
    build: resumeAnswer,
  },
];

/* -------------------------------------------------------------------------- */
/* Project lookup - "tell me about the triage project"                        */
/* -------------------------------------------------------------------------- */

/** Words that carry no signal when matching a project title. */
const TITLE_STOPWORDS = new Set([
  'ai',
  'and',
  'the',
  'using',
  'with',
  'for',
  'a',
  'an',
  'in',
  'of',
  'analysis',
  'powered',
  'based',
  'platform',
  'workflows',
]);

interface ProjectMatch {
  score: number;
  answer: Answer;
}

function matchProject(query: string): ProjectMatch | null {
  let best: ProjectMatch | null = null;

  for (const project of allProjects) {
    const tokens = normalize(project.title)
      .split(' ')
      .filter((token) => token.length > 2 && !TITLE_STOPWORDS.has(token));

    let hits = 0;
    for (const token of new Set(tokens)) {
      if (hasTerm(query, token)) hits += 1;
    }

    // Require at least two distinctive title words so that "python" alone
    // cannot select an arbitrary project.
    if (hits < 2) continue;

    const score = hits * 2;
    if (best && best.score >= score) continue;

    const isFeatured = featuredProjects.some((featured) => featured.id === project.id);
    best = {
      score,
      answer: {
        id: `project:${project.id}`,
        text: `${project.title}. ${project.description}`,
        bullets: isFeatured && project.results ? project.results : undefined,
        links: [
          { label: `Jump to ${project.title}`, target: `project-${project.id}` },
          {
            label: isFeatured ? 'See all featured projects' : 'See more projects',
            target: isFeatured ? 'featured-projects' : 'more-projects',
          },
        ],
        actions: [
          ...(project.github
            ? [{ label: 'View on GitHub', href: project.github, external: true }]
            : []),
          ...(project.demo ? [{ label: 'Open live demo', href: project.demo, external: true }] : []),
        ],
      },
    };
  }

  return best;
}

/* -------------------------------------------------------------------------- */
/* Public entry point                                                         */
/* -------------------------------------------------------------------------- */

export function answerQuestion(rawQuery: string): Answer {
  const query = normalize(rawQuery);
  if (!query) return fallbackAnswer();

  // 1. Safety guard always wins.
  if (isAdviceRequest(query)) return adviceGuardAnswer();

  // 2. Best matching intent.
  let bestIntent: { score: number; intent: Intent } | null = null;
  for (const intent of INTENTS) {
    const score = scoreIntent(query, intent);
    if (score > 0 && (!bestIntent || score > bestIntent.score)) {
      bestIntent = { score, intent };
    }
  }

  // 3. A specific project mentioned by name can outrank a generic intent.
  const projectMatch = matchProject(query);
  if (projectMatch && (!bestIntent || projectMatch.score >= bestIntent.score)) {
    return projectMatch.answer;
  }

  if (bestIntent && bestIntent.score >= CONFIDENCE_THRESHOLD) {
    return bestIntent.intent.build();
  }

  // 4. Nothing confident - say so, do not guess.
  return fallbackAnswer();
}

/* -------------------------------------------------------------------------- */
/* Suggested questions shown as chips before the visitor types                */
/* -------------------------------------------------------------------------- */

export const suggestedQuestions: string[] = [
  'Who is Sebin?',
  'What AI projects has he built?',
  'What is his strongest tech stack?',
  'What experience does he have?',
  'What are his measurable results?',
  'Does he have healthcare AI experience?',
  'Has he published research?',
  'What about RAG and LangGraph?',
  'Tell me about his testing practice',
  'What is his education?',
  'What certifications does he have?',
  'Is he available for opportunities?',
  'How can I contact him?',
];

export const greetingText = `Hi! I can tell you about ${person.name.split(' ')[0]}'s experience, projects, skills, education, and publications.`;

export const disclaimerText =
  'This assistant answers only from the information on this portfolio. It does not use an AI model and does not send your messages anywhere.';
