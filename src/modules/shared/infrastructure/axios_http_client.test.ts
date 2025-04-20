import axios, { AxiosInstance } from 'axios';
import { AxiosHttpClient } from './axios_http_client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
  let client: AxiosHttpClient;

  beforeEach(() => {
    // Mock the axios instance with interceptors
    mockedAxios.create.mockReturnValue({
      ...mockedAxios,
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    } as unknown as AxiosInstance);

    client = new AxiosHttpClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET request', () => {
    it('should make a GET request and return data', async () => {
      const responseData = { message: 'Success' };
      mockedAxios.get.mockResolvedValueOnce({ data: responseData });

      const result = await client.get('/test-url');

      expect(mockedAxios.get).toHaveBeenCalledWith('/test-url', undefined);
      expect(result).toEqual(responseData);
    });

    it('should handle GET request error', async () => {
      const errorResponse = {
        response: {
          status: 404,
          data: { detail: 'Not found' },
        },
        message: 'Request failed',
      };
      mockedAxios.get.mockRejectedValueOnce(errorResponse);

      await expect(client.get('/test-url')).rejects.toEqual(errorResponse);
    });
  });

  describe('POST request', () => {
    it('should make a POST request and return data', async () => {
      const responseData = { message: 'Created' };
      const requestData = { name: 'John' };
      mockedAxios.post.mockResolvedValueOnce({ data: responseData });

      const result = await client.post('/test-url', requestData);

      expect(mockedAxios.post).toHaveBeenCalledWith('/test-url', requestData, undefined);
      expect(result).toEqual(responseData);
    });

    it('should handle POST request error', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { detail: 'Bad request' },
        },
        message: 'Request failed',
      };
      mockedAxios.post.mockRejectedValueOnce(errorResponse);

      await expect(client.post('/test-url', { name: 'John' })).rejects.toEqual(errorResponse);
    });
  });
});
