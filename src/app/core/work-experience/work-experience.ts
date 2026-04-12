import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../services/experience';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-work-experience',
  imports: [CommonModule],
  templateUrl: './work-experience.html',
  styleUrl: './work-experience.css',
})
export class WorkExperience {
  workExperiences: Experience[] | null = null;
  constructor(private experienceService: ExperienceService) {
    this.workExperiences = this.experienceService.getExperiences();
  }

  trackByExperienceId(index: number, experience: Experience): number {
    return experience.id;
  }
}
