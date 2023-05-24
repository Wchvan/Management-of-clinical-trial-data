import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import useUserStore from '@/store/user';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            keepAlive: true,
            avoidAuth: true,
            avoidLayout: true,
        },
        component: () => import('@/pages/login/login.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            title: '主页',
            keepAlive: true,
        },
        component: () => import('@/pages/home/home.vue'),
    },
    {
        path: '/recruit',
        name: 'Recruit',
        meta: {
            title: '病例录入',
            keepAlive: true,
        },
        component: () => import('@/pages/recruit/recruit.vue'),
    },
    {
        path: '/users',
        name: 'Users',
        meta: {
            title: '用户管理',
            keepAlive: true,
        },
        component: () => import('@/pages/users/users.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由守卫

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const isAuthenticated = userStore.userName;
    if (!to.matched.some((record) => record.meta.avoidAuth)) {
        if (!isAuthenticated) {
            next('/login');
        } else {
            next();
        }
    } else if (to.path === '/users') {
        if (userStore.userRole === 'admin') {
            next();
        } else {
            alert('权限不够');
            next(from.path);
        }
    } else {
        next();
    }
});

export default router;
