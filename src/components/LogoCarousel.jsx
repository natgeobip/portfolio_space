import { asset } from '../utils.js'
import { Building } from './Icons.jsx'

// Striscia scorrevole su una riga. La pista è fatta da due metà identiche (CSS sposta di -50% per un loop continuo)
// e ogni metà ha almeno MIN_ITEMS elementi, così supera la larghezza di qualsiasi schermo e non resta mai vuota.
const MIN_ITEMS = 24

export default function LogoCarousel({ companies }) {
  const half = Array.from({ length: Math.ceil(MIN_ITEMS / companies.length) }, () => companies).flat()
  const items = [...half, ...half]
  return (
    <section className="logos" aria-label="Companies that have worked with us">
      <ul className="logos__track">
        {items.map((c, i) => (
          <li key={i} aria-hidden={i >= half.length}>
            {c.logo ? (
              <img src={asset(c.logo)} alt={c.name} style={c.height ? { height: c.height } : undefined} />
            ) : (
              <>
                <Building /> {c.name}
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
