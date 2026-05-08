import { Component } from '@angular/core';

@Component({
  selector: 'app-photography-hero-component',
  imports: [],
  templateUrl: './photography-hero-component.html',
  styleUrl: './photography-hero-component.css',
})
export class PhotographyHeroComponent {
  title: string = 'Light, Shadow, Story';
  subTitle: string = 'Through the lens of curiosity and wonder';
  caption: string =
    'Photography is my way of seeing the world differently. Every frame tells a story, every light creates a mood, and every moment is worth preserving.';
}
