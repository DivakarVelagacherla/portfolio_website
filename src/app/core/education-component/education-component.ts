import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Education } from '../../models/education.model';
import { ExperienceService } from '../../services/experience';

@Component({
  selector: 'app-education-component',
  imports: [CommonModule],
  templateUrl: './education-component.html',
  styleUrl: './education-component.css',
})
export class EducationComponent {
  educationDetails: Education[] | null = null;
  constructor(private educationDetailsService: ExperienceService) {
    this.educationDetails = this.educationDetailsService.getEducation();
  }

  trackByEducationId(index: number, education: Education): number {
    return education.id;
  }
}
