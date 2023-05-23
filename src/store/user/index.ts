import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { userType } from './type';

const useUserStore = defineStore(
    'user',
    () => {
        const userName = ref<string>('');
        const userClass = ref<userType>('');

        // 修改用户信息
        function changeUserInfo(name: string, type: userType) {
            userName.value = name;
            userClass.value = type;
        }

        function initUserInfo() {
            userName.value = '';
            userClass.value = '';
        }

        return { userName, userClass, changeUserInfo };
    },
    {
        persist: {
            storage: localStorage, //修改存储位置
            key: 'userInfo', //设置存储的key
            paths: ['userName', 'userClass'], //指定要长久化的字段
        },
    },
);

export default useUserStore;
