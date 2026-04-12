import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profile: Profile = {
    name: 'DIVAKAR VELAGACHERLA',
    designation: 'Software Engineer',
    currentLocation: 'USA',
    homeLocation: 'India',
    resumeUrl: 'assets/resume.pdf',
    social: {
      linkedin: 'https://www.linkedin.com/in/divakarvelagacherla',
      github: 'https://github.com/DivakarVelagacherla',
      gmail: 'divakarvelagacherla@gmail.com',
      phone: '+15125668620',
      whatsapp: '15125668620',
    },
  };

  getProfile(): Profile {
    return this.profile;
  }
}
