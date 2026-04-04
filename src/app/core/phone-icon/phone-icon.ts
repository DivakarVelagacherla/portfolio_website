import { Component } from '@angular/core';

@Component({
  selector: 'app-phone-icon',
  imports: [],
  templateUrl: './phone-icon.html',
  styleUrl: './phone-icon.css',
})
export class PhoneIcon {
  onClick(event: Event): void {
    const confirmed = confirm('Call Me?');
    if (!confirmed) {
      event.preventDefault();
    }
  }
}
