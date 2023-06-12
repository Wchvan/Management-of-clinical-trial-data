import { post, get } from '@/utils/request/index';
import {
    getUsersRes,
    banUserParm,
    banUserRes,
    changeUserParm,
    changeUserRes,
    getUserTrialsParm,
    getUserTrialsRes,
    getLogRes,
    createUserParm,
    createUserRes,
} from './type';

/* 用户管理相关 */
const getUsers = async () => {
    const res = (await get('/user/get-all-users')) as getUsersRes;
    return res;
};

const createUser = async (params: createUserParm) => {
    const res = (await post('/user/add-user', params)) as createUserRes;
    return res;
};

const banUser = async (params: banUserParm) => {
    const res = (await post('/user/ban-user', params)) as banUserRes;
    return res;
};

const changeUser = async (params: changeUserParm) => {
    const res = (await post('/user/change-info', params)) as changeUserRes;
    return res;
};

/* 获取和用户相关的实验数据 TODO*/
const getUserTrials = async (params: getUserTrialsParm) => {
    const res = (await get('/user/get-user-exp', params)) as getUserTrialsRes;
    return res;
};

/* 获取系统日志 */
const getLog = async () => {
    const res = (await get('/log/get')) as getLogRes;
    return res;
};

export class adminApi {
    static getUsers = getUsers;
    static createUser = createUser;
    static banUser = banUser;
    static changeUser = changeUser;
    static getUserTrials = getUserTrials;
    static getLog = getLog;
}
