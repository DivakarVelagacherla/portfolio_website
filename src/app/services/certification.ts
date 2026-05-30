import { Injectable } from '@angular/core';
import { Certification } from '../models/certification.model';

@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  private certifications: Certification[] = [
    {
      name: 'Claude Code in Action',
      issuer: 'Anthropic',
      issuedDate: 'May 2026',
      expiryDate: null,
      description:
        'Hands-on certification covering Claude Code internals — Claude SDK, custom skills development, CLAUDE.md configuration, and hooks for extending agentic workflows.',
      skills: ['Claude Code', 'Promting', 'Skill Three'],
      verifyUrl: 'https://verify.skilljar.com/c/8opxkkxnrono',
      imageUrl: 'assets/certifications/claude-code-in-action.png',
    },
    {
      name: 'Introduction to Claude Cowork',
      issuer: 'Anthropic',
      issuedDate: 'May 2026',
      expiryDate: null,
      description:
        "Completed Anthropic's official Cowork course — covering task planning loop, plugins, skills configuration, file workflows, and steering longer-running agentic tasks to real outputs.",
      skills: ['Claude Code', 'Promting', 'Skill Three'],
      verifyUrl: 'https://verify.skilljar.com/c/j5rvevsh8ewo',
      imageUrl: 'assets/certifications/claude-cowork.png',
    },
    {
      name: 'Claude code 101',
      issuer: 'Anthropic',
      issuedDate: 'May 2026',
      expiryDate: null,
      description:
        "Completed Anthropic's Claude Code 101 covering the agentic loop, context window mechanics, and the Explore → Plan → Code → Commit workflow for AI-assisted software development.",
      skills: ['Claude Code'],
      verifyUrl: 'https://verify.skilljar.com/c/ua7bj4afv8yk',
      imageUrl: 'assets/certifications/claude-code-101.png',
    },
    {
      name: 'Claude 101',
      issuer: 'Anthropic',
      issuedDate: 'May 2026',
      expiryDate: null,
      description:
        "Completed Anthropic's Claude 101 covering Chat, Cowork, Code, Projects, Artifacts, Skills, Connectors, and Research Mode across five hands-on modules.",
      skills: ['Claude'],
      verifyUrl: 'https://verify.skilljar.com/c/euau4n65cst4',
      imageUrl: 'assets/certifications/claude-101.png',
    },
    {
      name: 'Go - The Complete Guide',
      issuer: 'Udemy',
      issuedDate: 'Sep 2025',
      expiryDate: null,
      description:
        'Comprehensive Go course covering language fundamentals, goroutines, channels, interfaces, error handling, and building REST APIs with user authentication and SQL database access.',
      skills: ['Go (Golang)'],
      verifyUrl: 'https://www.udemy.com/certificate/UC-66142d98-5460-4c23-b1fe-e18ac3740e58/',
      imageUrl: 'assets/certifications/go-complete-guide.png',
    },
    {
      name: 'Career Essentials in GitHub Professional Certificate',
      issuer: 'GitHub',
      issuedDate: 'Nov 2024',
      expiryDate: null,
      description:
        "Earned GitHub's Professional Certificate covering GitHub Actions automation, CI/CD pipeline design, project management workflows, and practical GitHub Copilot for AI-assisted development.",
      skills: ['GitHub Actions', 'Project Management & Collaboration'],
      verifyUrl:
        'https://www.linkedin.com/learning/certificates/fadf1fc1b51ca887f56a7215c65c46e07ff2a6c01823b0e3531de80120f84be1',
      imageUrl: 'assets/certifications/github-essentials.png',
    },
  ];

  getCertifications(): Certification[] {
    return this.certifications;
  }
}
