import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  langDropdownOpen = false;

  constructor(private translate: TranslateService) {
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
    this.translate.use(lang); // ✅ This changes the language dynamically
    this.langDropdownOpen = false;
  }
}
