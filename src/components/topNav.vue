<template>
        <div class="text-center py-2 col-start-2 col-end-10">
            <span class="leading-10 text-3xl font-bold">{{
                $route.meta.title
            }}</span>
        </div>
        <div class="text-center pt-1 col-span-1">
            <el-dropdown>
                <el-avatar class="ml-12 bg-blue-400 text-2xl w-12 h-12">{{ userStore.userName[0] }}</el-avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item disabled class="text-xl justify-center" style="
                                        color: #121212;
                                        cursor: inherit;
                                        border-bottom: 1px solid #ccc;
                                    ">
                            {{ userStore.userName }}
                        </el-dropdown-item>
                        <el-dropdown-item class="py-3 text-base">修改密码</el-dropdown-item>
                        <el-dropdown-item class="py-3 text-base" @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
</template>

<script setup lang='ts'>
import useUserStore from '@/store/user';
import { useRouter } from 'vue-router';


const userStore = useUserStore();
const router = useRouter();

/* 头部导航栏相关 */

// 用户相关
const logout = () => {
    userStore.logout();
    router.push('/login');
};
</script>

<style lang='scss' scoped></style>