import { post, get } from '@/utils/request/index';
import { getAllTrialsRes } from './type';

/* 获取所有实验 */
const getAllTrials = async () => {
    const res = (await get('/experiment/get-all')) as getAllTrialsRes;
    return res;
};

export class trialApi {
    static getAllTrials = getAllTrials;
}
