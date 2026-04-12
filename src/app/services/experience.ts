import { Injectable } from '@angular/core';
import { WorkExperience } from '../models/work-experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private workExperience: WorkExperience[] = [
    {
      id: 1,
      role: 'Network Infrastructure Intern',
      companyName: 'Sansbound Solutions',
      startDate: new Date('2019-01-01'),
      endDate: new Date('2019-04-01'),
      location: 'Chennai, India',
      techStack: ['Networking', 'Routing', 'Switches', 'TCP/UDP'],
      description: 'Will add sooner',
    },
    {
      id: 2,
      role: 'Java Full Stack Developer',
      companyName: 'Cognizant',
      startDate: new Date('2020-07-01'),
      endDate: new Date('2021-12-06'),
      location: 'Remote, India',
      techStack: ['Java', 'SpringBoot', 'Angular', 'MySQL', 'REST APIs'],
      description: 'Will add sooner',
    },
    {
      id: 3,
      role: 'Software Engineer',
      companyName: 'Vanguard',
      startDate: new Date('2024-03-01'),
      endDate: null,
      location: 'Pennsylvania, USA',
      techStack: ['Java', 'SpringBoot', 'AWS', 'Postgres', 'GraphQL', 'Microservices', 'Go'],
      description: 'Will add sooner',
    },
  ];

  getExperiences(): WorkExperience[] {
    return [...this.workExperience].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }
}
