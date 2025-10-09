// src/app/guards/form-access.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormAccessGuard implements CanActivate {
  private canAccessSelectPlan = false;
  private canAccessMyHealth = false;
  private canAccessConfirmation = false;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path;

    if (path === 'select-plan' && this.canAccessSelectPlan) return true;
    if (path === 'my-health' && this.canAccessMyHealth) return true;
    if (path === 'comfirmation' && this.canAccessConfirmation) return true;

    // Block direct access and redirect
    this.router.navigate(['/get-quote']);
    return false;
  }

  allowSelectPlanAccess() { this.canAccessSelectPlan = true; }
  allowMyHealthAccess() { this.canAccessMyHealth = true; }
  allowConfirmationAccess() { this.canAccessConfirmation = true; }

  resetAllAccess() {
    this.canAccessSelectPlan = false;
    this.canAccessMyHealth = false;
    this.canAccessConfirmation = false;
  }

  // Getters for template
  get selectPlanAllowed() { return this.canAccessSelectPlan; }
  get myHealthAllowed() { return this.canAccessMyHealth; }
  get confirmationAllowed() { return this.canAccessConfirmation; }
}
