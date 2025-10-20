import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormAccessGuard } from '../../core/guards/form-access-guard';
import { HealthQuestionComponent } from '../../shared/components/conponents-myhealth-page/health-question/health-question';
import { TranslateModule } from '@ngx-translate/core';
import { SelectedPlanService } from '../../core/services/selected-plan.service';

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

  selectedPlan: string | null = null;

  // Scroll references (wrap each question in a div with #ref)
  @ViewChild('question1Ref', { read: ElementRef }) question1Element!: ElementRef;
  @ViewChild('question2Ref', { read: ElementRef }) question2Element!: ElementRef;
  @ViewChild('question3Ref', { read: ElementRef }) question3Element!: ElementRef;

  constructor(
    private router: Router,
    private formAccess: FormAccessGuard,
    private planService: SelectedPlanService
  ) {
    // Get the previously selected plan from the service
    this.selectedPlan = this.planService.getPlan();
  }

  goToConfirmation() {
    // Reset error flags
    this.question1Error = !this.question1;
    this.question2Error = !this.question2;
    this.question3Error = !this.question3;

    // Scroll to the first unanswered question
    if (this.question1Error) {
      this.scrollToQuestion(this.question1Element);
      return;
    }
    if (this.question2Error) {
      this.scrollToQuestion(this.question2Element);
      return;
    }
    if (this.question3Error) {
      this.scrollToQuestion(this.question3Element);
      return;
    }

    // All questions answered, navigate to confirmation page
    this.formAccess.allowConfirmationAccess();
    this.router.navigate(['/comfirmation']);
  }

  // Helper function to scroll smoothly and highlight the unanswered question
  scrollToQuestion(element: ElementRef) {
    if (element && element.nativeElement) {
      element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Optional highlight effect
      element.nativeElement.classList.add('ring-2', 'ring-red-500');
      setTimeout(() => {
        element.nativeElement.classList.remove('ring-2', 'ring-red-500');
      }, 1500);
    }
  }
}
