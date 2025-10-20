import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule]
})
export class EditUserModalComponent {
  @Input() confirmationForm!: FormGroup;
  @Input() profileImage: string | null = null;
  @Input() uploadedFiles: string[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<string>();
  @Output() removeImage = new EventEmitter<number>();

  constructor(private translate: TranslateService) {}

  onCancel() {
    this.close.emit();
  }

  onSave() {
    this.save.emit();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/tiff', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        this.translate.get('ERROR.INVALID_FILE').subscribe((msg: string) => {
          this.showToast(msg, 'error');
        });
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const result = e.target.result as string;
        this.uploadedFiles.push(result);
        this.fileSelected.emit(result);
      };
      reader.readAsDataURL(file);
    }
  }

  onRemove(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.removeImage.emit(index);
  }

  viewImage(imageUrl: string): void {
    Swal.fire({
      imageUrl: imageUrl,
      imageAlt: 'Uploaded Image',
      showConfirmButton: false,
      showCloseButton: true,
      width: 'auto',
      background: '#fff',
      backdrop: 'rgba(0,0,0,0.8)',
    });
  }

  showToast(message: string, icon: 'success' | 'error' = 'error'): void {
    const isMobile = window.innerWidth < 768;
    Swal.fire({
      toast: true,
      position: isMobile ? 'bottom' : 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      background: '#fff',
      color: '#000',
      iconColor: icon === 'success' ? 'green' : 'red',
      showClass: {
        popup: 'swal2-show swal2-toast-custom',
      },
      hideClass: {
        popup: 'swal2-hide swal2-toast-custom',
      },
      customClass: {
        popup: 'swal2-toast-custom',
      },
    });
  }
}