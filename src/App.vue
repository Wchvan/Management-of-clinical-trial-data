<template>
    <RouterView class="w-full h-full"></RouterView>
</template>

<script setup lang="ts">
import useUserStore from './store/user';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();

const userStore = useUserStore();
if (userStore.userName) {
    userStore.checkUser().then((res) => {
        if (res.code !== 200) {
            ElMessage({
                type: 'error',
                message: '用户登录已过期',
            });
            router.push('/login');
        }
    });
}
</script>

<style lang="scss">
@import './styles/common.scss';
</style>
