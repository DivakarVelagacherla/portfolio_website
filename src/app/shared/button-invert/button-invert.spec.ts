import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInvert } from './button-invert';

describe('ButtonInvert', () => {
  let component: ButtonInvert;
  let fixture: ComponentFixture<ButtonInvert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonInvert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonInvert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
