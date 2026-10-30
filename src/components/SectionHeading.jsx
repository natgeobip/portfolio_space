// Etichetta con linea rossa + titolo (usata in tutte le sezioni).
export default function SectionHeading({ eyebrow, title, as: Tag = 'h2' }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      {title && <Tag>{title}</Tag>}
    </div>
  )
}
