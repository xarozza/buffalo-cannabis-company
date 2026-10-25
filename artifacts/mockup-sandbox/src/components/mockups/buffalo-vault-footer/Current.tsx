import './_group.css';

const logo = '/__mockup/images/buffalo-company-logo.png';

const products = [
  {
    name: 'Buffalo Blitz',
    type: 'Indica-Dominant Hybrid',
    profile: 'Sharp Citrus, Loud Gas, Earthy Pine',
    description: 'Engineered for the 716. Buffalo Blitz charges out of the gate with an intense, uplifting cerebral buzz and a heavy gassy nose that completely fills the room. Grown under dialed-in indoor hydro setups at Amherst Street, this phenotype stacks dense, resin-coated buds frosted over with brilliant white trichomes.',
    image: '/__mockup/images/buffalo-blitz.jpeg',
    width: 768,
    height: 1024,
    alt: 'Close-up photograph of frosty Buffalo Blitz cannabis flower',
  },
  {
    name: 'Budz Mafia',
    type: 'Indica-Dominant Hybrid',
    profile: 'Deep Earth, Spicy Pepper, Creamy Gas',
    description: 'An absolute heavyweight in the Pheno Vault. Budz Mafia is built for the true connoisseur, delivering an incredibly smooth smoke followed by a deeply relaxing, full-body calm. This phenotype is a standout under our lights, producing rock-hard, dark purple buds completely covered in a sticky layer of crystalline trichomes.',
    image: '/__mockup/images/budz-mafia.jpeg',
    width: 768,
    height: 1024,
    alt: 'Close-up photograph of a resin-coated Budz Mafia cannabis flower',
  },
  {
    name: 'Queen City Quake',
    type: 'Balanced 50/50 Hybrid',
    profile: 'Sweet Berry, Doughy Vanilla, Sour Gas',
    description: 'A true earth-shaking phenotype designed to rattle the senses. Queen City Quake perfectly bridges the gap, offering a mouth-watering explosion of sweet, doughy terps followed by a perfectly balanced, long-lasting wave of euphoria. It stacks beautifully in our clean-rooms, flashing vibrant orange hairs and a dense coat of frosty resin.',
    image: '/__mockup/images/queen-city-quake.jpeg',
    width: 598,
    height: 1024,
    alt: 'Photograph of Queen City Quake flower held against a leafy background',
  },
];

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social media">
      <a className="social-link" href="https://www.instagram.com/" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" /></svg></a>
      <a className="social-link" href="https://www.tiktok.com/" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 7.1a6.1 6.1 0 0 1-3.8-1.3v8.1a6.3 6.3 0 1 1-5.4-6.2v3.3a3 3 0 1 0 2.1 2.9V2h3.3c.2 2 1.6 3.6 3.8 4v1.1Z" /></svg></a>
      <a className="social-link" href="https://www.facebook.com/" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" /></svg></a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content wrap">
        <a href="/" className="footer-brand" aria-label="Buffalo Cannabis Company home">
          <img src={logo} width="1024" height="1024" alt="Buffalo Cannabis Company logo" />
        </a>
        <p className="footer-license">NY Microbusiness License #MB-000000<br />Cultivation #C-000000</p>
        <SocialLinks />
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/legal">Legal &amp; Safety</a>
        </nav>
        <small className="footer-bottom">© 2026 Buffalo Cannabis Company</small>
      </div>
    </footer>
  );
}

function VaultSection() {
  return (
    <section className="section vault wrap" id="vault">
      <div className="vault-heading">
        <div>
          <div className="section-label">The Vault</div>
          <h2>Our current<br />pheno stories.</h2>
        </div>
        <p>Meet a few of the phenotypes in our collection. Product availability can change.</p>
      </div>
      <div className="product-grid">
        {products.map((product, i) => (
          <article className="product-card" key={product.name}>
            <div className="product-image">
              <img src={product.image} alt={product.alt} width={product.width} height={product.height} />
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
      <p className="vault-foot">For adults 21+. Product information is presented as provided by the company.</p>
    </section>
  );
}

export function Current() {
  return (
    <div className="vf-preview vf-current">
      <VaultSection />
      <Footer />
    </div>
  );
}
