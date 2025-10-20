import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormAccessGuard } from '../../core/guards/form-access-guard';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SelectedPlanService } from '../../core/services/selected-plan.service'; // import service

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.html',
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class SelectPlanComponent {
  constructor(
    private router: Router,
    private formAccess: FormAccessGuard,
    private planService: SelectedPlanService // inject service
  ) {}

  goToMyHealth(planType: string) {
    this.planService.setPlan(planType.toLowerCase()); // store plan in lowercase
    this.formAccess.allowMyHealthAccess();
    this.router.navigate(['/my-health']);
  }
}
