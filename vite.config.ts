import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver(), IconsResolver()],
        }),
        Icons({
            compiler: 'vue3',
            autoInstall: true,
        }),
    ],
    server: {
        port: 8080, //启动端口
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:4523/m1/2767636-0-default',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
            },
        },
    },
});
