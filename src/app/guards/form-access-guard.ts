// src/app/guards/form-access.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormAccessGuard implements CanActivate {

  private canAccessSelectPlan = false;

  constructor(private router: Router) {}

  // called when user tries to navigate to select-plan
  canActivate(): boolean {
    if (this.canAccessSelectPlan) {
      return true;
    } else {
      this.router.navigate(['/get-quote']);
      return false;
    }
  }

  // method to allow access after user clicks "Next"
  allowAccess() {
    this.canAccessSelectPlan = true;
  }

  // optional reset method
  resetAccess() {
    this.canAccessSelectPlan = false;
  }
}
