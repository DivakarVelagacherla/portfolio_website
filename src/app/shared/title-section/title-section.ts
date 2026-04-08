import { Component, Input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-title-section',
  imports: [UpperCasePipe],
  templateUrl: './title-section.html',
  styleUrl: './title-section.css',
})
export class TitleSection {
  @Input() name: string = '';
  @Input() pageTitle: string = '';
  @Input() pageCaption: string = '';
}
