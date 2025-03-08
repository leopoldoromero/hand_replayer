/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiConfig, HttpClient, HttpClientResponse } from "@/modules/hand/domain/http_client";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpClient {
    // protected client: AxiosInstance;

    // public constructor() {
    //     this.client = axios.create();
    //     this.client.interceptors.response.use(this.handleResponse);
    //     this.client.interceptors.request.use(this.handleRequest);
    // }

    async get<R>(url: string, config?: ApiConfig): Promise<R> {
        console.log('[[Axios GET request]]:', url, config)
        const response: AxiosResponse<R> = await axios.get(url, config);
        console.log('[[Axios GET response]]:', response?.data)
        return response.data;
    }

    async post<T = any, R = HttpClientResponse<T>>(url: string, data?: T, config?: ApiConfig): Promise<R> {
        console.log('[[Axios POST request]]:', url, data, config)
        const response: AxiosResponse<R> = await axios.post(url, data, config);
        console.log('[[Axios POST response]]:', response?.data)
        return response.data;
    }

    private handleRequest = (config: any) => {
        console.log('[[Axios handle reqwuest]]:', config)
        return config;
    };

    private handleResponse = (response: AxiosResponse) => {
        console.log('[[Axios handle response]]:', response.data, response.status)
        return response;
    };
}

export const getAxiosHttpClient = () => new AxiosHttpClient();
