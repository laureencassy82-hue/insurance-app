import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PaymentMethodComponent {
  @Input() paymentForm!: FormGroup;
  @Input() isLoading: boolean = false;
  @Input() cardType: string = '';

  @Output() submitPayment = new EventEmitter<void>();
  @Output() cardNumberChanged = new EventEmitter<void>();

  onSubmit() {
    this.submitPayment.emit();
  }

  onCardInput() {
    this.cardNumberChanged.emit();
  }
}
