import { apiRes } from '../type';

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

/* 获取用户的实验 */
export type getUserTrialsRes = getAllTrialsRes;
