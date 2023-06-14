import { apiRes } from '../type';

export type getAllExamineeParm = {
    clin_stage: string;
    ctr: string;
};

export type getAllExamineeRes = apiRes<
    {
        age: number;
        gender: string;
        last_medicine: string;
        subject_id: string;
    }[]
>;

/* 获取受试者详情 */
export type getExamineeDetailParm = {
    ctr: string;
    subject_id: string;
    clin_stage: string;
};

export type getExamineeDetailRes = apiRes<{
    address: string;
    age: string;
    allergen: string;
    gender: string;
    genetic: string;
    handedness: string;
    id_num: string;
    med_history: string;
    name: string;
    subject_id: string;
    tel: string;
    treat: string;
}>;

/* 修改受试者信息 */
export type changeExamineeInfoParm = {
    subject_id: string;
    ctr: string;
    info: {
        address: string;
        age: string;
        allergen: string;
        gender: string;
        genetic: string;
        handedness: string;
        id_num: string;
        med_history: string;
        name: string;
        subject_id: string;
        tel: string;
        treat: string;
    };
};

export type changeExamineeInfoRes = apiRes<null>;

/* 查询受试者信息 */
export type searchExamineeParm = {
    clin_stage: string;
    ctr: string;
    subject_id: string;
    name: string;
    gender: string;
    age: string;
};

export type searchExamineeRes = apiRes<
    {
        age: number;
        gender: string;
        last_medicine: string;
        subject_id: string;
    }[]
>;

/* 上传受试者信息 */
export type postExamineeParm = FormData;

export type postExamineeRes = apiRes<null>;

/* 删除受试者信息 */
export type deleteExamineeParm = {
    clin_stage: string;
    ctr: string;
    subject_id: string;
};

export type deleteExamineeRes = apiRes<null>;

/* 上传实验信息 */
export type postTrialDataParm = FormData;

export type postTrialDataRes = apiRes<null>;

/* 上传随访者信息 */
export type postRevisitParm = FormData;

export type postRevisitRes = apiRes<null>;

/* 获取随访日期 */
export type getRevisitDayParm = {
    month: string;
};

export type getRevisitDayRes = apiRes<string[]>;

/* 根据日期获取随访者具体参数 */
export type getRevisitSubjectsParm = {
    date: string;
    ctr: string;
};

export type getRevisitSubjectsRes = apiRes<
    {
        address: string;
        date: string;
        name: string;
        subject_id: string;
        tel: string;
        time: string;
        user_id: string;
    }[]
>;
