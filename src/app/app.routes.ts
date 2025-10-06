import { Routes } from '@angular/router';
import { GetQuoteComponent } from './pages/get-quote/get-quote';
import { SelectPlanComponent } from './pages/select-plan/select-plan';
import { MyHealthComponent } from './pages/my-health/my-health';
import { ComfirmationComponent } from './pages/comfirmation/comfirmation';

export const routes: Routes = [
  { path: '', redirectTo: '/get-quote', pathMatch: 'full' },
  { path: 'get-quote', component: GetQuoteComponent },
  { path: 'select-plan', component: SelectPlanComponent },
  { path: 'my-health', component: MyHealthComponent },
  { path: 'comfirmation', component: ComfirmationComponent }
];
