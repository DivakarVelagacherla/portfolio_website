import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringSummary } from './engineering-summary';

describe('EngineeringSummary', () => {
  let component: EngineeringSummary;
  let fixture: ComponentFixture<EngineeringSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineeringSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineeringSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
