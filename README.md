# BIP Space Team — Portfolio

React + Vite + React Router. Sito statico per GitHub Pages: tutto il contenuto vive in due file JSON.

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://localhost:5173/space_portfolio/
npm run build    # produce dist/
```

## Struttura

```
src/
  data/
    site.json        # hero, team, aziende, footer
    projects.json    # un oggetto per progetto
  components/        # Navbar, Hero, SectionHeading, PersonCard, ProjectCard, Footer, Icons
  pages/
    Home.jsx         # landing page
    ProjectDetail.jsx# pagina dettaglio (/#/project/:slug)
  styles/index.css   # tutti gli stili, colori nelle variabili :root
public/images/       # immagini (team, progetti, grafici)
```

## Aggiungere un progetto

1. Copia le immagini in `public/images/`.
2. Duplica un oggetto in `src/data/projects.json`, cambia `slug` (univoco) e i contenuti.
   I percorsi immagine sono relativi a `public/` (es. `"images/mio-progetto.jpg"`).
3. Fine: card in home e pagina dettaglio vengono generate automaticamente.

Modello di un progetto: `slug`, `titleLight`/`titleBold`, `summary`, `tags[]`, `image`, `heroText`,
`overview {title, text, stats[], meta{Client,Scope,Region,Duration}}`, `story[]` (challenge/analyzed/approach),
`insights {title, main, charts[]}`, `results {title, items[]}`.

Foto del team: in `site.json` imposta `photo` (es. `"images/team/mario.jpg"`). Immagine hero: `hero.image`.

## Pubblicazione su GitHub Pages

1. Push su `main`.
2. Su GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Il workflow `.github/workflows/deploy.yml` builda e pubblica su `https://natgeobip.github.io/space_portfolio/`.

Se rinomini il repo, aggiorna `base` in `vite.config.js` (e il percorso del favicon in `index.html`).
Si usa `HashRouter` (URL tipo `/#/project/slug`) per evitare 404 al refresh su GitHub Pages.
