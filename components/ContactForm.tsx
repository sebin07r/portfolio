'use client';

import { useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react';
import { contact } from '@/data/profile';

/**
 * Contact form.
 *
 * Submission strategy is decided by one PUBLIC environment variable:
 *
 *   NEXT_PUBLIC_FORMSPREE_ENDPOINT="https://formspree.io/f/xxxxxxxx"
 *
 * When it is set the form POSTs there. When it is not, the form falls back to
 * opening the visitor's mail client with a prefilled message. Formspree
 * endpoints are public submission URLs by design - there is no secret key here,
 * and no API key of any kind belongs in this file.
 */
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? '';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: { name: string; email: string; subject: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.subject.trim().length < 3) errors.subject = 'Please add a short subject.';
  if (values.message.trim().length < 20) {
    errors.message = 'Please write at least 20 characters so I know what you need.';
  }
  return errors;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [usedMailto, setUsedMailto] = useState(false);

  /** Spam heuristic: real people do not submit a form in under 3 seconds. */
  const mountedAt = useRef(Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot - hidden from humans, frequently filled in by bots.
    if (String(data.get('company') ?? '').length > 0) {
      setStatus('success'); // Silently accept, do not tell the bot.
      form.reset();
      return;
    }

    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      subject: String(data.get('subject') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      setFormError('Please fix the highlighted fields and try again.');
      return;
    }

    if (Date.now() - mountedAt.current < 3000) {
      setStatus('error');
      setFormError('That was quick! Please take a moment and submit again.');
      return;
    }

    setFormError(null);
    setStatus('submitting');

    // No Formspree endpoint configured - fall back to a prefilled email.
    if (!FORMSPREE_ENDPOINT) {
      const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
      window.location.href = `${contact.emailHref}?subject=${encodeURIComponent(
        values.subject,
      )}&body=${encodeURIComponent(body)}`;
      setUsedMailto(true);
      setStatus('success');
      return;
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

      setUsedMailto(false);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setFormError(
        `Something went wrong sending that. Please email ${contact.email} directly and it will reach me.`,
      );
    }
  }

  const inputClasses =
    'w-full rounded-xl border border-white/10 bg-night-950/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 transition-colors focus:border-accent-400/60';

  if (status === 'success') {
    return (
      <div role="status" className="glass-card flex gap-4 p-6">
        <CheckCircle2 aria-hidden="true" className="h-6 w-6 shrink-0 text-accent-400" />
        <div>
          <h3 className="text-base font-semibold text-slate-100">
            {usedMailto ? 'Your email client should be open' : 'Message sent'}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {usedMailto
              ? `If nothing opened, email ${contact.email} directly and your message will still reach Sebin.`
              : 'Thanks for reaching out. Sebin will get back to you as soon as possible.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setUsedMailto(false);
              mountedAt.current = Date.now();
            }}
            className="btn-secondary mt-5"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card space-y-4 p-5 sm:p-6">
      {/* Honeypot: visually hidden, hidden from assistive tech, ignored by humans. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="company">Company (leave this empty)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClasses}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-xs text-rose-400">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClasses}
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-xs text-rose-400">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-300">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="What is this about?"
          aria-invalid={errors.subject ? 'true' : undefined}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={inputClasses}
        />
        {errors.subject ? (
          <p id="subject-error" className="mt-1.5 text-xs text-rose-400">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="A few lines about the role, project, or question."
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputClasses} resize-y`}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-xs text-rose-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div aria-live="polite">
        {formError ? (
          <p className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-300">
            <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{formError}</span>
          </p>
        ) : null}
      </div>

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto">
        {status === 'submitting' ? (
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
        ) : (
          <Send aria-hidden="true" className="h-4 w-4" />
        )}
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>

      <p className="text-xs text-slate-500">
        {FORMSPREE_ENDPOINT
          ? 'Your message is delivered by Formspree, a third-party form service.'
          : 'This form opens your own email client with the message prefilled - nothing is sent to a third party.'}
      </p>
    </form>
  );
}
