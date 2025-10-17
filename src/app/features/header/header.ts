import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['../../../styles.css']
})
export class HeaderComponent {
  langDropdownOpen = false;
  mobileMenuOpen = false;
  activePage: 'getQuote' | 'wallet' | 'login' = 'getQuote';
  selectedLang: 'en' | 'km' = 'en'; // default language

  constructor(private translate: TranslateService, private router: Router) {
    translate.addLangs(['en', 'km']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    const initialLang = browserLang?.match(/en|km/) ? browserLang : 'en';
    translate.use(initialLang);
    this.selectedLang = initialLang as 'en' | 'km';
  }

  toggleLangDropdown() {
    this.langDropdownOpen = !this.langDropdownOpen;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  switchLang(lang: 'en' | 'km') {
    this.translate.use(lang);
    this.selectedLang = lang;
    this.langDropdownOpen = false;
    this.mobileMenuOpen = false;
  }

  goToGetQuote() {
    this.activePage = 'getQuote';
    this.router.navigate(['/get-quote']);
    this.mobileMenuOpen = false;
  }

  goToWallet() {
    this.activePage = 'wallet';
    this.router.navigate(['/wallet']);
    this.mobileMenuOpen = false;
  }

  goToLogin() {
    this.activePage = 'login';
    this.router.navigate(['/login']);
    this.mobileMenuOpen = false;
  }
}
