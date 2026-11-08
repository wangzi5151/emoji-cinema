import { defineConfig } from 'vite'
import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

function copyRuntimeLogic() {
  return {
    name: 'copy-runtime-logic',
    closeBundle() {
      for (const file of ['meme-data.js', 'logic.js']) {
        copyFileSync(
          fileURLToPath(new URL(`./${file}`, import.meta.url)),
          fileURLToPath(new URL(`./dist/${file}`, import.meta.url))
        )
      }
    }
  }
}

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [copyRuntimeLogic()]
})
