import { post, get } from '@/utils/request/index';
import {
    getAllExamineeParm,
    getAllExamineeRes,
    getExamineeDetailParm,
    getExamineeDetailRes,
    changeExamineeInfoParm,
    changeExamineeInfoRes,
    getRevisitDayParm,
    getRevisitDayRes,
    getRevisitSubjectsParm,
    getRevisitSubjectsRes,
    searchExamineeParm,
    searchExamineeRes,
    postExamineeParm,
    postExamineeRes,
    postRevisitParm,
    postRevisitRes,
    postTrialDataParm,
    postTrialDataRes,
    deleteExamineeParm,
    deleteExamineeRes,
} from './type';

/* 获取所有受试者数据 */
const getAllExaminee = async (params: getAllExamineeParm) => {
    const res = (await get('/data/get-all', params)) as getAllExamineeRes;
    return res;
};

/* 获取某个受试者详细信息 */
const getExamineeDetail = async (params: getExamineeDetailParm) => {
    const res = (await get('/data/get', params)) as getExamineeDetailRes;
    return res;
};

/* 修改受试者信息 */
const changeExamineeInfo = async (params: changeExamineeInfoParm) => {
    const res = (await post('/data/update', params)) as changeExamineeInfoRes;
    return res;
};

/* 查询受试者 */
const searchExaminee = async (params: searchExamineeParm) => {
    const res = (await post('/data/search', params)) as searchExamineeRes;
    return res;
};

/* Excel上传受试者信息 */
const postExaminee = async (params: postExamineeParm) => {
    const res = (await post('/data/upload-xls', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })) as postExamineeRes;
    return res;
};

/* 删除受试者信息 */
const deleteExaminee = async (params: deleteExamineeParm) => {
    const res = (await post('/data/delete', params)) as deleteExamineeRes;
    return res;
};

/* Excel上传实验信息信息 */
const postTrialData = async (params: postTrialDataParm) => {
    const res = (await post('/data/upload-exp-xls', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })) as postTrialDataRes;
    return res;
};

/* 获取有随访的日期 */
const getRevisitDay = async (params: getRevisitDayParm) => {
    const res = (await get('/experiment/get-date', params)) as getRevisitDayRes;
    return res;
};

/* 根据日期获取相关人员信息 */
const getRevisitSubjects = async (params: getRevisitSubjectsParm) => {
    const res = (await get(
        '/experiment/get-followup',
        params,
    )) as getRevisitSubjectsRes;
    return res;
};

/* Excel上传随访者者信息 */
const postRevisit = async (params: postRevisitParm) => {
    const res = (await post('/experiment/upload-followup-xls', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })) as postRevisitRes;
    return res;
};

export class examineeApi {
    static getAllExaminee = getAllExaminee;
    static getRevisitDay = getRevisitDay;
    static getRevisitSubjects = getRevisitSubjects;
    static getExamineeDetail = getExamineeDetail;
    static postExmainee = postExaminee;
    static postTrialData = postTrialData;
    static deleteExaminee = deleteExaminee;
    static searchExaminee = searchExaminee;
    static postRevisit = postRevisit;
    static changeExamineeInfo = changeExamineeInfo;
}
