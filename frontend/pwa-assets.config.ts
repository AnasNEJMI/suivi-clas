import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

const BG = '#4338CA'

export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: {
    ...minimal2023Preset,
    maskable: { ...minimal2023Preset.maskable, padding: 0, resizeOptions: { background: BG } },
    apple:    { ...minimal2023Preset.apple,    padding: 0, resizeOptions: { background: BG } },
  },
  images: ['public/logo.svg'],
})