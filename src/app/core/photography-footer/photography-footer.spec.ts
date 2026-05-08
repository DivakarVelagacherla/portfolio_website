import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographyFooter } from './photography-footer';

describe('PhotographyFooter', () => {
  let component: PhotographyFooter;
  let fixture: ComponentFixture<PhotographyFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotographyFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotographyFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
