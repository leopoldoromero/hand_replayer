/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSessionDataAction } from '@/actions/session.actions';
import {
  ApiConfig,
  HttpClient,
} from '@/modules/shared/domain/http_client';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import { cookies } from 'next/headers';
// import { v4 as uuidv4 } from 'uuid';

export interface HttpErrorDto {
  detail?: string | Array<{
      type: string,
      msg: string,
    }>;
  code?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export class AxiosHttpClient implements HttpClient {
  protected client: AxiosInstance;
  private readonly API_URL = process.env.API_URL;
  private readonly API_KEY = process.env.API_KEY;

  public constructor() {
    console.log("AxiosHttpClient initialized", Math.random());

    this.client = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': this.API_URL,
        'x-api-key': this.API_KEY,
      },
      withCredentials: true,
    });
    this.client.interceptors.request.use(this.handleRequest);
    this.client.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  async get<R>(url: string, config?: ApiConfig): Promise<R> {
    const session = await getSessionDataAction();
    const identifier = session.accessToken
    ? { Authorization: `Bearer ${session.accessToken}` }
    : { 'X-Guest-ID': session.guestId };

    if (config && config.headers) {
         config.headers = {
          ...config.headers,
          ...identifier,
         }
      } else {
        config = {
          headers: {...identifier},
        };
    }
    const response: AxiosResponse<R> = await this.client.get(url, config);
    return response.data;
  }

  async post<T = any, R = any>(
    url: string,
    data?: T,
    config?: ApiConfig
  ): Promise<R> {
    const session = await getSessionDataAction();
    const identifier = session.accessToken
    ? { Authorization: `Bearer ${session.accessToken}` }
    : { 'X-Guest-ID': session.guestId };

    if (config && config.headers) {
         config.headers = {
          ...config.headers,
          ...identifier,
         }
      } else {
        config = {
          headers: {...identifier},
        };
    }
    const response: AxiosResponse<R> = await this.client.post(
      url,
      data,
      config,
    );
    return response.data;
  }

  private handleRequest = (config: any) => {
    console.log('[[Axios handle request]]:', config.url, config.headers);
    return config;
  };

  private handleResponse = (response: AxiosResponse) => {
    console.log('[[Axios handle response]]:', JSON.stringify(response.data), response.status);
    return response;
  };

  private handleError = (error: any): never => {
    const httpError: HttpErrorDto = error.response?.data || {};

    if (error.response) {
      console.error(
        '[[Axios handle error response]]:',
        httpError,
        error.response.status
      );

      throw {
        status: error.response.status,
        data: httpError,
        message: Array.isArray(httpError!.detail) ? httpError!.detail![0].msg : httpError!.message,
        isAxiosError: true,
      };
    } else if (error.request) {
      console.error('[[Axios handle error request]]:', error.request);

      throw {
        status: null,
        data: {},
        message: 'No response received from server',
        isAxiosError: true,
      };
    } else {
      console.error('[[Axios handle error message]]:', error.message);

      throw {
        status: null,
        data: {},
        message: error.message,
        isAxiosError: true,
      };
    }
  };
}

let httpClientSingleton: AxiosHttpClient | null = null;

export const getAxiosHttpClient = (): AxiosHttpClient => {
  if (!httpClientSingleton) {
    httpClientSingleton = new AxiosHttpClient();
  }
  return httpClientSingleton;
};

