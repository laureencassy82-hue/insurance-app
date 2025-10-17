import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './features/header/header';
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
  langDropdownOpen = false; // toggle for dropdown

  constructor(
    private router: Router,
    public formAccess: FormAccessGuard,
    private translate: TranslateService
  ) {
    // Router events
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
    translate.use(browserLang?.match(/en|km/) ? browserLang : 'en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.langDropdownOpen = false; // close dropdown after selecting
  }

  toggleLangDropdown() {
    this.langDropdownOpen = !this.langDropdownOpen;
  }
}
