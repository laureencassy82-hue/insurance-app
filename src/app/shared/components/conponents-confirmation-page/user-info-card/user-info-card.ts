import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core'; // Import TranslateModule

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule], // Add TranslateModule
})
export class UserInfoCardComponent {
  @Input() confirmationForm!: FormGroup;
  @Input() uploadedFiles: string[] = [];
  @Input() profileImage: string | null = null;
  @Output() editClicked = new EventEmitter<void>();

  onEdit() {
    this.editClicked.emit();
  }
}