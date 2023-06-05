import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import useUserStore from '@/store/user';
import useTrialsStore from '@/store/trials';

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
        path: '/trials/:id/:phase',
        name: 'TrialDetail',
        meta: {
            title: `实验分期详情`,
            keepAlive: true,
            trialDetail: true,
        },
        component: () => import('@/pages/trials/trials.vue'),
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
    {
        path: '/admin-users',
        name: 'AdminUsers',
        meta: {
            title: '用户管理',
            keepAlive: true,
            admin: true, // 是否只有admin才能访问
        },
        component: () => import('@/pages/admin/users/users.vue'),
    },
    {
        path: '/admin-log',
        name: 'AdminLog',
        meta: {
            title: '系统日志',
            keepAlive: true,
            admin: true, // 是否只有admin才能访问
        },
        component: () => import('@/pages/admin/log/log.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由守卫

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const trialStore = useTrialsStore();
    const isAuthenticated = userStore.userName;
    if (!to.matched.some((record) => record.meta.avoidAuth)) {
        if (!isAuthenticated) {
            next('/login');
        } else {
            if (to.meta.admin) {
                if (userStore.userRole === 'ROLE_ADMIN') {
                    next();
                } else {
                    alert('权限不够');
                    next(from.path);
                }
            } else {
                next();
            }
        }
    }
});

export default router;
