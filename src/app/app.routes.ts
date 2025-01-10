import { Routes } from '@angular/router';
import { RatecalculatorComponent } from './ratecalculator/ratecalculator.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', component: RatecalculatorComponent },
  { path: 'admin', component: AdminComponent },
];
