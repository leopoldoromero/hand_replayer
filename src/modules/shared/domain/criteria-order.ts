export enum CriteriaOrderTypes {
  ASC = 'ASC',
  DESC = 'DESC',
  NONE = 'NONE',
}

export class CriteriaOrder {
  constructor(
    readonly orderBy: string,
    readonly orderType: CriteriaOrderTypes
  ) {
    this.orderBy = orderBy;
    this.orderType = orderType;
  }
}
