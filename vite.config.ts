import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const target = process.env.VITE_PROXY_URL;

  return {
    plugins: [
      vue(),
      vueJsx(),
      VueDevTools()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target
        }
      }
    }
  }
})
