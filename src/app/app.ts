import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { FormAccessGuard } from './guards/form-access-guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  currentRoute: string = '';

  constructor(private router: Router, public formAccess: FormAccessGuard) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = (event as NavigationEnd).urlAfterRedirects || '';
        this.currentRoute = url.split('?')[0].replace(/\/$/, '');
      });
  }
}
