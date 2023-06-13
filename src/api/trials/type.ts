import { apiRes } from '../type';

/* 获取所有实验信息 */
export type getAllTrialsRes = apiRes<
    {
        clin_stage: string;
        clin_status: string;
        ctr: string;
        indication: string;
        med_name: string;
        title: string;
    }[]
>;

/* 获取单次实验详情 */
export type getTrialDetailParm = {
    ctr: string;
};

export type getTrialDetailRes = apiRes<{
    clin_stage: string;
    clin_status: string;
    contact: string;
    ctr: string;
    company: string;
    indication: string;
    med_name: string;
    reg_date: string;
    reg_location: string;
    sponsor: string;
    title: string;
}>;

/* 新增实验相关 */
export type createTrialParm = {
    clin_stage: string;
    clin_status: string;
    contact: string;
    ctr: string;
    company: string;
    indication: string;
    med_name: string;
    reg_date: string;
    reg_location: string;
    sponsor: string;
    title: string;
};

export type createTrialRes = apiRes<null>;

/* 修改当前试验分期/试验状态 */
export type changeTrialParm = {
    clin_stage: string;
    clin_status: string;
    ctr: string;
};
export type changeTrialRes = apiRes<null>;

/* 查询实验 */
export type searchTrialParm = {
    clin_stage?: string;
    clin_status?: string;
    ctr?: string;
    indication?: string;
    med_name?: string;
    title?: string;
};

export type searchTrialRes = apiRes<
    {
        clin_stage: string;
        clin_status: string;
        ctr: string;
        indication: string;
        med_name: string;
        title: string;
    }[]
>;

/* 获取用户的实验 */
export type getUserTrialsRes = getAllTrialsRes;
