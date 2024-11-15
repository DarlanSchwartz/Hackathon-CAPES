import {  AxiosRequestConfig } from 'axios';

export default interface BaseProvider {
    post<T = unknown>(path: string, data: T, params?: AxiosRequestConfig): Promise<T | undefined>;
    put<T = unknown>(path: string, data: T, params?: AxiosRequestConfig): Promise<T | undefined>;
    get<T = unknown>(path: string, params?: AxiosRequestConfig): Promise<T | undefined>;
    delete<T = unknown>(path: string, params?: AxiosRequestConfig): Promise<T | undefined>;
}