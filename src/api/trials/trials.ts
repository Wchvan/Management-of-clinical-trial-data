import { post, get } from '@/utils/request/index';
import { getAllTrialsRes, getUserTrialsRes } from './type';

/* 获取所有实验 */
const getAllTrials = async () => {
    const res = (await get('/experiment/get-all')) as getAllTrialsRes;
    return res;
};

/* 获取登录用户的相关实验信息 */
const getUserTrials = async () => {
    const res = (await get('/user/get-exp')) as getUserTrialsRes;
    return res;
};

export class trialApi {
    static getAllTrials = getAllTrials;
    static getUserTrials = getUserTrials;
}
