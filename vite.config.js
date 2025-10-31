import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
    {
      name: 'typescript',
      // enable type checking for .jsx files
      // you can also add other file extensions here
      // such as .tsx, .ts, etc.
      enableJsx: true,
    }
  ],
})


