import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-invert',
  imports: [],
  templateUrl: './button-invert.html',
  styleUrl: './button-invert.css',
})
export class ButtonInvert {
  @Input() label: string = '';
  @Input() target: string = '';
}
