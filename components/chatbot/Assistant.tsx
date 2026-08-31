'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ExternalLink, Info, Send, X } from 'lucide-react';
import {
  answerQuestion,
  disclaimerText,
  greetingText,
  suggestedQuestions,
  type Answer,
} from './knowledge';
import Avatar from './Avatar';

interface Message {
  key: string;
  role: 'assistant' | 'user';
  text: string;
  bullets?: string[];
  links?: Answer['links'];
  actions?: Answer['actions'];
}

let messageCounter = 0;
const nextKey = () => `m${(messageCounter += 1)}`;

/** Scrolls to a section or project card, honouring reduced-motion. */
function scrollToTarget(target: string) {
  const element = document.getElementById(target);
  if (!element) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { key: 'greeting', role: 'assistant', text: greetingText },
  ]);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const titleId = useId();

  const ask = useCallback((question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const answer = answerQuestion(trimmed);
    setMessages((current) => [
      ...current,
      { key: nextKey(), role: 'user', text: trimmed },
      {
        key: nextKey(),
        role: 'assistant',
        text: answer.text,
        bullets: answer.bullets,
        links: answer.links,
        actions: answer.actions,
      },
    ]);
    setInput('');
    setShowSuggestions(false);
  }, []);

  // Move focus into the panel when it opens, and back to the opener on close.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      openerRef.current?.focus();
    }
  }, [open]);

  // Escape to close, plus a focus trap across the panel's tabbable elements.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    if (open) logEndRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, open]);

  return (
    <>
      {/* Floating opener */}
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full border border-accent-400/40 bg-night-900/95 py-2.5 pl-2.5 pr-4 text-sm font-semibold text-slate-100 shadow-glow backdrop-blur transition-transform hover:scale-[1.03] hover:border-accent-400/70 sm:right-6 ${
          open ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-500/15">
          <Avatar className="h-7 w-7" />
        </span>
        <span>Ask about Sebin</span>
      </button>

      {/* Panel */}
      {open ? (
        <>
          {/* Backdrop - mobile only, so the desktop panel stays non-blocking */}
          <div
            className="fixed inset-0 z-40 bg-night-950/60 backdrop-blur-sm sm:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-2xl border border-white/10 bg-night-900/98 shadow-card backdrop-blur-md sm:inset-x-auto sm:bottom-5 sm:right-6 sm:max-h-[min(38rem,80vh)] sm:w-[24rem] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-500/15">
                <Avatar className="h-8 w-8" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="text-sm font-semibold text-slate-50">
                  Ask about Sebin
                </h2>
                <p className="text-xs text-slate-400">Portfolio assistant</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:text-slate-100"
              >
                <X aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">Close assistant</span>
              </button>
            </div>

            {/* Transcript */}
            <div
              role="log"
              aria-live="polite"
              aria-label="Conversation"
              className="flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((message) => (
                <div
                  key={message.key}
                  className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-accent-500 text-night-950'
                        : 'border border-white/10 bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <p className="whitespace-pre-line">
                      <span className="sr-only">{message.role === 'user' ? 'You said: ' : 'Assistant: '}</span>
                      {message.text}
                    </p>

                    {message.bullets && message.bullets.length > 0 ? (
                      <ul className="mt-2.5 space-y-1.5">
                        {message.bullets.map((bullet) => (
                          <li key={bullet.slice(0, 32)} className="flex gap-2 text-[13px]">
                            <span
                              aria-hidden="true"
                              className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent-400"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {message.links && message.links.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {message.links.map((link) => (
                          <button
                            key={link.target + link.label}
                            type="button"
                            onClick={() => {
                              scrollToTarget(link.target);
                              setOpen(false);
                            }}
                            className="rounded-full border border-accent-400/30 bg-accent-500/10 px-2.5 py-1 text-[11px] font-medium text-accent-400 transition-colors hover:bg-accent-500/20"
                          >
                            {link.label}
                          </button>
                        ))}
                      </div>
                    ) : null}

                    {message.actions && message.actions.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {message.actions.map((action) => (
                          <a
                            key={action.href + action.label}
                            href={action.href}
                            {...(action.external
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition-colors hover:border-accent-400/50"
                          >
                            {action.external ? (
                              <ExternalLink aria-hidden="true" className="h-3 w-3" />
                            ) : null}
                            <span>
                              {action.label}
                              {action.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                            </span>
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {/* Suggested questions */}
              {showSuggestions ? (
                <div className="pt-1">
                  <p className="mb-2 text-xs font-medium text-slate-500">Try one of these:</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {suggestedQuestions.map((question) => (
                      <li key={question}>
                        <button
                          type="button"
                          onClick={() => ask(question)}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-accent-400/40 hover:text-accent-400"
                        >
                          {question}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div ref={logEndRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                ask(input);
              }}
              className="border-t border-white/10 p-3"
            >
              <div className="flex gap-2">
                <label htmlFor="assistant-input" className="sr-only">
                  Ask a question about Sebin
                </label>
                <input
                  id="assistant-input"
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about projects, skills, experience..."
                  autoComplete="off"
                  className="min-h-[44px] flex-1 rounded-xl border border-white/10 bg-night-950/60 px-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-accent-400/60"
                />
                <button
                  type="submit"
                  disabled={input.trim().length === 0}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500 text-night-950 transition-colors hover:bg-accent-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500"
                >
                  <Send aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">Send question</span>
                </button>
              </div>

              <p className="mt-2.5 flex items-start gap-1.5 text-[11px] leading-snug text-slate-500">
                <Info aria-hidden="true" className="mt-px h-3 w-3 shrink-0" />
                <span>{disclaimerText}</span>
              </p>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
}
