import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormAccessGuard } from '../../core/guards/form-access-guard';
import { HealthQuestionComponent } from '../../shared/components/conponents-myhealth-page/health-question/health-question';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-health',
  standalone: true,
  imports: [CommonModule, HealthQuestionComponent, TranslateModule],
  templateUrl: './my-health.html',
})
export class MyHealthComponent {
  question1: string = '';
  question2: string = '';
  question3: string = '';

  constructor(private router: Router, private formAccess: FormAccessGuard) {}

  goToConfirmation() {
    this.formAccess.allowConfirmationAccess();
    this.router.navigate(['/comfirmation']);
  }
}
