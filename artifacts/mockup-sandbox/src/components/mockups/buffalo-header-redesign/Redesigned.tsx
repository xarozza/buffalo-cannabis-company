import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

import './_group.css';

const logo = '/__mockup/images/buffalo-company-logo.png';

function SocialIcons() {
  return (
    <div className="bcc-socials" aria-label="Social media">
      <a className="bcc-social" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" /></svg>
      </a>
      <a className="bcc-social" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 7.1a6.1 6.1 0 0 1-3.8-1.3v8.1a6.3 6.3 0 1 1-5.4-6.2v3.3a3 3 0 1 0 2.1 2.9V2h3.3c.2 2 1.6 3.6 3.8 4v1.1Z" /></svg>
      </a>
      <a className="bcc-social" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" /></svg>
      </a>
    </div>
  );
}

function RedesignedHeader() {
  const [open, setOpen] = useState(false);
  const nav = [
    ['Our Story', '/#about'],
    ['Seed → Sale', '/#seed-to-sale'],
    ['Journal', '/journal'],
    ['Contact', '/#contact'],
  ];

  return (
    <header className="bcc-new-header">
      <a className="bcc-new-brand" href="/" aria-label="Buffalo Cannabis Company home">
        <img src={logo} alt="Buffalo Cannabis Company logo" />
      </a>
      <button
        className="bcc-new-toggle"
        type="button"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={`bcc-new-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
        {nav.map(([label, href]) => <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>)}
        <div className="bcc-new-actions">
          <SocialIcons />
          <a className="bcc-new-cta" href="/#vault">Explore The Vault <ArrowRight size={15} /></a>
        </div>
      </nav>
    </header>
  );
}

function RedesignedFooter() {
  return (
    <footer className="bcc-new-footer">
      <a className="bcc-new-footer-brand" href="/" aria-label="Buffalo Cannabis Company home">
        <img src={logo} alt="Buffalo Cannabis Company logo" />
      </a>
      <p className="bcc-new-license">NY Microbusiness License #MB-000000<br />Cultivation #C-000000</p>
      <SocialIcons />
      <a className="bcc-new-legal" href="/legal">Legal &amp; Safety</a>
      <small>© 2026 Buffalo Cannabis Company</small>
    </footer>
  );
}

export function Redesigned() {
  return (
    <div className="bcc-preview bcc-redesigned">
      <RedesignedHeader />
      <main className="bcc-new-hero">
        <div>
          <span className="bcc-kicker">Buffalo, New York · Independent by nature</span>
          <h1>Grown in Buffalo,<br /><span>Made for New York.</span></h1>
          <p>The same logo now sits on an uninterrupted, exact-color surface.</p>
        </div>
        <div className="bcc-logo-stage">
          <img src={logo} alt="Buffalo Cannabis Company logo" />
        </div>
      </main>
      <RedesignedFooter />
    </div>
  );
}

