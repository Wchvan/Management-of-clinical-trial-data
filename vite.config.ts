import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

import electron from 'vite-plugin-electron';
import electronRenderer from 'vite-plugin-electron-renderer';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        vue(),
        electron([
            {
                entry: 'electron/main/index.ts',
                onstart(options) {
                    options.startup();
                },
                vite: {
                    build: {
                        outDir: 'dist-electron/main',
                    },
                },
            },
            {
                entry: 'electron/preload/index.ts',
                onstart(options) {
                    options.reload();
                },
                vite: {
                    build: {
                        outDir: 'dist-electron/preload',
                    },
                },
            },
        ]),
        electronRenderer(),
        AutoImport({
            // Auto import functions from Vue, e.g. ref, reactive, toRef...
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],

            // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
            // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
            resolvers: [
                ElementPlusResolver(),

                // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
            ],
        }),

        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
            ],
        }),

        Icons({
            autoInstall: true,
        }),
    ],
    css: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
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
