'use server';
import { Hand } from '@/modules/hand/domain/hand';
import { HistoryParserApiClient } from '@/modules/hand/infrastructure/history_parser_api_client';

const parserApiClient = new HistoryParserApiClient();

export async function uploadHistoryAction(file: File): Promise<Array<Hand>> {
  return parserApiClient.parse(file);
}
