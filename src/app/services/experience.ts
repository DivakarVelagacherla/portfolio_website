import { Injectable } from '@angular/core';
import { Experience } from '../models/work-experience.model';
import { Education } from '../models/education.model';
import { TechGroup } from '../models/tech-stack.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private workExperience: Experience[] = [
    {
      id: 1,
      role: 'Network Infrastructure Intern',
      companyName: 'Sansbound Solutions',
      startDate: new Date('2019-01-01'),
      endDate: new Date('2019-04-01'),
      location: 'Chennai, India',
      techStack: ['Networking', 'Routing', 'Switches', 'TCP/UDP'],
      description: `Assisted in configuring and maintaining network infrastructure 
                    including routers, switches and firewalls. Gained hands-on 
                    exposure to TCP/IP protocols, network troubleshooting and 
                    system administration in a startup environment.`,
    },
    {
      id: 2,
      role: 'Java Full Stack Developer',
      companyName: 'Cognizant',
      startDate: new Date('2020-07-01'),
      endDate: new Date('2021-12-06'),
      location: 'Remote, India',
      techStack: ['Java', 'SpringBoot', 'Angular', 'MySQL', 'REST APIs'],
      description: `Developed enterprise web applications for clients in the banking 
                    and retail domains using Java and Spring Boot. Built and consumed 
                    REST APIs, designed database schemas with MySQL and delivered 
                    frontend features using Angular. Worked in Agile sprints 
                    collaborating with onshore and offshore teams to meet client 
                    delivery timelines.`,
    },
    {
      id: 3,
      role: 'Software Engineer',
      companyName: 'Vanguard',
      startDate: new Date('2024-03-01'),
      endDate: null,
      location: 'Pennsylvania, USA',
      techStack: ['Java', 'SpringBoot', 'AWS', 'Postgres', 'GraphQL', 'Microservices', 'Go'],
      description: `Developing and maintaining cloud-native backend services on AWS 
                    supporting Vanguard's investment platforms. Working across ECS, 
                    Lambda and RDS Aurora to build scalable APIs and data pipelines 
                    in a highly regulated financial environment. Collaborating with 
                    cross-functional teams following enterprise architecture best 
                    practices and CI/CD workflows.`,
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

  private techStack: TechGroup[] = [
    {
      category: 'Programming Languages',
      items: [
        { name: 'Java', primary: true },
        { name: 'Python', primary: false },
        { name: 'Go', primary: false },
        { name: 'TypeScript', primary: true },
        { name: 'SQL', primary: true },
      ],
    },
    {
      category: 'Databases',
      items: [
        { name: 'Postgres', primary: true },
        { name: 'MySQL', primary: false },
        { name: 'Redis', primary: true },
      ],
    },
    {
      category: 'Frameworks',
      items: [
        { name: 'Spring Boot', primary: true },
        { name: 'Spring Data', primary: true },
        { name: 'Spring Cloud', primary: true },
        { name: 'Angular', primary: false },
      ],
    },
    {
      category: 'Cloud & DevOps',
      items: [
        { name: 'AWS', primary: true },
        { name: 'ECS', primary: true },
        { name: 'Lambda', primary: true },
        { name: 'S3', primary: true },
        { name: 'RDS Aurora', primary: true },
        { name: 'CI/CD', primary: true },
        { name: 'Github Actions', primary: true },
        { name: 'Docker', primary: false },
        { name: 'Kubernetes', primary: false },
        { name: 'Jenkins', primary: false },
      ],
    },
    {
      category: 'Monitoring & Observability',
      items: [
        { name: 'Splunk', primary: true },
        { name: 'CloudWatch', primary: true },
        { name: 'OpenTelemetry', primary: false },
        { name: 'AWS X-Ray', primary: false },
      ],
    },
    {
      category: 'Architecture & Design',
      items: [
        { name: 'Microservices', primary: true },
        { name: 'REST APIs', primary: true },
        { name: 'GraphQL', primary: true },
        { name: 'Enterprise Architecture', primary: false },
      ],
    },
    {
      category: 'Testing & Quality',
      items: [
        { name: 'JUnit', primary: true },
        { name: 'Mockito', primary: true },
        { name: 'CI/CD Testing Pipelines', primary: true },
      ],
    },
    {
      category: 'Tools',
      items: [
        { name: 'Git', primary: true },
        { name: 'Github', primary: true },
        { name: 'IntelliJ', primary: true },
        { name: 'VS Code', primary: true },
        { name: 'Maven', primary: true },
        { name: 'Bruno', primary: true },
        { name: 'Postman', primary: true },
        { name: 'Confluence', primary: false },
        { name: 'Github Copilot', primary: false },
        { name: 'pgAdmin', primary: true },
      ],
    },
  ];

  getExperiences(): Experience[] {
    return [...this.workExperience].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }

  getEducation(): Education[] {
    return [...this.education].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }

  getTechStack(): TechGroup[] {
    return this.techStack.map((group) => ({
      ...group,
      items: [...group.items].sort((a, b) => {
        if (a.primary && !b.primary) return -1;
        if (!a.primary && b.primary) return 1;
        return 0;
      }),
    }));
  }
}
