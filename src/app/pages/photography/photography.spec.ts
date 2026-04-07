import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photography } from './photography';

describe('Photography', () => {
  let component: Photography;
  let fixture: ComponentFixture<Photography>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Photography]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Photography);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
