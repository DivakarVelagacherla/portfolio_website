import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneIcon } from './phone-icon';

describe('PhoneIcon', () => {
  let component: PhoneIcon;
  let fixture: ComponentFixture<PhoneIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
