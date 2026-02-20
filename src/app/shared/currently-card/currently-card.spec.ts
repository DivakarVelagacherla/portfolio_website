import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyCard } from './currently-card';

describe('CurrentlyCard', () => {
  let component: CurrentlyCard;
  let fixture: ComponentFixture<CurrentlyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentlyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentlyCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
