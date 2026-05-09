import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connect-component',
  imports: [ScrollAnimateDirective, CommonModule],
  templateUrl: './connect.html',
  styleUrl: './connect.css',
})
export class ConnectComponent {}
