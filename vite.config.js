import { createHash } from 'node:crypto'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SITE_PASSWORD (GitHub secret / variabile d'ambiente) viene convertita in
// hash SHA-256 al momento della build: la password in chiaro non finisce nel bundle.
// Se non è impostata, la schermata di accesso è disattivata.
const password = process.env.SITE_PASSWORD
const passwordHash = password
  ? createHash('sha256').update(password).digest('hex')
  : ''

// "base" deve coincidere con il nome del repository GitHub:
// https://natgeobip.github.io/portfolio_space/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio_space/',
  define: {
    __SITE_PASSWORD_HASH__: JSON.stringify(passwordHash),
  },
})
