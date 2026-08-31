import Script from 'next/script';

/**
 * Privacy-friendly analytics - OFF by default.
 *
 * Nothing is loaded, and no request is made, unless BOTH of these are set in
 * the deployment environment:
 *
 *   NEXT_PUBLIC_ANALYTICS_ENABLED="true"
 *   NEXT_PUBLIC_ANALYTICS_DOMAIN="your-domain.com"
 *
 * Plausible is cookieless and does not collect personal data, so no consent
 * banner is required. Swap the src if you prefer a different provider.
 */
export default function Analytics() {
  const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;

  if (!enabled || !domain) return null;

  return <Script defer data-domain={domain} src="https://plausible.io/js/script.js" />;
}
