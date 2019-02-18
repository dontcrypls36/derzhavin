import {Component, OnInit} from '@angular/core';
import {CalculationService} from "../../services/calculation.service";
import {CalculationResponse} from "../../models/calculation-response";
import {SpinnerServiceService} from "../../services/spinner-service.service";
import {DocForAct} from "../../models/doc-for-act";

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.css']
})
export class CalculationsComponent implements OnInit {

  response: CalculationResponse = new CalculationResponse();
  startDate = new Date();
  endDate = new Date()
  showTable = false;

  constructor(private calculationService: CalculationService,
              private spinner: SpinnerServiceService) {
    const currentDate = new Date().getUTCDate();
    const delta = currentDate - 1;
    if (delta > 0) {
      this.startDate.setDate(this.endDate.getDate() - delta);
    }
  }

  ngOnInit() {
    this.loadActs();
  }

  loadActs() {
    this.showTable = false;
    this.spinner.show();
    this.calculationService.getCalculation(new Date(this.startDate).toISOString(), new Date(this.endDate).toISOString()).subscribe( res => {
      this.response = res;
      this.spinner.hide();
      this.showTable = true;
    });
  }

  getSign(item: DocForAct): string {
    if (item.Debit === 0 && item.Credit > 0) {
      return 'positive';
    }
    if (item.Debit > 0) {
      return 'negative';
    }
  }

  getDebt(): number {
    let debt = 0;
    this.response.DocForAktItems.map( doc => {
      debt = debt + doc.Debit - doc.Credit;
    });
    return debt;
  }

}
