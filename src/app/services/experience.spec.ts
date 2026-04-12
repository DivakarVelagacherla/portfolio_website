import { TestBed } from '@angular/core/testing';

import { Engineering } from './experience';

describe('Engineering', () => {
  let service: Engineering;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Engineering);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
