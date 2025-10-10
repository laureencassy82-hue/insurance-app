import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormAccessGuard } from '../../guards/form-access-guard';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.html',
  standalone: true,          // make it standalone
  imports: [CommonModule]    // ✅ Add CommonModule here
})
export class GetQuoteComponent {
  uploadedFiles: string[] = [];

  constructor(private router: Router, private formAccess: FormAccessGuard) {}

  goToSelectPlan() {
    if (this.uploadedFiles.length < 2) {
      alert('Please upload both Front and Back of your National ID card.');
      return;
    }
    this.formAccess.allowSelectPlanAccess();
    this.router.navigate(['/select-plan']);
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files) return;

    if (files.length + this.uploadedFiles.length > 2) {
      alert('You can only upload 2 images: Front and Back of your ID card.');
      return;
    }

    Array.from(files).forEach((file) => {
      const validTypes = ['image/jpeg','image/png','image/bmp','image/tiff','image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Only JPG, PNG, BMP, TIFF, or SVG allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        setTimeout(() => {
          if (this.uploadedFiles.length < 2) {
            this.uploadedFiles.push(e.target.result);
          }
        }, 0);
      };
      reader.readAsDataURL(file);
    });

    event.target.value = '';
  }

  removeImage(index: number) {
    this.uploadedFiles.splice(index, 1);
  }
}
