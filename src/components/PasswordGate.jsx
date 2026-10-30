import { useState } from 'react'

const STORAGE_KEY = 'site-unlocked'
const EXPECTED_HASH = __SITE_PASSWORD_HASH__

async function sha256(text) {
  const data = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function isUnlocked() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === EXPECTED_HASH
  } catch {
    return false
  }
}

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => !EXPECTED_HASH || isUnlocked())
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return children

  async function handleSubmit(e) {
    e.preventDefault()
    if ((await sha256(value)) === EXPECTED_HASH) {
      try { sessionStorage.setItem(STORAGE_KEY, EXPECTED_HASH) } catch { /* ignore */ }
      setUnlocked(true)
    } else {
      setError(true)
    }
  }

  return (
    <div className="gate">
      <form className="gate__box" onSubmit={handleSubmit}>
        <h1>BIP Space</h1>
        <p>Enter the password to access the portfolio.</p>
        <input
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          placeholder="Password"
          autoFocus
          aria-invalid={error}
        />
        {error && <span className="gate__error">Incorrect password</span>}
        <button type="submit" className="btn">Enter</button>
      </form>
    </div>
  )
}
