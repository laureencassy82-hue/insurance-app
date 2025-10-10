import { Routes } from '@angular/router';
import { GetQuoteComponent } from './pages/get-quote/get-quote';
import { SelectPlanComponent } from './pages/select-plan/select-plan';
import { MyHealthComponent } from './pages/my-health/my-health';
import { ConfirmationComponent } from './pages/comfirmation/comfirmation';
import { FormAccessGuard } from './guards/form-access-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/get-quote', pathMatch: 'full' },
  { path: 'get-quote', component: GetQuoteComponent },
  { path: 'select-plan', component: SelectPlanComponent, canActivate: [FormAccessGuard] },
  { path: 'my-health', component: MyHealthComponent, canActivate: [FormAccessGuard] },
  { path: 'comfirmation', component: ConfirmationComponent, canActivate: [FormAccessGuard] }
];
