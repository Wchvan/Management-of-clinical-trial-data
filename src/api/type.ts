export type apiRes<T> = {
    code: boolean;
    msg: string;
    data: T;
};
