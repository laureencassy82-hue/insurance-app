
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core'; // 👈 import these

@Component({
  selector: 'app-my-policies',
  standalone: true, // 👈 important for standalone component
  imports: [RouterLink, RouterLinkActive,TranslateModule], // 👈 enable router directives in template
  templateUrl: './my-policies.html',
})
export class  MyPolicies {}
