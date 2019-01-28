import {Component, OnInit} from '@angular/core';
import {CalculationService} from "../../services/calculation.service";
import {CalculationResponse} from "../../models/calculation-response";

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.css']
})
export class CalculationsComponent implements OnInit {

  response: CalculationResponse = new CalculationResponse();
  startDate = new Date();
  endDate = new Date();

  constructor(private calculationService: CalculationService) {
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
    this.calculationService.getCalculation(this.startDate.toISOString(), this.endDate.toISOString()).subscribe( res => {
      this.response = res;
    });
  }

}
