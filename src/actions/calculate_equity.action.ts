'use server';
import { Equity } from '@/modules/equity/domain/equity';
import { CalculateEquityInput } from '@/modules/equity/domain/equity.repository';
import { equityApiClient } from '@/modules/equity/infrastructure/equity_api_client';

export async function calculateEquityAction(input: CalculateEquityInput): Promise<Equity> {
  return equityApiClient.calculate(input);
}
