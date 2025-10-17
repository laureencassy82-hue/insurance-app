import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditUserModalComponent {
  @Input() confirmationForm!: FormGroup;

  // Profile image (view-only)
  @Input() profileImage: string | null = null;

  // National ID images (existing + newly added)
  @Input() uploadedFiles: string[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<string>(); // Emits base64 string for National ID
  @Output() removeImage = new EventEmitter<number>();

  // Cancel button
  onCancel() {
    this.close.emit();
  }

  // Save button
  onSave() {
    this.save.emit();
  }

  // Handle National ID file selection
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/tiff', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Only JPG, PNG, BMP, TIF, or SVG allowed.');
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const result = e.target.result as string;
        this.uploadedFiles.push(result);      // Show preview
        this.fileSelected.emit(result);       // Emit to parent if needed
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove National ID image
  onRemove(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.removeImage.emit(index);
  }
}
