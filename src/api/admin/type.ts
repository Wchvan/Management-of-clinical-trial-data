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
