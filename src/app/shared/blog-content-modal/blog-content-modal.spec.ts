import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogContentModal } from './blog-content-modal';

describe('BlogContentModal', () => {
  let component: BlogContentModal;
  let fixture: ComponentFixture<BlogContentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogContentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogContentModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
