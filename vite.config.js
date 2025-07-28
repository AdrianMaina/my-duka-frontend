import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  appType: 'spa', // 👈 Important for handling /invite/:token and other deep routes
  server: {
    fs: {
      strict: false,
    },
  },
})
