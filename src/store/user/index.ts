import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { userRoleType } from './type';
import { userApi } from '@/api/user/user';
import type {
    loginParm,
    loginRes,
    changePassParm,
    changePassRes,
} from '@/api/user/type';

const useUserStore = defineStore(
    'user',
    () => {
        const userName = ref<string>('');
        const userRole = ref<userRoleType>('');

        // 用户信息初始化
        function initUserInfo() {
            userName.value = '';
            userRole.value = '';
        }

        // 修改用户信息
        function changeUserInfo(name: string, role: userRoleType) {
            userName.value = name;
            userRole.value = role;
        }

        // 登录账户
        async function login(params: loginParm) {
            const res = (await userApi.login(params)) as loginRes;
            if (res.code === 200) {
                changeUserInfo(res.data.username, res.data.role);
            }
            return res;
        }

        // 修改密码相关
        async function changePass(params: changePassParm) {
            const res = (await userApi.changePass(params)) as changePassRes;
            return res;
        }

        // 退出登录
        async function logout() {
            userApi.logout();
            initUserInfo();
        }

        return {
            userName,
            userRole,
            changeUserInfo,
            initUserInfo,
            login,
            changePass,
            logout,
        };
    },
    {
        persist: {
            storage: localStorage, //修改存储位置
            key: 'userInfo', //设置存储的key
            paths: ['userName', 'userRole'], //指定要长久化的字段
        },
    },
);

export default useUserStore;
