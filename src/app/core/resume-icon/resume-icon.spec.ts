import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeIcon } from './resume-icon';

describe('ResumeIcon', () => {
  let component: ResumeIcon;
  let fixture: ComponentFixture<ResumeIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
