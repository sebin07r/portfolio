import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { person, site } from '@/data/profile';
import Analytics from '@/components/Analytics';
import CircuitBackground from '@/components/CircuitBackground';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${person.name}`,
  },
  description: site.description,
  applicationName: `${person.name} Portfolio`,
  authors: [{ name: person.name }],
  creator: person.name,
  keywords: [
    person.name,
    'AI developer',
    'Backend developer',
    'Python',
    'FastAPI',
    'LangGraph',
    'LangChain',
    'RAG',
    'Machine learning',
    'Portfolio',
  ],
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: `${person.name} - Portfolio`,
    title: site.title,
    description: site.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
};

/** Structured data so search engines understand who this page is about. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  jobTitle: person.shortRole,
  description: person.summary,
  url: site.url,
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Karunya Institute of Technology and Sciences',
  },
  knowsAbout: ['Artificial Intelligence', 'Backend Development', 'Python', 'FastAPI', 'LangGraph', 'RAG'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          // Static, developer-authored JSON-LD - no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <CircuitBackground />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
