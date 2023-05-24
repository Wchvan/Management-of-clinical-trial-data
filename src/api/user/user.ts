import { post } from '@/utils/request/index';
import { loginParm, loginRes } from './type';

const login = async (params: loginParm) => {
    const res = (await post('/user/login', params)) as loginRes;
    return res;
};

const logout = async () => {
    const res = await post('/user/logout');
};

export class userApi {
    static login = login;
    static logout = logout;
}
