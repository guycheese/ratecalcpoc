import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseDataService {
  nationalLivingWage = 12.21;
  nicThreshold = 96.0;
  workingWeek = 40.0;
  workingTime = 28.0;
  pension = 3.0 / 100;
  ssp = 28.0;
  constructor() {}

  getBaseData(): BaseData {
    return {
      nationalLivingWage: this.nationalLivingWage,
      nicThreshold: this.nicThreshold,
      workingWeek: this.workingWeek,
      workingTime: this.workingTime,
      pension: this.pension,
      ssp: this.ssp,
    };
  }
}
