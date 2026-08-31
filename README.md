# Sebin Sunny - Portfolio

Personal portfolio site for **Sebin Sunny**, AI & Backend Developer.

Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS**. Statically
prerendered, no database, no paid services required. Includes a deterministic,
local-only portfolio assistant ("Ask about Sebin") that answers from approved
profile data without any LLM or API key.

---

## Quick start

Requires **Node.js 18.18 or newer** (built and tested on Node 24 LTS).

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Command             | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                     |
| `npm run build`     | Production build                                       |
| `npm run start`     | Serve the production build locally                     |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)    |
| `npm run typecheck` | `tsc --noEmit`                                         |
| `npm run test`      | Vitest - assistant knowledge-base and grounding tests  |
| `npm run verify`    | Runs lint, typecheck, tests, and build in one go       |

Run `npm run verify` before every deploy.

---

## Editing content

**All site content lives in one file: [`data/profile.ts`](data/profile.ts).**
You should not need to open a component to change what the site says.

| What you want to change            | Where in `data/profile.ts`             |
| ---------------------------------- | -------------------------------------- |
| Name, role line, summary, availability | `person`                           |
| Phone, email, GitHub, LinkedIn     | `contact`                              |
| Profile photo path and availability | `photo`                               |
| Resume file path and availability  | `resume`                               |
| Site URL and SEO description       | `site`                                 |
| About paragraphs and highlights    | `about`                                |
| Work experience timeline           | `experience`                           |
| Degree, institution, CGPA          | `education`                            |
| The three featured projects        | `featuredProjects` (**order matters**) |
| All other projects                 | `moreProjects`                         |
| Project filter buttons             | `projectFilters`                       |
| Skills-in-practice evidence list   | `skillsInPractice`, `skillCategories`  |
| Publication card                   | `publications`                         |
| Certifications list                | `certifications`                       |
| Navigation items                   | `navItems`                             |
| Numbers the assistant may quote    | `metrics`                              |

### Order rule

`featuredProjects` must stay in this order - the two current-resume projects
first, then the job-search project:

1. AI-Powered Symptom Triage Assistant
2. Voice-to-Clinical-Assessment AI Platform
3. AI-Powered Job Search with LangGraph and Multi-Agent Workflows

`moreProjects` begins with Breast Mass Detection and AI-Based Diet and Exercise
Recommendation.

### Adding links and files

Anything set to `null` is simply **not rendered** - never a broken or invented
link. To fill one in:

- **GitHub / LinkedIn** - set `contact.github` / `contact.linkedin` to real URLs.
  Until then the social buttons are hidden entirely.
- **Project repo / demo** - set `github` / `demo` on the project and the button
  appears on that card. A project with neither URL shows no buttons at all.
- **Certificates** - set `url` on a certification to add a "View certificate"
  link.
- **Resume** - drop the PDF at `public/resume/Sebin_Sunny_Resume.pdf`, then set
  `resume.available = true`. Until then every Download Resume control renders as
  a disabled "Resume coming soon" button.
- **Profile photo** - the portrait at `public/images/sebin-sunny.jpg` is shown
  as a circular, ring-outlined image in the hero. Replace that file (or point
  `photo.path` elsewhere and update `photo.width` / `photo.height`) to swap it.
  Set `photo.available = false` to fall back to the initials monogram.

---

## Environment variables

Copy `.env.example` to `.env.local`. **Every variable is optional** - the site
builds and runs correctly with none of them set.

| Variable                          | Effect when unset                                     |
| --------------------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT`  | Contact form opens the visitor's email client instead  |
| `NEXT_PUBLIC_ANALYTICS_ENABLED`   | No analytics script is loaded at all (default)         |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN`    | No analytics script is loaded at all (default)         |

> **Security note:** `NEXT_PUBLIC_*` variables are inlined into the JavaScript
> that ships to every visitor. A Formspree endpoint is a public submission URL
> by design, so it is safe there. **Never put a real API key - especially an LLM
> API key - in a `NEXT_PUBLIC_*` variable or anywhere in `components/`.**

