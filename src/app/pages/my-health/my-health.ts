import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormAccessGuard } from '../../guards/form-access-guard';

@Component({
  selector: 'app-my-health',
  standalone: true,
  imports: [CommonModule], 
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
