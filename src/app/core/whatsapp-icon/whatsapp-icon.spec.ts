import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappIcon } from './whatsapp-icon';

describe('WhatsappIcon', () => {
  let component: WhatsappIcon;
  let fixture: ComponentFixture<WhatsappIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
