import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.html',
  standalone: true,
  imports: [CommonModule]
})
export class UserInfoCardComponent {
  @Input() confirmationForm!: FormGroup;
  @Input() uploadedFiles: string[] = [];
  @Output() editClicked = new EventEmitter<void>();

  onEdit() {
    this.editClicked.emit();
  }
}
