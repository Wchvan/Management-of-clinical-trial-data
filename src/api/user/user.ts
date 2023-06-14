import { post, get } from '@/utils/request/index';
import {
    loginParm,
    loginRes,
    changePassParm,
    changePassRes,
    checkUserRes,
} from './type';

/* 登录 */
const login = async (params: loginParm) => {
    const res = (await post('/user/login', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })) as loginRes;
    return res;
};

/* 改密码 */
const changePass = async (params: changePassParm) => {
    const res = (await post('/user/change-password', params)) as changePassRes;
    return res;
};

/* 退出 */
const logout = async () => {
    post('/user/logout');
};

/* 检验登录是否过期 */
const checkUser = async () => {
    const res = (await get('/user/get-info')) as checkUserRes;
    return res;
};

export class userApi {
    static login = login;
    static changePass = changePass;
    static logout = logout;
    static checkUser = checkUser;
}
