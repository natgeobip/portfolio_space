import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// "base" deve coincidere con il nome del repository GitHub:
// https://natgeobip.github.io/space_portfolio/
export default defineConfig({
  plugins: [react()],
  base: '/space_portfolio/',
})
