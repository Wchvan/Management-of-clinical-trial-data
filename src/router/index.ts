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
            avoidAuth: true, // 是否不需要要检验是否登录账号
            avoidLayout: true, // 是否不需要用标准的layout
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
        path: '/users',
        name: 'Users',
        meta: {
            title: '用户管理',
            keepAlive: true,
            admin: true, // 是否只有admin才能访问
        },
        component: () => import('@/pages/admin/users/users.vue'),
    },
    {
        path: '/log',
        name: 'Log',
        meta: {
            title: '系统日志',
            keepAlive: true,
            admin: true, // 是否只有admin才能访问
        },
        component: () => import('@/pages/admin/log/log.vue'),
    },
    {
        path: '/admin-trials',
        name: 'AdminTrials',
        meta: {
            title: '实验管理',
            keepAlive: true,
            admin: true, // 是否只有admin才能访问
        },
        component: () => import('@/pages/admin/trials/trials.vue'),
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
    } else if (to.meta.admin) {
        if (userStore.userRole === 'ROLE_ADMIN') {
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
