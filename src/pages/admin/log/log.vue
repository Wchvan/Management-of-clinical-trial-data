<template>
    <layout>
        <el-timeline>
            <el-timeline-item
                v-for="item in 5"
                :key="item"
                timestamp="2018/4/12"
                placement="top"
            >
                <el-card>
                    <template #header>
                        <div class="flex flex-row justify-center">
                            <h2>系统错误{{ item }}</h2>
                        </div>
                    </template>
                    <div
                        class="bg-gray-300 border-2 border-gray-200 break-words"
                    >
                        <code class="text-lg">
                            hmr update /src/pages/log/log.vue,
                            /src/App.vue?vue&type=style&index=0&lang.scss,
                            /node_modules/.pnpm/registry.npmmirror.com+tailwindcss@3.3.2_ts-node@10.9.1/node_modules/tailwindcss/tailwind.css
                        </code>
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </layout>
</template>

<script setup lang="ts">
import layout from '../layout.vue';
</script>

<style lang="scss" scoped></style>
