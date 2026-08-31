import { describe, expect, it } from 'vitest';
import {
  FALLBACK_TEXT,
  answerQuestion,
  normalize,
  suggestedQuestions,
} from './knowledge';
import { certifications, experience, metrics, publications } from '@/data/profile';

describe('normalize', () => {
  it('lowercases and strips punctuation', () => {
    expect(normalize('  Who IS Sebin??  ')).toBe('who is sebin');
  });

  it('keeps characters that matter to tech names', () => {
    expect(normalize('C++ and C#')).toBe('c++ and c#');
  });
});

describe('required suggested questions', () => {
  const required = [
    'Who is Sebin?',
    'What AI projects has he built?',
    'What is his strongest tech stack?',
    'Does he have healthcare AI experience?',
    'What experience does he have?',
    'What are his measurable results?',
    'Has he published research?',
    'How can I contact him?',
    'Is he available for opportunities?',
  ];

  it.each(required)('offers "%s" as a suggestion', (question) => {
    expect(suggestedQuestions).toContain(question);
  });

  it.each(required)('answers "%s" without falling back', (question) => {
    const answer = answerQuestion(question);
    expect(answer.id).not.toBe('fallback');
    expect(answer.text.length).toBeGreaterThan(20);
  });
});

describe('intent routing', () => {
  const cases: [string, string][] = [
    ['Who is Sebin?', 'who'],
    ['tell me about him', 'who'],
    ['What AI projects has he built?', 'projects'],
    ['what has he built', 'projects'],
    ['What is his strongest tech stack?', 'stack'],
    ['which technologies does he know', 'stack'],
    ['Does he have healthcare AI experience?', 'healthcare'],
    ['any clinical work?', 'healthcare'],
    ['What experience does he have?', 'experience'],
    ['where has he worked before', 'experience'],
    ['What are his measurable results?', 'metrics'],
    ['Has he published research?', 'publication'],
    ['did he publish a paper', 'publication'],
    ['How can I contact him?', 'contact'],
    ['what is his email address', 'contact'],
    ['Is he available for opportunities?', 'availability'],
    ['what is his education', 'education'],
    ['what certifications does he have', 'certifications'],
    ['tell me about his testing practice', 'testing'],
    ['does he know langgraph', 'rag'],
    ['has he done computer vision', 'computer-vision'],
    ['what about data science', 'data'],
    ['can I get his resume', 'resume'],
    ['hello there', 'greeting'],
  ];

  it.each(cases)('routes %s -> %s', (question, expectedId) => {
    expect(answerQuestion(question).id).toBe(expectedId);
  });
});

describe('project lookup', () => {
  it('finds a featured project by name', () => {
    expect(answerQuestion('tell me about the symptom triage assistant').id).toBe('project:symptom-triage');
  });

  it('finds a more-projects entry by name', () => {
    expect(answerQuestion('what is the breast mass detection project').id).toBe('project:breast-mass-yolo');
  });

  it('links to the matching project card', () => {
    const answer = answerQuestion('voice clinical assessment platform');
    expect(answer.links?.some((link) => link.target === 'project-voice-clinical')).toBe(true);
  });
});

describe('grounding - the assistant never invents', () => {
  it('falls back with the exact approved wording when it does not know', () => {
    const answer = answerQuestion('what is his favourite football team');
    expect(answer.id).toBe('fallback');
    expect(answer.text).toBe(FALLBACK_TEXT);
  });

  it('falls back on empty input', () => {
    expect(answerQuestion('   ').id).toBe('fallback');
  });

  it('falls back rather than guessing on unrelated topics', () => {
    for (const question of ['what is the weather', 'tell me a joke', 'who won the world cup']) {
      expect(answerQuestion(question).id).toBe('fallback');
    }
  });

  it('never claims a salary, start date, or work authorization', () => {
    const answer = answerQuestion('Is he available for opportunities?');
    const text = `${answer.text} ${(answer.bullets ?? []).join(' ')}`.toLowerCase();
    for (const forbidden of ['salary', 'visa', 'work authorization', 'start date', 'notice period']) {
      expect(text).not.toContain(forbidden);
    }
  });

  it('only reports metrics that exist in the profile data', () => {
    const answer = answerQuestion('What are his measurable results?');
    expect(answer.bullets).toHaveLength(metrics.length);
    for (const metric of metrics) {
      expect(answer.bullets?.some((bullet) => bullet.includes(metric.value))).toBe(true);
    }
  });

  it('only reports the two approved work-experience entries', () => {
    const answer = answerQuestion('What experience does he have?');
    expect(answer.bullets).toHaveLength(experience.length);
    expect(answer.bullets?.[0]).toContain('June 2026 - Present');
    expect(answer.bullets?.[1]).toContain('Iziel Healthcare');
  });

  it('reports every certification and no others', () => {
    const answer = answerQuestion('what certifications does he have');
    expect(answer.bullets).toHaveLength(certifications.length);
  });

  it('gives the real publication link', () => {
    const answer = answerQuestion('Has he published research?');
    expect(answer.actions?.[0]?.href).toBe(publications[0].url);
    expect(answer.actions?.[0]?.external).toBe(true);
  });

  it('never produces a placeholder "#" link', () => {
    for (const question of [...suggestedQuestions, 'symptom triage', 'lstm stock predictor']) {
      const answer = answerQuestion(question);
      for (const action of answer.actions ?? []) {
        expect(action.href).not.toBe('#');
        expect(action.href.length).toBeGreaterThan(1);
      }
    }
  });
});

describe('safety guard', () => {
  const unsafe = [
    'can you diagnose me',
    'do I have pneumonia',
    'should I invest in this',
    'I need legal advice',
    'should I hire him instead of someone else',
  ];

  it.each(unsafe)('refuses advice for "%s"', (question) => {
    const answer = answerQuestion(question);
    expect(answer.id).toBe('advice-guard');
    expect(answer.text).toContain("can't give medical, investment, hiring, or legal advice");
  });

  it('still offers a way to reach Sebin when it refuses', () => {
    const answer = answerQuestion('can you diagnose me');
    expect(answer.actions?.length).toBeGreaterThan(0);
  });
});
