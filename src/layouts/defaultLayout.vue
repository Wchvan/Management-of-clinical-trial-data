<template>
    <el-container class="w-full h-full">
        <el-aside width="200px" class="h-full">
            <el-menu
                class="h-full"
                :default-active="activeIndex"
                router
                background-color="rgba(19,131,194,.9)"
                active-text-color="#8B1A1A"
                text-color="#ccc"
            >
                <el-image :src="logoUrl" class="w-40 h-40 m-4"></el-image>
                <el-menu-item index="/home" class="py-10">
                    <i-ep-HomeFilled class="text-2xl"></i-ep-HomeFilled>
                    <template #title>
                        <div
                            class="w-28 flex flex-row justify-between text-2xl font-bold"
                        >
                            <div v-for="item in '首页'" :key="item">
                                {{ item }}
                            </div>
                        </div>
                    </template>
                </el-menu-item>
                <el-menu-item index="/recruit" class="py-10">
                    <i-ep-Edit class="text-2xl"></i-ep-Edit>
                    <template #title>
                        <div
                            class="w-28 flex flex-row justify-between text-2xl font-bold"
                        >
                            <div v-for="item in '病例录入'" :key="item">
                                {{ item }}
                            </div>
                        </div>
                    </template>
                </el-menu-item>
                <el-menu-item
                    v-if="userStore.userRole === 'admin'"
                    index="/users"
                    class="py-10"
                >
                    <i-ep-user class="text-2xl"></i-ep-user>
                    <template #title>
                        <div
                            class="w-28 flex flex-row justify-between text-2xl font-bold"
                        >
                            <div v-for="item in '用户管理'" :key="item">
                                {{ item }}
                            </div>
                        </div>
                    </template>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header
                class="h-16 grid grid-cols-10 p-0 border-b-2 border-gray-200"
                style="box-shadow: -5px 0 10px -5px #ccc"
            >
                <div class="text-center py-2 col-start-2 col-end-10">
                    <span class="leading-10 text-3xl font-bold">{{
                        $route.meta.title
                    }}</span>
                </div>
                <div class="text-center pt-1 col-span-1">
                    <el-dropdown>
                        <el-avatar
                            class="ml-12 bg-blue-400 text-2xl w-12 h-12"
                            >{{ userStore.userName[0] }}</el-avatar
                        >
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    disabled
                                    class="text-xl justify-center"
                                    style="
                                        color: #121212;
                                        cursor: inherit;
                                        border-bottom: 1px solid #ccc;
                                    "
                                >
                                    {{ userStore.userName }}
                                </el-dropdown-item>
                                <el-dropdown-item class="py-3 text-base"
                                    >修改密码</el-dropdown-item
                                >
                                <el-dropdown-item
                                    class="py-3 text-base"
                                    @click="logout"
                                    >退出登录</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <slot></slot>
            </el-main>
            <el-footer class="text-center h-fit">
                <div class="text-xl font-bold" style="color: #ccc">
                    本系统由信安小队开发----致力于研发一款医药研发临床试验数据隐私管理系统
                </div>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import logoUrl from '@/assets/navlogo.png';
import useUserStore from '@/store/user';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

/* 左侧导航栏相关 */
const activeIndex = ref<string>('/home');
watch(
    () => route.path,
    (newVal) => {
        activeIndex.value = newVal;
    },
);

/* 头部导航栏相关 */

// 用户相关
const logout = () => {
    userStore.logout();
    router.push('/login');
};
</script>

<style lang="scss" scoped></style>
