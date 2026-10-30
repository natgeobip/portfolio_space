import { useEffect, useRef } from 'react'
import { asset } from '../utils.js'

// Posizione/dimensione iniziale del satellite, come frazioni del banner: combacia con quello in satellite_orbit.png.
const START = { x: 0.68, y: 0.48, width: 0.6, rot: 8 }
// Orbita sullo schermo (frazioni del viewport) che il satellite percorre mentre si scende nella pagina:
// parte a destra, passa in basso verso sinistra, risale e ricomincia (senso orario).
const ORBIT = {
  cx: 0.5, cy: 0.55, // centro
  rx: 0.32, ry: 0.2, // raggi (larghezza / altezza viewport)
  speed: 1.1 * Math.PI, // radianti per ogni altezza di viewport scrollata
  scale: 0.36, // dimensione "in orbita" rispetto a quella iniziale
  depth: 0.25, // variazione di scala davanti/dietro al pianeta
  rotSwing: 20, // oscillazione dell'inclinazione (gradi)
  margin: 24, // distanza minima dal bordo dello schermo (px)
}
const DETACH = 0.9 // viewport da scrollare per staccarsi completamente dal banner
const OVER_SECTIONS = 0.05 // opacità (80% di trasparenza) mentre il satellite è in orbita sopra i testi delle sezioni
// Tratto finale: l'orbita continua come prima e, negli ultimi scroll della pagina, il satellite scende dolcemente
// al centro del footer, dove si ferma. FOOTER.travel = scroll (in viewport) su cui avviene l'avvicinamento.
const FOOTER = {
  travel: 1,
  y: 0.5, // altezza finale (frazione dall'alto del footer): a metà
  x: 0.5, // posizione orizzontale finale (frazione della larghezza): al centro
  scale: 0.65, rot: 8, // nel footer il satellite è più grande (limite massimo)
  fit: 0.8, // il satellite non supera questa frazione dell'altezza del footer, così resta dentro
}

const lerp = (a, b, t) => a + (b - a) * t
const smooth = (t) => t * t * (3 - 2 * t)
const clamp01 = (v) => Math.min(1, Math.max(0, v))

export default function OrbitBanner({ banner, satellite }) {
  const stage = useRef(null)
  const sat = useRef(null)

  useEffect(() => {
    const el = sat.current
    if (!el) return // senza satellite: solo banner statico
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let target = 0
    let current = 0
    let raf = 0

    const draw = (scroll) => {
      const vw = document.documentElement.clientWidth // senza barra di scorrimento
      const vh = window.innerHeight
      const rect = stage.current.getBoundingClientRect()
      const baseW = rect.width * START.width
      el.style.width = `${baseW}px`

      const d = smooth(clamp01(scroll / (vh * DETACH))) // 0 = sul banner, 1 = in orbita
      const phi = (scroll / vh) * ORBIT.speed

      // posizione del satellite "incollato" al banner (scorre con la pagina)
      const bx = rect.left + START.x * rect.width
      const by = rect.top + START.y * rect.height
      // posizione sull'orbita
      // il raggio orizzontale si restringe se serve, così il satellite resta sempre dentro lo schermo
      const halfW = (baseW * ORBIT.scale * (1 + ORBIT.depth)) / 2
      const rx = Math.max(0, Math.min(ORBIT.rx * vw, Math.min(ORBIT.cx, 1 - ORBIT.cx) * vw - halfW - ORBIT.margin))
      const ox = ORBIT.cx * vw + rx * Math.cos(phi)
      const oy = (ORBIT.cy + ORBIT.ry * Math.sin(phi)) * vh

      let x = lerp(bx, ox, d)
      let y = lerp(by, oy, d)
      let scale = lerp(1, ORBIT.scale * (1 + ORBIT.depth * Math.sin(phi)), d)
      let rot = lerp(START.rot, START.rot + ORBIT.rotSwing * Math.sin(phi), d)

      const remaining = document.documentElement.scrollHeight - vh - scroll
      // avvicinamento al footer: 0 = ancora in orbita, 1 = arrivato
      let k = 0
      const footer = document.querySelector('.footer')
      if (footer) {
        k = smooth(clamp01(1 - remaining / (vh * FOOTER.travel)))
        const ratio = el.firstChild?.naturalWidth ? el.firstChild.naturalHeight / el.firstChild.naturalWidth : 1 / 3
        const r = (FOOTER.rot * Math.PI) / 180 // l'inclinazione aumenta l'altezza occupata
        const fScale = Math.min(FOOTER.scale, (footer.offsetHeight * FOOTER.fit) / (baseW * (ratio * Math.cos(r) + Math.sin(r))))
        x = lerp(x, vw * FOOTER.x, k)
        y = lerp(y, footer.getBoundingClientRect().top + footer.offsetHeight * FOOTER.y, k)
        scale = lerp(scale, fScale, k)
        rot = lerp(rot, FOOTER.rot, k)
      }

      const dim = lerp(1, OVER_SECTIONS, d)
      el.style.opacity = lerp(dim, 1, k) // nel footer: pienamente visibile
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`
    }

    if (reduced) {
      draw(0)
      const onResize = () => draw(0)
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    // Interpolazione verso il valore di scroll: movimento morbido anche con la rotella a scatti.
    const tick = () => {
      current += (target - current) * 0.1
      if (Math.abs(target - current) < 0.3) current = target
      draw(current)
      raf = current === target ? 0 : requestAnimationFrame(tick)
    }
    const onScroll = () => {
      target = window.scrollY
      if (!raf) raf = requestAnimationFrame(tick)
    }
    current = target = window.scrollY
    draw(current)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <div className="orbit" ref={stage} aria-hidden="true">
        <img className="orbit__banner" src={asset(banner)} alt="" />
      </div>
      {/* Livello fisso: sta fuori dall'overflow dell'hero e si sovrappone alle sezioni successive. */}
      {satellite && (
        <div className="orbit__sat" ref={sat} aria-hidden="true">
          <img src={asset(satellite)} alt="" />
        </div>
      )}
    </>
  )
}
