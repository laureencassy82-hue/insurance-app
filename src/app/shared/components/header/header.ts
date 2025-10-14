import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  langDropdownOpen = false;

  constructor(private translate: TranslateService, private router: Router) {
    // Initialize languages
    translate.addLangs(['en', 'km']);
    translate.setDefaultLang('en');

    // Optionally detect browser language
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|km/) ? browserLang : 'en');
  }

  toggleLangDropdown() {
    this.langDropdownOpen = !this.langDropdownOpen;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.langDropdownOpen = false;
  }

  goToWallet() {
    this.router.navigate(['/wallet']);
  }

  goToGetQuote() {
  this.router.navigate(['/get-quote']);
  }

  goToLogin() {
  this.router.navigate(['/login']);
  }

}
