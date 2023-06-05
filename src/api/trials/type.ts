import { apiRes } from '../type';

export type getAllTrialsRes = apiRes<
    {
        _id: string;
        试验题目: string;
        药物名称: string;
        试验状态: string;
        试验分期: string;
        申办者: string;
        登记日期: string;
        企业名称: string;
        企业联系人: string;
        企业注册地址: string;
    }[]
>;

export type getUserTrialsRes = getAllTrialsRes;

export type getRevisitDayParm = {
    month: string;
};

export type getRevisitDayRes = apiRes<string[]>;

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
