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
    searchTrialParm,
    searchTrialRes,
} from './type';

/* 获取所有实验 */
const getAllTrials = async () => {
    const res = (await get('/experiment/get-all')) as getAllTrialsRes;
    return res;
};

/* 根据登记号获取实验详情 */
const getTrialDetail = async (params: getTrialDetailParm) => {
    const res = (await get('/experiment/get', params)) as getTrialDetailRes;
    return res;
};

/* 新增实验 */
const createTrial = async (params: createTrialParm) => {
    const res = (await post('/experiment/add', params)) as createTrialRes;
    return res;
};

/* 修改当前试验分期/试验状态 */
const changeTrial = async (params: changeTrialParm) => {
    const res = (await post('/experiment/modify', params)) as changeTrialRes;
    return res;
};

/* 查询实验 */
const searchTrial = async (params: searchTrialParm) => {
    const res = (await post('/experiment/search', params)) as searchTrialRes;
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
    static searchTrial = searchTrial;
    static getUserTrials = getUserTrials;
}
