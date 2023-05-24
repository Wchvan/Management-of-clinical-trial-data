import { apiRes } from '../type';

export type loginParm = {
    username: string;
    password: string;
    remember_me: boolean;
};

export type loginRes = apiRes<{
    username: string;
    type: 'admin' | 'user';
}>;
