import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Exclude context files from Fast Refresh - they legitimately export both components and hooks
      exclude: /src\/contexts\/.*\.jsx$/,
    }),
  ],
})
