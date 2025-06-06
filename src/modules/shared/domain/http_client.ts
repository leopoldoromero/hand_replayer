import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type HttpClientResponse<T> = AxiosResponse<T>;
export type ApiConfig = AxiosRequestConfig;
export type ApiResponse<T> = AxiosResponse<T>;
export type ApiRequestConfig = AxiosRequestConfig;

export interface HttpClient {
  get<R>(url: string, config?: ApiConfig): Promise<R>;
  post<T, R>(
    url: string,
    data?: T,
    config?: ApiConfig
  ): Promise<Promise<R>>;
}

export type  HttpClientError = {
  status: number;
  data: {
    detail: unknown;
  };
  message: string;
}