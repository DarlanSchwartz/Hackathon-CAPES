import Toaster from "../Utils/Notifications.service";
import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import BaseProvider from "./Base.provider";
import { LocalStorageKeys } from "../Protocols/Main.types";
import LocalStorage from "../Services/LocalStorage.service";
/**
 * @class AxiosProvider
 * @description Singleton class to handle Axios requests
 * @example
 * const api = new AxiosProvider('https://api.example.com', (error) => {
 *    console.error(error);
 * }, 'token');
 * api.get('/users').then(response => console.log(response));
 * api.post('/users', { name: 'John Doe' }).then(response => console.log(response));
 * api.put('/users/1', { name: 'Jane Doe' }).then(response => console.log(response));
 * api.delete('/users/1').then(response => console.log(response));
 *
 */

type ApiResponse<T> = { response: T; } | T;
export default class APIProvider implements BaseProvider {
    public readonly provider: AxiosInstance;
    public readonly baseURL: string;
    public debug: boolean;
    onError: (error: AxiosError) => void;
    constructor(onError?: (error: AxiosError) => void) {
        const currentEnv = import.meta.env.VITE_PROJECT_ENVIRONMENT;

        switch (currentEnv) {
            case "local":
                this.baseURL = import.meta.env.VITE_API_URL_LOCAL;
                break;
            case "dev":
                this.baseURL = import.meta.env.VITE_API_URL_DEV;
                break;
            case "hml":
                this.baseURL = import.meta.env.VITE_API_URL_HML;
                break;
            case "prod":
                this.baseURL = import.meta.env.VITE_API_URL_PROD;
                break;
            default:
                this.baseURL = import.meta.env.VITE_API_URL;
        }

        this.provider = axios.create({
            baseURL: this.baseURL,
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            },
            timeoutErrorMessage: "Request timeout",
            timeout: import.meta.env.VITE_APP_API_TIMEOUT,
        });
        //no caso do token não existir no local storage, o define no provider
        this.provider.interceptors.request.use((config) => {
            const token = LocalStorage.getItem(LocalStorageKeys.TOKEN);
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        });

        this.onError = onError ?? this.onErrorHandler;
        this.debug = import.meta.env.MODE === "development";
    }

    //devido às rotas antigas retornarem os dados dentro do objeto response e as novas não
    private extractData<T>(data: ApiResponse<T>): T {
        if (typeof data === "object" && data !== null && "response" in data) {
            return data.response;
        } else {
            return data;
        }
    }

    private onErrorHandler(error: AxiosError) {
        Toaster.notify(error.message, "error");
    }

    public async post<T = unknown, D = unknown>(
        path: string,
        data: D,
        params?: AxiosRequestConfig
    ) {
        try {
            const response = await this.provider.post<ApiResponse<T>>(
                path,
                data,
                params
            );
            return this.extractData(response.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                this.onError(error);
            }
        }
    }

    public async put<T = unknown, D = unknown>(path: string, data: D, params?: AxiosRequestConfig) {
        try {
            const response = await this.provider.put<ApiResponse<T>>(
                path,
                data,
                params
            );
            return this.extractData(response.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                this.onError(error);
            }
        }
    }

    public async get<T = unknown>(path: string, params?: AxiosRequestConfig) {
        try {
            const { data } = await this.provider.get<ApiResponse<T>>(
                path,
                params
            );
            return this.extractData(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                this.onError(error);
            }
        }
    }

    public async delete<T = unknown>(
        path: string,
        params?: AxiosRequestConfig
    ) {
        try {
            const { data } = await this.provider.delete<ApiResponse<T>>(
                path,
                params
            );
            return this.extractData(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                this.onError(error);
            }
        }
    }
}
