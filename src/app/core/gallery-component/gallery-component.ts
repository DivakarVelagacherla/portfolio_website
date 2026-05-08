import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo-service';
import { Photo } from '../../models/photo';
import { GalleryCard } from '../../models/gallery-card';

@Component({
  selector: 'app-gallery-component',
  imports: [CommonModule],
  templateUrl: './gallery-component.html',
  styleUrl: './gallery-component.css',
})
export class GalleryComponent implements OnInit, OnDestroy {
  row1Cards: GalleryCard[] = [];
  row2Cards: GalleryCard[] = [];
  isPlaying: boolean = true;
  private intervalId: any;

  // two viewports height
  readonly row1CardWidth = 1250;
  readonly row2CardWidth = 470;

  // one viewport height
  // readonly row1CardWidth = 900;
  // readonly row2CardWidth = 340;

  readonly gap = 24;

  constructor(
    private photoService: PhotoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.photoService.fetchPhotos().subscribe((data: any) => {
      const row1Photos = data.gallery.filter((p: Photo) => p.row === 1);
      const row2Photos = data.gallery.filter((p: Photo) => p.row === 2);

      this.row1Cards = row1Photos.map((photo: Photo, index: number) => ({
        photo,
        progress: index,
        noTransition: false,
      }));

      this.row2Cards = row2Photos.map((photo: Photo, index: number) => ({
        photo,
        progress: index,
        noTransition: false,
      }));

      this.cdr.detectChanges();
      this.next();
      this.next();
      this.startInterval();
    });
  }

  getTransform(progress: number, cardWidth: number): string {
    return `translate3d(${progress * (cardWidth + this.gap)}px, 0, 0)`;
  }

  next() {
    this.row1Cards.forEach((card) => {
      card.progress -= 1;
      card.noTransition = false;
    });
    this.row2Cards.forEach((card) => {
      card.progress -= 1;
      card.noTransition = false;
    });

    const min1 = Math.min(...this.row1Cards.map((c) => c.progress));
    if (min1 < -2) {
      const max1 = Math.max(...this.row1Cards.map((c) => c.progress));
      const card1 = this.row1Cards.find((c) => c.progress === min1)!;
      card1.noTransition = true;
      card1.progress = max1 + 1;

      const min2 = Math.min(...this.row2Cards.map((c) => c.progress));
      const max2 = Math.max(...this.row2Cards.map((c) => c.progress));
      const card2 = this.row2Cards.find((c) => c.progress === min2)!;
      card2.noTransition = true;
      card2.progress = max2 + 1;
    }

    this.cdr.detectChanges();
  }

  startInterval() {
    this.intervalId = setInterval(() => this.next(), 1200);
  }

  pausePlay() {
    if (this.isPlaying) {
      clearInterval(this.intervalId);
      this.isPlaying = false;
    } else {
      this.startInterval();
      this.isPlaying = true;
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  getImageUrl(key: string, width: number): string {
    return this.photoService.getImageUrl(key, width);
  }

  getActiveDotIndex(): number {
    return this.row1Cards.findIndex((c) => c.progress === 0);
  }

  getDotsOffset(): string {
    const activeIndex = this.getActiveDotIndex();
    const dotWidth = 6;
    const gap = 6;
    const dotStep = dotWidth + gap;
    const containerCenter = 60; // half of dots width (120px)
    const offset = containerCenter - activeIndex * dotStep - dotWidth / 2;
    return `translateX(${offset}px)`;
  }

  getVisibleDots(): GalleryCard[] {
    const activeIndex = this.getActiveDotIndex();
    const start = Math.max(0, activeIndex - 3);
    const end = Math.min(this.row1Cards.length, activeIndex + 4);
    return this.row1Cards.slice(start, end);
  }

  goToIndex(targetIndex: number) {
    const activeIndex = this.getActiveDotIndex();
    const steps = targetIndex - activeIndex;
    if (steps > 0) {
      for (let i = 0; i < steps; i++) this.next();
    }
  }
}
