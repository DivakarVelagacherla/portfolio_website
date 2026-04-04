import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailIcon } from './gmail-icon';

describe('GmailIcon', () => {
  let component: GmailIcon;
  let fixture: ComponentFixture<GmailIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmailIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GmailIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
