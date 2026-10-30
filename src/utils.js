// Risolve i percorsi immagine dei JSON (es. "images/foo.png") rispetto alla base di Vite,
// così funzionano sia in locale sia su GitHub Pages (/space_portfolio/).
export const asset = (path) =>
  !path || /^(https?:)?\/\//.test(path) ? path : import.meta.env.BASE_URL + path.replace(/^\//, '')

export const PLACEHOLDER = 'images/placeholder.svg'
