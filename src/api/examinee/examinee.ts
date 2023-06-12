import { post, get } from '@/utils/request/index';
import {
    getAllExamineeParm,
    getAllExamineeRes,
    getRevisitDayParm,
    getRevisitDayRes,
    getRevisitSubjectsParm,
    getRevisitSubjectsRes,
} from './type';

/* 获取所有受试者数据 */
const getAllExaminee = async (params: getAllExamineeParm) => {
    const res = (await get('/data/get-all')) as getAllExamineeRes;
    return res;
};

/* 获取某个受试者详细信息 */
const getExamineeDetail = async () => {
    const res = await get('/data/get');
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

export class examineeApi {
    static getAllExaminee = getAllExaminee;
    static getRevisitDay = getRevisitDay;
    static getRevisitSubjects = getRevisitSubjects;
}
