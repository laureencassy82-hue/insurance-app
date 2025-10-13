import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormAccessGuard } from '../../core/guards/form-access-guard';

// Import the 3 standalone components
import { HeaderImage } from '../../shared/components/header-image/header-image';
import { GetQuoteFormComponent } from '../../shared/components/get-quote-form/get-quote-form';
import { ProductHighlightsComponent } from '../../shared/components/product-highlights/product-highlights';

@Component({
  selector: 'app-get-quote',
  standalone: true,
  templateUrl: './get-quote.html',
  imports: [
    CommonModule,
    HeaderImage,
    GetQuoteFormComponent,
    ProductHighlightsComponent
  ]
})
export class GetQuoteComponent {
  constructor(private router: Router, private formAccess: FormAccessGuard) {}

  goToSelectPlan() {
    this.formAccess.allowSelectPlanAccess();
    this.router.navigate(['/select-plan']);
  }
}
