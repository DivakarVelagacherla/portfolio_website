import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  currentStep: number = 0;
  dotsTransitionEnabled: boolean = true;
  private intervalId: any;
  private audio: HTMLAudioElement | null = null;
  private interactionHandler: (() => void) | null = null;
  private destroyRef = inject(DestroyRef);
  selectedCard: GalleryCard | null = null;
  selectedIndex: number = 0;
  allCards: GalleryCard[] = [];

  row1CardWidth: number = window.innerWidth <= 768 ? 320 : 1250;
  row2CardWidth: number = window.innerWidth <= 768 ? 240 : 470;
  readonly gap = 24;

  constructor(
    private photoService: PhotoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.audio = new Audio('https://api.divakarvelagacherla.com/audio/ambient.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.035;
    this.audio.play().catch(() => {
      this.startOnInteraction();
    });
    document.addEventListener('visibilitychange', this.handleVisibility);

    this.photoService.fetchPhotos().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data: any) => {
      const row1Photos = this.shuffle(data.gallery.filter((p: Photo) => p.row === 1));
      const row2Photos = this.shuffle(data.gallery.filter((p: Photo) => p.row === 2));

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

      this.allCards = [...row1Photos, ...row2Photos].map((photo: Photo) => ({
        photo,
        progress: 0,
        noTransition: false,
      }));

      this.cdr.detectChanges();
      this.next();
      this.next();
      this.startInterval();
    });
  }

  handleVisibility = () => {
    if (document.hidden) {
      this.audio?.pause();
    } else if (this.isPlaying) {
      this.audio?.play().catch(() => {});
    }
  };

  shuffle(array: any[]): any[] {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }

  startOnInteraction() {
    this.interactionHandler = () => {
      if (this.isPlaying && this.audio?.paused) {
        this.audio.volume = 0;
        this.audio?.play().catch(() => {});
        this.fadeIn();
      }
    };
    document.addEventListener('click', this.interactionHandler);
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

    this.currentStep++;
    const N = this.row1Cards.length;
    const isWrap = N > 0 && this.currentStep % N === 0;

    if (isWrap) {
      this.dotsTransitionEnabled = false;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.dotsTransitionEnabled = true;
        this.cdr.detectChanges();
      }, 20);
    } else {
      this.dotsTransitionEnabled = true;
      this.cdr.detectChanges();
    }
  }

  startInterval() {
    this.intervalId = setInterval(() => this.next(), 4200);
  }

  fadeIn() {
    const targetVolume = 0.035;
    const duration = 2000; // 2 seconds fade in
    const steps = 30;
    const stepTime = duration / steps;
    const stepVolume = targetVolume / steps;

    const fade = setInterval(() => {
      if (this.audio && this.audio.volume < targetVolume) {
        this.audio.volume = Math.min(this.audio.volume + stepVolume, targetVolume);
      } else {
        clearInterval(fade);
      }
    }, stepTime);
  }

  pausePlay() {
    if (this.isPlaying) {
      clearInterval(this.intervalId);
      this.audio?.pause();
      this.isPlaying = false;
    } else {
      this.startInterval();
      if (this.audio) {
        this.audio.volume = 0;
        this.audio.play().catch(() => {});
        this.fadeIn();
      }
      this.isPlaying = true;
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.audio?.pause();
    this.audio = null;
    if (this.interactionHandler) {
      document.removeEventListener('click', this.interactionHandler);
    }
    document.removeEventListener('visibilitychange', this.handleVisibility);
  }

  getImageUrl(key: string, width: number): string {
    return this.photoService.getImageUrl(key, width);
  }

  getActiveDotIndex(): number {
    return this.row1Cards.findIndex((c) => c.progress === 0);
  }

  getDotsTrackTransform(): string {
    const N = this.row1Cards.length;
    if (N === 0) return 'translateX(0)';
    const activeIndex = this.currentStep % N;
    return `translateX(${-(activeIndex - 4) * 12}px)`;
  }

  goToIndex(targetIndex: number) {
    const activeIndex = this.getActiveDotIndex();
    const steps = targetIndex - activeIndex;
    if (steps > 0) {
      for (let i = 0; i < steps; i++) this.next();
    }
  }

  openLightbox(card: GalleryCard) {
    this.selectedCard = card;
    this.selectedIndex = this.allCards.findIndex((c) => c.photo.key === card.photo.key);
    clearInterval(this.intervalId);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedCard = null;
    document.body.style.overflow = '';
    if (this.isPlaying) this.startInterval();
  }

  lightboxNext() {
    this.selectedIndex = (this.selectedIndex + 1) % this.allCards.length;
    this.selectedCard = this.allCards[this.selectedIndex];
  }

  lightboxPrev() {
    this.selectedIndex = (this.selectedIndex - 1 + this.allCards.length) % this.allCards.length;
    this.selectedCard = this.allCards[this.selectedIndex];
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (!this.selectedCard) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowRight') this.lightboxNext();
    if (event.key === 'ArrowLeft') this.lightboxPrev();
  }
}
