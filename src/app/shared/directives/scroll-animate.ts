import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input('appScrollAnimate') animationType: string = '';

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.opacity = '0';
    this.el.nativeElement.style.transition = 'none';

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animate();
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.15 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  animate() {
    const el = this.el.nativeElement;

    switch (this.animationType) {
      case 'left':
        el.style.transform = 'translateX(-40px)';
        break;
      case 'right':
        el.style.transform = 'translateX(40px)';
        break;
      default:
        el.style.transform = 'translateY(60px)';
        break;
    }

    el.getBoundingClientRect();

    el.style.transition =
      'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.opacity = '1';
    el.style.transform = 'translate(0, 0)';
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
