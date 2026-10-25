import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

import './_group.css';

const logo = '/__mockup/images/buffalo-company-logo.png';

function CurrentHeader() {
  const [open, setOpen] = useState(false);
  const nav = [
    ['Our Story', '/#about'],
    ['Seed → Sale', '/#seed-to-sale'],
    ['The Vault', '/#vault'],
    ['Journal', '/journal'],
    ['Contact', '/#contact'],
  ];

  return (
    <header className="bcc-current-header">
      <a className="bcc-current-brand" href="/" aria-label="Buffalo Cannabis Company home">
        <img src={logo} alt="Buffalo Cannabis Company logo" />
      </a>
      <button
        className="bcc-current-toggle"
        type="button"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={`bcc-current-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
        {nav.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
        <a className="bcc-current-cta" href="/#vault">Explore The Vault <ArrowRight size={14} /></a>
      </nav>
    </header>
  );
}

function CurrentFooter() {
  return (
    <footer className="bcc-current-footer">
      <div className="bcc-current-footer-brand">
        <img src={logo} alt="Buffalo Cannabis Company logo" />
        <span>Grown in Buffalo. Made for New York.</span>
        <small>NY Microbusiness License #MB-000000<br />Cultivation #C-000000</small>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/#about">Our story</a>
        <a href="/#seed-to-sale">Seed → Sale</a>
        <a href="/#vault">The Vault</a>
        <a href="/journal">Journal</a>
        <a href="/legal">Legal &amp; safety</a>
      </nav>
      <small>© 2026 Buffalo Cannabis Company<br />For adults 21+ · Please consume responsibly</small>
    </footer>
  );
}

export function Current() {
  return (
    <div className="bcc-preview bcc-current">
      <CurrentHeader />
      <main className="bcc-mini-hero">
        <div>
          <span className="bcc-kicker">Buffalo, New York · Independent by nature</span>
          <h1>Grown in Buffalo,<br />Made for New York.</h1>
          <p>A local cannabis microbusiness, built by a Buffalo native and rooted in the city that raised him.</p>
        </div>
        <div className="bcc-current-logo-stage">
          <img src={logo} alt="Buffalo Cannabis Company logo" />
        </div>
      </main>
      <CurrentFooter />
    </div>
  );
}

