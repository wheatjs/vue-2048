
let __unconfig_data;
let __unconfig_stub = function (data) { __unconfig_data = data };
__unconfig_stub.default = (data) => { __unconfig_data = data };
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
const Unocss = __unconfig_stub;
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
const __unconfig_default =  defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/store',
      ],
      vueTemplate: true,
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
    Unocss({
      presets: [
        presetAttributify(),
        presetUno(),
        presetIcons(),
      ],
      theme: {
        colors: {
          accent: {
            300: '#5dffb6',
            500: '#42b883',
          },
          primary: '#242424',
          secondary: '#2f2f2f',
          border: '#484848',
          foreground: 'rgba(255, 255, 255, .87)',
        },
      },
    }),
  ],
})

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;