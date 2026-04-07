import { Component } from '@angular/core';

@Component({
  selector: 'app-title-section',
  imports: [],
  templateUrl: './title-section.html',
  styleUrl: './title-section.css',
})
export class TitleSection {
  name: string = 'DIVAKAR VELAGACHERLA';
  designation: string = 'Software Engineer';
  profileCaption: string =
    'Building scalable backend systems with purpose-driven technology choices';
}
