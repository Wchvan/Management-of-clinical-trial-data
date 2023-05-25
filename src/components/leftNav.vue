<template>
    <el-menu class="h-full" :default-active="activeIndex" router background-color="rgba(19,131,194,.9)"
        active-text-color="#8B1A1A" text-color="#ccc">
        <el-image :src="logoUrl" class="w-40 h-40 m-4"></el-image>
        <el-menu-item index="/home" class="py-10">
            <i-ep-HomeFilled class="text-2xl"></i-ep-HomeFilled>
            <template #title>
                <div class="w-28 flex flex-row justify-between text-2xl font-bold">
                    <div v-for="item in '首页'" :key="item">
                        {{ item }}
                    </div>
                </div>
            </template>
        </el-menu-item>
        <el-menu-item index="/cases" class="py-10">
            <i-ep-List class="text-2xl"></i-ep-List>
            <template #title>
                <div class="w-28 flex flex-row justify-between text-2xl font-bold">
                    <div v-for="item in '病例'" :key="item">
                        {{ item }}
                    </div>
                </div>
            </template>
        </el-menu-item>
        <el-menu-item index="/revisit" class="py-10">
            <i-ep-Edit class="text-2xl"></i-ep-Edit>
            <template #title>
                <div class="w-28 flex flex-row justify-between text-2xl font-bold">
                    <div v-for="item in '随访'" :key="item">
                        {{ item }}
                    </div>
                </div>
            </template>
        </el-menu-item>
        <el-menu-item v-if="userStore.userRole === 'admin'" index="/users" class="py-10">
            <i-ep-user class="text-2xl"></i-ep-user>
            <template #title>
                <div class="w-28 flex flex-row justify-between text-2xl font-bold">
                    <div v-for="item in '用户管理'" :key="item">
                        {{ item }}
                    </div>
                </div>
            </template>
        </el-menu-item>
        <el-menu-item v-if="userStore.userRole === 'admin'" index="/log" class="py-10">
            <i-ep-Document class="text-2xl"></i-ep-Document>
            <template #title>
                <div class="w-28 flex flex-row justify-between text-2xl font-bold">
                    <div v-for="item in '系统日志'" :key="item">
                        {{ item }}
                    </div>
                </div>
            </template>
        </el-menu-item>
    </el-menu>
</template>

<script setup lang='ts'>
import logoUrl from '@/assets/navlogo.png';
import { ref, watch } from 'vue';
import useUserStore from '@/store/user';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();

/* 左侧导航栏相关 */
const activeIndex = ref<string>('/home');
watch(
    () => route.path,
    (newVal) => {
        activeIndex.value = newVal;
    },
);

</script>

<style lang='scss' scoped></style>