import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  base: './',
  preview: {
    port: 5000
  },
  plugins: [
    imagetools(),
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: i => `__tla_${i}`
    })
  ]
})
