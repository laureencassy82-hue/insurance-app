import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,TranslateModule ],
  templateUrl: './login.html',
  styleUrls: ['../../../styles.css']
})
export class Login {
  isMobileLogin = true;

  mobileNumber: string = '';
  email: string = '';

  toggleLogin(type: string) {
    this.isMobileLogin = (type === 'mobile');
  }

  login() {
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

    this.showToast('Login successful!', 'success');
  }

showToast(message: string, icon: 'success' | 'error' = 'error') {
  const isMobile = window.innerWidth < 768; // consider mobile if width < 768px
  Swal.fire({
    toast: true,
    position: isMobile ? 'bottom' : 'top-end', // ⬅️ bottom on mobile, top-end on desktop
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 4000,               // stays longer
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
    }
  });
}


}
