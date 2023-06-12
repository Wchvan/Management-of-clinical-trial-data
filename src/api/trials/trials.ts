import { post, get } from '@/utils/request/index';
import {
    getAllTrialsRes,
    getTrialDetailParm,
    getTrialDetailRes,
    createTrialParm,
    createTrialRes,
    changeTrialParm,
    changeTrialRes,
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

/* 新增实验 */
const createTrial = async (params: createTrialParm) => {
    const res = (await post('/experiment/add')) as createTrialRes;
    return res;
};

/* 修改当前试验分期/试验状态 */
const changeTrial = async (params: changeTrialParm) => {
    const res = (await post('/experiment/modify')) as changeTrialRes;
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
    static createTrial = createTrial;
    static changeTrial = changeTrial;
    static getUserTrials = getUserTrials;
}
