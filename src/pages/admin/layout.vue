<template>
    <el-container>
        <el-header style="padding: 0">
            <top-nav></top-nav>
        </el-header>
        <el-container>
            <el-aside class="h-full" width="12rem">
                <el-menu
                    :default-active="activeIndex"
                    router
                    class="h-full"
                    text-color="#fff"
                    background-color="#0095B6"
                    active-text-color="#8B0000"
                >
                    <el-menu-item
                        index="/admin-trials"
                        class="justify-center flex flex-row  border-y-white"
                        style="padding: 2.5rem 0;border-bottom-width: 1px;"
                    >
                        <template #title>
                            <div
                                class="text-xl text-center"
                                style="
                                    display: inline-flex;
                                    align-items: center;
                                "
                            >
                                <i-ep-Tickets></i-ep-Tickets>
                                <span>实验管理</span>
                                <span v-if="activeIndex==='/admin-trials'" style="position: relative; margin-left: 2rem; font-size: 1.5rem;"> > </span>
                            </div>
                        </template>
                    </el-menu-item>
                    <el-menu-item
                        index="/admin-users"
                        class="justify-center flex flex-row  border-y-white"
                        style="padding: 2.5rem 0;border-bottom-width: 1px;"
                    >
                        <div
                            class="text-xl text-center"
                            style="display: inline-flex; align-items: center"
                        >
                            <i-ep-User></i-ep-User>
                            <span>用户管理</span>
                            <span v-if="activeIndex==='/admin-users'" style="position: relative; margin-left: 2rem; font-size: 1.5rem;"> > </span>
                        </div>
                    </el-menu-item>
                    <el-menu-item
                        index="/admin-log"
                        class="justify-center flex flex-row  border-y-white"
                        style="padding: 2.5rem 0;border-bottom-width: 1px;"
                    >
                        <div
                            class="text-xl text-center"
                            style="display: inline-flex; align-items: center"
                        >
                            <i-ep-Notebook></i-ep-Notebook>
                            <span>系统日志</span>
                            <span v-if="activeIndex==='/admin-log'" style="position: relative; margin-left: 2rem; font-size: 1.5rem;"> > </span>
                        </div>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-main style="padding: 5px 10px" class="bg-all">
                <slot></slot>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import topNav from '@/components/topNav.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const activeIndex = ref<string>(useRoute().path);
</script>

<style lang="scss" scoped></style>
