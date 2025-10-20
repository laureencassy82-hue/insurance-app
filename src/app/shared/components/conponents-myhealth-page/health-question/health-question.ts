import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-health-question',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="">
      <!-- Main Question -->
      <h2 class=" mb-3 text-sm md:text-base">{{ questionText }}</h2>

      <!-- Optional List of Details -->
      <ul *ngIf="details && details.length" class="list-disc list-inside space-y-1 text-xs md:text-sm ml-3 mb-3">
        <li *ngFor="let item of details">{{ item }}</li>
      </ul>

      <!-- Yes/No Buttons (smaller style) -->
      <div class="flex space-x-2">
          <button *ngFor="let option of options"
            type="button"
            [ngClass]="{
              'bg-yellow-500 text-black': answer === option,
              'text-gray-800 bg-white': answer !== option
            }"
            class="px-2 py-1 border border-gray-400 rounded-md text-xs font-medium transition-all duration-200"
            (click)="setAnswer(option)">
            {{ option | titlecase }}
          </button>
      </div>

    </div>
  `,
  styles: []
})
export class HealthQuestionComponent {
  @Input() questionText: string = '';
  @Input() details: string[] = [];
  @Input() options: string[] = [];
  @Input() answer: string = '';

  // ✅ Add output for two-way binding
  @Output() answerChange = new EventEmitter<string>();

  setAnswer(option: string) {
    this.answer = option;
    this.answerChange.emit(option); // ✅ emit event
  }
}
