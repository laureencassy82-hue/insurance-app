import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Shared Components
import { UserInfoCardComponent } from '../../shared/components/conponents-confirmation-page/user-info-card/user-info-card';
import { EditUserModalComponent } from '../../shared/components/conponents-confirmation-page/edit-user-modal/edit-user-modal';
import { PaymentMethodComponent } from '../../shared/components/conponents-confirmation-page/payment-method/payment-method';
import { TotalPaymentCardComponent } from '../../shared/components/conponents-confirmation-page/total-payment-card/total-payment-card';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserInfoCardComponent,
    EditUserModalComponent,
    PaymentMethodComponent,
    TotalPaymentCardComponent,
    TranslateModule
  ],
  templateUrl: './comfirmation.html',
})
export class ConfirmationComponent {
  confirmationForm: FormGroup;
  paymentForm: FormGroup;
  uploadedFiles: string[] = [];
  profileImage: string | null = null;
  showEditForm: boolean = false;
  isLoading: boolean = false;
  cardType: string = '';
  paymentSuccessMessage: string = '';
  currentDateTime: Date = new Date('2025-10-16T14:58:00+08:00'); // Set to 02:58 PM +08, October 16, 2025

  // Mobile payment screen states
  showAbaScreen = false;
  abaPaymentSuccess = false;
  paymentSuccess = false;

  constructor(private fb: FormBuilder) {
    this.confirmationForm = this.fb.group({
      fullName: ['Phanhapich Rin', Validators.required],
      nickName: ['Jin', Validators.required],
      dateOfBirth: ['04/04/2000', Validators.required],
      contactNumber: ['087 869 576', Validators.required],
      address: [''],
      email: ['phanhapichrin@gmail.com', [Validators.required, Validators.email]],
      nationalId: [null],
    });

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', Validators.required],
      expireDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      paymentMethod: ['card', Validators.required],
    });
  }

  openEditForm() {
    this.showEditForm = true;
  }

  cancelEdit() {
    this.showEditForm = false;
  }

  saveEdit() {
    if (this.confirmationForm.valid) {
      alert('User information updated successfully!');
      this.showEditForm = false;
      console.log('Updated info:', this.confirmationForm.value, 'Profile Image:', this.profileImage);
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files) return;

    if (files.length + this.uploadedFiles.length > 2) {
      alert('You can only upload 2 images: Front and Back of your ID card.');
      return;
    }

    Array.from(files).forEach((file) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/tiff', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Only JPG, PNG, BMP, TIF, or SVG allowed.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.uploadedFiles.length < 2) this.uploadedFiles.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  onProfileImageSelected(image: string) {
    this.profileImage = image;
  }

  removeProfileImage() {
    this.profileImage = null;
  }

  detectCardType() {
    const number = this.paymentForm.get('cardNumber')?.value || '';
    if (number.startsWith('4')) this.cardType = 'visa';
    else if (number.startsWith('5')) this.cardType = 'mastercard';
    else this.cardType = '';
  }

  submitPayment() {
    if (this.paymentForm.invalid) return;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.paymentSuccessMessage = 'Payment successful!';
      this.paymentSuccess = true;
    }, 2000);
  }

  // Mobile payment methods
  selectPaymentMethod(method: string): void {
    this.showAbaScreen = false;
    this.abaPaymentSuccess = false;

    if (method === 'aba') {
      this.showAbaScreen = true;
    }
    // Add other methods (acleda, other) as needed
  }

  processAbaPayment(): void {
    setTimeout(() => {
      this.abaPaymentSuccess = true;
      this.paymentSuccessMessage = 'Payment successful!';
      this.paymentSuccess = true;
    }, 2000);
  }

  closePaymentScreen(): void {
    this.showAbaScreen = false;
    this.abaPaymentSuccess = false;
  }

  onPaymentSuccess(): void {
    this.paymentSuccess = false;
    this.showAbaScreen = false;
    this.abaPaymentSuccess = false;
    this.paymentSuccessMessage = '';
    alert('Payment processed successfully! Redirecting...');
    // Add navigation logic here if needed
    // this.router.navigate(['/success']);
  }
}