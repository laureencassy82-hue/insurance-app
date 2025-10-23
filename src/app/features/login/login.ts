import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './login.html',
  styleUrls: ['../../../styles.css']
})
export class Login {
  // Toggle between mobile and email login
  isMobileLogin = true;

  // Form data
  mobileNumber: string = '';
  email: string = '';

  // Validation state
  loginSubmitted = false;

  // Country dropdown
  dropdownOpen = false;
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
  selectedCountry = this.countries[0];

  // Toggle between mobile and email login
  toggleLogin(type: string) {
    this.isMobileLogin = (type === 'mobile');
    this.loginSubmitted = false; // reset validation
  }

  // Toggle country dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Select a country
  selectCountry(country: any) {
    this.selectedCountry = country;
    this.dropdownOpen = false;
  }

  // Login button handler
  login() {
    this.loginSubmitted = true;

    if (this.isMobileLogin) {
      if (!this.mobileNumber.trim()) {
        this.showToast('Please enter your contact number!');
        return;
      }
    } else {
      if (!this.email.trim()) {
        this.showToast('Please enter your email!');
        return;
      }
    }

    // Success message
    this.showToast('Login successful!', 'success');
  }

  // Toast notification
  showToast(message: string, icon: 'success' | 'error' = 'error') {
    const isMobile = window.innerWidth < 768;
    Swal.fire({
      toast: true,
      position: isMobile ? 'bottom' : 'top-end',
      icon,
      title: message,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      background: '#fff',
      color: '#000',
      iconColor: icon === 'success' ? 'green' : 'red',
      showClass: { popup: 'swal2-show swal2-toast-custom' },
      hideClass: { popup: 'swal2-hide swal2-toast-custom' },
      customClass: { popup: 'swal2-toast-custom' },
    });
  }
}
