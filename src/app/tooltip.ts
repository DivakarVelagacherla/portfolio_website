import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class Tooltip {
  @Input() tooltipText: string = '';
  private tooltipElement: HTMLSpanElement | null = null;
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.position = 'relative';
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.tooltipElement = document.createElement('span');
    this.tooltipElement.textContent = this.tooltipText;
    this.tooltipElement.className = 'tooltip';
    this.el.nativeElement.appendChild(this.tooltipElement);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.tooltipElement) {
      this.tooltipElement.remove();
      this.tooltipElement = null;
    }
  }
}
