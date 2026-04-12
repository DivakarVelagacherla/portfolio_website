import { Injectable } from '@angular/core';
import { WorkExperience } from '../models/work-experience.model';
import { Education } from '../models/education.model';

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

  private education: Education[] = [
    {
      id: 1,
      degree: "Bachelor's in Computer Science",
      universityName: 'SRM IST',
      startDate: new Date('2016-08-10'),
      endDate: new Date('2020-05-10'),
      location: 'Chennai, India',
    },
    {
      id: 2,
      degree: "Masters's in Computer Science",
      universityName: 'University of North Texas',
      startDate: new Date('2022-01-18'),
      endDate: new Date('2023-12-18'),
      location: 'Texas, USA',
    },
  ];

  getExperiences(): WorkExperience[] {
    return [...this.workExperience].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }

  getEducation(): Education[] {
    return [...this.education].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }
}
