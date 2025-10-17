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

  question1Error: boolean = false;
  question2Error: boolean = false;
  question3Error: boolean = false;

  constructor(private router: Router, private formAccess: FormAccessGuard) {}

  goToConfirmation() {
    // Reset errors
    this.question1Error = !this.question1;
    this.question2Error = !this.question2;
    this.question3Error = !this.question3;

    if (this.question1Error || this.question2Error || this.question3Error) {
      return; // stop navigation
    }

    this.formAccess.allowConfirmationAccess();
    this.router.navigate(['/comfirmation']);
  }
}
