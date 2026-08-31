import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { contact, person } from '@/data/profile';
import ContactForm from './ContactForm';
import Reveal from './Reveal';
import ResumeButton from './ResumeButton';
import SectionHeading from './SectionHeading';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <SectionHeading
        id="contact-heading"
        eyebrow="Contact"
        title="Get in touch"
        description={person.availability + '. The fastest route is email or a direct call.'}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr,1.15fr]">
        <Reveal>
          <div className="space-y-4">
            <a href={contact.emailHref} className="glass-card glass-card-hover flex items-center gap-4 p-5">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-400/30 bg-accent-500/10 text-accent-400"
              >
                <Mail className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </span>
                <span className="block truncate text-sm font-medium text-slate-100">{contact.email}</span>
              </span>
            </a>

            <a href={contact.phoneHref} className="glass-card glass-card-hover flex items-center gap-4 p-5">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-400/30 bg-accent-500/10 text-accent-400"
              >
                <Phone className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Phone
                </span>
                <span className="block text-sm font-medium text-slate-100">{contact.phone}</span>
              </span>
            </a>

            {/* Social links render only once real URLs are set in data/profile.ts */}
            {contact.github || contact.linkedin ? (
              <div className="flex flex-wrap gap-3">
                {contact.github ? (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github aria-hidden="true" className="h-4 w-4" />
                    <span>
                      GitHub<span className="sr-only"> profile (opens in a new tab)</span>
                    </span>
                  </a>
                ) : null}
                {contact.linkedin ? (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Linkedin aria-hidden="true" className="h-4 w-4" />
                    <span>
                      LinkedIn<span className="sr-only"> profile (opens in a new tab)</span>
                    </span>
                  </a>
                ) : null}
              </div>
            ) : null}

            <ResumeButton variant="secondary" className="w-full sm:w-auto" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
