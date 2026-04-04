import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-icon',
  imports: [],
  templateUrl: './whatsapp-icon.html',
  styleUrl: './whatsapp-icon.css',
})
export class WhatsappIcon {
  onClick(event: Event): void {
    const confirmed = confirm('Whatsapp Me?');
    if (!confirmed) {
      event.preventDefault();
    }
  }
}
