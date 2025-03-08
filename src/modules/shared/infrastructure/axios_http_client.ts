/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiConfig, HttpClient, HttpClientResponse } from "@/modules/hand/domain/http_client";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpClient {
    protected client: AxiosInstance;

    public constructor() {
        this.client = axios.create();
        this.client.interceptors.response.use(this.handleResponse);
        this.client.interceptors.request.use(this.handleRequest);
    }

    async get<R>(url: string, config?: ApiConfig): Promise<R> {
        const response: AxiosResponse<R> = await this.client.get(url, config);
        return response.data;
    }

    async post<T = any, R = HttpClientResponse<T>>(url: string, data?: T, config?: ApiConfig): Promise<R> {
        const response: AxiosResponse<R> = await this.client.post(url, data, config);
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
