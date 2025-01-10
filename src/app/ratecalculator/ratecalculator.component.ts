import { Component, computed, signal, OnInit, model } from '@angular/core';
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

  payRate = model(0);
  chargeSSP = model(true);
  overtime = model(false);
  margin = model(0);
  marginPercentage = model(0);

  updateMargin(value: number) {
    this.margin.set(round2DP(value));
    const newChargeRate = this.costOfEmployment() + value;
    this.marginPercentage.set(round2DP((value / newChargeRate) * 100));
  }

  updateMarginPercentage(value: number) {
    this.marginPercentage.set(value);
    this.margin.set(round2DP(this.chargeRate() * (value / 100)));
  }

  holidayPay = computed(() => {
    return Math.max(
      0,
      round2DP(
        (this.baseData.holidayPerAnum / (260 - this.baseData.holidayPerAnum)) *
          this.payRate()
      )
    );
  });

  nationalInsurance = computed(() => {
    const niThreshold = this.overtime() ? 0 : this.baseData.nicThreshold;
    return Math.max(
      0,
      round2DP(
        (((this.holidayPay() + this.payRate()) * this.baseData.workingHours -
          niThreshold) *
          (this.baseData.niPercentage / 100)) /
          this.baseData.workingHours
      )
    );
  });

  pension = computed(() => {
    return Math.max(
      0,
      round2DP(
        (this.payRate() + this.nationalInsurance()) *
          (this.baseData.pensionPercentage / 100)
      )
    );
  });

  apprenticeshipLevy = computed(() => {
    return Math.max(
      0,
      roundUp2DP(
        (this.payRate() + this.nationalInsurance()) *
          (this.baseData.appLevyPercentage / 100)
      )
    );
  });

  ssp = computed(() => {
    if (this.chargeSSP() && this.baseData.sspPercentage) {
      return round2DP((this.baseData.sspPercentage / 100) * this.payRate());
    }
    return 0;
  });

  costOfEmployment = computed(() => {
    return round2DP(
      this.payRate() +
        this.holidayPay() +
        this.nationalInsurance() +
        this.pension() +
        this.apprenticeshipLevy() +
        this.ssp()
    );
  });

  chargeRate = computed(() => {
    return round2DP(
      this.costOfEmployment() / (1 - this.marginPercentage() / 100)
    );
  });

  ngOnInit(): void {
    this.baseData = this.baseDataService.getBaseData();
  }

  toggleSSP() {
    if (this.chargeSSP() && this.overtime()) {
      this.chargeSSP.set(false);
    }
  }
}
