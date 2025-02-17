import { CriteriaOperators } from "./criteria_operators";

export class CriteriaFilter {
    constructor(
        readonly field: string,
        readonly value: string | number | Array<string | number> | boolean,
        readonly operator: CriteriaOperators = CriteriaOperators.EQUAL,
    ) {}
}