import { post, get } from '@/utils/request/index';
import {
    getAllTrialsRes,
    getUserTrialsRes,
    getRevisitDayParm,
    getRevisitDayRes,
    getRevisitSubjectsParm,
    getRevisitSubjectsRes,
} from './type';

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

/* 获取有随访的日期 */
const getRevisitDay = async (params: getRevisitDayParm) => {
    const res = (await get('/experiment/get-date')) as getRevisitDayRes;
    return res;
};

/* 根据日期获取相关人员信息 */
const getRevisitSubjects = async (parms: getRevisitSubjectsParm) => {
    const res = (await get(
        '/experiment/get-followup',
    )) as getRevisitSubjectsRes;
    return res;
};

export class trialApi {
    static getAllTrials = getAllTrials;
    static getUserTrials = getUserTrials;
    static getRevisitDay = getRevisitDay;
    static getRevisitSubjects = getRevisitSubjects;
}
