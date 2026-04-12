import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile';

@Component({
  selector: 'app-cta-section',
  imports: [CommonModule],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.css',
})
export class CtaSection implements OnInit {
  profile: Profile | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();
  }

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
