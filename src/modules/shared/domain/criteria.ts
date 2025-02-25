import { CriteriaOrder } from './criteria-order';
import { CriteriaFilter } from './criteria_filter';

export class Criteria {
  constructor(
    readonly filters?: Array<CriteriaFilter>,
    readonly order?: Array<CriteriaOrder>,
    readonly page?: number,
    readonly limit?: number
  ) {}
}
