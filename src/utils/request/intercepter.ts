import axios, { AxiosInstance } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

const baseURL =
    process.env.NODE_ENV == 'development' ? '/api' : 'https://api.revocat.tech';

axios.defaults.withCredentials = true;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.revocat.tech',
    timeout: 5000,
    withCredentials: true,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        return config;
    },
    (error: any) => {
        // 处理请求错误
        return Promise.reject(error);
    },
);
// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response;
    },
    (error: any) => {
        // 处理响应错误
        return console.log(error);
    },
);
export default axiosInstance;
