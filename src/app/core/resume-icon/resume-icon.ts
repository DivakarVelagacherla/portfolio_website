import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-icon',
  imports: [],
  templateUrl: './resume-icon.html',
  styleUrl: './resume-icon.css',
})
export class ResumeIcon {
  onClick(event: Event): void {
    const confirmed = confirm('Download Resume?');
    if (!confirmed) {
      event.preventDefault();
    }
  }
}
