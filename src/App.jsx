import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<ProjectDetail />} />
      <Route
        path="*"
        element={
          <div className="notfound">
            <h1>404</h1>
            <Link to="/">Back to home</Link>
          </div>
        }
      />
    </Routes>
  )
}
