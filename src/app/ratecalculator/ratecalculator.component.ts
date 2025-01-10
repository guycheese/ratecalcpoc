import { Component, input, OnInit } from '@angular/core';
import { BaseDataService } from '../services/base-data.service';
import { FormsModule } from '@angular/forms';
import { round2DP, roundUp2DP } from '../../helpers';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ratecalculator',
  imports: [FormsModule, CommonModule],
  templateUrl: './ratecalculator.component.html',
  styleUrl: './ratecalculator.component.css',
})
export class RatecalculatorComponent implements OnInit {
  baseData: BaseDataV2 = {
    nationalLivingWage: 0,
    nicThreshold: 0,
    niPercentage: 0,
    workingHours: 0,
    holidayPerAnum: 0,
    pensionPercentage: 0,
    sspPercentage: 0,
    appLevyPercentage: 0,
    minMargin: 0,
  };

  constructor(private baseDataService: BaseDataService) {}

  payRate = 0;
  chargeSSP = true;
  overtime = false;
  private _margin = 0;
  private _marginPercentage = 0;

  get margin(): number {
    return this._margin;
  }

  set margin(value: number) {
    this._margin = value;
    const newChargeRate = this.costOfEmployment + value;
    this._marginPercentage = round2DP((value / newChargeRate) * 100);
  }

  get marginPercentage(): number {
    return this._marginPercentage;
  }

  set marginPercentage(value: number) {
    this._marginPercentage = value;
    this._margin = round2DP(this.chargeRate * (value / 100));
  }

  get holidayPay(): number {
    return Math.max(
      0,
      round2DP(
        (this.baseData.holidayPerAnum / (260 - this.baseData.holidayPerAnum)) *
          this.payRate
      )
    );
  }

  get nationalInsurance(): number {
    const niThreshold = this.overtime ? 0 : this.baseData.nicThreshold;
    return Math.max(
      0,
      round2DP(
        (((this.holidayPay + this.payRate) * this.baseData.workingHours -
          niThreshold) *
          (this.baseData.niPercentage / 100)) /
          this.baseData.workingHours
      )
    );
  }

  get pension(): number {
    return Math.max(
      0,
      round2DP(
        (this.payRate + this.nationalInsurance) *
          (this.baseData.pensionPercentage / 100)
      )
    );
  }

  get apprenticeshipLevy(): number {
    return Math.max(
      0,
      roundUp2DP(
        (this.payRate + this.nationalInsurance) *
          (this.baseData.appLevyPercentage / 100)
      )
    );
  }

  get ssp(): number {
    if (this.chargeSSP && this.baseData.sspPercentage) {
      return round2DP((this.baseData.sspPercentage / 100) * this.payRate);
    }
    return 0;
  }

  get costOfEmployment(): number {
    return round2DP(
      this.payRate +
        this.holidayPay +
        this.nationalInsurance +
        this.pension +
        this.apprenticeshipLevy +
        this.ssp
    );
  }

  get chargeRate(): number {
    return round2DP(this.costOfEmployment / (1 - this.marginPercentage / 100));
  }

  ///////

  ngOnInit(): void {
    this.baseData = this.baseDataService.getBaseData();
  }

  toggleSSP() {
    if (this.chargeSSP == true && this.overtime == true) {
      this.chargeSSP = false;
    }
  }
}
