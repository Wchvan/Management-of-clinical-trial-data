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
};

export type getExamineeDetailRes = {
    /**
     * 地址
     */
    address: string;
    /**
     * 年龄
     */
    age: string;
    /**
     * 过敏原，可变
     */
    allergen: string;
    /**
     * 性别
     */
    gender: string;
    /**
     * 家族遗传病史，可变
     */
    genetic: string;
    /**
     * 利手，可变
     */
    handedness: string;
    /**
     * 身份证号
     */
    id_num: string;
    /**
     * 病史，可变
     */
    med_history: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 受试者编号
     */
    subject_id: string;
    /**
     * 电话
     */
    tel: string;
    /**
     * 治疗，可变
     */
    treat: string;
};

/* 获取随访日期 */
export type getRevisitDayParm = {
    month: string;
};

export type getRevisitDayRes = apiRes<string[]>;

/* 根据日期获取随访者具体参数 */
export type getRevisitSubjectsParm = {
    date: string;
};

export type getRevisitSubjectsRes = apiRes<
    {
        address: string;
        date: string;
        subjectID: string;
        time: string;
        userID: string;
        phone: string;
        name: string;
    }[]
>;
