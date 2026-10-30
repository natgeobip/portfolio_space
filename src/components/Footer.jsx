import site from '../data/site.json'

export default function Footer() {
  const f = site.footer
  return (
    <footer className="footer" id="contact">
      <p className="eyebrow eyebrow--light">{f.eyebrow}</p>
      <h2>
        <span className="light">{f.titleLight}</span>
        <br />
        <span className="light">{f.titleBold}</span>
      </h2>
      <div className="footer__row">
        <ul>
          {f.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            </li>
          ))}
        </ul>
        <a className="btn" href={f.ctaHref}>{f.cta}</a>
      </div>
    </footer>
  )
}
