import { apiRes } from '../type';

export type loginParm = {
    username: string;
    password: string;
};

export type loginRes = apiRes<{
    username: string;
    type: 'admin' | 'user';
}>;
