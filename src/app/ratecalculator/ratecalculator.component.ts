import { Component, OnInit } from '@angular/core';
import { BaseDataService } from '../services/base-data.service';
import { FormsModule } from '@angular/forms';
import { round2DP } from '../../helpers';
@Component({
  selector: 'app-ratecalculator',
  imports: [FormsModule],
  templateUrl: './ratecalculator.component.html',
  styleUrl: './ratecalculator.component.css',
})
export class RatecalculatorComponent implements OnInit {
  baseData: BaseData = {
    nationalLivingWage: 0,
    nicThreshold: 0,
    workingWeek: 0,
    workingTime: 0,
    pension: 0,
    ssp: 0,
  };

  constructor(private baseDataService: BaseDataService) {}

  payRate = 0;

  //Main calculations
  holidayPay = () =>
    round2DP(
      (this.baseData.workingTime / (260 - this.baseData.workingTime)) *
        this.payRate
    );

  nationalInsurance = () =>
    round2DP(
      (((this.holidayPay() + this.payRate) * this.baseData.workingWeek -
        this.baseData.nicThreshold) *
        0.15) /
        this.baseData.workingWeek
    );

  pension = () =>
    round2DP((this.payRate + this.nationalInsurance()) * this.baseData.pension);

  apprentinceshipLevy = () =>
    Math.ceil((this.payRate + this.nationalInsurance() * 0.005) * 100) / 100;
  ///////

  SSP = 0;
  ngOnInit(): void {
    this.baseData = this.baseDataService.getBaseData();
  }
}