### Contact form

The form validates input, uses a honeypot field plus a minimum-time check to
resist bots, and shows explicit success and error states.

- **With** `NEXT_PUBLIC_FORMSPREE_ENDPOINT` set (e.g.
  `https://formspree.io/f/xxxxxxxx` from a free [formspree.io](https://formspree.io)
  account): the form POSTs there and Sebin receives an email.
- **Without** it: the form opens the visitor's email client with the message
  prefilled, and says so in the fine print. Nothing is sent to a third party.

---

## Chatbot architecture

The assistant lives in [`components/chatbot/`](components/chatbot/):

- `knowledge.ts` - the entire answering engine. Deterministic keyword/intent
  scoring plus project-name lookup, composing answers **only** from
  `data/profile.ts`. No network, no model, no key.
- `Assistant.tsx` - the accessible UI (bottom sheet on mobile, compact panel on
  desktop, focus trap, Escape to close, suggested-question chips).
- `Avatar.tsx` - the original waving-developer SVG avatar.
- `knowledge.test.ts` - 62 tests covering intent routing, project lookup, the
  safety guard, and grounding (that it never invents metrics, jobs, or links,
  and falls back with the approved wording when it does not know).

**To add a new answer:** add the fact to `data/profile.ts`, then add an entry to
the `INTENTS` table in `knowledge.ts` with distinctive `strong` terms and
supporting `terms`. Add a routing test alongside it.

**To add a server-side LLM later:** keep `answerQuestion()` as the fast local
path, and add a `app/api/assistant/route.ts` Route Handler that the UI calls
only when the local answer is `fallback`. The API key then lives in a
server-only env var (no `NEXT_PUBLIC_` prefix) and never reaches the browser.

---

## Deploying to Vercel (free)

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
3. **Import** the repository. Vercel detects Next.js automatically - leave the
   build command (`next build`), output directory, and install command at their
   defaults.
4. *(Optional)* Under **Environment Variables**, add
   `NEXT_PUBLIC_FORMSPREE_ENDPOINT` if you are using Formspree.
5. Click **Deploy**. You get a public URL like
   `https://<project-name>.vercel.app`.
6. **Update `site.url` in `data/profile.ts`** to that URL and push again - this
   fixes the canonical tag, Open Graph URL, and `sitemap.xml`.
7. *(Optional)* Add a custom domain under **Settings → Domains**.

Every later `git push` to `main` redeploys automatically.

### Netlify (alternative)

1. Push to GitHub as above.
2. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an
   existing project** → pick the repo.
3. Build command `npm run build`, and install the official
   **`@netlify/plugin-nextjs`** plugin (Netlify usually offers this
   automatically for Next.js projects).
4. Add any environment variables under **Site settings → Environment
   variables**, then deploy.

---

## Accessibility and motion

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`,
  and `aria-labelledby` on every section.
- Skip-to-content link, visible focus rings on every interactive element, and
  44px minimum touch targets.
- The assistant panel is a proper `role="dialog"` with `aria-modal`, a focus
  trap, Escape-to-close, and a live-region transcript.
- Filters use `aria-pressed` and announce results via a live region.
- All decorative visuals (neuron-network background, avatar, icons) are `aria-hidden`.
- `prefers-reduced-motion: reduce` disables every animation, transition, and
  smooth scroll globally - including the hero circuit pulse and Framer Motion
  entrances.

## Project structure

```
app/
  layout.tsx        Metadata, fonts, JSON-LD, background, analytics
  page.tsx          Section composition
  globals.css       Theme tokens, glass cards, buttons, reduced-motion rules
  robots.ts         robots.txt
  sitemap.ts        sitemap.xml
  icon.svg          Favicon
components/         One component per section, plus chatbot/
data/profile.ts     >>> ALL CONTENT LIVES HERE <<<
lib/                useActiveSection hook
public/images/      Profile photo
public/resume/      Resume PDF
```
