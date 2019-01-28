import {DocForAct} from "./doc-for-act";

export class CalculationResponse {
  SettlementsSumma: number;
  SettlementsDate: string;
  DocForAktItems: DocForAct[] = [];
}
