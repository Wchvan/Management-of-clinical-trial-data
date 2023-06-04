import { apiRes } from '../type';

/* 实验相关 */
export type createTrialParm = {
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
};

export type changeTrialRes = apiRes<null>;

/* 获取用户信息 */
export type getUsersRes = apiRes<
    {
        id: string;
        name: string;
        username: string;
        role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_BANNED';
        phone: string;
    }[]
>;

/* 创建用户 */
export type createUserParm = {
    id: string;
    name: string;
    username: string;
    role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_BANNED';
    phone: string;
    expIDs: string[];
};

export type createUserRes = apiRes<null>;

/* 封禁用户 */
export type banUserParm = {
    userID: string;
    ban: boolean;
};

export type banUserRes = apiRes<null>;

/* 修改用户 */
export type changeUserParm = {
    id: string;
    name: string;
    username: string;
    role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_BANNED';
    phone: string;
    expIDs: string[];
};

export type changeUserRes = apiRes<null>;

/* 获取用户相关的实验信息 */
export type getUserTrialsParm = {
    userID: string;
};

export type getUserTrialsRes = apiRes<{
    expIDs: string[];
}>;

/* 获取系统日志 */
export type getLogRes = apiRes<
    {
        date: string;
        type: string;
        content: string;
    }[]
>;
