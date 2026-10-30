import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import PasswordGate from './components/PasswordGate.jsx'
import './styles/index.css'

// HashRouter: funziona su GitHub Pages senza configurare redirect 404.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <PasswordGate>
        <App />
      </PasswordGate>
    </HashRouter>
  </React.StrictMode>
)
