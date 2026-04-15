import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile';
import { ConfirmDialogService } from '../../services/confirm-dialog';

@Component({
  selector: 'app-cta-section',
  imports: [CommonModule],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.css',
})
export class CtaSection implements OnInit {
  profile: Profile | null = null;

  constructor(
    private profileService: ProfileService,
    private confirmDialogService: ConfirmDialogService,
  ) {}

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();
  }

  onClickGitHubIcon(event: Event): void {
    event.preventDefault();

    this.confirmDialogService.open({
      message: 'Open Github ?',
      confirmText: 'Github',
      cancelText: 'Cancel',
      onConfirm: () => window.open(this.profile?.social.github, '_blank'),
    });
  }

  onClickResumeIcon(event: Event): void {
    event.preventDefault();

    this.confirmDialogService.open({
      message: 'Download Resume ?',
      confirmText: 'Download',
      cancelText: 'Cancel',
      onConfirm: () => {
        const link = document.createElement('a');
        link.href = this.profile?.resumeUrl ?? '';
        link.download = 'Divakar_velagacherla_resume.pdf';
        window.open(this.profile?.resumeUrl, '_blank');
      },
    });
  }

  onClickLinkedinIcon(event: MouseEvent): void {
    event.preventDefault();

    this.confirmDialogService.open({
      message: 'Open Linkedin ?',
      confirmText: 'Linkedin',
      cancelText: 'Cancel',
      onConfirm: () => window.open(this.profile?.social.linkedin, '_blank'),
    });
  }

  onClickGmailIcon(event: Event): void {
    event.preventDefault();

    this.confirmDialogService.open({
      message: 'Send Email ?',
      confirmText: 'Email',
      cancelText: 'Cancel',
      onConfirm: () => (window.location.href = 'mailto:' + this.profile?.social.gmail),
    });
  }

  onClickPhoneIcon(event: Event): void {
    event.preventDefault();

    this.confirmDialogService.open({
      message: 'Call Me ?',
      confirmText: 'Call',
      cancelText: 'Cancel',
      onConfirm: () => (window.location.href = 'tel:' + this.profile?.social.phone),
    });
  }

  onClickWhatsappIcon(event: Event): void {
    event.preventDefault();

    this.confirmDialogService.open({
      message: 'Whatsapp Me ?',
      confirmText: 'Continue',
      cancelText: 'Cancel',
      onConfirm: () => window.open('https://wa.me/' + this.profile?.social.whatsapp, '_blank'),
    });
  }
}
