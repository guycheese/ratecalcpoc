import { Component, OnInit } from '@angular/core';
import { BaseDataService } from '../services/base-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
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
  ngOnInit(): void {
    this.baseData = this.baseDataService.getBaseData();
  }
  saveBaseData() {
    console.log(this.baseData);
    this.baseDataService.setBaseData(this.baseData);
  }
}
