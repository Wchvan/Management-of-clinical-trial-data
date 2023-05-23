import axios from 'axios';
import type {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosRequestHeaders,
} from 'axios';

type InternalAxiosRequestConfig<T> = AxiosRequestConfig<T> & {
    headers: AxiosRequestHeaders;
};

const request = axios.create();

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        // do something
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    },
);

// Response interceptors
request.interceptors.response.use(
    async (
        response: AxiosResponse<any, InternalAxiosRequestConfig<any>>,
    ): Promise<AxiosResponse<any, InternalAxiosRequestConfig<any>>> => {
        // do something
        return response;
    },
    (error: any) => {
        // do something
        return Promise.reject(error);
    },
);

export default request;
