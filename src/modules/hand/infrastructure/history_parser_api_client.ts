import axios, { AxiosError, AxiosResponse } from 'axios';
import { Hand } from '../domain/hand';
import { HistoryParserRepository } from '../domain/history_parser.repository';
import { HistoryParserApiResponseDto } from './history_parser_api.response';

export class HistoryParserApiClient implements HistoryParserRepository {
  private readonly API_URL = process.env.API_URL;
  private readonly API_KEY = process.env.API_KEY;

  async parse(file: File): Promise<Array<Hand>> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post<File, AxiosResponse<HistoryParserApiResponseDto>>(
        `${this.API_URL}/api/v1/history`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key':  this.API_KEY,
          },
        }
      );
      return [];
    } catch (error: unknown) {
      console.error(
        'Error uploading file:',
        (error as AxiosError).response?.data
      );
      throw new Error(
        (error as AxiosError).message || 'Failed to parse hand history.'
      );
    }
  }

  async fetch(id: string): Promise<Array<Hand>> {
    console.log('Fetch hands', id);
    // TODO: Not impplemented yet
    return [];
  }
}
