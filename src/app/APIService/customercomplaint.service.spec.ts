import { TestBed } from '@angular/core/testing';

import { CustomercomplaintService } from './customercomplaint.service';

describe('CustomercomplaintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomercomplaintService = TestBed.get(CustomercomplaintService);
    expect(service).toBeTruthy();
  });
});
