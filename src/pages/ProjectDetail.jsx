import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Footer from '../components/Footer.jsx'
import JuliaSection from '../components/JuliaSection.jsx'
import { storyIcons } from '../components/Icons.jsx'
import projects from '../data/projects.json'
import site from '../data/site.json'
import { asset } from '../utils.js'

const navLinks = [
  { label: 'OVERVIEW', id: 'overview' },
  { label: 'DATA & INSIGHTS', id: 'insights' },
  { label: 'CONTACT US', id: 'contact' },
]

// Figura con didascalia; cliccando si apre l'immagine a dimensione piena (utile per schemi e mappe dense).
function Figure({ image, title, caption, className }) {
  return (
    <figure className={className}>
      {title && <h4>{title}</h4>}
      <a href={asset(image)} target="_blank" rel="noreferrer">
        <img src={asset(image)} alt={title || caption || ''} loading="lazy" />
      </a>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

// Tutte le sezioni oltre a hero, overview, story e insights sono opzionali: se mancano nel JSON non vengono mostrate.
export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const p = projects[index]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!p) {
    return (
      <div className="notfound">
        <h1>Project not found</h1>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  const { overview, story, data, methods, insights, findings, results, limits, webgis } = p
  // I progetti del team Mobility non usano banner/satellite né header/footer di Space.
  const isSpace = p.group === 'Space'

  // Julia ha una struttura propria (vedi JuliaSection): hero + sezione dedicata, senza banner/satellite e footer di Space.
  if (p.julia) {
    return (
      <>
        <Hero
          variant="detail"
          navLinks={[{ label: 'JULIA', id: 'julia' }]}
          eyebrow={`PROJECT ${index + 1}`}
          titleLight=""
          titleBold={p.subtitle || p.titleBold}
          text={p.heroText}
          cta="Get started"
          ctaTarget="julia"
          plain
        />
        <JuliaSection data={p.julia} />
        <div className="section back-wrap">
          <Link to="/" className="back">← Our projects</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Hero
        variant="detail"
        navLinks={isSpace ? navLinks : navLinks.filter((l) => l.id !== 'contact')}
        eyebrow={`PROJECT ${index + 1}`}
        titleLight={p.subtitle ? "" : p.titleLight}
        titleBold={p.subtitle || p.titleBold}
        text={p.heroText}
        cta="Get started"
        ctaTarget="overview"
        banner={isSpace ? site.hero.projectImage : undefined}
        satellite={isSpace ? site.hero.satellite : undefined}
        plain={!isSpace}
      />

      <section className="section" id="overview">
        <SectionHeading eyebrow="Overview" />
        <div className="glance">
          <div>
            <h2>{overview.title}</h2>
            <p>{overview.text}</p>
          </div>
          <div className="stats-grid">
            {overview.stats.map((s, i) => (
              <div key={i}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <dl className="meta">
          {Object.entries(overview.meta).map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="story">
        <div className="story__inner">
          {story.map((s) => {
            const Icon = storyIcons[s.icon]
            return (
              <article key={s.label}>
                <p className="story__label">{Icon && <Icon />} {s.label}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      {data && (
        <section className="section" id="data">
          <SectionHeading eyebrow="Data" title={data.title} />
          <div className="datagrid">
            <dl className="datalist">
              {data.items.map((d) => (
                <div key={d.name}>
                  <dt>{d.name}</dt>
                  <dd>{d.text}</dd>
                </div>
              ))}
            </dl>
            {data.deliverables && (
              <div>
                <h3 className="subhead">{data.deliverablesTitle}</h3>
                <ul className="checks">
                  {data.deliverables.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {methods && (
        <section className="section methods" id="methods">
          <SectionHeading eyebrow="Methods" title={methods.title} />
          <div className="methods__text">
            {methods.text?.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          {methods.steps && (
            <ul className="steps">
              {methods.steps.map((s) => (
                <li key={s.title}>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
          )}
          {methods.figures?.map((f) => (
            <Figure key={f.image} className="figure-wide" {...f} />
          ))}
        </section>
      )}

      <section className="section" id="insights">
        <SectionHeading eyebrow="Data & Insights" title={insights.title} />
        <div className="insights" style={{ '--n': insights.charts?.length ?? 0 }}>
          <Figure className="insights__main" {...insights.main} />
          {insights.charts?.map((c) => (
            <Figure key={c.image} className="insights__chart" {...c} />
          ))}
        </div>
        {insights.gallery?.map((g) => (
          <Figure key={g.image} className="figure-wide" {...g} />
        ))}
      </section>

      {findings && (
        <section className="section findings" id="findings">
          <SectionHeading eyebrow="Findings" title={findings.title} />
          <ul className="findings__grid">
            {findings.items.map((f) => (
              <li key={f.title}>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {results && (
        <section className="section" id="results">
          <SectionHeading eyebrow="Results" title={results.title} />
          <div className="results">
            {results.items.map((r, i) => (
              <div key={i}>
                <strong className={r.small ? 'is-small' : ''}>{r.value}</strong>
                <span>{r.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {limits?.next && (
        <section className="section" id="limits">
          <SectionHeading eyebrow="Next steps" />
          <ul className="bullets">
            {limits.next.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {webgis?.url && (
        <section className="section" id="webgis">
          <SectionHeading eyebrow="WebGIS" title="Explore the interactive map" />
          <a className="btn" href={webgis.url} target="_blank" rel="noreferrer">Open the WebGIS</a>
        </section>
      )}

      <div className="section back-wrap">
        <Link to="/" className="back">← Our projects</Link>
      </div>

      {isSpace && <Footer />}
    </>
  )
}
