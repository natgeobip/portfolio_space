import { useState } from 'react'
import { Arrow } from './Icons.jsx'

// Carosello a schede: una slide per gruppo (team, progetti...), si cambia con tab, pallini e, se richiesto, frecce.
// slides: [{ name, content }]
export default function TabbedCarousel({ slides, arrows = true, className = '' }) {
  const [index, setIndex] = useState(0)
  const last = slides.length - 1
  const go = (i) => setIndex(Math.min(last, Math.max(0, i)))

  return (
    <div className={`tcarousel ${className}`.trim()}>
      <div className="tcarousel__tabs" role="tablist">
        {slides.map((s, i) => (
          <button
            key={s.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? 'is-active' : ''}
            onClick={() => go(i)}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="tcarousel__viewport">
        <div className="tcarousel__track" style={{ transform: `translateX(calc(${index} * (-100% - var(--tgap))))` }}>
          {slides.map((s, i) => (
            <div key={s.name} className={`tcarousel__slide${i === index ? ' is-current' : ''}`} aria-hidden={i !== index}>
              {s.content}
            </div>
          ))}
        </div>
        {arrows && (
          <>
            <button type="button" className="pcarousel__btn pcarousel__btn--prev" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous">
              <Arrow />
            </button>
            <button type="button" className="pcarousel__btn pcarousel__btn--next" onClick={() => go(index + 1)} disabled={index === last} aria-label="Next">
              <Arrow />
            </button>
          </>
        )}
      </div>

      <div className="tcarousel__dots">
        {slides.map((s, i) => (
          <button key={s.name} type="button" className={i === index ? 'is-active' : ''} onClick={() => go(i)} aria-label={`Show ${s.name}`} />
        ))}
      </div>
    </div>
  )
}
