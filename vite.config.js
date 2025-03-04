import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import UnoCSS from 'unocss/vite';
import legacy from '@vitejs/plugin-legacy';
import { compression } from 'vite-plugin-compression2';

import path from 'path';

// https://vitejs.dev/config/
export default (config) => {
  const envData = loadEnv(config.mode, process.cwd());
  console.log('envData：', envData);
  return defineConfig({
    base: '',
    outDir: 'dist',
    build: {
      assetsDir: 'static'
      /* terserOptions: {
        output:{
          comments:false
        },
        compress: {
          drop_console: true
        }
      } */
    },
    server: {
      host: '0.0.0.0',
      port: 5178,
      proxy: {
        '/api': {
          target: 'https://faucet.novaichain.com',
          // target: 'http://192.168.101.12:18070',
          changeOrigin: true,
        },
        // {}
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/style/element/index.scss' as *;`
        }
      }
    },
    plugins: [
      vue(),
      UnoCSS(),
      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ],
        include: [/\.[j]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'pinia', 'vue-router'],
        dts: 'auto-imports.d.ts',
        dirs: ['src/api', 'src/components', 'src/store/modules'],
        vueTemplate: true
      }),
      compression(),
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ]
  });
};
