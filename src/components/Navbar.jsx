import { asset } from '../utils.js'

// links: [{ label, id }] — scroll morbido verso la sezione con quell'id nella pagina corrente.
export default function Navbar({ links }) {
  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      {links.map((l) => (
        <a key={l.id} href={`#${l.id}`} onClick={scrollTo(l.id)}>
          {l.label}
        </a>
      ))}
      <a className="navbar__logo" href="https://www.bip-group.it/" target="_blank" rel="noreferrer" aria-label="BIP Group">
        <img src={asset('images/bip_logo.png')} alt="bip." />
      </a>
    </nav>
  )
}
