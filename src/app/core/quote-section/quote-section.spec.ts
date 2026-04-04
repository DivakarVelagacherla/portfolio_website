import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSection } from './quote-section';

describe('QuoteSection', () => {
  let component: QuoteSection;
  let fixture: ComponentFixture<QuoteSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
