import { post, get } from '@/utils/request/index';
import {
    getAllTrialsRes,
    getTrialDetailParm,
    getTrialDetailRes,
    getUserTrialsRes,
} from './type';

/* 获取所有实验 */
const getAllTrials = async () => {
    const res = (await get('/experiment/get-all')) as getAllTrialsRes;
    return res;
};

/* 根据登记号获取实验详情 */
const getTrialDetail = async (parms: getTrialDetailParm) => {
    const res = (await get('/experiment/get')) as getTrialDetailRes;
    return res;
};

/* 获取登录用户的相关实验信息 */
const getUserTrials = async () => {
    const res = (await get('/user/get-exp')) as getUserTrialsRes;
    return res;
};

export class trialApi {
    static getAllTrials = getAllTrials;
    static getTrialDetail = getTrialDetail;
    static getUserTrials = getUserTrials;
}
