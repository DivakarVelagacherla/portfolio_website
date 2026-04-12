import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() label: string = '';
  @Input() variant: string = 'primary';
  @Input() target: string = '';

  scrollToSection(): void {
    const element = document.getElementById(this.target);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
