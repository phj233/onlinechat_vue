import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver,NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        NaiveUiResolver()
      ],
      imports: [
        'vue',
        '@vueuse/core',
        'vue-router',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
        {
          '@iconify/vue':[
            'Icon'
          ]
        }
      ],
      dts: true
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        NaiveUiResolver(),
        IconsResolver({
          prefix: 'Icons'
        }),
      ],
      deep: true,
      dts: true
    }),
    Icons({
      compiler: 'vue3'
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
    },
  },
})
