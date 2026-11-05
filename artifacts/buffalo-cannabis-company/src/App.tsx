import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
  Link,
} from "wouter";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "@assets/logo_1792887389023.png";
import blitzImage from "@assets/buffalo-blitz_1792887389023.jpeg";
import mafiaImage from "@assets/budz-mafia_1792887389023.jpeg";
import queenImage from "@assets/queen-city-cake_1792887389023.jpeg";

const queryClient = new QueryClient();
const SITE_URL = import.meta.env.VITE_SITE_URL || "";

type SeoData = {
  title: string;
  description: string;
  path: string;
  type?: string;
  article?: boolean;
};
const seoByPath: Record<string, SeoData> = {
  "/": {
    title: "Buffalo Cannabis Company | Grown in Buffalo, Made for New York",
    description:
      "Meet Buffalo Cannabis Company, a founder-led New York cannabis microbusiness rooted in Buffalo. Explore our Seed → Sale story and The Vault.",
    path: "/",
  },
  "/legal": {
    title: "Legal & Safety Information | Buffalo Cannabis Company",
    description:
      "Age requirements, license placeholders, responsible use and New York HOPEline information for Buffalo Cannabis Company visitors.",
    path: "/legal",
  },
  "/journal": {
    title: "The Journal | Buffalo Cannabis Company",
    description:
      "Notes on Buffalo seed-to-sale cannabis and a thoughtful introduction to New York craft cannabis from Buffalo Cannabis Company.",
    path: "/journal",
  },
  "/journal/buffalo-seed-to-sale": {
    title: "Buffalo Seed to Sale | Buffalo Cannabis Company Journal",
    description:
      "A look at Buffalo Cannabis Company’s founder-led, local Seed → Sale approach at 501 Amherst Street in Buffalo, New York.",
    path: "/journal/buffalo-seed-to-sale",
    type: "article",
    article: true,
  },
  "/journal/new-york-craft-cannabis": {
    title: "A Guide to New York Craft Cannabis | Buffalo Cannabis Company",
    description:
      "A careful, general introduction to craft cannabis in New York, with practical context for adults and no assumptions about individual products.",
    path: "/journal/new-york-craft-cannabis",
    type: "article",
    article: true,
  },
};

function Seo({ data }: { data: SeoData }) {
  useEffect(() => {
    document.title = data.title;
    const upsert = (selector: string, attributes: Record<string, string>) => {
      let node = document.head.querySelector(selector) as
        | HTMLMetaElement
        | HTMLLinkElement
        | null;
      if (!node) {
        node = document.createElement(
          selector.startsWith("link") ? "link" : "meta",
        );
        document.head.appendChild(node);
      }
      Object.entries(attributes).forEach(([key, value]) =>
        node?.setAttribute(key, value),
      );
    };
    const url = SITE_URL
      ? `${SITE_URL.replace(/\/$/, "")}${data.path}`
      : data.path;
    upsert('meta[name="description"]', {
      name: "description",
      content: data.description,
    });
    upsert('link[rel="canonical"]', { rel: "canonical", href: url });
    upsert('meta[property="og:title"]', {
      property: "og:title",
      content: data.title,
    });
    upsert('meta[property="og:description"]', {
      property: "og:description",
      content: data.description,
    });
    upsert('meta[property="og:url"]', { property: "og:url", content: url });
    upsert('meta[property="og:type"]', {
      property: "og:type",
      content: data.type || "website",
    });
    upsert('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary",
    });
    upsert('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: data.title,
    });
    upsert('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: data.description,
    });
    let script = document.getElementById("page-structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "page-structured-data";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    if (data.article) {
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title.split("|")[0].trim(),
        description: data.description,
        mainEntityOfPage: url,
        publisher: {
          "@type": "Organization",
          name: "Buffalo Cannabis Company",
        },
      });
    } else if (data.path === "/") {
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Buffalo Cannabis Company",
        description:
          "A licensed New York cannabis microbusiness rooted in Buffalo.",
        email: "chrisbrown@buffalocannabiscompany.com",
        telephone: "716-339-2103",
        address: {
          "@type": "PostalAddress",
          streetAddress: "501 Amherst Street",
          addressLocality: "Buffalo",
          addressRegion: "NY",
        },
      });
    } else script.textContent = "";
  }, [data]);
  return null;
}

