import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
})
export class PaymentMethodComponent {
  @Input() paymentForm!: FormGroup;
  @Input() isLoading: boolean = false;
  @Input() cardType: string = '';
  @Output() submitPayment = new EventEmitter<void>();
  @Output() cardNumberChanged = new EventEmitter<void>();

  successMessage: string = '';
  selectedMethod: string = 'card';
  showSuccess: boolean = false;

  constructor(public translate: TranslateService) {}

onSubmit() {
  const { cardNumber, cardName, expireDate, cvv } = this.paymentForm.value;

  if (this.selectedMethod === 'card') {
    // Desktop card flow
    if (cardNumber && cardName && expireDate && cvv) {
      this.successMessage = 'PAYMENT.SUCCESS';
    } else {
      this.successMessage = 'PAYMENT.FILL_ALL_FIELDS';
    }
  } else if (this.selectedMethod === 'ABA') {
    // Mobile ABA flow
    this.showSuccess = true; // display overlay
    this.successMessage = ''; // optional
  }
}


  onCardInput() {
    this.cardNumberChanged.emit();
  }

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
    this.successMessage = '';
    this.showSuccess = false;
  }

  payNow() {
    this.showSuccess = true;
  }

  donePayment() {
    this.showSuccess = false;
    this.selectedMethod = 'card'; // return to main
  }
}
