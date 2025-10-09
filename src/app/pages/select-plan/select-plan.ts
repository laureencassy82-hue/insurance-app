import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormAccessGuard } from '../../guards/form-access-guard';

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.html',
  styleUrls: ['./select-plan.css']
})
export class SelectPlanComponent {
  constructor(private router: Router, private formAccess: FormAccessGuard) {}

  goToMyHealth() {
    this.formAccess.allowMyHealthAccess();
    this.router.navigate(['/my-health']);
  }
}