const products = [
  {
    name: "Buffalo Blitz",
    type: "Indica-Dominant Hybrid",
    profile: "Sharp Citrus, Loud Gas, Earthy Pine",
    description:
      "Engineered for the 716. Buffalo Blitz charges out of the gate with an intense, uplifting cerebral buzz and a heavy gassy nose that completely fills the room. Grown under dialed-in indoor hydro setups at Amherst Street, this phenotype stacks dense, resin-coated buds frosted over with brilliant white trichomes.",
    image: blitzImage,
    width: 768,
    height: 1024,
    alt: "Close-up photograph of frosty Buffalo Blitz cannabis flower",
  },
  {
    name: "Budz Mafia",
    type: "Indica-Dominant Hybrid",
    profile: "Deep Earth, Spicy Pepper, Creamy Gas",
    description:
      "An absolute heavyweight in the Pheno Vault. Budz Mafia is built for the true connoisseur, delivering an incredibly smooth smoke followed by a deeply relaxing, full-body calm. This phenotype is a standout under our lights, producing rock-hard, dark purple buds completely covered in a sticky layer of crystalline trichomes.",
    image: mafiaImage,
    width: 768,
    height: 1024,
    alt: "Close-up photograph of a resin-coated Budz Mafia cannabis flower",
  },
  {
    name: "Queen City Quake",
    type: "Balanced 50/50 Hybrid",
    profile: "Sweet Berry, Doughy Vanilla, Sour Gas",
    description:
      "A true earth-shaking phenotype designed to rattle the senses. Queen City Quake perfectly bridges the gap, offering a mouth-watering explosion of sweet, doughy terps followed by a perfectly balanced, long-lasting wave of euphoria. It stacks beautifully in our clean-rooms, flashing vibrant orange hairs and a dense coat of frosty resin.",
    image: queenImage,
    width: 598,
    height: 1024,
    alt: "Photograph of Queen City Quake flower held against a leafy background",
  },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  const items = [
    { href: "/#about", label: "Our Story" },
    { href: "/#seed-to-sale", label: "Seed → Sale" },
    { href: "/journal", label: "Journal" },
    { href: "/#contact", label: "Contact" },
  ];
  return (
    <header className="topbar wrap">
      <Link
        href="/"
        className="brand"
        aria-label="Buffalo Cannabis Company home"
      >
        <img
          src={logo}
          width="1024"
          height="1024"
          alt="Buffalo Cannabis Company logo"
        />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav
        className={`nav-links${open ? " open" : ""}`}
        aria-label="Main navigation"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-testid={`link-nav-${item.label.toLowerCase().replaceAll(" ", "-")}`}
          >
            {item.label}
          </Link>
        ))}
        <button
          className="nav-cta"
          type="button"
          onClick={() =>
            document
              .getElementById("vault")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore The Vault
        </button>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <img
                src={logo}
                width="1024"
                height="1024"
                alt="Buffalo Cannabis Company logo"
              />
            </Link>
            <p>Grown in Buffalo. Made for New York.</p>
            <p>
              NY Microbusiness License #MB-000000
              <br />
              Cultivation #C-000000
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/legal">Legal & safety</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Buffalo Cannabis Company</span>
          <span>For adults 21+ · Please consume responsibly</span>
        </div>
      </div>
    </footer>
  );
}

function AgeGate({ onEnter }: { onEnter: () => void }) {
  return (
    <div
      className="age-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-title"
    >
      <div className="age-panel">
        <img
          src={logo}
          width="1024"
          height="1024"
          alt="Buffalo Cannabis Company logo"
        />
        <h2 id="age-title">
          Welcome to Buffalo Cannabis Company. You must be 21 or older to enter
          The Vault.
        </h2>
        <div className="age-actions">
          <button
            className="button button-light"
            type="button"
            onClick={() => {
              window.location.href = "https://www.google.com/";
            }}
          >
            LEAVE SITE
          </button>
          <button
            className="button button-dark"
            type="button"
            onClick={onEnter}
          >
            I AM 21+
          </button>
        </div>
        <p className="age-small">For adults 21 years of age and older.</p>
      </div>
    </div>
  );
}

function NewsletterModal({ close }: { close: () => void }) {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(
      "Thanks for your interest. This form is a preview and does not send your email.",
    );
  };
  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <section
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
      >
        <button
          className="modal-close"
          type="button"
          aria-label="Close newsletter dialog"
          onClick={close}
        >
          <X />
        </button>
        <span className="eyebrow">A note from us</span>
        <h2 id="newsletter-tcitle">Stay in the loop.</h2>
        <p>
          Occasional updates & new stuff - just for you. 
        </p>
        <br/>
        <form className="form" onSubmit={submit}>
          <label htmlFor="newsletter-email">
            Email address
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <button className="button button-dark" type="submit">
            Sign up <ArrowRight size={15} />
          </button>
          <p className="form-message" role="status">
            {message}
          </p>
        </form>
      </section>
    </div>
  );
}

