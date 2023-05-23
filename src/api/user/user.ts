import { post } from '@/utils/api/api';
import { loginParm, loginRes } from './type';
import useUserStore from '@/store/user';

const userStore = useUserStore();

const login = async (params: loginParm) => {
    const res = (await post('/user/login', params)) as loginRes;
    if (res.code === true) {
        userStore.changeUserInfo(res.data.username, res.data.type);
    } else {
        alert(res.msg);
    }
};

class UserApi {
    static login = login;
}
