import { Routes } from '@angular/router';
import { GetQuoteComponent } from './features/get-quote/get-quote';
import { SelectPlanComponent } from './features/select-plan/select-plan';
import { MyHealthComponent } from './features/health/health';
import { ConfirmationComponent } from './features/comfirmation/comfirmation';
import { FormAccessGuard } from './core/guards/form-access-guard';
import { Wallet } from './features/wallet/wallet';
import { Login } from './features/login/login';
import { MyPolicies } from './features/policies/policies';

export const routes: Routes = [
  { path: '', redirectTo: '/get-quote', pathMatch: 'full' },
  { path: 'get-quote', component: GetQuoteComponent },
  { path: 'select-plan', component: SelectPlanComponent, canActivate: [FormAccessGuard] },
  { path: 'my-health', component: MyHealthComponent, canActivate: [FormAccessGuard] },
  { path: 'comfirmation', component: ConfirmationComponent, canActivate: [FormAccessGuard] },
  { path: 'wallet', component: Wallet },
  { path: 'login', component: Login },
   { path: 'my-policies', component: MyPolicies },
];