function Home() {
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  useEffect(() => {
    let timer: number | undefined;
    const schedule = () => {
      timer = window.setTimeout(() => setNewsletterOpen(true), 3000);
    };
    if (sessionStorage.getItem("bcc-age-confirmed") === "yes") schedule();
    window.addEventListener("bcc-age-confirmed", schedule);
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("bcc-age-confirmed", schedule);
    };
  }, []);
  const contactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactMessage(
      "Thank you. This contact form is a preview and does not send your message. Please use the email address or phone number shown.",
    );
  };
  return (
    <div className="site-shell">
      <Seo data={seoByPath["/"]} />
      <Header />
      <main>
        <section className="hero wrap">
          <div>
            <div className="eyebrow">
              Buffalo, New York · Born & Bred
            </div>
            <h1>
              Grown in Buffalo,
              <br/>
              <span>Made for New York.</span>
            </h1>
            <p className="hero-copy">
              A local cannabis microbusiness, built by a Buffalo native and
              rooted in the city that raised him.
            </p>
            <a className="button button-dark" href="#vault">
              Explore The Vault <ArrowRight size={16} />
            </a>
          </div>
          <div className="hero-art">
            <img
              src={logo}
              width="1024"
              height="1024"
              alt="Buffalo Cannabis Company buffalo emblem and logo"
              fetchPriority="high"
            />
          </div>
        </section>
        <div className="marquee">
          A Buffalo business · A New York microbusiness · Every step, under one
          roof
        </div>
        <section className="section wrap" id="about">
          <div className="about-grid">
            <div>
              <div className="section-label">About us</div>
              <h2>
                Our Story...
              </h2>
            </div>
            <div className="about-copy">
              <p>
                <strong>
                  Chris is a 716 native, born and raised in the
                  queen city.
                </strong>{" "}
                He understands the tight-knit, hard-working community that makes
                Buffalo what it is - and he’s building a local business with
                that same local pride.
              </p>
              <p>
                Buffalo Cannabis Company is a licensed New York cannabis
                microbusiness with a simple point of view: make it here, take
                care with every step, and keep our roots close to home.
              </p>
              <div className="founder-note">
                Chris <span>— Founder, Buffalo native</span>
              </div>
            </div>
          </div>
        </section>
        <section className="section process" id="seed-to-sale">
          <div className="wrap">
            <div className="process-head">
              <div>
                <div className="section-label">Our process</div>
                <h2>
                  Seed → Sale.
                  <br />
                  All in Buffalo.
                </h2>
              </div>
              <p>
                As a licensed New York micro-business, we handle every single
                step of the process right here in Buffalo under one roof at 501
                Amherst Street. From the moment the seed sprouts to the second
                it’s handed over our retail counter, our hands are on it. This
                ensures absolute quality, unmatched freshness, and 100% local
                pride.
              </p>
            </div>
            <div className="steps">
              {["Seed", "Cultivation", "Processing", "Retail"].map(
                (step, i) => (
                  <div className="step" key={step}>
                    <span className="step-number">0{i + 1}</span>
                    <h3>{step}</h3>
                    <p>
                      {
                        [
                          "A considered beginning, close to home.",
                          "Grown under our own watch in Buffalo.",
                          "Handled with care at every stage.",
                          "From our hands to our retail counter.",
                        ][i]
                      }
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
        <section className="section vault wrap" id="vault">
          <div className="vault-heading">
            <div>
              <div className="section-label">The Vault</div>
              <h2>
                Our current
                <br />
                pheno stories.
              </h2>
            </div>
            <p>
              Meet a few of the phenotypes in our collection. Product
              availability can change.
            </p>
          </div>
          <div className="product-grid">
            {products.map((product, i) => (
              <article
                className="product-card"
                key={product.name}
                data-testid={`card-product-${product.name.toLowerCase().replaceAll(" ", "-")}`}
              >
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width={product.width}
                    height={product.height}
                    loading="lazy"
                  />
                </div>
                <div className="product-info">
                  <div className="product-topline">
                    <h3>{product.name}</h3>
                    <span className="product-index">0{i + 1}</span>
                  </div>
                  <p className="product-type">{product.type}</p>
                  <p className="profile-label">Profile</p>
                  <p className="profile">{product.profile}</p>
                  <p className="product-description">{product.description}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="vault-foot">
            Product information is presented as provided by the company.
          </p>
        </section>
        <section className="journal-band">
          <div className="wrap journal-inner">
            <div>
              <div className="section-label">From the journal</div>
              <h2>Local roots. Thoughtful notes.</h2>
            </div>
            <Link href="/journal" className="button">
              Read the journal <ArrowRight size={15} />
            </Link>
          </div>
        </section>
        <section className="section wrap" id="contact">
          <div className="contact-grid">
            <div>
              <div className="section-label">Get in touch</div>
              <h2>Contact.</h2>
              <br></br>
              <p className="contact-copy">
                Questions, or just want to say hello? Feel free to reach out to our team directly.
              </p>
              <div className="contact-details">
                <a href="mailto:chrisbrown@buffalocannabiscompany.com">
                  chrisbrown@buffalocannabiscompany.com
                </a>
                <a href="tel:7163392103">716-339-2103</a>
                <p>
                  501 Amherst Street
                  <br />
                  Buffalo, NY
                </p>
              </div>
            </div>
            <div>
              <form className="form" onSubmit={contactSubmit}>
                <label htmlFor="contact-name">
                  Your name
                  <input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                  />
                </label>
                <label htmlFor="contact-email">
                  Email address
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </label>
                <label htmlFor="contact-message">
                  Message
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                  />
                </label>
                <button className="button button-dark" type="submit">
                  Send a note <ArrowRight size={15} />
                </button>
                <p className="form-message" role="status">
                  {contactMessage}
                </p>
                <p className="age-small">
                  keep up with our new strains ↓ 
                </p>
              </form>
              <button
                className="button button-light"
                type="button"
                onClick={() => setNewsletterOpen(true)}
                style={{ marginTop: 30 }}
              >
                Get company updates <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {newsletterOpen && (
        <NewsletterModal close={() => setNewsletterOpen(false)} />
      )}
    </div>
  );
}

function Legal() {
  return (
    <div className="site-shell">
      <Seo data={seoByPath["/legal"]} />
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="eyebrow">Buffalo Cannabis Company</div>
            <h1>Legal &amp; safety.</h1>
            <p>
              Important information for adults visiting our site and learning
              about cannabis.
            </p>
          </div>
        </section>
        <div className="wrap legal-content">
          <h2>License information</h2>
          <div className="license-box">
            <p>NY Microbusiness License #MB-000000</p>
            <p>Cultivation #C-000000</p>
          </div>
          <h2>Responsible use</h2>
          <p>
            For use only by adults 21 years of age and older. Keep out of reach
            of children and pets. In case of accidental ingestion or
            overconsumption, contact the Poison Center hotline 1-800-222-1222 or
            call 9-1-1. Please consume responsibly. Cannabis can be addictive.
          </p>
          <h2>Support is available</h2>
          <p>
            If you or someone you know is struggling with substance use, New
            York State’s HOPEline offers free, confidential support.
          </p>
          <ul>
            <li>Phone: 1-877-8-HOPENY or 1-877-846-7369</li>
            <li>Text: HOPENY or 467369</li>
            <li>
              Website:{" "}
              <a
                href="https://oasas.ny.gov/hopeline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://oasas.ny.gov/hopeline
              </a>
            </li>
          </ul>
          <h2>Age requirement</h2>
          <p>
            This website and The Vault are intended only for adults 21 years of
            age and older. Cannabis products are not for use by anyone under 21.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Journal() {
  const articles = [
    {
      href: "/journal/buffalo-seed-to-sale",
      category: "From our company",
      title: "Buffalo, from seed to sale",
      text: "What it means for Buffalo Cannabis Company to keep every step of its process close to home.",
    },
    {
      href: "/journal/new-york-craft-cannabis",
      category: "A thoughtful introduction",
      title: "A guide to New York craft cannabis",
      text: "A careful, general look at what “craft” can mean—and questions adults may consider when learning about cannabis.",
    },
  ];
  return (
    <div className="site-shell">
      <Seo data={seoByPath["/journal"]} />
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="eyebrow">Notes from the 716</div>
            <h1>The Journal.</h1>
            <p>
              Stories about our Buffalo roots and considered perspectives on New
              York craft cannabis.
            </p>
          </div>
        </section>
        <div className="wrap article-list">
          {articles.map((a) => (
            <Link key={a.href} href={a.href} className="article-card">
              <span>{a.category}</span>
              <h2>{a.title}</h2>
              <p>{a.text}</p>
              <b>
                Read article <ArrowRight size={14} />
              </b>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ArticlePage({ type }: { type: "buffalo" | "craft" }) {
  const data =
    type === "buffalo"
      ? seoByPath["/journal/buffalo-seed-to-sale"]
      : seoByPath["/journal/new-york-craft-cannabis"];
  return (
    <div className="site-shell">
      <Seo data={data} />
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="eyebrow">
              <Link href="/journal">Journal</Link> /{" "}
              {type === "buffalo" ? "Our approach" : "A general guide"}
            </div>
            <h1>
              {type === "buffalo"
                ? "Buffalo, from seed to sale."
                : "A guide to New York craft cannabis."}
            </h1>
            <p>
              {type === "buffalo"
                ? "A local business, and a process kept close to home."
                : "A careful starting point for adults learning about craft cannabis."}
            </p>
          </div>
        </section>
        {type === "buffalo" ? (
          <article className="wrap article-body">
            <p className="article-note">Buffalo Cannabis Company · The 716</p>
            <p>
              Buffalo Cannabis Company is a licensed New York microbusiness
              founded by Christopher Brown, a Buffalo native born and raised in
              the city. The company’s work is rooted in a close-knit,
              hard-working community—and in the idea of building a business here
              at home.
            </p>
            <h2>One roof on Amherst Street</h2>
            <p>
              At 501 Amherst Street in Buffalo, the company handles each part of
              its seed-to-sale process under one roof. The sequence moves from
              seed to cultivation, processing, and retail, with the company
              involved through every step.
            </p>
            <p>
              As the company puts it: “From the moment the seed sprouts to the
              second it’s handed over our retail counter, our hands are on it.”
              That local, hands-on approach is central to Buffalo Cannabis
              Company’s identity.
            </p>
            <h2>Made for New York</h2>
            <p>
              For Christopher, Buffalo is more than a place to do business. It
              is home, and the community that shaped his understanding of how
              people work together. Buffalo Cannabis Company is building a
              business with local roots and a distinctly Buffalo point of view.
            </p>
            <p>
              Learn more about{" "}
              <Link href="/#seed-to-sale">
                Seed → Sale at Buffalo Cannabis Company
              </Link>{" "}
              or explore the{" "}
              <Link href="/#vault">current Vault collection</Link>.
            </p>
          </article>
        ) : (
          <article className="wrap article-body">
            <p className="article-note">A general, educational introduction</p>
            <p>
              “Craft cannabis” is a broad phrase rather than a single universal
              standard. People may use it to describe smaller-scale production,
              attention to cultivation and handling, or a particular producer’s
              approach. The term alone does not tell you how a product was made
              or what its effects may be.
            </p>
            <h2>Look beyond the label</h2>
            <p>
              When learning about a cannabis product, adults can review the
              package and available product information, including the producer,
              product type, ingredients where applicable, and any required
              testing or compliance details. If something is unclear, ask a
              licensed retailer or consult official New York State resources.
            </p>
            <p>
              Products can differ, and individual experiences can differ too.
              Descriptions of aroma, flavor, or type are not guarantees of a
              particular experience or outcome. Avoid making assumptions about
              effects based on a product name or category alone.
            </p>
            <h2>Choose carefully and keep safety in mind</h2>
            <p>
              Only adults 21 years of age and older should use cannabis. Keep
              products secured away from children and pets, and do not drive or
              operate machinery after use. If you have questions about health,
              medications, or whether cannabis is appropriate for you, speak
              with a qualified healthcare professional.
            </p>
            <p>
              New York’s official cannabis guidance is the most reliable source
              for current state information. This article is general education,
              not legal or medical advice.
            </p>
            <p>
              See our <Link href="/legal">legal and safety information</Link>{" "}
              for responsible-use guidance and support contacts.
            </p>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  const [ageConfirmed, setAgeConfirmed] = useState(
    () => sessionStorage.getItem("bcc-age-confirmed") === "yes",
  );
  const confirmAge = () => {
    sessionStorage.setItem("bcc-age-confirmed", "yes");
    setAgeConfirmed(true);
    window.dispatchEvent(new Event("bcc-age-confirmed"));
  };
  return (
    <>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/legal" component={Legal} />
          <Route path="/journal" component={Journal} />
          <Route path="/journal/buffalo-seed-to-sale">
            <ArticlePage type="buffalo" />
          </Route>
          <Route path="/journal/new-york-craft-cannabis">
            <ArticlePage type="craft" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
      {!ageConfirmed && <AgeGate onEnter={confirmAge} />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
