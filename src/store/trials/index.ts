import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { trailsType } from './type';
import { trialApi } from '@/api/trials/trials';
import { getAllTrialsRes, getUserTrialsRes } from '@/api/trials/type';
import useUserStore from '../user';

const useTrialsStore = defineStore(
    'trials',
    () => {
        const userStore = useUserStore();
        const trials = ref<trailsType[]>([]);

        // 请求所有的实验数据
        const getAllTrials = async () => {
            if (userStore.userRole === 'ROLE_ADMIN') {
                const res = (await trialApi.getAllTrials()) as getAllTrialsRes;
                if (res.code === 200) {
                    trials.value = res.data;
                }
            } else {
                const res =
                    (await trialApi.getUserTrials()) as getUserTrialsRes;
                if (res.code === 200) {
                    trials.value = res.data;
                }
            }
        };

        return {
            trials,
            getAllTrials,
        };
    },
    /*  {
        persist: {
            storage: localStorage, //修改存储位置
            key: '', //设置存储的key
            paths: [], //指定要长久化的字段
        },
    }, */
);

export default useTrialsStore;
