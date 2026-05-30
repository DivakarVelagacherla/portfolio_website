import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Certification } from '../../models/certification.model';

@Component({
  selector: 'app-certification-card',
  imports: [CommonModule],
  templateUrl: './certification-card.html',
  styleUrl: './certification-card.css',
})
export class CertificationCard {
  @Input() certification!: Certification;
}
