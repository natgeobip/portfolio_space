import { useEffect, useRef, useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import { Arrow } from './Icons.jsx'

// Carosello orizzontale con scroll-snap: si scorre con le frecce, con la rotella/trackpad o trascinando (touch).
// Le frecce spostano di una scheda alla volta e si disattivano agli estremi.
// Se i progetti hanno un "group" (es. Space, Mobility) sopra il carosello compaiono le etichette: quella del gruppo
// a cui appartiene la prima scheda visibile è attiva, e cliccandola si scorre all'inizio del gruppo.
export default function ProjectCarousel({ projects }) {
  const track = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const groups = [...new Set(projects.map((p) => p.group).filter(Boolean))]
  const [active, setActive] = useState(groups[0])

  useEffect(() => {
    const el = track.current
    const update = () => {
      setEdge({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      })
      // prima scheda non già quasi uscita a sinistra → determina l'etichetta attiva
      const left = el.getBoundingClientRect().left
      const cards = [...el.children]
      const first = cards.find((c) => c.getBoundingClientRect().right > left + c.offsetWidth * 0.5) || cards[0]
      const group = projects[cards.indexOf(first)]?.group
      if (group) setActive(group)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [projects])

  const go = (dir) => {
    const el = track.current
    const card = el.firstElementChild
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0)
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const goToGroup = (group) => {
    const el = track.current
    const card = el.children[projects.findIndex((p) => p.group === group)]
    const delta = card.getBoundingClientRect().left - el.getBoundingClientRect().left - parseFloat(getComputedStyle(el).paddingLeft || 0)
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <>
      {groups.length > 1 && (
        <div className="tcarousel__tabs" role="tablist">
          {groups.map((g) => (
            <button key={g} type="button" role="tab" aria-selected={g === active} className={g === active ? 'is-active' : ''} onClick={() => goToGroup(g)}>
              {g}
            </button>
          ))}
        </div>
      )}
      <div className="pcarousel" role="region" aria-roledescription="carousel" aria-label="Projects">
        <button className="pcarousel__btn pcarousel__btn--prev" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous project">
          <Arrow />
        </button>
        <div className="pcarousel__track" ref={track}>
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <button className="pcarousel__btn pcarousel__btn--next" onClick={() => go(1)} disabled={edge.end} aria-label="Next project">
          <Arrow />
        </button>
      </div>
    </>
  )
}
