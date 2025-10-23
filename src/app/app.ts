import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './features/footer/footer';
import { FormAccessGuard } from './core/guards/form-access-guard';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, FooterComponent, TranslateModule],
  templateUrl: './app.html',
  styleUrls: ['../styles.css']
})
export class AppComponent {
  currentRoute: string = '';
  langDropdownOpen = false;
  selectedLang: 'en' | 'km' = 'en';

  // List of routes where nav/footer should be hidden
  hideNavFooterRoutes: string[] = ['/wallet', '/login', '/my-policies'];

  constructor(
    private router: Router,
    public formAccess: FormAccessGuard,
    private translate: TranslateService
  ) {
    // Track route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = (event as NavigationEnd).urlAfterRedirects || '';
        this.currentRoute = url.split('?')[0].replace(/\/$/, '');
      });

    // Translation setup
    translate.addLangs(['en', 'km']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    const initialLang = browserLang?.match(/en|km/) ? browserLang : 'en';
    translate.use(initialLang);
    this.selectedLang = initialLang as 'en' | 'km';

    // Apply Khmer font globally if initial language is Khmer
    if (this.selectedLang === 'km') {
      document.body.classList.add('khmer');
    }
  }

  // Helper: true if nav/footer should show
  get showNavFooter(): boolean {
    return !this.hideNavFooterRoutes.includes(this.currentRoute);
  }

  // Switch language dynamically
  switchLang(lang: 'en' | 'km') {
    this.translate.use(lang);
    this.selectedLang = lang;

    // Close dropdown
    this.langDropdownOpen = false;

    // Toggle Khmer font globally
    if (lang === 'km') {
      document.body.classList.add('khmer');
    } else {
      document.body.classList.remove('khmer');
    }
  }

  toggleLangDropdown() {
    this.langDropdownOpen = !this.langDropdownOpen;
  }
}
