import { Injectable } from '@angular/core';
import baseDataJson from '../../../baseData.json';

@Injectable({
  providedIn: 'root',
})
export class BaseDataService {
  constructor() {
    console.log(localStorage.getItem('baseData'));
    if (localStorage.getItem('baseData') == null) {
      localStorage.setItem('baseData', JSON.stringify(baseDataJson));
    }
  }

  getBaseData(): BaseDataV2 {
    return JSON.parse(localStorage.getItem('baseData') || '{}');
  }

  setBaseData(newData: BaseDataV2) {
    localStorage.setItem('baseData', JSON.stringify(newData));
  }
}
