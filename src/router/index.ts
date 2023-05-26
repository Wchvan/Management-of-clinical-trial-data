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
        path: '/trials',
        name: 'Trials',
        meta: {
            title: '实验',
            keepAlive: true,
        },
        component: () => import('@/pages/trials/trials.vue'),
    },
    {
        path: '/cases',
        name: 'Cases',
        meta: {
            title: '病例',
            keepAlive: true,
        },
        component: () => import('@/pages/cases/cases.vue'),
    },
    {
        path: '/revisit',
        name: 'Revisit',
        meta: {
            title: '随访',
            keepAlive: true,
        },
        component: () => import('@/pages/revisit/revisit.vue'),
    },
    {
        path: '/users',
        name: 'Users',
        meta: {
            title: '用户管理',
            keepAlive: true,
            admin: true, // 是否只有admin才能访问
        },
        component: () => import('@/pages/users/users.vue'),
    },
    {
        path: '/log',
        name: 'Log',
        meta: {
            title: '系统日志',
            keepAlive: true,
        },
        component: () => import('@/pages/log/log.vue'),
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
    } else if (to.meta.admin === '/users') {
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
