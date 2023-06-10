import axios, { AxiosInstance } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

const baseURL =
    process.env.NODE_ENV == 'development'
        ? '/api'
        : 'http://127.0.0.1:4523/m1/2767636-0-default/';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
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
