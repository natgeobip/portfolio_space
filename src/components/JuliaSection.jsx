import SectionHeading from './SectionHeading.jsx'
import { Arrow } from './Icons.jsx'
import { asset } from '../utils.js'

// Sezione dedicata a Julia, l'assistente virtuale di Roma. Tutto il contenuto è in site.json → "julia".
export default function JuliaSection({ data }) {
  const { capabilities, channels, how, faq, releases, cta } = data

  return (
    <>
      <section className="section" id="julia">
        <div className="julia__head">
          {data.logo && <img className="julia__logo" src={asset(data.logo)} alt="Julia logo" />}
          <SectionHeading eyebrow={data.eyebrow} title={data.title} />
        </div>
        <div className="glance">
          <div className="julia__intro">
            {data.intro.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div className="stats-grid">
            {data.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {capabilities && (
          <>
            <h3 className="subhead julia__sub">{capabilities.title}</h3>
            <ul className="steps julia__caps">
              {capabilities.items.map((c) => (
                <li key={c.title}>
                  {c.tag && <span className={`julia__tag julia__tag--${c.tag.toLowerCase()}`}>{c.tag}</span>}
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {channels && (
          <div className="julia__channels">
            <div>
              <h3 className="subhead">{channels.title}</h3>
              <p>{channels.text}</p>
            </div>
            <ul>
              {channels.items.map((ch) => (
                <li key={ch.label}>
                  <a href={ch.href} target="_blank" rel="noreferrer">
                    {ch.label} <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {how && (
        <section className="story julia__how" aria-label={how.eyebrow}>
          <div className="story__inner">
            {how.items.map((it) => (
              <article key={it.title}>
                <p className="story__label">{it.label}</p>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="section julia__more">
        <div className="julia__cols">
          {faq && (
          <div>
            <h3 className="subhead">{faq.title}</h3>
            <div className="faq">
              {faq.items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          )}
          {releases && (
          <div>
            <h3 className="subhead">{releases.title}</h3>
            <ol className="releases">
              {releases.items.map((r) => (
                <li key={r.version}>
                  <h4>
                    {r.version}
                    {r.isNew && <span className="julia__tag julia__tag--new">New</span>}
                  </h4>
                  <ul className="bullets">
                    {r.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          )}
        </div>

        {cta && (
          <div className="julia__cta">
            <p>{cta.text}</p>
            <a className="btn" href={cta.href} target="_blank" rel="noreferrer">
              {cta.label}
            </a>
          </div>
        )}
      </section>
    </>
  )
}


