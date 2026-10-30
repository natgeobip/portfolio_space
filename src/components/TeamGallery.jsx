import { useState } from 'react'
import PersonCard from './PersonCard.jsx'

// Tutti i membri in una riga: uno è espanso, gli altri sono strisce strette.
// Quello espanso di default è il membro con "featured": true (altrimenti il primo).
// All'hover/focus/tap si espande quello sotto il cursore; uscendo dalla galleria si torna al predefinito.
export default function TeamGallery({ members, narrow }) {
  const home = Math.max(0, members.findIndex((m) => m.featured))
  const [active, setActive] = useState(home)

  return (
    <div className={`tgallery${narrow ? ' tgallery--narrow' : ''}`} onMouseLeave={() => setActive(home)}>
      {members.map((m, i) => (
        <PersonCard key={m.name} {...m} active={i === active} onActivate={() => setActive(i)} />
      ))}
    </div>
  )
}
