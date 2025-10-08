import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormAccessGuard } from '../../guards/form-access-guard';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.html',
  styleUrls: ['./get-quote.css']
})
export class GetQuoteComponent {

  constructor(private router: Router, private formAccess: FormAccessGuard) {}

  goToSelectPlan() {
    this.formAccess.allowAccess();  // ✅ allow navigation
    this.router.navigate(['/select-plan']);
  }
}
