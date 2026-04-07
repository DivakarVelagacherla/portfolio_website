import { Component } from '@angular/core';

@Component({
  selector: 'app-cta-section',
  imports: [],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.css',
})
export class CtaSection {
  githubLink: string = 'https://github.com/DivakarVelagacherla';
  linkedinLink: string = 'https://www.linkedin.com/in/divakarvelagacherla';

  onClickGitHubIcon(event: Event): void {
    const confirmed = confirm('Open Github?');
    if (!confirmed) {
      event.preventDefault();
    }
  }

  onClickResumeIcon(event: Event): void {
    const confirmed = confirm('Download Resume?');
    if (!confirmed) {
      event.preventDefault();
    }
  }

  onClickLinkedinIcon(event: Event): void {
    const confirmed = confirm('Open Linkedin?');
    if (!confirmed) {
      event.preventDefault();
    }
  }

  onClickGmailIcon(event: Event): void {
    const confirmed = confirm('Email Me?');
    if (!confirmed) {
      event.preventDefault();
    }
  }

  onClickPhoneIcon(event: Event): void {
    const confirmed = confirm('Call Me?');
    if (!confirmed) {
      event.preventDefault();
    }
  }

  onClickWhatsappIcon(event: Event): void {
    const confirmed = confirm('Whatsapp Me?');
    if (!confirmed) {
      event.preventDefault();
    }
  }
}
