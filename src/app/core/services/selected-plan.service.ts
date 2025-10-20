import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedPlanService {
  private _plan: string | null = null;

  setPlan(plan: string) {
    this._plan = plan;
  }

  getPlan(): string | null {
    return this._plan;
  }
}
