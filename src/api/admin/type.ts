import { apiRes } from '../type';

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

/* 查询用户 */
export type searchUserParm = {
    name?: string;
    phone?: string;
    role?: string;
    username?: string;
};

export type searchUserRes = apiRes<
    {
        id: string;
        name: string;
        username: string;
        role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_BANNED';
        phone: string;
    }[]
>;

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
        type: 'danger' | 'info' | 'warning';
        content: string;
    }[]
>;
