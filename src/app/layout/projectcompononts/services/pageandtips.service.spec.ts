import { TestBed } from '@angular/core/testing';

import { PageandtipsService } from './pageandtips.service';

describe('PageandtipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageandtipsService = TestBed.get(PageandtipsService);
    expect(service).toBeTruthy();
  });
});
