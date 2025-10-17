import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-total-payment-card',
  templateUrl: './total-payment-card.html',
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class TotalPaymentCardComponent {
  @Input() name: string = 'Brightlife Diamond';
  @Input() date: string = '10 Oct 2025, 10:47 AM';
  @Input() invoice: string = 'Brightlife Diamond';
  @Input() discount: string = '10%';
  @Input() total: string = '$99.99';
}
