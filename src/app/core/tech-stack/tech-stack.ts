import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../services/experience';
import { TechGroup } from '../../models/tech-stack.model';

@Component({
  selector: 'app-tech-stack',
  imports: [CommonModule],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.css',
})
export class TechStack {
  techStack: TechGroup[] | null = null;

  constructor(private experienceService: ExperienceService) {
    this.techStack = this.experienceService.getTechStack();
  }
}
