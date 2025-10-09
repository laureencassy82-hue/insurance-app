// src/app/guards/form-access.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormAccessGuard implements CanActivate {
  private canAccessSelectPlan = false;
  private canAccessMyHealth = false;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path;

    // Allow access only if flags are enabled
    if (path === 'select-plan' && this.canAccessSelectPlan) {
      return true;
    }
    if (path === 'my-health' && this.canAccessMyHealth) {
      return true;
    }

    // Otherwise, block and redirect to first step
    this.router.navigate(['/get-quote']);
    return false;
  }

  // ✅ Allow navigation from Get Quote → Select Plan
  allowSelectPlanAccess() {
    this.canAccessSelectPlan = true;
  }

  // ✅ Allow navigation from Select Plan → My Health
  allowMyHealthAccess() {
    this.canAccessMyHealth = true;
  }

  resetAllAccess() {
    this.canAccessSelectPlan = false;
    this.canAccessMyHealth = false;
  }
}
