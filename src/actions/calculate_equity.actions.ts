'use server';
import { Equity } from '@/modules/equity/domain/equity';
import { CalculateHandVsRangeInput, CalculateRangeVsRangeInput } from '@/modules/equity/domain/equity.repository';
import { equityApiClient } from '@/modules/equity/infrastructure/equity_api_client';

export async function calculateHandVsRangeEquityAction(input: CalculateHandVsRangeInput): Promise<Equity> {
  return equityApiClient.calculateHandVsRange(input);
}

export async function calculateRangeVsRangeEquityAction(input: CalculateRangeVsRangeInput): Promise<Equity> {
  return equityApiClient.calculateRangeVsRange(input);
}
