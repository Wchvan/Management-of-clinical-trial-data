import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import useUserStore from '@/store/user';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            keepAlive: true,
            avoidAuth: true,
        },
        component: () => import('@/pages/login/login.vue'),
    },
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '主页',
            keepAlive: true,
        },
        component: () => import('@/pages/home/home.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由守卫

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const isAuthenticated = userStore.token;
    if (!to.matched.some((record) => record.meta.avoidAuth)) {
        if (!isAuthenticated) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
