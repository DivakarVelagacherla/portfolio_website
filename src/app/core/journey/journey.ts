import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo-service';
import { Photo } from '../../models/photo';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';

@Component({
  selector: 'app-journey-component',
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './journey.html',
  styleUrl: './journey.css',
})
export class JourneyComponent implements OnInit {
  mainPhoto: Photo | null = null;
  accentPhoto: Photo | null = null;

  constructor(
    private photoService: PhotoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.photoService.fetchPhotos().subscribe((data: any) => {
      this.mainPhoto = data.journey[1];
      this.accentPhoto = data.journey[0];
      this.cdr.detectChanges();
    });
  }

  getImageUrl(key: string, width: number): string {
    return this.photoService.getImageUrl(key, width);
  }
}
