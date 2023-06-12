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
                    background-color="#0095B6"
                    active-text-color="#8B0000"
                >
                    <el-menu-item
                        index="/admin-trials"
                        class="justify-center flex flex-row"
                        style="padding: 2.5rem 0"
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
                            </div>
                        </template>
                    </el-menu-item>
                    <el-menu-item
                        index="/admin-users"
                        class="justify-center flex flex-row"
                        style="padding: 2.5rem 0"
                    >
                        <div
                            class="text-xl text-center"
                            style="display: inline-flex; align-items: center"
                        >
                            <i-ep-User></i-ep-User>
                            <span>用户管理</span>
                        </div>
                    </el-menu-item>
                    <el-menu-item
                        index="/admin-log"
                        class="justify-center flex flex-row"
                        style="padding: 2.5rem 0"
                    >
                        <div
                            class="text-xl text-center"
                            style="display: inline-flex; align-items: center"
                        >
                            <i-ep-Notebook></i-ep-Notebook>
                            <span>系统日志</span>
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
