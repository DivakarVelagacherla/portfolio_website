import { Component } from '@angular/core';
import { ResumeIcon } from '../../core/resume-icon/resume-icon';
import { GithubIcon } from '../../core/github-icon/github-icon';
import { LinkedinIcon } from '../../core/linkedin-icon/linkedin-icon';
import { GmailIcon } from '../../core/gmail-icon/gmail-icon';
import { PhoneIcon } from '../../core/phone-icon/phone-icon';
import { WhatsappIcon } from '../../core/whatsapp-icon/whatsapp-icon';

@Component({
  selector: 'app-cta-section',
  imports: [ResumeIcon, GithubIcon, LinkedinIcon, GmailIcon, PhoneIcon, WhatsappIcon],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.css',
})
export class CtaSection {}
