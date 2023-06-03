import { apiRes } from '../type';

/* 登录相关 */
export type loginParm = {
    username: string;
    password: string;
    remember_me: boolean;
};

export type loginRes = apiRes<{
    username: string;
    role: 'ROLE_ADMIN' | 'ROLE_USER';
}>;

/* 修改密码相关 */
export type changePassParm = {
    username: string;
    password: string;
};

export type changePassRes = apiRes<null>;
