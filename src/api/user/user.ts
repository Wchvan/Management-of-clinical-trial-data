import { post } from '@/utils/request/index';
import { loginParm, loginRes } from './type';
import useUserStore from '@/store/user';

const userStore = useUserStore();

const login = async (params: loginParm) => {
    const res = (await post('/user/login', params)) as loginRes;
    if (res.code === 200) {
        userStore.changeUserInfo(res.data.username, res.data.type);
    } else {
        alert(res.msg);
    }
    return res.code;
};

export class userApi {
    static login = login;
}
