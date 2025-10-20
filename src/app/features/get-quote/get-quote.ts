import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormAccessGuard } from '../../core/guards/form-access-guard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.html',
  styleUrls: ['../../../styles.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class GetQuoteComponent implements OnInit, OnDestroy {
  headerImage: string = 'assets/images/header_en.png';
  uploadedFiles: string[] = [];
  dropdownOpen = false;

  // Country list with flags (10 countries)
  countries = [
    { name: 'Cambodia', code: '+855', flag: 'assets/flags/cambodia.png' },
    { name: 'Vietnam', code: '+84', flag: 'assets/flags/vietnam.png' },
    { name: 'Singapore', code: '+65', flag: 'assets/flags/singapore.png' },
    { name: 'Malaysia', code: '+60', flag: 'assets/flags/malaysia.png' },
    { name: 'Philippines', code: '+63', flag: 'assets/flags/philippines.png' },
    { name: 'Indonesia', code: '+62', flag: 'assets/flags/indonesia.png' },
    { name: 'Laos', code: '+856', flag: 'assets/flags/laos.png' },
    { name: 'Myanmar', code: '+95', flag: 'assets/flags/myanmar.png' },
    { name: 'China', code: '+86', flag: 'assets/flags/china.png' },
  ];

  selectedCountry = this.countries[0]; // Default Cambodia

  formData = {
    fullName: '',
    gender: '',
    dob: '',
    countryCode: this.selectedCountry.code,
    phone: '',
    address: '',
  };

  constructor(
    private router: Router,
    private formAccess: FormAccessGuard,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Update header image based on language
    this.updateHeaderImage(this.translate.currentLang || 'en');
    this.translate.onLangChange.subscribe((event) => {
      this.updateHeaderImage(event.lang);
    });

    // Detect click outside dropdown
    document.addEventListener('click', this.onOutsideClick);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onOutsideClick);
  }

  updateHeaderImage(lang: string): void {
    this.headerImage =
      lang === 'kh' || lang === 'km'
        ? 'assets/images/header_kh.png'
        : 'assets/images/header_en.png';
  }

  // Dropdown Controls
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCountry(country: any): void {
    this.selectedCountry = country;
    this.formData.countryCode = country.code;
    this.dropdownOpen = false;
  }

  onOutsideClick = (event: any): void => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative') || !target.closest('.country-dropdown')) {
      this.dropdownOpen = false;
    }
  };

  // File Upload
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (!files) return;

    if (files.length + this.uploadedFiles.length > 2) {
      this.translate.get('ERROR.UPLOAD_ID').subscribe((msg: string) => {
        this.showToast(msg, 'error');
      });
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
        this.translate.get('ERROR.INVALID_FILE').subscribe((msg: string) => {
          this.showToast(msg, 'error');
        });
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

  removeImage(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  // Image Viewer
  viewImage(imageUrl: string): void {
    Swal.fire({
      imageUrl: imageUrl,
      imageAlt: 'Uploaded Image',
      showConfirmButton: false,
      showCloseButton: true,
      width: 'auto',
      background: '#ffffffff',
      backdrop: 'rgba(0,0,0,0.8)',
    });
  }

  // Navigation & Validation
  goToSelectPlan(): void {
    if (
      !this.formData.fullName.trim() ||
      !this.formData.gender ||
      !this.formData.dob ||
      !this.formData.phone.trim() ||
      !this.formData.address.trim()
    ) {
      this.translate.get('ERROR.REQUIRED_FIELDS').subscribe((msg: string) => {
        this.showToast(msg, 'error');
      });
      return;
    }

    if (this.uploadedFiles.length < 2) {
      this.translate.get('ERROR.UPLOAD_ID').subscribe((msg: string) => {
        this.showToast(msg, 'error');
      });
      return;
    }

    this.formAccess.allowSelectPlanAccess();
    this.router.navigate(['/select-plan']);
  }

  // Toast Notifications
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