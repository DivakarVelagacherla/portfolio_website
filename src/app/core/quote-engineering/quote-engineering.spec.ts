import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteEngineering } from './quote-engineering';

describe('QuoteEngineering', () => {
  let component: QuoteEngineering;
  let fixture: ComponentFixture<QuoteEngineering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteEngineering]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteEngineering);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
