import { HandApiClient } from './hand_api_client';
import { HandDto } from './history_parser_api.response';
import { HttpClientMock } from '@/__mocks__/http_client.mock';
import { handApiResponseMock, playerStatsMock, statsApiResponseMock } from '@/__mocks__/hand_api_response.mock';

jest.mock('uuid');
jest.mock('next/headers', () => ({
  cookies: jest.fn().mockReturnValue({
    get: jest.fn(() => ({ value: 'mocked_user_id' })),
    set: jest.fn(),
  }),
}));

describe('HandApiClient', () => {
  let httpClientMock: HttpClientMock;
  let handApiClient: HandApiClient;

  beforeEach(() => {
    httpClientMock = new HttpClientMock();
    handApiClient = new HandApiClient(httpClientMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('upload', () => {
    it('should upload a file successfully', async () => {
        const file = new File(['content'], 'hand.txt', { type: 'text/plain' });
        const formData = new FormData();
        formData.append('file', file);
      
      await handApiClient.upload(file);

      httpClientMock.assertPostHasBeenCalledWith(
        `${process.env.API_URL}/api/v1/hands`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': process.env.API_KEY,
            'x-api-key': process.env.API_KEY,
            Cookie: `user_id=mocked_user_id`,
          },
          withCredentials: true,
        }
      );
    });
  });

  describe('get', () => {
    it('should return the correct hand and neighboring hands', async () => {
      const mockResponse = {
        hand: handApiResponseMock,
        prev_hand_id: '0',
        next_hand_id: '2',
      };
      httpClientMock.returnOnGet(mockResponse);
      jest.spyOn(handApiClient, 'getStats').mockResolvedValue(playerStatsMock);

      const result = await handApiClient.get('1');

      httpClientMock.assertGetHasBeenCalledWith(
        `${process.env.API_URL}/api/v1/hands/1`,
        {
            headers: {
              'Access-Control-Allow-Origin': process.env.API_KEY,
              'x-api-key': process.env.API_KEY,
              Cookie: `user_id=mocked_user_id`,
            },
            withCredentials: true,
        }
      );

      expect(result?.prevHandId).toEqual(mockResponse.prev_hand_id)
      expect(result?.nextHandId).toEqual(mockResponse.next_hand_id)
    });
  });

  describe('getAll', () => {
    it('should retrieve all hands successfully', async () => {
      const mockHands = [handApiResponseMock] as Array<HandDto>;
      httpClientMock.returnOnGet(mockHands);

      const result = await handApiClient.getAll();

      expect(result?.length).toEqual(1);

      httpClientMock.assertGetHasBeenCalledWith(
        `${process.env.API_URL}/api/v1/hands`,
        {
            headers: {
              'Access-Control-Allow-Origin': process.env.API_KEY,
              'x-api-key': process.env.API_KEY,
              Cookie: `user_id=mocked_user_id`,
            },
            withCredentials: true,
        }
      );
    });
  });

  describe('getStats', () => {
    it('should retrieve player stats correctly', async () => {
      httpClientMock.returnOnGet(statsApiResponseMock);

      const result = await handApiClient.getStats();

      httpClientMock.assertGetHasBeenCalledWith(
        `${process.env.API_URL}/api/v1/stats`,
        {
            headers: {
              'Access-Control-Allow-Origin': process.env.API_KEY,
              'x-api-key': process.env.API_KEY,
              Cookie: `user_id=mocked_user_id`,
            },
            withCredentials: true,
        }
      );
      expect(result['player1']['hands']).toEqual(statsApiResponseMock['player1']['hands']);
      expect(result['player1']['pfr']).toEqual(statsApiResponseMock['player1']['pfr']);
      expect(result['player1']['vpip']).toEqual(statsApiResponseMock['player1']['vpip']);
      expect(result['player1']['threeBetPercent']).toEqual(statsApiResponseMock['player1']['three_bet_percent']);
    });
  });
});
