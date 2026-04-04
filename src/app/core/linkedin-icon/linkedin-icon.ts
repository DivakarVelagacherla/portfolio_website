import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-linkedin-icon',
  imports: [],
  templateUrl: './linkedin-icon.html',
  styleUrl: './linkedin-icon.css',
})
export class LinkedinIcon {
  linkedinLink: string = 'https://www.linkedin.com/in/divakarvelagacherla';
  onClick(event: Event): void {
    const confirmed = confirm('Open Linkedin?');
    if (!confirmed) {
      event.preventDefault();
    }
  }
}
