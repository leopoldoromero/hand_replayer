import { ApiConfig, HttpClient } from "@/modules/shared/domain/http_client";

export class HttpClientMock implements HttpClient {
    private mockGet = jest.fn();
    private mockPost = jest.fn();
    private data: unknown = null

    returnOnGet(data: unknown) {
        this.data = data;
    }

    async get<R>(url: string, config?: ApiConfig): Promise<R> {
        this.mockGet(url, config);
        return this.data as R;
    }

    assertGetHasBeenCalledWith(url: string, config?: ApiConfig) {
        const call = this.mockGet.mock.calls.find(
          ([calledUrl, calledConfig]) =>
            calledUrl === url && JSON.stringify(calledConfig) === JSON.stringify(config)
        );
        expect(call).toBeDefined();
      }
    
      async post<T>(url: string, data?: T, config?: ApiConfig): Promise<void> {
        this.mockPost(url, data, config);
      }
    
      assertPostHasBeenCalledWith<T>(url: string, data?: T, config?: ApiConfig) {
        const call = this.mockPost.mock.calls.find(
          ([calledUrl, calledData, calledConfig]) =>
            calledUrl === url &&
            JSON.stringify(calledData) === JSON.stringify(data) &&
            JSON.stringify(calledConfig) === JSON.stringify(config)
        );
        expect(call).toBeDefined();
      }
}