import { Link } from 'react-router-dom'
import { asset } from '../utils.js'
import { Arrow } from './Icons.jsx'

export default function ProjectCard({ project }) {
  const { slug, subtitle, titleLight, titleBold, summary, tags, image, status } = project
  return (
    <Link to={`/project/${slug}`} className="card">
      <div className="card__image">
        <img src={asset(image)} alt="" />
        {status && <span className="card__status">{status}</span>}
      </div>
      <div className="card__body">
        <h3>{subtitle || `${titleLight} ${titleBold}`.trim()}</h3>
        <p>{summary}</p>
        <ul className="tags">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <span className="card__arrow"><Arrow /></span>
      </div>
    </Link>
  )
}
