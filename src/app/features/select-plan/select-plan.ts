import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormAccessGuard } from '../../core/guards/form-access-guard';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.html',
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class SelectPlanComponent {
  constructor(private router: Router, private formAccess: FormAccessGuard) {}

  goToMyHealth() {
    this.formAccess.allowMyHealthAccess();
    this.router.navigate(['/my-health']);
  }
}
