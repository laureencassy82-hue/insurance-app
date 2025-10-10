import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comfirmation.html', // ✅ Must match your real filename
})
export class ConfirmationComponent {
  confirmationForm: FormGroup; // User info + ID upload
  paymentForm: FormGroup;      // Payment section
  uploadedFiles: string[] = [];
  isLoading = false;
  cardType: string = '';

  // ------------------- NEW -------------------
  showEditForm: boolean = false; // Flag to toggle modal form

  constructor(private fb: FormBuilder) {
    // User info form
    this.confirmationForm = this.fb.group({
      fullName: ['Phanhapich Rin', Validators.required],
      nickName: ['Jin', Validators.required],
      dateOfBirth: ['04/04/2000', Validators.required],
      contactNumber: ['087 869 576', Validators.required],
      address: [''],
      email: ['phanhapichrin@gmail.com', [Validators.required, Validators.email]],
      nationalId: [null],
    });

    // Payment form
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', Validators.required],
      expireDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      paymentMethod: ['card', Validators.required],
    });
  }

  // ------------------- Edit Form Functions -------------------
  openEditForm() {
    this.showEditForm = true;
  }

  cancelEdit() {
    this.showEditForm = false;
  }

  saveEdit() {
  if (this.confirmationForm.valid) {
    alert('User information updated successfully!');
    this.showEditForm = false; // closes the modal
    console.log('Updated info:', this.confirmationForm.value);
  } else {
    alert('Please fill all required fields correctly.');
  }
}


  // ------------------- ID Upload -------------------
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files) return;

    if (files.length + this.uploadedFiles.length > 2) {
      alert('You can only upload 2 images: Front and Back of your ID card.');
      return;
    }

    Array.from(files).forEach((file) => {
      const validTypes = [
        'image/jpeg',
        'image/png',
        'image/bmp',
        'image/tiff',
        'image/svg+xml',
      ];

      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Only JPG, PNG, BMP, TIF, or SVG allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.uploadedFiles.length < 2) {
          this.uploadedFiles.push(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  // ------------------- Payment -------------------
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
      alert('Payment Successful!');
    }, 2000);
  }
}
