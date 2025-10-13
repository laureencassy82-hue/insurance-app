import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-quote-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-quote-form.html'
})
export class GetQuoteFormComponent {
  uploadedFiles: string[] = [];
  @Output() nextStep = new EventEmitter<void>();

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files) return;

    if (files.length + this.uploadedFiles.length > 2) {
      alert('You can only upload 2 images: Front and Back of your ID card.');
      return;
    }

    Array.from(files).forEach(file => {
      const validTypes = ['image/jpeg','image/png','image/bmp','image/tiff','image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Only JPG, PNG, BMP, TIFF, or SVG allowed.');
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

    event.target.value = '';
  }

  removeImage(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  goToNext() {
    if (this.uploadedFiles.length < 2) {
      alert('Please upload both Front and Back of your National ID card.');
      return;
    }
    this.nextStep.emit();
  }
}
