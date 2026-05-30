import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Certification } from '../../models/certification.model';
import { CertificationService } from '../../services/certification';
import { CertificationCard } from '../../shared/certification-card/certification-card';
import { PaginationComponent } from '../../shared/pagination/pagination';

const MOBILE_BREAKPOINT = 768;

@Component({
  selector: 'app-certifications-component',
  imports: [CommonModule, CertificationCard, PaginationComponent],
  templateUrl: './certifications-component.html',
  styleUrl: './certifications-component.css',
})
export class CertificationsComponent implements OnInit {
  allCertifications: Certification[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 3;
  pagedCertifications: Certification[][] = [];

  constructor(
    private certificationService: CertificationService,
    private cdr: ChangeDetectorRef,
  ) {}

  @HostListener('window:resize')
  onResize(): void {
    const newPageSize = window.innerWidth <= MOBILE_BREAKPOINT ? 1 : 3;
    if (newPageSize !== this.pageSize) {
      this.pageSize = newPageSize;
      this.currentPage = 0;
      this.paginate();
    }
  }

  ngOnInit(): void {
    this.pageSize = window.innerWidth <= MOBILE_BREAKPOINT ? 1 : 3;
    this.allCertifications = this.certificationService.getCertifications();
    this.paginate();
  }

  private paginate(): void {
    this.totalPages = Math.ceil(this.allCertifications.length / this.pageSize);
    this.pagedCertifications = [];
    for (let i = 0; i < this.allCertifications.length; i += this.pageSize) {
      this.pagedCertifications.push(this.allCertifications.slice(i, i + this.pageSize));
    }
    this.cdr.detectChanges();
  }

  trackByCertName(_index: number, cert: Certification): string {
    return cert.name;
  }

  onClickPageDot(page: number): void {
    this.currentPage = page;
    const slider = document.querySelector('.certifications-slider-wrapper') as HTMLElement;
    slider.scrollTo({
      left: page * slider.clientWidth,
      behavior: 'smooth',
    });
  }

  onSliderScroll(event: Event): void {
    const slider = event.target as HTMLElement;
    const pageWidth = slider.clientWidth;
    this.currentPage = Math.round(slider.scrollLeft / pageWidth);
  }
}
