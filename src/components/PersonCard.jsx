import { useState, useEffect } from 'react'
import { asset, PLACEHOLDER } from '../utils.js'

// Striscia della galleria team: stretta di default, si allarga quando è attiva e mostra le informazioni.
export default function PersonCard({ name, role, bio, photo, focus = "50%", linkedin, active, onActivate }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { if (!active) setOpen(false) }, [active]) // al cambiare persona il testo torna a due righe
  return (
    <article
      className={`person${active ? ' is-active' : ''}${open ? ' is-open' : ''}`}
      tabIndex={0}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
    >
      <img src={asset(photo || PLACEHOLDER)} alt={name} className={photo ? "" : "is-placeholder"} style={{ objectPosition: `${focus} 0` }} />
      <div className="person__info">
        {role && <span>{role}</span>}
        <strong>{name}</strong>
        {bio && <p>{bio}</p>}
        {bio && (
          <button type="button" className="person__more" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o) }}>
            {open ? 'Less...' : 'More...'}
          </button>
        )}
      </div>
      {linkedin && (
        <a className="person__badge" href={linkedin} target="_blank" rel="noreferrer" aria-label={`${name} su LinkedIn`}>
          in
        </a>
      )}
    </article>
  )
}
