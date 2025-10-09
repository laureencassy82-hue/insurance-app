// get-quote.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormAccessGuard } from '../../guards/form-access-guard';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.html'
})
export class GetQuoteComponent {
  constructor(private router: Router, private formAccess: FormAccessGuard) {}

  goToSelectPlan() {
    this.formAccess.allowSelectPlanAccess();
    this.router.navigate(['/select-plan']);
  }
}
