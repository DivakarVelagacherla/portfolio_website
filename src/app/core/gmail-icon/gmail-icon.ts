import { Component } from '@angular/core';

@Component({
  selector: 'app-gmail-icon',
  imports: [],
  templateUrl: './gmail-icon.html',
  styleUrl: './gmail-icon.css',
})
export class GmailIcon {
  onClick(event: Event): void {
    const confirmed = confirm('Email Me?');
    if (!confirmed) {
      event.preventDefault();
    }
  }
}
