import { post } from '@/utils/request/index';
import { loginParm, loginRes, changePassParm, changePassRes } from './type';

const login = async (params: loginParm) => {
    const res = (await post('/user/login', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })) as loginRes;
    return res;
};

const changePass = async (params: changePassParm) => {
    const res = (await post('/user/change-password', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })) as changePassRes;
    return res;
};

const logout = async () => {
    await post('/user/logout');
};

export class userApi {
    static login = login;
    static changePass = changePass;
    static logout = logout;
}
