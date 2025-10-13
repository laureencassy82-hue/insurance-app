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
  @Input() uploadedFiles: string[] = [];

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<any>();
  @Output() removeImage = new EventEmitter<number>();

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    this.save.emit();
  }

  onFileChange(event: any) {
    this.fileSelected.emit(event);
  }

  onRemove(index: number) {
    this.removeImage.emit(index);
  }
}
