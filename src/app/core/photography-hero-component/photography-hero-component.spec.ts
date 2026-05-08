import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographyHeroComponent } from './photography-hero-component';

describe('PhotographyHeroComponent', () => {
  let component: PhotographyHeroComponent;
  let fixture: ComponentFixture<PhotographyHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotographyHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotographyHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
