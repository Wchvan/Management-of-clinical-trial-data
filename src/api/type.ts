export type apiRes<T> = {
    code: number;
    msg: string;
    data: T;
};
